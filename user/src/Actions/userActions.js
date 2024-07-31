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
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS
} from '../Constants/userConstants';

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
            const endpoint = 'api/user/login';

            const response = await axios.post(
                endpoint,
                { email, password }
            );

            const token = response.data.token;
            toast.success("Login Successful");
            console.log("Login Successful");
            setCookie("jwt", token, 1); // Set cookie expiry for 1 day
            console.log(token);
            dispatch({ type: LOGIN_SUCCESS, payload: response.data });
            return { isLoggedIn: true };
        } catch (error) {
            toast.error('Login Failed: ' + error.message);
            dispatch({ type: LOGIN_FAILURE, payload: error.message });
        }
    };
};

export const loadUser = () => async (dispatch) => {
    try {
        const { data } = await axios.get(
            "/api/user/profile"
        );
        // console.log("data retrieved using loadUser", data);
        toast.success('User data loaded successfully');
        dispatch({ type: LOAD_SUCCESS, payload: data.user });
    } catch (error) {
        // toast.error('Failed to load user data: ' + error.response.data.message);
        dispatch({ type: LOAD_FAILURE, payload: error.response.data.message });
    }
};

export const signup = (name, email, password, organisation) => {
    return async (dispatch) => {
        try {
            console.log(name, email, password, organisation);
            // Simulate API call for signup

            const endpoint = 'api/user/register';

            const response = await axios.post(
                endpoint,
                { name, email, password, organisation }
            );
            console.log("Response", response);
            toast.success('User Created Successfully');
            dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
        } catch (error) {
            toast.error('Signup Failed: ' + error.message);
            dispatch({ type: SIGNUP_FAILURE, payload: error.message });
        }
    };
};

export const logout = () => async (dispatch) => {
    try {
      console.log("apple in a day");
      await axios.get(
        "/api/user/logout"
      );
      toast.success('Logout Successful');
      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
      toast.error('Logout Failed: ' + error.message);
      dispatch({ type: LOGOUT_FAILURE, payload: error.message });
    }
};

export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            const response = await toast.promise(
                axios.post("/api/user/password/forgot", { email }),
                {
                    loading: 'Processing...',
                    success: 'Reset password link has been sent to your registered email.',
                    error: 'Error resetting password',
                }
            );

            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FORGOT_PASSWORD_FAILURE, payload: error.message });
        }
    };
};

export const resetPassword = (password,confirmPassword,token) => {
    return async (dispatch) => {
        try {
            console.log("p",password);
            console.log("cp",confirmPassword);
            console.log("token",token);

            const response = await axios.put(
                `/api/user/password/reset/${token}`,
                {password,confirmPassword}
            );
            toast.success("Password Reset Successfully");
            dispatch({type:RESET_PASSWORD_SUCCESS, payload: response.data});
        } catch (error) {
            toast.error(error.message);
            console.log(error.message);
            dispatch({type:RESET_PASSWORD_FAILURE, payload: error.message});
        }
    }
};

export const updateProfile = (formData) => {
    return async (dispatch) => {
      try {
        const response = await toast.promise(
          axios.put("/api/user/profile/update", {
            name: formData.name,
            email: formData.email,
            organisation: formData.organisation,
            imageUrl: formData.imageUrl
          }),
          {
            loading: 'Updating profile...',
            success: 'Profile Updated Successfully',
            error: 'Error updating profile',
          }
        );
  
        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: response.data });
      } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
      }
    }
};