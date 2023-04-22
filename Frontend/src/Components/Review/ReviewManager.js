import React, { useState, useEffect } from "react";
// import Navbar from "../Navbar/Navbar";
import Review from "./Review";
import Feedback from "./Feedback";
// import Footer from "../Footer/Footer";
import AuthService from "../../services/auth.service";
import './Review.css'

const ReviewManager = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    var data = AuthService.getCurrentUser();
    if (data) {
      // setContent(data.user.userName);
      setAccessToken(data.accessToken);
    } else {
      // setContent("");
      setAccessToken(undefined);
    }
  }, []);
  return (
    <div>
      {accessToken !== undefined ? (
        <React.Fragment>
          <div className="row col-md-12">
            <div className="row col-md-12">
              <Review />{" "}
            </div>
            {/* <div className="row col-md-6"><Review /> </div> */}
            {/* <div className="row col-md-6"><Feedback /> </div> */}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div
            className="card p-3 mt-2 rm1"
          >
            <h1>
              Want to add a review ? <a href="/login" className="a12">Sign In</a>
            </h1>
          </div>
          <Feedback />
        </React.Fragment>
      )}
    </div>
  );
};

export default ReviewManager;
