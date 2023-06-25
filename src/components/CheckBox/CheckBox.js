import React, {useState} from 'react';
import './CheckBox.css';

function CheckBox(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

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

