import React, { useState, Fragment } from "react";
import "./Review.css";
import axios from "axios";
import reviewService from "../../services/review.service";

const Review = () => {
  const [error, setErorr] = useState("");
  const [success, setSuccess] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  
  
  const addFeedback = (event) => {
    setErorr("");
    setSuccess("");
    event.preventDefault();
    console.log(feedback, rating);

    let body = {
      feedback,
      rating,
    };
    reviewService.postUserReview(body)
      .then((res) => {
        setSuccess("Review added successfully !");
      })
      .catch((e) => {
        setErorr(`Opps, something went wrong :${e}`);
      });
  };

  const changeRating = (event) => {
    event.preventDefault();
    setRating(event.target.value);
  };
  return (
    <div>
      <form className="place1" onSubmit={addFeedback}>
        <h3 className="pl">Like our app? Leave a feedback</h3>
        <fieldset className="rating" onChange={changeRating}>
          <input type="radio" id="star5" name="rating" value="5" />
          <label className="full" for="star5" title="Awesome - 5 stars"></label>
          <input type="radio" id="star4half" name="rating" value="4.5" />
          <label
            className="half"
            for="star4half"
            title="Pretty good - 4.5 stars"
          ></label>
          <input type="radio" id="star4" name="rating" value="4" />
          <label
            className="full"
            for="star4"
            title="Pretty good - 4 stars"
          ></label>
          <input type="radio" id="star3half" name="rating" value="3.5" />
          <label
            className="half"
            for="star3half"
            title="Meh - 3.5 stars"
          ></label>
          <input type="radio" id="star3" name="rating" value="3" />
          <label className="full" for="star3" title="Meh - 3 stars"></label>
          <input type="radio" id="star2half" name="rating" value="2.5" />
          <label
            className="half"
            for="star2half"
            title="Kinda bad - 2.5 stars"
          ></label>
          <input type="radio" id="star2" name="rating" value="2" />
          <label
            className="full"
            for="star2"
            title="Kinda bad - 2 stars"
          ></label>
          <input type="radio" id="star1half" name="rating" value="1.5" />
          <label
            className="half"
            for="star1half"
            title="Meh - 1.5 stars"
          ></label>
          <input type="radio" id="star1" name="rating" value="1" />
          <label
            className="full"
            for="star1"
            title="Sucks big time - 1 star"
          ></label>
          <input type="radio" id="starhalf" name="rating" value="0.5" />
          <label
            className="half"

            for="starhalf"
            title="Sucks big time - 0.5 stars"
          ></label>
        </fieldset>
        <div className="mb-3">
          <input
            id="msg"
            type="text"
            className="form-control-position validate[required,length[6,300]] feedback-input"
            name="msg"
            placeholder="Feedback"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" value="Submit">
          Submit
        </button>
        <div>{error != "" ? error : success}</div>
      </form>
    </div>
  );
};

export default Review;
