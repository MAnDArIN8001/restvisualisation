import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";

import styles from "../../../Assets/Styles/Style.module.scss";

import closeButtonSvg from "../../../Assets/Pictures/иконки/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

export default function ProductReciavingWithContractWindow() {
  const [currentStep, setCurrentStep] = useState(0);

  const [firstStepParams, setFirstStepParams] = useState({
    count: "",
    contractId: "",
  });

  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const NextButtonValidation = () => {
    if (currentStep === 0) {
      setIsValid(
        firstStepParams.count.trim().length !== 0 &&
          firstStepParams.contractId.trim().length !== 0
      );
    } else if (currentStep === 1) {
      setIsValid(false);
    }
  };

  const stepsElements = [
    <FirstPart
      navigate={navigate}
      setCurrentStep={setCurrentStep}
      setFirstStepParams={setFirstStepParams}
      isValid={isValid}
      key={0}
    />,
    <SecondPart
      setStep={setCurrentStep}
      firstParams={firstStepParams}
      key={1}
    />,
  ];

  const GetCurrentStepWindow = () => {
    if (currentStep >= stepsElements.length) {
      return stepsElements[stepsElements.length - 1];
    }

    return stepsElements[currentStep];
  };

  useEffect(() => {
    NextButtonValidation();
  }, [currentStep, firstStepParams]);

  return (
    <>
      <header>
        <nav className={`${styles.container}`}>
          <div className={styles.logo}>
            <img
              src={closeButtonSvg}
              alt="close:img"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/remark")}
            />
            <h1>Прием товара</h1>
          </div>
        </nav>
      </header>

      <section className={`${styles.route} ${styles.container}`}>
        <div className={`${styles.route_circle} ${styles.active}`}>1</div>
        <div className={styles.route_line}></div>
        <div
          className={`${styles.route_circle} ${
            currentStep === 1 ? styles.active : ""
          }`}
        >
          2
        </div>
      </section>

      {GetCurrentStepWindow()}
    </>
  );
}
