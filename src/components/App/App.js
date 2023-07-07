import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext.js';
import "./App.css";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound"
import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/mainApi";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSideMenuOpen, setSideMenuStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [isServerResponseErrorText, setIsServerResponseErrorText] = useState("");
  const [isServerResponseSuccess, setIsServerResponseSuccess] = useState("");
  const [isSearchError, setSearchError] = useState(false);

  const navigate = useNavigate();

  function handleUpdateUserInfo({name, email}) {
    setIsLoading(true);
    mainApi.patchUserInfo({name, email})
      .then((userData) => {
        setCurrentUser(userData);
         return setIsServerResponseSuccess("Вы успешно изменили свои данные");
      })
      .catch((err) => {
        setIsServerResponseErrorText(err);
        if (err === 'Ошибка: Validation failed') {
          return setIsServerResponseErrorText('Ошибка: Введите email в формате example@example.com');
        }
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUserRegistration({name, email, password}) {
    setIsLoading(true);
    mainApi.postRegister({name, email, password})
      .then(() => {
        handleUserAuthorization({email, password});
        navigate("/movies", {replace: true});
      })
      .catch((err) => {
        setIsServerResponseErrorText(err);
        if (err === 'Ошибка: Validation failed') {
          return setIsServerResponseErrorText('Ошибка: Введите email в формате example@example.com');
        }
        if (err === 'Ошибка: Необходима авторизация') {
          return setIsServerResponseErrorText('Ошибка: Сервер не отвечает');
        }
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUserAuthorization({email, password}) {
    setIsLoading(true);
    mainApi.postAuth({email, password})
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          navigate("/movies", {replace: true})
        }
      })
      .catch((err) => {
        setIsServerResponseErrorText(err);
        if (err === 'Ошибка: Validation failed') {
          return setIsServerResponseErrorText('Ошибка: Введите email в формате example@example.com');
        }
        if (err === 'Ошибка: Необходима авторизация') {
          return setIsServerResponseErrorText('Ошибка: Сервер не отвечает');
        }
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }

  function handleUserLogOut() {
    setLoggedIn(false);
    setCurrentUser({});
    setSavedMovies([])
    localStorage.clear();
    navigate("/", {replace: true});
  }

  function handleMovieLike(movie) {
    mainApi.postSavedCard({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: 'https://api.nomoreparties.co' + movie.image.url,
      trailerLink: movie.trailerLink,
      thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
      .then((newSavedMovie) => {
        setSavedMovies([newSavedMovie, ...savedMovies])
      })
      .catch((err) => {
        console.log(err)

      })
  }

  function handleDeleteMovie(id) {
    mainApi.deleteSavedCard(id)
      .then(() => {
        setSavedMovies((savedMovies) => {
          return savedMovies.filter((item) => {
            return item._id !== id;
          });
        });
      })
      .catch((err) => {
        console.log(err)
      })
  }


  function handleOpenSideMenu() {
    setSideMenuStatus(!isSideMenuOpen);
  }

  function handleCloseSideMenu() {
    setSideMenuStatus(false);
  }


  useEffect(() => {
    mainApi.getUserInfo()
      .then((userData) => {
        if (userData) {
          setLoggedIn(true);
          setCurrentUser(userData);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsPreloaderActive(false))
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getCardsByOwner()
        .then((savedMovies) => {
          setSavedMovies(savedMovies)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]);


  return (
    <>
      {isPreloaderActive ? (
        <Preloader/>
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <SavedMoviesContext.Provider value={{savedMovies}}>
            <Routes>
              <Route index element={<Main
                loggedIn={loggedIn}
                onBurgerClick={handleOpenSideMenu}/>}
              />

              <Route path="/movies" element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setSearchError={setSearchError}
                  isSearchError={isSearchError}
                  onLikeMovie={handleMovieLike}
                  onDeleteMovie={handleDeleteMovie}
                  onBurgerClick={handleOpenSideMenu}
                />
              }/>

              <Route
                path="/saved-movies" element={
                <ProtectedRoute
                  element={SavedMovies}
                  isLoading={isLoading}
                  onDeleteMovie={handleDeleteMovie}
                  loggedIn={loggedIn}
                  onBurgerClick={handleOpenSideMenu}
                />
              }/>

              <Route path="/profile" element={
                <ProtectedRoute
                  element={Profile}
                  onUpdateUser={handleUpdateUserInfo}
                  onLogout={handleUserLogOut}
                  onLoading={isLoading}
                  isSuccess={isServerResponseSuccess}
                  onSuccess={setIsServerResponseSuccess}
                  isServerResponseErrorText={isServerResponseErrorText}
                  setIsServerResponseErrorText={setIsServerResponseErrorText}
                  loggedIn={loggedIn}
                  onBurgerClick={handleOpenSideMenu}
                />
              }
              />
              <Route path="/signin" element={
                <Login
                  onLogin={handleUserAuthorization}
                  onLoading={isLoading}
                  isServerResponseErrorText={isServerResponseErrorText}
                  setIsServerResponseErrorText={setIsServerResponseErrorText}
                  loggedIn={loggedIn}
                />
              }/>
              <Route path="/signup" element={
                <Register
                  onRegister={handleUserRegistration}
                  onLoading={isLoading}
                  isServerResponseErrorText={isServerResponseErrorText}
                  setIsServerResponseErrorText={setIsServerResponseErrorText}
                  loggedIn={loggedIn}
                />
              }/>
              <Route path="*" element={<NotFound/>
              }/>
            </Routes>
            <HamburgerMenu
              isSideMenuOpen={isSideMenuOpen}
              onClose={handleCloseSideMenu}
            />
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>

      )}
    </>
  );
}

export default App;
