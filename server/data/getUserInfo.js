const mongoCollections = require('../config/mongoCollections');
const allUsers = mongoCollections.users;
const dataValidation = require("./dataValidation")



module.exports = {
    async getDOB(email){ // this is just an example Function this needs to be modified
        if(!email) throw "No Email";
        email = dataValidation.checkEmail(email);
        email = email.toLowerCase();
        //data validation
        
        const userCollection = await allUsers();
        //checks if user with the same email already exists
        const userFound = await userCollection.findOne({'email': email});
        if(userFound){
            return {'userName':userFound.firstName ,'DOB':userFound.DOB};
        }

        else throw "User with this email not found"
    }
}