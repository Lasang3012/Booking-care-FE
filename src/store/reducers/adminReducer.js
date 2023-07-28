import actionTypes from "../actions/actionTypes";

const initialState = {
  gender: [],
  position: [],
  role: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENDER_START:
      return {
        ...state,
      };

    case actionTypes.GET_GENDER_SUCCESS:
      const copyState = { ...state };
      copyState.gender = action.data;
      return copyState;

    default:
      return state;
  }
};

export default adminReducer;
