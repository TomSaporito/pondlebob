// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var TempUserSchema = mongoose.Schema({

        email: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        verificationNum: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        }


});

// generating a hash
TempUserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
TempUserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('tempUser', TempUserSchema);