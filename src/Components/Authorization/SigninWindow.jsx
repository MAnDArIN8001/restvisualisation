import { useState, useRef } from "react";

import styles from "../../Assets/Styles/Style.module.scss";

export default function SigninWindow() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [thirdName, setThirdName] = useState("");

  const phoneInput = useRef();

  const validatePhone = (phone) => {
    let phonePattern = /^\+\d{15}$/;

    return phonePattern.test(phone);
  };

  const checkFields = () => {
    let inputs = document.querySelector("#signin").querySelectorAll("input");

    for (let input of inputs) {
      if (input.value.trim().length === 0) {
        input.classList.add(styles.wrong);
      } else if (input.id === "phone" && validatePhone(input.value)) {
        input.classList.add(styles.wrong);
      } else {
        input.classList.remove(styles.wrong);
      }
    }
  };

  return (
    <section
      id="signin"
      className={`${styles.input_field} ${styles.large_field}`}
    >
      <h1>Регистрация</h1>

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
          type="text"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Телефон</p>
        <input
          id="phone"
          type="text"
          placeholder="Введите телефон"
          value={phone}
          ref={phoneInput}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Должность</p>
        <select
          name=""
          id=""
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="director">Директор</option>
          <option value="accountant">Бухгалтер</option>
          <option value="worker">Сотрудник склада</option>
        </select>
      </div>

      <div className={styles.base_field}>
        <p>Имя</p>
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Фамилия</p>
        <input
          type="text"
          placeholder="Введите фамилию"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className={styles.base_field}>
        <p>Отчество</p>
        <input
          type="text"
          placeholder="Введите отчество"
          value={thirdName}
          onChange={(e) => setThirdName(e.target.value)}
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
