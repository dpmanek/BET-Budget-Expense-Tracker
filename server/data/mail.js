const nodemailer = require('nodemailer');
const mailCredentials = require('../config/authconfig');
var path = require('path');

const sendEmail = (email, subject, message,pdfPath) => {
	let transporter = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com', // hostname
		secureConnection: false, // TLS requires secureConnection to be false
		port: 587, // port for secure SMTP
		auth: {
			user: mailCredentials.Mailusername,
			pass: mailCredentials.Mailpassword,
		},
	});

	let mailOptions = {
		from: 'bet.budget.expense.tracker@outlook.com',
		to: email,
		subject: subject,
		html: message,
		attachments: [
			// {
			// 	filename: `${name}.pdf`,
			// 	path: path.join(__dirname, `../../src/assets/books/${name}.pdf`),
			// 	contentType: 'application/pdf',
			// },
		],
	};
	let mailOptionswithPDF = {
		from: 'bet.budget.expense.tracker@outlook.com',
		to: email,
		subject: subject,
		html: message,
		attachments: [
			{
				filename: `Report.pdf`,
				path: path.join(__dirname, `../public/reports/Report.pdf`),
				contentType: 'application/pdf',
			},
		],
	};

	if(pdfPath){
		transporter.sendMail(mailOptionswithPDF, function (err, info) {
			if (err) {
				console.log(err);
				return;
			} else {
				console.log('Sent :' + info);
			}
		});
	}
	else transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			console.log(err);
			return;
		} else {
			console.log('Sent :' + info);
		}
	});
};

module.exports = {
	sendEmail,
};
// sendEmail(
// 	'dpmanek@gmail.com',
// 	'BET: User ID create',
// 	'Welcome to BET Family. Your new account is created'
// );
