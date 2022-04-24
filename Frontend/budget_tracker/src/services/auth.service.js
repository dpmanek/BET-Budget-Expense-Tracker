import axios from "axios";
const API_URL = "http://localhost:8080/users";

//axios call to server

//signup post to server
const signup = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "/newuser", {
    firstName,
    lastName,
    email,
    password,
  });
};

//login post to server
const login = (email, password) => {
  return axios
    .post(API_URL + "/auth", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

// logout removes token from localstorage
const logout = () => {
  localStorage.removeItem("user");
};

// gets current user data from local storage
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;