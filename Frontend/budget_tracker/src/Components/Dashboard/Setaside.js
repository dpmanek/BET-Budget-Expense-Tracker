import React, { useState, useEffect } from 'react';

import './Setaside.css';

import AuthService from '../../services/auth.service';
import transactionService from '../../services/add.transaction';
import Settable from './Settable';

const Setaside = () => {
	//validation
	const initialValues = {
		_id: null,
		goal: '',
		amount: '',
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [reload, setReload] = useState(false);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	//

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState('');
	const [formErrors, setFormErrors] = useState({});

	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			setAccessToken(data.accessToken);
		} else {
			setAccessToken(undefined);
		}
	}, []);

	const validate = (values) => {
		const alpha = /^[0-9]+$/;

		let errors = {};
		if (!values.amount) {
			errors.amount = 'Amount is required';
		}
		if (!values.goal) {
			errors.goal = 'Goal is required';
		}

		const flag = alpha.test(values.goal);
		if (flag === true) {
			errors.goal = 'Goal cannot be just Numerical!';
		}
		return errors;
	};

	const addGoal = async (event) => {
		setError('');
		setSuccess('');
		event.preventDefault();
		let error = await validate(formValues);
		await setFormErrors(error);
		if (Object.keys(error).length === 0) {
			transactionService
				.createSetAside(formValues)
				.then((data) => {
					setSuccess('Goal added successfully!!');
					setReload(true);
					//   navigate("/dashboard");
				})
				.catch((e) => {
					setError('Opps, something went wrong :(');
				});
		}
	};

	return (
		<div className="footer-solve">
			{accessToken !== undefined ? (
				<React.Fragment>
					<div className="row col-md-8 offset-md-4">
						<h1 className="">Set a Goal</h1>
						<form className="" onSubmit={addGoal}>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Goal
								</label>
								<input
									id="exampleInputEmail1"
									type="text"
									name="goal"
									placeholder="Goal"
									className="form-control position"
									value={formValues.goal}
									onChange={handleChange}
								/>
							</div>
							<p className="disError">{formErrors ? formErrors.goal : ''}</p>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Amount
								</label>
								<input
									id="exampleInputEmail1"
									type="number"
									placeholder="Amount"
									className="form-control position"
									name="amount"
									value={formValues.amount}
									onChange={handleChange}
								/>
							</div>
							<p className="disError">{formErrors ? formErrors.amount : ''}</p>
							<button type="submit" className="btn btn-primary" value="Submit">
								Submit
							</button>
							<div className="disError">{error !== '' ? error : success}</div>
						</form>
					</div>
					<Settable reload={reload} />
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="card posR posF">
						<h1>Restricted area</h1>
						<h2>
							<a href="/login" className="a12">
								Sign In
							</a>{' '}
							to Set Goals
						</h2>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Setaside;
