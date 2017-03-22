'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _item = require('../models/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/getproducts', function (req, res) {
    // console.dir(req)

    _item2.default.find({}, function (error, data) {
        res.status(200).json({ products: data });
    });
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
});
module.exports = router;
//# sourceMappingURL=getProducts.js.map