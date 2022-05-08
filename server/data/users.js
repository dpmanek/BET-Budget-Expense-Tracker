const mongoCollections = require('../config/mongoCollections');
const allUsers = mongoCollections.users;
const bcrypt = require('bcryptjs');
const dataValidation = require('./dataValidation');
const { ObjectId } = require('mongodb');
const Mailer = require('./mail');

const createUser = async (newFirstName, newLastName, newEmail, newPassword) => {
	if (!newFirstName) throw 'No FirstName';
	if (!newLastName) throw 'No LastName';
	if (!newEmail) throw 'No Username';
	if (!newPassword) throw 'No Password';

	//Datavalidation calls
	newFirstName = dataValidation.checkName(newFirstName);
	newLastName = dataValidation.checkName(newLastName);
	newEmail = dataValidation.checkEmail(newEmail);
	dataValidation.checkPassword(newPassword);
	newEmail = newEmail.toLowerCase(); // Makes every Email, Case Insensitive

	const userCollection = await allUsers();
	//checks if user with the same email already exists
	const userFound = await userCollection.findOne({ Email: newEmail });
	if (userFound)
		throw 'User with this Email already exists Please Try another Email';

	//convert password to hashed password
	const hash = await bcrypt.hash(newPassword, 10);

	// insert Details and Hashed password to db

	//Data Schema --Alter this if needed
	let newUser = {
		Email: newEmail,
		FirstName: newFirstName,
		LastName: newLastName,
		DOB: null,
		Password: hash,
		Money: {
			Income: {
				Recurring: [],
				OneTime: [],
				totalIncome: null,
			},
			Expenditure: {
				Recurring: [],
				OneTime: [],
				totalExpenditure: null,
			},
			TotalSpendingLimit: null,
			SetAsideMoney: [],
		},
		Review: {
			Rating: null,
			Feedback: '',
		},
	};

	const insertInfo = await userCollection.insertOne(newUser);

	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw ' User was unable to Sign up MongoDB Server Error'; // Not sure about this part confirm once
	else {
		let UserCreatedSubject = `BET: New Account Created!!`;
		let UserCreatedBody = `New Account Created Name: ${newFirstName} ${newLastName} Email: ${newEmail} Welcome To BET, Thank you for Registering. Saving Money Just Got Easier!!!.`;
		Mailer.sendEmail(newEmail, UserCreatedSubject, UserCreatedBody);
		return { userInserted: true };
	}
};

const checkUser = async (email, password) => {
	if (!email) throw 'No Email Please enter email';
	if (!password) throw 'No Password Please enter password';

	//data validation;
	email = dataValidation.checkEmail(email);
	dataValidation.checkPassword(password);
	email = email.toLowerCase(); // Makes every Email, Case Insensitive

	// checks if Email exists
	const userCollection = await allUsers();

	const userFound = await userCollection.findOne({ Email: email });
	//if user not match
	if (userFound === null) throw 'Either the username or password is invalid';

	// if match
	//check if the password is a match using bycrypt
	let passwordMatch = await bcrypt.compare(password, userFound.Password);
	if (passwordMatch)
		return {
			authenticated: true,
			email: userFound.Email,
			userName: userFound.FirstName,
		};
	else throw 'Either the username or password is invalid';
};

module.exports = {
	createUser,
	checkUser,
};
