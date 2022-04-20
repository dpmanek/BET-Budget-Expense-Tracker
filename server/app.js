const express = require('express');
const app = express();
const session = require('express-session');
const static = express.static(__dirname + '/public');
const cors = require('cors');
const configRoutes = require('./routes');

app.use(cors());
app.use(express.json());
app.use('/public', static);
app.use(express.urlencoded({ extended: true }));


app.use( // session
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false
    
  })
);



let port=8080;

// logging middle ware
app.use(async(req,res,next)=>{
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;

    let authenticated = undefined;
    //Un Comment this part once Sessions are done
    if (req.session.user) authenticated = true;
    else authenticated = false; 

    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`) 
    //console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}`);
	next();
} )

configRoutes(app);

app.listen(port, () => {
	console.log(`Your routes will be running on port ${port}`);
  });
