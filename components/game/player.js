import NameContext from "../../contexts/name";
import { useState, useContext } from "react";

const Player = ({ name }) => {
  const [score, setScore] = useState(0);
  return (
    <li className="player">
      {name}: {score} points{" "}
      <button onClick={() => setScore(score++)}>Increment</button>
    </li>
  );
};

export default Player;
