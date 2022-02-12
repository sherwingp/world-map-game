import { useContext } from "react";
import LocationContext from "../contexts/location";

export function initializeMap(mapboxgl, map, setMessage) {
  const marker = new mapboxgl.Marker();
  const [location, setLocation] = useContext(LocationContext);

  function add_marker(event) {
    var coordinates = event.lngLat;
    setLocation(coordinates)
    console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
    marker.setLngLat(coordinates).addTo(map);
    setMessage("");
  }

  map.on("click", add_marker);
}
