import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <React.Fragment>
      <NavLink
        to="/movies"
        activeClassName="menu__link_active"
        className="menu__link menu__link_film"
      >
        Фильмы
      </NavLink>

      <NavLink
        to="/saved-movies"
        activeClassName="menu__link_active"
        className="menu__link menu__link_film"
      >
        Сохранённые фильмы
      </NavLink>
    </React.Fragment>
  );
}

export default Navigation;
