const router = require("express").Router();
const userDataFunctions = require("../data/getUserInfo");
const transactionFunc = require("../data/transactions");
const reportGenerator = require("../data/reportGenerator");
const ticketGeneration = require("../data/ticketGeneration");
const dataValidation = require("../data/dataValidation");
const sn = require("servicenow-rest-api");
const fs = require("fs");
var path = require("path");
var xss = require("xss");
const moment = require("moment");
// route will be used to get all the User specific data

router.post("/review", async (req, res) => {
  let UserID = req.userId;
  try {
    if (req.body) data = req.body.body;
    else throw "No Request Body";
  } catch (e) {
    return res.status(204).send({ Error: e });
  }
  let rating = xss(data.rating);
  let feedback = xss(data.feedback);
  try {
    if (!rating) throw "No Rating";
    if (!feedback) throw "No FeedBack";

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

router.get("/review", async (req, res) => {
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

router.get("/alltransactions", async (req, res) => {
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

router.post("/addExpense", async (req, res) => {
  let UserID = req.userId;
  let name, amount, category, recurringType,description,date;
	try{
  if (req.body.body) {
    name = xss(req.body.body.name);
	if(!name) throw "Name Not Provided";
    amount = xss(req.body.body.amount);
	if(!amount) throw "Amount Not Provided"
    category = xss(req.body.body.category);
	if(!category) throw "Category Not Provided"
    recurringType = xss(req.body.body.recurringType);
	if(!recurringType) throw "RecurringType Not Provided";
	if (recurringType == "yes") recurringType = "Recurring";
    else if(recurringType == "no")recurringType = "OneTime";
	else recurringType = undefined;
    if (!req.body.body.description)  description = null;
     else { description = xss(req.body.body.description);
	description = dataValidation.checkTransactionDescription(description);}

    if (!req.body.body.date) {
      let TranactionDate = new Date();
      TranactionDate.toLocaleString("en-US", {
        timeZone: "America/New_York",});
       date = moment(TranactionDate).format("MM/DD/YYYY");
    } else {
       date = xss(req.body.body.date);
	   data = dataValidation.checkTransactionDate(date);
      date = moment(new Date(date)).format("MM/DD/YYYY");
    }
} else {
    throw "Req Body Not Present";
  }
}
  catch(e){
	return res.status(400).send({ Error:e}); 
  }
  try{
	  if(!recurringType) throw "Recurring Type is Undefined"
	  name = dataValidation.checkTransactionName(name);
	  amount = dataValidation.checkTransactionAmount(amount);
	  category = dataValidation.checkTransactionCategory(category);

	  //date is validated
  }
  catch(e){
	return res.status(400).send({ Error:e}); 
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
	if(userInfo){
    res.status(200).send({ data: userInfo });
	}
  } catch (e) {
    console.log(`400::: ${e}`);
    res.status(400).send({ Error: e});
  }
});

router.post("/addIncome", async (req, res) => {
	let UserID = req.userId;
  let name, amount, category, recurringType,description,date;
	try{
  if (req.body.body) {
    name = xss(req.body.body.name);
	if(!name) throw "Name Not Provided";
    amount = xss(req.body.body.amount);
	if(!amount) throw "Amount Not Provided"
    category = xss(req.body.body.category);
	if(!category) throw "Category Not Provided"
    recurringType = xss(req.body.body.recurringType);
	if(!recurringType) throw "RecurringType Not Provided";
	if (recurringType == "yes") recurringType = "Recurring";
    else if(recurringType == "no")recurringType = "OneTime";
	else recurringType = undefined;
    if (!req.body.body.description)  description = null;
     else { description = xss(req.body.body.description);
	description = dataValidation.checkTransactionDescription(description);}

    if (!req.body.body.date) {
      let TranactionDate = new Date();
      TranactionDate.toLocaleString("en-US", {
        timeZone: "America/New_York",});
       date = moment(TranactionDate).format("MM/DD/YYYY");
    } else {
       date = xss(req.body.body.date);
	   data = dataValidation.checkTransactionDate(date);
      date = moment(new Date(date)).format("MM/DD/YYYY");
    }
} else {
    throw "Req Body Not Present";
  }
}
  catch(e){
	return res.status(400).send({ Error:e}); 
  }
  try{
	  if(!recurringType) throw "Recurring Type is Undefined"
	  name = dataValidation.checkTransactionName(name);
	  amount = dataValidation.checkTransactionAmount(amount);
	  category = dataValidation.checkTransactionCategory(category);

	  //date is validated
  }
  catch(e){
	return res.status(400).send({ Error:e}); 
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
		if(userInfo){
		res.status(200).send({ data: userInfo });
		}
	  } catch (e) {
		console.log(`400::: ${e}`);
		res.status(400).send({ Error: e});
	  }
  
});

router.get("/getPieChartData", async (req, res) => {
  let UserID = req.userId;


  let userInfo = await userDataFunctions.getUserTransactionsByCurrentMonth(
    UserID
  );

  let expense = userInfo.Expenditure;
  let OneTime = expense.OneTime;
  let Recurring = expense.Recurring;
  let FinalExpense = [];
  let Output = [];

  FinalExpense = OneTime.concat(Recurring);
  if (FinalExpense.length === 0) {
    res.send({ data: [{ name: "No expense Added", y: 0 }] });
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
    //console.log('Request Processed');
    res.send({ data: Output });
  }
});

router.delete("/deleteIncome", async (req, res) => {
  let email = req.userId;
  let transactionId = xss(req.body.TransactionID);

  //console.log('request recieved');
  // data validation ToDo

  let userInfo = await transactionFunc.deleteIncome(email, transactionId); //change to get user review

  //console.log('Request Processed Deleted Income');
  res.send({ data: userInfo });
});

router.delete("/deleteExpense", async (req, res) => {
  let email = req.userId;
  let transactionId = xss(req.body.TransactionID);

  //console.log('request recieved');
  // data validation ToDo

  let userInfo = await transactionFunc.deleteExpense(email, transactionId); //change to get user review

  //console.log('Request Processed Deleted Expense');
  res.send({ data: userInfo });
});

router.get("/getIncome", async (req, res) => {
  let email = req.userId;
  let transactionId = req.query.id;

  //console.log('request recieved');
  // data validation ToDo

  let userInfo = await transactionFunc.getIncome(email, transactionId); //change to get user review

  //console.log('Request Processed Deleted Expense');
  res.send({ data: userInfo });
});

router.get("/getExpense", async (req, res) => {
  let email = req.userId;
  let transactionId = req.query.id;

  //console.log('request recieved');
  //console.log('transactionId received', transactionId);
  // data validation ToDo

  let userInfo = await transactionFunc.getExpense(email, transactionId); //change to get user review

  res.send({ data: userInfo });
});

router.get("/monthlyComparision", async (req, res) => {
  let UserID = req.userId;
  //console.log('request recieved');
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
  //	let thisMonth = parseInt(moment().format('mm'));

  FinalExpense = OneTimeExpense.concat(RecurringExpense);
  for (let i in FinalExpense) {
    let date = moment(new Date(FinalExpense[i].TranactionDate)).format(
      "MM/DD/YYYY"
    );
    let month = parseInt(moment(new Date(date)).format("MM"));

    Expensedata[month - 1] = Expensedata[month - 1] + FinalExpense[i].Amount;
  }

  FinalIncome = OneTimeIncome.concat(RecurringIncome);
  for (let i in FinalIncome) {
    let date = moment(new Date(FinalIncome[i].TranactionDate)).format(
      "MM/DD/YYYY"
    );
    let month = parseInt(moment(new Date(date)).format("MM"));
    Incomedata[month - 1] = Incomedata[month - 1] + FinalIncome[i].Amount;
  }

  let data = {
    TotalIncome: Incomedata,
    TotalExpenditure: Expensedata,
  };
  //console.log('Request Processed Monthly Comparisn Sending');
  res.send({ data: data });
});
router.post("/reportGeneration", async (req, res) => {
  let UserID = req.userId;
  //console.log('request recieved');
  // data validation ToDo
  let Name = await userDataFunctions.getName(UserID);
  let userInfo = await userDataFunctions.getUserTransactions(UserID);

  let from = xss(req.body.body.dateone);
  let till = xss(req.body.body.datetwo);

  let modeledData = await userDataFunctions.filterTransactionReportGeneration(
    userInfo,
    Name,
    from,
    till
  );

  let pdfFile = reportGenerator.createInvoice(modeledData);
  pdfFile.pipe(res);
  //pdfFile.pipe(fs.createWriteStream('./server/routes/Report.pdf'));
});

router.get("/getSpendingLimitMonthExpense", async (req, res) => {
  let UserID = req.userId;
  //console.log('request recieved');
  // data validation ToDo
  let userInfo = await userDataFunctions.getSpendingLimitAndMonthExpense(
    UserID
  ); //change to get user review
  //console.log('Request Processed');
  res.send({ data: userInfo });
});

router.post("/createComplaint", async (req, res) => {
  let issue = xss(req.body.body.incident.bug);

  //let complaintNumber = await ticketGeneration.createIncident(issue);

  const ServiceNow = new sn("dev92862", "admin", "$bWw-GBd5t4F");

  ServiceNow.Authenticate();

  const data = {
    short_description: issue,
    urgency: "1",
  };

  await ServiceNow.createNewTask(data, "incident", (response) => {
    res.send({ data: response.number });
  });
});

router.post("/trackComplaint", async (req, res) => {
  //pending errorchecking for incident number
  let incident = xss(req.body.body);
  const ServiceNow = new sn("dev92862", "admin", "$bWw-GBd5t4F");

  ServiceNow.Authenticate();
  const filters = ["number=" + incident];
  const fields = ["number", "short_description", "urgency", "state"];
  await ServiceNow.getTableData(fields, filters, "incident", (response) => {
    if (!response[0]) {
      return res.send({ data: "Ticket with this ID does not exist" });
    }
    res.send({ data: response[0] });
  });
  //let status = await ticketGeneration.fetchIncident(incident);
});

router.post("/addSetAside", async (req, res) => {
  let UserID = req.userId;
  try {
    if (req.body.body) {
      data = req.body.body;
    } else {
      throw "No Request Body";
    }
  } catch (e) {
    return res.status(204).send({ Error: e });
  }
  await transactionFunc.createSetAside(UserID, Amount, Purpose);
  return res.status(200).send({});
});
router.delete("/removeSetAside", async (req, res) => {
  let UserId = req.userId;
  let transactionId = xss(req.body.TransactionID);

  let userInfo = await transactionFunc.deleteSetAside(UserId, transactionId); //change to get user review

  res.send({ data: userInfo });
});

module.exports = router;
/*
catch(e){
	res.status(e.code).send({data:insertedBool, message: "User created successfully" });
}
*/
