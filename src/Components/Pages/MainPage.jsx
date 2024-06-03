import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BaseText from "../Authorization/BaseText";

import styles from "../../Assets/Styles/Style.module.scss";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

export default function MainPage() {
  const [isSignin, setSignin] = useState(false);
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
      <Header
        changeSignin={setSignin}
        currentUser={currentUser}
        openMenu={OpenMenu}
      />

      <main className={`${styles.container} ${isSignin ? styles.auth : ""}`}>
        {currentUser && <Navigation />}

        <section className={`${styles.content} ${styles.center}`}>
          {currentUser ? <BaseText /> : <Outlet />}
        </section>
      </main>
    </>
  );
}
