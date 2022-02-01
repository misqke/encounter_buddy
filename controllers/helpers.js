// general functions
export const getRandomNumber = (min, max) => {
  const difference = max - min;
  return Math.floor(Math.random() * (difference + 1)) + min;
};

export const getCRByExp = (exp) => {
  if (exp >= 155000) {
    return "30";
  } else if (exp >= 135000) {
    return "29";
  } else if (exp >= 120000) {
    return "28";
  } else if (exp >= 105000) {
    return "27";
  } else if (exp >= 90000) {
    return "26";
  } else if (exp >= 75000) {
    return "25";
  } else if (exp >= 62000) {
    return "24";
  } else if (exp >= 50000) {
    return "23";
  } else if (exp >= 41000) {
    return "22";
  } else if (exp >= 33000) {
    return "21";
  } else if (exp >= 25000) {
    return "20";
  } else if (exp >= 22000) {
    return "19";
  } else if (exp >= 20000) {
    return "18";
  } else if (exp >= 18000) {
    return "17";
  } else if (exp >= 15000) {
    return "16";
  } else if (exp >= 13000) {
    return "15";
  } else if (exp >= 11500) {
    return "14";
  } else if (exp >= 10000) {
    return "13";
  } else if (exp >= 8400) {
    return "12";
  } else if (exp >= 7200) {
    return "11";
  } else if (exp >= 5900) {
    return "10";
  } else if (exp >= 5000) {
    return "9";
  } else if (exp >= 3900) {
    return "8";
  } else if (exp >= 2900) {
    return "7";
  } else if (exp >= 2300) {
    return "6";
  } else if (exp >= 1800) {
    return "5";
  } else if (exp >= 1100) {
    return "4";
  } else if (exp >= 700) {
    return "3";
  } else if (exp >= 450) {
    return "2";
  } else if (exp >= 200) {
    return "1";
  } else if (exp >= 100) {
    return "1/2";
  } else if (exp >= 50) {
    return "1/4";
  } else if (exp >= 25) {
    return "1/8";
  } else {
    return "0";
  }
};

export const convertCR = (CR) => {
  if (CR.includes("/")) {
    const nums = CR.split("/");
    CR = Number(nums[0]) / Number(nums[1]);
  } else {
    CR = Number(CR);
  }
  return CR;
};

// monster functions
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

// filter functions
export const getMonstersByName = (name, list) => {
  let data = list.filter((monster) =>
    monster.name.toLowerCase().includes(name.toLowerCase())
  );
  return data;
};

export const getMonstersByType = (types, list) => {
  if (types === "any" || types.length === 0) {
    return list;
  }
  let data = [];
  const shortTypes = types.map((type) => type.slice(0, 3));
  list.forEach((monster) => {
    if (shortTypes.includes(monster.type.slice(0, 3))) {
      data.push(monster);
    }
  });
  return data;
};

export const getMonstersByCR = (CR, list, exact = true) => {
  let data = [];
  exact = exact === "false" || exact === false ? false : true;
  if (exact) {
    data = list.filter((monster) => getMonsterCR(monster) === CR);
  } else {
    data = list.filter((monster) => getMonsterCR(monster) <= CR);
  }
  return data;
};

