import Router from "next/router";
import { useState, useContext } from "react";
import PlayerContext from "../contexts/player";
import PlayersContext from "../contexts/players";
import { nanoid } from "nanoid";
import { io } from "socket.io-client";
import About from "./About";
import HowToPlay from "./HowToPlay";

let socket = io();

const Form = () => {
  const [name, setName] = useState("");
  const { setPlayer } = useContext(PlayerContext);
  const { setPlayers } = useContext(PlayersContext);
  const [host, setHost] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(1000);
  const [background, setBackground] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );
  const defaultAvatar = `https://avatars.dicebear.com/api/adventurer-neutral/${avatarSeed}.svg?backgroundColor=%23${background}&radius=50`;
  const [avatar, setAvatar] = useState(defaultAvatar);

  function handleGenerate() {
    let x = Math.floor(Math.random() * 1000);
    setBackground(Math.floor(Math.random() * 16777215).toString(16));
    setAvatarSeed(x);
    setAvatar(
      `https://avatars.dicebear.com/api/adventurer-neutral/${avatarSeed}.svg?backgroundColor=%23${background}&radius=50`
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {
      id: "player-" + nanoid(),
      name: name,
      score: 0,
      host: false,
      avatar: avatar,
    };

    socket.emit("new player", newPlayer);
    {
      host && setHost((newPlayer.host = true));
    }
    setPlayer(newPlayer);
    setPlayers([newPlayer]);
    Router.push("/game");
  };

  return (
    <div className="loginPanelContent">
      <div className="loginAvatarCustomizeContainer">
        <img className="loginAvatar" src={avatar} alt="Sprite" />
        <div>
          <img
            id="buttonAvatarCustomizerRandomize"
            src="https://skribbl.io/res/randomize.gif"
            onClick={() => {
              handleGenerate();
            }}
          />
        </div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label data-testid="label">
            <input
              className="form-control"
              id="inputName"
              type="text"
              autoComplete="off"
              placeholder="Enter your name"
              minLength="3"
              maxLength="32"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="set-host">
          <label>Set Host</label>
          <input
            type="checkbox"
            checked={host}
            value={host}
            onChange={(e) => setHost(e.currentTarget.checked)}
          />
        </div>
        <button className="btn btn-success btn-lg btn-block" type="submit">
          Play
        </button>
        <div>
          <About />
          <HowToPlay />
        </div>
      </form>
    </div>
  );
};

export default Form;
