import axios from "axios";

import { COMPANY_URL } from "../constants";

const getAllCompanies = async () => {
  return await axios.get(COMPANY_URL);
};

const getCompany = async (id) => {
  return await axios.get(`${COMPANY_URL}/${id}`);
};

const createCompany = async (data) => {
  return await axios.post(COMPANY_URL, data);
};

const updateCompany = async (id, data) => {
  return await axios.put(`${COMPANY_URL}/${id}`, data);
};

const deleteCompany = async (id) => {
  return await axios.delete(`${COMPANY_URL}/${id}`);
};

export {
  getAllCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
