import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({
  countValue,
  setSecondStepParams,
  secondStepParams,
  setCurrentStep,
}) {
  const [id, setId] = useState("");
  const [nds, setNds] = useState("");
  const [isNextValid, setIsNextValid] = useState(false);
  const [isFieldValid, setIsValid] = useState(false);

  const [propsArray, setPropsArray] = useState(secondStepParams);

  useEffect(() => {
    setIsValid(id.trim().length !== 0 && nds.trim().length !== 0);
  }, [id, nds]);

  useEffect(() => {
    setIsNextValid(propsArray.length >= countValue);
    setSecondStepParams([...propsArray]);
  }, [propsArray]);

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => setCurrentStep(0)}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.counter}>
          <p>Количество позиций: {countValue}</p>
          <p>Введено позиций: {propsArray.length}</p>
        </div>

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
            let inputs = document.querySelectorAll("input");

            for (let input of inputs) {
              if (input.value.trim().length === 0) {
                input.classList.add(styles.wrong);
              } else {
                input.classList.remove(styles.wrong);
              }
            }

            if (propsArray.length >= countValue) return;

            let newValue = {
              number: id,
              tax: nds,
            };

            setPropsArray([...propsArray, newValue]);
            setId("");
            setNds("");
          }}
        >
          Добавить
        </button>
      </section>

      <button
        className={isNextValid ? styles.active : ""}
        onClick={() => {
          if (!isNextValid) return;

          setCurrentStep(2);
        }}
      >
        Далее
      </button>
    </main>
  );
}
