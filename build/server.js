'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _expressHistoryApiFallback = require('express-history-api-fallback');

var _expressHistoryApiFallback2 = _interopRequireDefault(_expressHistoryApiFallback);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongooseInit = require('./libs/mongoose-init');

var _mongooseInit2 = _interopRequireDefault(_mongooseInit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverRoot = _path2.default.resolve(process.cwd(), "src");
console.log("server root path is : " + serverRoot);
console.log('server is starting...');
var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ // to support URL-encoded bodies
	extended: false
}));

var port = process.env.PORT || 3000;
app.listen(port, listening);
function listening() {
	console.log('listening in port ' + port);
}

//include all the services
_fs2.default.readdirSync(serverRoot + '/services').forEach(function (fileName) {
	if (fileName.indexOf('.js') > 0) app.use('/services', require('./services/' + fileName));
});

_fs2.default.readdirSync(serverRoot + '/routes').forEach(function (fileName) {
	if (fileName.indexOf('.js') > 0) app.use(require('./routes/' + fileName));
});

//set fallback url to public/index.html
var dirname = _path2.default.resolve(); // for fixing empty path problem when using gulp
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
app.use((0, _expressHistoryApiFallback2.default)('/public/index.html', { root: dirname }));
app.get('*', function (req, res) {
	console.log("in....:" + dirname);
	res.sendFile(route + "../public/index.html", { "root": dirname });
});

app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

exports.default = app;
//# sourceMappingURL=server.js.map