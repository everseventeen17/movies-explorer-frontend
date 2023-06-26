import "./HamburgerMenu.css";
import Navigation from "../Navigation/Navigation";
import {Link} from "react-router-dom";

function HamburgerMenu({ isSideMenuOpen, onClose}) {
  return (
    <div className={`hamburger-menu__container ${isSideMenuOpen ? "hamburger-menu__container_active" : ""}`}>
      <div className={`hamburger-menu ${isSideMenuOpen ? "hamburger-menu_active" : ""}`}>
        <button className="hamburger-menu__close-button " type="button" onClick={onClose}></button>
        <Navigation isSideMenu={true} onClose={onClose} />

        {/*Account*/}
        <Link to="/profile" onClick={onClose} className={`header__account-link ${isSideMenuOpen ? "header__account-link_place_side-menu" : "header__account-link_hidden"} `}>
          Аккаунт
        </Link>
        {/*Account - end*/}

      </div>
    </div>
  );
}

export default HamburgerMenu;
