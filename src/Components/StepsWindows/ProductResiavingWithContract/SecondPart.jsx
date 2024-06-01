import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createRevaluation } from "../../../Redux/Slices/accountant";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({ setStep, firstParams, secondStepParam }) {
  const [isValid, setIsValid] = useState(false);
  const [isValidNext, setIsValidNext] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  const [paramsArray, setParamsArray] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isCorrect = id.trim().length !== 0 && price.trim().length !== 0;

    setIsValid(isCorrect);
  }, [id, price]);

  useEffect(() => {
    setIsValidNext(paramsArray.length >= firstParams.value.count);
    secondStepParam.set([...paramsArray]);
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
            placeholder="Введите уникальный номер"
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
            placeholder="Стоимость"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button
          className={isValid ? styles.active : ""}
          onClick={() => {
            let inputs = document.querySelectorAll("input");

            for (let input of inputs) {
              if (input.value.trim().length === 0) {
                input.classList.add(styles.wrong);
              } else {
                input.classList.remove(styles.wrong);
              }
            }

            if (paramsArray.length >= firstParams.value.count || !isValid)
              return;

            let newParam = {
              amount: firstParams?.value.count,
              numberOfAgreement: firstParams?.value.contractId,
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
          if (paramsArray.length < firstParams.value.count) return;

          dispatch(
            createRevaluation({
              id: JSON.parse(localStorage?.user)?.id,
              products: paramsArray,
            })
          );
          firstParams.set({ count: "", contractId: "" });
          secondStepParam.set([]);
          navigate("/remark");
        }}
      >
        Далее
      </button>
    </main>
  );
}
