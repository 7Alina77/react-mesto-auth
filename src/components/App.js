import React from 'react';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom/dist';
import {api} from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import auth from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { BrowserRouter } from 'react-router-dom/dist';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]= useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen]= useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen]= useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedToDeleteCard, setSelectedToDeleteCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Promise.all([api.handleGetUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
      console.log(`Ошибка вывода карточек или данных юзера: ${err}`)
    });
  },[]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => {
        console.log(`Ошибка лайка: ${err}`)
      });
  }

  function handleCardDelete(card) {
    api.handleDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`)
      });
  }

  function handleCardDeleteClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedToDeleteCard(card);
  }
 
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(updUserData) {
    api.patchProfile(updUserData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных профиля: ${err}`)
      });
  }

  function handleUpdateAvatar(updAvatarData) {
    api.patchAvatar(updAvatarData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`)
      });
  }

  function handleAddPlace (placeData) {
    api.postNewCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`)
      });
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null)
  }

  const propsOfMain = {
    cards: cards,
    onEditAvatar: handleEditAvatarClick,
    onEditProfile: handleEditProfileClick,
    onAddPlace: handleAddPlaceClick,
    onCardClick: handleCardClick,
    handleLikeClick: handleCardLike,
    handleDeleteClick: handleCardDeleteClick,
    loggedIn: loggedIn,
  };

  function handleSubmitAuthorization(e, formValue) {
    e.preventDefault();
    if(!formValue.email || !formValue.password) {
      return;
    }
  };
  

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Routes>
        <Route path='*' element={loggedIn? <Navigate to='/'/> : <Navigate to='/sign-in'/>}/>
        <Route path='/' element={<ProtectedRoute Component={Main} {...propsOfMain}/>}/>
        <Route path='/sign-up'/>
        <Route path='/sign-in' element={loggedIn? <Navigate to='/'/> : <Login onSubmit = {handleSubmitAuthorization}/>}/>
      </Routes>
      <ImagePopup
        card = {selectedCard}
        onClose={closeAllPopups}
      />
      <Footer />
      <EditProfilePopup 
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser = {handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups} 
        onUpdateAvatar = {handleUpdateAvatar}
      />
      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onAddPlace = {handleAddPlace}
      />
      <DeleteCardPopup
        card={selectedToDeleteCard}
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />
    </div> 
  </CurrentUserContext.Provider>
  );
}

export default App;