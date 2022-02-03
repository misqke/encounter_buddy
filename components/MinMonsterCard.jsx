import React from "react";
import styles from "../styles/MinMonsterCard.module.scss";

const MinMonsterCard = ({ monster, click }) => {
  let desc = `${monster.size} ${monster.type}, ${monster.alignment}`;
  if (desc.length > 28) {
    desc = `${desc.slice(0, 25)}...`;
  }

  return (
    <div className={styles.container} onClick={click(monster)}>
      <h3>
        {monster.name.length > 18
          ? `${monster.name.slice(0, 16)}...`
          : monster.name}
      </h3>
      <h5>{desc}</h5>
      <h5>Challenge: {monster.challenge}</h5>
    </div>
  );
};

export default MinMonsterCard;
