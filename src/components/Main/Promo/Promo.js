import React, {useContext} from 'react';
import Header from '../../Header/Header';
import NavTab from '../NavTab/NavTab';
import './Promo.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import NavHeader from "../../NavHeader/NavHeader";

function Promo() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="promo promo__block">
      {currentUser.email ? <NavHeader /> : <Header><NavTab /></Header>}

      <div className="promo__block promo__container">
        <h1 className="promo__block promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className="promo__block promo__image"/>
      </div>
    </section>
  );
}

export default Promo;
