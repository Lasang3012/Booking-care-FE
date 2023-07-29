import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  position: [],
  role: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENDER_SUCCESS: {
      const copyState = { ...state };
      copyState.gender = action.data;
      return copyState;
    }

    case actionTypes.GET_GENDER_FAILED: {
      const copyState = { ...state };
      copyState.gender = [];
      return copyState;
    }

    case actionTypes.GET_ROLE_SUCCESS: {
      const copyState = { ...state };
      copyState.role = action.data;
      return copyState;
    }

    case actionTypes.GET_ROLE_FAILED: {
      const copyState = { ...state };
      copyState.role = [];
      return copyState;
    }

    case actionTypes.GET_POSITION_SUCCESS: {
      const copyState = { ...state };
      copyState.position = action.data;
      return copyState;
    }

    case actionTypes.GET_POSITION_FAILED: {
      const copyState = { ...state };
      copyState.position = [];
      return copyState;
    }

    default:
      return state;
  }
};

export default adminReducer;
