/*--------------------------------------------------------------
# secure.js
# Marco Mejia
# 301082190
# 25 Feb 2021
--------------------------------------------------------------*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let secureController = require('../controllers/secure');

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
router.get('/' , requireAuth, secureController.displayContactsList);

/* GET Route for the Edit page - UPDATE operation*/
router.get('/edit/:id', requireAuth, secureController.displayEditContactPage);

/* POST Route for processing the Edit page - UPDATE operation*/
router.post('/edit/:id', requireAuth, secureController.processEditContactPage);

/* GET to perform User Deletion - DELETE operation*/
router.get('/delete/:id', requireAuth, secureController.performContactDelete);

module.exports = router;