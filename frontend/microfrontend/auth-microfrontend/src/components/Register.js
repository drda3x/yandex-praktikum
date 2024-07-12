import React from 'react';
import { Link } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import * as auth from "../utils/auth";
import InfoTooltip from "../components/InfoTooltip"

import '../styles/auth-form/auth-form.css';

function Register ({actions}){
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
	const [tooltipStatus, setTooltipStatus] = React.useState("");
    const dispatch = useDispatch();

    //const navAction = props.navAction;

	function handleSubmit(e){
		e.preventDefault();
		auth
			.register(email, password)
			.then((res) => {
                setIsInfoToolTipOpen(true);
				setTooltipStatus("success");
			})
			.catch((err) => {
				setTooltipStatus("fail");
				setIsInfoToolTipOpen(true);
			});
	}

    const handleOnEnterClick = (e) => {
        e.preventDefault();
        dispatch(actions.moveTo("/signin"));
    }

    const onClose = () => {
        if (tooltipStatus == "success") {
            dispatch(actions.moveTo("/signin"));
        }
        setIsInfoToolTipOpen(false);
    }

	return (
		<div className="auth-form">
			<form className="auth-form__form" onSubmit={handleSubmit}>
				<div className="auth-form__wrapper">
					<h3 className="auth-form__title">Регистрация</h3>
					<label className="auth-form__input">
						<input type="text" name="email" id="email"
							className="auth-form__textfield" placeholder="Email"
							onChange={e => setEmail(e.target.value)} required	/>
					</label>
					<label className="auth-form__input">
						<input type="password" name="password" id="password"
							className="auth-form__textfield" placeholder="Пароль"
							onChange={e => setPassword(e.target.value)} required	/>
					</label>
				</div>
				<div className="auth-form__wrapper">
					<button className="auth-form__button" type="submit">Зарегистрироваться</button>
					<p className="auth-form__text">Уже зарегистрированы? 
                        <a href="" className="auth-form__link" onClick={handleOnEnterClick}>Войти</a>
                    </p>
				</div>
			</form>
            <InfoTooltip
                isOpen={isInfoToolTipOpen}
                onClose={onClose}
                status={tooltipStatus}
            />
		</div>
	)
}

const RegisterWrapper = (props) => {
    const store = props.store;
    const actions = props.actions;

    return (
        <Provider store={store}>
            <Register actions={actions} />
        </Provider>
    )
}

export default RegisterWrapper;
