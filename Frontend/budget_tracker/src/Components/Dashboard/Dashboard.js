
import React, { Component,useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Manager from "./Manager";
import Pie from "../Graphs/piechart";
import ExpenseTable from "./ExpenseTable";
import AuthService from '../../services/auth.service';


const Dashboard = () => {
//  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var data = AuthService.getCurrentUser()
    if(data){
     // setContent(data.user.userName);
      setAccessToken(data.accessToken);
    }
    else{
     // setContent("");
      setAccessToken(undefined);
    } 
  }, []);
  
  return (
    <div>
      {accessToken !== undefined ? (
      <React.Fragment>
              <Manager />
              <ExpenseTable />
      </React.Fragment>):(<React.Fragment>
        <h1>Restricted area</h1>
        <h2><a href="/login">Sign In</a> to Access DashBoard</h2>
        
      </React.Fragment>)}
      
     
    </div>
  );
};

export default Dashboard;
