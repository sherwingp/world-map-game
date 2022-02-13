export function initializeMap(mapboxgl, map, setMessage, location, setLocation) {
  const marker = new mapboxgl.Marker();

  function add_marker(event) {
    location = event.lngLat;
    setLocation(location)
    console.log("Lng:", location.lng, "Lat:", location.lat);
    marker.setLngLat(location).addTo(map);
    setMessage("");
  }

  map.on("click", add_marker);
}

//  this is what it was before

// function add_marker(event) {
//   var coordinates = event.lngLat;
//   setLocation(coordinates)
//   console.log("Lng:", location.lng, "Lat:", location.lat);
//   marker.setLngLat(coordinates).addTo(map);
//   setMessage("");
// }