import React from "react";
import "../Content/Content.css";
import { Link, useNavigate } from "react-router-dom";

const Content = (props) => {
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };
  return (
    <div>
      <section className="flex-banner">
        <figure>
          <div className="image">
            <input
              className="image-div"
              type="image"
              id="image"
              src="/capture.png"
            />
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

export default Content;
