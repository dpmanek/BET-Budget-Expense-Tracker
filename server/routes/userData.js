const router = require('express').Router();
const userDataFunctions = require('../data/getUserInfo');
const transactionFunc = require('../data/transactions');
const reportGenerator = require('../data/reportGenerator');
const ticketGeneration = require('../data/ticketGeneration');
const dataValidation = require('../data/dataValidation');
const Mailer = require('../data/mail');
const sn = require('servicenow-rest-api');
const fs = require('fs');
var path = require('path');
var xss = require('xss');
const moment = require('moment');
// route will be used to get all the User specific data

router.post('/review', async (req, res) => {
	let UserID = req.userId;
	try {
		if (req.body) data = req.body.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let rating = xss(data.rating);
	let feedback = xss(data.feedback);
	try {
		if (!rating) throw 'No Rating';
		if (!feedback) throw 'No FeedBack';

		rating = dataValidation.checkRating(rating);
		feedback = dataValidation.checkFeedback(feedback);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		let userInfo = await userDataFunctions.postReview(UserID, rating, feedback); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/review', async (req, res) => {
	let UserID = req.userId;

	try {
		let userInfo = await userDataFunctions.getReview(UserID); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/alltransactions', async (req, res) => {
	let UserID = req.userId;
	try {
		let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(
			UserID
		);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.post('/addExpense', async (req, res) => {
	let UserID = req.userId;
	let name, amount, category, recurringType, description, date;
	try {
		if (req.body.body) {
			name = xss(req.body.body.name);
			if (!name) throw 'Name Not Provided';
			amount = xss(req.body.body.amount);
			if (!amount) throw 'Amount Not Provided';
			category = xss(req.body.body.category);
			if (!category) throw 'Category Not Provided';
			recurringType = xss(req.body.body.recurringType);
			if (!recurringType) throw 'RecurringType Not Provided';
			if (recurringType == 'yes') recurringType = 'Recurring';
			else if (recurringType == 'no') recurringType = 'OneTime';
			else recurringType = undefined;
			if (!req.body.body.description) description = null;
			else {
				description = xss(req.body.body.description);
				description = dataValidation.checkTransactionDescription(description);
			}

			if (!req.body.body.date) {
				let TranactionDate = new Date();
				TranactionDate.toLocaleString('en-US', {
					timeZone: 'America/New_York',
				});
				date = moment(TranactionDate).format('MM/DD/YYYY');
				date = moment(new Date(TranactionDate)).add(1, 'd');
				date = moment(new Date(TranactionDate)).format('MM/DD/YYYY');
			} else {
				date = xss(req.body.body.date);
				date = dataValidation.checkTransactionDateReportGeneration(date);
				date = moment(new Date(date)).format('MM/DD/YYYY');
				date = moment(new Date(date)).add(1, 'd');
				date = moment(new Date(date)).format('MM/DD/YYYY');
			}
		} else {
			throw 'Req Body Not Present';
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		if (!recurringType) throw 'Recurring Type is Undefined';
		name = dataValidation.checkTransactionName(name);
		amount = dataValidation.checkTransactionAmount(amount);
		category = dataValidation.checkTransactionCategory(category);

		//date is validated
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	//data function call
	try {
		let userInfo = await transactionFunc.createExpense(
			UserID,
			name,
			description,
			category,
			amount,
			recurringType,
			date
		);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		console.log(`400::: ${e}`);
		res.status(400).send({ Error: e });
	}
});

router.post('/addIncome', async (req, res) => {
	let UserID = req.userId;
	let name, amount, category, recurringType, description, date;
	try {
		if (req.body.body) {
			name = xss(req.body.body.name);
			if (!name) throw 'Name Not Provided';
			amount = xss(req.body.body.amount);
			if (!amount) throw 'Amount Not Provided';
			category = xss(req.body.body.category);
			if (!category) throw 'Category Not Provided';
			recurringType = xss(req.body.body.recurringType);
			if (!recurringType) throw 'RecurringType Not Provided';
			if (recurringType == 'yes') recurringType = 'Recurring';
			else if (recurringType == 'no') recurringType = 'OneTime';
			else recurringType = undefined;
			if (!req.body.body.description) description = null;
			else {
				description = xss(req.body.body.description);
				description = dataValidation.checkTransactionDescription(description);
			}

			if (!req.body.body.date) {
				let TranactionDate = new Date();
				TranactionDate.toLocaleString('en-US', {
					timeZone: 'America/New_York',
				});
				date = moment(TranactionDate).format('MM/DD/YYYY');
				date = moment(new Date(TranactionDate)).add(1, 'd');
				date = moment(new Date(TranactionDate)).format('MM/DD/YYYY');
			} else {
				date = xss(req.body.body.date);
				data = dataValidation.checkTransactionDate(date);
				date = moment(new Date(date)).format('MM/DD/YYYY');
				date = moment(new Date(date)).add(1, 'd');
				date = moment(new Date(date)).format('MM/DD/YYYY');
			}
		} else {
			throw 'Req Body Not Present';
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		if (!recurringType) throw 'Recurring Type is Undefined';
		name = dataValidation.checkTransactionName(name);
		amount = dataValidation.checkTransactionAmount(amount);
		category = dataValidation.checkTransactionCategory(category);

		//date is validated
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	//data function call
	try {
		let userInfo = await transactionFunc.createIncome(
			UserID,
			name,
			description,
			category,
			amount,
			recurringType,
			date
		);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		console.log(`400::: ${e}`);
		res.status(400).send({ Error: e });
	}
});

router.get('/getPieChartData', async (req, res) => {
	let UserID = req.userId;
	let userInfo = undefined;
	let Output = undefined;

	try {
		userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(
			UserID
		);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		Output = await userDataFunctions.filterDataPieChart(userInfo);
		if (Output === 'nodata') {
			res.send({ data: [{ name: 'No expense Added', y: 0 }] });
		} else res.send({ data: Output });
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.delete('/deleteIncome', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);
	let userInfo = undefined;

	try {
		if (!transactionId) throw 'TransactionID Not Provided';
		transactionId = dataValidation.checkTransactionID(transactionId);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.deleteIncome(email, transactionId); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something Went Wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.delete('/deleteExpense', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);
	let userInfo = undefined;

	try {
		if (!transactionId) throw 'TransactionID Not Provided';
		transactionId = dataValidation.checkTransactionID(transactionId);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.deleteExpense(email, transactionId); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something Went Wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/getIncome', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.query.id);
	let userInfo = undefined;

	try {
		if (!transactionId) throw 'TransactionID Not Provided';
		transactionId = dataValidation.checkTransactionID(transactionId);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.getIncome(email, transactionId); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something Went Wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/getExpense', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.query.id);
	let userInfo = undefined;

	try {
		if (!transactionId) throw 'TransactionID Not Provided';
		transactionId = dataValidation.checkTransactionID(transactionId);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.getExpense(email, transactionId); //change to get user review
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something Went Wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/monthlyComparision', async (req, res) => {
	let UserID = req.userId;
	let userInfo, data;
	try {
		userInfo = await userDataFunctions.getUserTransactions(UserID);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		data = await userDataFunctions.filterDataMonthlyComparisn(userInfo);
		if (data) {
			res.status(200).send({ data: data });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});
router.post('/reportGeneration', async (req, res) => {
	let UserID = req.userId;
	let Name, userInfo, from, till, modeledData;

	try {
		if (!req.body.body) throw 'Req Body Not Present';
		from = xss(req.body.body.dateone);
		till = xss(req.body.body.datetwo);
		if (!from) throw 'No Starting Date';
		if (!till) throw 'No End Date';
		from = dataValidation.checkTransactionDateReportGeneration(from);
		till = dataValidation.checkTransactionDateReportGeneration(till);
		from = new Date(moment(from).format('MM/DD/YYYY'));
		till = new Date(moment(till).format('MM/DD/YYYY'));
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		Name = await userDataFunctions.getName(UserID);
		userInfo = await userDataFunctions.getUserTransactions(UserID);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		modeledData = await userDataFunctions.filterTransactionReportGeneration(
			userInfo,
			Name,
			from,
			till
		);
		let pdfFile = reportGenerator.createInvoice(modeledData);
		pdfFile.pipe(res);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	//pdfFile.pipe(fs.createWriteStream('./server/routes/Report.pdf'));
});

router.get('/getSpendingLimitMonthExpense', async (req, res) => {
	let UserID = req.userId;
	try {
		let userInfo = await userDataFunctions.getSpendingLimitAndMonthExpense(
			UserID
		);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		}
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.post('/createComplaint', async (req, res) => {
	let UserID = req.userId;
	let issue;
	const ServiceNow = new sn('dev92862', 'admin', '$bWw-GBd5t4F');

	try {
		if (!req.body.body.incident) throw 'req Body Incident is empty';
		issue = xss(req.body.body.incident.bug);
		if (!issue) throw 'Issue Not Provided';
		issue = dataValidation.checkFeedback(issue);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	//let complaintNumber = await ticketGeneration.createIncident(issue);
	ServiceNow.Authenticate();
	const data = {
		short_description: issue,
		urgency: '1',
	};

	try {
		await ServiceNow.createNewTask(data, 'incident', (response) => {
			Mailer.sendEmail(
				UserID,
				'BET - Your Complaint is Filed',
				`Your complaint has been recorded. A specialist will be assigned to your case and the issue shall be resolved soon after that. Your Complaint Tracking Number is:${response.number}`
			);
			res.send({ data: response.number });
		});
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.post('/trackComplaint', async (req, res) => {
	let incident;

	try {
		if (!req.body.body) throw 'No Req Body';
		incident = xss(req.body.body);
		if (!incident) throw 'No Incident ID Provided';
		incident = dataValidation.checkIncidentID(incident);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

	const ServiceNow = new sn('dev92862', 'admin', '$bWw-GBd5t4F');

	ServiceNow.Authenticate();
	const filters = ['number=' + incident];
	const fields = ['number', 'short_description', 'urgency', 'state'];
	try {
		await ServiceNow.getTableData(fields, filters, 'incident', (response) => {
			if (!response[0]) {
				return res.send({ data: 'Ticket with this ID does not exist' });
			}
			res.send({ data: response[0] });
		});
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	//let status = await ticketGeneration.fetchIncident(incident);
});

router.post('/addSetAside', async (req, res) => {
	let UserID = req.userId;
	let Amount, Purpose, data, userInfo;
	try {
		if (req.body.body) {
			data = req.body.body;
		} else {
			throw 'No Request Body';
		}
		Amount = data.amount;
		Purpose = data.goal;
		if (!Amount) throw 'Amount Not Provided';
		if (!Purpose) throw ' Purpose Not Provided';
		Amount = dataValidation.checkTransactionAmount(Amount);
		Purpose = dataValidation.checkFeedback(Purpose);
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.createSetAside(UserID, Amount, Purpose);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something Went Wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});
router.delete('/removeSetAside', async (req, res) => {
	let UserId = req.userId;
	let transactionId, userInfo;
	try {
		if (req.body) {
			transactionId = xss(req.body.TransactionID);
			if (!transactionId) throw 'ID Not Provided';
			transactionId = dataValidation.checkTransactionID(transactionId);
		} else throw 'Request Body Not Present';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		userInfo = await transactionFunc.deleteSetAside(UserId, transactionId);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something went wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.get('/getSetAside', async (req, res) => {
	let UserId = req.userId;

	try {
		userInfo = await transactionFunc.getSetAside(UserId);
		if (userInfo) {
			res.status(200).send({ data: userInfo });
		} else throw 'Something went wrong';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

module.exports = router;
/*
catch(e){
	res.status(e.code).send({data:insertedBool, message: "User created successfully" });
}
*/
