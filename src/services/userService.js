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

const createUser = (
  name,
  email,
  password,
  passwordConfirm,
  positionId,
  genderId,
  roleId,
  phone
) => {
  return axios.post("/users", {
    email: email,
    name: name,
    password: password,
    passwordConfirm: passwordConfirm,
    positionId: positionId,
    genderId: genderId,
    roleId: roleId,
    phone: phone,
  });
};

const getAllCode = async (queryParams) => {
  const results = await axios.get("/codes", { params: { type: queryParams } });
  return results;
};

export default {
  handleLogin: handleLogin,
  getListUser: getListUser,
  getUserInfoByToken: getUserInfoByToken,
  getAllCode: getAllCode,
  createUser: createUser,
};
