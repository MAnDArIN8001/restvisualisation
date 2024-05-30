import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchRevaluation } from "../../Redux/Slices/accountant";
import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function RemarkPage() {
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

    setCurrentUser(JSON.parse(localStorage?.user));

    dispatch(fetchRevaluation({ id: currentUser?.id }));
  }, []);

  const { reavaluation } = useSelector((state) => state.accountant);

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
          <h1>Переоценка товара</h1>

          <table>
            <thead>
              <tr>
                <td>Уникальный номер</td>
                <td>Наименование</td>
                <td>Дата поступления</td>
              </tr>
            </thead>

            <tbody>
              {reavaluation ? (
                reavaluation?.map((item, index) => {
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
            onClick={() => {
              navigate("/remark/steps");
            }}
          >
            Переоценить
          </button>
        </section>
      </main>
    </>
  );
}
