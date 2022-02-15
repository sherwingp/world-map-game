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

    const startGuess = (secretLocation) => {
      const guessMarker = new mapboxgl.Marker();

      setGuess = (event) => {
        const guessLocation = event.lngLat;

        getGuessResult = () => {
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
        }
      };
      map.on("click", setGuess);
    };

    const startGame = (event) => {
      const clickedLocation = event.lngLat;
      setLocation(clickedLocation);
      marker
        .setLngLat({ lng: clickedLocation.lng, lat: clickedLocation.lat })
        .addTo(map);
      let confirmLocation = () => {
        if (confirm("Are you sure you want to set this location?")) {
          marker.remove();
          setNotification("");
          map.off("click", startGame);
          inRound = true;
          startGuess(clickedLocation);
          socket.emit("marked location", clickedLocation);
          setMinutes(0);
          setSeconds(5);
        }
      };
      setTimeout(confirmLocation, 100);
    };

    setNotification("Select your secret location");
    map.on("click", startGame);
  };

  return <div id="my-map" style={{ height: 500, width: "100%" }} />;
};

export default GameMap;
