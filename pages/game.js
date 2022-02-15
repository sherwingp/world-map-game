import GameHeader from "../components/game/GameHeader.js";
import ClueList from "../components/game/ClueList.js";
import GameMap from "../components/game/Map.js";
import ClueForm from "../components/game/ClueForm.js";
import Head from "next/head";
import { useState, useEffect } from "react";
import MessageBox from "../components/MessageBox.js";
import PlayerContext from "../contexts/player.js";
import PlayersContext from "../contexts/players";
import Navbar from "../components/Navbar.js";
import { useContext } from "react";
import PlayersList from "../components/game/PlayersList.js";
import PlayersHeader from "../components/game/PlayersHeader.js";
import "bootstrap/dist/css/bootstrap.css";
import Timer from "../components/game/Timer.js";
import LocationContext from "../contexts/location.js";
import Location from "../components/game/Location.js";
import Chat from "../components/game/Chat.js";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";

let socket = io();

export default function Game() {
  const [message, setMessage] = useState("Select your secret location");
  const [clues, setClues] = useState([]);
  const { location, setLocation } = useContext(LocationContext);
  const { players, setPlayers } = useContext(PlayersContext);
  const { player } = useContext(PlayerContext);
  const router = useRouter();

  useEffect(() => {
    if (player.name === undefined) {
      router.replace("/");
    } else {
      socketInitializer();
      socket.emit("new player", player);
      socket.emit("refresh players");
    }
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

    socket.on("marked location", (locationData) => {
      setLocation(locationData);
    });
  };

  const addClue = (clue) => {
    const newClue = { id: "clue-" + nanoid(), text: clue };

    setClues([...clues, newClue]);
  };

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

        <div className="col players-list-col align-self-start">
          <PlayersHeader />
          <PlayersList socket={socket} />
        </div>

        <div className="col game-header align-self-center">
          <GameHeader />
        </div>

        <div className="col clue-col align-self-start">
          <ClueForm clues={clues} addClue={addClue} />
          <ClueList clues={clues} />
          </div>
      </div>


    
        <div className="row">
          <GameMap setMessage={setMessage} />
        </div>
      

       <div className="row">
        <div className="col">
          <Location />
            <Timer />
      </div>
        <div className="col ">
          <MessageBox message={message} />
          <div className="col">
            <Chat socket={socket} />
          </div>
        </div>
    </div>
    </div>
  );
}

// export default Game
