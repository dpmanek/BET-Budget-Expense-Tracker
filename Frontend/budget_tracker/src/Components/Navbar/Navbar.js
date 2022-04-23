import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Navbar/Navbar.css";

function Navbar(props) {

  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };


  const[loginStatus, setLoginStatus] = useState("");
  useEffect( () => { // used to check if user is logged in to be used on all pages
		axios.get("http://localhost:8080/users/auth").then((res) =>{
		if(res.data.loggedIn === true){
			setLoginStatus(res.data.loggedIn);
		//	console.log(loginStatus);
		}
    else {
      setLoginStatus(res.data.loggedIn);
      
    }
    })
	 });
	

  const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/users/logout";
      let data = {userLogout: true}
			const { data: res } = await axios.post(url, data);
			/*
      if(res.loggedout){
      localStorage.clear()
       }
      */ //decide where to store this info session cookie is 
      console.log(res.message)
			redirectRoute("/skeleton");
   
		} catch (error) { // need to add proper error handling
			/*if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}*/
    console.log("Error occured at navBar")// remove this later
  }
	};
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid co">
      <Link class="navbar-brand" to="/">
        <a className="navbar-brand" >
          <img
            src="https://raw.githubusercontent.com/dpmanek/CS_546_C_Project/Amisha/Frontend/budget_tracker/public/logo.png"
            alt="BET Logo"
            width="25"
            height="24"
          />
          BET    
        </a>
        </Link>
        <a className="navbar-brand">BET</a>
        <form className="d-flex">
          {(loginStatus) !== false ? (
            <React.Fragment>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={handleSubmit}    //Handle logout event
              >
                Logout
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={() => redirectRoute("/about")}
              >
                About
              </button>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={() => redirectRoute("/signup")}
              >
                Sign Up
              </button>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={() => redirectRoute("/login")}
              >
                Sign In
              </button>
            </React.Fragment>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
