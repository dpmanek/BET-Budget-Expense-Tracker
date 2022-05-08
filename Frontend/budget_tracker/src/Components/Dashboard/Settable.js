import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
import transactionService from '../../services/add.transaction';
import { useNavigate } from 'react-router-dom';

const Settable = () => {
<<<<<<< HEAD
  let navigate = useNavigate();
  const [data, setdata] = useState([]);
  useEffect(() => {
    transactionService.getSetAside().then((response) => {
      console.log(response, "====//===");
      if (response.data) {
        // setdata(response.data.getUserGoal);
        console.log(response.data, "==========");
      }
    });
  }, []);
=======
	let navigate = useNavigate();
	const [data, setdata] = useState([]);
	useEffect(() => {
		transactionService.getSetAside().then((response) => {
			if (response.data) {
				setdata(response.data.getUserGoal);
			}
		});
	}, []);
>>>>>>> 1283750b3a5521bd9f4d7681bf2c348851a4dbd1

	const handleDelete = (event) => {
		event.preventDefault();
		let id = event.target.value;
		transactionService
			.deleteSetAside(id)
			.then((d) => {
				let tmpData = data.filter((d) => d._id != id);
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
					</tr>
				</thead>
				<tbody>
					{data.map((d) => {
						return (
							<tr>
								<td>{d.goal}</td>
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
