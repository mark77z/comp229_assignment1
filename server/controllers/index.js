/*--------------------------------------------------------------
# index.js
# Marco Mejia
# 301082190
# 25 Feb 2021

Index Controller
----------------------------------------------------------------*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

let contactName = '';

module.exports.displayHomePage = (req,res,next) => {
    res.render('index', {title: 'Home', contactName: contactName, name: req.user? req.user.name: ''});
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('about', {title: 'About', name: req.user? req.user.name: ''});
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('projects', {title: 'Projects' , name: req.user? req.user.name: ''});
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('services', {title: 'Services', name: req.user? req.user.name: ''});
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('contact', {title: 'Contact', name: req.user? req.user.name: ''});
}

module.exports.processContactPage = (req,res,next) => {
    contactName = req.body.fullname;
    res.redirect('/home');
}

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('secure/login', 
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            name : req.user ? req.user.name : ''
        });
    }
    else{
        return res.redirect('/');
    }
};

module.exports.processLoginPage = (req,res,next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        // server err
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', "Authentication error");
            return res.redirect('/login');
        }
        
        req.login(user, (err) => {
            //server error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contacts-list');
        })
    })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('secure/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            name: req.user ? req.user.name : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req,res,next) => {
    //instanciate user object
    let newUser = new User({
        username: req.body.username,
        //password = req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        address : req.body.address
    });

    User.register(newUser, req.body.password, (err)=> {
        if(err)
        {
            console.log('Error: Inserting new user');
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('secure/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                name : req.user ? req.user.name : ''
            });
        }
        else
        {
            //if no error exists, then registration is successful

            ///redirect the user and authenticate thenm

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts-list')
            });
        }
    });
};

module.exports.processLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}