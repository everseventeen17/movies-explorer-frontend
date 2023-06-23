import {Link, useLocation} from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({onBurgerClick, onClose, isSideMenu}) {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ?

        <header className="header">
          <div className="header__inner">
            {/*LOGO*/}
            <Link to="/" className="header__logo">
              <img className="header__logo-img" src={logo} alt="Логотип"></img>
            </Link>
            {/*LOGO_END*/}

            <ul className="header__menu-list">
              <li className="header__menu-item">
                <Link to="/signup" className="header__menu-link">
                  Регистрация
                </Link>
              </li>
              <li className="header__menu-item">
                <Link to="/signin" className="header__menu-link header__link_type_login">
                  Войти
                </Link>
              </li>
            </ul>
          </div>
        </header>
        :
        <header className="header">
          <div className="header__inner">
            <div className="header__inner-wrapper">
              {/*LOGO*/}
              <Link to="/" className="header__logo">
                <img className="header__logo-img" src={logo} alt="Логотип"></img>
              </Link>
              {/*LOGO_END*/}
              <Navigation/>
            </div>
            {/*Account*/}
            <Link to="/profile" onClick={onClose}
                  className={`header__account-link ${isSideMenu ? "header__account-link_place_side-menu" : "header__account-link_hidden"} `}>
              Аккаунт
            </Link>
            {/*Account - end*/}
            <button className="header__btn-hamburger" type="button" onClick={onBurgerClick}></button>
          </div>
        </header>
      }
    </>

  );
}

export default Header;
