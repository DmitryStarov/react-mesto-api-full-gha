import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-container" onClick={onEditAvatar}>
          <img
            alt="аватар"
            className="profile__image"
            src={currentUser.avatar}
          />
          <div className="profile__edit-image"></div>
        </div>
        <div className="profile__content">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__button-edit"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
