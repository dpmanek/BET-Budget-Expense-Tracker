import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/users/data";


//can use this incase need to get public data from server eg reviews
const getPublicContent = () => {
  return axios.get(API_URL + "all"); // should use different apiurl as this one has midleware to check if user is authorised or no
};

//using this function for specific user content eg income and expenses header will include the current accessToken
const getUserData = () => {
  return axios.get(API_URL + "/", { headers: authHeader() });
};



const UserService = {
  getPublicContent,
  getUserData,
};
export default UserService;