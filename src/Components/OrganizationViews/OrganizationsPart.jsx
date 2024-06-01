import { useState } from "react";
import { useDispatch } from "react-redux";

import { createOrganization } from "../../Redux/Slices/director";

import styles from "../../Assets/Styles/Style.module.scss";

export default function OrganizationsPart() {
  const [inn, setInn] = useState("");
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");

  const dispatch = useDispatch();

  return (
    <section className={styles.input_field}>
      <h1>Организации</h1>

      <div className={styles.base_field}>
        <p>УНП организации</p>
        <input
          type="text"
          placeholder="Введите унп организации"
          value={inn}
          onChange={(e) => setInn(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Наименование</p>
        <input
          type="text"
          placeholder="Введите наименование"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Юредический адрес</p>
        <input
          type="text"
          placeholder="Введите юредический адрес"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
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

          if (
            inn.trim().length === 0 ||
            name.trim().length === 0 ||
            adress.trim().length === 0
          ) {
            return;
          }

          dispatch(createOrganization({ inn: inn, name, adress }));
        }}
      >
        Добавить
      </button>
    </section>
  );
}
