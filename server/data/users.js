const mongoCollections = require('../config/mongoCollections');
const allUsers = mongoCollections.users;
const bcrypt = require('bcryptjs');
const dataValidation = require('./dataValidation');
const { ObjectId } = require('mongodb');

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
	const userFound = await userCollection.findOne({ email: newEmail });
	if (userFound)
		throw 'User with this Email already exists Please Try another Email';

	//convert password to hashed password
	const hash = await bcrypt.hash(newPassword, 10);

	// insert Details and Hashed password to db

	//Data Schema --Alter this if needed
	let newUser = {
		email: newEmail,
		firstName: newFirstName,
		lastName: newLastName,
		DOB: null,
		password: hash,
		money: {
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
			totalSpendingLimit: null,
		},
	};

	const insertInfo = await userCollection.insertOne(newUser);

	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw ' User was unable to Sign up MongoDB Server Error'; // Not sure about this part confirm once
	else return { userInserted: true };
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

	const userFound = await userCollection.findOne({ email: email });
	//if user not match
	if (userFound === null) throw 'Either the username or password is invalid';

	// if match
	//check if the password is a match using bycrypt
	let passwordMatch = await bcrypt.compare(password, userFound.password);
	if (passwordMatch)
		return {
			authenticated: true,
			email: userFound.email,
			userName: userFound.firstName,
		};
	else throw 'Either the username or password is invalid';
};

const getUser = async (id) => {
	if (!id) throw { code: 400, message: 'Please provide an id. Id is missing' };
	if (typeof id !== 'string')
		throw { code: 400, message: 'Enter ID in string format' };
	if (id.trim().length === 0)
		throw { code: 400, message: 'ID cannot be blank. Please enter a String' };
	id = id.trim();
	if (!ObjectId.isValid(id)) throw { code: 400, message: 'invalid object ID' };
	const userCollection = await allUsers();
	const userData = await userCollection.findOne({ _id: ObjectId(id) });
	if (userData === null) throw { code: 404, message: 'No Band with that id' };
	userData._id = userData._id.toString();

	let userOneTimeIncome = userData.money.Income.OneTime;
	let userRecurringIncome = userData.money.Income.Recurring;
	let userOneTimeExpenditure = userData.money.Expenditure.OneTime;
	let userRecurringExpenditure = userData.money.Expenditure.Recurring;

	if (userOneTimeIncome && userOneTimeIncome.length > 0) {
		for (i in userOneTimeIncome) {
			userOneTimeIncome[i]._id = userOneTimeIncome[i]._id.toString();
		}
	}
	if (userRecurringIncome && userRecurringIncome.length > 0) {
		for (i in userRecurringIncome) {
			userRecurringIncome[i]._id = userRecurringIncome[i]._id.toString();
		}
	}
	if (userRecurringExpenditure && userRecurringExpenditure.length > 0) {
		for (i in userRecurringExpenditure) {
			userRecurringExpenditure[i]._id =
				userRecurringExpenditure[i]._id.toString();
		}
	}
	if (userOneTimeExpenditure && userOneTimeExpenditure.length > 0) {
		for (i in userOneTimeExpenditure) {
			userOneTimeExpenditure[i]._id = userOneTimeExpenditure[i]._id.toString();
		}
	}
	return userData;
};

module.exports = {
	createUser,
	checkUser,
	getUser,
};
