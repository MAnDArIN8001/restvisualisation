import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { tryGetUser } from "../../Redux/Slices/auth";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";
import BurgerMenu from "../BurgerMeny/BrgerMenu";

import styles from "../../Assets/Styles/Style.module.scss";

export default function OrganizationPage() {
  const [burgerState, setBurgerState] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

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
          <h1>О организации</h1>

          <section className={styles.organization_navigation}>
            <Link to="/organization/org">Организации</Link>
            <Link to="/organization/stores">Склады</Link>
            <Link to="/organization/racks">Стеллажи</Link>
          </section>

          <Outlet />
        </section>
      </main>
    </>
  );
}
