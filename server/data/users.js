const mongoCollections = require('../config/mongoCollections');
const allUsers = mongoCollections.users;
const bcrypt = require("bcryptjs");
const dataValidation = require("./dataValidation")



module.exports = {
    async createUser(newFirstName, newLastName, newEmail, newPassword){
      
        if(!newFirstName) throw "No FirstName";
        if(!newLastName) throw 'No LastName';
        if(!newEmail) throw "No Username";
        if(!newPassword) throw "No Password";
       

        //Datavalidation calls
        newFirstName = dataValidation.checkName(newFirstName);
		newLastName = dataValidation.checkName(newLastName);
		newEmail = dataValidation.checkEmail(newEmail);
		dataValidation.checkPassword(newPassword);
        newEmail = newEmail.toLowerCase(); // Makes every Email, Case Insensitive
        
        
        const userCollection = await allUsers();
        //checks if user with the same email already exists
        const userFound = await userCollection.findOne({'email': newEmail});
        if (userFound) throw "User with this Email already exists Please Try another Email";

        //convert password to hashed password
        const hash = await bcrypt.hash(newPassword, 16);

        // insert Details and Hashed password to db

        //Data Schema --Alter this if needed
        let newUser = {
            email: newEmail,   
            firstName: newFirstName,
            lastName: newLastName,
            DOB: null,
            password: hash,
            money: {
                income: {
                    recurring: null,
                    OneTime: null,
                    totalIncome: null
                },
                Expenditure: {
                    Recurring: null,
                    OneTime:null,
                    totalExpenditure: null
                },
                totalSpendingLimit: null

            },

        };

        const insertInfo = await userCollection.insertOne(newUser);

        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw " User was unable to Sign up MongoDB Server Error"; // Not sure about this part confirm once
        else return {userInserted: true};

    },

    async checkUser(email, password){
        if(!email) throw "No Email Please enter email";
        if(!password) throw "No Password Please enter password";
        
        //data validation;
        email = dataValidation.checkEmail(email);
		dataValidation.checkPassword(password);
        email = email.toLowerCase(); // Makes every Email, Case Insensitive

        // checks if Email exists
        const userCollection = await allUsers();
       
        const userFound = await userCollection.findOne({'email': email});
        //if user not match
        if (userFound === null) throw "Either the username or password is invalid";

        // if match
        //check if the password is a match using bycrypt 
        let passwordMatch = await bcrypt.compare(password, userFound.password);
        if(passwordMatch) return {authenticated: true, userName: userFound.firstName};
        else throw "Either the username or password is invalid";

    }
};