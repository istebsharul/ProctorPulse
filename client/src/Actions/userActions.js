import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
} from "./ActionTypes";
import toast from "react-hot-toast";

// Function to set cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const userLogin = (email, password) => {
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
      toast.success("Login Successful. Welcome!");
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
      console.error("Login failed:", error);
      if (error.response.status === 401) {
        toast.error("Invalid Email or Password!");
      } else if (error.response.status === 400) {
        toast.error("Empty password. Please enter your password.");
      } else if (error.response.status === 500) {
        toast.error("Error signing JWT");
      } else {
        toast.error("An error occurred. Please try again later.");
        // console.error(error);
      }
    }
  };
};

export const userSignup = (name, email, password) => {
  return async (dispatch) => {
    try {
      // Simulate API call for signup
      const response = await axios.post(
        "http://localhost:4000/api/admin/register",
        { name, email, password }
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
};

export const userLogout = () => {
  return { type: LOGOUT };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      // Simulate API call for forgot password
      const response = await axios.post(
        "http://localhost:4000/api/user/forgotpassword",
        { email }
      );
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
};

// userActions.js
export const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
});

export const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
});
