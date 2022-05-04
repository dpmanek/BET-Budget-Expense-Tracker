import React, {useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
import Review from "./Review";
import Feedback from "./Feedback";
// import Footer from "../Footer/Footer";
import AuthService from '../../services/auth.service';

const ReviewManager = () => {
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
       <div className="row col-md-12" >
       <div className="row col-md-6"><Review /> </div>
       <div className="row col-md-6"><Feedback /> </div>
       </div>
            
     </React.Fragment>):(<React.Fragment>
       <h1>Want to add a Review ? <a href="/login">Sign In</a></h1>
       <Feedback />
     </React.Fragment>)}
   </div>
  );
};

export default ReviewManager;
