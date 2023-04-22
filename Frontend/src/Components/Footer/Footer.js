import React from 'react';
import '../Footer/Footer.css';

import { useNavigate } from 'react-router-dom';

const Footer = () => {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};
	return (
		<div className="footer-dark">
			<footer>
				<div className="container">
					<div className="row">
						<div className="col-md-4 item">
							<p className="f1">About</p>
							<ul>
								<li>
									<a onClick={() => redirectRoute('/about-us')}>Team</a>
								</li>
							</ul>
						</div>
						<div className="col-md-8 item text">
							<p className="f2">Budget Expense Tracker (BET)</p>
							<p>
								BET, not only helps you to track your expenses but also helps
								you save money.
							</p>
						</div>
						<div className="col item social">
							<p>
								Connect over
								<a
									href="https://github.com/dpmanek/CS_546_C_Project"
									className="a1"
								>
									<p>
										Github <i className="l1 icon ion-social-github"></i>
									</p>
								</a>
							</p>
						</div>
					</div>
					<p className="c1 ">BET © 2022</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
