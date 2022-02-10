import Clue from "./clue.js";
import { nanoid } from "nanoid";

export default function ClueList(props) {
  const clues = props.clues;
  const cluesList = clues.map((clue) => (
    <Clue id={clue.id} key={clue.id} text={clue.text} />
  ));

  return <ul>{cluesList}</ul>;
}
