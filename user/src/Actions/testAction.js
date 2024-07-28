import axios from "axios";
import {
  FETCH_TEST_DETAILS_FAILURE,
  FETCH_TEST_DETAILS_SUCCESS,
  FETCH_USER_TEST_RESPONSE_SUCCESS,
  FETCH_USER_TEST_RESPONSE_FAILURE
} from "../Constants/testConstants";

export const get_test_details = (userId, testId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/user/${userId}/test/${testId}`);
      const questions = response.data.data.questions;

      dispatch({ type: FETCH_TEST_DETAILS_SUCCESS, payload: questions });
    } catch (error) {
      dispatch({ type: FETCH_TEST_DETAILS_FAILURE, payload: error.message });
    }
  };
};

export const get_user_test_response = (userId, testId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/user/${userId}/test/${testId}/details`);
      const { total_score, attempted_questions, skipped_questions } = response.data.data;
      const payload = { total_score, attempted_questions, skipped_questions };
      dispatch({ type: FETCH_USER_TEST_RESPONSE_SUCCESS, payload });
      return payload; // Return the payload
    } catch (error) {
      dispatch({ type: FETCH_USER_TEST_RESPONSE_FAILURE, payload: error.message });
      throw error; // Re-throw the error to handle it in the component
    }
  };
};
