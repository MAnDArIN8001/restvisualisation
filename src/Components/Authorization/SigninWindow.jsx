import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { registerUserData } from "../../Redux/Slices/auth";

import styles from "../../Assets/Styles/Style.module.scss";
import { useNavigate } from "react-router-dom";

export default function SigninWindow() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [thirdName, setThirdName] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  const phoneInput = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    let phonePattern = /^\+\d{15}$/;

    return phonePattern.test(phone);
  };

  const checkFields = () => {
    let isInputsCorrect = true;

    let inputs = document.querySelector("#signin").querySelectorAll("input");

    for (let input of inputs) {
      if (input.value.trim().length === 0) {
        input.classList.add(styles.wrong);

        isInputsCorrect = false;
      } else if (input.id === "phone" && !validatePhone(input.value)) {
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
    let newUser = {
      login,
      password,
      phone,
      title: role,
      firstName: name,
      secondName: lastName,
      surname: thirdName,
      organizationId,
    };

    const data = await dispatch(registerUserData(newUser));

    console.log(data);

    if (!data?.error) {
      navigate("/");
      window.location.reload();
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
          type="password"
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
          maxLength={16}
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

      <div className={styles.base_field}>
        <p>Идентификатор организации</p>
        <input
          type="number"
          placeholder="Введите идентификатор"
          value={organizationId}
          onChange={(e) => {
            if (isNaN(Number(e.target.value.slice(0, -1)))) {
              return;
            }

            if (e.target.value.length > 0 && e.target.value <= 0) {
              setOrganizationId("1");

              return;
            }

            setOrganizationId(e.target.value);
          }}
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
