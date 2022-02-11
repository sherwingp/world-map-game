import Link from "next/link";
import { useContext } from "react";
import NameContext from "../contexts/name";
import PlayersContext from "../contexts/players";

const Form = () => {
  const { name, setName } = useContext(NameContext);
  const { players, setPlayers } = useContext(PlayersContext);

  const handleSubmit = (e) => {
    console.log("hey");
    e.preventDefault();
    console.log(name);
    setPlayers([...players, name]);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label data-testid="label">
        Enter Player Name:
        <input
          data-testid="input-name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button
        data-testid="link-to-game"
        className="btn"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
