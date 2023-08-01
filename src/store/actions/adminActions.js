import actionTypes from "./actionTypes";
import { userService } from "../../services";
import { CODES } from "../../utils";
import axios from "axios";
import { toast } from "react-toastify";

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

export const createUser = (userInfo) => async (dispatch, getState) => {
  try {
    const results = await axios.post("http://localhost:8088/users", userInfo);
    if (!results) {
      dispatch(createUserFailed());
    }
    toast.success("Create user success");
    dispatch({
      type: actionTypes.CREATE_USER_SUCCESS,
      data: results.data,
    });
    dispatch(getListUser());
  } catch (e) {
    dispatch(createUserFailed());
    console.log(e);
  }
};

export const createUserFailed = (dispatch, getState) => {
  return {
    type: actionTypes.CREATE_USER_FAILED,
  };
};

export const getListUser = () => async (dispatch, getState) => {
  try {
    const results = await userService.getListUser();
    if (!results) {
      dispatch(getListUserFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_USER_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getListUserFailed());
    console.log(e);
  }
};

export const getListUserFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_USER_FAILED,
  };
};

export const deleteUserSuccess = (userId) => async (dispatch, getState) => {
  try {
    const results = await axios.delete(`http://localhost:8088/users/${userId}`);
    if (!results) {
      dispatch(deleteUserFailed());
    }
    toast.success("Delete user success");
    dispatch(getListUser());
  } catch (e) {
    dispatch(deleteUserFailed());
    console.log(e);
  }
};

export const deleteUserFailed = (dispatch, getState) => {
  return {
    type: actionTypes.DELETE_USER_FAILED,
  };
};

export const editUserSuccess = (userId, data) => async (dispatch, getState) => {
  try {
    console.log("aaaaaaaa", userId, data);
    const results = await axios.put(`http://localhost:8088/users/${userId}`, {
      ...data,
    });
    if (!results) {
      dispatch(editUserFailed());
    }
    toast.success("edit user success");
    dispatch(getListUser());
  } catch (e) {
    dispatch(editUserFailed());
    toast.success("edit user failed");
    console.log(e);
  }
};

export const editUserFailed = (dispatch, getState) => {
  return {
    type: actionTypes.EDIT_USER_FAILED,
  };
};