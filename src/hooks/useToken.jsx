import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const useToken = () => {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('Authorization');
    let userToken = JSON.parse(tokenString);

    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  useEffect(() => {
  }, []);

  const saveToken = (userToken) => {
    sessionStorage.setItem('Authorization', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  const isExpired = () => {
    const tokenString = sessionStorage.getItem('Authorization');
    let userToken = JSON.parse(tokenString);

    return Date.parse(userToken.expirationDate) < Date.now();
  }

  return {token, setToken: saveToken, tokenIsExpired: isExpired}
}

export default useToken;