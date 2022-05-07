const fs = require('fs');
const PDFDocument = require('pdfkit');

function createInvoice(userData, path) {
	let doc = new PDFDocument({ size: 'A4', margin: 50 });

	generateHeader(doc, userData); //pass userData
	generateTransactionHr(doc);
	generateInvoiceTable(doc, userData);
	generateFooter(doc);

	//doc.pipe(res); 
	doc.end();
	//doc.pipe(fs.createWriteStream(path));
	return doc
	
}

//function input parameter will be increased to replace userdata
function generateHeader(doc, userData) {
	doc
		//.image('public/images/logo.png', 50, 45, { width: 50 })
		.fillColor('#000')
		.fontSize(20)
		.text('BET', 275, 50, { align: 'right' })
		.fontSize(10)
		.text(`Name: ${userData.Name}`, { align: 'right' })
		.moveDown()
		.text(`Transactions:`, { align: 'right' })
		.text(`From: ${userData.From}`, { align: 'right' })
		.text(`Till: ${userData.Till}`, { align: 'right' });
}

function generateTransactionHr(doc) {
	generateHr(doc, 185);

	doc.text(`Transactions`, 50, 210).moveDown();

	generateHr(doc, 252);
}

function generateInvoiceTable(doc, userData) {
	let i;
	const invoiceTableTop = 330;

	doc.font('Helvetica-Bold');
	generateTableRow(
		doc,
		invoiceTableTop,
		'Sr. no',
		'Transaction Name',
		'Amount',
		'Type',
		'Date'
	);
	generateHr(doc, invoiceTableTop + 20);
	doc.font('Helvetica');
	//invoice.items=userData.Transactions
	for (i = 0; i < userData.Transactions.length; i++) {
		const item = userData.Transactions[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			item.Sr_no,
			item.Transaction_Name,
			formatCurrency(item.Amount),
			item.Type,
			item.Date
		);

		generateHr(doc, position + 20);
	}
	doc.font('Helvetica');
}

function generateFooter(doc) {
	doc
		.fontSize(10)
		.text('Thanks for using BET.', 50, 780, { align: 'center', width: 500 });
}

function generateTableRow(
	doc,
	y,
	item,
	description,
	unitCost,
	quantity,
	lineTotal
) {
	doc
		.fontSize(10)
		.text(item, 50, y)
		.text(description, 150, y)
		.text(unitCost, 280, y, { width: 90, align: 'right' })
		.text(quantity, 370, y, { width: 90, align: 'right' })
		.text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
	doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(Amount) {
	return '$' + Amount;
}

module.exports = {
	createInvoice,
};

// const userdata = {
// 	Name: 'Deep Manek',
// 	From: '02-05-2022',
// 	Till: '03-05-2022',
// 	Transactions: [
// 		{
// 			Sr_no: 1,
// 			Transaction_Name: 'Gas',
// 			Amount: 23,
// 			Type: 'Debit',
// 			Date: '02-03-2022',
// 		},
// 		{
// 			Sr_no: 2,
// 			Transaction_Name: 'Zel',
// 			Amount: 100,
// 			Type: 'Credit',
// 			Date: '02-04-2022',
// 		},
// 		{
// 			Sr_no: 3,
// 			Transaction_Name: 'Pizza',
// 			Amount: 7.5,
// 			Type: 'Debit',
// 			Date: '02-05-2022',
// 		},
// 		{
// 			Sr_no: 4,
// 			Transaction_Name: 'Stevens',
// 			Amount: 60000,
// 			Type: 'Debit',
// 			Date: '02-08-2022',
// 		},
// 	],
// };
// const Path = 'report.pdf';

// createInvoice(userdata, Path);