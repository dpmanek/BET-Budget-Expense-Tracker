const login = require('./login')

const constructorMethod = (app) => {
	app.use('', login);


	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
