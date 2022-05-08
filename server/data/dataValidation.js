const emailvalidator = require('email-validator');
const { ObjectId } = require('mongodb');

const checkName = (string) => {
	if (!string) throw 'String Undefined';

	if (typeof string != 'string') throw'Name must be a string Data Type';

	string = string.trim();
	if (string.length === 0) throw'Cannot have empty a Name';

	if (string.split(' ').length > 1)throw 'Name cannot have spaces inside';

	var letterOnly = /^[a-zA-Z]+$/;
	let result = string.match(letterOnly);

	if (!(result == string && typeof result === 'object'))
	throw 'Name should be Only Alphabets';

	if(string.split("").length >= 20) throw'Name should have atmost 20 characters';
	if(!(string.split("").length >= 2))throw'Name should have atleast 2 characters';
	return string;
};

const checkEmail = (email) => {
	if (!email)
		throw { code: 400, message: 'Please provide an id. Id is missing' };
	email = email.trim();
	if (email.length === 0)
		throw { code: 400, message: 'ID cannot be blank. Please enter a String' };
	if (typeof email !== 'string')
		throw { code: 400, message: 'Enter ID in string format' };
	if (!emailvalidator.validate(email))
		throw { code: 400, message: 'Email Not Valid' };
	return email;
};
const checkRating = (rating) =>{
	if (!rating) throw ' Please enter a Rating';

	if (typeof rating != 'string') throw 'Rating must be a string';
	rating= rating.trim();
	if(rating.length === 0) throw 'Rating cannot be empty';
	if (rating.split(' ').length > 1) throw 'rating has Spaces inside';
	if (rating.split('.').length > 2) throw 'rating has Multiple Decimal Points';
	rating = parseFloat(rating);
	if (typeof rating != 'number') throw 'Rating must be a Number';
	return rating
};

const checkFeedback = (feedback) => {
	if (!feedback) throw ' Please enter a feedback';

	if (typeof feedback != 'string') throw 'feedback must be a string';
	feedback= feedback.trim();
	if(feedback.length === 0) throw 'feedback cannot be empty';
	return feedback;
}


const checkTransactionName = (String) =>{
	if (!String) throw ' Please enter a Transaction Name';

	if (typeof String != 'string') throw 'Transaction Name must be a string';
	String= String.trim();
	if(String.length === 0) throw 'Transaction Name cannot be empty';
	return String;
}
const checkTransactionDescription = (String) =>{
	if (!String) throw ' Please enter a Transaction Description';

	if (typeof String != 'string') throw 'Transaction Description must be a string';
	String= String.trim();
	if(String.length === 0) throw 'Transaction Description cannot be empty';
	return String;
}
const checkTransactionAmount = (Amount) =>{
	if (!Amount) throw ' Please enter a Amount';

	if (typeof Amount != 'string') throw 'Amount must be a string';
	Amount= Amount.trim();
	if(Amount.length === 0) throw 'Amount cannot be empty';
	if (Amount.split(' ').length > 1) throw 'Amount has Spaces inside';
	if (Amount.split('.').length > 2) throw 'Amount has Multiple Decimal Points';
	Amount = parseFloat(Amount);
	if (typeof Amount != 'number') throw 'Amount must be a Number';
	return Amount
}

const checkAmountinDatafunction = (Amount) =>{
	if (!Amount) throw ' Please enter a Amount';
	Amount = parseFloat(Amount);
	if (typeof Amount != 'number') throw 'Amount must be a Number';
	return Amount
}



const checkTransactionCategory = (string) =>{
	if (!string) throw 'Transaction Category Undefined';

	if (typeof string != 'string') throw'Transaction Category must be a string Data Type';

	string = string.trim();
	if (string.length === 0) throw'Cannot have empty a Transaction Category';

	var letterOnly = /^[a-zA-Z]+$/;
	let result = string.match(letterOnly);

	if (!(result == string && typeof result === 'object'))
	throw 'Transaction Category should be Only Alphabets';
	return string;
}

