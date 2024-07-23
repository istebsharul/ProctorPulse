import authReducer from "../Reducer/userReducer";
import {configureStore} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk';

const store = configureStore({
    reducer:{
        auth:authReducer,
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(thunk),
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add Thunk middleware
})

export default store;