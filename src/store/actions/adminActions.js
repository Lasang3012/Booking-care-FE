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
  return {
    type: actionTypes.GET_GENDER_START,
  };
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
