import { io } from "socket.io-client";

export function initializeMap(mapboxgl, map, setMessage, location, setLocation) {
  let socket = io();
  const marker = new mapboxgl.Marker();

  function add_marker(event) {
    
    const clickedLocation = event.lngLat;
    setLocation(clickedLocation)
    socket.emit("marked location", (clickedLocation))
   // console.log(clickedLocation)
    //console.log("Lng:", clickedLocation.lng, "Lat:", clickedLocation.lat);
    marker.setLngLat({lng: clickedLocation.lng, lat: clickedLocation.lat}).addTo(map);
    setMessage("");
  }

  map.on('click', add_marker);
}
// Error: `LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, 
// or an array of [<lng>, <lat>]

// [location.lng], [location.lat]
//{lng: location.lng, lat: location.lat}