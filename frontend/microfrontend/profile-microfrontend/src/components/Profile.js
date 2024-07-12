import React, { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import api from '../utils/api';
import '../styles/popup/popup.css';
import '../styles/profile/profile.css';

import AddPlacePopup from "../components/AddPlacePopup"
import EditAvatarPopup from "../components/EditAvatarPopup"
import EditProfilePopup from "../components/EditProfilePopup.js"


const Profile = ({actions}) => {
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
		React.useState(false);

	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
		React.useState(false);

	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = 
        React.useState(false);

    const [userInfo, setUserInfo] = React.useState({
        name: '',
        avatar: '',
        about: ''
    });

    useSelector((state) => {
        if (
            userInfo.name !== state.userName ||
            userInfo.about !== state.userAbout ||
            userInfo.avatar !== state.userAvatar
        ) {
            setUserInfo({
                name: state.userName,
                about: state.userAbout,
                avatar: state.userAvatar
            });
        }
    });

    const closePopup = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

	const handleEditProfileClick = () => {
		setIsEditProfilePopupOpen(true);
	}

	const handleEditAvatarClick = () => {
		setIsEditAvatarPopupOpen(true);
	}

	const handleAddPlaceClick = () => {
		setIsAddPlacePopupOpen(true);
	}

	const handleUpdateUser = (userUpdate) => {
		api
			.setUserInfo(userUpdate)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	const handleUpdateAvatar = (avatarUpdate) => {
		api
			.setUserAvatar(avatarUpdate)
			.then((newUserData) => {
				setCurrentUser(newUserData);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

	const handleAddPlaceSubmit = (newCard) => {
		api
			.addCard(newCard)
			.then((newCardFull) => {
				setCards([newCardFull, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err));
	}

    const onEditAvatar = () => {

    }

    const onEditProfile = () => {

    }

    const onAddPlace = () => {

    }

    const imageStyle = { backgroundImage: `url(${userInfo.avatar})` };
    return (
        <section className="profile page__section">
            <div className="profile__image" onClick={onEditAvatar} style={imageStyle}></div>
            <div className="profile__info">
                <h1 className="profile__title">{userInfo.name}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                <p className="profile__description">{userInfo.about}</p>
            </div>
            <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onUpdateUser={handleUpdateUser}
                onClose={closePopup}
                currentUser={userInfo}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closePopup}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closePopup}
            />
        </section>
    )
}


const ProfileWrapper = ({store, actions}) => {
    return (
        <Provider store={store}>
            <Profile actions={actions} />
        </Provider>
    )
}

export default ProfileWrapper;
