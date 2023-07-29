const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",

  // Gender
  GET_GENDER_START: "GET_GENDER_START",
  GET_GENDER_SUCCESS: "GET_GENDER_SUCCESS",
  GET_GENDER_FAILED: "GET_GENDER_FAILED",

  // Role
  GET_ROLE_SUCCESS: "GET_ROLE_SUCCESS",
  GET_ROLE_FAILED: "GET_ROLE_FAILED",

  // Position
  GET_POSITION_SUCCESS: "GET_POSITION_SUCCESS",
  GET_POSITION_FAILED: "GET_POSITION_FAILED",
});

export default actionTypes;
