import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function FirstPart({
  navigate,
  firstStepParam,
  setCurrentStep,
  isValid,
}) {
  const [countValue, setCountValueInner] = useState(firstStepParam.value.count);
  const [contractId, setContractId] = useState(firstStepParam.value.contractId);

  useEffect(() => {
    let newParams = {
      count: countValue,
      contractId: contractId,
    };

    firstStepParam.set(newParams);
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
            min={0}
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
            min={0}
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
