export default function ClueList(props) {
  const clues = props.clues
  const cluesList = clues.map((clue) => {
   return <li key= {clues.id}>
    {clue}
  </li>
  })
  return (
    <ul>
      {cluesList}
    </ul>
  )
}
