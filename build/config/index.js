'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dbPath = void 0;
if (process.env.NODE_ENV == 'test') {
    exports.dbPath = dbPath = 'mongodb://ds023644.mlab.com:23644/stevenstradersystem_test';
} else {
    exports.dbPath = dbPath = 'mongodb://ds139959.mlab.com:39959/stevenstradersystem';
}
exports.dbPath = dbPath;
//# sourceMappingURL=index.js.map