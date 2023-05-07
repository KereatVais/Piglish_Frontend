import React, { useState } from "react";

const useRefreshToken = () => {
  const getRefreshToken = () => {
    const tokenString = sessionStorage.getItem('RefreshToken');
    const userToken = JSON.parse(tokenString);
    // debugger
    return userToken;
  };

  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  const saveRefreshToken = (token) => {
    sessionStorage.setItem('RefreshToken', JSON.stringify(token));
    setRefreshToken(token);
  };

  return {
    setRefreshToken: saveRefreshToken,
    refreshToken
  }
}

export default useRefreshToken;