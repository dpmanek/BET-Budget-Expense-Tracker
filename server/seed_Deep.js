const connection = require('./config/mongoConnection');
//const data = require('../data/'); //generalizing it later
const transactions = require('./data/transactions');
//const { albums } = require('./config/mongoCollections');

async function main() {





	const db = await connection.dbConnection();
	// await db.dropDatabase();

	let income = undefined;
	try {
		income = await transactions.createIncome(null,null,null,null,null,"recurring");
				console.log(income);
	} catch (e) {
		console.log(e);
	}


	console.log('Done seeding database');

	await connection.closeConnection();
}

main();
