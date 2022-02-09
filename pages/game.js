import GameHeader from '../components/game/gameHeader.js'
import Map from '../components/game/map.js'
import ClueList from '../components/game/clueList.js'

const props = ["This country has many states", "Where is Disneyland's home", "It has the nickname 'Magic City'"]

console.log(props);
export default function Game() {
  return (
    <div style={{width: "1400px", height: "1000px", borderStyle: "double"}}>
      <GameHeader />
      <Map />
      <ClueList clues={props} /> 
    </div>
  )
}

// export default Game 