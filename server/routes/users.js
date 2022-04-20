const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dataFunctions = require("../data/users");
const dataValidation = require("../data/dataValidation")


router.post("/newuser", async (req, res) => { //route used to create a new user from the signup page in frontend
	try {
		const data = req.body;
		console.log(`${data.email} is trying to create a new Account`);

		let firstName = data.firstName;
		let lastName = data.lastName;
		let email = data.email;
		let password = data.password;
		
		//Data Validation
		firstName = dataValidation.checkName(firstName);
		lastName = dataValidation.checkName(lastName);
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
		

		var insertedBool = await dataFunctions.createUser(firstName,lastName,email,password);  //calls create user function

		
		
		res.status(201).send({data:insertedBool, message: "User created successfully" });

		

		//const token = user.generateAuthToken();    Auth in mern using this 
		//res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: `Internal Server Error: ${error}` });
	}
});



router.post("/auth", async (req, res) => {
    try{
        let data = req.body;
		let email = data.email;
		let password = data.password;
		console.log(`${email} is trying to Login`);

		//data Validation

		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
        email = email.toLowerCase(); // Makes every Email, Case Insensitive
		
		

		var checkBool = await dataFunctions.checkUser(email,password); //check bool return First name as well
		if(checkBool.authenticated === true){
			req.session.user = {'username': checkBool.userName};
		}
        
        res.status(200).send({data: checkBool, message: "logged in successfully" });
    }
    catch(e){
        res.status(500).send({message: "Internal Server Error"});
    }
});






router.get('/', async (req, res) => {});
router.get('/signup', async (req, res) => {});

router.post('/signup', async (req, res) => {});

module.exports = router;