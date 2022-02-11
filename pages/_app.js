import "../styles/globals.css";
import { NameProvider } from "../contexts/name";
import { PlayersProvider } from "../contexts/players";

function MyApp({ Component, pageProps }) {
  return (
    <PlayersProvider>
      <NameProvider>
        <Component {...pageProps} />
      </NameProvider>
    </PlayersProvider>
  );
}

export default MyApp;
