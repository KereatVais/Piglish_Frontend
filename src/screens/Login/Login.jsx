import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { auth, setAuthUserData } from "../../reducers/authReducer";
import AuthPage from "../AuthPage/AuthPage";
import { api } from "../../api/api";
import useToken from "../../hooks/useToken";
import useRefreshToken from "../../hooks/useRefreshToken";
import './Login.scss';

const Login = (props) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorData, setErrorData] = useState('');

  const { token, setToken } = useToken();
  const { refreshToken, setRefreshToken } = useRefreshToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [])

  const onSubmit = async () => {
    await api.login(username, password)
      .then(response => {
        setToken({ token: 'Bearer ' + response.data.token, expirationDate: response.data.expirationDate });
        setRefreshToken(response.data.refreshToken);
        dispatch(setAuthUserData(response.data.id, response.data.username, 1999));
        debugger
        navigate('/');
      })
      .catch(err => {
        debugger
        setErrorData(err.response.data)
      })
    debugger;

  }

  return (
    <div className='login-section'>
      <h1>Вход</h1>
      <div className='form'>
        <div className='form__item'>
          <label htmlFor="username">Логин:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='username' type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>
        <div className='form__item'>
          <label htmlFor="password">Пароль:</label>
          <div className='form__input'>
            <div className='border-top'></div>
            <input id='password' type="text" onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        {errorData &&
          <div style={{ color: 'red' }}>{errorData}</div>
        }
      </div>
      <button className='button' onClick={onSubmit}>Войти</button>
    </div>
  );
}


export default connect(null, {
  auth,
  setAuthUserData
})(Login);
