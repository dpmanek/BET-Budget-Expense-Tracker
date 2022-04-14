const express = require('express');
const router = express.Router();
// const user = require("../data/users"); imports my function

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
