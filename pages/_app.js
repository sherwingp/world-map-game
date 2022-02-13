import "../styles/globals.css";
import { PlayerProvider } from "../contexts/player";
import { PlayersProvider } from "../contexts/players";

function MyApp({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <PlayerProvider>
        <Component {...pageProps} />
      </PlayerProvider>
    </PlayersProvider>
  );
}

export default MyApp;
