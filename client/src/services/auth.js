import axios from 'axios';

import { AUTH_URL } from '../constants';

const registerUser = async (data) => {
  return await axios.post(`${AUTH_URL}/register`, data);
};

const loginUser = async (data) => {
  return await axios.post(`${AUTH_URL}/login`, data);
};

export { registerUser, loginUser };
