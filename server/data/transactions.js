const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.users;
const moment = require('moment');
//const bands = require('./bands');
const users = require('./users');
//const errorChecking = require('../errorChecking'); //create one for transactions
const { ObjectId } = require('mongodb');
const dataValidation = require('./dataValidation');

const createIncome = async (userId, name, description, tags, amount, type) => {
	let UserId = !userId ? 'kevin1@gmail.com' : userId;
	let Name = !name ? 'icecream' : name;
	let Description = !description ? 'vanilla' : description;
	let Tags = !tags ? 'sometag' : tags;
	let Amount = !amount ? 500 : amount;

	let TranactionDate = new Date();
	TranactionDate.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});
	let date = moment(TranactionDate).format('MM/DD/YYYY');

	let Type = !type ? 'OneTime' : type;
	/*errorChecking*/

	// try {
	// 	await errorChecking.errorCreateAlbum(
	// 		bandId,
	// 		title,
	// 		releaseDate,
	// 		tracks,
	// 		rating
	// 	);
	// } catch (e) {
	// 	throw e;
	// }

	/*Logic to trim and insert ----------------*/
	// for (i in tracks) {
	// 	tracks[i] = tracks[i].trim();
	// }

	//Trim all the string before inserting
	// title = title.trim();
	// releaseDate = releaseDate.trim();

	//let albumCollection = await albums();
	let UserCollection = await Users();

	// Transaction_Date: tracks,

	let income = {
		_id: ObjectId(),
		Name: Name,
		Description: Description,
		Tags: Tags,
		Amount: Amount,
		TranactionDate: date,
	};

	if (Type === 'OneTime') {
		const data = await UserCollection.updateOne(
			{ Email: UserId },
			{ $addToSet: { 'Money.Income.OneTime': income } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'could not add album to band',
			};

		return 'Done OneTime';
	}

	if (Type === 'Recurring') {
		const data = await UserCollection.updateOne(
			{ Email: UserId},
			{ $addToSet: { 'Money.Income.Recurring': income } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'could not add album to band',
			};
		return 'Done recurring';
	}
};

const createExpense = async (
	userId,
	name,
	description,
	tags,
	payment,
	amount,
	type
) => {
	let UserId = !userId ? 'kevin1@gmail.com' : userId;
	let Name = !name ? 'icecream' : name;
	let Description = !description ? 'vanilla' : description;
	let Tags = !tags ? 'sometag' : tags;
	let Payment = !payment ? 'credit card' : payment;
	let Amount = !amount ? 500 : amount;

	let TranactionDate = new Date();
	TranactionDate.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});
	let date = moment(TranactionDate).format('MM/DD/YYYY');

	let Type = !type ? 'OneTime' : type;
	/*errorChecking*/

	// try {
	// 	await errorChecking.errorCreateAlbum(
	// 		bandId,
	// 		title,
	// 		releaseDate,
	// 		tracks,
	// 		rating
	// 	);
	// } catch (e) {
	// 	throw e;
	// }

	/*Logic to trim and insert ----------------*/
	// for (i in tracks) {
	// 	tracks[i] = tracks[i].trim();
	// }

	//Trim all the string before inserting
	// title = title.trim();
	// releaseDate = releaseDate.trim();

	//let albumCollection = await albums();
	let UserCollection = await Users();

	// Transaction_Date: tracks,

	let expense = {
		_id: ObjectId(),
		Name: Name,
		Description: Description,
		Tags: Tags,
		TranactionDate: date,
		Payment: payment,
		Amount: Amount,
		Comments: 'nothing',
	};

	if (type === 'OneTime') {
		const data = await UserCollection.updateOne(
			{ Email: UserId },
			{ $addToSet: { 'Money.Expenditure.OneTime': expense } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'could not add album to band',
			};

		return 'Done OneTime';
	}

	if (type === 'Recurring') {
		const data = await UserCollection.updateOne(
			{ Email: UserId  },
			{ $addToSet: { 'Money.Expenditure.Recurring': expense } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'could not add album to band',
			};
		return 'Done recurring';
	}
};

const updateTotalIncome = async (UserId) => {
	if(!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);

	//add data validation
	let totalIncome = 0;

	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ email: UserId });
	if (userFound){
		let incomeRecurring = userFound.money.income.recurring;
		let incomeOneTime = userFound.money.income.OneTime;
		
		if(incomeRecurring && incomeRecurring.length >= 1){
			for(i in incomeRecurring){
				totalIncome += incomeRecurring[i].Amount
			}
		}
		if(incomeOneTime && incomeOneTime.length >= 1){
			for(i in incomeOneTime){
				totalIncome += incomeOneTime[i].Amount
			}
		}

		const data = await UserCollection.updateOne(
			{ email: UserId },
			{ $set: { 'money.income.totalIncome': totalIncome} }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'Could Not Update Total Income',
			};
		return 'Total Income Updated';
	}
	else throw {
		code: 400,
		message: 'User Not Found',
	};
}

