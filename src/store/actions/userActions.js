import actionTypes from "./actionTypes";

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
