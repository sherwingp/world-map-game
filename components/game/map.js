import { useState, useEffect, useContext } from "react";
import LocationContext from "../../contexts/location.js";
import NotificationContext from "../../contexts/notification";
import length from "@turf/length";
import circle from "@turf/circle";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const GameMap = ({ minutes, seconds, setMinutes, setSeconds, socket }) => {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { location, setLocation } = useContext(LocationContext);
  const { notification, setNotification } = useContext(NotificationContext);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX;

  useEffect(() => {
    setPageIsMounted(true);
    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 0.6,
      projection: "mercator",
    });

    map.addControl(new mapboxgl.NavigationControl());

    initializeMap();
    
    setMap(map);
  }, []);

  const initializeMap = () => {
    const marker = new mapboxgl.Marker();
  
    const startGuess = (secretLocation) => {
      const getDistance = (event) => {
        const guessLocation = event.lngLat;
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
        let radius = guessResult
        let options = {
            units: 'kilometers',
            }
        const newCircle = circle(center, radius, options)
  
       map.addLayer({
         "id": "circle",
         "type": "fill",
         "source": {
           "type": "geojson",
           "data": newCircle
          },
          'paint': {
            'fill-opacity': 0.2,
            'fill-color': "#FF66FF",
          }
       })
  
       map.addLayer({
        'id': 'circle-outline',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': newCircle
        },
        'paint': {
          'line-color': '#000000',
          'line-width': 2
        }
      });  
  
        setNotification(
          `You are ${Math.round(guessResult)}km away from the secret location`
        );
        return guessResult;
      };
      map.on("click", getDistance);
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
          startGuess(clickedLocation);
          socket.emit("marked location", clickedLocation);
          setMinutes(1);
          setSeconds(0);
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
