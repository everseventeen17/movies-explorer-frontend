import { useNavigate  } from 'react-router-dom';
import "./NotFound.css";
function NotFound() {

  const navigate = useNavigate();
  function handleBackToLastPage() {
   navigate(-1);
  }

  return (
    <main>
      <section className="not-found">
        <p className="not-found__title">404</p>
        <h1 className="not-found__text">Страница не найдена</h1>
        <button className="not-found__link" type="button" onClick={handleBackToLastPage}>
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
