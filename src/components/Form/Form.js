import React from 'react';
import './Form.css';

function Form({name, title, children, onSubmit}) {
  return (
    <form className="form change" name={name} onSubmit={onSubmit}>
      <h2 className="form__title change">
        {title}
      </h2>

      {children}
    </form>
  );
}

export default Form;
