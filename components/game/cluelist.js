import Clue from "./clue.js"
export default function ClueList(props) {
  const clues = props.clues
  const cluesList = clues.map((clue) => (
    <Clue
        id = {clue.id}
        text = {clue.text}
        key = {clue.id}
    />
  )
  )
  console.log(cluesList)

  return (
    <ul>
      {cluesList}
    </ul>
  )
}
