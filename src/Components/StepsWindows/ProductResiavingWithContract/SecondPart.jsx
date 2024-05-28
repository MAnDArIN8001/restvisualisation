import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { createTable } from "../../../Redux/Slices/worker";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({ setStep, firstParams }) {
  const [isValid, setIsValid] = useState(false);
  const [isValidNext, setIsValidNext] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  const [paramsArray, setParamsArray] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let isCorrect = id.trim().length !== 0 && price.trim().length !== 0;

    setIsValid(isCorrect);
  }, [id, price]);

  useEffect(() => {
    setIsValidNext(paramsArray.length >= firstParams.count);

    console.log(firstParams.count);
  }, [paramsArray]);

  const clearFields = () => {
    setPrice("");
    setId("");
  };

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => setStep(0)}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.base_field}>
          <p>Уникальный номер</p>
          <input
            type="text"
            placeholder="введите уникальный номер"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>

        <div className={styles.base_field}>
          <p>Стоимость</p>
          <input
            type="text"
            placeholder="Единица измерения"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          className={isValid ? styles.active : ""}
          onClick={() => {
            if (paramsArray.length === firstParams.count) return;

            let newParam = {
              amount: firstParams?.count,
              numberOfAgreement: firstParams?.contractId,
              number: id,
              cost: price,
            };

            setParamsArray([...paramsArray, newParam]);
            clearFields();
          }}
        >
          Добавить
        </button>
      </section>

      <button
        className={`${isValidNext ? styles.active : ""}`}
        onClick={() => {
          if (paramsArray.length < firstParams.count) return;

          dispatch(createTable(paramsArray));
          setStep(0);
        }}
      >
        Далее
      </button>
    </main>
  );
}
