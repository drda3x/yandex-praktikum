import React from "react";
import { Route, useHistory, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import { Provider, useSelector, useDispatch } from "react-redux"
import store from "../utils/store"
import { appStateActions } from "../utils/reducer"

const Login = React.lazy(() => import("auth/Login"));
const Register = React.lazy(() => import("auth/Register"));
const CheckToken = React.lazy(() => import("auth/CheckToken"));

function App() {
	const [cards, setCards] = React.useState([]);

	// В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
	const [currentUser, setCurrentUser] = React.useState({});
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	//В компоненты добавлены новые стейт-переменные: email — в компонент App
	const [email, setEmail] = React.useState("");

	const history = useHistory();
    const dispatch = useDispatch();

	// Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
	React.useEffect(() => {
        api.getAppInfo()
           .then(([cardData, userData]) => {
               dispatch(appStateActions.setUserInfo(userData));
           })
           .catch((err) => console.log(err));
	}, []);

    useSelector((state) => {
        if (state.applicationState.userLoggedIn) {
            if(!isLoggedIn) {
                setIsLoggedIn(true);
                setEmail(state.applicationState.userEmail);
                history.push("/");
            } 
        } else if (!state.applicationState.userLoggedIn && isLoggedIn) {
                setIsLoggedIn(false);
        } else {
            history.push(state.applicationState.url);
        }
    });

	return (
		// В компонент App внедрён контекст через CurrentUserContext.Provider
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__content">
				<Header email={email} />
				<Switch>
					{/*Роут / защищён HOC-компонентом ProtectedRoute*/}
					<ProtectedRoute
						exact
						path="/"
						component={Main}
						cards={cards}
						loggedIn={isLoggedIn}
                        store={store}
                        actions={appStateActions}
					/>
					{/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
					<Route path="/signup">
						<React.Suspense fallback="Loading Register">
                            <Register store={store} actions={appStateActions} />
						</React.Suspense>
					</Route>
					<Route path="/signin">
						<React.Suspense fallback="Loading Login">
                            <Login store={store} actions={appStateActions} />
						</React.Suspense>
					</Route>
				</Switch>
				<Footer />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
