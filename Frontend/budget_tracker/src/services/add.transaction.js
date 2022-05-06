import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";



const postUserExpense = (body) => {
  return  axios.post(API_URL + "/addExpense", { headers: authHeader(),body: body}).then((response) => {
    return response.data;
  });;
}

const postUserIncome = (body) => {
    return  axios.post(API_URL + "/addIncome", { headers: authHeader(),body: body}).then((response) => {
      return response.data;
    });;
  }

const deleteUserIncome = (TransactionID) => {
    return  axios.delete(API_URL + "/deleteIncome", { data: { headers: authHeader(),TransactionID: TransactionID}}).then((response) => {
      return response.data;
    });;
   
  }

  const deleteUserExpense = (TransactionID) => {
    return  axios.delete(API_URL + "/deleteExpense", { data: { headers: authHeader(),TransactionID: TransactionID}}).then((response) => {
      return response.data;
    });;
   
  }


const transactionService = {
    postUserExpense,
    postUserIncome,
    deleteUserIncome,
    deleteUserExpense,
};
export default transactionService;