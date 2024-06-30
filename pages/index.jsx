import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  updateData,
  updateEncounter,
  updateSummary,
} from "../redux/generatorSlice";
import { generateEncounter } from "../actions/generate";
import MinMonsterCard from "../components/MinMonsterCard";
import MonsterCard from "../components/MonsterCard";

export default function Home() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.generator.formData);
  const encounter = useSelector((state) => state.generator.encounter);
  const summary = useSelector((state) => state.generator.summary);
  const [selected, setSelected] = useState();
  const [error, setError] = useState("");

  const types = [
    "aberration",
    "beast",
    "celestial",
    "construct",
    "dragon",
    "elemental",
    "fey",
    "fiend",
    "giant",
    "humanoid",
    "monstrosity",
    "ooze",
    "plant",
    "swarm",
    "undead",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await generateEncounter(formData);
    if (data.data) {
      dispatch(updateEncounter(data.data.encounter));
      dispatch(updateSummary(data.data.summary));
      setError("");
    } else {
      setError(data.error);
      dispatch(updateEncounter([]));
      dispatch(updateSummary({}));
    }
  };

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
      const index = encounter.indexOf(selected);
      if (num === -1) {
        if (index === 0) {
          setSelected(encounter[encounter.length - 1]);
        } else {
          setSelected(encounter[index - 1]);
        }
      } else {
        if (index === encounter.length - 1) {
          setSelected(encounter[0]);
        } else {
          setSelected(encounter[index + 1]);
        }
      }
    };
  };

  const handleTypesClick = (e) => {
    const index = formData.types.indexOf(e.target.innerHTML);
    let newTypes = [];
    if (index === -1) {
      newTypes = [...formData.types, e.target.innerHTML];
    } else {
      newTypes = [
        ...formData.types.slice(0, index),
        ...formData.types.slice(index + 1),
      ];
    }
    dispatch(updateData({ types: newTypes }));
  };

  useEffect(() => {
    const activateTypes = () => {
      types.forEach((type) => {
        const elem = document.getElementById(type);
        if (formData.types.includes(type)) {
          elem.classList.add(styles.active);
        } else {
          elem.classList.remove(styles.active);
        }
      });
    };
    !selected && activateTypes();
  }, [formData.types, types]);

  if (!selected) {
    return (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.form_box1}>
            <div>
                <label htmlFor="size">Party Size</label>
                <input
                  id="size"
                  type="number"
                  min={1}
                  max={10}
                  value={formData.partySize}
                  onChange={(e) =>
                    dispatch(updateData({ partySize: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="level">Party Level</label>
                <input
                  id="level"
                  type="number"
                  min={1}
                  max={20}
                  value={formData.partyLevel}
                  onChange={(e) =>
                    dispatch(updateData({ partyLevel: e.target.value }))
                  }
                />
              </div>
              <div>
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  onChange={(e) =>
                    dispatch(updateData({ difficulty: e.target.value }))
                  }
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="deadly">Deadly</option>
                </select>
              </div>
              <div>
                <label htmlFor="enemies">Enemies</label>
                <select
                  id="enemies"
                  value={formData.numEnemies}
                  onChange={(e) =>
                    dispatch(updateData({ numEnemies: e.target.value }))
                  }
                >
                  <option value="random">random</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                </select>
              </div>
          </div>
          <div className={styles.form_box2}>
            <label id="aberration" onClick={handleTypesClick}>
              aberration
            </label>
            <label id="beast" onClick={handleTypesClick}>
              beast
            </label>
            <label id="celestial" onClick={handleTypesClick}>
              celestial
            </label>
            <label id="construct" onClick={handleTypesClick}>
              construct
            </label>
            <label id="dragon" onClick={handleTypesClick}>
              dragon
            </label>

            <label id="elemental" onClick={handleTypesClick}>
              elemental
            </label>
            <label id="fey" onClick={handleTypesClick}>
              fey
            </label>
            <label id="fiend" onClick={handleTypesClick}>
              fiend
            </label>
            <label id="giant" onClick={handleTypesClick}>
              giant
            </label>
            <label id="humanoid" onClick={handleTypesClick}>
              humanoid
            </label>
            <label id="monstrosity" onClick={handleTypesClick}>
              monstrosity
            </label>
            <label id="ooze" onClick={handleTypesClick}>
              ooze
            </label>
            <label id="plant" onClick={handleTypesClick}>
              plant
            </label>
            <label id="swarm" onClick={handleTypesClick}>
              swarm
            </label>
            <label id="undead" onClick={handleTypesClick}>
              undead
            </label>
          </div>
          <div className={styles.form_box3}>
            <button type="submit">Generate</button>
          </div>
        </form>
        <div className={styles.resultsInfo}>
          {error && <h3>{error}</h3>}
          {encounter.length !== 0 && (
            <div className={styles.summary_container}>
              <div>
                <p>
                  <span>Total EXP: </span>
                  {summary.totalEXP}
                </p>
                <p>
                  <span>Adjusted EXP: </span>
                  {summary.adjustedEXP}
                </p>
                <p>
                  <span>EXP per player: </span>
                  {summary.perAdventurer}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className={styles.display}>
          
          {encounter.length !== 0 &&
            encounter.map((monster, i) => (
              <MinMonsterCard
                monster={monster}
                key={monster.id * Math.random() + 1}
                click={handleSelectedClick}
              />
            ))}
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
}
