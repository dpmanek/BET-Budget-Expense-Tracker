
const usersRoutes = require('./users');

const constructorMethod = (app) => {
	
	app.use('/users', usersRoutes); // Login/Signup (API)Routes


	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
