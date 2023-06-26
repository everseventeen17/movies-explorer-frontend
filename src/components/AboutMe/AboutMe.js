import "./AboutMe.css";
import me from "../../images/about-me.jpg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__wrapper">
        <div className="about-me__content">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">
            Фронтенд-разработчик, 30 лет
          </p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной работы.
          </p>
          <a className="about-me__link" href="https://github.com/everseventeen17/" rel="noreferrer" target="_blank">
            Github
          </a>
        </div>
        <img className="about-me__img" src={me} alt="Моё фото"/>
      </div>
      <Portfolio/>
    </section>
  );
}

export default AboutMe;
