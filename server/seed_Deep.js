const connection = require("./config/mongoConnection");
//const data = require('../data/'); //generalizing it later
const transactions = require("./data/transactions");
const user = require("./data/users");
//const { albums } = require('./config/mongoCollections');

async function main() {
  const db = await connection.dbConnection();
  // await db.dropDatabase();

  /*
   Adding Income
	let income = undefined;
  try {
	  income = await transactions.createIncome(
		  null,
		  null,
		  null,
		  null,
		  null,
		  "Recurring"
		  );
		  console.log(income);
		} catch (e) {
			console.log("error income", e);
		}
	*/

  //   /* Adding Expense */
  //   let expense = undefined;
  //   try {
  //     expense = await transactions.createExpense(
  //       null,
  //       "Pizza",
  //       "Pizza with friends",
  //       "Food and Drinks",
  //       "Credit",
  //       500,
  //       "OneTime"
  //     );
  //     console.log(expense);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   try {
  //     expense = await transactions.createExpense(
  //       null,
  //       "Bus Ticket",
  //       "Bus to NYC",
  //       "Transportation",
  //       "Cash",
  //       20,
  //       "OneTime"
  //     );
  //     // console.log(income);
  //   } catch (e) {
  //     console.log(e);
  //   }
  try {
    expense = await transactions.createExpense(
      null,
      "Pub",
      "Pub with stevens friends",
      "Life and Entertainment",
      "Debit",
      50,
      "Recurring"
    );
    console.log(expense);
  } catch (e) {
    console.log(e);
  }

  /** Get user from Id */
  /*
	let userData = undefined;
	try {
		userData = await user.getUser('6266c3e859c935f646dca2ce');
		console.log(userData);
	} catch (e) {
		console.log(e);
	}
	*/

  console.log("Done seeding database");

  await connection.closeConnection();
}

main();
