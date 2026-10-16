import React from 'react';
import './CheckBox.css';

function CheckBox({movieId, isChecked = false, onChange}) {
  const handleChange = () => onChange(movieId);

  return (
    <label className="round-button">
      <input
        className="round-button__input"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />

      <span className="round-button__tick">Сохранить</span>
    </label>
  );
}

export default CheckBox;

