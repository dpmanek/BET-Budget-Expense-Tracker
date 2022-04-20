const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dataFunctions = require("../data/users");


//Auth Mern
// Checks if users exist
// if true generates a web token 
// need to modify this 
router.post("/newuser", async (req, res) => { //route used to create a new user from the signup page in frontend
	try {
		const data = req.body;
		console.log(data.firstName);
		console.log(data.lastName);
		console.log(data.email);
		console.log(data.password);

		let firstName = data.firstName;
		let lastName = data.lastName;
		let email = data.email;
		let password = data.password;
		// add data validation


		var insertedBool = await dataFunctions.createUser(firstName,lastName,email,password);  //calls create user function


		res.status(200).send({data: insertedBool, message: "logged in successfully" });


		

		//const token = user.generateAuthToken();    Auth in mern using this 
		//res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: `Internal Server Error: ${error}` });
	}
});



router.post("/", async (req, res) => {
    try{
        //AuthMern  
        // Creates a new user and stores the user in the database
        /*
        const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email }); // checks if email already exists
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt); // creates hashed pass

		await new User({ ...req.body, password: hashPassword }).save(); // creates new user
		res.status(201).send({ message: "User created successfully" });
        */
        
    }
    catch(e){
        res.status(500).send({message: "Internal Server Error"});
    }
});






router.get('/', async (req, res) => {});
router.get('/signup', async (req, res) => {});

router.post('/signup', async (req, res) => {});

module.exports = router;