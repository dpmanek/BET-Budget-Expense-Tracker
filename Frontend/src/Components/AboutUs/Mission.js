import React from 'react';
import './OurTeam.css';

const Mission = () => {
	return (
		<div>
			<h1 className="pl"> Mission </h1>
			<div className="row col-md-12">
				<div className="col-md-5 img2">
					<img
						src="./cf.png"
						alt="Track your finance"
						width="400"
						height="300"
					></img>
				</div>

				<div className="col-md-7 posR1 posF1">
					<p className="pl1">
						To help the users to manage and have a record of their finances
						based on their income and expenses.
					</p>
				</div>
			</div>
		</div>
	);
};
export default Mission;
