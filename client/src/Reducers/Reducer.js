import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from "../Actions/ActionTypes";

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        // You might want to handle the success scenario differently,
        // such as displaying a message to the user.
        // For example, you could set user to null and error to a success message.
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
