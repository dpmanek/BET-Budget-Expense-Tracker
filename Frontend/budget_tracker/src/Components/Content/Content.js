import React from "react";
// import "../Content/Content.css";
// import { useNavigate } from "react-router-dom";
import Banner from "../Banner/Banner";
import Intro from "./Intro";
import Card from "./Card";
// import pie from "../../../public/pie.JPG"

const Content = () => {
  let loop = [
    {
      id: 0,
      title: "Always know what's in your pocket",
      description:
        "We crunch the numbers to show how much spendable money you have after setting aside enough for bills, goals, and necessities.",
      url: "SpendingAmt1.JPG",
    },
    {
      id: 1,
      title: "Keep tabs on your spending",
      description:
        "See which expenses eat up too much of the pie. Personalize your reports with custom categories and descriptions.",
      url: "pie.JPG",
    },
    {
      id: 2,
      title: "Ask Donna for help!!",
      description:
        "Say Hi to our Virtual Assistant and she can help you with all the basic queries and help you using BET!!",
      url: "/chatbot.png",
    },
    {
      id: 3,
      title: "Financial statement",
      description:
        "Get a customized statement that would list all the expenses and income from that period.",
      url: "report.JPG",
    },
    {
      id: 4,
      title: "Monthly expense comparison",
      description:
        "Get a category-wise monthly comparison to get a track of your spending and save accordingly for the future.",
      url: "MonthlyComp.JPG",
    },
    {
      id: 5,
      title: "Customer Support",
      description:
        "If you have a problem, inform us by raising a ticket. Also track your issue with your Incident ID.",
      url: "MonthlyComp.JPG",
    },
  ];
  return (
    <>
      <Intro />
      <Banner
        title={loop[0].title}
        description={loop[0].description}
        url={loop[0].url}
        type="right"
      />
      <Banner
        title={loop[1].title}
        description={loop[1].description}
        url={loop[1].url}
      />
      <Banner
        title={loop[2].title}
        description={loop[2].description}
        url={loop[2].url}
        type="right"
      />
      <Banner
        title={loop[3].title}
        description={loop[3].description}
        url={loop[3].url}
      />
      <Banner
        title={loop[4].title}
        description={loop[4].description}
        url={loop[4].url}
        type="right"
      />
      <Card />
    </>
  );
};

export default Content;
