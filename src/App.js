import React, { Component } from 'react';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css';
import Router from "./Router";
import { Provider } from "react-redux";
import store from "./reducers/reduxStore";
import Login from "./screens/Login/Login";
import useToken from "./hooks/useToken";
import Root from "./Root";
import Main from "./screens/Main/Main";
import Dictionary from "./screens/Dictionary/Dictionary";
import Testing from "./screens/Testing/Testing";
import AuthRoot from "./AuthRoot";
import AuthPage from "./screens/AuthPage/AuthPage";
import Registration from "./screens/Registration/Registration";

function App() {

  return (
      <Provider store={store}>
        <div className='App'>
          <RouterProvider router={Router()} />
        </div>
      </Provider>
  );
}

export default App;
