import actionTypes from "./actionTypes";
import axios from "axios";
import { userService } from "../../services";
import { toast } from "react-toastify";
import { CODES } from "../../utils";

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

export const getDoctorUserMoreInfoByIdSuccess =
  (userId) => async (dispatch, getState) => {
    try {
      const results = await axios.get(
        `http://localhost:8088/doctors/${userId}`
      );
      if (!results) {
        dispatch(getUserByIdFailed());
      }
      return dispatch({
        type: actionTypes.GET_DOCTOR_USER_MORE_INFO_BY_ID_SUCCESS,
        data: results.data,
      });
    } catch (e) {
      dispatch(getUserByIdFailed());
      console.log(e);
    }
  };

export const getDoctorUserMoreInfoByIdFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_DOCTOR_USER_MORE_INFO_BY_ID_FAILED,
  };
};

export const createDoctorScheduleSuccess =
  (data) => async (dispatch, getState) => {
    try {
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

export const getSchedulesSuccess = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get("http://localhost:8088/schedules", {
      params: query,
    });
    if (!results) {
      dispatch(getSchedulesFailed());
    }
    return results;
  } catch (e) {
    dispatch(getSchedulesFailed());
    console.log(e);
  }
};

export const getSchedulesFailed = (dispatch, getState) => {
  return {};
};

export const getDoctorInfoRequire = (query) => async (dispatch, getState) => {
  try {
    const listPrice = await userService.getAllCode({ type: CODES.PRICE });
    const listPayment = await userService.getAllCode({ type: CODES.PAYMENT });
    const listProvince = await userService.getAllCode({ type: CODES.PROVINCE });

    if (!listPrice && !listPayment && !listProvince) {
      dispatch(getDoctorInfoRequireFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_CODE_BY_TYPE_PRICE_PROVINCE_PAYMENT_SUCCESS,
      data: {
        listPrice: listPrice.data,
        listPayment: listPayment.data,
        listProvince: listProvince.data,
      },
    });
  } catch (e) {
    dispatch(getDoctorInfoRequireFailed());
    console.log(e);
  }
};

export const getDoctorInfoRequireFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_CODE_BY_TYPE_PRICE_PROVINCE_PAYMENT_FAILED,
  };
};

export const verifyPatientBooking =
  (token, doctorId) => async (dispatch, getState) => {
    try {
      const results = await axios.put(
        `http://localhost:8088/patients/verify-booking/${token}/${doctorId}`
      );
      if (!results) {
        dispatch(verifyPatientBookingFailed());
      }
    } catch (e) {
      dispatch(verifyPatientBookingFailed());
      console.log(e);
    }
  };

export const verifyPatientBookingFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.GET_LIST_CODE_BY_TYPE_PRICE_PROVINCE_PAYMENT_FAILED,
  };
};

export const getListSpecialty = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get("http://localhost:8088/specialties", {
      params: query,
    });
    if (!results) {
      dispatch(getListSpecialtyFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_SPECIALTY_SUCCESS,
      data: results.data,
    });
  } catch (e) {
    dispatch(getListSpecialtyFailed());
  }
};

export const getListSpecialtyFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_SPECIALTY_FAILED,
    data: [],
  };
};

export const getListDoctorByQuery = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get(`http://localhost:8088/doctors`, {
      params: query,
    });
    if (!results) {
      dispatch(getListDoctorByQueryFailed());
    }
    return results;
  } catch (e) {
    dispatch(getListDoctorByQueryFailed());
  }
};

export const getListDoctorByQueryFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.EDIT_USER_FAILED,
  };
};

export const getUserByIdForListSpecialty =
  (userId) => async (dispatch, getState) => {
    try {
      const results = await axios.get(`http://localhost:8088/users/${userId}`);
      if (!results) {
        dispatch(getUserByIdForListSpecialtyFailed());
      }
      return results;
    } catch (e) {
      dispatch(getUserByIdForListSpecialtyFailed());
      console.log(e);
    }
  };

export const getUserByIdForListSpecialtyFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.GET_LIST_CODE_FAILED,
  };
};

export const getSpecialtyById = (specialtyId) => async (dispatch, getState) => {
  try {
    const results = await axios.get(
      `http://localhost:8088/specialties/${specialtyId}`
    );
    if (!results) {
      dispatch(getSpecialtyByIdFailed());
    }
    return results;
  } catch (e) {
    dispatch(getSpecialtyByIdFailed());
  }
};

export const getSpecialtyByIdFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.EDIT_USER_FAILED,
  };
};

// Clinic
export const getListClinic = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get("http://localhost:8088/clinics", {
      params: query,
    });
    if (!results) {
      dispatch(getListClinicFailed());
    }
    return dispatch({
      type: actionTypes.GET_LIST_CLINIC_SUCCESS,
      data: results.data.data,
    });
  } catch (e) {
    dispatch(getListClinicFailed());
  }
};

export const getListClinicFailed = (dispatch, getState) => {
  return {
    type: actionTypes.GET_LIST_CLINIC_FAILED,
    data: [],
  };
};

export const getClinicById = (clinicId) => async (dispatch, getState) => {
  try {
    const results = await axios.get(
      `http://localhost:8088/clinics/${clinicId}`
    );
    if (!results) {
      dispatch(getClinicByIdFailed());
    }
    return results;
  } catch (e) {
    dispatch(getClinicByIdFailed());
  }
};

export const getClinicByIdFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.EDIT_USER_FAILED,
  };
};

export const getListPatientBooking = (query) => async (dispatch, getState) => {
  try {
    const results = await axios.get(
      `http://localhost:8088/doctors/patients-booking`,
      {
        params: query,
      }
    );
    if (!results) {
      dispatch(getListPatientBookingFailed());
    }
    return results;
  } catch (e) {
    dispatch(getListPatientBookingFailed());
    console.log(e);
  }
};

export const getListPatientBookingFailed = (dispatch, getState) => {
  return {
    // type: actionTypes.GET_LIST_CODE_FAILED,
  };
};
