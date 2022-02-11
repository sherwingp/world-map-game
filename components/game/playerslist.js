import Player from "./player";
import PlayersContext from "../../contexts/players";
import { useContext, useEffect, useState } from "react";

const PlayersList = () => {
  const { players } = useContext(PlayersContext);
  const mappedPlayers = players.map((player) => <Player key={player.id} name={player} />)
  const [sortedPlayers, setSortedPlayers] = useState(mappedPlayers)

  useEffect(() => {
    const sortedPlayers = mappedPlayers.sort((a, b) => {
        a.score - b.score;
    }) 
    console.log(sortedPlayers)
    console.log("hello")
    setSortedPlayers(sortedPlayers)
  }, [sortedPlayers])

  return sortedPlayers

};

export default PlayersList;
