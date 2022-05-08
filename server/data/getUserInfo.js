const mongoCollections = require("../config/mongoCollections");
const allUsers = mongoCollections.users;
const dataValidation = require("./dataValidation");
const moment = require("moment");

module.exports = {
  async getName(email) {
    // this is just an example Function this needs to be modified
    if (!email) throw "No Email";
    email = dataValidation.checkEmail(email);
    email = email.toLowerCase();
    //data validation

    const userCollection = await allUsers();
    //checks if user with the same email already exists
    const userFound = await userCollection.findOne({ Email: email });
    if (userFound) {
      return { Name: userFound.FirstName + " " + userFound.LastName };
    } else throw "User with this email not found";
  },
  async getDOB(email) {
    // this is just an example Function this needs to be modified
    if (!email) throw "No Email";
    email = dataValidation.checkEmail(email);
    email = email.toLowerCase();
    //data validation

    const userCollection = await allUsers();
    //checks if user with the same email already exists
    const userFound = await userCollection.findOne({ Email: email });
    if (userFound) {
      return { UserName: userFound.FirstName, DOB: userFound.DOB };
    } else throw "User with this email not found";
  },
  async getReview(email) {
    if (!email) throw "No Email";
    email = dataValidation.checkEmail(email);
    email = email.toLowerCase();
    //data validation

    const userCollection = await allUsers();
    //checks if user with the same email already exists
    const userFound = await userCollection.findOne({ email: email });
    if (userFound) {
      return { userName: userFound.firstName, Review: userFound.review };
    } else throw "User with this email not found";
  },
  async postReview(email, rating, feedback) {
    //test
    if (!email) throw "No Email";
    email = dataValidation.checkEmail(email);
    email = email.toLowerCase();
    //data validation
    rating = parseFloat(rating);
    const userCollection = await allUsers();
    //checks if user with the same email already exists
    const userFound = await userCollection.findOne({ Email: email });
    if (userFound) {
      const data = await userCollection.updateOne(
        { Email: email },
        { $set: { "Review.Rating": rating, "Review.Feedback": feedback } }
      );

      if (
        !data.acknowledged ||
        (data.matchedCount === 0 && data.modifiedCount === 0)
      )
        throw {
          code: 400,
          message: "could not add album to band",
        };
    } else throw "User with this email not found";
  },
  async getAllReviews() {
    let allReviews = [];
    const userCollection = await allUsers();
    const userData = await userCollection.find({}).toArray();
    if (userData) {
      for (i in userData) {
        if (
          !(
            userData[i].Review.Rating == null &&
            userData[i].Review.Feedback == ""
          )
        )
          allReviews.push({
            name: userData[i].FirstName,
            Review: userData[i].Review,
          });
      }
      return allReviews;
    } else throw "No users in the Database";
  },

  async getUserTransactions(UserId) {
    if (!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);
    UserId = UserId.toLowerCase();

    const userCollection = await allUsers();
    const userData = await userCollection.findOne({ Email: UserId });
    if (userData === null) throw { code: 404, message: "User Not Found" };

    let userOneTimeIncome = userData.Money.Income.OneTime;
    let userRecurringIncome = userData.Money.Income.Recurring;
    let userOneTimeExpenditure = userData.Money.Expenditure.OneTime;
    let userRecurringExpenditure = userData.Money.Expenditure.Recurring;

    if (userOneTimeIncome && userOneTimeIncome.length > 0) {
      for (i in userOneTimeIncome) {
        userOneTimeIncome[i]._id = userOneTimeIncome[i]._id.toString();
      }
    }
    if (userRecurringIncome && userRecurringIncome.length > 0) {
      for (i in userRecurringIncome) {
        userRecurringIncome[i]._id = userRecurringIncome[i]._id.toString();
      }
    }
    if (userRecurringExpenditure && userRecurringExpenditure.length > 0) {
      for (i in userRecurringExpenditure) {
        userRecurringExpenditure[i]._id =
          userRecurringExpenditure[i]._id.toString();
      }
    }
    if (userOneTimeExpenditure && userOneTimeExpenditure.length > 0) {
      for (i in userOneTimeExpenditure) {
        userOneTimeExpenditure[i]._id =
          userOneTimeExpenditure[i]._id.toString();
      }
    }

    return userData.Money;
  },
  async getUserTransactionsByCurrentMonth(UserId) {
    if (!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);
    UserId = UserId.toLowerCase();
    let currentDate = moment().format("MM/DD/YYYY");
    let currentMonth = currentDate.split("/");
    console.log(currentDate);
    const userCollection = await allUsers();
    const userData = await userCollection.findOne({ Email: UserId });
    if (userData === null) throw { code: 404, message: "User Not Found" };

    let filteredUserData = {
      Money: {
        Income: {
          OneTime: [],
          Recurring: [],
        },
        Expenditure: {
          OneTime: [],
          Recurring: [],
        },
      },
    };

    let userOneTimeIncome = userData.Money.Income.OneTime;
    let userRecurringIncome = userData.Money.Income.Recurring;
    let userOneTimeExpenditure = userData.Money.Expenditure.OneTime;
    let userRecurringExpenditure = userData.Money.Expenditure.Recurring;

    if (userOneTimeIncome && userOneTimeIncome.length > 0) {
      for (i in userOneTimeIncome) {
        userOneTimeIncome[i]._id = userOneTimeIncome[i]._id.toString();
        let transactionMonth = userOneTimeIncome[i].TranactionDate.split("/");
        if (transactionMonth[0] === currentMonth[0]) {
          filteredUserData.Money.Income.OneTime.push(userOneTimeIncome[i]);
        }
      }
    }
    if (userRecurringIncome && userRecurringIncome.length > 0) {
      //recurring is a monthly thing
      for (i in userRecurringIncome) {
        userRecurringIncome[i]._id = userRecurringIncome[i]._id.toString();
        //let transactionMonth = userRecurringIncome[i].TranactionDate.split("/");
        //if(transactionMonth[0] === currentMonth[0]){
        filteredUserData.Money.Income.Recurring.push(userRecurringIncome[i]);
        //}
      }
    }
    if (userRecurringExpenditure && userRecurringExpenditure.length > 0) {
      for (i in userRecurringExpenditure) {
        userRecurringExpenditure[i]._id =
          userRecurringExpenditure[i]._id.toString();
        // let transactionMonth = userRecurringExpenditure[i].TranactionDate.split("/");
        // if(transactionMonth[0] === currentMonth[0]){
        filteredUserData.Money.Expenditure.Recurring.push(
          userRecurringExpenditure[i]
        );
        // }
      }
    }
    if (userOneTimeExpenditure && userOneTimeExpenditure.length > 0) {
      for (i in userOneTimeExpenditure) {
        userOneTimeExpenditure[i]._id =
          userOneTimeExpenditure[i]._id.toString();
        let transactionMonth =
          userOneTimeExpenditure[i].TranactionDate.split("/");
        if (transactionMonth[0] === currentMonth[0]) {
          filteredUserData.Money.Expenditure.OneTime.push(
            userOneTimeExpenditure[i]
          );
        }
      }
    }

    return filteredUserData.Money;
  },

  async getSpendingLimitAndMonthExpense(UserId) {
    let transactionByMonth = await this.getUserTransactionsByCurrentMonth(
      UserId
    );
    let totalMonthExpenses = 0;
    let totalMonthIncome = 0;
    let IncomePresentFlag = false;

    if (transactionByMonth.Expenditure.OneTime.length > 0) {
      for (i in transactionByMonth.Expenditure.OneTime) {
        totalMonthExpenses += transactionByMonth.Expenditure.OneTime[i].Amount;
      }
    }
    if (transactionByMonth.Expenditure.Recurring.length > 0) {
      for (i in transactionByMonth.Expenditure.Recurring) {
        totalMonthExpenses +=
          transactionByMonth.Expenditure.Recurring[i].Amount;
      }
    }
    //Checking if income is present
    if (
      transactionByMonth.Income.OneTime.length > 0 ||
      transactionByMonth.Income.Recurring.length > 0
    ) {
      if (transactionByMonth.Income.OneTime.length > 0) {
        for (i in transactionByMonth.Income.OneTime) {
          totalMonthIncome += transactionByMonth.Income.OneTime[i].Amount;
        }
        IncomePresentFlag = true;
      }
      if (transactionByMonth.Income.Recurring.length > 0) {
        for (i in transactionByMonth.Income.Recurring) {
          totalMonthIncome += transactionByMonth.Income.Recurring[i].Amount;
        }

        IncomePresentFlag = true;
      }
    }

    if (IncomePresentFlag) {
      let totalSpendingLimit = totalMonthIncome - totalMonthExpenses;
      let output = {
        SpendingLimit: totalSpendingLimit,
        CurrentMonthExpenses: totalMonthExpenses,
        CurrentMonthIncome: totalMonthIncome,
      };
      return output;
    } else {
      let output = {
        SpendingLimit: 0,
        CurrentMonthExpenses: totalMonthExpenses,
        CurrentMonthIncome: 0,
      };
      return output;
    }
  },

  async filterTransactionReportGeneration(userInfo, Name, from, till) {
    let expense = userInfo.Expenditure;
    let OneTimeExpense = expense.OneTime;
    let RecurringExpense = expense.Recurring;
    let income = userInfo.Income;
    let OneTimeIncome = income.OneTime;
    let RecurringIncome = income.Recurring;

    let start = new Date(moment(from).format("MM/DD/YYYY"));
    let end = new Date(moment(till).format("MM/DD/YYYY"));

    let FinalExpense = [];
    let FinalIncome = [];
    let FinalTransactions = [];
    FinalExpense = OneTimeExpense.concat(RecurringExpense);
    for (let i in FinalExpense) {
      FinalExpense[i].Type = "Debit";
    }
    FinalIncome = OneTimeIncome.concat(RecurringIncome);
    for (let i in FinalIncome) {
      FinalIncome[i].Type = "Credit";
    }
    FinalTransactions = FinalIncome.concat(FinalExpense);
    for (let i in FinalTransactions) {
      FinalTransactions[i].TranactionDate = new Date(
        FinalTransactions[i].TranactionDate
      );
    }
    const sortedActivities = FinalTransactions.sort(
      (a, b) => a.TranactionDate - b.TranactionDate
    );
    let FilteredData = [];
    for (let i in sortedActivities) {
      if (
        sortedActivities[i].TranactionDate >= start &&
        sortedActivities[i].TranactionDate <= end
      ) {
        FilteredData.push(sortedActivities[i]);
      }
    }
    let Transactions = [];
    for (i in FilteredData) {
      FilteredData[i].TranactionDate = moment(
        FilteredData[i].TranactionDate
      ).format("MM/DD/YYYY");
      let element = {
        Sr_no: parseFloat(i) + 1,
        Transaction_Name: FilteredData[i].Name,
        Amount: FilteredData[i].Amount,
        Type: FilteredData[i].Type,
        Date: FilteredData[i].TranactionDate,
      };
      Transactions.push(element);
    }
    const modeledData = {
      Name: Name.Name,
      From: moment(from).format("MM/DD/YYYY"),
      Till: moment(till).format("MM/DD/YYYY"),
      Transactions: Transactions,
    };

    return modeledData;
  },
};
