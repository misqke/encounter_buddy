import React, { useState } from "react";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={!open ? styles.container : styles.open}>
      <div className={styles.inner_container}>
        <h1>
          <Link href={"/"}>Encounter Buddy</Link>
        </h1>
        <div
          className={styles.toggle_btn}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.nav}>
        <h4>
          <Link href={"/"}>Generator</Link>
        </h4>
        <h4>
          <Link href={"/Search"}>Search</Link>
        </h4>
      </div>
    </div>
  );
};

export default Header;
