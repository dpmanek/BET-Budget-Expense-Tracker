const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');

app.use('/public', static);
app.use(express.urlencoded({ extended: true }));


let port=8080;

// logging middle ware
app.use(async(req,res,next)=>{
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;

    //let authenticated = undefined;
    // Un Comment this part once Sessions are done
    //if (req.session.user) authenticated = true;
    //else authenticated = false; 

    //console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`) 
    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}`);
	next();
} )

configRoutes(app);

app.listen(port, () => {
	console.log(`Your routes will be running on port ${port}`);
  });
