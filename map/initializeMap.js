export function initializeMap(mapboxgl, map, setMessage) {
  const marker = new mapboxgl.Marker();

  function add_marker(event) {
    var coordinates = event.lngLat;
    console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
    marker.setLngLat(coordinates).addTo(map);
    setMessage("");
  }

  map.on("click", add_marker);
}
