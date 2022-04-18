import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Manager from "./Manager";
import Pie from "../Graphs/piechart";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Manager />
      <Footer />
    </div>
  );
};

export default Dashboard;
