import NameContext from "../../contexts/name";
import { useContext } from "react";

const Player = () => {
const { name } = useContext(NameContext);
  return <li className="player">{name}</li>;
};

export default Player;
