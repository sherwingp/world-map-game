import GameHeader from '../components/game/gameHeader.js'
import ClueList from '../components/game/clueList.js'
import GameMap from '../components/game/map.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { initializeMap } from "../map/initializeMap";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const props = ["This country has many states", "Where is Disneyland's home", "It has the nickname 'Magic City'"]

mapboxgl.accessToken =
process.env.MAP_BOX;

export default function Game() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();

  mapboxgl.accessToken =
    "pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA";

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 0.6,
      projection: 'naturalEarth'
    });

    initializeMap(mapboxgl, map);
    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted) {
      Map.on("load", function () {
      });
    }
  }, [pageIsMounted, setMap, Map]);

  return (
    <div style={{width: "1400px", height: "1000px", borderStyle: "double"}}>
    <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
    </Head>

      <GameHeader />
      <GameMap />
      <ClueList clues={props} /> 
      
    </div>
  )
}

// export default Game 