import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

const createError = (
  httpStatusCode,
  statusCode,
  errorMessage,
  problems,
  errorCode = ""
) => {
  const error = new Error();
  error.httpStatusCode = httpStatusCode;
  error.statusCode = statusCode;
  error.errorMessage = errorMessage;
  error.problems = problems;
  error.errorCode = errorCode + "";
  return error;
};

export const isSuccessStatusCode = (s) => {
  // May be string or number
  const statusType = typeof s;
  return (
    (statusType === "number" && s === 0) ||
    (statusType === "string" && s.toUpperCase() === "OK")
  );
};

instance.interceptors.response.use(
  (response) => {
    // Thrown error for request with OK status code
    console.log("ooooooo", response);
    const { data } = response;
    console.log("aaaaaaaaaaaa", data);
    if (
      data.hasOwnProperty("s") &&
      !isSuccessStatusCode(data["s"]) &&
      data.hasOwnProperty("errmsg")
    ) {
      return Promise.reject(
        createError(
          response.status,
          data["s"],
          data["errmsg"],
          null,
          data["errcode"] ? data["errcode"] : ""
        )
      );
    }

    // Return direct data to callback
    if (data.hasOwnProperty("s") && data.hasOwnProperty("d")) {
      return data["d"];
    }
    // Handle special case
    if (data.hasOwnProperty("s") && _.keys(data).length === 1) {
      return null;
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default instance;
