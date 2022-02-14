import Clue from "./Clue.js";

export default function ClueList(props) {
  const clues = props.clues;
  const cluesList = clues.map((clue) => (
    <Clue id={clue.id} key={clue.id} text={clue.text} />
  ));

  return <ul>{cluesList}</ul>;
}
