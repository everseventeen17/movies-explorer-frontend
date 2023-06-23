import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__inner">
        <p className="footer__copyright">© 2020</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link " href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link " href="https://github.com/everseventeen17/" target="_blank" rel="noreferrer">
              Github
            </a>
          </li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;
