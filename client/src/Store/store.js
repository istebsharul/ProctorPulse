import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "../Reducers/Reducer";

const store = configureStore({
  reducer: {
    auth: authReducer, // Assuming your authReducer is managing authentication state
    // Add more reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add Thunk middleware
  // Add other store configurations if needed
});

export default store;
