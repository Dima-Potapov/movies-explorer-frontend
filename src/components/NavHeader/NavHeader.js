import React, {useState} from 'react';
import Logo from '../Logo/Logo';
import './NavHeader.css';
import {NavLink} from "react-router-dom";
import Button from "../Button/Button";
import PopupMenu from "../PopupMenu/PopupMenu";
import Navigation from "../Navigation/Navigation";

function NavHeader(props) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleClick = () => {
    setIsPopupVisible(true);
  };

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <header className="NavHeader">
      <nav className="menu__logo">
        <Logo/>

       <Navigation />
      </nav>
      <div>
        <NavLink to="/profile"
                 activeClassName="menu__link_active"
                 className="menu__link menu__link_profile"
        >
          Аккаунт
        </NavLink>

        <Button userClass="menu__button" onClick={handleClick}/>

        {isPopupVisible && <PopupMenu handleClose={handleClose}/>}
      </div>
      {props.children}
    </header>
  );
}

export default NavHeader;
