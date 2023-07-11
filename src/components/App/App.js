import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProfilePage from '../ProfilePage/ProfilePage';
import MoviesPage from '../MoviesPage/MoviesPage';
import SavedMoviesPage from '../SavedMoviesPage/SavedMoviesPage';
import NotFound from '../NotFound/NotFound';
import './App.css';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { auth } from '../../utils/Auth';
import {
  ERROR_TEXT_BAD_REQUEST,
  ERROR_TEXT_SERVER_ERROR,
  ERROR_TEXT_UNAUTHORIZED,
  ERROR_TEXT_USER_ALREADY_EXIST, LS_FOUND_MOVIES, LS_JWT, LS_SWITCH_DURATION, LS_VISIBLE_MOVIES
} from '../../utils/const';

function App() {
  const [currentUser, setCurrentUser] = useState({email: '', name: ''});
  const [resultMessage, setResultMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let history = useHistory();

  const tokenCheck = () => {
    if (localStorage.getItem(LS_JWT)) {
      const jwt = localStorage.getItem(LS_JWT);

      auth.checkTokenUser(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({name: res.name, email: res.email});
            setIsLoggedIn(true);

            // history.push('/movies');
          }
        })
        .catch(err => {
          console.error('Переданный токен некорректен.');

          setIsLoggedIn(false);
        });
    }
  };

  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn]);

  const handleLogin = (userEmail, userPassword, resetLoginForm) => {
    let messageText = '';

    auth.signIn(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem(LS_JWT, data.token);

          resetLoginForm();

          history.push('/movies');

          setIsLoggedIn(true);
        }
      })
      .catch(err => {
        switch (err) {
          case 400:
            messageText = ERROR_TEXT_BAD_REQUEST;

            break;
          case 401:
            messageText = ERROR_TEXT_UNAUTHORIZED;

            break;
          default:
            messageText = ERROR_TEXT_SERVER_ERROR;
        }
      })
      .finally(() => {
        setResultMessage(messageText);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_FOUND_MOVIES);
    localStorage.removeItem(LS_SWITCH_DURATION);
    localStorage.removeItem(LS_VISIBLE_MOVIES);
    localStorage.removeItem(LS_JWT);

    setIsLoggedIn(false);
    setCurrentUser({name: '', email: ''});

    history.push('/');
  };

  const handleRegister = (
    userEmail,
    userPassword,
    userName,
    resetRegisterForm
  ) => {
    let messageText = '';

    auth.register(userEmail, userPassword, userName)
      .then((res) => {
        resetRegisterForm();

        auth.signIn(userEmail, userPassword)
          .then((data) => {
            if (data.token) {
              localStorage.setItem(LS_JWT, data.token);

              history.push('/movies');

              setIsLoggedIn(true);
            }
          })
          .catch((err) => {
            console.log('Переданный токен некорректен.');

            setIsLoggedIn(false);
          });
      })
      .catch((err) => {
        switch (err) {
          case 400:
            messageText = ERROR_TEXT_BAD_REQUEST;

            break;
          case 409:
            messageText = ERROR_TEXT_USER_ALREADY_EXIST(userEmail);

            break;
          default:
            messageText = ERROR_TEXT_SERVER_ERROR;
        }
      })
      .finally(() => {
        setResultMessage(messageText);
      });
  };

  const resetResultMessage = () => {
    setResultMessage('');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMoviesPage/>
          </ProtectedRoute>

          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <ProfilePage onLogout={handleLogout}/>
          </ProtectedRoute>

          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <MoviesPage/>
          </ProtectedRoute>

          <Route exact path="/">
            <HomePage/>
          </Route>

          <Route path="/signup" exact>
            <Register
              onRegister={handleRegister}
              errorMessage={resultMessage}
              resetMessage={resetResultMessage}
              history={history}
            />
          </Route>

          <Route path="/signin" exact>
            <Login
              onLogin={handleLogin}
              errorMessage={resultMessage}
              resetMessage={resetResultMessage}
              history={history}
            />
          </Route>

          <Route path="*">
            <NotFound history={history}/>
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
