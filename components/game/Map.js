import { useState, useEffect, useContext } from "react";
import { initializeMap } from "../../map/initializeMap.js";
import LocationContext from "../../contexts/location.js";
import NotificationContext from "../../contexts/notification";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const GameMap = ({ socket }) => {
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

    initializeMap(
      mapboxgl,
      map,
      setNotification,
      location,
      setLocation,
      socket
    );
    setMap(map);
  }, []);

  return <div id="my-map" style={{ height: 500, width: "100%" }} />;
};

export default GameMap;
