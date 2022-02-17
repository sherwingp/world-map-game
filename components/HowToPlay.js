import { useState } from "react";

const HowToPlay = () => {
  const [howToPlay, setHowToPlay] = useState(false);

  const toggleHowToPlay = () => {
    setHowToPlay(!howToPlay);
  };
  return (
    <>
      <button
        className="how-to-play-btn btn-lg btn-block"
        type="button"
        onClick={toggleHowToPlay}
      >
        How to Play
      </button>

      {howToPlay && (
        <div className="how-to-play">
          <div onClick={toggleHowToPlay} className="overlay"></div>
          <div className="how-to-play-content">
            <h2>Rules Summary</h2>
            <button className="close-how-to-play" onClick={toggleHowToPlay}>
              &times;
            </button>
            <ul>
              <li>
              Classic:
                Pin the correct location on the map before time runs out!
              </li>
              <li>
              Guess the country:
                As a host, give clues in the chat for your given country.
              </li>
              <li>
              As a guesser, pin your country guess from the clues before time runs out!
              </li>
              <li>Good luck!</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HowToPlay;
