import monsterList from "../monsters.json";
import {
  getMonstersByType,
  getMonstersByCR,
  getMonstersByName,
  convertCR,
} from "./helpers";

export const getMonsters = (query) => {
  let { types, CR, search, exact } = query;
  let data = [];
  if (types) {
    data = getMonstersByType(types, monsterList);
  }
  if (CR) {
    CR = convertCR(CR);
    data =
      data.length > 0
        ? getMonstersByCR(CR, data, exact)
        : getMonstersByCR(CR, monsterList, exact);
  }
  if (search) {
    data =
      data.length > 0
        ? getMonstersByName(search, data)
        : getMonstersByName(search, monsterList);
  }
  if (!search && !CR && !types) {
    data = monsterList;
  }
  return data;
};
