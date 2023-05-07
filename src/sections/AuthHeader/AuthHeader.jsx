import React from "react";
import './AuthHeader.scss'
import logo from "../../common/img/logo.svg";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AuthHeader = (props) => {
  const navigate = useNavigate();

  return (
    <div className='auth-page'>
        <div className='polygon polygon-top'></div>
        <div className='auth-header'>
          <div className='logo-container' onClick={() => navigate("/auth")}>
            <img src={logo} alt="Logo" />
          </div>
          <div className='buttons'>
            <NavLink to='login' className='buttons__login'>Вход</NavLink>
            <NavLink to='registration' className='buttons__registration'>Регистрация</NavLink>
          </div>
        </div>
        <Outlet />
        <div className='polygon polygon-bottom'></div>
    </div>
  )
}

export default AuthHeader;