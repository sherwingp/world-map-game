import length from "@turf/length";
import circle from "@turf/circle";

export const initializeMap = (
  mapboxgl,
  map,
  setNotification,
  location,
  setLocation,
  socket,
  setMinutes,
  setSeconds,
  minutes,
  seconds
) => {
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
