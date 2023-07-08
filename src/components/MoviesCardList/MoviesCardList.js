import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState, useCallback} from "react";
import {useWindowSize} from '../../utils/utils.js';
import {WINDOW_SIZE_MAX, WINDOW_SIZE_MID, WINDOW_SIZE_MIN,
        SHOW_FILMS_MAX, SHOW_FILMS_MID, SHOW_FILMS_MIN,
        SHOW_MORE_MAX, SHOW_MORE_MID, SHOW_MORE_MIN,} from "../../utils/constants";

function MoviesCardList({isSavedFilms, movies, onDeleteMovie, onLikeMovie, isSearchError}) {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showedMoviesCount, setShowedMoviesCount] = useState(SHOW_FILMS_MAX);
  const [showMoreMoviesCount, setShowMoreMoviesCount] = useState(SHOW_MORE_MAX);
  const [isShowMoreMoviesButtonState, setShowMoreMoviesButtonState] = useState(false);
  const windowSize = useWindowSize();


  const countNumberMoviesToRender = useCallback(() => {
   if (windowSize.width < WINDOW_SIZE_MAX && windowSize.width >= WINDOW_SIZE_MID) {
      setShowedMoviesCount(SHOW_FILMS_MID);
      setShowMoreMoviesCount(SHOW_MORE_MID);
    } else if (windowSize.width < WINDOW_SIZE_MID && windowSize.width >= WINDOW_SIZE_MIN) {
      setShowedMoviesCount(SHOW_FILMS_MIN);
      setShowMoreMoviesCount(SHOW_MORE_MIN);
    }
    }, [windowSize])

  useEffect(() => {
    countNumberMoviesToRender();
  }, [windowSize,countNumberMoviesToRender])

  useEffect(() => {
      setMoviesToRender(movies.slice(0, showedMoviesCount));
    if (movies.length <= showedMoviesCount) {
      setShowMoreMoviesButtonState(false);
    } else {
      setShowMoreMoviesButtonState(true);
    };
  }, [movies, showedMoviesCount])



  const handleShowMoreMovies = () => {
    setMoviesToRender(movies.slice(0, moviesToRender.length + showMoreMoviesCount));
    if (moviesToRender.length >= movies.length - showMoreMoviesCount) {
      setShowMoreMoviesButtonState(false);
    }
  }


  return (
  <section className="movies-cards">
    {isSearchError ?
      (<p className="movies-card-list__info">Ничего не найдено</p>)
      :
      (<ul className="movies-cards__list">
        {moviesToRender.map((movie) => (
          <MoviesCard
            movie={movie}
            isSavedFilms={isSavedFilms}
            onDeleteMovie={onDeleteMovie}
            onLikeMovie={onLikeMovie}
            key={isSavedFilms ? movie.movieId : movie.id}
          />
        ))}
      </ul>)
    }
    { !isSavedFilms && isShowMoreMoviesButtonState && !isSearchError && (
      <button className="movies-cards__btn-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>
    )}
  </section>
  );
}

export default MoviesCardList;
