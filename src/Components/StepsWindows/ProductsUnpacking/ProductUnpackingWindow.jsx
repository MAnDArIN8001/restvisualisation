import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import FirstPart from "./FirstPart";
import SecondPart from "./SecondPart";
import ThirdPart from "./ThirdPart";

import styles from "../../../Assets/Styles/Style.module.scss";

import closeButtonSvg from "../../../Assets/Pictures/иконки/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

export default function ProductUnpackingWindow() {
  const [currentStep, setCurrentStep] = useState(0);

  const [countValue, setCountValue] = useState("");
  const [secondStepParams, setSecondStepParams] = useState([]);
  const [thirdStepParams, setThirdStepParams] = useState({
    type: "",
    data: {},
  });

  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const NextButtonValidation = () => {
    if (currentStep === 0) {
      setIsValid(countValue.trim().length !== 0);
    }
  };

  const stepsElements = [
    <FirstPart
      navigate={navigate}
      setCurrentStep={setCurrentStep}
      setCountValue={setCountValue}
      isValid={isValid}
      key={0}
    />,
    <SecondPart
      setCurrentStep={setCurrentStep}
      countValue={countValue}
      setSecondStepParams={setSecondStepParams}
      secondStepParams={secondStepParams}
      key={1}
    />,
    <ThirdPart
      navigate={navigate}
      setCurrentStep={setCurrentStep}
      setThirdStepParams={setThirdStepParams}
      isValid={isValid}
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
  }, [currentStep, countValue, secondStepParams]);

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
            <h1>Отгрузка товара</h1>
          </div>
        </nav>
      </header>

      <section className={`${styles.route} ${styles.container}`}>
        <div className={`${styles.route_circle} ${styles.active}`}>1</div>
        <div className={styles.route_line}></div>
        <div
          className={`${styles.route_circle} ${
            currentStep >= 1 ? styles.active : ""
          }`}
        >
          2
        </div>
        <div className={styles.route_line}></div>
        <div
          className={`${styles.route_circle} ${
            currentStep === 2 ? styles.active : ""
          }`}
        >
          3
        </div>
      </section>

      {GetCurrentStepWindow()}
    </>
  );
}
