import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from "./ActionTypes";

// Function to set cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Simulate API call for login
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password }
      );

      const token = response.data.token;
      setCookie("jwt", token, 1); // Set cookie expiry for 1 day
      // console.log(token);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const signup = (name, email, password) => {
  return async (dispatch) => {
    try {
      // Simulate API call for signup
      const response = await axios.post(
        "http://localhost:4000/api/user/register",
        { name, email, password }
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
