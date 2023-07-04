export const NOT_VALID_EMAIL = 'Введите правильный адрес почты!';
export const NOT_VALID_NAME = 'Имя может содержать только латиницу, кириллицу, пробел или дефис';
export const NOT_VALID_DEFAULT = 'Проверьте правильность введённых данных';
export const NOT_FOUND_ERR_TEXT = `Ничего не найдено`;
export const SAVED_FILMS_API_TEXT = 'Невозможно прочитать сохраненные фильмы';
export const ERROR_TEXT_SAVE_FILM_ = 'Ошибка при сохранении/удалении фильма';
export const ERROR_TEXT_KEY_WORD = 'Нужно ввести ключевое слово';
export const ERROR_TEXT_DELETE = 'Ошибка при удалении карточки';
export const ERROR_TEXT_BAD_REQUEST = 'Некорректное значение одного или нескольких полей';
export const ERROR_TEXT_UNAUTHORIZED = `Неверно указаны e-mail или пароль`;
export const ERROR_TEXT_SERVER_ERROR = 'Что-то пошло не так! Попробуйте ещё раз.';
export const ERROR_TEXT_USER_ALREADY_EXIST = (userEmail) => `Пользователь ${userEmail} уже существует`;
export const NOT_FOUND_ERR_BLOCK = <p className="list__no-result">{NOT_FOUND_ERR_TEXT}</p>;
export const SAVED_FILMS_API_BLOCK = <p className="list__no-result">{SAVED_FILMS_API_TEXT}</p>;

export const SHORT_FILM_DURATION = 40;
export const LS_FOUND_MOVIES = 'foundMovies';
export const LS_SEARCH_STRING = 'searchString';
export const LS_SWITCH_DURATION = 'switchDuration';
export const LS_VISIBLE_MOVIES = 'visibleMovies';
export const LS_JWT = 'jwt';

export const usersApiBaseUrl = 'https://api.dimapotapov.student.nomoredomains.rocks';
export const authApiBaseUrl = 'https://api.dimapotapov.student.nomoredomains.rocks';
export const searchMoviesApiBaseUrl = 'https://api.nomoreparties.co';