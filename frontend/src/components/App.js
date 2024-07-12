import React from "react";
import { Route, useHistory, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
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
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [cards, setCards] = React.useState([]);

	// В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
	const [currentUser, setCurrentUser] = React.useState({});

	const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
	const [tooltipStatus, setTooltipStatus] = React.useState("");

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
               //setCurrentUser(userData);
               //setCards(cardData);
           })
           .catch((err) => console.log(err));
	}, []);

	// при монтировании App описан эффект, проверяющий наличие токена и его валидности
	//React.useEffect(() => {
	//	const token = localStorage.getItem("jwt");
	//	if (token) {
	//		auth
	//			.checkToken(token)
	//			.then((res) => {
	//				setEmail(res.data.email);
	//				setIsLoggedIn(true);
	//				history.push("/");
	//			})
	//			.catch((err) => {
	//				localStorage.removeItem("jwt");
	//				console.log(err);
	//			});
	//	}
	//}, [history]);

    useSelector((state) => {
        if (state.applicationState.userLoggedIn) {
            if(!isLoggedIn) {
                setIsLoggedIn(true);
                history.push("/");
            } 
        } else if (!state.applicationState.userLoggedIn && isLoggedIn) {
                setIsLoggedIn(false);
                console.log("push /signin");
        } else {
            history.push(state.applicationState.url);
        }
    });

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsInfoToolTipOpen(false);
		setSelectedCard(null);
	}

	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleUpdateUser(userUpdate) {
		api
			.setUserInfo(userUpdate)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleUpdateAvatar(avatarUpdate) {
		api
			.setUserAvatar(avatarUpdate)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		api
			.changeLikeCardStatus(card._id, !isLiked)
			.then((newCard) => {
				setCards((cards) =>
					cards.map((c) => (c._id === card._id ? newCard : c))
				);
			})
			.catch((err) => console.log(err));
	}

	function handleCardDelete(card) {
		api
			.removeCard(card._id)
			.then(() => {
				setCards((cards) => cards.filter((c) => c._id !== card._id));
			})
			.catch((err) => console.log(err));
	}

	function handleAddPlaceSubmit(newCard) {
		api
			.addCard(newCard)
			.then((newCardFull) => {
				setCards([newCardFull, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	function onRegister({ email, password }) {
		auth
			.register(email, password)
			.then((res) => {
				setTooltipStatus("success");
				setIsInfoToolTipOpen(true);
				history.push("/signin");
			})
			.catch((err) => {
				setTooltipStatus("fail");
				setIsInfoToolTipOpen(true);
			});
	}

	function onSignOut() {
		// при вызове обработчика onSignOut происходит удаление jwt
		localStorage.removeItem("jwt");
		setIsLoggedIn(false);
		// После успешного вызова обработчика onSignOut происходит редирект на /signin
		history.push("/signin");
	}

	return (
		// В компонент App внедрён контекст через CurrentUserContext.Provider
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page__content">
				<Header email={email} onSignOut={onSignOut} />
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
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
