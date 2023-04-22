import React from 'react';
import './Card.css';
import './Intro.css';
import { useNavigate } from 'react-router-dom';

const Card = () => {
	let navigate = useNavigate();
	const redirectRoute = (path) => {
		navigate(path);
	};

	return (
		<div>
			<div className="cards-container">
				<div className="landing-body">
					<div className="landing-text-info-area">
						<p className="landing-text__title">Review Us..</p>
						<p className="landing-text__paragraph">
							Your Feedback will help us Improve.
						</p>
						<button
							className="btn btn-primary"
							onClick={() => redirectRoute('/review')}
						>
							Review
						</button>
					</div>
					<div>
						<img className="pig" src="/r1.jpg" alt="Pig" />
						{/* src="https://startbootstrap.com/assets/img/freepik/wall-post-pana.svg */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
