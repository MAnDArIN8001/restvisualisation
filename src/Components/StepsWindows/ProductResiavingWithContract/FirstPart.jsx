import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function FirstPart({
  navigate,
  setFirstStepParams,
  setCurrentStep,
  isValid,
}) {
  const [countValue, setCountValueInner] = useState("");
  const [contractId, setContractId] = useState("");

  useEffect(() => {
    let newParams = {
      count: countValue,
      contractId: contractId,
    };

    setFirstStepParams(newParams);
  }, [countValue, contractId]);

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => navigate("/remark")}>
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

        <div className={styles.base_field}>
          <p>Введите номер договора</p>
          <input
            type="number"
            placeholder="Номер договора"
            value={contractId}
            onChange={(e) => {
              setContractId(e.target.value);
            }}
          />
        </div>
      </section>

      <button
        className={isValid ? styles.active : ""}
        onClick={() => setCurrentStep(1)}
      >
        Далее
      </button>
    </main>
  );
}
