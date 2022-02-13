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
import PlayersContext from "../contexts/players";
import Navbar from "../components/Navbar.js";
import { useContext } from "react";
import PlayersList from "../components/game/PlayersList.js";
import PlayersHeader from "../components/game/PlayersHeader.js";
import Chat from "../components/game/Chat.js";
import io from 'Socket.IO-client'
import { nanoid } from "nanoid";

mapboxgl.accessToken = process.env.MAP_BOX;
let socket = io();

export default function Game() {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [Map, setMap] = useState();
  const { name } = useContext(NameContext);
  const [message, setMessage] = useState("Select your secret location");
  const [clues, setClues] = useState([]);
  const [input, setInput] = useState('');
  const { players, setPlayers } = useContext(PlayersContext);

  useEffect(() => socket.emit('get players'), [])

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket');

    socket.on('new player', (newPlayer) => {

      if (players.find((player) => player.id === newPlayer.id) === undefined) {
        setPlayers([...players, newPlayer])
      }
    })

    socket.on('get players', () => {
      socket.emit('send players', players[0])
    })

    socket.on('disconnect', () => {
      socket.emit('get players')
    })

    socket.on('send players', (newPlayer) => {
      if (players.find((player) => player.id === newPlayer.id) === undefined) {

        setPlayers([...players, newPlayer])
      } 
    })
  }

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
      <Chat />
    </div>
  );
}

// export default Game