const checkTransactionDate = (date) =>{
	if(!date) throw "Date not Provided"
	if (typeof date != 'string') throw'Date not String type'
	date = date.trim();
	if (date.length === 0) throw'Cannot have empty Date';
	if (Date(date) !== 'Invalid Date' && !isNaN(new Date(date))) {
		let splitDate = date.split('/');
		if (splitDate.length === 3) {
			if (
				(splitDate[0].length, splitDate[1].length !== 2) ||
				splitDate[2].length !== 4
			)
				throw 'Release date need to be in the format of MM/DD/YYY';
			if (splitDate[2] < 1900 || splitDate[2] > 2023)
				throw 'Only years 1900-2023 are valid values';
			return date;
		}
	} else throw 'Invalid Date Format needs to be MM/DD/YYYY';
}
const checkTransactionDateReportGeneration = (date) =>{
	if(!date) throw "Date not Provided"
	if (typeof date != 'string') throw'Date not String type'
	date = date.trim();
	if (date.length === 0) throw'Cannot have empty Date';
	if (Date(date) !== 'Invalid Date' && !isNaN(new Date(date))) {
		let splitDate = date.split('-');
		if (splitDate.length === 3) {
			if (
				(splitDate[1].length, splitDate[2].length !== 2) ||
				splitDate[0].length !== 4
			)
				throw 'Release date need to be in the format of MM/DD/YYY';
			if (splitDate[0] < 1900 || splitDate[0] > 2023)
				throw 'Only years 1900-2023 are valid values';
			return date;
		}
	} else throw 'Invalid Date Format';
}


const checkPassword = (password) => {
	// check if we have to trim
	if (!password) throw ' Please enter a password';

	if (typeof password != 'string') throw 'Password must be a string';

	password = password.trim();
	if (password.length === 0) throw 'Cannot have empty Password';

	if (password.split(' ').length > 1) throw 'Password has Spaces inside';

	var letterNumber = /^[0-9a-zA-Z!@#$%^&*(),.?":{}|<>]+$/; //not sure what all is considred as special char confirm once on slack
	let result = password.match(letterNumber);
	if (!(result == password && typeof result === 'object'))
		throw 'Password can include AlphaNumeric and have Special Chars';

	if (!(password.split('').length >= 6))
		throw 'Password should have atleast 6 characters';
};

const checkTransactionID = (id)=>{
	if (!id) throw `Error: You must provide a valid ID`;
	if (typeof id !== 'string') throw 'Id must be a string';
	if (id.trim().length === 0)
		throw 'Id cannot be an empty string or just spaces';
	id = id.trim();
	if (!ObjectId.isValid(id)) throw 'invalid object ID';
	return id;
}


const createIncome = (email, name, description, tags, amount, type, date) => {
	if (!email || !name || !description || !tags || !amount || !type || !date)
		throw { code: 400, message: 'All fields need to have valid values' };

	if (typeof name !== 'string')
		throw { code: 400, message: 'Enter Expense name in a string format' };

	if (name.trim().length === 0)
		throw {
			code: 400,
			message: 'Expense name cannot be blank. Please enter a String',
		};

	if (typeof description !== 'string')
		throw { code: 400, message: 'Enter description in a string format' };

	if (description.trim().length === 0)
		throw {
			code: 400,
			message: 'Description cannot be blank. Please enter a String',
		};

	if (typeof tags !== 'string')
		throw { code: 400, message: 'Enter Category in a string format' };

	if (tags.trim().length === 0)
		throw {
			code: 400,
			message: 'Category cannot be blank. Please enter a String',
		};

	if (typeof type !== 'string')
		throw {
			code: 400,
			message:
				'Please select whether the Expense is recurring or not from the toggle button provided in the form',
		};

	if (tags.trim().length === 0)
		throw {
			code: 400,
			message:
				'Tags cannot be blank. Please select whether the Expense is recurring or not from the toggle button provided in the form',
		};

	if (typeof date !== 'string')
		throw { code: 400, message: 'Enter date in a string format' };

	if (date.trim().length === 0)
		throw {
			code: 400,
			message:
				'Date cannot be blank. Please enter a String in MM/DD/YYYY format',
		};

	if (typeof amount !== 'number') {
		throw { code: 400, message: 'Enter amount in a number format' };
	}
};
module.exports = {
	checkName,
	checkEmail,
	checkPassword,
	createIncome,
	checkRating,
	checkFeedback,
	checkTransactionName,
	checkTransactionDescription,
	checkTransactionAmount,
	checkTransactionCategory,
	checkTransactionDate,
	checkAmountinDatafunction,
	checkTransactionID,
	checkTransactionDateReportGeneration,
};
