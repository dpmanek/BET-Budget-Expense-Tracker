const dbConnection = require('./mongoConnection');

const getCollectionFn = (Collection) => {
	let _col = undefined;
	return async () => {
		if (!_col) {
			const db = await dbConnection.connectToDb();
			_col = await db.collection(Collection);
		}

		return _col;
	};
};

module.exports = {
	// Add Collections Here
	Users: getCollectionFn('Users')
};
