export function initializeMap(
  mapboxgl,
  map,
  setMessage,
  location,
  setLocation
) {
  const marker = new mapboxgl.Marker();

  function add_marker(event) {
    const clickedLocation = event.lngLat;
    setLocation(clickedLocation);
    console.log(location);
    marker
      .setLngLat({ lng: clickedLocation.lng, lat: clickedLocation.lat })
      .addTo(map);
    let confirmLocation = () => {
      if (confirm("Are you sure you want to set this location?")) {
        marker.remove();
        setMessage("");
        map.off("click", add_marker)
      }
    };
    setTimeout(confirmLocation, 100);
    
  }

  map.on("click", add_marker);
}
// Error: `LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>},
// or an array of [<lng>, <lat>]

// [location.lng], [location.lat]
//{lng: location.lng, lat: location.lat}
