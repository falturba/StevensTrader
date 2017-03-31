var mongoose = require('mongoose');
var nev = require('email-verification')(mongoose);
var bcrypt = require('bcrypt');
var account = require('../models/account');
var tempAccount = require('../models/temp_account');



// async version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};

nev.configure({
  tempUserModel: tempAccount,
  persistentUserModel: account,
  expirationTime: 600, // 10 minutes
tempUserCollection: 'temp_accounts',
  verificationURL: 'https://stevenstrader.herokuapp.com//services/verification/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'stevenstradersystem@gmail.com',
      pass: 'trader$@stevens'
    }
  },
  verifyMailOptions: {
        from: 'Do Not Reply <stevenstradersystem@gmail.com>',
        subject: 'Confirm your account',
        html: '<p>Thank you for registering in the Stevens Trader System\n \nPlease verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' +
                'paste the following link into your browser:</p><p>${URL}</p>',
        text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
    },
     shouldSendConfirmation: true,
    confirmMailOptions: {
        from: 'Do Not Reply <stevenstradersystem@gmail.com>',
        subject: 'Successfully verified!',
        html: '<p>Your account has been successfully verified.</p>',
        text: 'Your account has been successfully verified.'
    },

  hashingFunction: myHasher,
  passwordFieldName: 'password',
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});

nev.generateTempUserModel(account, function(err, tempAccount) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp account model: ' + (typeof tempUserModel === 'function'));
});
 
module.exports = nev