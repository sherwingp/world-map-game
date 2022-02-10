import Player from './player'
import NameContext from "../../contexts/name";
import { useContext } from "react";

const PlayersList = () => {
    // const players = props.players;
    // const playersList = players.map((player) => <Player text={player} />);
    const { name } = useContext(NameContext);
    const players = []
    players.push({name})
    console.log(players)
    console.log(name)
      return (
        players.map(player => {
          return (
            <Player key={player.id} text={player} />
            )
          })
      ) 
}
export default PlayersList;