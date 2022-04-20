const loginRoutes = require('./login')
const authRoutes = require('./auth');

const constructorMethod = (app) => {
	app.use('/users', loginRoutes);
	app.use('/auth', authRoutes);


	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not Found' });
	});
};

module.exports = constructorMethod;
