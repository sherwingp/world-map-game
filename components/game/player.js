import { useContext } from "react";
import PlayersContext from "../../contexts/players";

const Player = ({ id, name, score, socket }) => {
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
    <ul className="players-list">
    <li className="player">
    <div className="chat-body">
    <strong className="primary-font">{name}:</strong> {score} points <button onClick={onClick}>Increment</button>
    </div>
    </li>
    </ul>
  );
};
export default Player;
