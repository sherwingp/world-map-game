import { useContext } from "react";
import PlayersContext from "../../contexts/players";

const Player = ({ id, name, score, host, socket, avatar }) => {
  const { players, setPlayers } = useContext(PlayersContext);

  return (
    <li className="player">
      <div style={{ float: "left", width: 70 + "px" }}>
        {" "}
        <img src={avatar} alt="avatar" />
      </div>
      <div style={{ float: "right", width: 100 + "px" }}>
        {" "}
        {name}
        {host && "(Host)"}: {score} points{" "}
      </div>
    </li>
  );
};
export default Player;
