import React from 'react';
import Preloader from './Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import CheckBox from '../CheckBox/CheckBox';

function MoviesCardList(
  {
    onSave,
    onDelete,
    onClick,
    savedFilms,
    errorMessage,
    isLoading,
    moviesList
  }
  ) {
  const handleChange = (movieId) => onSave(movieId);
  const handleDelete = (movie) => onDelete(movie);
  const getMoviesList = (moviesList) => {
    if (moviesList.length > 0) {
      return moviesList.map((moviesCard) => (
        <MoviesCard
          key={moviesCard.movieId} movie={moviesCard}
          onClick={onClick}
        >
          { savedFilms ?
            <DeleteButton
              onDelete={handleDelete}
              movie={moviesCard}
            /> :
            <CheckBox
              isChecked={moviesCard.saved}
              movieId={moviesCard.movieId}
              onChange={handleChange}
            />
          }
        </MoviesCard>
      ));
    }

    return (
      <li className="list__no-result-box">
        {errorMessage}
      </li>
    );
  };

  return (
    <ul className="MoviesCardList change">
      {isLoading ? <Preloader /> : getMoviesList(moviesList) }
    </ul>
  );
}

export default MoviesCardList;
