import NameContext from "../../contexts/name";
import { useContext } from "react";

const Player = ({ name }) => {
  return <li className="player">{name}</li>;
};

export default Player;
