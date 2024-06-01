import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchDocs } from "../../Redux/Slices/director";
import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function ReportsPage() {
  const [burgerState, setBurgerState] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [writeoff, setWriteOff] = useState(false);
  const [nonverified, setNonVerified] = useState(false);
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
          <h1>Отчеты</h1>

          <h3>Выберите необходимые параметры</h3>

          <section className={styles.parametrs}>
            <div className={styles.parametr}>
              <input
                type="checkbox"
                id="droped_product"
                value={writeoff}
                onChange={(e) => {
                  setWriteOff(!writeoff);
                }}
              />
              <label htmlFor="droped_product">Списанный товар</label>
            </div>

            <div className={styles.parametr}>
              <input
                type="checkbox"
                id="saving_product"
                value={accepted}
                onChange={(e) => setAccepted(!accepted)}
              />
              <label htmlFor="saving_product">Хранимый товар</label>
            </div>

            <div className={styles.parametr}>
              <input
                type="checkbox"
                id="unchecked_product"
                value={nonverified}
                onChange={(e) => setNonVerified(!nonverified)}
              />
              <label htmlFor="unchecked_product">Неучтенный товар</label>
            </div>
          </section>

          <button
            className={styles.blue_button}
            onClick={() => {
              dispatch(
                fetchDocs({
                  accepted,
                  writeoff,
                  nonverified,
                  userId: currentUser?.id,
                })
              );
            }}
          >
            Сформировать
          </button>
        </section>
      </main>
    </>
  );
}
