import React from 'react';
import MainHeadline from '../MainHeadline/MainHeadline';
import MainTitle from '../MainTitle/MainTitle';
import Portfolio from './Portfolio/Portfolio';
import personPhoto from '../../../images/person-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="AboutMe change">
      <MainHeadline>Студент</MainHeadline>
      <article className="personality change">
        <div className="personality__info">
          <MainTitle>Виталий</MainTitle>
          <p className="personality__subtitle">
            Фронтенд-разработчик, 30 лет
          </p>

          <p className="personality__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ.
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>

          <ul className="personality__list">
            <li className="personality__item">
              <a className="personality__link"
                 href="https://github.com"
                 target="_blank" rel="noreferrer noopener"
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img
          className="personality__photo"
          src={personPhoto}
          alt="Фотография студента"
        />
      </article>

      <Portfolio/>
    </section>
  );
}

export default AboutMe;
