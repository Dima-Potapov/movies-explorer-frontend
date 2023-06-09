import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';

import {savedMovies} from '../../utils/movies';
import './SavedMovies.css';

function SavedMovies() {
  const [moviesList, setMoviesList] = useState(savedMovies);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="saved-movies change">
      <SearchForm/>

      <MoviesCardList moviesList={moviesList} isLoading={isLoading}>
        <Button userClass="saved-movies__button_delete"/>
      </MoviesCardList>
    </section>
  );
}

export default SavedMovies;
