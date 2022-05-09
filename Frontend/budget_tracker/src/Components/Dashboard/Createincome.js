import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Createpage.css';

import AuthService from '../../services/auth.service';
import './backbutton.css';
import transactionService from '../../services/add.transaction';

const Createincome = () => {
	let navigate = useNavigate();

	//validation
	const initialValues = {
		_id: null,
		name: '',
		description: '',
		amount: '',
		category: '',
		date: '',
		recurringType: '',
	};
	const [formValues, setFormValues] = useState(initialValues);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};
	//

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState('');
	const [formErrors, setFormErrors] = useState({});
	const [edit, setEdit] = useState(false);

	const [accessToken, setAccessToken] = useState('');

	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			setAccessToken(data.accessToken);
		} else {
			setAccessToken(undefined);
		}

		const incomeId = new URL(window.location.href).searchParams.get('q');
		if (incomeId) {
			setEdit(true);
			transactionService.getUserIncome(incomeId).then((income) => {
				const newInitialValues = {
					_id: income._id,
					name: income.Name,
					description: income.Description,
					amount: income.Amount,
					category: income.Tags,
					date: income.TranactionDate.replace(/(..).(..).(....)/, '$3-$1-$2'),
					recurringType: income.recurringType,
				};
				console.log('income', income);
				console.log('newInitialValues', newInitialValues);
				setFormValues(newInitialValues);
			});
		}
	}, []);

	const validate = (values) => {
		const alpha = /^[0-9]+$/;
		let errors = {};
		if (!values.amount) {
			errors.amount = 'Amount is required';
		}
		if (!values.date) {
			errors.date = 'Date is required';
		}
		if (!values.name) {
			errors.name = 'Name is required';
		}
		const flag = alpha.test(values.name);
		if (flag === true) {
			errors.name = 'Name cannot be just Numerical!';
		}
		if (!values.category) {
			errors.category = 'Category is required';
		}
		return errors;
	};

	const addIncome = async (event) => {
		setError('');
		setSuccess('');
		event.preventDefault();
		let error = await validate(formValues);
		await setFormErrors(error);
		if (Object.keys(error).length === 0) {
			if (edit) {
				let id = formValues._id;
				await transactionService
					.deleteUserIncome(id)
					.then((d) => {
						setError('');
					})
					.catch((e) => {
						setError('Opps, something went wrong :(');
					});
			}
			await transactionService
				.postUserIncome(formValues)
				.then((data) => {
					// console.log(data, "====================");
					setSuccess('Income added successfully!!');
					navigate('/dashboard');
				})
				.catch((e) => {
					setError('Opps, something went wrong :(');
				});
		}
	};

	return (
		<div>
			{accessToken !== undefined ? (
				<React.Fragment>
					<div className="row col-md-8 offset-md-4">
						<h1 className="">Add Income</h1>
						<form className="" onSubmit={addIncome}>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Name
								</label>
								<input
									id="exampleInputEmail1"
									type="text"
									name="name"
									placeholder="Name"
									className="form-control position"
									value={formValues.name}
									onChange={handleChange}
								/>
							</div>
							<p className="disError">{formErrors ? formErrors.name : ''}</p>
							<div className="mb-3">
								<label htmlFor="exampleInputEmail1" className="form-label">
									Description
								</label>
								<input
									id="exampleInputEmail1"
									type="text"
									name="description"
									placeholder="Description (Optional)"
									className="form-control position"
									value={formValues.description}
									onChange={handleChange}
								/>
							</div>
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
							<label htmlFor="exampleInputEmail1" className="form-label">
								Category
							</label>
							<select
								className="form-select position"
								aria-label="Default select example"
								name="category"
								value={formValues.category}
								onChange={handleChange}
							>
								<option value="" disabled selected>
									Select your option
								</option>
								<option value="Checks">Checks</option>
								<option value="Coupons">Coupons</option>
								<option value="Dues">Dues</option>
								<option value="Grants">Grants</option>
								<option value="Gifts">Gifts</option>
								<option value="Interests">Interests</option>
								<option value="Dividends">Dividends</option>
								<option value="Lending">Lending</option>
								<option value="Renting">Renting</option>
								<option value="Lottery">Lottery</option>
								<option value="Refunds">Refunds</option>
								<option value="IT-Return">IT Return</option>
								<option value="Sale">Sale</option>
								<option value="Salary">Salary</option>
								<option value="Other">Other</option>
							</select>
							<div className="mb-3 position">
								<p className="disError">
									{formErrors ? formErrors.category : ''}
								</p>
								<label htmlFor="date" className="col-form-label">
									Date
								</label>
								<div className="input-group date position" id="datepicker">
									<input
										type="date"
										className="form-control"
										id="date"
										name="date"
										value={formValues.date}
										onChange={handleChange}
									/>
								</div>
							</div>
							<p className="disError">{formErrors ? formErrors.date : ''}</p>
							Is this a reccuring Income?
							<div className="form-check ">
								<input
									className="form-check-input"
									type="radio"
									id="flexRadioDefault1"
									value="yes"
									checked={formValues.recurringType === 'yes'}
									name="recurringType"
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault1">
									Yes
								</label>
							</div>
							<div className="form-check">
								<input
									className="form-check-input"
									type="radio"
									id="flexRadioDefault2"
									value="no"
									name="recurringType"
									checked={formValues.recurringType === 'no'}
									onChange={handleChange}
								/>
								<label className="form-check-label" htmlFor="flexRadioDefault2">
									No
								</label>
							</div>
							<button type="submit" className="btn btn-primary" value="Submit">
								Submit
							</button>
							<div className="disError">{error !== '' ? error : success}</div>
						</form>
					</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="card posIE">
						<h1>Restricted area</h1>
						<h2>
							<a href="/login" className="a12">
								Sign In
							</a>{' '}
							to Access Dashboard
						</h2>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Createincome;
