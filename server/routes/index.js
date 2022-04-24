
const usersRoutes = require('./users');
const userDataRoutes = require('./userData')

const constructorMethod = (app) => {
	
	app.use('/users', usersRoutes); // Login/Signup (API)Routes
	app.use('/users/data', userDataRoutes); // verify user and get specific data 

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
