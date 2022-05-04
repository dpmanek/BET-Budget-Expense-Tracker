import React, { useState, useEffect } from "react";
import "./Feedback.css";
import reviewService from "../../services/review.service";

const Feedback = () => {
  const [feedback, setfeedback] = useState("");
  
  useEffect(() => {
    reviewService.getAllReview().then((response) => {
      if(response){
        setfeedback(response.data.Review.feedback);
      }
      else{
        setfeedback("");
      } })
    }, []);
    
    

  return (
    <div className="feedback-div">
      <div className="container">
        <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
          <h1
            className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg"
            contenteditable="false">
            Customer Reviews
          </h1>
        </div>
        <div>
          <p>{feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
