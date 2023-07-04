import React from 'react';
import {Link} from 'react-router-dom';
import SubmitButton from '../SubmitButton/SubmitButton';
import './SubmitGroup.css';

function SubmitGroup({submitName, linkName, linkDestination, children}) {
  return (
    <fieldset className="submit-group">
      <SubmitButton>{submitName}</SubmitButton>

      <nav className="submit-group__row submit-group__box">
      <span className="submit-group__text submit-group__box submit-group__font">
        {children}
      </span>

        <Link
          to={linkDestination}
          className="submit-group__link submit-group__box submit-group__font"
        >
          {linkName}
        </Link>
      </nav>
    </fieldset>
  );
}

export default SubmitGroup;
