import React, { Component } from "react";
import Header from "./sections/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./sections/Footer/Footer";


class Root extends Component {
  render() {
    return (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    );
  }
}

export default Root;