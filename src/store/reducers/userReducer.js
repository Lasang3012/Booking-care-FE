import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  listDoctor: [],
  listCode: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.userToken,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userToken: null,
      };

    case actionTypes.GET_LIST_CODE_SUCCESS: {
      const copyState = { ...state };
      copyState.listCode = action.data;
      return copyState;
    }

    case actionTypes.GET_LIST_CODE_FAILED: {
      const copyState = { ...state };
      copyState.listCode = [];
      return copyState;
    }

    case actionTypes.GET_LIST_DOCTOR_SUCCESS: {
      const copyState = { ...state };
      copyState.listDoctor = action.data;
      return copyState;
    }

    case actionTypes.GET_LIST_DOCTOR_FAILED: {
      const copyState = { ...state };
      copyState.listDoctor = [];
      return copyState;
    }
    default:
      return state;
  }
};

export default appReducer;
