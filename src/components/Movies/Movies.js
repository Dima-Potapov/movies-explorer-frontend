import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CheckBox from '../CheckBox/CheckBox';
import Button from '../Button/Button';
import {initialMovies} from '../../utils/movies';
import './Movies.css';

function Movies() {
  const [moviesList, setMoviesList] = useState(initialMovies);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="movies">
      <SearchForm/>

      <MoviesCardList moviesList={moviesList} isLoading={isLoading}>
        <CheckBox isChecked={false}/>
      </MoviesCardList>

      <Button userClass="movies__button_action_more">Ещё</Button>
    </section>
  );
}

export default Movies;
