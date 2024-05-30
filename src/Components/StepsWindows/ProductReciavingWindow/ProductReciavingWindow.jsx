import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";

import styles from "../../../Assets/Styles/Style.module.scss";

import closeButtonSvg from "../../../Assets/Pictures/иконки/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

export default function ProductReciavingWindow() {
  const [currentStep, setCurrentStep] = useState(0);

  const [countValue, setCountValue] = useState("");
  const [contranctId, setContractId] = useState("");

  const [resultArray, setResultArray] = useState([]);

  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const NextButtonValidation = () => {
    if (currentStep === 0) {
      setIsValid(countValue.trim().length !== 0);
    } else if (currentStep === 1) {
      setIsValid(false);
    }
  };

  const stepsElements = [
    <FirstPart
      setCurrentStep={setCurrentStep}
      countValueState={{ set: setCountValue, value: countValue }}
      contractIdState={{ set: setContractId, value: contranctId }}
      isValid={isValid}
      navigate={navigate}
      key={0}
    />,
    <SecondPart
      setStep={setCurrentStep}
      countValue={countValue}
      resultArrayState={{ set: setResultArray, value: resultArray }}
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
  }, [countValue, currentStep]);

  return (
    <>
      <header>
        <nav className={`${styles.container}`}>
          <div className={styles.logo}>
            <img
              src={closeButtonSvg}
              alt="close:img"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/resiaving")}
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
