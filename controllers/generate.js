import monsterList from "../monsters.json";
import {
  getExpThreshold,
  getExpMultiplier,
  getMonstersByType,
  getMaxCR,
  getMonstersByCR,
  getMonsterEXP,
} from "./helpers";

export const generateEncounter = ({
  partySize,
  partyLevel,
  difficulty,
  numEnemies,
  types,
}) => {
  partySize = Number(partySize);
  partyLevel = Number(partyLevel);

  // check for and get random num enemies
  if (numEnemies === "random") {
    if (difficulty === "easy") {
      numEnemies = Math.floor(Math.random() * partySize) + 1;
    } else {
      numEnemies = Math.floor(Math.random() * 8) + 1;
    }
  } else {
    numEnemies = Number(numEnemies);
  }

  // get exp threshold and multiplier
  const expThreshold = getExpThreshold(partySize, partyLevel, difficulty);
  const expMultiplier = getExpMultiplier(numEnemies);

  // filter monsters by type
  const list = getMonstersByType(types, monsterList);

  // start encounter list
  const encounter = [];

  // recursive function to fill encounter list
  const fillEncounter = (remainingExp, remainingEnemies, list, trys = 1) => {
    const maxCR = getMaxCR(remainingEnemies, expMultiplier, remainingExp);
    const newList = getMonstersByCR(maxCR, list, false);
    if (newList.length === 0) {
      return;
    }
    if (remainingEnemies === 1) {
      const monsters = getMonstersByCR(maxCR, list, true);
      if (monsters.length === 0) {
        return;
      }
      const randomIndex = Math.floor(Math.random() * monsters.length);
      const monster = monsters[randomIndex];
      encounter.push(monster);
      return;
    } else {
      const randomIndex = Math.floor(Math.random() * newList.length);
      const monster = newList[randomIndex];
      encounter.push(monster);
      const newRemainingExp = remainingExp - getMonsterEXP(monster);
      const newRemainingEnemies = remainingEnemies - 1;
      fillEncounter(newRemainingExp, newRemainingEnemies, newList);
    }
  };

  // call function
  fillEncounter(expThreshold, numEnemies, list);

  // check if encounter was successfull
  if (encounter.length === numEnemies) {
    // create summary
    const summary = {
      totalEXP: 0,
      adjustedEXP: 0,
    };
    encounter.forEach((monster) => {
      const monsterEXP = getMonsterEXP(monster);
      summary.totalEXP += monsterEXP;
      summary.adjustedEXP += monsterEXP * expMultiplier;
    });
    summary.perAdventurer = Math.floor(summary.totalEXP / partySize);
    // return encounter
    return { summary, encounter };
  } else {
    // return error if failed
    return "error";
  }
};
