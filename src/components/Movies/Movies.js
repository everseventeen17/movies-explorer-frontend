import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import {useState, useEffect} from "react";
import moviesApi from "../../utils/moviesApi";
import {filterMoviesByDuration, filterMoviesByName} from "../../utils/utils";

function Movies({onBurgerClick, isLoading, isSearchError, loggedIn, onLikeMovie, onDeleteMovie,setIsLoading,setSearchError }) {
  const [values, setValues] = useState(JSON.parse(localStorage.getItem('searchFormValuesAllMovies')) || {input: '', checkbox: false,});
  const [error, setError] = useState('');
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('result')) || []);

  function handleInputChange(event) {
    setError('')
    setValues({
      ...values,
      input: event.target.value,
    })
  }
  function handleCheckboxChange(event) {
    const newValues = {
      ...values,
      checkbox: event.target.checked,
    }
    setValues(newValues)
    filterMovies(newValues)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (values.input.trim() === '') {
      setError('Нужно ввести ключевое слово')
      return
    }
    searchMovies(values)
  }


  function searchMovies(values) {
    setIsLoading(true)
    setSearchError(false);
    return moviesApi.getCards()
      .then((movies) => {
        localStorage.setItem('allMovies', JSON.stringify(movies));
        updateMovies(values)
      })
      .catch((err) => {
        setSearchError(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function filterMovies(values) {
    const filteredMoviesByName = JSON.parse(localStorage.getItem('MoviesFilteredByName')) || [];
    const moviesFilteredByDuration = filterMoviesByDuration(filteredMoviesByName)
    const resultMovies = values.checkbox ? moviesFilteredByDuration : filteredMoviesByName;
    setMovies(resultMovies)
  }
  function updateMovies(values) {
    const movies = JSON.parse(localStorage.getItem('allMovies'));
    let filteredMoviesByName = filterMoviesByName(movies, values.input);
    localStorage.setItem('MoviesFilteredByName', JSON.stringify(filteredMoviesByName));
    filterMovies(values)
  }
  useEffect(() => {
    localStorage.setItem('searchFormValuesAllMovies', JSON.stringify(values))
  }, [values]);

  useEffect(() => {
    localStorage.setItem('result', JSON.stringify(movies))
  }, [movies]);

  return (
    <>
      <Header onBurgerClick={onBurgerClick} loggedIn={loggedIn}/>
      <main className="movies">
        <SearchForm error={error} searchValues={values} isSearchError={isSearchError} handleCheckboxChange={handleCheckboxChange} onFormSubmit={handleSubmit} handleInputChange={handleInputChange} />
        {isLoading
          ? <Preloader/>
          : <MoviesCardList movies={movies} isSearchError={isSearchError} onDeleteMovie={onDeleteMovie} onLikeMovie={onLikeMovie}/>
        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
