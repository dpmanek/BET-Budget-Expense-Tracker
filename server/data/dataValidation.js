const emailvalidator = require('email-validator');

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

	// if()
};

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
};
