import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchTable } from "../../Redux/Slices/worker";
import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function ProductMovingPage() {
  const [burgerState, setBurgerState] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_namme: "",
    second_name: "",
    title: "buhgalter",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(localStorage?.user);

    dispatch(fetchTable({ id: currentUser?.id }));
  }, []);

  const { table } = useSelector((state) => state.worker);

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
          <h1>Перемещение товара со склада</h1>

          <table>
            <thead>
              <tr>
                <td>Уникальный номер</td>
                <td>Наименование</td>
                <td>Дата поступления</td>
              </tr>
            </thead>

            <tbody>
              {table ? (
                table?.map((item, index) => {
                  <tr key={index}>
                    <td>{item?.number}</td>
                    <td>{item?.name}</td>
                    <td>{item?.date}</td>
                  </tr>;
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>

          <button
            className={styles.blue_button}
            onClick={() => navigate("/redirecting/steps")}
          >
            Отгрузить товар
          </button>
        </section>
      </main>
    </>
  );
}
