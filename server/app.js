const express = require('express');
const app = express();
var jwt = require('jsonwebtoken');
const jwtkey = require('./config/authconfig');
const static = express.static(__dirname + '/public');
const cors = require('cors');
const configRoutes = require('./routes');
//var hour = 86400000;
let port = 8080;

const whitelist = ['http://localhost:3000']; //Refrence: https://www.codingdeft.com/posts/nodejs-react-cors-error/
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/public', static);
app.use(express.urlencoded({ extended: true }));

app.use('/users', (req, res, next) => {
	res.header(
		'Access-Control-Allow-Headers',
		'x-access-token, Origin, Content-Type, Accept'
	);
	next();
});

// verify token
app.use('/user/data', (req, res, next) => {
	//let token = req.headers["x-access-token"];

	try {
		var tokeninBody = req.body.headers['x-access-token'];
	} catch (e) {
		tokeninBody = undefined;
	}

	//let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtldmluQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoia2V2aW4iLCJpYXQiOjE2NTE1OTk4OTksImV4cCI6MTY1MTY4NjI5OX0.5ahbrHoNt9Y2aT4LxeKijqYwgbePqkbJIO5iewYvGkE"
	let token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pcmF2amFpbjk4QGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiTmlyYXYiLCJpYXQiOjE2NTE4NzY2NjcsImV4cCI6MTY1MTk2MzA2N30.qaHHrEOiYqgymDag_LtOQ2H_Ow7eTzTJ32SvkIyKOlE';
	if (!token && !tokeninBody) {
		return res.status(403).send({ message: 'No token provided!' });
	}
	if (token) {
		jwt.verify(token, jwtkey.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({ message: 'Unauthorized!' });
			}
			if (decoded) {
				req.userId = decoded.email;
				console.log('Access Token Verified');
			}
			next();
		});
	} else if (tokeninBody) {
		jwt.verify(tokeninBody, jwtkey.secret, (err, decoded) => {
			if (err) {
				return res.status(401).send({ message: 'Unauthorized!' });
			}
			if (decoded) {
				req.userId = decoded.email;
				console.log('Access Token Verified');
			}
			next();
		});
	}
});

// logging middle ware
app.use(async (req, res, next) => {
	let currentTime = new Date().toUTCString();
	let method = req.method;
	let route = req.originalUrl;

	let authenticated = false; //change this once jwt verified
	//Un Comment this part once Sessions are done
	//if (req.session.user) authenticated = true;
	//else authenticated = false;

	console.log(
		`Time: ${currentTime}, Method: ${method}, Route: ${route}, userAuth Status: ${authenticated}`
	);

	next();
});

configRoutes(app);

app.listen(port, () => {
	console.log(`Your routes will be running on port ${port}`);
});
