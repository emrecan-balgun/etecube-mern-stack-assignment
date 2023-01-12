import axios from "axios";

import { AUTH_URL } from "../constants";

const getTotalUser = async () => {
  return await axios.get(`${AUTH_URL}/totalUsers`);
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("userToken"));
};

const logoutUser = () => {
  localStorage.removeItem("userToken");
};

const isRealUser = async (id) => {
  return await axios.get(`${AUTH_URL}/checkUser/${id}`);
};

const getAllUsers = async () => {
  return await axios.get(`${AUTH_URL}`);
};

const deleteUser = async (id) => {
  return await axios.delete(`${AUTH_URL}/${id}`);
};

export {
  getTotalUser,
  getUser,
  logoutUser,
  isRealUser,
  getAllUsers,
  deleteUser,
};
