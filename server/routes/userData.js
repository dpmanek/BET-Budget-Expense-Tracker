const router = require('express').Router();
const userDataFunctions = require('../data/getUserInfo');
const transactionFunc = require('../data/transactions');
const reportGenerator = require('../data/reportGenerator');

var xss = require('xss');
const moment = require('moment');
// route will be used to get all the specific data

router.get('/dob', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo
	let userInfo = await userDataFunctions.getDOB(UserID);
	console.log('Request Processed Sending DOB');
	res.send({ data: userInfo });
});

router.post('/review', async (req, res) => {
	let UserID = req.userId;
	let rating = xss(req.body.rating);
	let feedback = xss(req.body.feedback);
	console.log('request recieved');
	// data validation ToDo
	// user review added return message
	let userInfo = await userDataFunctions.postReview(UserID, rating, feedback); //change to get user review

	console.log('Request Processed Review Added');
	res.send({ data: userInfo });
});

router.get('/review', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo
	let userInfo = await userDataFunctions.getReview(UserID); //change to get user review
	console.log('Request Processed Sending Review');
	res.send({ data: userInfo });
});

//test
router.get('/totalIncome', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo
	let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(
		UserID	
	); //change to get user review
	console.log('Request Processed');
	res.send({ data: userInfo });
});

router.get('/alltransactions', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo
	let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(UserID);
	console.log('Request Processed');
	res.send({ data: userInfo });
});

router.post('/addExpense', async (req, res) => {
	let UserID = req.userId;
	let name = xss(req.body.body.name);
	if (!req.body.body.description) {
		var description = null;
	} else var description = xss(req.body.body.description);
	let amount = xss(req.body.body.amount);
	amount = parseInt(amount);
	let category = xss(req.body.body.category);
	if (!req.body.body.date) {
		let TranactionDate = new Date();
		TranactionDate.toLocaleString('en-US', {
			timeZone: 'America/New_York',
		});
		var date = moment(TranactionDate).format('MM/DD/YYYY');
	} else {
		var date = xss(req.body.body.date);
		date = moment(date).format('MM/DD/YYYY');
	}
	let recurringType = xss(req.body.body.recurringType);
	if (recurringType == 'yes') recurringType = 'Recurring';
	else recurringType = 'OneTime';
	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.createExpense(
		UserID,
		name,
		description,
		category,
		amount,
		recurringType,
		date
	); //change to get user review

	console.log('Request Processed Expense Added');
	res.send({ data: userInfo });
});

router.post('/addIncome', async (req, res) => {
	let UserID = req.userId;
	let name = xss(req.body.body.name);
	if (!req.body.body.description) {
		var description = null;
	} else var description = xss(req.body.body.description);
	let amount = xss(req.body.body.amount);
	amount = parseInt(amount);
	let category = xss(req.body.body.category);
	if (!req.body.body.date) {
		let TranactionDate = new Date();
		TranactionDate.toLocaleString('en-US', {
			timeZone: 'America/New_York',
		});
		var date = moment(TranactionDate).format('MM/DD/YYYY');
	} else {
		var date = xss(req.body.body.date);
		date = moment(date).format('MM/DD/YYYY');
	}
	let recurringType = xss(req.body.body.recurringType);
	if (recurringType == 'yes') recurringType = 'Recurring';
	else recurringType = 'OneTime';
	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.createIncome(
		UserID,
		name,
		description,
		category,
		amount,
		recurringType,
		date
	); //change to get user review

	console.log('Request Processed Expense Added');
	res.send({ data: userInfo });
});

router.get('/getPieChartData', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo

	let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(UserID);
	// console.log('@@@@@@@@:');
	// console.log(userInfo);
	// console.log('@@@@@@@@:');
	let expense = userInfo.Expenditure;
	let OneTime = expense.OneTime;
	let Recurring = expense.Recurring;
	let FinalExpense = [];
	let Output = [];

	FinalExpense = OneTime.concat(Recurring);
	if (FinalExpense.length === 0) {
		res.send({ data: [{ name: 'No expense Added', y: 0 }] });
	} else {
		for (let i = 0; i < FinalExpense.length; i++) {
			if (i === 0) {
				Output.push({
					name: FinalExpense[i].Tags,
					y: FinalExpense[i].Amount,
				});
			} else {
				let comparer = FinalExpense[i];
				let tagnotfound = true;
				for (let j = 0; j < Output.length; j++) {
					if (Output[j].name === comparer.Tags) {
						Output[j].y = Output[j].y + comparer.Amount;
						tagnotfound = false;
					}
					if (j === Output.length - 1 && tagnotfound) {
						Output.push({
							name: comparer.Tags,
							y: comparer.Amount,
						});
					}
				}
			}
		}
		console.log('Request Processed');
		res.send({ data: Output });
	}
});

router.delete('/deleteIncome', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);

	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.deleteIncome(email, transactionId); //change to get user review

	console.log('Request Processed Deleted Income');
	res.send({ data: userInfo });
});

