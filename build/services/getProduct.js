'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _item = require('../models/item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
router.get('/getproduct/:id', function (req, res) {
    // console.dir(req)
    _item2.default.findOne({ _id: req.params.id }, function (error, data) {
        console.dir(data);
        res.status(200).json({ product: data });
    });
    // res.writeHead(200, {'Content-Type': 'application/json'})
    // res.json({status:'ok'})
});
module.exports = router;
//# sourceMappingURL=getProduct.js.map