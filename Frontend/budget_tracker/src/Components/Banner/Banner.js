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
      {/* <section className="flex-banner">
        <figure>
          <div className="image">
            <img className="image-div" src="/capture.png" />
          </div>
        </figure>
        <figcaption className="text">
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
      </section> */}
      <div className="row col-md-12 page">
        <div className="col-md-6">
          <img src="/capture.png" className="card-img-top" />
        </div>

        <div className="col-md-6" id="center">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          {/* <a href="#" className="btn btn-primary">
            Go somewhere
          </a> */}
        </div>
        
      </div>

      <div className="div-class">
      <div className="row col-md-12 page">
        

        <div className="col-md-6" id="center">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        
        <div className="col-md-6">
          <img src="/capture.png" className="card-img-top" />
        </div>
      </div>
    </div>

    </div>
    
  );
};

export default Banner;
