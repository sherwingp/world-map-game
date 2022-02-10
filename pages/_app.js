import "../styles/globals.css";
import { NameProvider } from "../contexts/name";

function MyApp({ Component, pageProps }) {
  return (
    <NameProvider>
      <Component {...pageProps} />
    </NameProvider>
  );
}

export default MyApp;
