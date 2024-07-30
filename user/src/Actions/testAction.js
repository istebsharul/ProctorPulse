import axios from "axios";
import {
  FETCH_TEST_DETAILS_FAILURE,
  FETCH_TEST_DETAILS_SUCCESS,
  FETCH_USER_TEST_RESPONSE_SUCCESS,
  FETCH_USER_TEST_RESPONSE_FAILURE,
  FETCH_USER_AVAILABLE_TEST_SUCCESS,
  FETCH_USER_AVAILABLE_TEST_FAILURE
} from "../Constants/testConstants";

export const load_available_test = (userId) => {
  return async (dispatch) => {
    console.log("User Id", userId);
    try {
      const response = await axios.get(`/api/user/${userId}/tests/available`);
      console.log("Response", response);
      const questions = response.data;
      console.log("Questions", response.data.data);
      dispatch({ type: FETCH_USER_AVAILABLE_TEST_SUCCESS, payload: questions });
    } catch (error) {
      dispatch({ type: FETCH_USER_AVAILABLE_TEST_FAILURE, payload: error.message });
      // throw error;
    }
  }
}

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

export const checkTestAttempted = ({userId, testId}) => async (dispatch) => {
  try {
      console.log(testId,userId);
      const response = await axios.post('/api/user/test/attempted', { userId, testId });
      return response.data.attempted;
  } catch (error) {
      console.error('Error checking test attempt:', error);
      throw error;
  }
};