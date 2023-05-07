import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  username: null,
  userId: null,
  dateOfBirth: null,
  email: null,
  country: null,
  isAuth: false,
  refreshToken: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      debugger
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };
    }
    default:
      return state;

  }
};

export const setAuthUserData = (userData, refreshToken) => (
  {
    type: SET_USER_DATA,
    payload: {
      userId: userData.userId,
      username: userData.username,
      dateOfBirth: userData.dateOfBirth,
      email: userData.email,
      country: userData.country,
      refreshToken
    }
  }
);

export const auth = (username, password, setLoginCompleted, setErrorData) => {
  return (dispatch) => {
    debugger;
    api.login(username, password).then(data => {
      debugger
      if (data.status === 200) {
        debugger;
        let { id, username, refreshToken } = data.data;
        dispatch(setAuthUserData(id, username, refreshToken));

        setLoginCompleted(true);
      }
    }).catch(err => {
      debugger
      setErrorData(err.response.data)
    })
  }
};

export default authReducer;