import GameHeader from "../components/game/GameHeader.js";
import ClueList from "../components/game/ClueList.js";
import GameMap from "../components/game/Map.js";
import ClueForm from "../components/game/ClueForm.js";
import Head from "next/head";
import { useState, useEffect } from "react";
import { initializeMap } from "../map/initializeMap";
import MessageBox from "../components/MessageBox.js";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
import PlayerContext from "../contexts/player.js";
import PlayersContext from "../contexts/players";
import Navbar from "../components/Navbar.js";
import { useContext } from "react";
import PlayersList from "../components/game/PlayersList.js";
import PlayersHeader from "../components/game/PlayersHeader.js";
import Chat from "../components/game/Chat.js";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { useRouter } from 'next/router';

let socket = io();
const router = useRouter();

export default function Game() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const [message, setMessage] = useState("Select your secret location");
  const [clues, setClues] = useState([]);
  const { players, setPlayers } = useContext(PlayersContext);
  const { player } = useContext(PlayerContext);

  useEffect(() => socketInitializer(), []);

  useEffect(() => {
    socket.emit("new player", player);
    socket.emit("refresh players");
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket.on("refresh players", (refreshedPlayers) => {
      setPlayers(refreshedPlayers);
    });

    socket.on("new player return", () => {
      router.replace(router.asPath);
      socket.emit("refresh players");
    });

    socket.on("player left", () => {
      socket.emit("refresh players");
    });

    socket.on("disconnect", () => {
      socket.emit("leave server");
    });
  };

  const addClue = (clue) => {
    const newClue = { id: "clue-" + nanoid(), text: clue };

    setClues([...clues, newClue]);
  };

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_BOX;

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

  return (
    <div style={{ width: "1400px", height: "1000px", borderStyle: "double" }}>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <PlayersHeader />
      <PlayersList />
      <GameHeader />
      <MessageBox message={message} />
      <ClueForm clues={clues} addClue={addClue} />
      <GameMap />
      <ClueList clues={clues} />
      <Chat socket={socket} />
    </div>
  );
}

// export default Game
