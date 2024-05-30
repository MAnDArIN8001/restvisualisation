import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { writeOff } from "../../Redux/Slices/accountant";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function RemovingPage() {
  const [products, setProducts] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [reasone, setReasone] = useState("");
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
              onChange={(e) => setCurrentId(e.target.value)}
            />

            <p>Укажите причину</p>
            <input
              type="text"
              placeholder="Причина"
              value={reasone}
              onChange={(e) => setReasone(e.target.value)}
            />

            <button
              className={`${styles.blue_button} ${styles.small}`}
              onClick={() => {
                if (
                  currentId.trim().length !== 0 ||
                  /^\d+(\.\d+)?$/.test(currentId) ||
                  reasone.trim().length !== 0
                ) {
                  setProducts([...products, { number: currentId, reasone }]);

                  setCurrentId("");
                  setReasone("");
                }
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
            onClick={() => {
              if (products.length === 0) return;

              dispatch(
                writeOff({ userId: currentUser.id, products: products })
              );
            }}
          >
            Завершить
          </button>
        </section>
      </main>
    </>
  );
}