router.delete('/deleteExpense', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);

	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.deleteExpense(email, transactionId); //change to get user review

	console.log('Request Processed Deleted Expense');
	res.send({ data: userInfo });
});

router.get('/getIncome', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);

	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.getIncome(email, transactionId); //change to get user review

	console.log('Request Processed Deleted Expense');
	res.send({ data: userInfo });
});

router.get('/getExpense', async (req, res) => {
	let email = req.userId;
	let transactionId = xss(req.body.TransactionID);

	console.log('request recieved');
	// data validation ToDo

	let userInfo = await transactionFunc.getExpense(email, transactionId); //change to get user review

	console.log('Request Processed Deleted Expense');
	res.send({ data: userInfo });
});

router.get('/monthlyComparision', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo

	let userInfo = await userDataFunctions.getUserTransactions(UserID);
	let expense = userInfo.Expenditure;
	let OneTimeExpense = expense.OneTime;
	let RecurringExpense = expense.Recurring;

	let income = userInfo.Income;
	let OneTimeIncome = income.OneTime;
	let RecurringIncome = income.Recurring;

	// let from ="05/01/2022"
	// let till="05/05/2022"
	// let start = new Date(moment(from).format("MM/DD/YYYY"));
	// let end = new Date(moment(till).format("MM/DD/YYYY"));

	let FinalExpense = [];
	let FinalIncome = [];
	let Expensedata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let Incomedata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let thisMonth = parseInt(moment().format('mm'));

	FinalExpense = OneTimeExpense.concat(RecurringExpense);
	for (let i in FinalExpense) {
		let date = moment(FinalExpense[i].TranactionDate).format('MM/DD/YYYY');
		let month = parseInt(moment(date).format('MM'));

		Expensedata[month - 1] = Expensedata[month - 1] + FinalExpense[i].Amount;
	}

	FinalIncome = OneTimeIncome.concat(RecurringIncome);
	for (let i in FinalIncome) {
		let date = moment(FinalIncome[i].TranactionDate).format('MM/DD/YYYY');
		let month = parseInt(moment(date).format('MM'));
		Incomedata[month - 1] = Incomedata[month - 1] + FinalIncome[i].Amount;
	}

	let data = {
		TotalIncome: Incomedata,
		TotalExpenditure: Expensedata,
	};
  console.log('Request Processed Monthly Comparisn Sending')
	res.send({ data: data });
});
router.get('/reportGeneration', async (req, res) => {
	let UserID = req.userId;
	console.log('request recieved');
	// data validation ToDo
	let Name = await userDataFunctions.getName(UserID);
	let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(UserID);

	let expense = userInfo.Expenditure;
	let OneTimeExpense = expense.OneTime;
	let RecurringExpense = expense.Recurring;
	let income = userInfo.Income;
	let OneTimeIncome = income.OneTime;
	let RecurringIncome = income.Recurring;

	let from = '05/01/2022';
	let till = '05/05/2022';
	let start = new Date(moment(from).format('MM/DD/YYYY'));
	let end = new Date(moment(till).format('MM/DD/YYYY'));

	let FinalExpense = [];
	let FinalIncome = [];
	let FinalTransactions = [];
	FinalExpense = OneTimeExpense.concat(RecurringExpense);
	for (let i in FinalExpense) {
		FinalExpense[i].Type = 'Debit';
	}
	FinalIncome = OneTimeIncome.concat(RecurringIncome);
	for (let i in FinalIncome) {
		FinalIncome[i].Type = 'Credit';
	}
	FinalTransactions = FinalIncome.concat(FinalExpense);
	for (let i in FinalTransactions) {
		FinalTransactions[i].TranactionDate = new Date(
			FinalTransactions[i].TranactionDate
		);
	}
	const sortedActivities = FinalTransactions.sort(
		(a, b) => a.TranactionDate - b.TranactionDate
	);
	let FilteredData = [];
	for (let i in sortedActivities) {
		if (
			sortedActivities[i].TranactionDate >= start &&
			sortedActivities[i].TranactionDate <= end
		) {
			FilteredData.push(sortedActivities[i]);
		}
	}
	let Transactions = [];
	for (i in FilteredData) {
		FilteredData[i].TranactionDate = moment(
			FilteredData[i].TranactionDate
		).format('MM/DD/YYYY');
		let element = {
			Sr_no: parseFloat(i),
			Transaction_Name: FilteredData[i].Name,
			Amount: FilteredData[i].Amount,
			Type: FilteredData[i].Type,
			Date: FilteredData[i].TranactionDate,
		};
		Transactions.push(element);
	}
	const modeledData = {
		Name: Name.Name,
		From: moment(from).format('MM/DD/YYYY'),
		Till: moment(till).format('MM/DD/YYYY'),
		Transactions: Transactions,
	};

	let pdfFile = await reportGenerator.createInvoice(modeledData, 'Deep.pdf');
	pdfFile.pipe(res);
});

module.exports = router;
/*
catch(e){
	res.status(e.code).send({data:insertedBool, message: "User created successfully" });
}
*/
