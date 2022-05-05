import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/user/data";
const Public_URL = "http://localhost:8080/public";


//to get user information from server
const postUserReview = (body) => {
  return  axios.post(API_URL + "/review", { headers: authHeader(),rating: body.rating, feedback: body.feedback}).then((response) => {
    return response.data;
  });;
  //  "/review" is a route of the server 
}


const getUserReview = () => {
    return  axios.get(API_URL + "/review", { headers: authHeader()}).then((response) => {
      return response.data;
    });; //  "/review" is a route of the server 
  }

  const getAllReview = () => {
    return axios.get(Public_URL + "/allReviews").then((response) => {
      return response.data;
    });
  };

const reviewService = {
  getUserReview,
  postUserReview,
  getAllReview,
};
export default reviewService;