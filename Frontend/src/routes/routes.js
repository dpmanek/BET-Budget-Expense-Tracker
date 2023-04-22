import React from 'react';
import { Routes as Switch, Route as Routing } from 'react-router-dom';
import Createexpense from '../Components/Dashboard/Createexpense';
import Createincome from '../Components/Dashboard/Createincome';
import Dashboard from '../Components/Dashboard/Dashboard';
// import Home from "../Components/Home/Home";
import Content from '../Components/Content/Content';
import Login from '../Components/login/login';
import Signup from '../Components/Signup';

import Layout from '../Components/layout/layout';
// import Review from "../Components/Review/Review";
import ReviewManager from '../Components/Review/ReviewManager';
import AboutUs from '../Components/AboutUs/AboutUs';
import Report from '../Components/Dashboard/Report';
import Errors from '../Components/Errors';
import BarChart from '../Components/Graphs/barChart';
import Ticket from '../Components/Ticket/Ticket';
import Setaside from '../Components/Dashboard/Setaside';

const Routesr = () => {
	return (
		<>
			<Layout>
				<Switch>
					{/* Auth Routes */}
					<Routing exact path="/" element={<Content />} />
					<Routing exact path="/login" element={<Login />} />
					<Routing exact path="/signup" element={<Signup />} />

					{/* Private: Only logged in user can access */}
					<Routing exact path="/dashboard" element={<Dashboard />} />
					<Routing exact path="/addexpense" element={<Createexpense />} />
					<Routing exact path="/addincome" element={<Createincome />} />
					<Routing exact path="/report" element={<Report />} />
					<Routing exact path="/monthlyComparision" element={<BarChart />} />
					<Routing exact path="/generateticket" element={<Ticket />} />
					<Routing exact path="/setaside" element={<Setaside />} />

					{/* Public: All can use */}
					<Routing exact path="/review" element={<ReviewManager />} />
					<Routing exact path="/about-us" element={<AboutUs />} />
					<Routing exact path="*" element={<Errors />} />
				</Switch>
			</Layout>
		</>
	);
};
export default Routesr;
