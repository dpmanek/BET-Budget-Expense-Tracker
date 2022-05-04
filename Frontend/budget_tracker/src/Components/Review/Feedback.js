import React, { useState, useEffect } from "react";
import "./Feedback.css";
import reviewService from "../../services/review.service";

const Feedback = () => {
  const [feedback, setfeedback] = useState("");
  
  useEffect(() => {
<<<<<<< HEAD
    reviewService.getUserReview().then((response) => {
      if (response) {
=======
    reviewService.getAllReview().then((response) => {
      if(response){
>>>>>>> 22e0809c456d159ee5af159802a3f386c9282321
        setfeedback(response.data.Review.feedback);
      } else {
        setfeedback("");
      }
<<<<<<< HEAD
    });
  }, []);
=======
      else{
        setfeedback("");
      } })
    }, []);
    
    
>>>>>>> 22e0809c456d159ee5af159802a3f386c9282321

  return (
    <div className="feedback-div">
      <div >
        <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
          
          <h1
<<<<<<< HEAD
            className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg"
            contenteditable="false"
          >
=======
            className="font-cond-b fg-text-d lts-md"
            contenteditable="false">
>>>>>>> 22e0809c456d159ee5af159802a3f386c9282321
            Customer Reviews
          </h1>
        </div>
        <div>
          <p>
          Feedback: {feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
