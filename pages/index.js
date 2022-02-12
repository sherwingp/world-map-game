import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";
import _app from "./_app";
import { useContext } from "react";
import NameContext from "../contexts/name";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useContext(NameContext);

  return (
    <body className="body-index">
    <div className={styles.container}>
      <Link href="/game">Game page</Link>
      <Head>
        <title>MAP-PIN</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Header />
        </h1>
        <Form setName={setName} />
      </main>
      <div className="footer">
        <Footer />
      </div>
    </div>
    </body>
  );
}
