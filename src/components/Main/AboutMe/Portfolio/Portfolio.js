import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="Portfolio portfolio__box change">
      <h4 className="portfolio__box portfolio__title">Портфолио</h4>

      <ul className="portfolio__box tasks__list">
        <li className="portfolio__box">
          <a className="tasks__item" href="https://ru.wikipedia.org/" target="_blank">
            <p className="portfolio__box tasks__info">
              Статичный сайт
            </p>
            <span className="tasks__link">↗</span>
          </a>
        </li>

        <li className="portfolio__box">
          <a className="tasks__item" href="https://ru.wikipedia.org/" target="_blank">
            <p className="portfolio__box tasks__info">
              Адаптивный сайт
            </p>
            <span className="tasks__link">↗</span>
          </a>
        </li>
        
        <li className="portfolio__box">
          <a className="tasks__item" href="https://ru.wikipedia.org/" target="_blank">
            <p className="portfolio__box tasks__info">
            Одностраничное приложение
            </p>
            <span className="tasks__link">↗</span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

