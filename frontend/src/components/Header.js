import React from 'react';
import { Route, Link } from 'react-router-dom';
import LogoPath from '../images/logo.svg';
import { useDispatch } from "react-redux"
import { appStateActions } from "../utils/reducer"

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header ({onSignOut, email }) {
    const dispatch = useDispatch();

    const handleSignin = (e) => {
        e.preventDefault();
        dispatch(appStateActions.moveTo("/signin"));
    }

    const handleSignup = (e) => {
        e.preventDefault();
        dispatch(appStateActions.moveTo("/signup"));
    }

    const handleSignOut = (e) => {
        e.preventDefault();
        dispatch(appStateActions.logout());
    }

    return (
      <header className="header page__section">
        <LogoPath className="logo header__logo" alt="Логотип проекта Мesto" />
        <Route exact path="/">
          <div className="header__wrapper">
            <p className="header__user">{ email }</p>
            <button className="header__logout" onClick={handleSignOut}>Выйти</button>
          </div>
        </Route>
        <Route path="/signup">
          <a className="header__auth-link" href="" onClick={handleSignin}>Войти</a>
        </Route>
        <Route path="/signin">
          <a className="header__auth-link" href="" onClick={handleSignup}>Регистрация</a>
        </Route>
      </header>
    )
}

export default Header;
