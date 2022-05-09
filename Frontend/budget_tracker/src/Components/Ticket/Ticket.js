import React, { useState, useEffect } from 'react';
//import { Link, useNavigate, useParams } from 'react-router-dom';
import './Ticket.css';
//import axios from 'axios';
import AuthService from '../../services/auth.service';
import TicketService from '../../services/ticketgenerationservice';

const Ticket = () => {
	const initialValuesGenTicket = {
		bug: '',
	};
	const [formGenTicketValues, setFormGenTicketValues] = useState(
		initialValuesGenTicket
	);
	const [getTicketStatusTicketId, updateTicketIdToGetStatus] = useState('');
	const [ticketStatus, updateTicketStatus] = useState(null);
	const [getTicketID, setTicketID] = useState(null);

	const changeHandlerTicket = (e) => {
		const { name, value } = e.target;
		setFormGenTicketValues({ ...formGenTicketValues, [name]: value });
	};

	const handleTicketIdChange = (e) => {
		const { value } = e.target;
		updateTicketIdToGetStatus(value);
		updateTicketStatus(null);
	};

	useEffect(() => {
		var data = AuthService.getCurrentUser();
		if (data) {
			setAccessToken(data.accessToken);
		} else {
			setAccessToken(undefined);
		}
	});

	const [error, setError] = useState(null);
	const [success, setSuccess] = useState('');
	const [formErrors, setFormErrors] = useState({});
	const [formErrorsTicket, setFormErrorsTicket] = useState({});
	const [accessToken, setAccessToken] = useState('');

	const validateGenerateTicket = (values) => {
		const alpha = /^[0-9]+$/;
		let errorsTicket = {};
		if (!values.bug) {
			errorsTicket.bug = 'Problem is required';
		}
		const flag = alpha.test(values.bug);
		if (flag === true) {
			errorsTicket.bug = 'Problem cannot be just Numerical!!!!!';
		}
		return errorsTicket;
	};

	const validateGetTicketStatusInput = (values) => {
		let errorsStatus = {};
		let regex = /INC[0-9]{7}/;

		if (!values) {
			errorsStatus.ticketId = 'Ticket ID is required';
		}
		const flag = regex.test(values);
		if (flag === false) {
			errorsStatus.ticketId = 'Ticket ID is invalid';
		}
		return errorsStatus;
	};

	const genTicket = async (event) => {
		console.log(formGenTicketValues, '========');
		setError('');
		setSuccess('');
		event.preventDefault();
		let error = await validateGenerateTicket(formGenTicketValues);
		await setFormErrors(error);
		if (Object.keys(error).length === 0) {
			console.log('before submission', formGenTicketValues);
			TicketService.createTicket(formGenTicketValues)
				.then((data) => {
					// console.log(`@@@@@ ${JSON.stringify(data)}`);
					setTicketID(data);
					setSuccess('Ticket generated successfully!!');
				})
				.catch((e) => {
					setError('Opps, something went wrong :(');
				});
		}
	};

	const getStatus = async (event) => {
		setError('');
		setSuccess('');
		event.preventDefault();
		let error = await validateGetTicketStatusInput(getTicketStatusTicketId);
		await setFormErrorsTicket(error);
		if (Object.keys(error).length === 0) {
			TicketService.postTicketID(getTicketStatusTicketId)
				.then((data) => {
					if (data === 'Ticket with this ID does not exist') {
						setError('Ticket with this ID does not exist');
					} else {
						console.log(data);
						updateTicketStatus(data);
						setSuccess('Status Rendered successfully!!');
					}
				})
				.catch((e) => {
					setError('Oops, something went wrong :(');
				});
		}
	};

	return (
		<div className="row col-md-8 offset-md-4 div-fix">
			{accessToken !== undefined ? (
				<React.Fragment>
					<form onSubmit={genTicket}>
						<h1>Generate ticket</h1>
						<div className="posF3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Enter a Problem
							</label>
							<input
								id="exampleInputEmail1"
								type="text"
								name="bug"
								placeholder="Problem"
								className="form-control position"
								value={formGenTicketValues.bug}
								onChange={changeHandlerTicket}
							/>
							<p className="disError">{formErrors ? formErrors.bug : ''}</p>
							<button type="submit" className="btn btn-primary" value="Submit">
								Submit
							</button>
						</div>
						{getTicketID && (
							<div className="ticket-msg">
								Your newly created Ticket ID is <i>{getTicketID}</i>. <br />
								<div className="ticket-status">
									An email has also been sent with your complaint number which
									can be used to further track this complaint.
								</div>
								<br />
							</div>
						)}
					</form>
					<form onSubmit={getStatus}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">
								Enter Ticket ID
							</label>
							<input
								id="exampleInputEmail1"
								type="text"
								name="status"
								placeholder="Ticket ID"
								className="form-control position"
								value={getTicketStatusTicketId.status}
								onChange={handleTicketIdChange}
							/>
							<p className="disError">
								{formErrorsTicket ? formErrorsTicket.ticketId : ''}
							</p>
							<button type="submit" className="btn btn-primary" value="Submit">
								Submit
							</button>
						</div>
						{ticketStatus && (
							<div className="ticket-status">
								<label>Ticket ID: </label>
								{getTicketStatusTicketId} <br />
								<label>Problem Description: </label>
								{ticketStatus.short_description === ''
									? 'N/A'
									: ticketStatus.short_description}
								<br />
								<label>Problem Status: </label>
								{ticketStatus.state === '' ? 'N/A' : ticketStatus.state} <br />
							</div>
						)}
						<div className="thisError">{error !== '' ? error : success}</div>
					</form>
				</React.Fragment>
			) : (
				<React.Fragment>
					<div className="card posT">
						<h1>Restricted area</h1>
						<h2>
							<a href="/login" className="a12">
								Sign In
							</a>{' '}
							to Generate ticket
						</h2>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default Ticket;
