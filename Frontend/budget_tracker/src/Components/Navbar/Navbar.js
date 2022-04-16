import React, {useState,useEffect} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../components/Navbar.css';

function Navbar(){
    let navigate = useNavigate();
    const redirectRoute = (path) => {
        navigate(path)
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24"/>
            BET
        </a>
        {/* <a className="navbar-brand">BET</a> */}
        <form className="d-flex">
            <button className="btn btn-outline-success" type="button" onClick={() => redirectRoute("/about")}>About</button>
            <button className="btn btn-outline-success" type="button" onClick={() => redirectRoute("/signup")}>Sign Up</button>
            <button className="btn btn-outline-success" type="button" onClick={() => redirectRoute("/signin")}>Sign In</button>
        </form>
  </div>
</nav>
    )
}

export default Navbar;