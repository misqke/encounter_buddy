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

export default function Home() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.generator.formData);
  const encounter = useSelector((state) => state.generator.encounter);
  const summary = useSelector((state) => state.generator.summary);
  const [error, setError] = useState("");

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

  const handleTypesClick = (e) => {
    const elem = document.getElementById(e.target.innerHTML);
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
    elem.classList.toggle(styles.active);
  };

  useEffect(() => {
    const setActiveTypes = () => {
      formData.types.forEach((type) => {
        const elem = document.getElementById(type);
        elem.classList.toggle(styles.active);
      });
    };
    setActiveTypes();
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_box1}>
          <div className={styles.box1_box}>
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
          </div>
          <div className={styles.box1_box}>
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
      <div className={styles.display}>
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
        {encounter.length !== 0 &&
          encounter.map((monster) => (
            <MinMonsterCard monster={monster} key={monster.id} />
          ))}
      </div>
    </div>
  );
}
