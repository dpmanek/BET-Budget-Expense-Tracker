const mongoCollections = require('../config/mongoCollections');
const Users = mongoCollections.users;
const dataValidation = require('./dataValidation');

//const errorChecking = require('../errorChecking'); //create one for transactions
const { ObjectId } = require('mongodb');

const createIncome = async (
	UserId,
	Name,
	Description,
	Tags,
	Amount,
	Type,
	Date
) => {
	/*errorChecking*/
	if (!UserId) throw 'No Email';
	if (!Name) throw 'No Name';
	if (!Tags) throw 'No Tags';
	if (!Amount) throw 'No Amount';
	if (!Type) throw 'type';
	if (!Date) throw 'No Date';

	if (Description) Description = dataValidation.checkTransactionDescription;
	else Description = null;
	UserId = dataValidation.checkEmail(UserId);
	Name = dataValidation.checkTransactionName(Name);
	Tags = dataValidation.checkTransactionCategory(Tags);
	Date = dataValidation.checkTransactionDate(Date);

	if (!Type === 'Recurring' && !Type === 'Recurring') throw 'type is Invalid';
	Amount = dataValidation.checkAmountinDatafunction(Amount);

	let UserCollection = await Users();

	let income = {
		_id: ObjectId(),
		Name: Name,
		Description: Description,
		Tags: Tags,
		Amount: Amount,
		TranactionDate: Date,
		Type: Type,
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
			{ Email: UserId },
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
	UserId,
	Name,
	Description,
	Tags,
	Amount,
	type,
	Date
) => {
	if (!UserId) throw 'No Email';
	if (!Name) throw 'No Name';
	if (!Tags) throw 'No Tags';
	if (!Amount) throw 'No Amount';
	if (!type) throw 'type';
	if (!Date) throw 'No Date';

	if (Description) Description = dataValidation.checkTransactionDescription;
	else Description = null;
	UserId = dataValidation.checkEmail(UserId);
	Name = dataValidation.checkTransactionName(Name);
	Tags = dataValidation.checkTransactionCategory(Tags);
	Date = dataValidation.checkTransactionDate(Date);

	if (!type === 'Recurring' && !type === 'Recurring') throw 'type is Invalid';
	Amount = dataValidation.checkAmountinDatafunction(Amount);

	let UserCollection = await Users();

	let expense = {
		_id: ObjectId(),
		Name: Name,
		Description: Description,
		Tags: Tags,
		TranactionDate: Date,
		Amount: Amount,
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
			{ Email: UserId },
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
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);

	//add data validation
	let totalIncome = 0;

	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let incomeRecurring = userFound.Money.Income.Recurring;
		let incomeOneTime = userFound.Money.Income.OneTime;

		if (incomeRecurring && incomeRecurring.length >= 1) {
			for (i in incomeRecurring) {
				totalIncome += incomeRecurring[i].Amount;
			}
		}
		if (incomeOneTime && incomeOneTime.length >= 1) {
			for (i in incomeOneTime) {
				totalIncome += incomeOneTime[i].Amount;
			}
		}

		const data = await UserCollection.updateOne(
			{ Email: UserId },
			{ $set: { 'Money.Income.totalIncome': totalIncome } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'Could Not Update Total Income',
			};
		return 'Total Income Updated';
	} else
		throw {
			code: 400,
			message: 'User Not Found',
		};
};

const updateTotalExpense = async (UserId) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);

	//add data validation
	let totalExpense = 0;

	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let expenseRecurring = userFound.Money.Expenditure.Recurring;
		let expenseOneTime = userFound.Money.Expenditure.OneTime;

		if (expenseRecurring && expenseRecurring.length >= 1) {
			for (i in expenseRecurring) {
				totalExpense += expenseRecurring[i].Amount;
			}
		}
		if (expenseOneTime && expenseOneTime.length >= 1) {
			for (i in expenseOneTime) {
				totalExpense += expenseOneTime[i].Amount;
			}
		}

		const data = await UserCollection.updateOne(
			{ Email: UserId },
			{ $set: { 'Money.Expenditure.totalExpenditure': totalExpense } }
		);

		if (!data.acknowledged || data.modifiedCount === 0)
			throw {
				code: 400,
				message: 'Could Not Update Total Income',
			};
		return 'Total Income Updated';
	} else
		throw {
			code: 400,
			message: 'User Not Found',
		};
};

