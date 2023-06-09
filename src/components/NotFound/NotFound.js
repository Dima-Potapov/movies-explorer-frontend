import React from 'react';
import Button from '../Button/Button';
import './NotFound.css';

function NotFound({history}) {
  const handleClick = () => {
    history.goBack();
  }

  return (
    <section className="not-found change">
      <h1 className="not-found__title not-found__box change">
        404
      </h1>

      <p className="not-found__subtitle not-found__box change">
        Страница не найдена
      </p>

      <Button userClass="not-found__button" onClick={handleClick}>
        Назад
      </Button>

    </section>
  );
}

export default NotFound;
