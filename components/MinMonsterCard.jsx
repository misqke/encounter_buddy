import React from "react";
import styles from "../styles/MinMonsterCard.module.scss";

const MinMonsterCard = ({ monster }) => {
  return (
    <div className={styles.container}>
      <h3>
        {monster.name.length > 18
          ? `${monster.name.slice(0, 16)}...`
          : monster.name}
      </h3>
      <h5>{`${monster.size} ${monster.type}, ${monster.alignment}`}</h5>
      <h5>{monster.challenge}</h5>
    </div>
  );
};

export default MinMonsterCard;
