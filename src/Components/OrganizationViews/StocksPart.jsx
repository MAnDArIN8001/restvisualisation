import { useState } from "react";
import { useDispatch } from "react-redux";

import { createWarehouse } from "../../Redux/Slices/director";

import styles from "../../Assets/Styles/Style.module.scss";

export default function StocksPart() {
  const [inn, setInn] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");

  const dispatch = useDispatch();

  return (
    <section className={styles.input_field}>
      <h1>Склады</h1>

      <div className={styles.base_field}>
        <p>УНП организации</p>
        <input type="text" placeholder="Введите унп организации" />
      </div>

      <div className={styles.base_field}>
        <p>Наименование</p>
        <input type="text" placeholder="Введите наименование" />
      </div>

      <div className={styles.base_field}>
        <p>Адрес</p>
        <input type="text" placeholder="Введите адрес" />
      </div>
      <button
        className={`${styles.blue_button} ${styles.full_size} ${styles.left_side}`}
        onClick={() => {
          if (
            inn.trim().length === 0 ||
            name.trim().length === 0 ||
            adress.trim().length === 0
          ) {
            return;
          }

          dispatch(createWarehouse({ organizationINN: inn, name, adress }));
        }}
      >
        Добавить
      </button>
    </section>
  );
}
