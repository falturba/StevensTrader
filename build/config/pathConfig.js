"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.imageDir = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageDir = exports.imageDir = process.cwd() + "/public/images/";
if (!_fs2.default.existsSync(imageDir)) {
    _fs2.default.mkdirSync(imageDir);
}
//# sourceMappingURL=pathConfig.js.map