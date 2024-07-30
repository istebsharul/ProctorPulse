import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import authReducer from "../Reducer/userReducer";
import testReducer from "../Reducer/testReducer";

const store = configureStore({
  reducer: {
    auth: authReducer, // Assuming authReducer manages authentication state
    test: testReducer, // Assuming testReducer manages test-related state
    // Add more reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // Add other store configurations if needed
});

export default store;