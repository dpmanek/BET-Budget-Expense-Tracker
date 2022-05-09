import React, { useState, useEffect } from 'react';

import Manager from './Manager';
// import Pie from '../Graphs/piechart';
import ExpenseTable from './ExpenseTable';
import AuthService from '../../services/auth.service';
import './Dashboard.css';

const Dashboard = () => {
	//  const [content, setContent] = useState("");
	const [accessToken, setAccessToken] = useState('');
	const [reloader, updateReloader] = useState(1);
	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			// setContent(data.user.userName);
			setAccessToken(data.accessToken);
		} else {
			// setContent("");
			setAccessToken(undefined);
		}
	}, []);

	const updatePieState = () => {
		updateReloader(reloader + 1);
		console.log('update reloader function', reloader);
	};

	useEffect(() => {
		console.log('in reloader useEffect');
	}, [reloader]);

	return (
		<div>
			{accessToken !== undefined ? (
				<React.Fragment>
					<Manager reloader={reloader} />
					<ExpenseTable updatePieState={updatePieState} />
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="card posD">
						<h1>Restricted area</h1>
						<h2>
							<a href="/login" className="a12">
								Sign In
							</a>{' '}
							to Access DashBoard
						</h2>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Dashboard;
