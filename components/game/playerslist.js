import Player from "./player";
import PlayersContext from "../../contexts/players";
import { useContext } from "react";

const PlayersList = () => {
  const { players } = useContext(PlayersContext);

  console.log(players);

  return players.map((player) => <Player key={player.id} name={player} />);
};
export default PlayersList;
