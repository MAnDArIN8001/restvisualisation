import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { tryGetUser } from "../../../Redux/Slices/auth";
import { createTable } from "../../../Redux/Slices/worker";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({
  setStep,
  countValue,
  setCountValue,
  resultArrayState,
}) {
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");
  const [sizing, setSizing] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [resultArray, setResultArray] = useState(resultArrayState.value);

  const [isValidNext, setIsValidNext] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(JSON.parse(localStorage?.user));
  }, []);

  useEffect(() => {
    setIsValidNext(resultArray.length >= countValue);
    resultArrayState.set([...resultArray]);
  }, [resultArray]);

  useEffect(() => {
    let isCorrect =
      name.trim().length !== 0 &&
      sizing.trim().length !== 0 &&
      count.trim().length !== 0 &&
      price.trim().length !== 0 &&
      length.trim().length !== 0 &&
      width.trim().length !== 0 &&
      height.trim().length !== 0 &&
      weight.trim().length !== 0;

    setIsValid(isCorrect);
  }, [name, sizing, count, price, length, width, weight, height]);

  const clearFields = () => {
    setName("");
    setSizing("");
    setCount("");
    setPrice("");
    setLength("");
    setWeight("");
    setWidth("");
    setHeight("");
  };

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => setStep(0)}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.base_field}>
          <p>Введите наименование</p>
          <input
            type="text"
            placeholder="Наименование"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className={styles.base_field}>
          <p>Введите единицу измерения</p>
          <input
            type="text"
            placeholder="Единица измерения"
            value={sizing}
            onChange={(e) => setSizing(e.target.value)}
          />
        </div>

        <div className={styles.base_field}>
          <p>Введите количество</p>
          <input
            type="number"
            min={0}
            placeholder="Колисество"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        <div className={styles.base_field}>
          <p>Введите стоимость</p>
          <input
            type="number"
            min={0}
            placeholder="Стоимость"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className={styles.base_field}>
          <p>Введите вес</p>
          <input
            type="number"
            min={0}
            placeholder="Вес"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>

        <div className={`${styles.cells_stats} ${styles.twin}`}>
          <div>
            <p>Введите длинну</p>
            <input
              type="number"
              min={0}
              placeholder="Длинна"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>

          <div>
            <p>Введите ширину</p>
            <input
              type="number"
              min={0}
              placeholder="Ширина"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>

          <div>
            <p>Введите высоту</p>
            <input
              type="number"
              placeholder="Высота"
              min={0}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
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
            if (!isValid || resultArray.length >= countValue) return;

            let params = {
              id: currentUser.id,
              length,
              width,
              height,
              name,
              unit: sizing,
              price,
              weight,
              amount: count,
              status: "accepted",
            };

            setResultArray([...resultArray, params]);

            clearFields();
          }}
        >
          Добавить
        </button>
      </section>

      <button
        className={`${isValidNext ? styles.active : ""}`}
        onClick={() => {
          if (!isValidNext) return;

          dispatch(createTable({ products: resultArray, id: currentUser?.id }));
          setCountValue("");
          resultArrayState.set([]);
          navigate("/resiaving");
        }}
      >
        Далее
      </button>
    </main>
  );
}
