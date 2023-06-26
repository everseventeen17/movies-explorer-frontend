import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({cards, onFilterChange, isFilter, isLiked, onCardLike, onBurgerClick}) {
  return (
    <>
      <Header onBurgerClick={onBurgerClick}/>
      <main className="movies">
        <SearchForm onFilterChange={onFilterChange} isFilter={isFilter}/>
        <MoviesCardList cards={cards} isLiked={isLiked} onCardLike={onCardLike}/>
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
