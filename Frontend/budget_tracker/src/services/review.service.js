import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";



//to get user information from server
const postUserReview = (body) => {
  return  axios.post(API_URL + "/review", { headers: authHeader(),rating: body.rating, feedback: body.feedback})
  //  "/review" is a route of the server 
}


const getUserReview = () => {
    return  axios.get(API_URL + "/dob", { headers: authHeader()}).then((response) => {
      return response.data;
    });; //  "/review" is a route of the server 
  }

const reviewService = {
  getUserReview,
  postUserReview
};
export default reviewService;