import "../styles/globals.css";
import { PlayerProvider } from "../contexts/player";
import { PlayersProvider } from "../contexts/players";
import { LocationProvider } from "../contexts/location";

function MyApp({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <PlayerProvider>
        <LocationProvider>
          <Component {...pageProps} />
        </LocationProvider>
      </PlayerProvider>
    </PlayersProvider>
  );
}

export default MyApp;
