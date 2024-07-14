import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
const Profile = React.lazy(() => import("profile/Profile"));
const CardsList = React.lazy(() => import("card/CardsList"));


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
      <React.Suspense fallback="Loading Cards">
          <CardsList store={props.store} actions={props.actions} />
      </React.Suspense>
      </section>
    </main>
  );
}


export default Main;
