import React, { Component } from "react";
import Header from "./sections/Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import logo from "./common/img/logo.svg";
import AuthHeader from "./sections/AuthHeader/AuthHeader";


class Root extends Component {
  render() {
    return (
      <div>
        <AuthHeader />
      </div>
    );
  }
}

export default Root;