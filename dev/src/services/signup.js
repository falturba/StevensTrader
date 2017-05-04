var express = require('express')
var services = express.Router();
var Account = require('../models/account.js');
var bodyParser = require("body-parser");
var email_verfier = require("../libs/email_verifier.js");
// var stormpath = require('express-stormpath');

services.use(bodyParser.json());


services.post('/signup', function (req, res) {
  var email = req.body.email;
  console.log(req.body);
  if (req.body.type === 'register') {
    var newAccount = new Account({
      name: req.body.name,
      email: email,
      password: req.body.password,
      status: 'active'
    });
    email_verfier.createTempUser(newAccount, function (err, existingPersistentUser, newTempUser) {
      if (err) {
        return res.status(404).send('ERROR: creating temp user FAILED');

      }

      // user already exists in persistent collection
      if (existingPersistentUser) {
        return res.json({
          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
        });
      }

      // new account created
      if (newTempUser) {
        var URL = newTempUser[email_verfier.options.URLFieldName];

        email_verfier.sendVerificationEmail(email, URL, function (err, info) {
          if (err) {
            console.log(err);
            return res.status(404).send('ERROR: sending verification email FAILED');
          }
          res.json({
            msg: 'An email has been sent to you. Please check it to verify your account.',
            info: info
          });
        });

        // user already exists in temporary collection!
      } else {
        res.json({
          msg: 'You have already signed up. Please check your email to verify your account.'
        });
      }
    });

    // resend verification button was clicked
  } else {
    email_verfier.resendVerificationEmail(email, function (err, accountFound) {
      if (err) {
        return res.status(404).send('ERROR: resending verification email FAILED');
      }
      if (accountFound) {
        res.json({
          msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
        });
      } else {
        res.json({
          msg: 'Your verification code has expired. Please sign up again.'
        });
      }
    });
  }
});

// user accesses the link that is sent
services.get('/verification/:URL', function (req, res) {
  var url = req.params.URL;
  email_verfier.confirmTempUser(url, function (err, user) {
    if (user) {
      email_verfier.sendConfirmationEmail(user.email, function (err, info) {
        if (err) {
          console.log(err);
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        
        res.send('../routes/html/confirmed.html')
      });
    } else {
      return res.status(409).send('Your account already has been verified');
    }
  });
});

/*services.get("/product",stormpath.apiAuthenticationRequired,function(req,res){
  res.json({"bike":"30"});
  //res.send("test");
});*/



module.exports = services

