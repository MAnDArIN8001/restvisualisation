import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function FirstPart({
  navigate,
  countValueState,
  setCurrentStep,
  isValid,
}) {
  const [countValue, setCountValueInner] = useState(countValueState.value);

  useEffect(() => {
    countValueState.set(countValue);
  }, [countValue]);

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => navigate("/resiaving")}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.base_field}>
          <p>Введите число позиций</p>
          <input
            type="number"
            placeholder="Количество"
            value={countValue}
            onChange={(e) => {
              setCountValueInner(e.target.value);
            }}
          />
        </div>
      </section>

      <button
        className={isValid ? styles.active : ""}
        onClick={() => {
          if (!isValid) return;

          setCurrentStep(1);
        }}
      >
        Далее
      </button>
    </main>
  );
}
