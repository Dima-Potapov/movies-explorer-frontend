import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

function Header(props) {
  return (
    <header className="Header">
      <Logo/>
      {props.children}
    </header>
  );
}

export default Header;
