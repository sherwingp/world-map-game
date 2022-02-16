import { useState, useEffect, useContext } from "react";
import LocationContext from "../../contexts/location.js";
import NotificationContext from "../../contexts/notification";
import length from "@turf/length";
import circle from "@turf/circle";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

let map;
let inRound;
let setGuess;
let getGuessResult = () => {};
let secretCountry;
const geonamesKey = process.env.NEXT_PUBLIC_GEONAMES

const GameMap = ({ minutes, seconds, setMinutes, setSeconds, socket }) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const { location, setLocation } = useContext(LocationContext);
  const { notification, setNotification } = useContext(NotificationContext);

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

    initializeMap();
  }, []);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      inRound = false;
      getGuessResult();
      map.off("click", setGuess);
    }
  }, [minutes, seconds]);

  const initializeMap = () => {
    const marker = new mapboxgl.Marker();

    const startGuess = async (secretLocation) => {
      const guessMarker = new mapboxgl.Marker();
      console.log(secretLocation);
      setGuess = async (event) => {
        const guessLocation = event.lngLat;

        

        getGuessResult = async () => {
          guessMarker.remove();

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
          let center = [secretLocation.lng, secretLocation.lat];
          console.log(center);
          let radius = guessResult;
          let options = {
            units: "kilometers",
          };
          const newCircle = circle(center, radius, options);

          map.addLayer({
            id: "circle",
            type: "fill",
            source: {
              type: "geojson",
              data: newCircle,
            },
            paint: {
              "fill-opacity": 0.2,
              "fill-color": "#FF66FF",
            },
          });

          map.addLayer({
            id: "circle-outline",
            type: "line",
            source: {
              type: "geojson",
              data: newCircle,
            },
            paint: {
              "line-color": "#000000",
              "line-width": 2,
            },
          });
          
          setNotification(
            `You were ${Math.round(
              guessResult
            )}km away from the secret location`
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

            const lat = Math.round(guessLocation.lat)
            const lng = Math.round(guessLocation.lng)
            
      
            const getGuessedCountry = async (geodata, callback) => {
              const result = await fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}.3&lng=${lng}&username=${geonamesKey}`)
              return await result.json()
              }
      
            const countryDataResponse = await getGuessedCountry()
            const countryData = countryDataResponse.geonames[0]
      
            const guessedCountry = (typeof(countryData) == 'undefined') ? 'invalid country' : countryData.countryName
            console.log(guessedCountry);
            if (guessedCountry !== 'invalid country') {
              console.log(guessedCountry === secretCountry);
            }
      
        }
      };
      map.on("click", setGuess);
    };

    const startGame = async (event) => {
      let confirmStart = async () => {
        if (confirm("Start game?")) {
          const selectRandomCountry = async () => {
            const result = await fetch(`http://api.geonames.org/countryInfoJSON?username=${geonamesKey}`)
            return await result.json()
          }
          const allCountriesResponse = await selectRandomCountry()
          const allCountries = await allCountriesResponse.geonames
          secretCountry = allCountries[Math.floor(Math.random()*allCountries.length)]

          const getCountryGeoData = async () => {
            const result = await fetch(`http://api.geonames.org/getJSON?geonameId=${secretCountry.geonameId}&username=${geonamesKey}`)
            return await result.json()
          }

          const secretCountryGeoData = await getCountryGeoData()
          setNotification(secretCountry.countryName)
          setLocation(secretCountryGeoData);
          setNotification(`${secretCountry.countryName}`);
          map.off("click", startGame);
          inRound = true;
          startGuess(secretCountryGeoData);
          socket.emit("marked location", secretCountry);
          setMinutes(0);
          setSeconds(5);
        }
      };
      setTimeout(confirmStart, 100);
    };

    setNotification("Click on the map to start the game!");
    map.on("click", startGame);
  };

  return <div id="my-map" style={{ height: 500, width: "100%" }} />;
};

export default GameMap;
