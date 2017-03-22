'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  image: { data: Buffer, contentType: String }
});

var Image = mongoose.model('Image', itemSchema);

module.exports = Image;
//# sourceMappingURL=image.js.map