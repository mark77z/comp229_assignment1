/*--------------------------------------------------------------
# index.js
# Marco Mejia
# 301082190
# 02 Feb 2021
--------------------------------------------------------------*/

var express = require('express');
var router = express.Router();

let contactName = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    contactName: contactName
  });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    contactName: contactName
  });
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About'});
});

/* GET Products page. */
router.get('/projects', function(req, res, next) {
  res.render('projects', { title: 'Projects'});
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Services'});
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact'});
});

/* POST Contact Us page. */
router.post('/contact', function(req, res, next) {
  contactName = req.body.fullname;
  res.redirect('/home');
});

module.exports = router;
