'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _enum = require('./enum');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var itemMediaSchema = new Schema({
  type: { type: String, required: true },
  imageName: { type: String, required: true },
  thumbnailName: { type: String }
});
var itemSchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
  description: { type: String },
  condition: { type: String, required: true, enum: _enum.condintionEnum },
  price: { type: Number, required: true, min: _enum.priceMin, max: _enum.priceMax },
  medias: [{
    id: _mongoose2.default.Schema.Types.ObjectId,
    imageName: { type: String, required: true },
    thumbnailName: { type: String, required: true }
  }]
});

var Items = _mongoose2.default.model('Item', itemSchema);

exports.default = Items;
//# sourceMappingURL=item.js.map