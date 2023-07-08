import {useLocation} from "react-router-dom";
import "./MoviesCard.css";
import activeButton from "../../images/active__button.svg";
import cross from "../../images/cross.svg";
import React, { useContext } from 'react';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

function MoviesCard({movie, isSavedFilms, onDeleteMovie, onLikeMovie }) {
  const {savedMovies} = useContext(SavedMoviesContext);

  const isLiked = savedMovies.some((item) => {
    return movie.id === item.movieId
  });

  const saveMovie = isSavedFilms ?  movie : savedMovies.find((item) => {
    return movie.id === item.movieId
  });

  function handleLikeMovie() {
    onLikeMovie(movie)
  }

  function handleDeleteMovie() {
    onDeleteMovie(saveMovie._id)
  }

const location = useLocation()
  return (
    <li className="movies-card">
      <div className="movies-card__inner">
        <p className="movies-card__name">{movie.nameRU}</p>
        <p className="movies-card__duration">{`${movie.duration} минут`}</p>
      </div>
      <a className="movies-card__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
      <img className="movies-card__img" src={isSavedFilms ? `${movie.image}` : `https://api.nomoreparties.co/${movie.image.url}` } alt={movie.nameRU}/>
      </a>
      {location.pathname === "/movies" ? (
        <button className={`movies-card__button ${isLiked ? "movies-card__button_type_pink" : ""} `} type="button"
                onClick={isLiked ? handleDeleteMovie : handleLikeMovie}>
          {isLiked ? <img className="movies-card__button-icon" src={activeButton} alt='Галка'></img> : "Сохранить"}

        </button>

      ) : (

        <button className="movies-card__button movies-card__button_type_gray" type="button" onClick={handleDeleteMovie}>
          <img className="movies-card__button-icon" src={cross} alt='Крест'></img>
        </button>
      )}
    </li>
  );
}

export default MoviesCard;
