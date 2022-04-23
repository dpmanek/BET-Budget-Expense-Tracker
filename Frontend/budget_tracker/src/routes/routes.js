import { Routes as Switch, Route as Routing } from "react-router-dom";
import Createexpense from "../Components/Dashboard/Createexpense";
import Createincome from "../Components/Dashboard/Createincome";
import Dashboard from "../Components/Dashboard/Dashboard";
// import Home from "../Components/Home/Home";
import Content from "../Components/Content/Content";
import Login from "../Components/login/login";
import Signup from "../Components/Signup";

import Layout from '../Components/layout/layout'
// import Review from "../Components/Review/Review";
import ReviewManager from "../Components/Review/ReviewManager";

const Routesr = () => {
  return (
    <>
    <Layout>
      <Switch>
        {/* <Routing exact path="/" element={<Home />} /> */}
        <Routing exact path="/" element={<Content />} />
        <Routing exact path="/login" element={<Login />} />
        <Routing exact path="/signup" element={<Signup />} />
      
        <Routing exact path="/dashboard" element={<Dashboard />} />
        <Routing exact path="/addexpense" element={<Createexpense />} />
        <Routing exact path="/addincome" element={<Createincome />} />
        <Routing exact path="/review" element={<ReviewManager />} />
      </Switch>
      </Layout>
    </>
  );
};
export default Routesr;
