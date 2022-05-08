const router = require('express').Router();
const userDataFunctions = require('../data/getUserInfo')


router.get('/allReviews', async (req, res) => {
	let allReviews = undefined;
	try{
	 allReviews = await userDataFunctions.getAllReviews();
	}
	catch(e){
		return res.status(400).send({ Message: 'Something Went Wrong'});
	}
	try{
	if (allReviews) {
		// console.log("Request Processed Sending All Reviews")
		res.status(200).send({ data: allReviews });
	}
}
catch(e){
	res.status(400).send({ Message: 'Something Went Wrong'});
}
}
);

module.exports = router;
