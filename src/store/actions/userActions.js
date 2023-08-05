import actionTypes from "./actionTypes";
import axios from "axios";
import { userService } from "../../services";
import { toast } from "react-toastify";

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

export const createMarkdownDoctorSuccess =
  (data) => async (dispatch, getState) => {
    try {
      const results = await axios.post(`http://localhost:8088/markdowns`, data);

      if (!results) {
        toast.warn("create markdown doctor failed");
        dispatch(createMarkdownDoctorFailed());
      }
      toast.success("create markdown doctor success");
    } catch (e) {
      dispatch(createMarkdownDoctorFailed());
    }
  };

export const createMarkdownDoctorFailed = (dispatch, getState) => {
  return {
    type: actionTypes.CREATE_MARKDOWN_DOCTOR_FAILED,
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

export const getUserByIdSuccess = (userId) => async (dispatch, getState) => {
  try {
    const results = await axios.get(`http://localhost:8088/users/${userId}`);
    if (!results) {
      dispatch(getUserByIdFailed());
    }
    return dispatch({
      type: actionTypes.GET_USER_BY_ID_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getUserByIdFailed());
    console.log(e);
  }
};

export const getUserByIdFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_CODE_FAILED,
  };
};

export const createDoctorScheduleSuccess =
  (data) => async (dispatch, getState) => {
    try {
      console.log(data);
      const results = await axios.post("http://localhost:8088/schedules", {
        data,
      });
      if (!results) {
        dispatch(createDoctorScheduleFailed());
      }
      // return dispatch({
      //   type: actionTypes.GET_USER_BY_ID_SUCCESS,
      //   data: results.data,
      // });
    } catch (e) {
      dispatch(createDoctorScheduleFailed());
      console.log(e);
    }
  };

export const createDoctorScheduleFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_CODE_FAILED,
  };
};

export const getCodeByIdSuccess = (codeId) => async (dispatch, getState) => {
  try {
    const result = await axios.get(`http://localhost:8088/codes/${codeId}`);
    if (!result) {
      dispatch(getCodeByIdFailed());
    }
    return dispatch({
      type: actionTypes.GET_CODE_BY_ID_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    dispatch(getCodeByIdFailed());
    console.log(e);
  }
};

export const getCodeByIdFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_CODE_BY_ID_FAILED,
  };
};
