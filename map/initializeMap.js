export function initializeMap(mapboxgl, map, setMessage, location, setLocation) {
  const marker = new mapboxgl.Marker();

  function add_marker(event) {
    const clickedLocation = event.lngLat;
    setLocation(clickedLocation)
    console.log("Lng:", location.lng, "Lat:", location.lat);
    marker.setLngLat(location).addTo(map);
    setMessage("");
  }

  map.on("click", add_marker);
}
