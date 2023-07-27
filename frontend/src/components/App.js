import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { auth } from "../utils/Auth";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Registration from "./Registration";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmailUser(data.data.email);
            setIsLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [emailUser, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [isLoggedIn]);

  function handleRegistration(data) {
    auth
      .registration(data)
      .then((data) => {
        if (data) {
          setTooltipMessage({
            isSuccess: true,
            text: "Вы успешно зарегистрировались!",
          });
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((error) => {
        setTooltipMessage({
          isSuccess: false,
          text: "Что-то пошло не так! Попробуйте еще раз",
        });
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleLogin(data) {
    auth
      .autirization(data)
      .then((data) => {
        if (data.token) {
          setEmailUser(data.email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        setTooltipMessage({
          isSuccess: false,
          text: "Что-то пошло не так! Попробуйте еще раз",
        });
        console.log(`Ошибка: ${error}`);
      });
  }
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }
  function handleEditAvatarClick() {
    setButtonText("Сохранить");
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setButtonText("Сохранить");
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setButtonText("Создать");
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDelete(currentCard) {
    setButtonText("Да");
    setDeletedCard(currentCard);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
    setTooltipMessage(null);
  }

  function handleCardLike(currentCard, isLiked) {
    api
      .changeLikeCardStatus(currentCard._id, isLiked)
      .then((newCard) => {
        setCards(
          cards.map((card) => (card._id === currentCard._id ? newCard : card))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleConfirmCardDelete() {
    setButtonText("Удаление...");
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setButtonText("Да"));
  }

  function handleUpdateProfile(data) {
    setButtonText("Сохранение...");
    api
      .patchProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setButtonText("Сохранить"));
  }

  function handleUpdateAvatar(data) {
    setButtonText("Сохранение...");
    api
      .patchAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setButtonText("Сохранить"));
  }

  function handleAddPlace(data) {
    setButtonText("Создание...");
    api
      .postCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setButtonText("Создать"));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header emailUser={emailUser} onSignOut={handleSignOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Registration onRegistration={handleRegistration} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateProfile={handleUpdateProfile}
          buttonText={buttonText}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          buttonText={buttonText}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={buttonText}
        />
        <ConfirmPopup
          isOpen={deletedCard}
          onClose={closeAllPopups}
          onConfirm={handleConfirmCardDelete}
          buttonText={buttonText}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip toolTipMessage={tooltipMessage} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}
