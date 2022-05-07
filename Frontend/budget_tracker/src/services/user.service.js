import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";

//can use this incase need to get public data from server eg reviews
const getPublicContent = () => {
  return axios.get(Public_URL + "Add Route"); // should use different apiurl as this one has midleware to check if user is authorised or no
};

//using this function for specific user content eg income and expenses header will include the current accessToken
// Call this function with true or False   true will return all transaction only of the current month false = return all transactions regardless of months
const getUserTransactionData = (thisMonethOnly) => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let startDate = new Date(y, m, 1).toISOString();
  let endDate = new Date(y, m + 1, 0).toISOString();
  return axios
    .get(API_URL + "/alltransactions", {
      headers: authHeader(),
      params: thisMonethOnly ? { startDate, endDate } : {},
    })
    .then((response) => {
      return response.data;
    });
};

//using as an example
//to get user information from server
const getUserDOB = () => {
  return axios
    .get(API_URL + "/dob", { headers: authHeader() })
    .then((response) => {
      return response.data;
    }); //  "/dob" is a route of the server
};

const getPieChartData = () => {
  return axios
    .get(API_URL + "/getPieChartData", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const UserService = {
  getPublicContent,
  getUserTransactionData,
  getUserDOB,
  getPieChartData,
};

export default UserService;
