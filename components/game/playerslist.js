import Player from "./Player";
import PlayersContext from "../../contexts/players";
import { useContext } from "react";

const PlayersList = () => {
  const { players } = useContext(PlayersContext);

  const mappedPlayers = players.map((player) => (
    <Player
      id={player.id}
      key={player.id}
      name={player.name}
      host={player.host}
      score={player.score}
      socketId={player.socketId}
    />
  ));

  return mappedPlayers;
};

export default PlayersList;
