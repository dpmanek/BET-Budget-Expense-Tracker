const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwtkey = require('../config/authconfig');
const dataFunctions = require('../data/users');
const dataValidation = require('../data/dataValidation');
const userDataFunctions = require('../data/getUserInfo');
var jwt = require('jsonwebtoken');
var xss = require('xss');

router.get('/allReviews', async (req, res) => {
	let allReviews = await userDataFunctions.getAllReviews();
	if (allReviews) {
		// console.log("Request Processed Sending All Reviews")
		res.send({ data: allReviews });
	}
});

module.exports = router;
