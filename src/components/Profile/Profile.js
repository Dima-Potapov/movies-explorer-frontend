import React, {useContext, useEffect, useState} from 'react';
import Button from '../Button/Button';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { mainApi } from '../../utils/MainApi';

function Profile({onLogout}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [successAnswer, setSuccessAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(
    () => resetForm({name: currentUser.name, email: currentUser.email}),
    [currentUser]
  );

  useEffect(
    () => setServerErrorMessage(''),
    [values]
  );

  useEffect(() => {
    const condition1 =
      (values.name === currentUser.name) &&
      (values.email === currentUser.email);

    const condition2 = (
      (values.name !== currentUser.name) ||
      (values.email !== currentUser.email)
    ) && !isValid;

    setIsSubmitDisabled(condition1 || condition2);
  }, [values, currentUser, isValid]);

  useEffect(() => {
    const msgName = errors.name ? `Имя: ${errors.name}` : '';
    const msgEmail = errors.email ? `Почта: ${errors.email}` : '';

    setErrorMessage(`${msgName} ${msgEmail}`);
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSuccessAnswer('Сохранение...');

    mainApi.editUserData(values)
      .then((data) => {
        setSuccessAnswer('Информация о пользователе сохранена.');

        currentUser.name = data.name;
        currentUser.email = data.email;

        resetForm({name: currentUser.name, email: currentUser.email});

        setTimeout(() => setSuccessAnswer(''), 3000);
      })
      .catch((err) => {
        setSuccessAnswer('');
        switch (err) {
          case 400:
            setServerErrorMessage("Некорректное значение одного или нескольких полей");
            break;
          case 409:
            setServerErrorMessage(`Пользователь ${values.email} уже существует.`);
            break;
          case 200:
            setServerErrorMessage(`Пользователь ${values.email} уже существует.`);
            break;
          default:
            setServerErrorMessage(`Невозможно сохранить данные на сервере. Ошибка ${err}.`);
        }
      });
  };

  return (
    <section className="profile">
      <form
        className="profile__form profile__box change"
        onSubmit={handleSubmit}
      >
        <h2 className="profile__title profile__box">
          Привет, {currentUser.name}!
        </h2>
        <fieldset className="profile__fields profile__box">
          <label
            for="name"
            className="profile__label profile__text"
          >
            Имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            pattern="^[a-zа-я -]+$"
            className="profile__item profile__text"
            placeholder="Имя"
            value={values.name}
            required
            onChange={handleChange}
            disabled={true}
          />

          <label
            for="email"
            className="profile__label profile__text"
          >
            Почта
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`profile__item profile__text ${errors.email ? 'profile__text_error' : ''}`}
            // pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
            placeholder="Почта"
            value={values.email}
            required
            onChange={handleChange}
          />

        </fieldset>

        <p className="profile__error profile__box profile__error_input">
          {errorMessage}
        </p>

        <fieldset className="profile__buttons profile__box">
          <p className="profile__success profile__box">
            {successAnswer}
          </p>

          <p className="profile__error profile__box">
            {serverErrorMessage}
          </p>

          <Button type="submit" userClass="profile__button" disabled={isSubmitDisabled}>
            Редактировать
          </Button>

          <Button userClass="profile__button profile__button_red" onClick={onLogout}>
            Выйти из аккаунта
          </Button>
        </fieldset>
      </form>
    </section>
  );
}

export default Profile;
