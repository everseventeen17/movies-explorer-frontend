import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import activeButton from "../../images/active__button.svg";
import cross from "../../images/cross.svg";
import card from "../../images/cards/card_1.jpg"

function MoviesCard({ isLiked, onCardLike }) {
  const location = useLocation();
  return (
    <li className="movies-card">
<div className="movies-card__inner">
  <p className="movies-card__name">В погоне за Бенкси</p>
  <p className="movies-card__duration">27 минут</p>
</div>
      <img className="movies-card__img" src={card} alt='В погоне за Бенкси'/>
          <button className= {`movies-card__button  ${isLiked && location.pathname === "/movies" ? "movies-card__button_type_pink" : "movies-card__button_type_gray"}`} type="button" onClick={onCardLike}>
            {location.pathname === "/movies" ? isLiked  ?
              (<img className="movies-card__button-icon" src={activeButton} alt='Галка'></img>)
              : "Сохранить" :
              (<img className="movies-card__button-icon" src={cross} alt='Крест'></img>) }
          </button>
    </li>
  );
}

export default MoviesCard;
