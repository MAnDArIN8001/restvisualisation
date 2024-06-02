import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { tryGetUser } from "../../Redux/Slices/auth";

import styles from "../../Assets/Styles/Style.module.scss";

export default function Navigation() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryGetUser());

    setCurrentUser(
      JSON.parse(localStorage.user === null ? null : localStorage?.user)
    );
  }, []);

  const navigationButtonnsByRole = [
    {
      role: "accountant",
      buttons: (
        <>
          <section onClick={() => navigate("/remark")}>
            <svg viewBox="0 -12 512 511" xmlns="http://www.w3.org/2000/svg">
              <path d="m486.605469 322.164062c8.535156-25.125 12.859375-51.398437 12.859375-78.199218 0-65.03125-25.324219-126.167969-71.308594-172.15625-45.988281-45.984375-107.125-71.308594-172.15625-71.308594-54.050781 0-105.25 17.359375-148.0625 50.203125l-5.949219 4.5625 29.980469 39.078125 5.949219-4.5625c34.132812-26.183594 74.964843-40.023438 118.082031-40.023438 107.085938 0 194.207031 87.121094 194.207031 194.207032 0 18.382812-2.546875 36.472656-7.582031 53.90625l-22.144531-12.230469 1.996093 104.523437 89.523438-53.976562zm-4.597657 14.59375-45.03125 27.152344-1.003906-52.582031 15.265625 8.433594c4.429688-13.011719 13.96875-38.398438 13.96875-75.796875 0-115.355469-93.851562-209.207032-209.207031-209.207032-43.933594 0-85.667969 13.34375-121.179688 38.664063l-11.730468-15.289063c38.910156-27.921874 84.699218-42.636718 132.910156-42.636718 61.023438 0 118.398438 23.765625 161.550781 66.917968 43.152344 43.152344 66.914063 100.527344 66.914063 161.550782 0 32.386718-6.046875 57.332031-16.320313 85.136718zm0 0"></path>
              <path d="m277.140625 60.648438-10.140625 27.792968c-90.246094-6.34375-166.914062 65.351563-166.914062 155.523438 0 31.636718 9.4375 62.105468 27.285156 88.121094l4.242187 6.183593 40.617188-27.871093-4.246094-6.183594c-12.195313-17.773438-18.640625-38.605469-18.640625-60.25 0-56.492188 44.144531-102.867188 99.75-106.4375l-7.785156 21.339844 102.964844-18.089844zm-21.140625 61.660156c-67.082031 0-121.65625 54.574218-121.65625 121.65625 0 22.167968 5.933594 43.59375 17.222656 62.425781l-15.90625 10.914063c-13.484375-22.0625-20.574218-47.261719-20.574218-73.339844 0-83.210938 72.292968-149.121094 156.183593-140.089844l5.835938.628906 5.21875-14.308594 33.773437 40.304688-51.796875 9.101562 6.148438-16.851562c-11.191407-.386719-12.296875-.441406-14.449219-.441406zm0 0"></path>
              <path d="m187.023438 259.460938v24.328124l68.976562 39.820313 68.976562-39.820313v-79.648437l-68.976562-39.820313-68.976562 39.820313v35.324219h15v-26.664063l53.976562-31.164062 53.976562 31.164062v62.328125l-53.976562 31.164063-53.976562-31.164063v-15.667968zm0 0"></path>
              <path d="m280.832031 243.960938c0-13.691407-11.140625-24.832032-24.832031-24.832032s-24.832031 11.140625-24.832031 24.832032c0 13.691406 11.140625 24.832031 24.832031 24.832031s24.832031-11.136719 24.832031-24.832031zm-34.667969 0c0-5.421876 4.414063-9.835938 9.835938-9.835938s9.835938 4.414062 9.835938 9.835938c0 5.421874-4.414063 9.835937-9.835938 9.835937s-9.835938-4.414063-9.835938-9.835937zm0 0"></path>
              <path d="m380.386719 149.660156-40.613281 27.867188 4.242187 6.1875c12.195313 17.773437 18.640625 38.609375 18.640625 60.25 0 56.492187-44.144531 102.867187-99.75 106.4375l7.78125-21.339844-102.960938 18.089844 67.132813 80.128906 10.140625-27.792969c3.679688.257813 7.359375.390625 11 .390625 37.691406 0 74.101562-13.6875 102.523438-38.546875l-9.875-11.289062c-25.6875 22.464843-58.589844 34.839843-92.648438 34.839843-8.667969 0-14.449219-.738281-21.105469-1.457031l-5.222656 14.3125-33.769531-40.308593 51.792968-9.101563-6.148437 16.863281c11.394531.378906 12.398437.429688 14.453125.429688 67.078125 0 121.65625-54.574219 121.65625-121.65625 0-22.167969-5.933594-43.59375-17.222656-62.421875l15.90625-10.917969c13.484375 22.066406 20.574218 47.265625 20.574218 73.339844 0 34.058594-12.371093 66.960937-34.832031 92.648437l11.289063 9.871094c24.851562-28.421875 38.539062-64.828125 38.539062-102.519531 0-31.632813-9.433594-62.101563-27.28125-88.117188zm0 0"></path>
              <path d="m374.078125 398.148438c-34.132813 26.183593-74.960937 40.023437-118.078125 40.023437-107.085938 0-194.207031-87.121094-194.207031-194.207031 0-18.382813 2.546875-36.472656 7.582031-53.90625l22.140625 12.230468-1.992187-104.523437-89.523438 53.976563 25.394531 14.023437c-8.535156 25.125-12.859375 51.398437-12.859375 78.199219 0 64.363281 24.882813 125.050781 70.066406 170.878906l10.679688-10.527344c-42.398438-43.007812-65.746094-99.957031-65.746094-160.351562 0-32.4375 6.070313-57.402344 16.320313-85.136719l-13.867188-7.65625 45.035157-27.152344 1.003906 52.582031-15.269532-8.433593c-4.070312 11.972656-13.964843 37.886719-13.964843 75.796875 0 115.359375 93.851562 209.207031 209.207031 209.207031 43.933594 0 85.667969-13.34375 121.179688-38.664063l11.730468 15.289063c-38.910156 27.917969-84.699218 42.636719-132.910156 42.636719-54.582031 0-107.339844-19.492188-148.558594-54.882813l-9.769531 11.378907c43.933594 37.722656 100.164063 58.5 158.328125 58.5 54.050781 0 105.25-17.359376 148.058594-50.203126l5.949218-4.5625-29.980468-39.078124zm0 0"></path>
              <path d="m256.613281 298.015625-7.5-12.988281 42.214844-24.371094 7.5 12.988281zm46.503907-40.550781h-15v-15h15zm0-24.996094h-15v-15h15zm0 0"></path>
            </svg>
            <p>Переоценка</p>
          </section>

          <section onClick={() => navigate("/reports")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z M 15 22 L 15 24 L 35 24 L 35 22 Z M 15 28 L 15 30 L 31 30 L 31 28 Z M 15 34 L 15 36 L 35 36 L 35 34 Z" />
            </svg>
            <p>Отчеты</p>
          </section>

          <section onClick={() => navigate("/inventarisation")}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 321.52 321.52"
            >
              <g>
                <g>
                  <path d="M93.12,77.667v77.76l67.627-38.4L93.12,77.667z M106.987,101.773l26.56,15.36l-26.56,15.253V101.773z"></path>
                </g>
              </g>
              <g>
                <g>
                  <path d="M117.013,32.973c-46.4,0-84.053,37.653-84.053,84.053c0,46.4,37.653,84.053,84.053,84.053 c46.4,0,84.053-37.653,84.053-84.053C201.067,70.627,163.413,32.973,117.013,32.973z M117.013,187.213 c-38.72,0-70.187-31.467-70.187-70.187c0-38.72,31.467-70.187,70.187-70.187c38.72,0,70.187,31.467,70.187,70.187 C187.2,155.747,155.733,187.213,117.013,187.213z"></path>
                </g>
              </g>
              <g>
                <g>
                  <path d="M308.8,247.053l-52.373-52.373l-0.107-0.107c-2.56-2.453-5.973-3.84-9.6-3.84s-7.04,1.387-9.6,3.947l-5.973,5.973 l-17.6-17.6c12.907-18.773,20.48-41.6,20.48-66.027c0-64.533-52.48-117.013-117.013-117.013S0,52.493,0,117.027 S52.48,234.04,117.013,234.04c24.427,0,47.147-7.573,66.027-20.48l17.6,17.6l-5.973,5.973c-2.56,2.453-4.053,5.973-4.053,9.6 c0,3.52,1.493,7.04,4.053,9.6l52.48,52.373c8.213,8.32,19.2,12.8,30.827,12.8s22.613-4.587,30.827-12.8 C325.76,291.747,325.76,264.013,308.8,247.053z M117.013,220.173c-56.853,0-103.147-46.293-103.147-103.147 S60.16,13.88,117.013,13.88S220.16,60.173,220.16,117.027S173.867,220.173,117.013,220.173z M194.027,205.027 c3.84-3.413,7.573-7.04,10.987-10.88l16.32,16.32l-10.88,10.88L194.027,205.027z M298.987,299 c-5.547,5.547-13.013,8.64-21.013,8.64c-7.893,0-15.36-3.093-21.013-8.747l-52.267-52.16l42.027-42.027l52.267,52.267 C310.613,268.6,310.613,287.373,298.987,299z"></path>
                </g>
              </g>
            </svg>
            <p>Инвентаризация</p>
          </section>

          <section
            className={styles.removing}
            onClick={() => navigate("/removing")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z" />
            </svg>
            <p>Списание</p>
          </section>
        </>
      ),
    },
    {
      role: "director",
      buttons: (
        <>
          <section onClick={() => navigate("/reports")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z M 15 22 L 15 24 L 35 24 L 35 22 Z M 15 28 L 15 30 L 31 30 L 31 28 Z M 15 34 L 15 36 L 35 36 L 35 34 Z" />
            </svg>
            <p>Отчеты</p>
          </section>
        </>
      ),
    },
    {
      role: "worker",
      buttons: (
        <>
          <section onClick={() => navigate("/resiaving")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              width="64px"
              height="64px"
            >
              <path d="M15,109.8l48,17c0,0,0,0,0,0c0.1,0,0.2,0.1,0.3,0.1c0.2,0.1,0.5,0.1,0.7,0.1c0.2,0,0.3,0,0.5,0c0,0,0,0,0,0c0,0,0,0,0.1,0 c0.1,0,0.3-0.1,0.4-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V73.4l10-3.5c0.8-0.3,1.5-1,1.8-1.8s0.2-1.8-0.3-2.6l-12-20 c0,0-0.1-0.1-0.1-0.1c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0,0c0-0.1-0.1-0.1-0.1-0.2c0,0,0,0,0-0.1c-0.1-0.1-0.1-0.1-0.2-0.2 c0,0-0.1-0.1-0.1-0.1c0,0-0.1-0.1-0.1-0.1c0,0-0.1,0-0.1,0c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.2-0.1-0.3-0.1c-0.1,0-0.1-0.1-0.2-0.1 c0,0,0,0,0,0c0,0,0,0,0,0l-48-17c0,0,0,0-0.1,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c0,0,0,0,0,0c0,0,0,0,0,0 c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.2,0-0.4,0c-0.1,0-0.1,0-0.2,0c-0.2,0-0.4,0.1-0.5,0.1l-48,17 c-0.2,0.1-0.3,0.1-0.5,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.2,0.1-0.3,0.2c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.2,0.1-0.2,0.2 c0,0-0.1,0.1-0.1,0.1c-0.1,0.1-0.1,0.2-0.2,0.2c0,0,0,0.1-0.1,0.1l-12,20c-0.7,1.1-0.6,2.5,0.2,3.4C2.3,69.6,3.1,70,4,70 c0.3,0,0.7-0.1,1-0.2l8-2.8v40C13,108.3,13.8,109.4,15,109.8z M119.5,65.4l-42.2,15l-8.9-14.8l42.2-15L119.5,65.4z M67,34.2L103,47 L67,59.8V34.2z M67,74.8l6.4,10.7C74,86.5,75,87,76,87c0.3,0,0.7-0.1,1-0.2l32-11.3v29.4l-42,14.9V74.8z M19,51.2l42,14.9v53.6 l-42-14.9V51.2z" />
            </svg>
            <p>Получение</p>
          </section>

          <section onClick={() => navigate("/redirecting")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              width="64px"
              height="64px"
            >
              <path d="M63,14.2l-48,17c-1.2,0.4-2,1.6-2,2.8v60c0,1.3,0.8,2.4,2,2.8l48,17c0.3,0.1,0.7,0.2,1,0.2c0.2,0,0.3,0,0.5,0 c0,0,0.1,0,0.1,0c0.1,0,0.2-0.1,0.3-0.1c0,0,0,0,0,0l48-17c1.2-0.4,2-1.6,2-2.8V34c0,0,0-0.1,0-0.1c0-0.1,0-0.3,0-0.4 c0,0,0-0.1,0-0.1c-0.2-1-0.9-1.9-1.9-2.2l-24-8.5c0,0-0.1,0-0.1,0c-0.6-0.2-1.4-0.3-2.1,0L40,39.2c-1.2,0.4-2,1.6-2,2.8v11 c0,1.7,1.3,3,3,3s3-1.3,3-3v-8.9l43.8-15.5L103,34L63,48.2c-1.2,0.4-2,1.5-2,2.8c0,0,0,0,0,0.1v55.8L19,91.9V36.1l46-16.3 c1.6-0.6,2.4-2.3,1.8-3.8C66.3,14.4,64.6,13.6,63,14.2z M67,53.1l42-14.9v53.6l-42,14.9V53.1z" />
            </svg>
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
