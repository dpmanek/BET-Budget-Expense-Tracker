const PDFGenerator = require('pdfkit')
const fs = require('fs')


// instantiate the library
let theOutput = new PDFGenerator 

// pipe to a writable stream which would save the result into the same directory
theOutput.pipe(fs.createWriteStream('../public/reports/TestDocument.pdf'))

// theOutput.image('../public/images/logo.png', {
//     fit: [50, 50],
//   })
// .text('Some awesome example text1')

theOutput
.image('../public/images/logo.png', 0, 0, { width: 250})
.fillColor('#000')
.fontSize(20)
.text('BET', 275, 50, {align: 'right'})
.fontSize(10)
.text(`Name: Deep Manek`, {align: 'right'})
.moveDown()
.text(`Transactions:`, {align: 'right'})
.text(`From: Today`, {align: 'right'})
.text(`Till: To a certain Date`, {align: 'right'})

//horizontal rule
const beginningOfPage = 50
const endOfPage = 550

theOutput.moveTo(beginningOfPage,200)
    .lineTo(endOfPage,200)
    .stroke()

theOutput.text(`Transactions`, 50, 210)

theOutput.moveTo(beginningOfPage,250)
    .lineTo(endOfPage,250)
    .stroke()

// write out file
theOutput.end()