const router = require("express").Router();
const userDataFunctions = require('../data/getUserInfo')
const transactionFunc = require("../data/transactions")
var xss = require("xss");
const moment = require("moment");
// route will be used to get all the specific data


router.get("/dob", async (req, res) => { 
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo
	let userInfo = await userDataFunctions.getDOB(UserID);
	console.log("Request Processed Sending DOB")
	res.send({data: userInfo});
});

router.post("/review",async(req, res) => { 
	let UserID = req.userId
	let rating = xss(req.body.rating);
	let feedback = xss(req.body.feedback);
	console.log('request recieved') ;
	// data validation ToDo
	// user review added return message
	let userInfo = await userDataFunctions.postReview(UserID,rating,feedback); //change to get user review
	
	console.log("Request Processed Review Added")
	res.send({data: userInfo});
});

router.get("/review",async(req, res) => { 
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo
	let userInfo = await userDataFunctions.getReview(UserID); //change to get user review
	console.log("Request Processed Sending Review")
	res.send({data: userInfo});
});

//test
router.get("/totalIncome",async(req, res) => { 
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo
	let userInfo = await transactionFunc.updateExpense(UserID, "transactionID",Name,Description,Tags,payment,Amount,Comments); //change to get user review
	console.log("Request Processed")
	res.send({data: userInfo});
});


router.get("/alltransactions", async(req, res) =>{
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo

let userInfo = await userDataFunctions.getUserTransactions(UserID);
console.log("Request Processed")
	res.send({data: userInfo});

});

router.post("/addExpense", async(req, res) =>{
	let UserID = req.userId
	let name = xss(req.body.body.name);
	if(!req.body.body.description){
		var description	= null	
	}
	else var description = xss(req.body.body.description);
	let amount = xss(req.body.body.amount);
	amount = parseInt(amount);
	let category = xss(req.body.body.category);
	if(!req.body.body.date){
		let TranactionDate = new Date();
 		 TranactionDate.toLocaleString("en-US", {
    		timeZone: "America/New_York",
  		});
		var date = moment(TranactionDate).format("MM/DD/YYYY");	
	}
	else {
		var date = xss(req.body.body.date);
		date = moment(date).format("MM/DD/YYYY");	
	}
	let recurringType = xss(req.body.body.recurringType);
	if(recurringType == 'yes') recurringType = "Recurring"
	else recurringType = "OneTime"
	console.log('request recieved') ;
	// data validation ToDo
	
	let userInfo = await transactionFunc.createExpense(UserID, name, description,category,amount,recurringType,date); //change to get user review
	
	console.log("Request Processed Expense Added")
	res.send({data: userInfo});

});

router.post("/addIncome", async(req, res) =>{

	let UserID = req.userId
	let name = xss(req.body.body.name);
	if(!req.body.body.description){
		var description	= null	
	}
	else var description = xss(req.body.body.description);
	let amount = xss(req.body.body.amount);
	amount = parseInt(amount);
	let category = xss(req.body.body.category);
	if(!req.body.body.date){
		let TranactionDate = new Date();
 		 TranactionDate.toLocaleString("en-US", {
    		timeZone: "America/New_York",
  		});
		var date = moment(TranactionDate).format("MM/DD/YYYY");	
	}
	else {
		var date = xss(req.body.body.date);
		date = moment(date).format("MM/DD/YYYY");	
	}
	let recurringType = xss(req.body.body.recurringType);
	if(recurringType == 'yes') recurringType = "Recurring"
	else recurringType = "OneTime"
	console.log('request recieved') ;
	// data validation ToDo
	
	let userInfo = await transactionFunc.createExpense(UserID, name, description,category,amount,recurringType,date); //change to get user review
	
	console.log("Request Processed Expense Added")
	res.send({data: userInfo});
});








module.exports = router;
/*
catch(e){
	res.status(e.code).send({data:insertedBool, message: "User created successfully" });
}
*/