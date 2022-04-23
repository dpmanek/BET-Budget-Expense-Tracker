const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const session = require('express-session');
const static = express.static(__dirname + '/public');
const cors = require('cors');
const configRoutes = require('./routes');
var hour = 86400000;

const whitelist = ["http://localhost:3000"]  //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))
app.use(express.json());
app.use('/public', static);
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser())

app.use( // session
  session({
    name: 'AuthCookie',
    secret: "some secret string!",
    saveUninitialized: true,
    resave: false,
    cookie:{
      expires: new Date(Date.now() + hour), //keeps the cookie live for 24Hours
    }
    
  })
);

app.use('/users',async (req, res,next) => {
  if(req.session.user){
    res.send({loggedIn: true, user: req.session.user})
  }
  else{
    next()
  }
})

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
  
	next();
} )

configRoutes(app);

app.listen(port, () => {
	console.log(`Your routes will be running on port ${port}`);
  });
