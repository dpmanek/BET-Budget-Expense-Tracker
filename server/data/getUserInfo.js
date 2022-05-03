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
    },
    async getReview(email) {
        if(!email) throw "No Email";
        email = dataValidation.checkEmail(email);
        email = email.toLowerCase();
        //data validation
        
        const userCollection = await allUsers();
        //checks if user with the same email already exists
        const userFound = await userCollection.findOne({'email': email});
        if(userFound){
            return {'userName':userFound.firstName ,'Review':userFound.review};
        }

        else throw "User with this email not found"
    },
    async postReview(email,rating,feedback) { //test 
        if(!email) throw "No Email";
        email = dataValidation.checkEmail(email);
        email = email.toLowerCase();
        //data validation
        
        const userCollection = await allUsers();
        //checks if user with the same email already exists
        const userFound = await userCollection.findOne({'email': email});
        if(userFound){
            const data = await userCollection.updateOne(
                { email: email},
                { $Set: { 'review.Rating': rating, 'review.feedback': feedback } }
            );
    
            if (!data.acknowledged || data.modifiedCount === 0)
                throw {
                    code: 400,
                    message: 'could not add album to band',
                };
        }
        else throw "User with this email not found"
    }
}