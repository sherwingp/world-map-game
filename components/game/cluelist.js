import Clue from "./clue.js"

export default function ClueList(props) {
  const clues = props.clues
  const cluesList = clues.map((clue) => (
    <Clue
      text={clue}
      />
    )
  )

  return (
    <ul>
      {cluesList}
    </ul>
  )
}
