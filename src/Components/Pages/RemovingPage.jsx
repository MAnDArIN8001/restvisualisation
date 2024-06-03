import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { pdf } from "@react-pdf/renderer";

import { writeOff } from "../../Redux/Slices/accountant";
import RemovingProrptype from "../../PdfTablesTemplates/RemovingPrototype";

import MyDocument from "../../PdfTablesTemplates/TestTemplate";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function RemovingPage() {
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [reasone, setReasone] = useState("срок годности");
  const [burgerState, setBurgerState] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_namme: "",
    second_name: "",
    title: "buhgalter",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.user));
  }, []);

  const OpenMenu = () => {
    window.scroll(0, 0);
    document.querySelector("body").classList.add(styles.burger_opened);

    setBurgerState(true);
  };

  const CloseMenu = () => {
    document.querySelector("body").classList.remove(styles.burger_opened);

    setBurgerState(false);
  };

  const downloadPdf = async (data) => {
    const blob = await pdf(<RemovingProrptype data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myfile.pdf";
    link.click();
  };

  return (
    <>
      {currentUser && (
        <BurgerMenu
          currentState={burgerState}
          setters={{
            CloseMenu,
          }}
        />
      )}
      <Header currentUser={currentUser} openMenu={OpenMenu} />

      <main className={styles.container}>
        <Navigation />

        <section className={styles.content}>
          <h1>Списание товара</h1>

          <section className={styles.input_field}>
            <p>Введите уникальный номер</p>
            <input
              type="text"
              placeholder="Уникальный номер"
              value={currentId}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  return;
                }

                if (e.target.value.length > 0 && e.target.value <= 0) {
                  setCurrentId("1");

                  return;
                }

                setCurrentId(e.target.value);
              }}
            />

            <p>Укажите причину</p>
            <select
              name="reasone"
              id="reasone"
              value={reasone}
              onChange={(e) => {
                setReasone(e.target.value);
              }}
            >
              <option value="срок годности">Срок годности</option>
              <option value="брак">Брак</option>
              <option value="передача">Передача</option>
            </select>

            <button
              className={`${styles.blue_button} ${styles.small}`}
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
                  currentId.trim().length === 0 ||
                  !/^\d+(\.\d+)?$/.test(currentId) ||
                  reasone.trim().length === 0 ||
                  products.find((num) => num.number === currentId.trim())
                ) {
                  return;
                }

                setProducts([...products, { number: currentId, reasone }]);

                setCurrentId("");
              }}
            >
              Подтвердить
            </button>

            <p className={styles.total}>
              Добавление товаров: {products.length}
            </p>
          </section>

          <button
            className={styles.blue_button}
            onClick={async () => {
              if (products.length === 0) return;

              const test = await dispatch(
                writeOff({ id: currentUser.id, products: products })
              );
              console.log(test);

              if (test?.error) {
                setProducts([]);
                return;
              }

              downloadPdf(test.payload);
              setProducts([]);
            }}
          >
            Завершить
          </button>
        </section>
      </main>
    </>
  );
}
