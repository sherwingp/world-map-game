import { useState } from "react";

const ClueForm = ({ clues, addClue }) => {
  const [clue, setClue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!clue) {
      alert("Please provide a clue!");
      return;
    }

    setClue("");
    addClue(clue);
  };

  return (
    <form id="clue-form" onSubmit={handleSubmit}>
      <input
        id="clue-input"
        value={clue}
        type="text"
        placeholder="Input your clue!"
        onChange={(e) => setClue(e.target.value)}
      />
      <input type="submit" name="submit-clue" value="Submit Clue" />
    </form>
  );
};

export default ClueForm;
