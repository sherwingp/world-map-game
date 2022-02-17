import { useState } from "react";

const About = () => {
  const [about, setAbout] = useState(false);

  const toggleAbout = () => {
    setAbout(!about);
  };
  return (
    <>
      <button
        type="button"
        className="btn-about btn-lg btn-block"
        id="buttonLoginCreatePrivate"
        onClick={toggleAbout}
      >
        About
      </button>

      {about && (
        <div className="about">
          <div onClick={toggleAbout} className="overlay"></div>
          <div className="about-content">
            <h2>About</h2>
            <button className="close-about" onClick={toggleAbout}>
              &times;
            </button>
            <p>
              <strong>MAP-PIN</strong> is a multiplayer interactive world map
              guessing.
              <br />
              <br />
              Classic: Find the given country before time runs out! Guess the
              Country: Each round the host must describe their given country and
              others must guess it in order to gain points! The person with the
              most points at the end of the game is declared the winner!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
