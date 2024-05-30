import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { tryGetUser } from "../../Redux/Slices/auth";

import styles from "../../Assets/Styles/Style.module.scss";

import boxSvg from "../../Assets/Pictures/иконки/коробка открыта.svg";
import documentSvg from "../../Assets/Pictures/иконки/документ.svg";
import pacageSvg from "../../Assets/Pictures/иконки/коробка.svg";
import qualityControlSvg from "../../Assets/Pictures/иконки/лупа.svg";
import updateSystemSvg from "../../Assets/Pictures/иконки/обновить.svg";
import removingSvg from "../../Assets/Pictures/иконки/мусорка.svg";
import factorySvg from "../../Assets/Pictures/иконки/factory_et5rhm0ii166.svg";

export default function Navigation() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    first_namme: "",
    second_name: "",
    title: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(JSON.parse(localStorage.user ?? null));
  }, []);

  const navigationButtonnsByRole = [
    {
      role: "accountant",
      buttons: (
        <>
          <section onClick={() => navigate("/remark")}>
            <img src={updateSystemSvg} alt="remark:img" />
            <p>Переоценка</p>
          </section>

          <section onClick={() => navigate("/reports")}>
            <img src={documentSvg} alt="analys:img" />
            <p>Отчеты</p>
          </section>

          <section onClick={() => navigate("/inventarisation")}>
            <img src={qualityControlSvg} alt="inventarysation:img" />
            <p>Инвентаризация</p>
          </section>

          <section
            className={styles.removing}
            onClick={() => navigate("/removing")}
          >
            <img src={removingSvg} alt="removing:img" />
            <p>Списание</p>
          </section>
        </>
      ),
    },
    {
      role: "director",
      buttons: (
        <>
          <section onClick={() => navigate("/resiaving")}>
            <img src={boxSvg} alt="resiaving:img" />
            <p>Получение</p>
          </section>

          <section onClick={() => navigate("/redirecting")}>
            <img src={pacageSvg} alt="redirecting:img" />
            <p>Перемещение</p>
          </section>

          <section onClick={() => navigate("/remark")}>
            <img src={updateSystemSvg} alt="remark:img" />
            <p>Переоценка</p>
          </section>

          <section onClick={() => navigate("/reports")}>
            <img src={documentSvg} alt="analys:img" />
            <p>Отчеты</p>
          </section>

          <section onClick={() => navigate("/inventarisation")}>
            <img src={qualityControlSvg} alt="inventarysation:img" />
            <p>Инвентаризация</p>
          </section>

          <section onClick={() => navigate("/organization/org")}>
            <img src={factorySvg} alt="organization:img" />
            <p>Организация</p>
          </section>

          <section
            className={styles.removing}
            onClick={() => navigate("/removing")}
          >
            <img src={removingSvg} alt="removing:img" />
            <p>Списание</p>
          </section>
        </>
      ),
    },
    {
      role: "worker",
      buttons: (
        <>
          <section onClick={() => navigate("/resiaving")}>
            <img src={boxSvg} alt="resiaving:img" />
            <p>Получение</p>
          </section>

          <section onClick={() => navigate("/redirecting")}>
            <img src={pacageSvg} alt="redirecting:img" />
            <p>Перемещение</p>
          </section>
        </>
      ),
    },
  ];

  const GetButtonsByCurrentRole = () => {
    if (!currentUser) {
      return (
        <>
          <p style={{ textAlign: "center" }}>Вы должны быть авторизованы!</p>
        </>
      );
    }

    for (var button of navigationButtonnsByRole) {
      if (button.role === currentUser.title) {
        return button.buttons;
      }
    }
  };

  return (
    <nav className={styles.navigation_interface}>
      {GetButtonsByCurrentRole()}
    </nav>
  );
}
