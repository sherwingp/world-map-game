import { useState } from "react";

const HowToPlay = () => {
  const [howToPlay, setHowToPlay] = useState(false);

  const toggleHowToPlay = () => {
    setHowToPlay(!howToPlay);
  };
  return (
    <>
      <button className="how-to-play-btn btn-lg btn-block" type="button" onClick={toggleHowToPlay}>
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
                When you are a host, you will be given a random country to
                describe and you will have to type in the chatbox to give the
                other players clues to guess that country correctly.
              </li>
              <li>
                As a guesser, you need to keep an eye on the chatbox for the
                clues and you will be given 6 chances to pin your guesses on the
                map
              </li>
              <li>
                if you guess the country incorrectly, it will turn red for
                whoever guessed it, and this will send a chat message for
                everyone else to see
              </li>
              <li>
                The faster a correct guess is made, the more points both the
                guesser and host receives
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
