import React from 'react';
import './Input.css';

function Input({errorId, children, errorText, ...rest}) {
  return (
    <div className="input input__box">
      <label className="input__label input__box">
        {children}
      </label>

      <input
        className="input__item input__box"
        {...rest}
      />

      <span
        className={`input__error input__box ${errorText ? 'input__error_show' : ''}`}
        id={errorId}
      >
      {errorText}
    </span>
    </div>
  );
}

export default Input;
