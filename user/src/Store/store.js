import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';
import authReducer from "../Reducer/userReducer";
import testReducer from "../Reducer/testReducer";
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from 'redux-persist';

const persistConfig = {
  key:'user',
  storage,
};

const persistedReducer = persistReducer(persistConfig,authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer, // Assuming authReducer manages authentication state
    test: testReducer, // Assuming testReducer manages test-related state
    // Add more reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // Add other store configurations if needed
});

export const persistor = persistStore(store);
export default store;