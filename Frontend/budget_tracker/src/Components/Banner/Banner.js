import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Banner.css";

const Banner = (props) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };
  return (
    <div className="div-class">
      <section className="flex-banner">
        <figure>
          <div className="image">
            <img className="image-div" src="/capture.png" />
          </div>
        </figure>
        <figcaption>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={() => redirectRoute("/signup")}
          >
            Sign up for more
          </button>
        </figcaption>
      </section>
    </div>
  );
};

export default Banner;
