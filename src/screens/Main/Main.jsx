import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import './Main.scss';

const Main = (props) => {
  useAuth();

  useEffect(() => {
    debugger
  }, [])


  debugger
  return (
    <div className='main-page'>
      <div>
        ... Здесь пока ничего нет, но скоро что-то будет. Следите за обновлениями! :)
      </div>
    </div>
  );
}


export default Main;
