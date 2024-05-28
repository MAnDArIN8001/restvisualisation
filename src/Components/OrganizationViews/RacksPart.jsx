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
      !/^\d+(\.\d+)?$/.test(number) ||
      !/^\d+(\.\d+)?$/.test(capacity) ||
      !/^\d+(\.\d+)?$/.test(celsCount) ||
      !/^\d+(\.\d+)?$/.test(length) ||
      !/^\d+(\.\d+)?$/.test(width) ||
      !/^\d+(\.\d+)?$/.test(height)
    ) {
      return false;
    }
  };

  return (
    <section className={`${styles.input_field} ${styles.bold}`}>
      <h1>Стеллажи</h1>

      <div className={styles.base_field}>
        <p>УНП организации</p>
        <input
          type="text"
          placeholder="Введите номер склада"
          value={inn}
          onChange={(e) => setInn(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Номер склада</p>
        <input
          type="text"
          placeholder="Введите номер склада"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Грузоподъемность</p>
        <input
          type="text"
          placeholder="Введите грузоподъемность"
          value={capacity}
          onChange={(e) => setWeightness(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Число ячеек</p>
        <input
          type="text"
          placeholder="Введите число ячеек"
          value={celsCount}
          onChange={(e) => setCelsCount(e.target.value)}
        />
      </div>

      <div className={styles.cells_stats}>
        <div>
          <p>Длинна ячейки</p>
          <input
            type="text"
            placeholder="Введите длинну ячейки"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div>
          <p>Ширина ячейки</p>
          <input
            type="text"
            placeholder="Введите ширину ячейкиы"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div>
          <p>Высота ячейки</p>
          <input
            type="text"
            placeholder="Введите высоту ячейкиы"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <button
        className={`${styles.blue_button} ${styles.full_size} ${styles.left_side}`}
        onClick={() => {
          if (!validateFields()) {
            return;
          }

          dispatch(
            createRack({
              INN: inn,
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
