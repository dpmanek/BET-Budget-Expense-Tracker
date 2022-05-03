import React from "react";
import "./Feedback.css";

const Feedback = () => {
  return (
    <div className="feedback-div">
      <div className="container">
        <div className="mgb-40 padb-30 auto-invert line-b-4 align-center">
          <h1
            className="font-cond-b fg-text-d lts-md fs-300 fs-300-xs no-mg"
            contenteditable="false"
          >
            Customer Reviews
          </h1>
        </div>
        <ul className="hash-list cols-2 cols-1-xs pad-30-all align-center text-sm">
          <li>
            <img
              src="/mark_zuk.png"
              className="wpx-100 img-round mgb-20"
              title=""
              alt=""
              data-edit="false"
              data-editor="field"
              data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
            />
            <p className="fs-110 font-cond-l" contenteditable="false">
              Works great!! Also, good work with react ;)
            </p>
            <h5
              className="font-cond mgb-5 fg-text-d fs-130"
              contenteditable="false"
            >
              Mark Zuckerburg
            </h5>
            <small
              className="font-cond case-u lts-sm fs-80 fg-text-l"
              contenteditable="false"
            >
              Harward Dropout
            </small>
          </li>
          <li>
            <img
              src="/jeff_bez.png"
              className="wpx-100 img-round mgb-20"
              title=""
              alt=""
              data-edit="false"
              data-editor="field"
              data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
            />
            <p className="fs-110 font-cond-l" contenteditable="false">
              Amazing App!! Saved like a billion dollars.
            </p>
            <h5
              className="font-cond mgb-5 fg-text-d fs-130"
              contenteditable="false"
            >
              Jeff Bezos
            </h5>
            <small
              className="font-cond case-u lts-sm fs-80 fg-text-l"
              contenteditable="false"
            >
              Ex Richest Person
            </small>
          </li>
          <li className="last-box">
            <img
              src="/elon_musk.png"
              className="wpx-100 img-round mgb-20"
              title=""
              alt=""
              data-edit="false"
              data-editor="field"
              data-field="src[Image Path]; title[Image Title]; alt[Image Alternate Text]"
            />
            <p className="fs-110 font-cond-l" contenteditable="false">
              App so good, I decided to buy it!!
            </p>
            <h5
              className="font-cond mgb-5 fg-text-d fs-130"
              contenteditable="false"
            >
              Elon Musk
            </h5>
            <small
              className="font-cond case-u lts-sm fs-80 fg-text-l"
              contenteditable="false"
            >
              Mars resident
            </small>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Feedback;
