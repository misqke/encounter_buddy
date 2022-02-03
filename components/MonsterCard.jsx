import React from "react";
import styles from "../styles/MonsterCard.module.scss";

const MonsterCard = ({ monster }) => {
  return (
    <div className={styles.container}>
      <div className={styles.gold_bar}></div>
      <div className={styles.card}>
        <h2>{monster.name.toUpperCase()}</h2>
        <p
          className={styles.description}
        >{`${monster.size} ${monster.type}, ${monster.alignment}`}</p>
        <div className={styles.red_bar}></div>
        <p>
          <span>Armor Class </span>
          {monster.armor_class}
        </p>
        <p>
          <span>Hit Points </span>
          {monster.hit_points}
        </p>
        <p>
          <span>Speed </span>
          {monster.speed}
        </p>
        <div className={styles.red_bar}></div>
        <div className={styles.attribute_container}>
          <div className={styles.attribute_wrapper}>
            <span>STR</span>
            <p>{monster.attributes.strength}</p>
          </div>
          <div className={styles.attribute_wrapper}>
            <span>DEX</span>
            <p>{monster.attributes.dexterity}</p>
          </div>
          <div className={styles.attribute_wrapper}>
            <span>CON</span>
            <p>{monster.attributes.constitution}</p>
          </div>
          <div className={styles.attribute_wrapper}>
            <span>INT</span>
            <p>{monster.attributes.intelligence}</p>
          </div>
          <div className={styles.attribute_wrapper}>
            <span>WIS</span>
            <p>{monster.attributes.wisdom}</p>
          </div>
          <div className={styles.attribute_wrapper}>
            <span>CHA</span>
            <p>{monster.attributes.charisma}</p>
          </div>
        </div>
        <div className={styles.red_bar}></div>
        {monster.saving_throws && (
          <p>
            <span>Saving Throws </span>
            {monster.saving_throws}
          </p>
        )}
        {monster.skills && (
          <p>
            <span>Skills </span>
            {monster.skills}
          </p>
        )}
        {monster.damage_vulnerabilities && (
          <p>
            <span>Damage Vulnerabilities </span>
            {monster.damage_vulnerabilities}
          </p>
        )}
        {monster.damage_resistances && (
          <p>
            <span>Damage Resistances </span>
            {monster.damage_resistances}
          </p>
        )}
        {monster.damage_immunities && (
          <p>
            <span>Damage Immunities </span>
            {monster.damage_immunities}
          </p>
        )}
        {monster.condition_immunities && (
          <p>
            <span>Condition Immunities </span>
            {monster.condition_immunities}
          </p>
        )}
        {monster.senses && (
          <p>
            <span>Senses </span>
            {monster.senses}
          </p>
        )}
        {monster.languages && (
          <p>
            <span>Languages </span>
            {monster.languages}
          </p>
        )}
        {monster.challenge && (
          <p>
            <span>Challenge </span>
            {monster.saving_throws}
          </p>
        )}
        <div className={styles.red_bar}></div>
        {monster.traits &&
          monster.traits.map((trait, i) => (
            <p key={`${trait.name}-${i}`} className={styles.action}>
              <span>{trait.name}</span> {trait.desc}
            </p>
          ))}
        {monster.actions && (
          <div className={styles.actions_container}>
            <h3>ACTIONS</h3>
            <div className={styles.red_line}></div>
            {monster.actions.map((action, i) => (
              <p key={`${action.name}-${i}`} className={styles.action}>
                <span>{action.name}</span> {action.desc}
              </p>
            ))}
          </div>
        )}
        {monster.reactions && (
          <div className={styles.actions_container}>
            <h3>REACTIONS</h3>
            <div className={styles.red_line}></div>
            {monster.reactions.map((reaction, i) => (
              <p key={`${reaction.name}-${i}`} className={styles.action}>
                <span>{reaction.name}</span> {reaction.desc}
              </p>
            ))}
          </div>
        )}
        {monster.legendaryActions && (
          <div className={styles.actions_container}>
            <h3>LEGENDARY ACTIONS</h3>
            <div className={styles.red_line}></div>
            <p className={styles.action}>{monster.legendaryActions.desc}</p>
            {monster.legendaryActions.actions.map((action, i) => (
              <p key={`${action.name}-${i}`} className={styles.action}>
                <span>{action.name}</span> {action.desc}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className={styles.gold_bar}></div>
    </div>
  );
};

export default MonsterCard;
