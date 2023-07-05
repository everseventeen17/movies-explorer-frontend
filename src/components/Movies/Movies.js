import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import {useState, useEffect} from "react";

function Movies({onBurgerClick, isLoading, isSearchError, loggedIn, movies, onLikeMovie, onDeleteMovie, onSearch, onFilter}) {
  const [values, setValues] = useState(JSON.parse(localStorage.getItem('searchFormValuesAllMovies')) || {input: '', checkbox: false,});
  const [error, setError] = useState('');

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
    onFilter(newValues)
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (values.input.trim() === '') {
      setError('Нужно ввести ключевое слово')
      return
    }
    onSearch(values)
  }

  useEffect(() => {
    localStorage.setItem('searchFormValuesAllMovies', JSON.stringify(values))
  }, [values]);

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
