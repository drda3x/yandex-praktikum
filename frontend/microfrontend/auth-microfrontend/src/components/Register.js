import React from 'react';
import { Link } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import '../styles/auth-form/auth-form.css';

function Register (props){
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const navAction = props.navAction;

    //const navAction = props.navAction;

	function handleSubmit(e){
		e.preventDefault();
		const userData = {
			email,
			password
		}
		onRegister(userData);
	}

    const handleOnEnterClick = (e) => {
        e.preventDefault();
        dispatch(navAction("/signin"));
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
		</div>
	)
}

const RegisterWrapper = (props) => {
    const store = props.store;
    const action = props.navAction;

    return (
        <Provider store={store}>
            <Register navAction={action} />
        </Provider>
    )
}

export default RegisterWrapper;
