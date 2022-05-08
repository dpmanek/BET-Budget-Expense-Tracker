import React, { useState, useEffect } from 'react';
// import { Link,useNavigate} from "react-router-dom";
//import axios from "axios";
//import mockData from "./mockData.json";
import orderBy from 'lodash/orderBy';
import UserService from '../../services/user.service';
import transactionService from '../../services/add.transaction';
import { useNavigate } from 'react-router-dom';

const ExpenseTable = ({ updatePieState }) => {
	let navigate = useNavigate();
	const [data, setdata] = useState([]);
	const [oneTime, setOneTime] = useState([]);
	const [incomeData, setIncomedata] = useState([]);
	const [incomeOneTime, setIncomeOneTime] = useState([]);
	const [toggleTable, setToggleTable] = useState('OneTime');
	const [toggleIncomeTable, setIncomeToggleTable] = useState('OneTime');

	useEffect(() => {
		UserService.getUserTransactionData().then((response) => {
			if (response.data) {
				setdata(
					orderBy(response.data.Expenditure.OneTime, ['_id'], ['desc']).slice(
						0,
						5
					)
				);
				setOneTime(
					orderBy(response.data.Expenditure.Recurring, ['_id'], ['desc']).slice(
						0,
						5
					)
				);
				setIncomeOneTime(
					orderBy(response.data.Income.OneTime, ['_id'], ['desc']).slice(0, 5)
				);
				setIncomedata(
					orderBy(response.data.Income.Recurring, ['_id'], ['desc']).slice(0, 5)
				);
			}
		});
	}, []);

	const handleEdit = (event) => {
		event.preventDefault();
		let val = event.target.value;
		navigate('/addexpense?q=' + val);
	};

	const handleEditIncome = (event) => {
		event.preventDefault();
		let val = event.target.value;
		navigate('/addincome?q=' + val);
	};

	const handleDelete = (event) => {
		event.preventDefault();
		let id = event.target.value;

		transactionService
			.deleteUserExpense(id)
			.then((d) => {
				let tmpData = data.filter((d) => d._id !== id);
				let one = oneTime.filter((d) => d._id !== id);
				setOneTime(one);
				setdata(tmpData);
			})
			.then(() => {
				console.log('deleted expense');
				updatePieState();
			})
			.catch((e) => {
				console.log('Error');
			});
	};

	const handleDeleteIncome = (event) => {
		event.preventDefault();
		let id = event.target.value;

		transactionService
			.deleteUserIncome(id)
			.then((d) => {
				let tmpDataIncome = incomeData.filter((d) => d._id !== id);
				let oneIncome = incomeOneTime.filter((d) => d._id !== id);
				setIncomeOneTime(oneIncome);
				setIncomedata(tmpDataIncome);
			})
			.catch((e) => {
				console.log('Error');
			});
	};

	const changeExpense = (event) => {
		event.preventDefault();
		setToggleTable(event.target.value);
	};

	const changeIncome = (event) => {
		event.preventDefault();
		setIncomeToggleTable(event.target.value);
	};

	return (
		<div className="table-top">
			<p className="h4">Expense Table</p>
			<div className="table-margin">
				<select
					className="form-select position"
					aria-label="Default select example"
					name="expenseType"
					onChange={changeExpense}
				>
					<option value="OneTime">One Time</option>
					<option value="Recurring">Recurring</option>
				</select>
			</div>
			{toggleTable !== 'OneTime' ? (
				<React.Fragment>
					<table className="table table-border">
						<thead>
							<tr>
								<th>Expense Name</th>
								<th>Amount</th>
								<th>Date</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{oneTime.map((d) => {
								return (
									<tr>
										<td>{d.Name}</td>
										<td>${d.Amount}</td>
										<td>{d.TranactionDate}</td>
										<td>
											<button
												className="btn btn-info"
												value={d._id}
												onClick={handleEdit}
											>
												Edit
											</button>
										</td>
										<td>
											<button
												className="btn btn-danger"
												value={d._id}
												onClick={handleDelete}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</React.Fragment>
			) : (
				<React.Fragment>
					<table className="table table-border">
						<thead>
							<tr>
								<th>Expense Name</th>
								<th>Amount</th>
								<th>Date</th>
								<th>Edit</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => {
								return (
									<tr>
										<td>{d.Name}</td>
										<td>${d.Amount}</td>
										<td>{d.TranactionDate}</td>
										<td>
											<button
												className="btn btn-info"
												value={d._id}
												onClick={handleEdit}
											>
												Edit
											</button>
										</td>
										<td>
											<button
												className="btn btn-danger"
												value={d._id}
												onClick={handleDelete}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</React.Fragment>
			)}
			<div className="table-top">
				<p className="h4">Income Table</p>
				<div className="table-margin">
					<select
						className="form-select position"
						aria-label="Default select example"
						name="expenseType"
						onChange={changeIncome}
					>
						<option value="OneTime">One Time</option>
						<option value="Recurring">Recurring</option>
					</select>
				</div>
				{toggleIncomeTable !== 'Recurring' ? (
					<React.Fragment>
						<table className="table table-border">
							<thead>
								<tr>
									<th>Income Name</th>
									<th>Amount</th>
									<th>Date</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{incomeOneTime.map((d) => {
									return (
										<tr>
											<td>{d.Name}</td>
											<td>${d.Amount}</td>
											<td>{d.TranactionDate}</td>
											<td>
												<button
													className="btn btn-info"
													value={d._id}
													onClick={handleEditIncome}
												>
													Edit
												</button>
											</td>
											<td>
												<button
													className="btn btn-danger"
													value={d._id}
													onClick={handleDeleteIncome}
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</React.Fragment>
				) : (
					<React.Fragment>
						<table className="table table-border">
							<thead>
								<tr>
									<th>Income Name</th>
									<th>Amount</th>
									<th>Date</th>
									<th>Edit</th>
									<th>Delete</th>
								</tr>
							</thead>
							<tbody>
								{incomeData.map((d) => {
									return (
										<tr>
											<td>{d.Name}</td>
											<td>${d.Amount}</td>
											<td>{d.TranactionDate}</td>
											<td>
												<button
													className="btn btn-info"
													value={d._id}
													onClick={handleEditIncome}
												>
													Edit
												</button>
											</td>
											<td>
												<button
													className="btn btn-danger"
													value={d._id}
													onClick={handleDeleteIncome}
												>
													Delete
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</React.Fragment>
				)}
			</div>
		</div>
	);
};

export default ExpenseTable;
