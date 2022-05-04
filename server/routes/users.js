const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwtkey = require("../config/authconfig")
const dataFunctions = require("../data/users");
const dataValidation = require("../data/dataValidation")
var jwt = require('jsonwebtoken');
var xss = require("xss");


router.post("/newuser", async (req, res) => { //route used to create a new user from the signup page in frontend
	try {
		const data = req.body;

		let firstName = xss(data.firstName);
		let lastName = xss(data.lastName);
		let email = xss(data.email);
		let password = xss(data.password);

		console.log(`${email} is trying to create a new Account`);
		
		//Data Validation
		firstName = dataValidation.checkName(firstName);
		lastName = dataValidation.checkName(lastName);
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
		

		var insertedBool = await dataFunctions.createUser(firstName,lastName,email,password);  //calls create user function

		
		console.log(`${data.email} created new account Successfully`);
		res.status(201).send({data:insertedBool, message: "User created successfully" });

	
	} catch (error) {
		res.status(500).send({ message: `Internal Server Error: ${error}` });
	}
});


router.post("/auth", async (req, res) => {
    try{
        let data = req.body;
		let email = xss(data.email);
		let password = xss(data.password);
		console.log(`${email} is trying to Login`);

		//data Validation

		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
        email = email.toLowerCase(); // Makes every Email, Case Insensitive
		
		

		var checkBool = await dataFunctions.checkUser(email,password); //check bool return First name as well
		if(checkBool.authenticated === true){

			const token = jwt.sign({ email:checkBool.email, userName:checkBool.userName }, jwtkey.secret, {
				expiresIn: 86400 // 24 hours
			  });
			console.log(`${checkBool.userName} Logged in Successfully`)
			res.status(200).send({accessToken: token,user:{ email:checkBool.email, userName:checkBool.userName }, message: "logged in successfully" });
		}
        
        
    }
    catch(e){
        res.status(500).send({message: "Internal Server Error"});
    }
});


module.exports = router;

