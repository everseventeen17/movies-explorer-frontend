import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({cards, onFilterChange, isFilter, onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick}/>
      <main className="saved-movies">
        <SearchForm onFilterChange={onFilterChange} isFilter={isFilter}/>
        <MoviesCardList cards={cards}/>
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
