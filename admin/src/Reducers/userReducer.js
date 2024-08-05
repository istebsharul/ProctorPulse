import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    LOAD_FAILURE,
    LOAD_SUCCESS,
} from '../Constants/userConstant';

const initialState = {
    admin:null,
    isAuthenticated:false,
    error:null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SUCCESS:
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                admin: action.payload,
                error: null,
                isAuthenticated: true,
            };
        case LOAD_FAILURE:
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                admin: null,
                error: action.payload,
                isAuthenticated: false
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                admin: null,
                error: action.payload,
                isAuthenticated: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                admin: null,
                error: null,
                isAuthenticated: false,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                // You might want to handle the success scenario differently,
                // such as displaying a message to the admin.
                // For example, you could set admin to null and error to a success message.
                admin: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
