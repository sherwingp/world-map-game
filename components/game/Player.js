import { useContext } from "react";
import PlayersContext from "../../contexts/players";

const Player = ({ id, name, score, host, socket, avatar }) => {
  const { players, setPlayers } = useContext(PlayersContext);

  const onClick = () => {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return { ...player, score: ++score };
      }
      return player;
    });

    socket.emit("send score", updatedPlayers);

    setPlayers(
      updatedPlayers.sort((a, b) => {
        return b.score - a.score;
      })
    );
  };

  return (
    <li className="player">
      <div style={{ float: "left", width: 70 + "px" }}>
        {" "}
        <img src={avatar} alt="avatar" />
      </div>
      <div style={{ float: "right", width: 100 + "px" }}>
        {" "}
          <strong className="primary-font">{name}</strong>
        {host && "(Host)"}: {score} points{" "}
        <button onClick={onClick}>Increment</button>
      </div>
    </li>
  );
};
export default Player;
