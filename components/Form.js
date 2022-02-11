import Link from "next/link";
import { useContext } from "react";
import NameContext from "../contexts/name";

const Form = () => {
  const { name, setName } = useContext(NameContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
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
      <Link href="/game" passHref>
        <button
          data-testid="link-to-game"
          className="btn"
          type="submit"
          value="Submit"
        >
          Enter
        </button>
      </Link>
    </form>
  );
};

export default Form;
