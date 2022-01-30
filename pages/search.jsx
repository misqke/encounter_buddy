import React, { useState, useEffect } from "react";
import { getMonsters } from "../actions/monsters";
import MinMonsterCard from "../components/MinMonsterCard";
import styles from "../styles/search.module.scss";

const search = () => {
  const [search, setSearch] = useState("");
  const [CR, setCR] = useState("");
  const [type, setType] = useState("any");
  const [monsters, setMonsters] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const callForMonsters = async (search, CR, type) => {
      const data = await getMonsters(search, CR, type, page);
      setMonsters(data.data);
      setPages(data.pages);
    };
    callForMonsters(search, CR, type);
  }, [search, CR, type, page]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <input
          className={styles.search_bar}
          placeholder="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.filters_container}>
          <div>
            <label htmlFor="cr">CR</label>
            <input
              type="text"
              id="cr"
              maxLength={3}
              value={CR}
              onChange={(e) => setCR(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <select
              id="type"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="any">any</option>
              <option value="aberration">aberration</option>
              <option value="beast">beast</option>
              <option value="celestial">celestial</option>
              <option value="construct">construct</option>
              <option value="dragon">dragon</option>
              <option value="elemental">elemental</option>
              <option value="fey">fey</option>
              <option value="fiend">fiend</option>
              <option value="giant">giant</option>
              <option value="humanoid">humanoid</option>
              <option value="monstrosity">monstrosity</option>
              <option value="ooze">ooze</option>
              <option value="plant">plant</option>
              <option value="swarm">swarm</option>
              <option value="undead">undead</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.display}>
        {monsters &&
          monsters.map((monster) => (
            <MinMonsterCard key={monster.name} monster={monster} />
          ))}
      </div>
    </div>
  );
};

export default search;
