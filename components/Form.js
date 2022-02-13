import Router from 'next/router'
import { useEffect, useContext } from "react";
import NameContext from "../contexts/name";
import PlayersContext from "../contexts/players";
import { nanoid } from "nanoid";
import io from 'Socket.IO-client'

let socket;

const Form = () => {
  const { name, setName } = useContext(NameContext);
  const { players, setPlayers } = useContext(PlayersContext);

  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = { id: "player-" + nanoid(), name: name, score: 0 };
    setPlayers([newPlayer]);
    socket.emit('new player', newPlayer)
    Router.push('/game')
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
