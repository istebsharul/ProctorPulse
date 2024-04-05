import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "./ActionTypes";
import { toast } from "react-hot-toast";

// Function to set cookie
const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const adminLogin = (email, password) => {
  return async (dispatch) => {
    try {
      // Simulate API call for admin login
      const response = await axios.post(
        "http://localhost:4000/api/admin/login",
        { email, password }
      );

      const token = response.data.token;
      setCookie("admin_jwt", token, 1); // Set admin cookie expiry for 1 day
      // console.log(token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      toast.success("Admin Login Successful");
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

export const adminSignup = (name, email, password, organisation) => {
  return async (dispatch) => {
    try {
      // Simulate API call for admin signup
      const response = await axios.post(
        "http://localhost:4000/api/admin/register",
        { name, email, password, organisation }
      );
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
      toast.success("Admin Signup Successful");
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
      toast.error("Error Admin Signup");
    }
  };
};

export const adminLogout = () => {
  return { type: LOGOUT };
};

export const adminForgotPassword = (email) => {
  return async (dispatch) => {
    try {
      // Simulate API call for admin forgot password
      const response = await axios.post(
        "http://localhost:4000/api/admin/forgotpassword",
        { email }
      );
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
};
