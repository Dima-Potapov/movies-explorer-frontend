import React from 'react';
import './MainHeadline.css';

function MainHeadline(props) {
  return (
    <h2 className="MainHeadline change">
      {props.children}
    </h2>
  );
}

export default MainHeadline;
