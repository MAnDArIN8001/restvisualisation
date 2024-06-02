import { useState } from "react";
import { useDispatch } from "react-redux";

import { createRack } from "../../Redux/Slices/director";

import styles from "../../Assets/Styles/Style.module.scss";

export default function RacksPart() {
  const [inn, setInn] = useState("");
  const [number, setNumber] = useState("");
  const [capacity, setWeightness] = useState("");
  const [celsCount, setCelsCount] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const dispatch = useDispatch();

  const validateFields = () => {
    if (
      number.length === 0 ||
      capacity.length === 0 ||
      celsCount.length === 0 ||
      length.length === 0 ||
      width.length === 0 ||
      height.length === 0
    ) {
      return false;
    }

    return true;
  };

  return (
    <section className={`${styles.input_field} ${styles.bold}`}>
      <h1>Стеллажи</h1>

      <div className={styles.base_field}>
        <p>УНП организации</p>
        <input
          type="number"
          placeholder="Введите номер склада"
          value={inn}
          onChange={(e) => {
            if (isNaN(Number(e.target.value.slice(0, -1)))) {
              return;
            }

            if (e.target.value.length > 0 && e.target.value <= 0) {
              setInn("1");

              return;
            }

            setInn(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Номер склада</p>
        <input
          type="number"
          placeholder="Введите номер склада"
          value={number}
          onChange={(e) => {
            if (isNaN(Number(e.target.value.slice(0, -1)))) {
              return;
            }

            if (e.target.value.length > 0 && e.target.value <= 0) {
              setNumber("1");

              return;
            }

            setNumber(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Грузоподъемность</p>
        <input
          type="number"
          placeholder="Введите грузоподъемность"
          value={capacity}
          onChange={(e) => {
            if (isNaN(Number(e.target.value.slice(0, -1)))) {
              return;
            }

            if (e.target.value.length > 0 && e.target.value <= 0) {
              setWeightness("1");

              return;
            }

            setWeightness(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Число ячеек</p>
        <input
          type="text"
          placeholder="Введите число ячеек"
          value={celsCount}
          onChange={(e) => {
            if (isNaN(Number(e.target.value.slice(0, -1)))) {
              return;
            }

            if (e.target.value.length > 0 && e.target.value <= 0) {
              setCelsCount("1");

              return;
            }

            setCelsCount(e.target.value);
          }}
        />
      </div>

      <div className={styles.cells_stats}>
        <div>
          <p>Длинна ячейки</p>
          <input
            type="text"
            placeholder="Введите длинну ячейки"
            value={length}
            onChange={(e) => {
              if (isNaN(Number(e.target.value.slice(0, -1)))) {
                return;
              }

              if (e.target.value.length > 0 && e.target.value <= 0) {
                setLength("1");

                return;
              }
              setLength(e.target.value);
            }}
          />
        </div>

        <div>
          <p>Ширина ячейки</p>
          <input
            type="text"
            placeholder="Введите ширину ячейкиы"
            value={width}
            onChange={(e) => {
              if (isNaN(Number(e.target.value.slice(0, -1)))) {
                return;
              }

              if (e.target.value.length > 0 && e.target.value <= 0) {
                setWidth("1");

                return;
              }

              setWidth(e.target.value);
            }}
          />
        </div>

        <div>
          <p>Высота ячейки</p>
          <input
            type="text"
            placeholder="Введите высоту ячейкиы"
            value={height}
            onChange={(e) => {
              if (isNaN(Number(e.target.value.slice(0, -1)))) {
                return;
              }

              if (e.target.value.length > 0 && e.target.value <= 0) {
                setHeight("1");

                return;
              }

              setHeight(e.target.value);
            }}
          />
        </div>
      </div>

      <button
        className={`${styles.blue_button} ${styles.full_size} ${styles.left_side}`}
        onClick={() => {
          let inputs = document.querySelectorAll("input");

          for (let input of inputs) {
            if (input.value.trim().length === 0) {
              input.classList.add(styles.wrong);
            } else {
              input.classList.remove(styles.wrong);
            }
          }

          if (!validateFields()) {
            return;
          }

          dispatch(
            createRack({
              organizationINN: inn,
              number,
              capacity,
              amount: celsCount,
              length,
              width,
              height,
            })
          );
        }}
      >
        Добавить
      </button>
    </section>
  );
}
