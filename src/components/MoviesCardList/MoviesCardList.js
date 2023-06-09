import React from 'react';
import Preloader from './Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({isLoading, moviesList, children}) {
  return (
    <ul className="MoviesCardList change">
      {isLoading
        ? <Preloader/>
        : moviesList.map((moviesCard) => (
          <MoviesCard key={moviesCard.movieId} movie={moviesCard}>
            {children}
          </MoviesCard>
        ))
      }
    </ul>
  );
}

export default MoviesCardList;
