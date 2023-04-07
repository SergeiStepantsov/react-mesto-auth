import profileEditIcon from "../images/pen.svg";
import addIcon from "../images/plus.svg";
import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          ></button>
          <img
            className="profile__avatar-img"
            src={currentUser.avatar}
            alt="фото профиля"
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-conteiner">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
              aria-label="Кнопка редактирования профиля"
            >
              <img
                className="profile__edit-button-pen"
                src={profileEditIcon}
                aria-label="Кнопка редактирования аватара"
                alt="Кнопка редактирования аватара"
              />
            </button>
          </div>
          <p className="profile__activity">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-plus"
            src={addIcon}
            aria-label="Кнопка добваления карточки"
            alt="Кнопка добавления карточки"
          />
        </button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            card={card}
          ></Card>
        ))}
      </section>
    </main>
  );
}

export default Main;
