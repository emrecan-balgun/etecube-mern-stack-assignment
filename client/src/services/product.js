import axios from "axios";

import { PRODUCT_URL } from "../constants";

const getAllProducts = async () => {
  return await axios.get(PRODUCT_URL);
};

const getProduct = async (id) => {
  return await axios.get(`${PRODUCT_URL}/${id}`);
};

const createProduct = async (data) => {
  return await axios.post(PRODUCT_URL, data);
};

const updateProduct = async (id, data) => {
  return await axios.put(`${PRODUCT_URL}/${id}`, data);
};

const deleteProduct = async (id) => {
  return await axios.delete(`${PRODUCT_URL}/${id}`);
};

export {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
