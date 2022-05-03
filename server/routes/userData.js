const router = require("express").Router();
const userDataFunctions = require('../data/getUserInfo')
const transactionFunc = require("../data/transactions")

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
	let rating = xss(req);
	let feedback = xss(req);
	console.log('request recieved') ;
	// data validation ToDo
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

router.get("/totalIncome",async(req, res) => { 
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo
	let userInfo = await transactionFunc.updateTotalIncome(UserID); //change to get user review
	console.log("Request Processed Sending Review")
	res.send({data: userInfo});
});


module.exports = router;
/*
catch(e){
	res.status(e.code).send({data:insertedBool, message: "User created successfully" });
}
*/