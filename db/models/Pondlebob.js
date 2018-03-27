// load the things we need
var mongoose = require('mongoose');

var AbilitySchema = mongoose.Schema({
    current:{
        type: Number,
        required: true,
        default: 0
    },
    base:{
        type: Number,
        required: true,
        default: 0
    }
});

// define the schema for our user model
var PondlebobSchema  = {

    name: {
        type: String,
        required: true,
        default: "Name"
    },
    nickname: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    backImg: {
        type: String
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    stats: {
        hp: AbilitySchema,
        attack: AbilitySchema,
        defense: AbilitySchema,
        special: AbilitySchema,
        speed: AbilitySchema
    },
    moves: [
        {
            name: {
                type: String,
                required: true
            },
            props: AbilitySchema
        }
    ]


};

// create the model for users and expose it to our app

module.exports = PondlebobSchema;
