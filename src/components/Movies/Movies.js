import React, {useEffect, useState} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Button from '../Button/Button';
import './Movies.css';
import { useWindowDimensions } from '../../hooks/useDimensions';
import { mainApi } from '../../utils/MainApi';
import { addSavedFlag, filterMovies, readMovies } from '../../utils/MoviesSearch';
import { getVisualProps } from '../../utils/VisualProps';
import {
  NOT_FOUND_ERR_BLOCK,
  ERROR_TEXT_SAVE_FILM_,
  SHORT_FILM_DURATION,
  LS_SWITCH_DURATION, LS_FOUND_MOVIES, LS_SEARCH_STRING
} from '../../utils/const';

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreVisible, setIsMoreVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(localStorage.getItem(LS_SWITCH_DURATION) === 'true');
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(true);

  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  const [findErrorMessage, setFindErrorMessage] = useState('');

  const { width } = useWindowDimensions();
  const [visualProps, setVisualProps] = useState({ total: 12, add: 3 });
  const [visibleCardsNumber, setVisibleCardsNumber] = useState(0);

  const startSearchText = localStorage.getItem(LS_SEARCH_STRING);

  useEffect(() => {
    const fromStorage = localStorage.getItem(LS_FOUND_MOVIES);
    let found, foundChecked;

    if (fromStorage) {
      found = JSON.parse(fromStorage);

      setIsSwitchDisabled(found.length === 0);
    }

    mainApi.getMovies()
      .then((data) => {
        setSavedMovies(data);

        foundChecked = addSavedFlag(found, data.slice());

        setFoundMovies(foundChecked);
      })
      .catch((err) => console.log(`Нет доступа к сохраненным фильмам: ${err}`));
  }, []);

  useEffect(
    () => setVisualProps(getVisualProps(width)),
    [width]
  );

  useEffect(() => {
    if (foundMovies.length <= visualProps.total) {
      setVisibleCardsNumber(foundMovies.length);
      setIsMoreVisible(false);
    } else {
      setVisibleCardsNumber(visualProps.total)
      setIsMoreVisible(true);
    }
  }, [foundMovies, visualProps]);

  useEffect(
    () => setShowedMovies(foundMovies.slice(0, visibleCardsNumber)),
    [visibleCardsNumber, foundMovies]
  );

  useEffect(() => {
    const moviesFromStorage = localStorage.getItem(LS_FOUND_MOVIES);

    if (!moviesFromStorage) return;

    const found = JSON.parse(moviesFromStorage);
    let showMovies = [];

    if (isSwitchOn) {
      showMovies = found.filter(item => item.duration <= SHORT_FILM_DURATION);

      if (showMovies.length === 0) {
        setFindErrorMessage(NOT_FOUND_ERR_BLOCK);
      }
    } else {
      showMovies = found
    }

    setFoundMovies(showMovies);

    localStorage.setItem(LS_SWITCH_DURATION, isSwitchOn)
  }, [isSwitchOn]);

  const searchMain = async (searchString) => {
    setFoundMovies([]);
    setShowedMovies([]);
    setFindErrorMessage('');
    setIsSwitchOn(false);
    setIsSwitchDisabled(true);

    try {
      setIsLoading(true);

      const movies = await readMovies();
      const found = await filterMovies(searchString.toLowerCase(), movies);
      const foundChecked = addSavedFlag(found, savedMovies.slice());

      setFoundMovies(foundChecked);

      localStorage.setItem(LS_FOUND_MOVIES, JSON.stringify(foundChecked));
      localStorage.setItem(LS_SEARCH_STRING, searchString.trim());

      setIsSwitchDisabled(false);

    } catch (err) {
      setFindErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (searchString) => searchMain(searchString);

  const handleMoreClick = () => {
    let newValue = visibleCardsNumber + visualProps.add;
    let length = foundMovies.length;

    if (newValue >= length) {
      newValue = length;

      setIsMoreVisible(false);
    }

    setVisibleCardsNumber(newValue);
  };

  const handleSaveClick = async (movieId) => {
    try {
      const films = foundMovies.filter(currentMovie => currentMovie.movieId === movieId);

      if (films.length !== 1) throw new Error(ERROR_TEXT_SAVE_FILM_);

      let newFoundMovies = [];

      if (films[0].saved === 0) {
        delete films[0].saved;

        const result = await mainApi.addMovie(films[0]);

        const {
          movieId, country, director, duration, year,
          description, image, trailer, nameRU, nameEN,
          thumbnail, _id,
        } = result;

        const newFilm = {
          movieId, country, director, duration, year,
          description, image, trailer, nameRU, nameEN,
          thumbnail, saved: _id,
        };

        newFoundMovies = foundMovies.map((item) => (
          item.movieId === movieId ? newFilm : item
        ));

        setFoundMovies(newFoundMovies);

        const newSavedMovies = savedMovies.slice();

        newSavedMovies.push(result);
        setSavedMovies(newSavedMovies);
      } else {
        const result = await mainApi.deleteMovie(films[0].saved);

        const {
          movieId, country, director, duration, year,
          description, image, trailer, nameRU, nameEN,
          thumbnail,
        } = result;

        const newFilm = {
          movieId, country, director, duration, year,
          description, image, trailer, nameRU, nameEN,
          thumbnail, saved: 0,
        };

        newFoundMovies = foundMovies.map((item) => (
          item.movieId === movieId ? newFilm : item
        ));

        setFoundMovies(newFoundMovies);

        const newSavedMovies = savedMovies.filter((item) => item.movieId !== movieId);

        setSavedMovies(newSavedMovies);
      }

      if (localStorage.getItem(LS_FOUND_MOVIES)) localStorage.removeItem('foundMovies');

      localStorage.setItem(LS_FOUND_MOVIES, JSON.stringify(newFoundMovies));
    } catch(err) {
      console.log(err);
    }
  };

  const handleCardClick = (movie) => window.open(movie.trailer, '_blank');

  const handleSwitchChange = () => setIsSwitchOn(!isSwitchOn);

  return (
    <section className="movies">
      <SearchForm
        savedFilms={false}
        onSubmit={handleSearchSubmit}
        onSwitchChange={handleSwitchChange}
        isSwitchOn={isSwitchOn}
        isSwitchDisabled={isSwitchDisabled}
        searchText={startSearchText}
      />

      <MoviesCardList
        savedFilms={false}
        isLoading={isLoading}
        moviesList={showedMovies}
        errorMessage={findErrorMessage}
        onSave={handleSaveClick}
        onClick={handleCardClick}
      />

      { isMoreVisible ?
        <Button userClass="movies__button_action_more" onClick={handleMoreClick}>
          Ещё
        </Button> :
        <React.Fragment/>
      }
    </section>
  );
}

export default Movies;