let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

let contactName = '';

module.exports.displayHomePage = (req,res,next) => {
    res.render('index', {title: 'Home', contactName: contactName, displayName: req.user? req.user.displayName: ''});
}

module.exports.displayAboutPage = (req,res,next) => {
    res.render('about', {title: 'About', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayProjectsPage = (req,res,next) => {
    res.render('projects', {title: 'Projects' , displayName: req.user? req.user.displayName: ''});
}

module.exports.displayServicesPage = (req,res,next) => {
    res.render('services', {title: 'Services', displayName: req.user? req.user.displayName: ''});
}

module.exports.displayContactPage = (req,res,next) => {
    res.render('contact', {title: 'Contact', displayName: req.user? req.user.displayName: ''});
}

module.exports.processContactPage = (req,res,next) => {
    contactName = req.body.fullname;
    res.redirect('/home');
}

module.exports.displayLoginPage = (req,res,next) => {
    if(!req.user)
    {
        res.render('auth/login', 
        {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName : req.user ? req.user.displayName : ''
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
            return res.redirect('/book-list');
        })
    })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
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
        displayName: req.body.displayName,
        email: req.body.email
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
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName : req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //if no error exists, then registration is successful

            ///redirect the user and authenticate thenm

            return passport.authenticate('local')(req, res, () => {
                res.redirect('/book-list')
            });
        }
    });
};

module.exports.processLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}