import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import '../styles/card/card.css';
import '../styles/places/places.css';
import api from '../utils/api';

import ImagePopup from '../components/ImagePopup'

function Card({ card, onClick, currentUserId , onDeleteHandler }) {
    const cardStyle = { backgroundImage: `url(${card.link})` };

    const [isLiked, setIsLiked] = useState(
        card.likes.some(i => i._id === currentUserId)
    );

    const [likesCount, setLikesCount] = useState(card.likes.length);
  
    function handleClick() {
        onClick(card);
    }
  
    function handleLikeClick() {
        api.changeLikeCardStatus(card._id, !isLiked)
            .then(() => {
                setIsLiked(!isLiked);
                setLikesCount(likesCount + (isLiked ? -1 : 1));
            });
    }
  
    function handleDeleteClick() {
        onDeleteHandler(card._id);
    }
  
    const currentUser = {} //React.useContext(CurrentUserContext);
  
    //setIsLiked(card.likes.some(i => i._id === currentUserId));
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_is-active'}`;
  
    const isOwn = card.owner._id === currentUserId;
    const cardDeleteButtonClassName = (
      `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );
  
    return (
      <li className="places__item card">
        <div className="card__image" style={cardStyle} onClick={handleClick}>
        </div>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        <div className="card__description">
          <h2 className="card__title">
            {card.name}
          </h2>
          <div className="card__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="card__like-count">{likesCount}</p>
          </div>
        </div>
      </li>
    );
}


const CardsList = ({store, actions}) => {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUserId, setCurrentUserId] = useState('');
    const [reloadCardList, setReloadCardList] = useState(true);

    if (reloadCardList) {
        api.getCardList()
            .then((data) => {
                setCards(data);
            });
        setReloadCardList(false);
    }

    useSelector((state) => {
        if(currentUserId !== state.applicationState.userId) {
            setCurrentUserId(state.applicationState.userId);
        }

        if (state.applicationState.newCard && !cards.some((c) => c._id == state.applicationState.newCard._id)) {
            setCards([...cards, state.applicationState.newCard]);
        }
    });

    const deleteClickHandler = (cardId) => {
        api.removeCard(cardId)
            .then(() => {
                let new_cards = cards.filter((c) => c._id != cardId);
                setCards(new_cards);
            });
    }

    return (
        <Provider store={store}>
            <ul className="places__list">
                {cards.map((card) => (
                   <Card card={card} 
                        onClick={setSelectedCard} 
                        currentUserId={currentUserId}
                        onDeleteHandler={deleteClickHandler}
                        key={card._id}
                    />
               ))}
            </ul>
            <ImagePopup card={selectedCard} onClose={() => {setSelectedCard(null)}} />
        </Provider>
    )  
}


//<ImagePopup card={selectedCard} onClose={closeAllPopups} />

export default CardsList;
