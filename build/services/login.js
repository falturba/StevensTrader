'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _account = require('../models/account');

var _account2 = _interopRequireDefault(_account);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtConfig = require('../config/jwtConfig');

var _jwtConfig2 = _interopRequireDefault(_jwtConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.use(_bodyParser2.default.json());

router.post('/login', function (req, res) {
    console.log("services/login", req.body);
    var _req$body = req.body,
        email = _req$body.email,
        password = _req$body.password;

    _account2.default.findOne({
        email: email
    }, function (error, data) {
        if (error) {
            res.status(500).json({ errors: { form: 'There is database connection problem, please try again.' } });
            return;
        } else if (data) {
            var account = new _account2.default(data);
            var isCorrectPassword = account.validPassword(password);
            //check hash password
            if (isCorrectPassword) {
                var token = _jsonwebtoken2.default.sign({
                    id: account._id.toString(),
                    name: account.name,
                    email: account.email
                }, _jwtConfig2.default.jwtSecret);
                console.dir(account._id.toString());
                res.json({ token: token });
            } else {
                res.status(401).json({ errors: { form: 'Password incorrect.' } });
            }
        } else {
            res.status(401).json({ errors: { form: 'Cannot find user.' } });
        }
    });
});

//can not use [export default] because the server.js use recursive require()
module.exports = router;
//# sourceMappingURL=login.js.map