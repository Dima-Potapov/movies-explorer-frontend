import React from 'react';
import MainHeadline from '../MainHeadline/MainHeadline';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="AboutProject change">
      <MainHeadline>О проекте</MainHeadline>
      <ul className="exercise change">
        <li className="exercise__column">
          <h4 className="exercise__title">
            Дипломный проект включал 5 этапов
          </h4>
          <p className="exercise__text">
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
        </li>

        <li className="exercise__column">
          <h4 className="exercise__title">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="exercise__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="timetable change">
        <p className="timetable__text timetable__chart timetable__chart_blue">
          1 неделя
        </p>
        <p className="timetable__text timetable__chart timetable__chart_gray">
          4 недели
        </p>
        <p className="timetable__text timetable__item">
          Back-end
        </p>
        <p className="timetable__text timetable__item">
          Front-end
        </p>
      </div>

    </section>
  );
}

export default AboutProject;
