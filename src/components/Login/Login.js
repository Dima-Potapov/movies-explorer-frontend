import React, {useEffect, useState} from 'react';
import Form from '../Form/Form';
import Logo from '../Logo/Logo';
import Input from '../Input/Input';
import SubmitGroup from '../SubmitGroup/SubmitGroup';
import './Login.css';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login({resetMessage, onLogin, history, ...props}) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => resetMessage(), [values]);
  useEffect(() => setErrorMessage(props.errorMessage), [props.errorMessage]);

  const emptyForm = () => resetForm({ email: '', password: '' })
  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values.email, values.password, emptyForm);
  }

  return (
    <div className="login">
      <header className="login__header">
        <Logo/>
      </header>

      <Form name="form-login" title="Рады видеть!" onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          // pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$"
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
          placeholder="Пароль"
          maxLength="20"
          minLength="6"
          required
          errorId="password-error"
          errorText={errors.password}
          onChange={handleChange}
          value={values.password}
        >
          Пароль
        </Input>

        <SubmitGroup
          submitName="Войти"
          linkName="Регистрация"
          linkDestination="/signup"
          submitDisabled={!isValid}
          errorMessage={errorMessage}
        >
          Ещё не зарегистрированы?
        </SubmitGroup>
      </Form>
    </div>
  );
}

export default Login;
