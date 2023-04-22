import React from 'react';
//import { useNavigate } from 'react-router-dom';
import './Banner.css';

const Banner = (props) => {
	// let navigate = useNavigate();
	// const redirectRoute = (path) => {
	// 	navigate(path);
	// };
	if (props.type) {
		return (
			<div className="div-class">
				<div className="row col-md-12 page">
					<div className="col-md-6">
						<img src={props.url} alt=" " className="img" />
					</div>
					<div className="col-md-6" id="center">
						<p className="f1">{props.title}</p>
						<p className="card-text">{props.description}</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="div-class">
				<div className="row col-md-12 page">
					<div className="col-md-6" id="center">
						<p className="f1">{props.title}</p>
						<p className="card-text">{props.description}</p>
					</div>
					<div className="col-md-6">
						<img src={props.url} alt=" " className="img" />
					</div>
				</div>
			</div>
		);
	}
};

export default Banner;
