import "./Promo.css";
function Promo() {
  return (
    <section className="promo">
    <h1 className="promo__title">
      Учебный проект студента факультета Веб-разработки.
    </h1>
    <nav className="promo__buttons-wrapper">
      <a className="promo__link" href="#about-project">
        О проекте
      </a>
      <a className="promo__link" href="#techs">
        Технологии
      </a>
      <a className="promo__link" href="#about-me">
        Студент
      </a>
    </nav>
  </section>
  );
}
export default Promo;
