const mongoCollections = require("../config/mongoCollections");
const allUsers = mongoCollections.users;
const dataValidation = require("./dataValidation")
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
    rating = parseInt(rating);
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

  async getUserTransactions(UserId, startDate, endDate) {
    if (!UserId) throw "No Email";
    UserId = dataValidation.checkEmail(UserId);
    UserId = UserId.toLowerCase();

    const userCollection = await allUsers();
    const userData = await userCollection.findOne({ Email: UserId });
    if (userData === null) throw { code: 404, message: "User Not Found" };

    if (startDate && endDate) {
        const userDetailsWithFilteredMoney = await userCollection.find({
          Email: UserId,
          Money: {
            Income: {
              Recurring: {
                $elemMatch: {
                  transactionDate: { $gte: startDate, $lte: endDate },
                },
              },
              OneTime: {
                $elemMatch: {
                  transactionDate: { $gte: startDate, $lte: endDate },
                },
              },
            },
            Expense: {
              Recurring: {
                $elemMatch: {
                  transactionDate: { $gte: startDate, $lte: endDate },
                },
              },
              OneTime: {
                $elemMatch: {
                  transactionDate: { $gte: startDate, $lte: endDate },
                },
              },
            },
          },
        }).toArray();
        return userDetailsWithFilteredMoney.Money;
      }


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
};