const deleteIncome = async (UserId, transactionID) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	if (!transactionID) throw 'No Transaction ID';
	transactionID = dataValidation.checkTransactionID(transactionID);
	let deletedflag = false;
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let incomeRecurring = userFound.Money.Income.Recurring;
		let incomeOneTime = userFound.Money.Income.OneTime;

		if (incomeRecurring && incomeRecurring.length >= 1) {
			for (i in incomeRecurring) {
				if (incomeRecurring[i]._id.toString() === transactionID) {
					const data = await UserCollection.updateOne(
						{ Email: UserId },
						{
							$pull: {
								'Money.Income.Recurring': { _id: ObjectId(transactionID) },
							},
						}
					);
					if (!data.acknowledged || data.modifiedCount === 0)
						throw {
							code: 400,
							message: `Could Not Delete Transaction:${transactionID} `,
						};
					deletedflag = true;
				}
			}
		}
		if (incomeOneTime && incomeOneTime.length >= 1) {
			for (i in incomeOneTime) {
				if (incomeOneTime[i]._id.toString() === transactionID) {
					const data = await UserCollection.updateOne(
						{ Email: UserId },
						{
							$pull: {
								'Money.Income.OneTime': { _id: ObjectId(transactionID) },
							},
						}
					);
					if (!data.acknowledged || data.modifiedCount === 0)
						throw {
							code: 400,
							message: `Could Not Delete Transaction:${transactionID} `,
						};
					deletedflag = true;
				}
			}
		}
		if (deletedflag === true) {
			return 'Deleted Transaction';
		} else {
			throw `No Transaction of ${transactionID} ID Exists`;
		}
	} else
		throw {
			code: 400,
			message: 'User Not Found',
		};
};
const deleteExpense = async (UserId, transactionID) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	if (!transactionID) throw 'No Transaction ID';
	transactionID = dataValidation.checkTransactionID(transactionID);
	let deletedflag = false;
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let expenseRecurring = userFound.Money.Expenditure.Recurring;
		let expenseOneTime = userFound.Money.Expenditure.OneTime;

		if (expenseRecurring && expenseRecurring.length >= 1) {
			for (i in expenseRecurring) {
				if (expenseRecurring[i]._id.toString() === transactionID) {
					const data = await UserCollection.updateOne(
						{ Email: UserId },
						{
							$pull: {
								'Money.Expenditure.Recurring': { _id: ObjectId(transactionID) },
							},
						}
					);
					if (!data.acknowledged || data.modifiedCount === 0)
						throw {
							code: 400,
							message: `Could Not Delete Transaction:${transactionID} `,
						};
					deletedflag = true;
				}
			}
		}
		if (expenseOneTime && expenseOneTime.length >= 1) {
			for (i in expenseOneTime) {
				if (expenseOneTime[i]._id.toString() === transactionID) {
					const data = await UserCollection.updateOne(
						{ Email: UserId },
						{
							$pull: {
								'Money.Expenditure.OneTime': { _id: ObjectId(transactionID) },
							},
						}
					);
					if (!data.acknowledged || data.modifiedCount === 0)
						throw {
							code: 400,
							message: `Could Not Delete Transaction:${transactionID} `,
						};
					deletedflag = true;
				}
			}
		}
		if (deletedflag === true) {
			return 'Deleted Transaction';
		} else {
			throw `No Transaction of ${transactionID} ID Exists`;
		}
	} else
		throw {
			code: 400,
			message: 'User Not Found',
		};
};

const getIncome = async (UserId, transactionID) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	if (!transactionID) throw 'No Transaction ID';
	transactionID = dataValidation.checkTransactionID(transactionID);
	let Foundflag = false;
	let Transaction = [];
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let incomeRecurring = userFound.Money.Income.Recurring;
		let incomeOneTime = userFound.Money.Income.OneTime;

		if (incomeRecurring && incomeRecurring.length >= 1) {
			for (i in incomeRecurring) {
				if (incomeRecurring[i]._id.toString() === transactionID) {
					Transaction.push({ ...incomeRecurring[i], recurringType: 'yes' });
					Foundflag = true;
				}
			}
		}
		if (incomeOneTime && incomeOneTime.length >= 1) {
			for (i in incomeOneTime) {
				if (incomeOneTime[i]._id.toString() === transactionID) {
					Transaction.push({ ...incomeOneTime[i], recurringType: 'no' });
					Foundflag = true;
				}
			}
		}
		if (Foundflag === true) {
			return Transaction;
		} else {
			throw `No Transaction of ${transactionID} ID Exists`;
		}
	} else throw 'User Not Found';
};

