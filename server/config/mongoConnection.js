const MongoClient = require('mongodb').MongoClient;

const settings = require('./settings');

let _connection = undefined;
let _db = undefined;

const connectToDb = async () => {
	if (!_connection) {
		_connection = await MongoClient.connect(settings.mongoConfig.serverUrl);
		_db = await _connection.db(settings.mongoConfig.database);
	}
	return _db;
};

const closeConnection = () => {
	_connection.close();
};

module.exports = {
	connectToDb,
	closeConnection,
};
