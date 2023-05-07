import React, { useEffect, useState } from "react";
import './Header.scss'
import logoWhite from '../../common/img/logoWhite.svg'
import { NavLink, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setAuthUserData } from "../../reducers/authReducer";
import useToken from "../../hooks/useToken";
import { api } from "../../api/api";

import unknownUser from '../../common/img/unknownUser.jpg'
import arrowDown from '../../common/img/arrowDown.svg'

const Header = (props) => {
  const { token, setToken } = useToken();
  const [userPanelIsShown, setUserPanelShown] = useState(false);

  const userData = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  debugger

  useEffect(() => {
    debugger
    api.loginByToken(token.slice(7)).then(data => {
      const userDataBody = {
        userId: data.id,
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        country: data.country,
      }
      dispatch(setAuthUserData(userDataBody, userData.refreshToken))
    })
  }, [])

  const toggleUserPanel = () => {
    setUserPanelShown(!userPanelIsShown);
  }

  const logout = () => {
    sessionStorage.removeItem('Authorization');
    sessionStorage.removeItem('RefreshToken');
    navigate('/auth')
  }

  return (
    <div className='header'>
      <a href='/' className='logo-container'>
        <img src={logoWhite} alt="Logo" />
      </a>
      <div className='menu'>
        <NavLink
          className={({ isActive }) => !isActive ? 'menu__item' : 'menu__item active'}
          to="/dictionary">Словарь</NavLink>
        <NavLink
          className={({ isActive }) => !isActive ? 'menu__item' : 'menu__item active'}
          to="/testing">Тестирование</NavLink>
      </div>
      <div className='user'>
        <div className='user-profile'onClick={toggleUserPanel}>
          <div className='user-profile__username'>{userData.username}</div>
          <div className='user-profile__arrow-down'>
            <img src={arrowDown} alt="v" />
          </div>
          <div className='user-profile__avatar'>
            <img src={unknownUser} alt="" />
          </div>
        </div>
        {userPanelIsShown &&
          <div className='user-panel'>
            <div onClick={() => navigate('account')}>Личный кабинет</div>
            <div className='user-panel__logout' onClick={logout}>Выйти</div>
          </div>
        }
      </div>
    </div>
  )
}

export default Header;