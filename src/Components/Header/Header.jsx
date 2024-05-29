import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../Redux/Slices/auth";

import styles from "../../Assets/Styles/Style.module.scss";

import profileImg from "../../Assets/Pictures/иконки/пользователь.svg";
import burgerButtonSvg from "../../Assets/Pictures/иконки/menu_24dp_FILL0_wght400_GRAD0_opsz24.svg";

export default function Header({ currentUser, openMenu, changeSignin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <header>
      <nav className={`${styles.container} ${styles.navigation}`}>
        <div className={styles.logo}>
          <img
            src={burgerButtonSvg}
            alt="buger:img"
            className={styles.burger_button}
            onClick={openMenu}
          />
          <h1 onClick={() => navigate("/")}>WMS</h1>
        </div>

        {!currentUser ? (
          <section className={styles.navigation_buttons}>
            <button
              onClick={() => {
                navigate("/login");
                changeSignin(false);
              }}
            >
              Войти
            </button>
            <button
              onClick={() => {
                navigate("/signin");
                changeSignin(true);
              }}
            >
              Регистрация
            </button>
          </section>
        ) : (
          <img
            src={profileImg}
            alt="profile:img"
            onClick={() => {
              dispatch(logOut());
              navigate("");
              window.location.reload();
            }}
          />
        )}
      </nav>
    </header>
  );
}
