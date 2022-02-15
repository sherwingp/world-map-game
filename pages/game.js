import GameHeader from "../components/game/GameHeader.js";
import ClueList from "../components/game/ClueList.js";
import GameMap from "../components/game/Map.js";
import ClueForm from "../components/game/ClueForm.js";
import Head from "next/head";
import { useState, useEffect } from "react";
import { initializeMap } from "../map/initializeMap";
import MessageBox from "../components/MessageBox.js";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import NameContext from "../contexts/name.js";
import Navbar from "../components/Navbar.js";
import { useContext } from "react";
import PlayersList from "../components/game/PlayersList.js";
import PlayersHeader from "../components/game/PlayersHeader.js";
import "bootstrap/dist/css/bootstrap.css";

import { nanoid } from "nanoid";

mapboxgl.accessToken = process.env.MAP_BOX;

export default function Game() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { name } = useContext(NameContext);
  const [message, setMessage] = useState("Select your secret location");
  const [clues, setClues] = useState([]);

  const addClue = (clue) => {
    const newClue = { id: "clue-" + nanoid(), text: clue };

    setClues([...clues, newClue]);
  };

  mapboxgl.accessToken =
    "pk.eyJ1Ijoid2FubmFkYyIsImEiOiJjazBja2M1ZzYwM2lnM2dvM3o1bmF1dmV6In0.50nuNnApjrJYkMfR2AUpXA";

  useEffect(() => {
    setPageIsMounted(true);

    let map = new mapboxgl.Map({
      container: "my-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 0.6,
      projection: "naturalEarth",
    });

    map.addControl(new mapboxgl.NavigationControl());

    initializeMap(mapboxgl, map, setMessage);
    setMap(map);
  }, []);

  useEffect(() => {
    if (pageIsMounted) {
      Map.on("load", function () {});
    }
  }, [pageIsMounted, setMap, Map]);

  return (
    // style={{ width: "1400px", height: "1000px", borderStyle: "double" }}
    <div
      className="container"
      style={{ width: "100vmax", height: "900px", paddingTop: "40px" }}
    >
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Navbar />
      </div>
      <div className="row">
        <div className="col players-list-col">
          <PlayersHeader />
          <PlayersList />
        </div>
        <div className="col game-header">
          <GameHeader />
        </div>
        <div className="col clue-col">
          <MessageBox message={message} />
          <ClueForm clues={clues} addClue={addClue} />{" "}
          <ClueList clues={clues} />
        </div>
      </div>
      <div>
        <GameMap />
      </div>
    </div>
  );
}

// export default Game
