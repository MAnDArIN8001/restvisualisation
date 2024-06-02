import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { tryGetUser } from "../../Redux/Slices/auth";

import { fetchInventory } from "../../Redux/Slices/accountant";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function InventarisationPage() {
  const [currentId, setCurrentId] = useState("");
  const [products, setProducts] = useState([]);
  const [burgerState, setBurgerState] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_namme: "",
    second_name: "",
    title: "buhgalter",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(JSON.parse(localStorage?.user));
  }, []);

  const OpenMenu = () => {
    setBurgerState(true);
  };

  const CloseMenu = () => {
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
          <h1>Инвентаризация</h1>

          <section className={styles.input_field}>
            <p>Введите уникальный номер</p>

            <input
              type="text"
              placeholder="Уникальный номер"
              value={currentId}
              onChange={(e) => {
                if (isNaN(Number(e.target.value.slice(0, -1)))) {
                  return;
                }

                if (e.target.value.length > 0 && e.target.value <= 0) {
                  setCurrentId("1");

                  return;
                }

                setCurrentId(e.target.value);
              }}
            />

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
                  products.find((num) => num === currentId.trim())
                ) {
                  return;
                }

                setProducts([...products, { number: currentId }]);
                setCurrentId("");
              }}
            >
              Подтвердить
            </button>

            <p>Добавление товаров: {products.length}</p>
          </section>

          <button
            className={styles.blue_button}
            onClick={() => {
              dispatch(
                fetchInventory({ id: currentUser?.id, ships: products })
              );

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
