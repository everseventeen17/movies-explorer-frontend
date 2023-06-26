import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import {useLocation} from "react-router-dom";

function MoviesCardList({ cards, isLiked, onCardLike }) {
  const location = useLocation();
  return (
    <section className="movies-cards">
      {cards.length === 0 ? (
     ""
      ) : (
        <>
          <ul className="movies-cards__list">
            {cards.map((card) => (
              <MoviesCard
                card={card}
                key={card.id}
                isLiked={isLiked}
                onCardLike={onCardLike}
              />
            ))}
          </ul>
          {location.pathname === "/movies" ?
          <button className="movies-cards__btn-more" type="button">
            Ещё
          </button>
            : "" }
        </>
      )}
    </section>
  );
}

export default MoviesCardList;
