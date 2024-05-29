import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchUserData } from "../../Redux/Slices/auth";

import styles from "../../Assets/Styles/Style.module.scss";

export default function LoginWindow() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkFields = () => {
    let isInputsCorrect = true;

    let inputs = document.querySelector("#login").querySelectorAll("input");

    for (let input of inputs) {
      if (input.value.trim().length === 0) {
        input.classList.add(styles.wrong);

        isInputsCorrect = false;
      } else {
        input.classList.remove(styles.wrong);
      }
    }

    if (isInputsCorrect) {
      FetchUser();
    }
  };

  const FetchUser = async () => {
    const userData = {
      login,
      password,
    };

    const data = await dispatch(fetchUserData(userData));

    console.log(data);

    if (!data?.error) {
      navigate("/");
    }
  };

  return (
    <section
      id="login"
      className={`${styles.input_field} ${styles.large_field}`}
    >
      <h1>Авторизация</h1>

      <div className={styles.base_field}>
        <p>Логин</p>
        <input
          type="text"
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Пароль</p>
        <input
          type="password"
          placeholder="Введите парлоль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className={`${styles.blue_button} ${styles.full_scale}`}
        onClick={checkFields}
      >
        Войти
      </button>
    </section>
  );
}
