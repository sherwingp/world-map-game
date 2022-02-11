import Player from "./player";
import NameContext from "../../contexts/name";
import { useContext } from "react";

const PlayersList = () => {
  const { name } = useContext(NameContext);
  const players = [];
  players.push({ name });
  console.log(players);

  return players.map((player) => {
    return <Player key={player.id} text={player} />;
  });
};
export default PlayersList;
