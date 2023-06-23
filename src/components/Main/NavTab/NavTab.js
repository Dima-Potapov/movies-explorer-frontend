import React from 'react';
import {Link} from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link
        to="/signup"
        className="nav-tab__button change"
      >
        Регистрация
      </Link>

      <Link
        to="/signin"
        className="nav-tab__button nav-tab__button_login change"
      >
        Войти
      </Link>
    </nav>
  );
}

export default NavTab;