const updateTotalExpense = async (UserId) => {
	if(!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);

	//add data validation
	let totalExpense = 0;

	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ email: UserId });
	if (userFound){
		let expenseRecurring = userFound.money.Expenditure.recurring;
		let expenseOneTime = userFound.money.Expenditure.OneTime;
		
		if(expenseRecurring && expenseRecurring.length >= 1){
			for(i in expenseRecurring){
				totalExpense += expenseRecurring[i].Amount
			}
		}
		if(expenseOneTime && expenseOneTime.length >= 1){
			for(i in expenseOneTime){
				totalExpense += expenseOneTime[i].Amount
			}
		}

		const data = await UserCollection.updateOne(
			{ email: UserId },
			{ $set: { 'money.Expenditure.totalExpenditure': totalExpense} }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'Could Not Update Total Income',
			};
		return 'Total Income Updated';
	}
	else throw {
		code: 400,
		message: 'User Not Found',
	};
}

const deleteIncome = async (UserId, transactionID) => { 

	if(!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);

	if(!transactionID) throw "No Transaction ID";
	// write data function to check transaction ID
	let deletedflag = false
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ email: UserId });
	if (userFound){
		
		let incomeRecurring = userFound.money.income.recurring;
		let incomeOneTime = userFound.money.income.OneTime;
		
		if(incomeRecurring && incomeRecurring.length >= 1){
			for(i in incomeRecurring){
				if(incomeRecurring[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $pull: { 'money.income.recurring':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
						deletedflag = true
				}
			}
		}
		if(incomeOneTime && incomeOneTime.length >= 1){
			for(i in incomeOneTime){
				if(incomeOneTime[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $pull: { 'money.income.OneTime':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
									deletedflag = true	
				}
			}
		}
		if(deletedflag === true){
			return 'Deleted Transaction';
		}
		else{
			throw `No Transaction of ${transactionID} ID Exists`
		}

	}
	else throw {
		code: 400,
		message: 'User Not Found',
	};

}
const deleteExpense = async (UserId, transactionID) => {
	if(!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);

	if(!transactionID) throw "No Transaction ID";
	// write data function to check transaction ID
	let deletedflag = false
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ email: UserId });
	if (userFound){
		
		let expenseRecurring = userFound.money.Expenditure.recurring;
		let expenseOneTime = userFound.money.Expenditure.OneTime;
		
		if(expenseRecurring && expenseRecurring.length >= 1){
			for(i in expenseRecurring){
				if(expenseRecurring[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $pull: { 'money.Expenditure.recurring':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
						deletedflag = true
				}
			}
		}
		if(expenseOneTime && expenseOneTime.length >= 1){
			for(i in expenseOneTime){
				if(expenseOneTime[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $pull: { 'money.Expenditure.OneTime':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
									deletedflag = true	
				}
			}
		}
		if(deletedflag === true){
			return 'Deleted Transaction';
		}
		else{
			throw `No Transaction of ${transactionID} ID Exists`
		}

	}
	else throw {
		code: 400,
		message: 'User Not Found',
	};
}
const updateIncome = async (UserId, transactionID) => {

}
const updateExpense = async (UserId, transactionID,Name,Description,Tags,payment,Amount,Comments) => {
	
	if(!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);

	if(!transactionID) throw "No Transaction ID";
	// write data function to check transaction ID
	let deletedflag = false
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ email: UserId });
	if (userFound){
		
		let expenseRecurring = userFound.money.Expenditure.recurring;
		let expenseOneTime = userFound.money.Expenditure.OneTime;
		
		if(expenseRecurring && expenseRecurring.length >= 1){
			for(i in expenseRecurring){
				if(expenseRecurring[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $set: { 'money.Expenditure.recurring':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
						deletedflag = true
				}
			}
		}
		if(expenseOneTime && expenseOneTime.length >= 1){
			for(i in expenseOneTime){
				if(expenseOneTime[i]._id === transactionID){
					const data = await UserCollection.updateOne(
						{ email: UserId },
						{ $pull: { 'money.Expenditure.OneTime':{_id: transactionID}} });
						if (!data.acknowledged || data.modifiedCount === 0)
							throw {
									code: 400,
									message: `Could Not Delete Transaction:${transactionID} `,
									};
									deletedflag = true	
				}
			}
		}
		if(deletedflag === true){
			return 'Deleted Transaction';
		}
		else{
			throw `No Transaction of ${transactionID} ID Exists`
		}

	}
	else throw {
		code: 400,
		message: 'User Not Found',
	};
}

const getIncome = async (UserId) => {

}
const getExpense = async (UserId, transactionID) => {

}

module.exports = {
	createIncome,
	createExpense,
	updateTotalIncome,
	updateTotalExpense,
	deleteIncome,
	deleteExpense,
	updateIncome,
	updateExpense
};


// const getAll = async (bandId) => {
// 	let band = undefined;
// 	try {
// 		band = await bands.get(bandId);
// 	} catch (e) {
// 		throw e;
// 	}

// 	let allAlbums = band.albums;
// 	if (!allAlbums) throw { code: 404, message: 'No Albums in this band' };
// 	if (allAlbums && allAlbums.length > 0) {
// 		for (i in allAlbums) {
// 			allAlbums[i]._id = allAlbums[i]._id.toString();
// 		}
// 	}

// 	return allAlbums;
// 	//return 'done with getAll albums';
// };
// const get = async (albumId) => {
// 	if (!albumId) throw 'Please provide a valid Album ID';
// 	if (typeof albumId !== 'string') throw 'Enter Album ID in string format';
// 	if (albumId.trim().length === 0)
// 		throw 'Album ID cannot be blank. Please enter a String';
// 	albumId = albumId.trim();
// 	if (!ObjectId.isValid(albumId)) throw 'Invalid object ID';

// 	let band = await Bands();
// 	/** Logic to find album from band with looops */
// 	// const bandData = await band.findOne({ 'albums._id': ObjectId(albumId) });
// 	// let finalAlbum = {};
// 	// temp = bandData.albums;

// 	// for (i in temp) {
// 	// 	if (temp[i]._id.toString() === albumId) {
// 	// 		finalAlbum = temp[i];
// 	// 	}
// 	// }

// 	/** Logic to find album with out loops */

// 	const bandData2 = await band.findOne(
// 		{ 'albums._id': ObjectId(albumId) },
// 		{
// 			projection: {
// 				_id: 0,
// 				albums: 1,
// 				// '_albums._id': 1,
// 				// 'albums.title': 1,
// 				// 'albums.releaseDate': 1,
// 				// 'albums.tracks': 1,
// 				// 'albums.rating': 1,
// 			},
// 		}
// 	);
// 	if (bandData2 === null) {
// 		throw ' No Such album id exists';
// 	} else {
// 		temp = bandData2.albums;

// 		for (i in temp) {
// 			if (temp[i]._id.toString() === albumId) {
// 				finalAlbum = temp[i];
// 			}
// 		}
// 		//	let bandData3 = await bandData2.toArray();
// 		//console.log(bandData2);

// 		finalAlbum._id = finalAlbum._id.toString();
// 		return finalAlbum;
// 		//return bandData2;
// 	}
// };

// const remove = async (albumId) => {
// 	try {
// 		errorChecking.errorGetAlbumId(albumId);
// 	} catch (e) {
// 		throw e;
// 	}

// 	let Bandid = await getBandId(albumId);
// 	//console.log('Album ID iS::::' + albumId);
// 	//console.log('Band ID iS::::' + Bandid);
// 	let bandsCollection = await Bands();

// 	const data = await bandsCollection.updateOne(
// 		{ _id: ObjectId(Bandid) },
// 		{ $pull: { albums: { _id: ObjectId(albumId) } } }
// 	);
// 	if (!data.matchedCount && !data.modifiedCount)
// 		throw {
// 			code: 400,
// 			message: 'Update failed',
// 		};
// 	else {
// 		let bandData = await bands.get(Bandid);
// 		let overallR = 0;
// 		bandData.albums.forEach((e) => {
// 			overallR = overallR + e.rating;
// 		});

// 		const data2 = await bandsCollection.updateOne(
// 			{ _id: ObjectId(Bandid) },
// 			{ $set: { overallRating: overallR } }
// 		);

// 		if (!data2.acknowledged || data2.modifiedCount === 0)
// 			throw {
// 				code: 400,
// 				message: 'could not update Overall Rating',
// 			};

// 		// let insertedalbum = await get(album._id.toString());
// 		// insertedalbum._id = insertedalbum._id.toString();
// 		// return insertedalbum;

// 		let updatedBand = bands.get(Bandid);
// 		return updatedBand;
// 	}
// };

// const getBandId = async (albumId) => {
// 	try {
// 		await errorChecking.errorGetAlbumId(albumId);
// 	} catch (e) {
// 		throw e;
// 	}
// 	albumId = albumId.trim();

// 	let band = await Bands();

// 	const bandData2 = await band.findOne({ 'albums._id': ObjectId(albumId) });
// 	if (bandData2 === null) {
// 		throw ' No Such album id exists';
// 	} else {
// 		let temp = bandData2._id;
// 		let bandId = temp.toString();
// 		//	console.log(bandId);
// 		return bandId;
// 	}
// };