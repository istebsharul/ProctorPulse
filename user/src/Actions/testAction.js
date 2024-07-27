import axios from "axios";
import {
  FETCH_TEST_DETAILS_FAILURE,
  FETCH_TEST_DETAILS_SUCCESS,
} from "../Constants/testConstants";

export const get_test_details = (userId, testId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/user/${userId}/test/${testId}`, { userId, testId });
      const questions = response.data.data.questions;

      dispatch({ type: FETCH_TEST_DETAILS_SUCCESS, payload: questions });
    } catch (error) {
      dispatch({ type: FETCH_TEST_DETAILS_FAILURE, payload: error.message });
    }
  };
};