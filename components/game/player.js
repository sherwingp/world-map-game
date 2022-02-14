import { useContext } from "react";
import PlayersContext from "../../contexts/players";

const Player = ({ id, name, score, }) => {
  const { players, setPlayers } = useContext(PlayersContext);

  const onClick = () => {
    const updatedPlayers = players.map((player) => {
      if (player.id === id) {
        return { ...player, score: ++score };
      }

      return player;
    });
    
    socket.emit("send score", updatedPlayers)

    setPlayers(
      updatedPlayers.sort((a, b) => {
        return b.score - a.score;
      })
    );
  };

  return (
    <li className="player">
      {name}: {score} points <button onClick={onClick}>Increment</button>
    </li>
  );
};
export default Player;
