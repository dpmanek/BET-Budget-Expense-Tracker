const router = require("express").Router();


// route will be used to get all the specific data


router.get("/", async (req, res) => { 
	res.send({User: 'Data of specific user'});
});

module.exports = router;