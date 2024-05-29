import { Link, useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Navigation from "../Navgation/Navigation";

import styles from "../../Assets/Styles/Style.module.scss";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.error_nav}>
        <nav>
          <h1 onClick={() => navigate("/")}>WMS</h1>
        </nav>
      </header>

      <main className={`${styles.container} ${styles.error}`}>
        <h1>Что-то пошло не так...</h1>

        <Link to={"/"}>Вернуться на главную</Link>
      </main>
    </>
  );
}
