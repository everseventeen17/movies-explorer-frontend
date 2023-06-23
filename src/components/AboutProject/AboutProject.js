import "./AboutProject.css";
function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__columns">
        <div className="about-project__column">
          <h3 className="about-project__column-subtitle">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__column-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__column-subtitle">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__column-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые
            нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__weeks">
        <div className="about-project__week">
          <p className="about-project__week-text">1 неделя</p>
          <p className="about-project__week-caption">Back-end</p>
        </div>
        <div className="about-project__week">
          <p className="about-project__week-text about-project__week-text_type_grey">4 недели</p>
          <p className="about-project__week-caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
