import React from 'react';
import Button from '../Button/Button';
import './SubmitButton.css';

function SubmitButton({children, submitDisabled}) {
  return (
    <Button
      type="submit"
      userClass="submit-button"
      disabled={submitDisabled}
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
