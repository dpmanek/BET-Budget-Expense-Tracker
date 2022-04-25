const router = require("express").Router();
const userDataFunctions = require('../data/getUserInfo')

// route will be used to get all the specific data


router.get("/dob", async (req, res) => { 
	let UserID = req.userId
	console.log('request recieved') ;
	// data validation ToDo
	let userInfo = await userDataFunctions.getDOB(UserID);
	console.log("Request Processed Sending DOB")
	res.send({data: userInfo});
});



module.exports = router;