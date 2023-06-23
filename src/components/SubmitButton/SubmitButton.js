import React from 'react';
import Button from '../Button/Button';
import './SubmitButton.css';

function SubmitButton({children}) {
  return (
    <Button type="submit" userClass="submit-button">
      {children}
    </Button>
  );
}

export default SubmitButton;
