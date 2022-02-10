import { useState } from "react";
const Form = () => {
  const [name, setName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label data-testid="label">
        Enter Player Name:
        <input
          data-testid="input-name"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="btn" type="submit" value="Submit">
        Enter
      </button>
    </form>
  );
};

export default Form;
