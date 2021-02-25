/*--------------------------------------------------------------
# book.js
# Marco Mejia
# 301082190
# 24 Feb 2021
--------------------------------------------------------------*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the book list page - READ operation*/
router.get('/' , bookController.displayBookList);

/* GET Route for the Add page - CREATE operation*/
router.get('/add', requireAuth, bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE operation*/
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for the Edit page - UPDATE operation*/
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET to perform Book Deletion - DELETE operation*/
router.get('/delete/:id', requireAuth, bookController.performDelete);

module.exports = router;