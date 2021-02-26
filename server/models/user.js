//require modules for the User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//Create a user class
let User = mongoose.Schema({
    username: 
    {
        type: String,
        default: "",
        trim: true,
        required: "Username is required"
    },
    email:
    {
        type: String,
        default: "",
        trim: true,
        required: "Email Address is required"
    },
    phone:
    {
        type: String,
        default: "",
        trim: true,
        required: "Phone Number is required"
    },
    address:
    {
        type: String,
        default: "",
        trim: true,
        required: "Address is required"
    },
    name:
    {
        type: String,
        default: "",
        trim: true,
        required: "Name is required"
    },
    created:
    {
        type: Date,
        default: Date.now
    },
    updated:
    {
        type: Date,
        default: Date.now
    }
},{
    collection: "users"
});

//configure options for User Model
let options = ({ missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);