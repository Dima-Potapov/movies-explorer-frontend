import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ children }) {
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
      {children}
    </React.Fragment>
  );
}

export default Navigation;
