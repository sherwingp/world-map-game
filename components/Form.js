import Router from "next/router";
import { useState, useContext } from "react";
import PlayerContext from "../contexts/player";
import PlayersContext from "../contexts/players";
import { nanoid } from "nanoid";
import { platform } from "process";

const Form = () => {
  const [name, setName] = useState("");
  const { setPlayer } = useContext(PlayerContext);
  const { setPlayers } = useContext(PlayersContext);
  const { players } = useContext(PlayersContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newPlayer

    if (players.length === 0 ) {
      newPlayer = { id: "player-" + nanoid(), name: name, host: true, score: 0 }}
    else {
      newPlayer = { id: "player-" + nanoid(), name: name, host: false, score: 0 }
    };

    console.log(newPlayer);
    setPlayer(newPlayer);
    setPlayers([newPlayer]);
    Router.push("/game");
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label data-testid="label">
        Enter Player Name:
        <input
          data-testid="input-name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button
        data-testid="link-to-game"
        className="btn"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
