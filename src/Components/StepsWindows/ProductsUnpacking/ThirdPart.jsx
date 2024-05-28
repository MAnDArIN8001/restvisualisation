import { useEffect, useState } from "react";

import styles from "../../../Assets/Styles/Style.module.scss";

import TTHField from "./TTHField";
import THField from "./THField";

export default function ThirdPart({
  navigate,
  setThirdStepParams,
  setCurrentStep,
  isValid,
}) {
  const [currentType, setCurrentType] = useState("");

  useEffect(() => {
    let newParams = {
      type: "",
      data: {},
    };

    setThirdStepParams(newParams);
  }, []);

  const getCurrentTypeForm = () => {
    if (currentType === "tth") {
      return <TTHField />;
    } else if (currentType === "th") {
      return <THField />;
    } else {
      return <></>;
    }
  };

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => navigate("/remark")}>
        Назад
      </button>

      <aside className={styles.options_choise}>
        <div className={styles.parametr}>
          <input
            type="checkbox"
            id="tth"
            checked={currentType === "tth"}
            onClick={() => setCurrentType("tth")}
          />
          <label htmlFor="tth">TTH</label>
        </div>

        <div className={styles.parametr}>
          <input
            type="checkbox"
            id="th"
            checked={currentType === "th"}
            onClick={() => setCurrentType("th")}
          />
          <label htmlFor="th">TH</label>
        </div>
      </aside>

      {getCurrentTypeForm()}

      <button>Далее</button>
    </main>
  );
}
