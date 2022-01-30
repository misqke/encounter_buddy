import monsterList from "../monsters.json";

export const getMonsterCR = (monster) => {
  let data = monster.challenge.split("(")[0].trim();
  if (data.includes("/")) {
    const nums = data.split("/");
    data = Number(nums[0]) / Number(nums[1]);
  }
  return Number(data);
};

export const getMonsterEXP = (monster) => {
  let data = monster.challenge.split("(")[1].trim().split(" ")[0].trim();
  return Number(data);
};

export const getAllMonsters = () => {
  return monsterList;
};

export const getMonstersByName = (name, list = monsterList) => {
  let data = list.filter((monster) =>
    monster.name.toLowerCase().includes(name.toLowerCase())
  );
  return data;
};

export const getMonstersByType = (types, list = monsterList) => {
  let data = [];
  const shortTypes = types.map((type) => type.slice(0, 3));
  list.forEach((monster) => {
    if (shortTypes.includes(monster.type.slice(0, 3))) {
      data.push(monster);
    }
  });
  return data;
};

export const getMonstersByCR = (CR, exact, list = monsterList) => {
  let data = [];
  exact = exact === "false" ? false : true;
  if (exact) {
    data = list.filter((monster) => getMonsterCR(monster) === CR);
  } else {
    data = list.filter((monster) => getMonsterCR(monster) <= CR);
  }
  return data;
};
