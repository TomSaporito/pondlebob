const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//polyfill?? for .then
const {dburl} = require('./creds.js');

//console.log(dburl);

var options = {
  useMongoClient: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 3, // try connection 3 times
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};

var connection = mongoose.connect(dburl, options, function(error) {// Check error in initial connection. There is no 2nd

    if (error) {
        console.log('CANNOT CONNECT TO DB');
        throw error;

    }
    console.log('connected to db!');
//    require('./models/MoveNames.js');


});