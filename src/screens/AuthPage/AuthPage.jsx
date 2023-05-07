import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import './AuthPage.scss'

import logo from '../../common/img/logo.svg'
import illustration from '../../common/img/mainIllustration.svg'

const AuthPage = (props) => {
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [])

  return (
      <div className='main-auth-page'>
        <div className='image-container'>
          <img src={illustration} alt="" />
        </div>
        <div className='body'>
          <h1>Добро пожаловать!</h1>
          <p>Приветствуем вас на нашем сайте "Piglish"! Здесь вы сможете изучить много новых английских слов. Не теряйте
            времени - начните изучать английский язык прямо сейчас!</p>
        </div>
      </div>
  );
}


export default AuthPage;
