import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import "./App.css";

import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";

import filmsData from "../../utils/filmsData.js";
import userData from "../../utils/userData.js";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(filmsData);
  }, []);
  function handleOpenSideMenu() {
    setIsSideMenuOpen(!isSideMenuOpen);
  }
  function handleCloseSideMenu() {
    setIsSideMenuOpen(false);
  }

  function handleFilterChange(e) {
    setIsFilter(e);
  }

  function handleCardLike() {
    setIsLiked(!isLiked);
  }

  return (
    <>
      <Routes>
        <Route index element={<Main/>}/>

        <Route path="/movies" element={
          <Movies
            cards={cards}
            onFilterChange={handleFilterChange}
            isLiked={isLiked}
            onCardLike={handleCardLike}
            isFilter={isFilter}
            onBurgerClick={handleOpenSideMenu}
          />
        }/>

        <Route
          path="/saved-movies" element={
          <SavedMovies
            cards={cards}
            onFilterChange={handleFilterChange}
            isFilter={isFilter}
            onBurgerClick={handleOpenSideMenu}
          />
        }/>

        <Route path="/profile" element={<Profile user={userData} onBurgerClick={handleOpenSideMenu}/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <HamburgerMenu
        isSideMenuOpen={isSideMenuOpen}
        onClose={handleCloseSideMenu}
      />
</>
  );
}

export default App;
