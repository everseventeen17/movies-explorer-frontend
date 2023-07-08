import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {SavedMoviesContext} from '../../contexts/SavedMoviesContext';
import {useState, useContext, useEffect, useCallback} from "react";
import { filterMoviesByDuration, filterMoviesByName } from '../../utils/utils.js';

function SavedMovies({ onDeleteMovie, onBurgerClick, loggedIn}) {
  const { savedMovies } = useContext(SavedMoviesContext);
  const [movies, setMovies] = useState(savedMovies);
  const [values, setValues] = useState( {input: '', checkbox: false,});
  const [error, setError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  const updateMovies = useCallback((values) => {
    const allMovies = filterMoviesByName(savedMovies, values.input);
    const filteredMovies = values.checkbox ? filterMoviesByDuration(allMovies) : allMovies;
    if(filteredMovies.length === 0){
      setIsNotFound(true);
    }else{
      setIsNotFound(false);
      setMovies(filteredMovies)
    }
    setMovies(filteredMovies);}, [savedMovies])

  function handleCheckboxChange(event) {
    const newValues = {
      ...values,
      checkbox: event.target.checked,
    }
    setValues(newValues)
     updateMovies(newValues);
  }
  function handleInputChange(event) {
    setError('')
    setValues({
      ...values,
      input: event.target.value,
    })
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (values.input.trim() === '') {
      setError('Нужно ввести ключевое слово')
      return
    }
    setError('')
    updateMovies(values);
    setValues(values);
  }

  useEffect(() => {
    values.checkbox ? updateMovies(values) : setMovies(savedMovies);
  }, [savedMovies, updateMovies, values]);


  return (
    <>
      <Header onBurgerClick={onBurgerClick} loggedIn={loggedIn}/>
      <main className="saved-movies">

        <SearchForm error={error} searchValues={values} handleCheckboxChange={handleCheckboxChange} onFormSubmit={handleSubmit} handleInputChange={handleInputChange} />
        <MoviesCardList isSavedFilms={true} movies={movies} onDeleteMovie={onDeleteMovie} isSearchError={isNotFound}/>

      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
