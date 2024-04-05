const initialState = {
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: true,
      };
    default:
      return state;
  }
};

export default userReducer;
