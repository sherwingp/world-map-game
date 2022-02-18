import GameHeader from "../components/game/GameHeader.js";
import GameMap from "../components/game/Map.js";
import Head from "next/head";
import { useState, useEffect } from "react";
import Notification from "../components/Notification";
import PlayerContext from "../contexts/player.js";
import PlayersContext from "../contexts/players";
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
import Flag from "../components/game/Flag.js";
import ModeSelector from "../components/game/ModeSelector.js";

let socket = io();

export default function Game() {
  const [clues, setClues] = useState([]);
  const { location, setLocation } = useContext(LocationContext);
  const { players, setPlayers } = useContext(PlayersContext);
  const { player } = useContext(PlayerContext);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mode, setMode] = useState("classic");
  const router = useRouter();

  useEffect(() => {
    if (player.name === undefined) {
      router.replace("/");
    } else {
      socketInitializer();
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

  return (
    <div
      className="container"
      style={{ width: "100vmax", height: "700px", paddingTop: "40px" }}
    >
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>

      <div className="col game-header">
        <GameHeader />
      </div>
      <div className="row justify-content-center">
        <div className="col-4">
          <Flag location={location} />
          <Notification />
        </div>
        <div className="col-4">
          <Timer
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
      </div>
      <div className="row row-cols-3">
        <div className="col-lg-3 col-md-12  col-sm-12 players-list-col">
          <div className="card">
            <PlayersHeader />
            <PlayersList socket={socket} />
            <ModeSelector setMode={setMode} />
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <GameMap
            minutes={minutes}
            seconds={seconds}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            socket={socket}
            mode={mode}
          />
        </div>

        <div className="col-lg-3 col-md-12 col-sm-12">
          <Chat socket={socket} />
        </div>
      </div>
    </div>
  );
}
