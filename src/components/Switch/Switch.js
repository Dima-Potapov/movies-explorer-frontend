import React from 'react';
import './Switch.css';

function Switch({ isChecked, onChange, isDisabled }) {
  return (
    <label className="switch change">
      <input
        type="checkbox"
        className="switch__input"
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
      />

      <span className="switch__slider"/>
    </label>
  );
}

export default Switch;
