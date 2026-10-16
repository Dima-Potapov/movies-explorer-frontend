import { moviesApi } from './MoviesApi';
import { NOT_FOUND_ERR_BLOCK, searchMoviesApiBaseUrl } from './const';

export const readMovies = async () => {
  try {
    const movies = await moviesApi.getAllMovies();

    const moviesList = movies.map(movie => {
      return {
        movieId: movie.id,
        country: movie.country || '-',
        director: movie.director || '-',
        duration: movie.duration || 0,
        year: movie.year || '2021',
        description: movie.description || '-',
        image: movie.image ? `${searchMoviesApiBaseUrl}${movie.image.url}` : 'https://fakeimg.pl/300/',
        trailer: movie.trailerLink || 'https://www.youtube.com/watch?v=YcAL9lGTzLQ&t',
        nameRU: movie.nameRU || '',
        nameEN: movie.nameEN || '',
        thumbnail: movie.image ? `${searchMoviesApiBaseUrl}${movie.image.formats.thumbnail.url}` : 'https://fakeimg.pl/300/',
      };
    });

    return Promise.resolve(moviesList);
  } catch(err) {
    const errMsg = [
      `Во время запроса произошла ошибка.`,
      `Возможно, проблема с соединением или сервер недоступен.`,
      `Подождите немного и попробуйте ещё раз`,
    ];
    const errString = errMsg.map((item, index) => {
      return <p key={index} className="list__no-result">{item}</p>;
    });

    return Promise.reject(errString);
  }
};

const checkField = (field, searchString) => {
  return field ? field.toLowerCase().includes(searchString) : false;
}

export const filterMovies = async (searchString, moviesList) => {
  const string = searchString.toLowerCase();

  const foundMovies = moviesList.filter((movie) => {
    const c1 = checkField(movie.nameRU, string);

    return (c1);
  });

  if (foundMovies.length > 0) return Promise.resolve(foundMovies);

  return Promise.reject(NOT_FOUND_ERR_BLOCK);
};

export const addSavedFlag = (films, savedFilms) => {
  if (!films || !films.length) return savedFilms;

  return films.map((film) => {
    const {
      movieId, country, director, duration,
      year, description, image, trailer,
      nameRU, nameEN, thumbnail,
    } = film;

    const saved = savedFilms.filter(savedFilm => savedFilm.movieId === movieId);

    let savedId = 0;

    if (saved.length === 1) savedId = saved[0]._id;

    const newFilm = {
      movieId, country, director, duration,
      year, description, image, trailer,
      nameRU, nameEN, thumbnail, saved: savedId,
    };

    return newFilm;
  });
};


