const router = require("express").Router();
const bcrypt = require("bcryptjs");



//Auth Mern
// Checks if users exist
// if true generates a web token 
// need to modify this 
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

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