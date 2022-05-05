import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";



const postUserExpense = (body) => {
  return  axios.post(API_URL + "/addExpense", { headers: authHeader(),rating: body.rating, feedback: body.feedback}).then((response) => {
    return response.data;
  });;
}


const postUserIncome = (body) => {
    return  axios.post(API_URL + "/addExpense", { headers: authHeader(),rating: body.rating, feedback: body.feedback}).then((response) => {
      return response.data;
    });;
  }



const transactionService = {
    postUserExpense,
    postUserIncome,
};
export default transactionService;