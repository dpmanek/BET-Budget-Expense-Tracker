import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";

const getUserIncome = (TransactionID) => {
  return axios
    .get(API_URL + "/getIncome", {
      headers: authHeader(),
      params: { id: TransactionID },
    })
    .then((response) => {
      return response.data.data[0];
    });
};

const getUserExpense = (TransactionID) => {
  return axios
    .get(API_URL + "/getExpense", {
      headers: authHeader(),
      params: { id: TransactionID },
    })
    .then((response) => {
      return response.data.data[0];
    });
};

const postUserIncome = (body) => {
  return axios
    .post(API_URL + "/addIncome", { body: body }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const postUserExpense = (body) => {
  return axios
    .post(API_URL + "/addExpense", { body: body }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteUserIncome = (TransactionID) => {
  return axios
    .delete(API_URL + "/deleteIncome", {
      headers: authHeader(),
      data: { TransactionID: TransactionID },
    })
    .then((response) => {
      return response.data;
    });
};

const deleteUserExpense = (TransactionID) => {
  return axios
    .delete(API_URL + "/deleteExpense", {
      headers: authHeader(),
      data: { TransactionID: TransactionID },
    })
    .then((response) => {
      return response.data;
    });
};

const updateUserExpense = (TransactionID) => {
  return axios
    .put(API_URL + "/updateExpense", {
      headers: authHeader(),
      TransactionID: TransactionID,
    })
    .then((response) => {
      return response.data;
    });
};

const updateUserIncome = (TransactionID) => {
  return axios
    .put(API_URL + "/updateIncome", {
      headers: authHeader(),
      TransactionID: TransactionID,
    })
    .then((response) => {
      return response.data;
    });
};

const transactionService = {
  getUserIncome,
  getUserExpense,
  postUserIncome,
  postUserExpense,
  deleteUserIncome,
  deleteUserExpense,
  updateUserIncome,
  updateUserExpense,
};
export default transactionService;
