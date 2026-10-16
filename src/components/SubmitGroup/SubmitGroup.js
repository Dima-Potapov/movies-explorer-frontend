import React from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from '../SubmitButton/SubmitButton';
import './SubmitGroup.css';

function SubmitGroup(
  {
    errorMessage,
    submitDisabled,
    submitName,
    children,
    linkDestination,
    linkName
  }
  ) {
  return (
    <fieldset className="submit-group">
      <p className="submit-group__error submit-group__box">
        {errorMessage || ''}
      </p>

      <SubmitButton submitDisabled={submitDisabled}>
        {submitName}
      </SubmitButton>

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
