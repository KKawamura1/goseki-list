import Head from "next/head";
import { GetServerSideProps } from "next";
import { IncomingMessage, ServerResponse } from "node:http";
import { InputPage } from "../components/inputPage/inputPage";
// @ts-ignore
import styles from "../styles/index.module.scss";

// https://nju33.com/notes/nextjs/articles/Basic%20%E8%AA%8D%E8%A8%BC%E3%82%92%E4%BB%98%E3%81%91%E3%82%8B#%E4%BE%8B

const sendUnauthorized = (res: ServerResponse) => {
  res.writeHead(401, {
    "www-authenticate": "Basic realm=secret string",
  });
  res.end();
};

const authorize = (request: IncomingMessage) => {
  if (process.env.USER === undefined || process.env.PASS === undefined) {
    return true;
  }

  const authorization = request.headers["authorization"];

  if (typeof authorization === "undefined") {
    return false;
  }

  const matches = authorization.match(/[^\s]+$/);
  if (matches === null) {
    return false;
  }

  const userPass = Buffer.from(matches[0], "base64").toString();

  if (userPass !== process.env.USER + ":" + process.env.PASS) {
    return false;
  }
  return true;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authorized = authorize(context.req);
  if (!authorized) {
    sendUnauthorized(context.res);
  }

  return { props: {} };
};

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>MHRise Talisman List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <InputPage />
      </main>
    </div>
  );
};
export default Home;
