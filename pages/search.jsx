import React, { useState, useEffect } from "react";
import { getMonsters } from "../actions/monsters";
import MinMonsterCard from "../components/MinMonsterCard";
import MonsterCard from "../components/MonsterCard";
import styles from "../styles/search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateQuery } from "../redux/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const [selected, setSelected] = useState();
  const [monsters, setMonsters] = useState([]);
  const [pages, setPages] = useState(1);
  const [error, setError] = useState("");

  const handleSelectedClick = (enemy) => {
    return () => {
      if (!selected) {
        setSelected(enemy);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else {
        setSelected();
      }
    };
  };

  const handleSelectedArrow = (num) => {
    return () => {
      const index = monsters.indexOf(selected);
      if (num === -1) {
        if (index === 0) {
          setSelected(monsters[monsters.length - 1]);
        } else {
          setSelected(monsters[index - 1]);
        }
      } else {
        if (index === monsters.length - 1) {
          setSelected(monsters[0]);
        } else {
          setSelected(monsters[index + 1]);
        }
      }
    };
  };

  const handlePageClick = (num) => {
    return () => {
      if (num === -1) {
        if (query.page === 1) {
          return;
        }
      }
      if (num === 1) {
        if (query.page === pages) {
          return;
        }
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      dispatch(updateQuery({ page: query.page + num }));
    };
  };

  useEffect(() => {
    const callForMonsters = async (query) => {
      const data = await getMonsters(query);
      if (data.error) {
        setError("No results found");
        setMonsters([]);
        setPages(1);
      } else {
        setError("");
        setMonsters(data.data);
        setPages(data.pages);
      }
    };
    callForMonsters(query);
  }, [query]);

  if (!selected) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.input_wrapper}>
            <input
              className={styles.search_bar}
              placeholder="search"
              type="text"
              value={query.input}
              onChange={(e) =>
                dispatch(updateQuery({ input: e.target.value, page: 1 }))
              }
            />
            <div
              className={styles.clear}
              onClick={() => dispatch(updateQuery({ input: "", page: 1 }))}
            >
              <div className={styles.bar1}></div>
              <div className={styles.bar2}></div>
            </div>
          </div>
          <div className={styles.filters_container}>
            <div>
              <label htmlFor="cr">CR</label>
              <div className={styles.CR_wrapper}>
                <input
                  type="text"
                  id="cr"
                  maxLength={3}
                  value={query.CR}
                  onChange={(e) =>
                    dispatch(updateQuery({ CR: e.target.value, page: 1 }))
                  }
                />
                <div
                  className={styles.clear}
                  onClick={() => dispatch(updateQuery({ CR: "", page: 1 }))}
                >
                  <div className={styles.bar1}></div>
                  <div className={styles.bar2}></div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <select
                id="type"
                onChange={(e) =>
                  dispatch(updateQuery({ type: e.target.value, page: 1 }))
                }
                value={query.type}
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
          {error && <h3>{error}</h3>}
          {monsters &&
            monsters.map((monster) => (
              <MinMonsterCard
                key={monster.name}
                monster={monster}
                click={handleSelectedClick}
              />
            ))}
        </div>
        <div className={styles.btn_container}>
          <div className={styles.btn} onClick={handlePageClick(-1)}>
            <img src="circle-chevron-left-solid.svg" />
          </div>
          <p>
            {query.page}/{pages}
          </p>
          <div className={styles.btn} onClick={handlePageClick(1)}>
            <img src="circle-chevron-right-solid.svg" />
          </div>
        </div>
      </div>
    );
  }

  if (selected) {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.next_btn_left} onClick={handleSelectedArrow(-1)}>
          <img src="circle-chevron-left-solid.svg" />
        </div>
        <div className={styles.modalInner}>
          <MonsterCard monster={selected} click={handleSelectedClick} />
        </div>
        <div className={styles.next_btn_right} onClick={handleSelectedArrow(1)}>
          <img src="circle-chevron-right-solid.svg" />
        </div>
      </div>
    );
  }
};

export default Search;
