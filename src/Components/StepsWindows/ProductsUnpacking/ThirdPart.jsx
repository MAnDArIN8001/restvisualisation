import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";

import { shipProduct } from "../../../Redux/Slices/worker";
import TTHTemplate from "../../../PdfTablesTemplates/TTHTemplate";
import THTemplate from "../../../PdfTablesTemplates/THTemplate";

import styles from "../../../Assets/Styles/Style.module.scss";

import TTHField from "./TTHField";
import THField from "./THField";

export default function ThirdPart({
  setThirdStepParams,
  thirdStepParams,
  setCurrentStep,
  dataToSend,
}) {
  const [currentType, setCurrentType] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [vechicle, setVechicle] = useState(thirdStepParams.vechicle);
  const [reciaverName, setReciaverName] = useState(
    thirdStepParams.reciaverName
  );
  const [adress, setAdress] = useState(thirdStepParams.adress);
  const [vocationReasone, setVocationReasone] = useState(
    thirdStepParams.vocationReasone
  );
  const [vocationAproover, setVocationAproover] = useState(
    thirdStepParams.vocationAproover
  );
  const [contractNumber, setContractNumber] = useState(
    thirdStepParams.contractNumber
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentType === "tth" &&
      (vechicle.trim().length === 0 ||
        reciaverName.trim().length === 0 ||
        adress.trim().length === 0 ||
        vocationReasone.trim().length === 0 ||
        vocationAproover.trim().length === 0 ||
        contractNumber.trim().length === 0)
    ) {
      setIsValid(false);
    } else if (currentType === "tth") {
      setIsValid(true);
    }

    if (
      currentType === "th" &&
      (reciaverName.trim().length === 0 ||
        adress.trim().length === 0 ||
        vocationReasone.trim().length === 0 ||
        vocationAproover.trim().length === 0 ||
        contractNumber.trim().length === 0)
    ) {
      setIsValid(false);
    } else if (currentType === "th") {
      setIsValid(true);
    }
  }, [
    vechicle,
    reciaverName,
    adress,
    vocationReasone,
    vocationAproover,
    contractNumber,
    currentType,
  ]);

  const updateParams = () => {
    let newParams = {
      vechicle,
      reciaverName,
      adress,
      vocationReasone,
      vocationAproover,
      contractNumber,
    };

    setThirdStepParams(newParams);
  };

  const downloadPdf = async (data) => {
    let sumPrice = 0;
    let sumWeight = 0;

    for (let item of data) {
      sumPrice += item.price;
      sumWeight += item.weight;
    }

    const blob = await pdf(
      currentType === "tth" ? (
        <TTHTemplate
          data={data}
          car={vechicle}
          sumPrice={sumPrice}
          sumWeight={sumWeight}
        />
      ) : (
        <THTemplate
          data={data}
          car={vechicle}
          sumPrice={sumPrice}
          sumWeight={sumWeight}
        />
      )
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myfile.pdf";
    link.click();
  };

  const getCurrentTypeForm = () => {
    if (currentType === "tth") {
      return (
        <TTHField
          setParams={updateParams}
          vechicle={{ value: vechicle, set: setVechicle }}
          reciaverName={{ value: reciaverName, set: setReciaverName }}
          adress={{ value: adress, set: setAdress }}
          vocationReasone={{ value: vocationReasone, set: setVocationReasone }}
          vocationAproover={{
            value: vocationAproover,
            set: setVocationAproover,
          }}
          contractNumber={{ value: contractNumber, set: setContractNumber }}
        />
      );
    } else if (currentType === "th") {
      return (
        <THField
          setParams={updateParams}
          reciaverName={{ value: reciaverName, set: setReciaverName }}
          adress={{ value: adress, set: setAdress }}
          vocationReasone={{ value: vocationReasone, set: setVocationReasone }}
          vocationAproover={{
            value: vocationAproover,
            set: setVocationAproover,
          }}
          contractNumber={{ value: contractNumber, set: setContractNumber }}
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => setCurrentStep(1)}>
        Назад
      </button>

      <aside className={styles.options_choise}>
        <div className={styles.parametr}>
          <input
            type="checkbox"
            id="tth"
            checked={currentType === "tth"}
            onChange={() => setCurrentType("tth")}
          />
          <label htmlFor="tth">TTH</label>
        </div>

        <div className={styles.parametr}>
          <input
            type="checkbox"
            id="th"
            checked={currentType === "th"}
            onChange={() => setCurrentType("th")}
          />
          <label htmlFor="th">TH</label>
        </div>
      </aside>

      {getCurrentTypeForm()}

      <button
        className={`${isValid ? styles.active : ""}`}
        onClick={async () => {
          if (!isValid) return;

          console.log(JSON.parse(localStorage.user));

          const test = await dispatch(
            shipProduct({
              id: JSON.parse(localStorage?.user)?.id,
              products: dataToSend.secondPart,
            })
          );

          downloadPdf(test?.payload);
          navigate("/redirecting");
        }}
      >
        Далее
      </button>
    </main>
  );
}
