import actionTypes from "./actionTypes";
import axios from "axios";
import { userService } from "../../services";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const userLoginSuccess = (userToken) => {
  return {
    type: actionTypes.USER_LOGIN_SUCCESS,
    userToken: userToken,
  };
};

export const getListDoctorSuccess = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get(`http://localhost:8088/users`, {
      params: query,
    });
    if (!results) {
      dispatch(getListDoctorFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_DOCTOR_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getListDoctorFailed());
  }
};

export const getListDoctorFailed = (dispatch, getState) => {
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};

export const getAllCodeSuccess = (query) => async (dispatch, getState) => {
  try {
    const results = await userService.getAllCode(query);
    if (!results) {
      dispatch(getAllCodeFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_CODE_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getAllCodeFailed());
    console.log(e);
  }
};

export const getAllCodeFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_CODE_FAILED,
  };
};
