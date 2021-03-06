import { useState, useEffect, useContext } from "react";
import LocationContext from "../../contexts/location.js";
import NotificationContext from "../../contexts/notification";
import length from "@turf/length";
import PlayersContext from "../../contexts/players";
import PlayerContext from "../../contexts/player";
import { nanoid } from "nanoid";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

let map;
let inRound;
let setGuess;
let getGuessResult = () => {};
let secretCountry;
let started = false;
let gamePlayers;

const geonamesKey = process.env.NEXT_PUBLIC_GEONAMES;

const GameMap = ({
  minutes,
  seconds,
  setMinutes,
  setSeconds,
  socket,
  mode,
}) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const { location, setLocation } = useContext(LocationContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const { players, setPlayers } = useContext(PlayersContext);
  const { player, setPlayer } = useContext(PlayerContext);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX;

  useEffect(() => {
    setPageIsMounted(true);
    map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 0.6,
      projection: "mercator",
    });

    map.addControl(new mapboxgl.NavigationControl());

    play();
  }, []);

  useEffect(() => {
    // Timer checks for round end
    if (minutes === 0 && seconds === 0 && started == true) {
      inRound = false;
      getGuessResult();
      map.off("click", setGuess);

      // Countdown to next round
      setTimeout(() => {
        // Initializing next round
        map = new mapboxgl.Map({
          container: "my-map",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [0, 0],
          zoom: 0.6,
          projection: "mercator",
        });
        play();
      }, 6000);
    }
  }, [minutes, seconds]);

  const play = () => {
    const resultMarker = new mapboxgl.Marker();

    const startGuess = async (secretLocation) => {
      const guessMarker = new mapboxgl.Marker();
      setGuess = async (event) => {
        const guessLocation = event.lngLat;
        getGuessResult = async () => {
          const linestring = {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [secretLocation.lng, secretLocation.lat],
                [guessLocation.lng, guessLocation.lat],
              ],
            },
          };
          const guessResult = length(linestring);

          resultMarker
            .setLngLat({ lng: secretLocation.lng, lat: secretLocation.lat })
            .addTo(map);

          map.addSource("guessline", {
            type: "geojson",
            data: linestring,
          });

          map.addLayer({
            id: "guessline",
            type: "line",
            source: "guessline",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#000",
              "line-width": 2.5,
            },
          });

          setNotification(
            `${secretLocation.asciiName} You were ${Math.round(
              guessResult
            )}km away!`
          );
          map.off("click", setGuess);
          return guessResult;
        };

        if (inRound === false) {
          getGuessResult();
        } else {
          guessMarker
            .setLngLat({ lng: guessLocation.lng, lat: guessLocation.lat })
            .addTo(map);

          const lat = Math.round(guessLocation.lat);
          const lng = Math.round(guessLocation.lng);

          const getGuessedCountry = async (geodata, callback) => {
            const result = await fetch(
              `https://secure.geonames.org/findNearbyPlaceNameJSON?lat=${lat}.3&lng=${lng}&username=${geonamesKey}`
            );
            return await result.json();
          };

          const countryDataResponse = await getGuessedCountry();
          const countryData = countryDataResponse.geonames[0];

          const guessedCountry =
            typeof countryData == "undefined"
              ? "invalid country"
              : countryData.countryName;

          // On correct answer
          if (guessedCountry !== "invalid country") {
            if (guessedCountry === secretCountry.countryName) {
              setNotification(
                `You correctly guessed ${secretLocation.asciiName}!`
              );
              map.off("click", setGuess);

              if (inRound === true) {
                const newMessage = {
                  id: "message-" + nanoid(),
                  author: "Game",
                  text: `${player.name} guessed the correct answer!`,
                };

                socket.emit("chat message", newMessage);

                // Update player score
                let updatedPlayers = gamePlayers;
                updatedPlayers[
                  updatedPlayers.findIndex((el) => el.id === player.id)
                ] = { ...player, score: ++player.score };

                // Update host score in guess mode
                if (mode === "guess") {
                  const host =
                    updatedPlayers[
                      updatedPlayers.findIndex((el) => el.host === true)
                    ];
                  updatedPlayers[players.findIndex((el) => el.host === true)] =
                    { ...host, score: ++host.score };
                }

                socket.emit("send score", updatedPlayers);

                setPlayers(
                  updatedPlayers.sort((a, b) => {
                    return b.score - a.score;
                  })
                );
              }
              started = false;
              inRound = false;
            } else {
              const guessMessage = {
                id: "message-" + nanoid(),
                author: "Game",
                text: `${player.name} guessed ${guessedCountry}!`,
              };

              socket.emit("chat message", guessMessage);
            }
          }
        }
      };
      map.on("click", setGuess);
    };

    const startGame = async (event) => {
      started = true;

      let confirmStart = async () => {
        if (confirm("Start game?")) {
          const selectRandomCountry = async () => {
            const result = await fetch(
              `https://secure.geonames.org/countryInfoJSON?username=${geonamesKey}`
            );
            return await result.json();
          };
          const allCountriesResponse = await selectRandomCountry();
          const allCountries = await allCountriesResponse.geonames;
          secretCountry =
            allCountries[Math.floor(Math.random() * allCountries.length)];

          const getCountryGeoData = async () => {
            const result = await fetch(
              `https://secure.geonames.org/getJSON?geonameId=${secretCountry.geonameId}&username=${geonamesKey}`
            );
            return await result.json();
          };

          const secretCountryGeoData = await getCountryGeoData();
          socket.emit("marked location", {
            location: secretCountryGeoData,
            mode: mode,
          });
          setLocation(secretCountryGeoData);
          setNotification(`${secretCountryGeoData.asciiName}`);
          map.off("click", startGame);
          inRound = true;
          startGuess(secretCountryGeoData);
          setMinutes(0);
          setSeconds(30);
        }
      };
      setTimeout(confirmStart, 100);
    };

    if (player.host === true) {
      map.on("click", startGame);
      setNotification("Click on the map to start the game!");
    } else {
      setNotification("Waiting for host...");
    }

    socket.on("marked location", ({ location, mode, players }) => {
      gamePlayers = players;
      if (mode === "classic") {
        setLocation(location);
        secretCountry = location;
        setNotification(`${location.asciiName}`);
      } else {
        setNotification("Guess the location!");
      }
      started = true;
      inRound = true;
      startGuess(location);
      setMinutes(0);
      setSeconds(20);
    });
  };

  return <div id="my-map" style={{ height: 500, width: "100%" }} />;
};

export default GameMap;
