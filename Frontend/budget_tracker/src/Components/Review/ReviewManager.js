import React from "react";
import Navbar from "../Navbar/Navbar";
import Review from "./Review";
import Feedback from "./Feedback";
import Footer from "../Footer/Footer";

const ReviewManager = () => {
  return (
    <div>
      <Navbar />
      <Review />
      <Feedback />
      {/* <Footer /> */}
    </div>
  );
};

export default ReviewManager;
