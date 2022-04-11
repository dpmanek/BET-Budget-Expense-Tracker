const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');

const port = 8080;

app.use('/public', static);
app.use(express.urlencoded({ extended: true }));

configRoutes(app);

app.listen(port, () => {
	console.log(`Your server is running on port ${port}`);
});
