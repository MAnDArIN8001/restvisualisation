import { useNavigate } from "react-router-dom";

import styles from "../../Assets/Styles/Style.module.scss";

import boxSvg from "../../Assets/Pictures/иконки/коробка открыта.svg";
import documentSvg from "../../Assets/Pictures/иконки/документ.svg";
import pacageSvg from "../../Assets/Pictures/иконки/коробка.svg";
import qualityControlSvg from "../../Assets/Pictures/иконки/лупа.svg";
import updateSystemSvg from "../../Assets/Pictures/иконки/обновить.svg";
import removingSvg from "../../Assets/Pictures/иконки/мусорка.svg";
import factorySvg from "../../Assets/Pictures/иконки/factory_et5rhm0ii166.svg";
import closeSvg from "../../Assets/Pictures/иконки/close_24dp_FILL0_wght400_GRAD0_opsz24.svg";

export default function BurgerMenu({ currentState, setters }) {
  const navigate = useNavigate();

  const currentUser = {
    first_namme: "",
    second_name: "",
    title: "director",
  };

  const navigationButtonnsByRole = [
    {
      role: "accountant",
      buttons: (
        <>
          <section
            onClick={() => {
              navigate("/reports");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={documentSvg} alt="analys:img" />
            <p>Отчеты</p>
          </section>

          <section
            className={styles.removing}
            onClick={() => {
              navigate("/removing");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
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
          <section
            onClick={() => {
              navigate("/resiaving");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={boxSvg} alt="resiaving:img" />
            <p>Получение</p>
          </section>

          <section
            onClick={() => {
              navigate("/redirecting");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={pacageSvg} alt="redirecting:img" />
            <p>Перемещение</p>
          </section>

          <section
            onClick={() => {
              navigate("/remark");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={updateSystemSvg} alt="remark:img" />
            <p>Переоценка</p>
          </section>

          <section
            onClick={() => {
              navigate("/reports");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={documentSvg} alt="analys:img" />
            <p>Отчеты</p>
          </section>

          <section
            onClick={() => {
              navigate("/inventarisation");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={qualityControlSvg} alt="inventarysation:img" />
            <p>Инвентаризация</p>
          </section>

          <section
            onClick={() => {
              navigate("/organization/org");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={factorySvg} alt="organization:img" />
            <p>Организация</p>
          </section>

          <section
            className={styles.removing}
            onClick={() => {
              navigate("/removing");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
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
          <section
            onClick={() => {
              navigate("/resiaving");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={boxSvg} alt="resiaving:img" />
            <p>Получение</p>
          </section>

          <section
            onClick={() => {
              navigate("/redirecting");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={pacageSvg} alt="redirecting:img" />
            <p>Перемещение</p>
          </section>

          <section
            onClick={() => {
              navigate("/remark");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={updateSystemSvg} alt="remark:img" />
            <p>Переоценка</p>
          </section>

          <section
            onClick={() => {
              navigate("/inventarisation");
              document
                .querySelector("body")
                .classList.remove(styles.burger_opened);
            }}
          >
            <img src={qualityControlSvg} alt="inventarysation:img" />
            <p>Инвентаризация</p>
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
    <section
      className={`${styles.burger_menu} ${currentState ? styles.active : ""} `}
    >
      <div className={styles.burger_header}>
        <h1>WMS</h1>

        <img onClick={setters.CloseMenu} src={closeSvg} alt="close:img" />
      </div>
      {GetButtonsByCurrentRole()}
    </section>
  );
}
