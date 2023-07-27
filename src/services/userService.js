import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/users/login", {
    email: email,
    password: password,
  });
};

const getUserInfoByToken = (token) => {
  return axios.get("/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getListUser = () => {
  return axios.get("/users");
};

export default {
  handleLogin: handleLogin,
  getListUser: getListUser,
  getUserInfoByToken: getUserInfoByToken,
};
