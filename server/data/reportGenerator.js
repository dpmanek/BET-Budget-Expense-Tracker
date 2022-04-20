const PDFGenerator = require('pdfkit')
const fs = require('fs')


// instantiate the library
let theOutput = new PDFGenerator 

// pipe to a writable stream which would save the result into the same directory
theOutput.pipe(fs.createWriteStream('../public/reports/TestDocument.pdf'))


theOutput.text('Some awesome example text')


// write out file
theOutput.end()