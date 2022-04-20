const mongoCollections = require('../config/mongoCollections');
const allUsers = mongoCollections.users;
const bcrypt = require("bcryptjs");
const dataVal = require("./dataValidation")



module.exports = {
    async createUser(firstName, lastName, email, password){
        let newfirstName = firstName;
        let newLastName = lastName;
        let newEmail = email;
        let newPassword = password;
        if(!newfirstName) throw "No FirstName";
        if(!newLastName) throw 'No LastName';
        if(!newEmail) throw "No Username";
        if(!newPassword) throw "No Password";
        // updated till here

        //Datavalidation calls
        //newUsername = dataVal.checkUsername(newUsername);
        //newUsername = newUsername.toLowerCase(); // Makes every usernamecase insensitive
        
        // Password validation
        //dataVal.checkPassword(password); 
        //.toArray()
        //not allow duplicate usernames
        const userCollection = await allUsers();
        const userFound = await userCollection.findOne({'email': newEmail});
        if (userFound) throw "User with this username already exists";

        //convert password to hashed password
        const hash = await bcrypt.hash(newPassword, 16);

        // insert username and pass to db
        let newUser = {
            email: newEmail,   
            firstName: newfirstName,
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

    async checkUser(username, password){
        if(!username) throw "No Username";
        if(!password) throw "No Password";
        username = dataVal.checkUsername(username);
        username = username.toLowerCase();
        dataVal.checkPassword(password);

        // query only username first if not there throw "Either the username or password is invalid"
        const userCollection = await allUsers();
       
        const userFound = await userCollection.findOne({'username': username});
        
        if (userFound === null) throw "Either the username or password is invalid";

        // if match
        //check if the password is a match using bycrypt else throw "Either the username or password is invalid"
        let passwordMatch = await bcrypt.compare(password, userFound.password);
        if(passwordMatch) return {authenticated: true};
        else throw "Either the username or password is invalid";

    }
};