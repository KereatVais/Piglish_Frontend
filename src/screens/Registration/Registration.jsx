import React, { useState } from "react";
import './Registration.scss';
import { api } from "../../api/api";
import { useNavigate } from 'react-router-dom';

const Registration = (props) => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateFields = () => {
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    const dateOfBirthValidation = validateDateOfBirth(dateOfBirth);
    const emailValidation = validateEmail(email);
    const countryValidation = validateCountry(country);
    const validationResult = usernameValidation.error ||
      passwordValidation.error ||
      dateOfBirthValidation.error ||
      emailValidation.error ||
      countryValidation.error;

    return {errors: validationResult};
  }

  const validateUsername = (username) => {
    debugger
    if (username.length === 0) {
      setUsernameError("Введите логин!");
      return {error: true};
    }
    if (username.length < 2 || username.length > 100) {
      setUsernameError("Длина логина должна быть от 2 до 100 символов длиной!");
      return {error: true};
    }

    setUsernameError('');
    return {error: false};
  }

  const validatePassword = (password) => {
    if (password.length === 0) {
      setPasswordError("Введите пароль!");
      return {error: true};
    }

    if (password.length < 8) {
      setPasswordError("Длина пароля должна быть больше 8 символов!");
      return {error: true};
    }

    setPasswordError('');
    return {error: false};
  }

  const validateDateOfBirth = (dateOfBirth) => {

    setDateOfBirthError('');
    return {error: false};
  }

  const validateEmail = (email) => {
    if (email.length === 0) {
      setEmailError("Введите e-mail!");
      return {error: true};
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("E-mail не валидный");
      return {error: true};
    }

    setEmailError('');
    return {error: false};
  }

  const validateCountry = (country) => {
    if (country.length === 0) {
      setCountryError("Введите страну!");
      return {error: true};
    }

    if (country.length < 2) {
      setCountryError("Длина названия страны должна быть больше 2-х символов!");
      return {error: true};
    }

    setCountryError('');
    return {error: false};
  }


  const onSubmit = async () => {
    const validationResult = validateFields();

    if (!validationResult.errors) {
      const parsedDate = dateOfBirth.replaceAll('.', '-')
      const userData = {username, password, dateOfBirth: parsedDate, email, country}
      const result = await api.register(userData);
      if (result.error) {
        setError(result.message);
      } else {
        navigate('/auth/login')
      }
    }
  }

  return (
    <div className='registration-section'>
      <h1>Регистрация</h1>
      <div className='form'>
        <div className='form__item'>
          <label htmlFor="username">Логин:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='username' type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          {usernameError &&
            <div className='error-panel'>{usernameError}</div>
          }
        </div>
        <div className='form__item'>
          <label htmlFor="password">Пароль:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='password' type="text" onChange={(e) => setPassword(e.target.value)} />
          </div>
          {passwordError &&
            <div className='error-panel'>{passwordError}</div>
          }
        </div>
        <div className='form__item'>
          <label htmlFor="dateOfBirth">Дата рождения:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='dateOfBirth' type="text" onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
          <div className='form__tip'>
            *Вводите дату рождения в виде: дд.мм.гггг
          </div>
          {dateOfBirthError &&
            <div className='error-panel'>{dateOfBirthError}</div>
          }
        </div>
        <div className='form__item'>
          <label htmlFor="email">E-mail:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='email' type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          {emailError &&
            <div className='error-panel'>{emailError}</div>
          }
        </div>
        <div className='form__item'>
          <label htmlFor="country">Страна:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='country' type="text" onChange={(e) => setCountry(e.target.value)} />
          </div>
          {countryError &&
            <div className='error-panel'>{countryError}</div>
          }
        </div>
        {error &&
        <div className='error-panel'>{error}</div>
        }
      </div>
      <button className='button' onClick={onSubmit}>Зарегистрироваться</button>
    </div>
  );
}

export default Registration;
