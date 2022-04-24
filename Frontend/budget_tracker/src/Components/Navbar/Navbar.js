import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import AuthService from '../../services/auth.service';

function Navbar(props) {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };

  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState("");
  //checks local storage and gets information about the user 
  //if no Token shows Signin and sign up button
  useEffect(() => {
      var data = AuthService.getCurrentUser()
      if(data){
        setContent(data.user.userName);
        setAccessToken(data.accessToken);
      }
      else{
        setContent("");
        setAccessToken(undefined);
      } 
    }, []);

  const handleLogout = async (e) => {
		AuthService.logout();
    redirectRoute("/")
    window.location.reload();
  }
	
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid co">
      <Link class="navbar-brand" to="/">
        <a className="navbar-brand" >
          <img
            src="https://raw.githubusercontent.com/dpmanek/CS_546_C_Project/Amisha/Frontend/budget_tracker/public/logo.png"
            alt="BET Logo"
            width="30"
            height="25"
          />
          BET    
        </a>
        </Link>
        
        <form className="d-flex">
          {accessToken !== undefined ? (
            <React.Fragment>
              <a href="#" id="justtext"><i class="fa fa-fw fa-user"></i>Welcome {content} !</a>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={() => redirectRoute("/dashboard")}   //Redirects to DashBoard
              >
                Dashboard
              </button>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={handleLogout}    //Handle logout event
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
