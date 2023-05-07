import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useToken from "./useToken";

const useAuth = (props) => {
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  }, [])
}

export default useAuth;