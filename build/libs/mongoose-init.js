'use strict';

var _config = require('../config');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  user: 'dbuser',
  pass: 'strader@123'
};
// mongoose 4.3.x


var mongodbUri = _config.dbPath;
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect(mongodbUri, options);
var conn = _mongoose2.default.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
  // Wait for the database connection to establish, then start the app.
  console.log("Establish database connection successfully.");
});
//# sourceMappingURL=mongoose-init.js.map