import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="Portfolio portfolio__box change">
      <h4 className="portfolio__box portfolio__title">Портфолио</h4>

      <ul className="portfolio__box tasks__list">
        <li className="portfolio__box tasks__item">
          <p className="portfolio__box tasks__info">
            Статичный сайт
          </p>
          <a className="tasks__link" href="https://ru.wikipedia.org/">↗</a>
        </li>

        <li className="portfolio__box tasks__item">
          <p className="portfolio__box tasks__info">
            Адаптивный сайт
          </p>
          <a className="tasks__link" href="https://ru.wikipedia.org/">↗</a>
        </li>

        <li className="portfolio__box tasks__item">
          <p className="portfolio__box tasks__info">
            Одностраничное приложение
          </p>
          <a className="tasks__link" href="https://ru.wikipedia.org/">↗</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

