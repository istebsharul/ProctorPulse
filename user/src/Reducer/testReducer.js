// import { act } from "react";
import {
    FETCH_TEST_DETAILS_SUCCESS,
    FETCH_TEST_DETAILS_FAILURE,
  } from "../Constants/testConstants";
  
  const initialState = {
    questions: [],
    loading: false,
    error: null,
  };
  
  const testReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TEST_DETAILS_SUCCESS:
        return {
          ...state,
          test: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_TEST_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default testReducer;  