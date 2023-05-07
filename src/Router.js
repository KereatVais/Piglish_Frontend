import * as React from "react";
import {
  createBrowserRouter,
} from "react-router-dom";
import { api } from "./api/api";
import Root from "./Root";
import Dictionary from "./screens/Dictionary/Dictionary";
import Testing from "./screens/Testing/Testing";
import FindWord from "./screens/Testing/FindWord/FindWord";
import CongratulationsScreen from "./screens/Testing/CongratulationsScreen/Congratulations";
import FindTranslation from "./screens/Testing/FindTranslation/FindTranslation";
import Cards from "./screens/Testing/Cards/Cards";
import WriteWord from "./screens/Testing/WriteWord/WriteWord";
import Main from "./screens/Main/Main";
import Login from "./screens/Login/Login";
import Registration from "./screens/Registration/Registration";
import AuthPage from "./screens/AuthPage/AuthPage";
import useToken from "./hooks/useToken";
import AuthRoot from "./AuthRoot";
import Account from "./screens/PersonalAccount/Account";

const Router = () => {
  // const {token, setToken} = useToken();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/dictionary",
          element: <Dictionary />,
          // loader: () => api.getWords(token)
        },
        {
          path: "/testing",
          element: <Testing />,
        },
        {
          path: "/testing/find-word",
          element: <FindWord />,
        },
        {
          path: "/testing/find-translation",
          element: <FindTranslation />,
        },
        {
          path: "/testing/cards",
          element: <Cards />,
        },
        {
          path: "/testing/write-word",
          element: <WriteWord />,
        },
        {
          path: "/testing/congratulations",
          element: <CongratulationsScreen />,
        },
        {
          path: "/account",
          element: <Account/>
        }
      ]
    },
    {
      path: "/auth",
      element: <AuthRoot />,
      children: [
        {
          index: true,
          element: <AuthPage />,
        },
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/registration",
          element: <Registration />,
        },
      ]
    },
  ]);

  return router;
}

export default Router;