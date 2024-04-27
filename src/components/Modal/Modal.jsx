import React, { useState, useContext } from "react";
import "./modal.css";
import { loginAPI, registerAPI } from "../../api/auth";
import { getProfileAPI } from "../../api/profile";
import { UserContext } from "../../App";

const Modal = ({ active, setActive }) => {
  const [signInOr, setSignInOr] = useState(false);
  const [emailSignIn, setEmailSignIn] = useState("");
  const [passwordSignIn, setpasswordSignIn] = useState("");

  const [loginSignUp, setLoginSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setpasswordSignUp] = useState("");
  const [confirmPassword, setConfirmPasswordl] = useState(null);

  const [errorMessage, setErrorMasage] = useState("");

  const userContext = useContext(UserContext);

  const regist = async (e) => {
    e.preventDefault();
    try {
      if (passwordSignUp !== confirmPassword) {
        setErrorMasage("Пароли не совпадают!");
      } else {
        await registerAPI(loginSignUp, emailSignUp, passwordSignUp);
        await loginAPI(emailSignUp, passwordSignUp);
        const profile = await getProfileAPI();
        userContext.setUser(profile);
        setActive(false);
      }
    } catch (error) {
      setErrorMasage(error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await loginAPI(emailSignIn, passwordSignIn);
      const profile = await getProfileAPI();
      userContext.setUser(profile);
    } catch (error) {
      setErrorMasage(error);
      return;
    }
  };

  return (
    <div
      className={active ? "modal open" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal_box" onClick={(e) => e.stopPropagation()}>
        <div className="BlueBg">
          <div className="box signin">
            <h2>Уже есть аккаунт ?</h2>
            <button className="signinBtn" onClick={() => setSignInOr(false)}>
              Войти
            </button>
          </div>
          <div className="box signup">
            <h2>Нет аккаунта ?</h2>
            <button className="signupBtn" onClick={() => setSignInOr(true)}>
              Зарегестрироваться
            </button>
          </div>
        </div>
        <div className={signInOr ? "formBx active" : "formBx"}>
          <div className="form signinForm">
            <form onSubmit={login}>
              <h3>Вход</h3>
              <input
                value={emailSignIn}
                onChange={(e) => setEmailSignIn(e.target.value)}
                id="emailLog"
                type="text"
                placeholder="Почта"
              />
              <input
                value={passwordSignIn}
                onChange={(e) => setpasswordSignIn(e.target.value)}
                id="passwordLog"
                type="password"
                placeholder="Пароль"
              />
              <input id="LoginButton" type="submit" placeholder="Войти" />
              <a href="#" className="forgot">
                Забыли пароль?
              </a>
              {errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage.toString()}</p>
              ) : (
                ""
              )}
            </form>
          </div>
          <div className="form signupForm">
            <form onSubmit={regist}>
              <h3>Регестрация</h3>
              <input
                value={loginSignUp}
                onChange={(e) => setLoginSignUp(e.target.value)}
                id="username"
                type="text"
                placeholder="Логин"
              />
              <input
                value={emailSignUp}
                onChange={(e) => setEmailSignUp(e.target.value)}
                id="email"
                type="text"
                placeholder="Почта"
              />
              <input
                value={passwordSignUp}
                onChange={(e) => setpasswordSignUp(e.target.value)}
                id="password"
                type="password"
                placeholder="Пароль"
              />
              <input
                onChange={(e) => setConfirmPasswordl(e.target.value)}
                type="text"
                placeholder="Подтвердите пароль"
              />
              <input
                id="submitButton"
                type="submit"
                placeholder="Зарегестрироваться"
              />
              {errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage.toString()}</p>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
