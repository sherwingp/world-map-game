import length from "@turf/length";
import circle from "@turf/circle";

export const initializeMap = (
  mapboxgl,
  map,
  setNotification,
  location,
  setLocation,
  socket
) => {
  const marker = new mapboxgl.Marker();

  const startGame = (secretLocation) => {
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
     console.log(newCircle)

     map.addLayer({
       "id": "circle",
       "type": "circle",
       "source": {
         "type": "geojson",
         "data": newCircle
        },
     })
      // map.addSource("circle", newCircle);
      setNotification(
        `You are ${Math.round(guessResult)}km away from the secret location`
      );
      return guessResult;
    };
    map.on("click", getDistance);
  };
   
  const add_marker = (event) => {
    const clickedLocation = event.lngLat;
    setLocation(clickedLocation);
    marker
      .setLngLat({ lng: clickedLocation.lng, lat: clickedLocation.lat })
      .addTo(map);
    let confirmLocation = () => {
      if (confirm("Are you sure you want to set this location?")) {
        marker.remove();
        setNotification("");
        map.off("click", add_marker);
        startGame(clickedLocation);
        socket.emit("marked location", clickedLocation);
      }
    };
    setTimeout(confirmLocation, 100);
  };

  setNotification("Select your secret location");
  map.on("click", add_marker);
};
