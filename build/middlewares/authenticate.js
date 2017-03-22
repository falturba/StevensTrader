'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../config/jwtConfig');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (req, res, next) {
  var authorizationHeader = req.headers['authorization'];
  var token = void 0;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    _jsonwebtoken2.default.verify(token, _jwtConfig2.default.jwtSecret, function (err, decoded) {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        var account = new _account2.default(_extends({}, decoded));
        _account2.default.findOne({
          _id: decoded.id,
          name: decoded.name,
          email: decoded.email
        }, function (error, data) {
          if (error) {
            res.status(401).json({ errors: { form: 'There is database connection problem, please try again.' } });
          } else if (data) {
            next();
          } else {
            //not found user in server
            res.status(401).json({ error: 'Failed to authenticate' });
          }
        });
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
};
//# sourceMappingURL=authenticate.js.map