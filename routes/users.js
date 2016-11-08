var express = require('express');
var router = express.Router();
// link to the Account model
var Account = require('../models/account');
var passport = require('passport');

// auth check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

// GET handler for /users
router.get('/', isLoggedIn, function(req, res, next) {

  // use Account model to run a query
  Account.find(function(err, accounts) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      // load the users and their id view
      res.render('users', {
        title: 'Users',
        users: accounts,
        user: req.user
      });
    }
  });
});


module.exports = router;
