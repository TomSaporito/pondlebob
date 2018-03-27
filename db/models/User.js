const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var PondlebobSchema = require('./Pondlebob.js');



// define the schema for our user model
const userSchema = mongoose.Schema({

        nickname: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        level: {
            type:Number,
            default: 0
        },
        levelType: String,
        createdAt: {
            type: Date,
            required: true
        },
        duels: {
            wins: {
                type: Number,
                default: 0
            },
            losses: {
                type: Number,
                default: 0
            },
            incompletes: {
                type: Number,
                default: 0
            },
            played: {
                type: Number,
                default: 0
            }
        },
        accountStatus: String,
        profilePic: String,
        lineup: [PondlebobSchema]


});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);