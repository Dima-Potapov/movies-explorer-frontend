import React from 'react';
import MainHeadline from '../MainHeadline/MainHeadline';
import MainTitle from '../MainTitle/MainTitle';
import './Techs.css';

function Techs() {
  return (
    <section className="Techs change">

      <MainHeadline>Технологии</MainHeadline>

      <div className="techs__container change">

        <MainTitle>7 технологий</MainTitle>

        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.
        </p>

        <ul className="techs__list">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>

      </div>

    </section>
  );
}

export default Techs;
