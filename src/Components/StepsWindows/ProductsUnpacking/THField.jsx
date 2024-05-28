import { useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function THField() {
  const [resiaver, setResiaver] = useState("");
  const [adress, setAdress] = useState("");
  const [reazone, setReazone] = useState("");
  const [aproovedBy, setAproovedBy] = useState("");
  const [id, setId] = useState;

  return (
    <section className={`${styles.input_field} ${styles.large_field}`}>
      <div className={styles.base_field}>
        <p>Наименование грузополучателя</p>
        <input
          type="text"
          placeholder="Наименование"
          value={resiaver}
          onChange={(e) => {
            setResiaver(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Адрес грузополучателя</p>
        <input
          type="text"
          placeholder="Адрес"
          value={adress}
          onChange={(e) => {
            setAdress(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Основание отпуска</p>
        <input
          type="text"
          placeholder="Основание"
          value={reazone}
          onChange={(e) => {
            setReazone(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Отпуск разрешил</p>
        <input
          type="text"
          placeholder="Должность и имя"
          value={aproovedBy}
          onChange={(e) => {
            setAproovedBy(e.target.value);
          }}
        />
      </div>

      <div className={styles.base_field}>
        <p>Номер накладной</p>
        <input
          type="number"
          placeholder="Номер"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
      </div>

      <button className={`${styles.blue_button}`}>Подтвердить</button>
    </section>
  );
}
