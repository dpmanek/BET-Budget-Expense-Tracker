import React from "react";
import "../Content/Content.css";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../Banner/Banner";

const Content = (props) => {
  let loop = [
    {
      title: "Always know what's in your pocket",
      description:
        "We crunch the numbers to show how much spendable money you have after setting aside enough for bills, goals, and necessities.",
        // url: !url?"/public/static/no_image.jpeg":url
    },
    {
      title: "Keep tabs on your spending",
      description:
        "See which expenses eat up too much of the pie. Personalize your reports with custom categories and descriptions.",
    },
    {
      title: "See all accounts in one place",
      description:
        "Get a centralized view of all your accounts in one place, without linking your actual bank accounts.",
    },
    {
      title: "Financial statement",
      description:
        "Get a customized statement that would list all the expenses and income from that period.",
    },
    {
      title: "Monthly expense comparison",
      description:
        "Get a category-wise monthly comparison to get a track of your spending and save accordingly for the future.",
    },
  ];
  let navigate = useNavigate();
  const redirectRoute = (path) => {
    navigate(path);
  };
  return (
    <React.Fragment>
      {loop.map((i) => {
        return <Banner title={i.title} description={i.description} />;
      })}
    </React.Fragment>
  );
};

export default Content;
