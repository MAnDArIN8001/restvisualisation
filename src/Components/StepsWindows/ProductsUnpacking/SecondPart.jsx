import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({
  navigate,
  countValue,
  setSecondStepParams,
  setCurrentStep,
  isValid,
}) {
  const [id, setId] = useState("");
  const [nds, setNds] = useState("");
  const [isNextValid, setIsNextValid] = useState(false);
  const [isFieldValid, setIsValid] = useState(false);

  const [propsArray, setPropsArray] = useState([]);

  useEffect(() => {
    let newParams = {
      id,
      nds,
    };

    setIsValid(id.trim().length !== 0 && nds.trim().length !== 0);

    setSecondStepParams(newParams);
  }, [id, nds]);

  useEffect(() => {
    setIsNextValid(propsArray.length >= countValue);
  }, [propsArray]);

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => navigate("/remark")}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.base_field}>
          <p>Введите уникальный номер</p>
          <input
            type="number"
            placeholder="Уникальный номер"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>

        <div className={styles.base_field}>
          <p>Введите НДС</p>
          <input
            type="number"
            placeholder="НДС"
            value={nds}
            onChange={(e) => {
              setNds(e.target.value);
            }}
          />
        </div>

        <button
          className={isFieldValid ? styles.active : ""}
          onClick={() => {
            if (propsArray.length < countValue) return;

            let newValue = {
              number: id,
              nds,
            };

            setPropsArray([...propsArray, newValue]);
          }}
        >
          Добавить
        </button>
      </section>

      <button
        className={isNextValid ? styles.active : ""}
        onClick={() => setCurrentStep(2)}
      >
        Далее
      </button>
    </main>
  );
}
