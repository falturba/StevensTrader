require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("var express = __webpack_require__(1);\nvar fs = __webpack_require__(2);\n__webpack_require__(3);\n\nconsole.log('server is starting');\nvar app = express();\nvar port = 3000;\napp.listen(port, listening);\nfunction listening() {\n\tconsole.log(`listening in port ${port}`);\n}\n\n//include all the services\nfs.readdirSync('./services').forEach(function (fileName) {\n\tif (fileName.indexOf('.js') > 0) app.use('/services', __webpack_require__(5)(\"./\" + fileName));\n});\n\n//include all the routes\n// fs.readdirSync('./routes').forEach(function(fileName){\n// \tif(fileName.indexOf('.js')>0)\n// \tapp.use(require('./routes/'+fileName));\n// })\napp.use(express.static('public'));\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2ZXIuanM/N2FhMiJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsImZzIiwiY29uc29sZSIsImxvZyIsImFwcCIsInBvcnQiLCJsaXN0ZW4iLCJsaXN0ZW5pbmciLCJyZWFkZGlyU3luYyIsImZvckVhY2giLCJmaWxlTmFtZSIsImluZGV4T2YiLCJ1c2UiLCJzdGF0aWMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFVBQVUsbUJBQUFDLENBQVEsQ0FBUixDQUFkO0FBQ0EsSUFBSUMsS0FBSyxtQkFBQUQsQ0FBUSxDQUFSLENBQVQ7QUFDQSxtQkFBQUEsQ0FBUSxDQUFSOztBQUdBRSxRQUFRQyxHQUFSLENBQVksb0JBQVo7QUFDQSxJQUFJQyxNQUFNTCxTQUFWO0FBQ0EsSUFBSU0sT0FBTyxJQUFYO0FBQ0FELElBQUlFLE1BQUosQ0FBV0QsSUFBWCxFQUFpQkUsU0FBakI7QUFDQSxTQUFTQSxTQUFULEdBQW9CO0FBQ25CTCxTQUFRQyxHQUFSLENBQWEscUJBQW9CRSxJQUFLLEVBQXRDO0FBQ0E7O0FBRUQ7QUFDQUosR0FBR08sV0FBSCxDQUFlLFlBQWYsRUFBNkJDLE9BQTdCLENBQXFDLFVBQVNDLFFBQVQsRUFBa0I7QUFDdEQsS0FBR0EsU0FBU0MsT0FBVCxDQUFpQixLQUFqQixJQUF3QixDQUEzQixFQUNBUCxJQUFJUSxHQUFKLENBQVEsV0FBUixFQUFvQiwyQkFBUSxHQUFjRixRQUF0QixDQUFwQjtBQUNBLENBSEQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBTixJQUFJUSxHQUFKLENBQVFiLFFBQVFjLE1BQVIsQ0FBZSxRQUFmLENBQVIiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBleHByZXNzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG52YXIgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5yZXF1aXJlKFwiLi9saWJzL21vbmdvb3NlLWluaXRcIik7XG5cblxuY29uc29sZS5sb2coJ3NlcnZlciBpcyBzdGFydGluZycpO1xudmFyIGFwcCA9IGV4cHJlc3MoKTtcbnZhciBwb3J0ID0gMzAwMDtcbmFwcC5saXN0ZW4ocG9ydCwgbGlzdGVuaW5nKTtcbmZ1bmN0aW9uIGxpc3RlbmluZygpe1xuXHRjb25zb2xlLmxvZyhgbGlzdGVuaW5nIGluIHBvcnQgJHtwb3J0fWApO1xufVxuXG4vL2luY2x1ZGUgYWxsIHRoZSBzZXJ2aWNlc1xuZnMucmVhZGRpclN5bmMoJy4vc2VydmljZXMnKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGVOYW1lKXtcblx0aWYoZmlsZU5hbWUuaW5kZXhPZignLmpzJyk+MClcblx0YXBwLnVzZSgnL3NlcnZpY2VzJyxyZXF1aXJlKCcuL3NlcnZpY2VzLycrZmlsZU5hbWUpKTtcbn0pXG5cbi8vaW5jbHVkZSBhbGwgdGhlIHJvdXRlc1xuLy8gZnMucmVhZGRpclN5bmMoJy4vcm91dGVzJykuZm9yRWFjaChmdW5jdGlvbihmaWxlTmFtZSl7XG4vLyBcdGlmKGZpbGVOYW1lLmluZGV4T2YoJy5qcycpPjApXG4vLyBcdGFwcC51c2UocmVxdWlyZSgnLi9yb3V0ZXMvJytmaWxlTmFtZSkpO1xuLy8gfSlcbmFwcC51c2UoZXhwcmVzcy5zdGF0aWMoJ3B1YmxpYycpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2ZXIuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = require(\"express\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJleHByZXNzXCI/ZDJkMiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImV4cHJlc3NcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = require(\"fs\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiPzJlMDkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZnNcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("// mongoose 4.3.x\nvar mongoose = __webpack_require__(4);\n\n/* \n * Mongoose by default sets the auto_reconnect option to true.\n * We recommend setting socket options at both the server and replica set level.\n * We recommend a 30 second connection timeout because it allows for \n * plenty of time in most operating environments.\n */\nvar options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },\n  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },\n  user: 'dbuser',\n  pass: 'strader@123'\n};\n\nvar mongodbUri = 'mongodb://ds139959.mlab.com:39959/stevenstradersystem';\nmongoose.Promise = global.Promise;\nmongoose.connect(mongodbUri, options);\nvar conn = mongoose.connection;\n\nconn.on('error', console.error.bind(console, 'connection error:'));\n\nconn.once('open', function () {\n  // Wait for the database connection to establish, then start the app.\n  console.log(\"Establish database connection successfully.\");\n});\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL21vbmdvb3NlLWluaXQuanM/MjA4YyJdLCJuYW1lcyI6WyJtb25nb29zZSIsInJlcXVpcmUiLCJvcHRpb25zIiwic2VydmVyIiwic29ja2V0T3B0aW9ucyIsImtlZXBBbGl2ZSIsImNvbm5lY3RUaW1lb3V0TVMiLCJyZXBsc2V0IiwidXNlciIsInBhc3MiLCJtb25nb2RiVXJpIiwiUHJvbWlzZSIsImdsb2JhbCIsImNvbm5lY3QiLCJjb25uIiwiY29ubmVjdGlvbiIsIm9uIiwiY29uc29sZSIsImVycm9yIiwiYmluZCIsIm9uY2UiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0EsSUFBSUEsV0FBVyxtQkFBQUMsQ0FBUSxDQUFSLENBQWY7O0FBRUE7Ozs7OztBQU1BLElBQUlDLFVBQVUsRUFBRUMsUUFBUSxFQUFFQyxlQUFlLEVBQUVDLFdBQVcsTUFBYixFQUFxQkMsa0JBQWtCLEtBQXZDLEVBQWpCLEVBQVY7QUFDRUMsV0FBUyxFQUFFSCxlQUFlLEVBQUVDLFdBQVcsTUFBYixFQUFxQkMsa0JBQW1CLEtBQXhDLEVBQWpCLEVBRFg7QUFFRUUsUUFBTSxRQUZSO0FBR0VDLFFBQU07QUFIUixDQUFkOztBQU1BLElBQUlDLGFBQWEsdURBQWpCO0FBQ0FWLFNBQVNXLE9BQVQsR0FBbUJDLE9BQU9ELE9BQTFCO0FBQ0FYLFNBQVNhLE9BQVQsQ0FBaUJILFVBQWpCLEVBQTZCUixPQUE3QjtBQUNBLElBQUlZLE9BQU9kLFNBQVNlLFVBQXBCOztBQUVBRCxLQUFLRSxFQUFMLENBQVEsT0FBUixFQUFpQkMsUUFBUUMsS0FBUixDQUFjQyxJQUFkLENBQW1CRixPQUFuQixFQUE0QixtQkFBNUIsQ0FBakI7O0FBRUFILEtBQUtNLElBQUwsQ0FBVSxNQUFWLEVBQWtCLFlBQVc7QUFDM0I7QUFDQUgsVUFBUUksR0FBUixDQUFZLDZDQUFaO0FBQ0QsQ0FIRCIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbW9uZ29vc2UgNC4zLnhcbnZhciBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG4gXG4vKiBcbiAqIE1vbmdvb3NlIGJ5IGRlZmF1bHQgc2V0cyB0aGUgYXV0b19yZWNvbm5lY3Qgb3B0aW9uIHRvIHRydWUuXG4gKiBXZSByZWNvbW1lbmQgc2V0dGluZyBzb2NrZXQgb3B0aW9ucyBhdCBib3RoIHRoZSBzZXJ2ZXIgYW5kIHJlcGxpY2Egc2V0IGxldmVsLlxuICogV2UgcmVjb21tZW5kIGEgMzAgc2Vjb25kIGNvbm5lY3Rpb24gdGltZW91dCBiZWNhdXNlIGl0IGFsbG93cyBmb3IgXG4gKiBwbGVudHkgb2YgdGltZSBpbiBtb3N0IG9wZXJhdGluZyBlbnZpcm9ubWVudHMuXG4gKi9cbnZhciBvcHRpb25zID0geyBzZXJ2ZXI6IHsgc29ja2V0T3B0aW9uczogeyBrZWVwQWxpdmU6IDMwMDAwMCwgY29ubmVjdFRpbWVvdXRNUzogMzAwMDAgfSB9LCBcbiAgICAgICAgICAgICAgICByZXBsc2V0OiB7IHNvY2tldE9wdGlvbnM6IHsga2VlcEFsaXZlOiAzMDAwMDAsIGNvbm5lY3RUaW1lb3V0TVMgOiAzMDAwMCB9IH0sXG4gICAgICAgICAgICAgICAgdXNlcjogJ2RidXNlcicsXG4gICAgICAgICAgICAgICAgcGFzczogJ3N0cmFkZXJAMTIzJ1xuICAgICAgICAgICAgICAgICB9OyAgICAgICBcbiBcbnZhciBtb25nb2RiVXJpID0gJ21vbmdvZGI6Ly9kczEzOTk1OS5tbGFiLmNvbTozOTk1OS9zdGV2ZW5zdHJhZGVyc3lzdGVtJztcbm1vbmdvb3NlLlByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbm1vbmdvb3NlLmNvbm5lY3QobW9uZ29kYlVyaSwgb3B0aW9ucyk7XG52YXIgY29ubiA9IG1vbmdvb3NlLmNvbm5lY3Rpb247ICAgICAgICAgICAgIFxuIFxuY29ubi5vbignZXJyb3InLCBjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSwgJ2Nvbm5lY3Rpb24gZXJyb3I6JykpOyAgXG4gXG5jb25uLm9uY2UoJ29wZW4nLCBmdW5jdGlvbigpIHtcbiAgLy8gV2FpdCBmb3IgdGhlIGRhdGFiYXNlIGNvbm5lY3Rpb24gdG8gZXN0YWJsaXNoLCB0aGVuIHN0YXJ0IHRoZSBhcHAuXG4gIGNvbnNvbGUubG9nKFwiRXN0YWJsaXNoIGRhdGFiYXNlIGNvbm5lY3Rpb24gc3VjY2Vzc2Z1bGx5LlwiKTsgICAgICAgICAgICAgICAgICAgICAgICAgXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYnMvbW9uZ29vc2UtaW5pdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("module.exports = require(\"mongoose\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJtb25nb29zZVwiP2Q1MDUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm1vbmdvb3NlXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwibW9uZ29vc2VcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	eval("var map = {\n\t\"./index\": 6,\n\t\"./index.js\": 6,\n\t\"./login\": 7,\n\t\"./login.js\": 7,\n\t\"./signup\": 9,\n\t\"./signup.js\": 9\n};\nfunction webpackContext(req) {\n\treturn __webpack_require__(webpackContextResolve(req));\n};\nfunction webpackContextResolve(req) {\n\treturn map[req] || (function() { throw new Error(\"Cannot find module '\" + req + \"'.\") }());\n};\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = 5;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcyBeXFwuXFwvLiokPzg1OGMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHVEQUF1RDtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI1LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcCA9IHtcblx0XCIuL2luZGV4XCI6IDYsXG5cdFwiLi9pbmRleC5qc1wiOiA2LFxuXHRcIi4vbG9naW5cIjogNyxcblx0XCIuL2xvZ2luLmpzXCI6IDcsXG5cdFwiLi9zaWdudXBcIjogOSxcblx0XCIuL3NpZ251cC5qc1wiOiA5XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NlcnZpY2VzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	eval("var express = __webpack_require__(1);\nvar services = express.Router();\n\nservices.use(function timeLog(req, res, next) {\n  console.log('Time: ', Date.now());\n  next();\n});\n\nmodule.exports = services;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9pbmRleC5qcz8yOGEwIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJyZXF1aXJlIiwic2VydmljZXMiLCJSb3V0ZXIiLCJ1c2UiLCJ0aW1lTG9nIiwicmVxIiwicmVzIiwibmV4dCIsImNvbnNvbGUiLCJsb2ciLCJEYXRlIiwibm93IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsVUFBVSxtQkFBQUMsQ0FBUSxDQUFSLENBQWQ7QUFDQSxJQUFJQyxXQUFXRixRQUFRRyxNQUFSLEVBQWY7O0FBRUFELFNBQVNFLEdBQVQsQ0FBYSxTQUFTQyxPQUFULENBQWtCQyxHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQzdDQyxVQUFRQyxHQUFSLENBQVksUUFBWixFQUFzQkMsS0FBS0MsR0FBTCxFQUF0QjtBQUNBSjtBQUNELENBSEQ7O0FBS0FLLE9BQU9DLE9BQVAsR0FBaUJaLFFBQWpCIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxudmFyIHNlcnZpY2VzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuc2VydmljZXMudXNlKGZ1bmN0aW9uIHRpbWVMb2cgKHJlcSwgcmVzLCBuZXh0KSB7XG4gIGNvbnNvbGUubG9nKCdUaW1lOiAnLCBEYXRlLm5vdygpKVxuICBuZXh0KClcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZpY2VzXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZpY2VzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	eval("var express = __webpack_require__(1);\nvar services = express.Router();\nvar Account = __webpack_require__(8);\n\nservices.post('/login', function (req, res) {});\n\nmodule.exports = services;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9sb2dpbi5qcz8xOGZlIl0sIm5hbWVzIjpbImV4cHJlc3MiLCJyZXF1aXJlIiwic2VydmljZXMiLCJSb3V0ZXIiLCJBY2NvdW50IiwicG9zdCIsInJlcSIsInJlcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFVBQVUsbUJBQUFDLENBQVEsQ0FBUixDQUFkO0FBQ0EsSUFBSUMsV0FBV0YsUUFBUUcsTUFBUixFQUFmO0FBQ0EsSUFBSUMsVUFBVSxtQkFBQUgsQ0FBUSxDQUFSLENBQWQ7O0FBRUFDLFNBQVNHLElBQVQsQ0FBYyxRQUFkLEVBQXVCLFVBQVNDLEdBQVQsRUFBYUMsR0FBYixFQUFpQixDQUV2QyxDQUZEOztBQUlBQyxPQUFPQyxPQUFQLEdBQWlCUCxRQUFqQiIsImZpbGUiOiI3LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJylcbnZhciBzZXJ2aWNlcyA9IGV4cHJlc3MuUm91dGVyKCk7XG52YXIgQWNjb3VudCA9IHJlcXVpcmUoJy4uL21vZGVscy9hY2NvdW50LmpzJyk7XG5cbnNlcnZpY2VzLnBvc3QoJy9sb2dpbicsZnVuY3Rpb24ocmVxLHJlcyl7XG5cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZpY2VzXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmljZXMvbG9naW4uanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	eval("var mongoose = __webpack_require__(4);\nvar Schema = mongoose.Schema;\n\n// create a schema\nvar accountSchema = new Schema({\n  name: String,\n  email: { type: String, required: true, unique: true },\n  hashedPassword: { type: String, required: true }\n});\n\n// the schema is useless so far\n// we need to create a model using it\nvar Account = mongoose.model('Account', accountSchema);\n\n// make this available to our users in our Node applications\nmodule.exports = Account;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9tb2RlbHMvYWNjb3VudC5qcz9lOWFkIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwicmVxdWlyZSIsIlNjaGVtYSIsImFjY291bnRTY2hlbWEiLCJuYW1lIiwiU3RyaW5nIiwiZW1haWwiLCJ0eXBlIiwicmVxdWlyZWQiLCJ1bmlxdWUiLCJoYXNoZWRQYXNzd29yZCIsIkFjY291bnQiLCJtb2RlbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBLElBQUlBLFdBQVcsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0EsSUFBSUMsU0FBU0YsU0FBU0UsTUFBdEI7O0FBRUE7QUFDQSxJQUFJQyxnQkFBZ0IsSUFBSUQsTUFBSixDQUFXO0FBQzdCRSxRQUFNQyxNQUR1QjtBQUU3QkMsU0FBTyxFQUFFQyxNQUFNRixNQUFSLEVBQWdCRyxVQUFVLElBQTFCLEVBQWdDQyxRQUFRLElBQXhDLEVBRnNCO0FBRzdCQyxrQkFBZ0IsRUFBRUgsTUFBTUYsTUFBUixFQUFnQkcsVUFBVSxJQUExQjtBQUhhLENBQVgsQ0FBcEI7O0FBTUE7QUFDQTtBQUNBLElBQUlHLFVBQVVYLFNBQVNZLEtBQVQsQ0FBZSxTQUFmLEVBQTBCVCxhQUExQixDQUFkOztBQUVBO0FBQ0FVLE9BQU9DLE9BQVAsR0FBaUJILE9BQWpCIiwiZmlsZSI6IjguanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xudmFyIFNjaGVtYSA9IG1vbmdvb3NlLlNjaGVtYTtcblxuLy8gY3JlYXRlIGEgc2NoZW1hXG52YXIgYWNjb3VudFNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICBuYW1lOiBTdHJpbmcsXG4gIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSB9LFxuICBoYXNoZWRQYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH1cbn0pO1xuXG4vLyB0aGUgc2NoZW1hIGlzIHVzZWxlc3Mgc28gZmFyXG4vLyB3ZSBuZWVkIHRvIGNyZWF0ZSBhIG1vZGVsIHVzaW5nIGl0XG52YXIgQWNjb3VudCA9IG1vbmdvb3NlLm1vZGVsKCdBY2NvdW50JywgYWNjb3VudFNjaGVtYSk7XG5cbi8vIG1ha2UgdGhpcyBhdmFpbGFibGUgdG8gb3VyIHVzZXJzIGluIG91ciBOb2RlIGFwcGxpY2F0aW9uc1xubW9kdWxlLmV4cG9ydHMgPSBBY2NvdW50O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL21vZGVscy9hY2NvdW50LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	eval("var express = __webpack_require__(1);\nvar services = express.Router();\nvar bcrypt = __webpack_require__(10);\nvar Account = __webpack_require__(8);\nvar bodyParser = __webpack_require__(11);\nservices.use(bodyParser.json());\n\nservices.post('/signup', function (req, res) {\n\tvar hashedPassword = bcrypt.hashSync(req.body.password, 10);\n\tvar newAccount = new Account({\n\t\tname: req.body.name,\n\t\temail: req.body.email,\n\t\thashedPassword: hashedPassword\n\t});\n\tnewAccount.save(function (err) {\n\t\tif (err) {\n\t\t\tres.json({\n\t\t\t\t\"status\": \"failed\"\n\t\t\t});\n\t\t} else {\n\t\t\tres.json({\n\t\t\t\t\"status\": \"success\"\n\t\t\t});\n\t\t}\n\t});\n});\n\nservices.get('/accounts', function (req, res) {\n\tAccount.find(function (err, acc) {\n\t\tres.send(acc);\n\t});\n});\n\nmodule.exports = services;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9zaWdudXAuanM/OTNmZSJdLCJuYW1lcyI6WyJleHByZXNzIiwicmVxdWlyZSIsInNlcnZpY2VzIiwiUm91dGVyIiwiYmNyeXB0IiwiQWNjb3VudCIsImJvZHlQYXJzZXIiLCJ1c2UiLCJqc29uIiwicG9zdCIsInJlcSIsInJlcyIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaFN5bmMiLCJib2R5IiwicGFzc3dvcmQiLCJuZXdBY2NvdW50IiwibmFtZSIsImVtYWlsIiwic2F2ZSIsImVyciIsImdldCIsImZpbmQiLCJhY2MiLCJzZW5kIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSUEsVUFBVSxtQkFBQUMsQ0FBUSxDQUFSLENBQWQ7QUFDQSxJQUFJQyxXQUFXRixRQUFRRyxNQUFSLEVBQWY7QUFDQSxJQUFJQyxTQUFTLG1CQUFBSCxDQUFRLEVBQVIsQ0FBYjtBQUNBLElBQUlJLFVBQVUsbUJBQUFKLENBQVEsQ0FBUixDQUFkO0FBQ0EsSUFBSUssYUFBYSxtQkFBQUwsQ0FBUSxFQUFSLENBQWpCO0FBQ0FDLFNBQVNLLEdBQVQsQ0FBYUQsV0FBV0UsSUFBWCxFQUFiOztBQUVBTixTQUFTTyxJQUFULENBQWMsU0FBZCxFQUF3QixVQUFTQyxHQUFULEVBQWFDLEdBQWIsRUFBaUI7QUFDeEMsS0FBSUMsaUJBQWlCUixPQUFPUyxRQUFQLENBQWdCSCxJQUFJSSxJQUFKLENBQVNDLFFBQXpCLEVBQWtDLEVBQWxDLENBQXJCO0FBQ0EsS0FBSUMsYUFBYSxJQUFJWCxPQUFKLENBQVk7QUFDNUJZLFFBQU1QLElBQUlJLElBQUosQ0FBU0csSUFEYTtBQUU1QkMsU0FBT1IsSUFBSUksSUFBSixDQUFTSSxLQUZZO0FBRzVCTixrQkFBZ0JBO0FBSFksRUFBWixDQUFqQjtBQUtBSSxZQUFXRyxJQUFYLENBQWdCLFVBQVNDLEdBQVQsRUFBYTtBQUM1QixNQUFHQSxHQUFILEVBQU87QUFDTlQsT0FBSUgsSUFBSixDQUFTO0FBQ1IsY0FBVTtBQURGLElBQVQ7QUFHQSxHQUpELE1BSU07QUFDTEcsT0FBSUgsSUFBSixDQUFTO0FBQ1IsY0FBVTtBQURGLElBQVQ7QUFHQTtBQUNELEVBVkQ7QUFXQSxDQWxCRDs7QUFvQkFOLFNBQVNtQixHQUFULENBQWEsV0FBYixFQUF5QixVQUFTWCxHQUFULEVBQWFDLEdBQWIsRUFBaUI7QUFDekNOLFNBQVFpQixJQUFSLENBQWEsVUFBU0YsR0FBVCxFQUFhRyxHQUFiLEVBQWlCO0FBQzdCWixNQUFJYSxJQUFKLENBQVNELEdBQVQ7QUFDQSxFQUZEO0FBR0EsQ0FKRDs7QUFNQUUsT0FBT0MsT0FBUCxHQUFpQnhCLFFBQWpCIiwiZmlsZSI6IjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXhwcmVzcyA9IHJlcXVpcmUoJ2V4cHJlc3MnKVxudmFyIHNlcnZpY2VzID0gZXhwcmVzcy5Sb3V0ZXIoKTtcbnZhciBiY3J5cHQgPSByZXF1aXJlKCdiY3J5cHQnKTtcbnZhciBBY2NvdW50ID0gcmVxdWlyZSgnLi4vbW9kZWxzL2FjY291bnQuanMnKTtcbnZhciBib2R5UGFyc2VyID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpO1xuc2VydmljZXMudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuc2VydmljZXMucG9zdCgnL3NpZ251cCcsZnVuY3Rpb24ocmVxLHJlcyl7XG5cdHZhciBoYXNoZWRQYXNzd29yZCA9IGJjcnlwdC5oYXNoU3luYyhyZXEuYm9keS5wYXNzd29yZCwxMCk7XG5cdHZhciBuZXdBY2NvdW50ID0gbmV3IEFjY291bnQoe1xuXHRcdG5hbWU6IHJlcS5ib2R5Lm5hbWUsXG5cdFx0ZW1haWw6IHJlcS5ib2R5LmVtYWlsLFxuXHRcdGhhc2hlZFBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZFxuXHR9KTtcblx0bmV3QWNjb3VudC5zYXZlKGZ1bmN0aW9uKGVycil7XG5cdFx0aWYoZXJyKXtcblx0XHRcdHJlcy5qc29uKHtcblx0XHRcdFx0XCJzdGF0dXNcIjogXCJmYWlsZWRcIlxuXHRcdFx0fSlcblx0XHR9ZWxzZSB7XG5cdFx0XHRyZXMuanNvbih7XG5cdFx0XHRcdFwic3RhdHVzXCI6IFwic3VjY2Vzc1wiXG5cdFx0XHR9KVxuXHRcdH1cblx0fSk7XG59KTtcblxuc2VydmljZXMuZ2V0KCcvYWNjb3VudHMnLGZ1bmN0aW9uKHJlcSxyZXMpe1xuXHRBY2NvdW50LmZpbmQoZnVuY3Rpb24oZXJyLGFjYyl7XG5cdFx0cmVzLnNlbmQoYWNjKTtcblx0fSlcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNlcnZpY2VzXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZpY2VzL3NpZ251cC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 10 */
/***/ function(module, exports) {

	eval("module.exports = require(\"bcrypt\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiY3J5cHRcIj8wMzllIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmNyeXB0XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiYmNyeXB0XCJcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 11 */
/***/ function(module, exports) {

	eval("module.exports = require(\"body-parser\");\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiPzQ2NTciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImJvZHktcGFyc2VyXCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);