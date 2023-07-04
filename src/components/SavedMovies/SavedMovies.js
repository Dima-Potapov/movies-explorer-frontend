import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { mainApi } from '../../utils/MainApi';
import {
  ERROR_TEXT_DELETE,
  LS_VISIBLE_MOVIES,
  NOT_FOUND_ERR_BLOCK,
  SAVED_FILMS_API_BLOCK,
  SHORT_FILM_DURATION
} from '../../utils/const';
import { filterMovies } from '../../utils/MoviesSearch';

function SavedMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [visibleMovies, setVisibleMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    mainApi.getMovies()
      .then((data) => {
        setMoviesList(data);
        setVisibleMovies(data);

        localStorage.setItem(LS_VISIBLE_MOVIES, JSON.stringify(data));

        setIsSwitchDisabled(data.length === 0);
      })
      .catch((err) => setApiErrorMessage(SAVED_FILMS_API_BLOCK))
      .finally(() => setIsLoading(false));

    return () => localStorage.removeItem(LS_VISIBLE_MOVIES);
  }, []);

  useEffect(() => {
    let visible = [];

    if (localStorage.getItem(LS_VISIBLE_MOVIES)) {
      visible = JSON.parse(localStorage.getItem(LS_VISIBLE_MOVIES));
    }

    if (isSwitchOn) {
      const foundFilter = visible.filter(item => item.duration <= SHORT_FILM_DURATION);

      setVisibleMovies(foundFilter);

      if (foundFilter.length === 0) {
        setApiErrorMessage(NOT_FOUND_ERR_BLOCK);
      }
    } else {
      setVisibleMovies(visible);
    }
  }, [isSwitchOn]);

  const handleCardClick = (movie) => window.open(movie.trailer, '_blank');

  const handleDeleteClick = (movie) => {
    mainApi.deleteMovie(movie._id)
      .then((deletedMovie) => {
        const newList = moviesList.filter(item => item.movieId !== deletedMovie.movieId);

        setMoviesList(newList);

        const newVisible = visibleMovies.filter(item => item.movieId !== deletedMovie.movieId);

        setVisibleMovies(newVisible);

        localStorage.setItem(JSON.stringify(newVisible));

        if (newVisible.length === 0) setApiErrorMessage(NOT_FOUND_ERR_BLOCK);

        setIsSwitchDisabled(newList.length === 0);
      })
      .catch((error) => console.log(`${ERROR_TEXT_DELETE} ${error}.`));
  };

  const searchMain = async (searchString) => {
    let found = [];

    setIsLoading(true);
    setIsSwitchDisabled(true);
    setVisibleMovies([]);

    if (localStorage.getItem(LS_VISIBLE_MOVIES)) localStorage.removeItem(LS_VISIBLE_MOVIES);

    try {
      found = await filterMovies(searchString.toLowerCase(), moviesList);

      setVisibleMovies(found);
      setIsSwitchDisabled(false);
    } catch(err) {
      setApiErrorMessage(err);
    } finally {
      setIsLoading(false);

      localStorage.setItem(LS_VISIBLE_MOVIES, JSON.stringify(found));

      setIsSwitchOn(false);
    }
  };

  const handleSearchSubmit = (searchString) => {
    const string = searchString || '';

    if (string.length === 0) {
      setIsSwitchOn(false);
      setVisibleMovies(moviesList);

      localStorage.setItem(LS_VISIBLE_MOVIES, JSON.stringify(moviesList));
    } else {
      searchMain(searchString);
    }
  };

  const handleSwitchChange = () => setIsSwitchOn(!isSwitchOn);

  return (
    <section className="saved-movies change">
      <SearchForm
        savedFilms={true}
        onSubmit={handleSearchSubmit}
        onSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}
        isSwitchDisabled={isSwitchDisabled}
        searchText=""
      />

      <MoviesCardList
        savedFilms={true}
        isLoading={isLoading}
        moviesList={visibleMovies}
        errorMessage={apiErrorMessage}
        onClick={handleCardClick}
        onDelete={handleDeleteClick}
      />
    </section>
  );
}

export default SavedMovies;