// generator functions
export const getExpThreshold = (partySize, partyLevel, difficulty) => {
  switch (partyLevel) {
    case 1:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(25, 49);
        case "medium":
          return partySize * getRandomNumber(50, 74);
        case "hard":
          return partySize * getRandomNumber(75, 99);
        case "deadly":
          return partySize * getRandomNumber(100, 125);
        default:
          return partySize * 25;
      }
    case 2:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(50, 99);
        case "medium":
          return partySize * getRandomNumber(100, 149);
        case "hard":
          return partySize * getRandomNumber(150, 199);
        case "deadly":
          return partySize * getRandomNumber(200, 250);
        default:
          return partySize * 25;
      }
    case 3:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(75, 149);
        case "medium":
          return partySize * getRandomNumber(150, 224);
        case "hard":
          return partySize * getRandomNumber(225, 399);
        case "deadly":
          return partySize * getRandomNumber(400, 475);
        default:
          return partySize * 25;
      }
    case 4:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(125, 249);
        case "medium":
          return partySize * getRandomNumber(250, 374);
        case "hard":
          return partySize * getRandomNumber(375, 499);
        case "deadly":
          return partySize * getRandomNumber(500, 625);
        default:
          return partySize * 25;
      }
    case 5:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(250, 499);
        case "medium":
          return partySize * getRandomNumber(500, 749);
        case "hard":
          return partySize * getRandomNumber(750, 1099);
        case "deadly":
          return partySize * getRandomNumber(1100, 1350);
        default:
          return partySize * 25;
      }
    case 6:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(300, 599);
        case "medium":
          return partySize * getRandomNumber(600, 899);
        case "hard":
          return partySize * getRandomNumber(900, 1399);
        case "deadly":
          return partySize * getRandomNumber(1400, 1700);
        default:
          return partySize * 25;
      }
    case 7:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(350, 749);
        case "medium":
          return partySize * getRandomNumber(750, 1099);
        case "hard":
          return partySize * getRandomNumber(1100, 1699);
        case "deadly":
          return partySize * getRandomNumber(1700, 2050);
        default:
          return partySize * 25;
      }
    case 8:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(450, 899);
        case "medium":
          return partySize * getRandomNumber(900, 1399);
        case "hard":
          return partySize * getRandomNumber(1400, 2099);
        case "deadly":
          return partySize * getRandomNumber(2100, 2550);
        default:
          return partySize * 25;
      }
    case 9:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(550, 1099);
        case "medium":
          return partySize * getRandomNumber(1100, 1599);
        case "hard":
          return partySize * getRandomNumber(1600, 2399);
        case "deadly":
          return partySize * getRandomNumber(2400, 2950);
        default:
          return partySize * 25;
      }
    case 10:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(600, 1199);
        case "medium":
          return partySize * getRandomNumber(1200, 1899);
        case "hard":
          return partySize * getRandomNumber(1900, 2799);
        case "deadly":
          return partySize * getRandomNumber(2800, 3400);
        default:
          return partySize * 25;
      }
    case 11:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(800, 1599);
        case "medium":
          return partySize * getRandomNumber(1600, 2399);
        case "hard":
          return partySize * getRandomNumber(2400, 3599);
        case "deadly":
          return partySize * getRandomNumber(3600, 4400);
        default:
          return partySize * 25;
      }
    case 12:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(1000, 1999);
        case "medium":
          return partySize * getRandomNumber(2000, 2999);
        case "hard":
          return partySize * getRandomNumber(3000, 3999);
        case "deadly":
          return partySize * getRandomNumber(4500, 5500);
        default:
          return partySize * 25;
      }
    case 13:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(1100, 2199);
        case "medium":
          return partySize * getRandomNumber(2200, 3399);
        case "hard":
          return partySize * getRandomNumber(3400, 5099);
        case "deadly":
          return partySize * getRandomNumber(5100, 6200);
        default:
          return partySize * 25;
      }
    case 14:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(1250, 2499);
        case "medium":
          return partySize * getRandomNumber(2500, 3799);
        case "hard":
          return partySize * getRandomNumber(3800, 5699);
        case "deadly":
          return partySize * getRandomNumber(5700, 6950);
        default:
          return partySize * 25;
      }
    case 15:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(1400, 2799);
        case "medium":
          return partySize * getRandomNumber(2800, 4299);
        case "hard":
          return partySize * getRandomNumber(4300, 6399);
        case "deadly":
          return partySize * getRandomNumber(6400, 7800);
        default:
          return partySize * 25;
      }
    case 16:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(1600, 3199);
        case "medium":
          return partySize * getRandomNumber(3200, 4799);
        case "hard":
          return partySize * getRandomNumber(4800, 7199);
        case "deadly":
          return partySize * getRandomNumber(7200, 8800);
        default:
          return partySize * 25;
      }
    case 17:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(2000, 3899);
        case "medium":
          return partySize * getRandomNumber(3900, 5899);
        case "hard":
          return partySize * getRandomNumber(5900, 8799);
        case "deadly":
          return partySize * getRandomNumber(8800, 10800);
        default:
          return partySize * 25;
      }
    case 18:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(2100, 4199);
        case "medium":
          return partySize * getRandomNumber(4200, 6299);
        case "hard":
          return partySize * getRandomNumber(6300, 9499);
        case "deadly":
          return partySize * getRandomNumber(9500, 11600);
        default:
          return partySize * 25;
      }
    case 19:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(2400, 4899);
        case "medium":
          return partySize * getRandomNumber(4900, 7299);
        case "hard":
          return partySize * getRandomNumber(7300, 10899);
        case "deadly":
          return partySize * getRandomNumber(10900, 13300);
        default:
          return partySize * 25;
      }
    case 20:
      switch (difficulty) {
        case "easy":
          return partySize * getRandomNumber(2800, 5699);
        case "medium":
          return partySize * getRandomNumber(5700, 8499);
        case "hard":
          return partySize * getRandomNumber(8500, 12699);
        case "deadly":
          return partySize * getRandomNumber(12700, 15500);
        default:
          return partySize * 25;
      }
    default:
      return partySize * 25;
  }
};

export const getExpMultiplier = (numEnemies) => {
  if (numEnemies === 1) {
    return 1;
  } else if (numEnemies === 2) {
    return 1.5;
  } else if (numEnemies <= 6) {
    return 2;
  } else if (numEnemies <= 10) {
    return 2.5;
  }
};

export const getMaxCR = (numEnemies, multiplier, exp) => {
  const maxExp = exp - (numEnemies - 1) * 10 * multiplier;
  const maxCR = getCRByExp(maxExp);
  return convertCR(maxCR);
};
