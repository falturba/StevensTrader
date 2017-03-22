'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _authenticate = require('../middlewares/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

var _formidable = require('formidable');

var _formidable2 = _interopRequireDefault(_formidable);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _item = require('../models/item');

var _item2 = _interopRequireDefault(_item);

var _pathConfig = require('../config/pathConfig');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************************
 ************* IMPROVE ME ************
 *************************************/
// 1. Check file type
//  1.1 if video create thumbnail
//  1.2 if not image or video throw error
// 2. Check all image resize completed before save to DB.
//  2.1 Because it doesn't check for saving resize image, so cannot delete image_small(thumbnail) when insert DB fail
/*************************************/

var router = _express2.default.Router();
router.post('/postproduct', /*authenticate,*/function (req, res) {
    /**************************
    *** Raw function
    ****************************/
    // var data = ''

    // req.on('data', function (chunk) {
    //   console.log("chunk:",chunk)
    //   data += chunk
    // });

    // req.on('end', function () {
    //   console.log('File uploaded')
    //   res.status(201).json({ success: true })
    // })

    var data = { medias: [] };

    var form = new _formidable2.default.IncomingForm();

    form.parse(req, function (err, fields, files) {
        // console.dir(fields)
        // console.dir(files)
    }).on('fileBegin', function (name, file) {
        // before start buffer

        //   file.path =  imagePath+ file.name
        var id = _crypto2.default.randomBytes(16).toString("hex");
        file.path = _pathConfig.imageDir + id; //tell Formidable the path and name for saving image
        file.thumbnailSaveName = id + "_small"; //inject value attach to 'file' envent
        file.saveName = id; // inject value attach to 'file' envent
    }).on('file', function (name, file) {
        //receive file argument
        (0, _sharp2.default)(file.path).resize(320, 240).toFile(_pathConfig.imageDir + file.thumbnailSaveName, function (err, info) {
            return console.log(err, info);
        });
        data.medias.push({
            type: file.type,
            imageName: file.saveName,
            thumbnailName: file.thumbnailSaveName
        });
    }).on('field', function (field, value) {
        //receive field argument
        data[field] = value;
    }).on('end', function () {
        var item = new _item2.default(data);
        item.save(function (err, result) {
            if (err) {
                data.medias.forEach(function (media) {
                    _fs2.default.unlink(_pathConfig.imageDir + media.imageName, function () {});
                    _fs2.default.unlink(_pathConfig.imageDir + media.thumbnailName, function () {});
                });
                res.status(412).json(err); //db value is not valid
            } else {
                console.log("Complete save item.");
                res.status(200).json({ status: "post complete.", postId: result._doc._id.toString() });
            }
        });
    });
});

//export default router;
module.exports = router;
//# sourceMappingURL=postProduct.js.map