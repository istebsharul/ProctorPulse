import axios from "axios";
import toast from 'react-hot-toast';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  LOAD_FAILURE,
  LOAD_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "../Constants/userConstant";
import Cookies from 'js-cookie';

// Function to set cookie
// const setCookie = (name, value, days) => {
//   const date = new Date();
//   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + date.toUTCString();
//   document.cookie = name + "=" + value + ";" + expires + ";path=/";
// };

export const login = (email, password,userType) => {
  return async (dispatch) => {
    try {
      // Simulate API call for login
      const endpoint = userType === 'teacher' ? 'api/admin/login' : 'api/user/login'

      const response = await axios.post(
        endpoint,
        { email, password }
      );

      // const token = response.data.token;
      toast.success("Login Successful");
      console.log("Login Successful");
      // setCookie("jwt", token, 1); /// Set cookie expiry for 1 day
      // console.log(token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const load = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      "/api/user/profile"
    );

    dispatch({ type: LOAD_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_FAILURE, payload: error.response.data.message });
  }
};

export const signup = (name, email, password,userType,organisation) => {
  return async (dispatch) => {
    try {
      console.log(name,email,password,userType,organisation);
      // Simulate API call for signup

      const endpoint = userType === 'teacher' ? 'api/admin/register':'api/user/register';

      const response = await axios.post(
        endpoint,
        { name, email, password,organisation }
      );
      console.log("Response",response);
      toast.success('User Created Successfully');
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    try {
      // Remove the JWT token from cookies
      Cookies.remove('token');
      Cookies.remove('jwt');

      // Dispatch the logout success action
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      // Dispatch the logout failure action
      dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
  };
}

export const forgotPassword = (email) => {
  return async (dispatch) => {
    try {
      // Simulate API call for forgot password
      const response = await axios.post(
        "/api/user/forgotpassword",
        { email }
      );
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
    }
  };
};
