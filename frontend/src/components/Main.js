import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
const Profile = React.lazy(() => import("profile/Profile"));


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="content">
      <section className="profile page__section">
        <React.Suspense fallback="Loading Profile">
            <Profile store={props.store} actions={props.actions} />
        </React.Suspense>
      </section>
      <section className="places page__section">
        <ul className="places__list">
          {/*cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))*/}
        </ul>
      </section>
    </main>
  );
}


export default Main;
