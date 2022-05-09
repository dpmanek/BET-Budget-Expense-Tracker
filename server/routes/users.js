const router = require('express').Router();
const jwtkey = require('../config/authconfig');
const dataFunctions = require('../data/users');
const dataValidation = require('../data/dataValidation');
var jwt = require('jsonwebtoken');
var xss = require('xss');

router.post('/newuser', async (req, res) => {
	//route used to create a new user from the signup page in frontend
	let data = undefined;

	try {
		if (req.body) data = req.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let firstName = xss(data.firstName);
	let lastName = xss(data.lastName);
	let email = xss(data.email);
	let password = xss(data.password);

	try {
		if (!firstName) throw 'No FirstName';
		if (!lastName) throw 'No LastName';
		if (!email) throw 'No Email';
		if (!password) throw 'No Password';

		firstName = dataValidation.checkName(firstName);
		lastName = dataValidation.checkName(lastName);
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);

		console.log(`${email} is trying to create a new Account`);
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
	try {
		var insertedBool = await dataFunctions.createUser(
			firstName,
			lastName,
			email,
			password
		); //calls create user function
		if (insertedBool) {
			console.log(`${data.email} created new account Successfully`);
			res
				.status(201)
				.send({ data: insertedBool, message: 'User created successfully' });
		} else throw 'User Not Created';
	} catch (e) {
		return res.status(400).send({ Error: e });
	}
});

router.post('/auth', async (req, res) => {
	let data = undefined;
	try {
		if (req.body) data = req.body;
		else throw 'No Request Body';
	} catch (e) {
		return res.status(204).send({ Error: e });
	}
	let email = xss(data.email);
	let password = xss(data.password);
	try {
		if (!email) throw 'No Email';
		if (!password) throw 'No Password';
		email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
		console.log(`${email} is trying to Login`);
		email = email.toLowerCase();
	} catch (e) {
		return res.status(400).send({ Error: e });
	}

	try {
		var checkBool = await dataFunctions.checkUser(email, password); //check bool return First name as well
		if (checkBool.authenticated === true) {
			const token = jwt.sign(
				{ email: checkBool.email, userName: checkBool.userName },
				jwtkey.secret,
				{
					expiresIn: 86400, // 24 hours
				}
			);
			console.log(`${checkBool.userName} Logged in Successfully`);
			res.status(200).send({
				accessToken: token,
				user: { email: checkBool.email, userName: checkBool.userName },
				message: 'logged in successfully',
			});
		}
	} catch (e) {
		return res.status(404).send({ Error: e });
	}
});

module.exports = router;
