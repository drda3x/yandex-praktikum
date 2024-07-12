import React from 'react';
import { Provider, useDispatch } from 'react-redux';

import '../styles/auth-form/auth-form.css';
import '../styles/login/login.css';
import * as auth from "../utils/auth";
import InfoTooltip from "../components/InfoTooltip"

function Login ({appStateActions}){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
	const [tooltipStatus, setTooltipStatus] = React.useState("");

    const dispatch = useDispatch();

    function handleSubmit(e){
        e.preventDefault();
        const userData = {
            email,
            password
        }
        onLogin(userData);
    }

    function onLogin({ email, password }) {
        auth.login(email, password)
            .then((res) => {
                console.log("CALL ONLOGIN");
                dispatch(appStateActions.login(email))
                //dispatch(appStateActions.moveTo("/"))
            })
            .catch((err) => {
                console.log("LOGIN ERROR", err);
                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);
            });
    }

    const onClose = () => {

    }

    return (
        <div className="auth-form">
            <form className="auth-form__form" onSubmit={handleSubmit}>
                <div className="auth-form__wrapper">
                    <h3 className="auth-form__title">Вход</h3>
                    <label className="auth-form__input">
                        <input type="text" name="name" id="email"
                            className="auth-form__textfield" placeholder="Email"
                            onChange={e => setEmail(e.target.value)} required    />
                    </label>
                    <label className="auth-form__input">
                        <input type="password" name="password" id="password"
                            className="auth-form__textfield" placeholder="Пароль"
                            onChange={e => setPassword(e.target.value)} required    />
                    </label>
                </div>
                <button className="auth-form__button" type="submit">Войти</button>
            </form>

            <InfoTooltip
                    isOpen={isInfoToolTipOpen}
                    onClose={onClose}
                    status={tooltipStatus}
            />
        </div>
    )
}

const LoginWrapper = (props) => {
    const store = props.store;
    const actions = props.actions;

    return (
        <Provider store={store}>
            <Login appStateActions={actions} />
        </Provider>
    )
}

export default LoginWrapper;
