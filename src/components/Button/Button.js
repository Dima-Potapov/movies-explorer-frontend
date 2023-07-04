import React from 'react';
import './Button.css';

function Button({userClass, buttonType, children = '', ...rest}) {
  return (
    <button
      className={`button change ${userClass || ''}`}
      type={buttonType || 'button'}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
