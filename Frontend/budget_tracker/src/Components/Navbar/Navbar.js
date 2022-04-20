import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";

function Navbar() {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="https://raw.githubusercontent.com/dpmanek/images/main/BET%20Logo.PNG"
            alt="BET Logo"
            width="30"
            height="24"
          />
          BET
        </a>
        <a className="navbar-brand">BET</a>
        <form className="d-flex">
          {localStorage.getItem("isAuthenticated") != null ? (
            <React.Fragment>
              <button
                className="btn btn-outline-success navbar-success"
                type="button"
                onClick={() => {
                  localStorage.clear();
                  redirectRoute("/skeleton");
                }}
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
