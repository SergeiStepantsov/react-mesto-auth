import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AddPlacePopup from "./AddPlacePoup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, checkToken } from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessTooltipStatus, setIsSuccessTooltipStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      link: link,
      name: name,
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(userInfo) {
    api
      .editProfile(userInfo)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .editAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(password, email) {
    register(password, email)
      .then((res) => {
        if (res) {
          setIsInfoTooltipOpen(true);
          navigate("/sign-in");
          setIsSuccessTooltipStatus(true);
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccessTooltipStatus(false);
      });
  }

  function handleLogin(password, email) {
    authorize({ password, email })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          setEmail(email);
          navigate("/", { replace: true });
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccessTooltipStatus(false);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                component={Main}
              />
            }
          />

          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-up" />
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        ></AddPlacePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
          link={selectedCard}
          isOpen={selectedCard}
        />

        <InfoTooltip
          name="register"
          isOpen={isInfoTooltipOpen}
          isSuccessTooltipStatus={isSuccessTooltipStatus}
          onClose={closeAllPopups}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
