const main_collection=
{
    "users":[{
        "_id":"object ID",
        "First Name":"Deep",
        "Last Name":"Manek",
        "Date of Birth":"12/08/1997",
        "emailID":"",
        "password":"",//HASHED PASS
        "Money":{
        "Income":{
            "Recurring":[income,income], //Income Object
            "OneTime":[],   //Income Object
            "Total Income":0// Loop that adds all the Amount key from Recurring and OnetTime Payment
        },
        "Expenditure":{
            "Recurring":[],// Expense Object
            "OneTime":[],  //Expense Object
            "Total Expenditure":0 // Loop that adds all the Amount key from Recurring and OnetTime Payment
        },
        "Total Spending Limit":0 
    }
}]
}


//Expense Object
const expense=
{
"_id":"object ID",
"Name":"",
"Description":"",
"Tags":'',
"TimeStamp":[],
"Payment Mode":"",
"Amount":0,
}

//Income Object


const income=
{
    "_id":"object ID",
    "Name":"",
    "Description":"",
    "Tags":'',
    "TimeStamp":"",
    "Amount":"",
}