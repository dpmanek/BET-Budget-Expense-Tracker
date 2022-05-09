import React, { useState, useEffect } from 'react';

import transactionService from '../../services/add.transaction';

const Settable = (props) => {
	const [data, setdata] = useState([]);
	useEffect(() => {
		transactionService.getSetAside().then((response) => {
			if (response.data) {
				setdata(response.data);
			}
		});
	}, [props]);

	const handleDelete = (event) => {
		event.preventDefault();
		let id = event.target.value;
		transactionService
			.deleteSetAside(id)
			.then((d) => {
				let tmpData = data.filter((d) => d._id !== id);
				setdata(tmpData);
			})
			.catch((e) => {
				console.log('Error in deleting Goals');
			});
	};

	return (
		<div>
			<table className="table table-border">
				<thead>
					<tr>
						<th>Goal</th>
						<th>Amount</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{data.map((d) => {
						return (
							<tr>
								<td>{d.Purpose}</td>
								<td>${d.Amount}</td>

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
		</div>
	);
};

export default Settable;
