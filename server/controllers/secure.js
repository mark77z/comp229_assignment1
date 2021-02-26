/*--------------------------------------------------------------
# secure.js
# Marco Mejia
# 301082190
# 25 Feb 2021

Secure Controller
----------------------------------------------------------------*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayContactsList = (req, res, next) => {
    let customSort = { name: 1 };
    User.find((err, contactsList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList)
            res.render('secure/contacts_list', {
                title: 'Business Contact List', 
                ContactsList: contactsList,
                name: req.user? req.user.name: ''
            });
        }
    }).sort(customSort);
};

module.exports.displayEditContactPage = (req, res, next) => {
    let id = req.params.id;
    User.findById(id, (err, userToEdit) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('secure/edit_contact', {
                title: 'Edit User', 
                user: userToEdit,
                name: req.user? req.user.name: ''
            });
        }
    });
};

module.exports.processEditContactPage = (req, res, next) => {
    let id = req.params.id;

    let updatedUser = User({
        "username" : req.body.username,
        "name": req.body.name,
        "email": req.body.email,
        "phone" : req.body.phone,
        "address" : req.body.address,
        "_id": id
    });

    User.updateOne({_id: id } , updatedUser, (err) =>{
        if(err)
        {
            console.error(err);
            res.end(err); 
        }
        else
        {
            //refresh the contacts-list
            res.redirect('/contacts-list');
        }
    });
};

module.exports.performContactDelete = (req, res, next) => {
    let id = req.params.id;

    User.remove({_id: id}, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err); 
        }
        else
        {
            //refresh the book-list
            res.redirect('/contacts-list');
        }
    });
};