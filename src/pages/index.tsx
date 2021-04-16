import Head from "next/head";
import { AppDispatch, wrapper } from "../store";
import { Hello } from "../components/inputPage/inputPage";
// @ts-ignore
import styles from "../styles/index.module.scss";

type Props = {};

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Hello />
      </main>
    </div>
  );
};
export default Home;
