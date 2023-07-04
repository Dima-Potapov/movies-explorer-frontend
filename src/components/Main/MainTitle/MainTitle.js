import React from 'react';
import './MainTitle.css';

function MainTitle(props) {
  return (
    <h3 className="MainTitle change">
      {props.children}
    </h3>
  );
}

export default MainTitle;
