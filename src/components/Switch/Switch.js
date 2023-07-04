import React, {useState} from 'react';
import './Switch.css';

function Switch(props) {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label className="switch change">
      <input
        type="checkbox"
        className="switch__input"
        checked={isChecked}
        onChange={handleChange}
      />

      <span className="switch__slider"/>
    </label>
  );
}

export default Switch;
