import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";

import styles from "../../Assets/Styles/Style.module.scss";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

export default function MainPage() {
  const [burgerState, setBurgerState] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    first_namme: "",
    second_name: "",
    title: "buhgalter",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(JSON.parse(localStorage.user ?? null));
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
        {currentUser && <Navigation />}

        <section className={`${styles.content} ${styles.center}`}>
          {currentUser ? (
            <section className={styles.main_page_content_box}>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa
                ex nostrum laborum libero nihil inventore nulla corporis rem
                deleniti perferendis sapiente quaerat tempora ipsa, dicta
                distinctio sed dolores vero in dignissimos maxime quisquam
                laudantium deserunt? Hic rem consequatur nemo, et deleniti
                accusamus ratione eligendi quos totam architecto reprehenderit
                possimus recusandae?
              </p>
            </section>
          ) : (
            <Outlet />
          )}
        </section>
      </main>
    </>
  );
}
