import React from 'react';
import './MoviesCard.css';

function MoviesCard({movie, children}) {
  return (
    <li className="card change">
      <img
        className="card__image"
        src={movie.thumbnail}
        alt={movie.nameRU}
      />
      <li>{children}</li>

      <ul className="card__info">
        <li className="card__name">{movie.nameRU}</li>
        <li className="card__duration">{movie.duration}</li>
      </ul>
    </li>
  );
}

export default MoviesCard;
