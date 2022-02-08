import GameHeader from '../components/game/gameHeader.js'
import Map from '../components/game/map.js'

export default function Game() {
  return (
    <div style={{width: "1400px", height: "1000px", borderStyle: "double"}}>
      <GameHeader />
      <Map />
    </div>
  )
}

// export default Game 