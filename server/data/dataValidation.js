const emailvalidator = require('email-validator');

const checkName = (string) => {
	if (!string) throw 'No FirstName/LastName';

	if (typeof string != 'string') throw 'Name must be a string Data Type';

	string = string.trim();
	if (string.length === 0) throw 'Cannot have empty a Name';

	if (string.split(' ').length > 1) throw 'Name cannot have spaces inside';

	var letterOnly = /^[a-zA-Z]+$/;
	let result = string.match(letterOnly);

	if (!(result == string && typeof result === 'object'))
		throw 'Name should be Only Alphabets';

	//if(!(string.split("").length >= 4)) throw "Username should have atleast 4 characters";

	return string;
};

const checkEmail = (email) => {
	if (!email) throw 'Please Enter Email';
	email = email.trim();
	if (email.length === 0) throw 'Cannot have empty a Name';
	if (!emailvalidator.validate(email)) throw 'Email Not Valid';
	return email;
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

module.exports = {
	checkName,
	checkEmail,
	checkPassword,
};
