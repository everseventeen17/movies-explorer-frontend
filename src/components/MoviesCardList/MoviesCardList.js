import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useEffect, useState, useCallback} from "react";
import {useWindowSize} from '../../utils/utils.js';

function MoviesCardList({isSavedFilms, movies, onDeleteMovie, onLikeMovie, isSearchError}) {
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [showedMoviesCount, setShowedMoviesCount] = useState(12);
  const [showMoreMoviesCount, setShowMoreMoviesCount] = useState(3);
  const [isShowMoreMoviesButtonState, setShowMoreMoviesButtonState] = useState(false);
  const windowSize = useWindowSize();


  const countNumberMoviesToRender = useCallback(() => {
   if (windowSize.width < 1024 && windowSize.width >= 768) {
      setShowedMoviesCount(8);
      setShowMoreMoviesCount(2);
    } else if (windowSize.width < 768 && windowSize.width >= 320) {
      setShowedMoviesCount(5);
      setShowMoreMoviesCount(2);
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
    { !isSavedFilms && isShowMoreMoviesButtonState && (
      <button className="movies-cards__btn-more" type="button" onClick={handleShowMoreMovies}>Ещё</button>
    )}
  </section>
  );
}

export default MoviesCardList;
