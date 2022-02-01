import React from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1>
        <Link href={"/"}>Encounter Buddy</Link>
      </h1>
      <h3>
        <Link href={"/search"}>Search</Link>
      </h3>
    </div>
  );
};

export default Header;
