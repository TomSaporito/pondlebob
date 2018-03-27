var mongoose = require('mongoose');

var CreatePondlebob = mongoose.Schema({
    names: {
        type: [String],
        required: true
    },
    animations: {
        type: [String],
        required: true
    }
});

// create the model for users and expose it to our app
var CreatePondlebobSchema = mongoose.model('CreatePondleBob', CreatePondlebob);

module.exports = CreatePondlebobSchema;