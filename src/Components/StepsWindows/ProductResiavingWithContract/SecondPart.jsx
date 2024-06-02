import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";

import RemarkTemplate from "../../../PdfTablesTemplates/RemarkPrototype";

import { createRevaluation } from "../../../Redux/Slices/accountant";

import styles from "../../../Assets/Styles/Style.module.scss";

export default function SecondPart({ setStep, firstParams, secondStepParam }) {
  const [isValid, setIsValid] = useState(false);
  const [isValidNext, setIsValidNext] = useState(false);
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");

  const [paramsArray, setParamsArray] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isCorrect = id.trim().length !== 0 && price.trim().length !== 0;

    setIsValid(isCorrect);
  }, [id, price]);

  useEffect(() => {
    setIsValidNext(paramsArray.length >= firstParams.value.count);
    secondStepParam.set([...paramsArray]);
  }, [paramsArray]);

  const clearFields = () => {
    setPrice("");
    setId("");
  };

  const downloadPdf = async (data) => {
    const blob = await pdf(
      <RemarkTemplate data={data} contractId={firstParams.value.contractId} />
    ).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myfile.pdf";
    link.click();
  };

  return (
    <main className={`${styles.container} ${styles.partial_window}`}>
      <button className={styles.active} onClick={() => setStep(0)}>
        Назад
      </button>

      <section className={`${styles.input_field} ${styles.large_field}`}>
        <div className={styles.base_field}>
          <p>Уникальный номер</p>
          <input
            type="text"
            placeholder="Введите уникальный номер"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>

        <div className={styles.base_field}>
          <p>Стоимость</p>
          <input
            type="number"
            placeholder="Стоимость"
            value={price}
            onChange={(e) => {
              if (isNaN(Number(e.target.value.slice(0, -1)))) {
                return;
              }

              if (e.target.value.length > 0 && e.target.value <= 0) {
                setPrice("1");

                return;
              }

              setPrice(e.target.value);
            }}
          />
        </div>

        <button
          className={isValid ? styles.active : ""}
          onClick={() => {
            let inputs = document.querySelectorAll("input");

            for (let input of inputs) {
              if (input.value.trim().length === 0) {
                input.classList.add(styles.wrong);
              } else {
                input.classList.remove(styles.wrong);
              }
            }

            if (paramsArray.length >= firstParams.value.count || !isValid)
              return;

            let newParam = {
              amount: firstParams?.value.count,
              numberOfAgreement: firstParams?.value.contractId,
              number: id,
              cost: price,
            };

            setParamsArray([...paramsArray, newParam]);
            clearFields();
          }}
        >
          Добавить
        </button>
      </section>

      <button
        className={`${isValidNext ? styles.active : ""}`}
        onClick={async () => {
          if (paramsArray.length < firstParams.value.count) return;

          const test = await dispatch(
            createRevaluation({
              id: JSON.parse(localStorage?.user)?.id,
              products: paramsArray,
            })
          );

          downloadPdf(test.payload);
          firstParams.set({ count: "", contractId: "" });
          secondStepParam.set([]);
          navigate("/remark");
        }}
      >
        Далее
      </button>
    </main>
  );
}
