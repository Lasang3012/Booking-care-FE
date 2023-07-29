import actionTypes from "./actionTypes";
import { userService } from "../../services";
import { CODES } from "../../utils";

export const getGenderStart = () => async (dispatch, getState) => {
  try {
    const results = await userService.getAllCode(CODES.GENDER);
    if (!results) {
      dispatch(getGenderFailed());
    }
    dispatch(getGenderSuccess(results.data));
  } catch (e) {
    dispatch(getGenderFailed());
    console.log(e);
  }
};

export const getGenderSuccess = (data) => {
  return {
    type: actionTypes.GET_GENDER_SUCCESS,
    data: data,
  };
};

export const getGenderFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_GENDER_FAILED,
  };
};

export const getRoleSuccess = () => async (dispatch, getState) => {
  try {
    const results = await userService.getAllCode(CODES.ROLE);
    if (!results) {
      dispatch(getRoleFailed());
    }
    return dispatch({
      type: actionTypes.GET_ROLE_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getRoleFailed());
    console.log(e);
  }
};

export const getRoleFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_ROLE_FAILED,
  };
};

export const getPositionSuccess = () => async (dispatch, getState) => {
  try {
    const results = await userService.getAllCode(CODES.POSITION);
    if (!results) {
      dispatch(getPositionFailed());
    }
    return dispatch({
      type: actionTypes.GET_POSITION_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getPositionFailed());
    console.log(e);
  }
};

export const getPositionFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_ROLE_FAILED,
  };
};
