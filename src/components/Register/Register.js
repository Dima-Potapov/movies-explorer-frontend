import React, {useEffect, useState} from 'react';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import SubmitGroup from '../SubmitGroup/SubmitGroup';
import '../Login/Login.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ resetMessage, onRegister, ...props }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(
    () => resetMessage(),
    [values]
  );

  useEffect(
    () => setErrorMessage(props.errorMessage),
    [props.errorMessage]
  );

  const emptyForm = () => resetForm({ name: '', email: '', password: '' });

  const handleSubmit = (event) => {
    event.preventDefault
    ();
    onRegister(values.email, values.password, values.name, emptyForm);
  };

  return (
    <div className="login">
      <header className="login__header">
        <Logo/>
      </header>

      <Form name="form-register" title="Добро пожаловать!" onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          name="name"
          pattern="^[a-zа-я -]+$"
          placeholder="Имя"
          required
          errorId="name-error"
          errorText={errors.name}
          onChange={handleChange}
          value={values.name}
        >
          Имя
        </Input>
        <Input
          type="email"
          id="email"
          name="email"
          maxLength="40"
          minLength="2"
          pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
          placeholder="E-mail"
          required
          errorId="email-error"
          errorText={errors.email}
          onChange={handleChange}
          value={values.email}
        >
          E-mail
        </Input>

        <Input
          type="password"
          id="password"
          name="password"
          maxLength="20"
          minLength="6"
          placeholder="Пароль"
          required
          errorId="password-error"
          errorText={errors.password}
          onChange={handleChange}
          value={values.password}
        >
          Пароль
        </Input>

        <SubmitGroup
          submitName="Зарегистрироваться"
          linkName="Войти"
          linkDestination="/signin"
          submitDisabled={!isValid}
          errorMessage={errorMessage}
        >
          Уже зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Register;
