import React from 'react';
import './Intro.css';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};
	return (
		<div className="intro-div">
			<div className="landing-body">
				<div className="landing-text-info-area">
					<p className="landing-text__title">Expense tracking</p>
					<p className="landing-text__title">made easy</p>
					<p className="landing-text__paragraph">
						Stay on top of your spending with Expense Tracker. An online
						tracking tool to help you better understand your habits and make
						measurable change.{' '}
					</p>
					<button
						className="btn btn-primary"
						onClick={() => redirectRoute('/signup')}
					>
						Get Started
					</button>
				</div>
				<div>
					<img className="pig" src="./pigIllustration.png" alt=" " />
				</div>
			</div>
		</div>
	);
};

export default Intro;
