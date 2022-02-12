import "../styles/globals.css";
import { NameProvider } from "../contexts/name";
import { PlayersProvider } from "../contexts/players";
import { LocationProvider } from "../contexts/location"

function MyApp({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <NameProvider>
        <LocationProvider>
          <Component {...pageProps} />
        </LocationProvider>
      </NameProvider>
    </PlayersProvider>
  );
}

export default MyApp;
