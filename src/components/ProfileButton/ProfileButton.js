import { NavLink } from 'react-router-dom';
import profileIcon from '../../images/profile-icon.svg';

function ProfileButton ({ isMobileMenu = false }) {
    return (
        <NavLink
            to="/profile"
            activeClassName="menu__link_active"
            className={`menu__link menu__link_profile ${isMobileMenu ? "menu__link_mobile-menu" : ""}`}
        >
          <img
            className="menu__link-icon"
            src={profileIcon}
            width={12}
          />
          Аккаунт
        </NavLink>
    )
}

export default ProfileButton;