const getExpense = async (UserId, transactionID) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	if (!transactionID) throw 'No Transaction ID';
	transactionID = dataValidation.checkTransactionID(transactionID);
	let Foundflag = false;
	let Transaction = [];
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let expenseRecurring = userFound.Money.Expenditure.Recurring;
		let expenseOneTime = userFound.Money.Expenditure.OneTime;

		if (expenseRecurring && expenseRecurring.length >= 1) {
			for (i in expenseRecurring) {
				if (expenseRecurring[i]._id.toString() === transactionID) {
					Transaction.push({ ...expenseRecurring[i], recurringType: 'yes' });
					Foundflag = true;
				}
			}
		}
		if (expenseOneTime && expenseOneTime.length >= 1) {
			for (i in expenseOneTime) {
				if (expenseOneTime[i]._id.toString() === transactionID) {
					Transaction.push({ ...expenseOneTime[i], recurringType: 'no' });
					Foundflag = true;
				}
			}
		}
		if (Foundflag === true) {
			return Transaction;
		} else {
			throw `No Transaction of ${transactionID} ID Exists`;
		}
	} else throw 'User Not Found';
};

const createSetAside = async (UserId, Amount, Purpose) => {
	if (!UserId || !Amount || !Purpose)
		throw 'All input fields need to be a valid values';
	//ask kevin to do data validations for UserId here
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	Amount = dataValidation.checkAmountinDatafunction(Amount);
	Purpose = dataValidation.checkFeedback(Purpose);

	let UserCollection = await Users();
	let setAside = {
		_id: ObjectId(),
		Purpose: Purpose,
		Amount: Amount,
	};

	const data = await UserCollection.updateOne(
		{ Email: UserId },
		{ $addToSet: { 'Money.SetAsideMoney': setAside } }
	);

	if (!data.acknowledged || data.modifiedCount === 0)
		throw 'could not add set Aside to Money';

	return 'Done set Aside';
};

const deleteSetAside = async (UserId, transactionID) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	if (!transactionID) throw 'No Transaction ID';
	transactionID = dataValidation.checkTransactionID(transactionID);

	let deletedflag = false;
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let setAside = userFound.Money.SetAsideMoney;

		if (setAside && setAside.length >= 1) {
			for (i in setAside) {
				if (setAside[i]._id.toString() === transactionID) {
					const data = await UserCollection.updateOne(
						{ Email: UserId },
						{
							$pull: {
								'Money.SetAsideMoney': { _id: ObjectId(transactionID) },
							},
						}
					);
					if (!data.acknowledged || data.modifiedCount === 0)
						throw {
							code: 400,
							message: `Could Not Delete set aside:${transactionID} `,
						};
					deletedflag = true;
				}
			}
		}

		if (deletedflag === true) {
			return 'Deleted Transaction';
		} else {
			throw `No Transaction of ${transactionID} ID Exists`;
		}
	} else throw 'User Not Found';
};

const getSetAside = async (UserId) => {
	if (!UserId) throw 'No Email';
	UserId = dataValidation.checkEmail(UserId);
	UserId = UserId.toLowerCase();
	let Transaction = [];
	let UserCollection = await Users();
	const userFound = await UserCollection.findOne({ Email: UserId });
	if (userFound) {
		let SetAsideMoney = userFound.Money.SetAsideMoney;

		if (SetAsideMoney && SetAsideMoney.length >= 1) {
			for (i in SetAsideMoney) {
				SetAsideMoney[i]._id = SetAsideMoney[i]._id.toString();
				Transaction.push(SetAsideMoney[i]);
			}
		}

		return Transaction;
	} else throw 'User Not Found';
};
module.exports = {
	createIncome,
	createExpense,
	updateTotalIncome,
	updateTotalExpense,
	deleteIncome,
	deleteExpense,
	getIncome,
	getExpense,
	createSetAside,
	deleteSetAside,
	getSetAside,
};
