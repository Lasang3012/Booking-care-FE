import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userToken: null,
  listDoctor: [],
  listCode: [],
  listSpecialty: [],
  listDoctorInfo: {},
  userInfo: {},
  userDoctorInfo: {},
  codeData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userToken: action.userToken,
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

    case actionTypes.GET_USER_BY_ID_SUCCESS: {
      const copyState = { ...state };
      copyState.userInfo = action.data;
      return copyState;
    }

    case actionTypes.GET_USER_BY_ID_FAILED: {
      const copyState = { ...state };
      copyState.userInfo = {};
      return copyState;
    }

    case actionTypes.GET_DOCTOR_USER_MORE_INFO_BY_ID_SUCCESS: {
      const copyState = { ...state };
      copyState.userDoctorInfo = action.data;
      return copyState;
    }

    case actionTypes.GET_DOCTOR_USER_MORE_INFO_BY_ID_FAILED: {
      const copyState = { ...state };
      copyState.userDoctorInfo = {};
      return copyState;
    }

    case actionTypes.GET_LIST_CODE_BY_TYPE_PRICE_PROVINCE_PAYMENT_SUCCESS: {
      const copyState = { ...state };
      copyState.listDoctorInfo = action.data;
      return copyState;
    }

    case actionTypes.GET_LIST_CODE_BY_TYPE_PRICE_PROVINCE_PAYMENT_FAILED: {
      const copyState = { ...state };
      copyState.listDoctorInfo = {};
      return copyState;
    }

    case actionTypes.GET_LIST_SPECIALTY_SUCCESS: {
      const copyState = { ...state };
      copyState.listSpecialty = action.data.data;
      return copyState;
    }

    case actionTypes.GET_LIST_SPECIALTY_FAILED: {
      const copyState = { ...state };
      copyState.listSpecialty = {};
      return copyState;
    }

    default:
      return state;
  }
};

export default userReducer;
