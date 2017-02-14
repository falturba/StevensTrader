var express = require('express')
var services = express.Router();

services.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

module.exports = services

