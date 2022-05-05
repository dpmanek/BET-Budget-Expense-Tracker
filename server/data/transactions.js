const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const moment = require("moment");
//const bands = require('./bands');
const users = require("./users");
//const errorChecking = require('../errorChecking'); //create one for transactions
const { ObjectId } = require("mongodb");
const dataValidation = require("./dataValidation");
const { getMaxListeners } = require("pdfkit");

const createIncome = async (userId, name, description, tags, amount, type) => {
  let UserId = !userId ? "niravjain98@gmail.com" : userId;
  let Name = !name ? "icecream" : name;
  let Description = !description ? null : description;
  let Tags = !tags ? "sometag" : tags;
  let Amount = !amount ? 500 : amount;

  let TranactionDate = new Date();
  TranactionDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  let date = moment(TranactionDate).format("MM/DD/YYYY");

  let Type = !type ? "OneTime" : type;
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

  if (Type === "OneTime") {
    const data = await UserCollection.updateOne(
      { Email: UserId },
      { $addToSet: { "Money.Income.OneTime": income } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "could not add album to band",
      };

    return "Done OneTime";
  }

  if (Type === "Recurring") {
    const data = await UserCollection.updateOne(
      { Email: UserId },
      { $addToSet: { "Money.Income.Recurring": income } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "could not add album to band",
      };
    return "Done recurring";
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
  let UserId = !userId ? "niravjain98@gmail.com" : userId;
  let Name = !name ? "icecream" : name;
  let Description = !description ? null : description;
  let Tags = !tags ? "sometag" : tags;
  let Payment = !payment ? "credit card" : payment;
  let Amount = !amount ? 500 : amount;

  let TranactionDate = new Date();
  TranactionDate.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  let date = moment(TranactionDate).format("MM/DD/YYYY");

  let Type = !type ? "OneTime" : type;
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
    Comments: "nothing",
  };

  if (type === "OneTime") {
    const data = await UserCollection.updateOne(
      { Email: UserId },
      { $addToSet: { "Money.Expenditure.OneTime": expense } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "could not add album to band",
      };

    return "Done OneTime";
  } else if (type === "Recurring") {
    const data = await UserCollection.updateOne(
      { Email: UserId },
      { $addToSet: { "Money.Expenditure.Recurring": expense } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "could not add album to band",
      };
    return "Done recurring";
  }
};

const updateTotalIncome = async (UserId) => {
  if (!UserId) throw "No Email";
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
      { $set: { "Money.Income.totalIncome": totalIncome } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "Could Not Update Total Income",
      };
    return "Total Income Updated";
  } else
    throw {
      code: 400,
      message: "User Not Found",
    };
};

const updateTotalExpense = async (UserId) => {
  if (!UserId) throw "No Email";
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
      { $set: { "Money.Expenditure.totalExpenditure": totalExpense } }
    );

    if (!data.acknowledged || data.modifiedCount === 0)
      throw {
        code: 400,
        message: "Could Not Update Total Income",
      };
    return "Total Income Updated";
  } else
    throw {
      code: 400,
      message: "User Not Found",
    };
};

const deleteIncome = async (UserId, transactionID) => {
  if (!UserId) throw "No Email";
  UserId = dataValidation.checkEmail(UserId);

  if (!transactionID) throw "No Transaction ID";
  // write data function to check transaction ID
  let deletedflag = false;
  let UserCollection = await Users();
  const userFound = await UserCollection.findOne({ Email: UserId });
  if (userFound) {
    let incomeRecurring = userFound.Money.Income.Recurring;
    let incomeOneTime = userFound.Money.Income.OneTime;

    if (incomeRecurring && incomeRecurring.length >= 1) {
      for (i in incomeRecurring) {
        if (incomeRecurring[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $pull: { "Money.Income.Recurring": { _id: transactionID } } }
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
        if (incomeOneTime[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $pull: { "Money.Income.OneTime": { _id: transactionID } } }
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
      return "Deleted Transaction";
    } else {
      throw `No Transaction of ${transactionID} ID Exists`;
    }
  } else
    throw {
      code: 400,
      message: "User Not Found",
    };
};
const deleteExpense = async (UserId, transactionID) => {
  if (!UserId) throw "No Email";
  UserId = dataValidation.checkEmail(UserId);

  if (!transactionID) throw "No Transaction ID";
  // write data function to check transaction ID
  let deletedflag = false;
  let UserCollection = await Users();
  const userFound = await UserCollection.findOne({ Email: UserId });
  if (userFound) {
    let expenseRecurring = userFound.Money.Expenditure.Recurring;
    let expenseOneTime = userFound.Money.Expenditure.OneTime;

    if (expenseRecurring && expenseRecurring.length >= 1) {
      for (i in expenseRecurring) {
        if (expenseRecurring[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $pull: { "Money.Expenditure.Recurring": { _id: transactionID } } }
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
        if (expenseOneTime[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $pull: { "Money.Expenditure.OneTime": { _id: transactionID } } }
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
      return "Deleted Transaction";
    } else {
      throw `No Transaction of ${transactionID} ID Exists`;
    }
  } else
    throw {
      code: 400,
      message: "User Not Found",
    };
};
const updateIncome = async (UserId, transactionID) => {};
const updateExpense = async (
  UserId,
  transactionID,
  Name,
  Description,
  Tags,
  payment,
  Amount,
  Comments
) => {
  if (!UserId) throw "No Email";
  UserId = dataValidation.checkEmail(UserId);

  if (!transactionID) throw "No Transaction ID";
  // write data function to check transaction ID
  let deletedflag = false;
  let UserCollection = await Users();
  const userFound = await UserCollection.findOne({ Email: UserId });
  if (userFound) {
    let expenseRecurring = userFound.Money.Expenditure.Recurring;
    let expenseOneTime = userFound.Money.Expenditure.OneTime;

    if (expenseRecurring && expenseRecurring.length >= 1) {
      for (i in expenseRecurring) {
        if (expenseRecurring[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $set: { "Money.Expenditure.Recurring": { _id: transactionID } } }
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
        if (expenseOneTime[i]._id === transactionID) {
          const data = await UserCollection.updateOne(
            { Email: UserId },
            { $pull: { "Money.Expenditure.OneTime": { _id: transactionID } } }
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
      return "Deleted Transaction";
    } else {
      throw `No Transaction of ${transactionID} ID Exists`;
    }
  } else
    throw {
      code: 400,
      message: "User Not Found",
    };
};

const getIncome = async (UserId) => {};
const getExpense = async (UserId, transactionID) => {};

module.exports = {
  createIncome,
  createExpense,
  updateTotalIncome,
  updateTotalExpense,
  deleteIncome,
  deleteExpense,
  updateIncome,
  updateExpense,
};
