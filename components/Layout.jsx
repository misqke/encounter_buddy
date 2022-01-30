import React from "react";
import Head from "next/head";
import Header from "./Header";
import styles from "../styles/Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Encounter Buddy</title>
        <meta name="description" content="a dnd 5e encounter generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Layout;
