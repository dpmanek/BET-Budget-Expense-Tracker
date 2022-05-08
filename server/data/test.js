const moment = require('moment');
let TranactionDate = new Date('02/11/2019');
TranactionDate.toLocaleString('en-US', {
	timeZone: 'America/New_York',
});
var date = moment(TranactionDate).format('MM/DD/YYYY');
console.log(date);
