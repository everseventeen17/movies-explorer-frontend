import { Link } from 'react-router-dom';
import "./NotFound.css";
function NotFound() {
  return (
    <main>
      <section className="not-found">
        <p className="not-found__title">404</p>
        <h1 className="not-found__text">Страница не найдена</h1>
        <Link to="/" className="not-found__link">Назад</Link>
      </section>
    </main>
  );
}

export default NotFound;
