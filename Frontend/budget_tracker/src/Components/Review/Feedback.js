import React, { useState, useEffect } from "react";
import "./Feedback.css";
import reviewService from "../../services/review.service";

const Feedback = () => {
  const [feedback, setfeedback] = useState([]);

  useEffect(() => {
    reviewService.getAllReview().then((response) => {
      if (response) {
        setfeedback(response.data);
      } else {
        setfeedback("");
      }
    });
  }, []);  

 
 
  return (
    <div className="feedback-div">
      <div>
        <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
          <h1 className="font-cond-b fg-text-d lts-md" contenteditable="false">
            Customer Reviews
          </h1>
        </div>
        <div>
        <div>
      <table className="table table-border">
        <thead>
          <th>Name</th>
          <th>Rating</th>
          <th>FeedBack</th>
        </thead>
        <tbody>
          {feedback.map((d) => {
            return (
              <tr>
                <td>{d.name}</td>
                <td>{d.Review.Rating}</td>
                <td>{d.Review.Feedback}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;