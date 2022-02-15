import "../styles/globals.css";
import { PlayerProvider } from "../contexts/player";
import { PlayersProvider } from "../contexts/players";
import { LocationProvider } from "../contexts/location";
import { NotificationProvider } from "../contexts/notification";

function MyApp({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <PlayerProvider>
        <NotificationProvider>
          <LocationProvider>
            <Component {...pageProps} />
          </LocationProvider>
        </NotificationProvider>
      </PlayerProvider>
    </PlayersProvider>
  );
}

export default MyApp;
