import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState, useCallback} from "react";
import {useWindowSize} from '../../utils/utils.js';
import {windowSizeMax, windowSizeMid, windowSizeMin,
        showFilmsMax, showFilmsMid, showFilmsMin,
        showMoreMax, showMoreMid, showMoreMin,} from "../../utils/constants";

function MoviesCardList({isSavedFilms, movies, onDeleteMovie, onLikeMovie, isSearchError}) {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showedMoviesCount, setShowedMoviesCount] = useState(showFilmsMax);
  const [showMoreMoviesCount, setShowMoreMoviesCount] = useState(showMoreMax);
  const [isShowMoreMoviesButtonState, setShowMoreMoviesButtonState] = useState(false);
  const windowSize = useWindowSize();


  const countNumberMoviesToRender = useCallback(() => {
   if (windowSize.width < windowSizeMax && windowSize.width >= windowSizeMid) {
      setShowedMoviesCount(showFilmsMid);
      setShowMoreMoviesCount(showMoreMid);
    } else if (windowSize.width < windowSizeMid && windowSize.width >= windowSizeMin) {
      setShowedMoviesCount(showFilmsMin);
      setShowMoreMoviesCount(showMoreMin);
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
