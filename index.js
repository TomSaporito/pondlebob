// index.js
var express = require("express");
var app = express();
var flash = require('connect-flash');
var morgan = require('morgan');



//gzip test
var compression = require('compression');
// compress all responses
//expressjs compression
app.use(compression());



/**
 * 
 * gzip experiment
*/
// var zlib = require('zlib');
// var fs = require('fs');

// var listOfFiles = ['./public/dist/main.bundle.min.js'];

// function compressFile(filename, callback) {
//     var compress = zlib.createGzip(),
//         input = fs.createReadStream(filename),
//         output = fs.createWriteStream(filename + '.gz');

//     input.pipe(compress).pipe(output);

//     if (callback) {
//         output.on('end', callback);
//     }
// }
// listOfFiles.forEach(compressFile);

//END gzip experiment

var port=Number(process.env.PORT || 3000);

app.use(flash());

//connect to db
require('./db/connect.js');

//router
require('./router/router.js')(app, express);

app.listen(port, function() {
    console.log("Hey! My API is running...");
});

module.exports = app;