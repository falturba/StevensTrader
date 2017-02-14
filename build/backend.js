require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch(e) {
/******/ 			return callback();
/******/ 		}
/******/ 		callback(null, update);
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "cb260ed093ebfec719d8"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals __resourceQuery */
	if(true) {
		function checkForUpdate(fromUpdate) {
			module.hot.check(function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update.");
						console.warn("[HMR] " + err.stack || err.message);
						console.warn("[HMR] You need to restart the application!");
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}
				if(!updatedModules) {
					if(fromUpdate)
						console.log("[HMR] Update applied.");
					else
						console.warn("[HMR] Cannot find update.");
					return;
				}
	
				module.hot.apply({
					ignoreUnaccepted: true
				}, function(err, renewedModules) {
					if(err) {
						if(module.hot.status() in {
								abort: 1,
								fail: 1
							}) {
							console.warn("[HMR] Cannot apply update (Need to do a full reload!)");
							console.warn("[HMR] " + err.stack || err.message);
							console.warn("[HMR] You need to restart the application!");
						} else {
							console.warn("[HMR] Update failed: " + err.stack || err.message);
						}
						return;
					}
	
					__webpack_require__(2)(updatedModules, renewedModules);
	
					checkForUpdate(true);
				});
			});
		}
	
		process.on(__resourceQuery.substr(1) || "SIGUSR2", function() {
			if(module.hot.status() !== "idle") {
				console.warn("[HMR] Got signal but currently in " + module.hot.status() + " state.");
				console.warn("[HMR] Need to be in idle state to start hot update.");
				return;
			}
	
			checkForUpdate();
		});
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});
	
		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}
	
		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var fallback = __webpack_require__(18);
	var path = __webpack_require__(19);
	var express = __webpack_require__(4);
	var fs = __webpack_require__(5);
	__webpack_require__(6);
	
	console.log('server is starting');
	var app = express();
	var port = 4000;
	app.listen(port, listening);
	function listening() {
		console.log('listening in port ' + port);
	}
	
	//include all the services
	fs.readdirSync('./services').forEach(function (fileName) {
		if (fileName.indexOf('.js') > 0) app.use('/services', __webpack_require__(8)("./" + fileName));
	});
	
	//include all the routes
	// fs.readdirSync('./routes').forEach(function(fileName){
	// 	if(fileName.indexOf('.js')>0)
	// 	app.use(require('./routes/'+fileName));
	// })
	
	
	//set fullback url to public/index.html
	var dirname = path.resolve(); // for fixing empty path problem when using gulp
	app.use(express.static(path.join(dirname, 'public')));
	app.use(fallback('public/index.html', { root: dirname }));
	app.get('*', function (req, res) {
		console.log("in....:" + dirname);
		res.sendFile("index.html", { "root": dirname });
	});
	
	/* HOT PATCH LOADER */ var __moduleBindings = ["listening"]; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// mongoose 4.3.x
	var mongoose = __webpack_require__(7);
	
	/* 
	 * Mongoose by default sets the auto_reconnect option to true.
	 * We recommend setting socket options at both the server and replica set level.
	 * We recommend a 30 second connection timeout because it allows for 
	 * plenty of time in most operating environments.
	 */
	var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	  user: 'dbuser',
	  pass: 'strader@123'
	};
	
	var mongodbUri = 'mongodb://ds139959.mlab.com:39959/stevenstradersystem';
	mongoose.Promise = global.Promise;
	mongoose.connect(mongodbUri, options);
	var conn = mongoose.connection;
	
	conn.on('error', console.error.bind(console, 'connection error:'));
	
	conn.once('open', function () {
	  // Wait for the database connection to establish, then start the app.
	  console.log("Establish database connection successfully.");
	});
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./index": 9,
		"./index.js": 9,
		"./login": 10,
		"./login.js": 10,
		"./signup": 12,
		"./signup.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 8;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(4);
	var services = express.Router();
	
	services.use(function timeLog(req, res, next) {
	  console.log('Time: ', Date.now());
	  next();
	});
	
	module.exports = services;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(4);
	var services = express.Router();
	var Account = __webpack_require__(11);
	
	services.post('/login', function (req, res) {});
	
	module.exports = services;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var mongoose = __webpack_require__(7);
	var Schema = mongoose.Schema;
	
	// create a schema
	var accountSchema = new Schema({
	  name: { type: String, required: true },
	  email: { type: String, required: true, unique: true, lowercase: true },
	  password: { type: String, required: true }
	});
	
	accountSchema.methods.validPassword = function (password) {
	  return bcrypt.compareSync(password, this.password);
	};
	
	// the schema is useless so far
	// we need to create a model using it
	var Account = mongoose.model('Account', accountSchema);
	
	// make this available to our users in our Node applications
	module.exports = Account;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var express = __webpack_require__(4);
	var services = express.Router();
	var Account = __webpack_require__(11);
	var bodyParser = __webpack_require__(13);
	var email_verfier = __webpack_require__(14);
	
	services.use(bodyParser.json());
	
	services.post('/signup', function (req, res) {
	  var email = req.body.email;
	  console.log(email);
	  if (req.body.type === 'register') {
	    var newAccount = new Account({
	      name: req.body.name,
	      email: email,
	      password: req.body.password
	    });
	    email_verfier.createTempUser(newAccount, function (err, existingPersistentUser, newTempUser) {
	      if (err) {
	        return res.status(404).send('ERROR: creating temp user FAILED');
	      }
	
	      // user already exists in persistent collection
	      if (existingPersistentUser) {
	        return res.json({
	          msg: 'You have already signed up and confirmed your account. Did you forget your password?'
	        });
	      }
	
	      // new account created
	      if (newTempUser) {
	        var URL = newTempUser[email_verfier.options.URLFieldName];
	
	        email_verfier.sendVerificationEmail(email, URL, function (err, info) {
	          if (err) {
	            console.log(err);
	            return res.status(404).send('ERROR: sending verification email FAILED');
	          }
	          res.json({
	            msg: 'An email has been sent to you. Please check it to verify your account.',
	            info: info
	          });
	        });
	
	        // user already exists in temporary collection!
	      } else {
	        res.json({
	          msg: 'You have already signed up. Please check your email to verify your account.'
	        });
	      }
	    });
	
	    // resend verification button was clicked
	  } else {
	    email_verfier.resendVerificationEmail(email, function (err, accountFound) {
	      if (err) {
	        return res.status(404).send('ERROR: resending verification email FAILED');
	      }
	      if (accountFound) {
	        res.json({
	          msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
	        });
	      } else {
	        res.json({
	          msg: 'Your verification code has expired. Please sign up again.'
	        });
	      }
	    });
	  }
	});
	
	// user accesses the link that is sent
	services.get('/verification/:URL', function (req, res) {
	  var url = req.params.URL;
	  email_verfier.confirmTempUser(url, function (err, user) {
	    if (user) {
	      email_verfier.sendConfirmationEmail(user.email, function (err, info) {
	        if (err) {
	          console.log(err);
	          return res.status(404).send('ERROR: sending confirmation email FAILED');
	        }
	        res.json({
	          msg: 'CONFIRMED!',
	          info: info
	        });
	      });
	    } else {
	      return res.status(404).send('ERROR: confirming temp user FAILED');
	    }
	  });
	});
	
	module.exports = services;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	mongoose = __webpack_require__(7);
	nev = __webpack_require__(15)(mongoose);
	var bcrypt = __webpack_require__(16);
	var account = __webpack_require__(11);
	var tempAccount = __webpack_require__(17);
	
	// async version of hashing function
	myHasher = function (password, tempUserData, insertTempUser, callback) {
	  bcrypt.genSalt(8, function (err, salt) {
	    bcrypt.hash(password, salt, function (err, hash) {
	      return insertTempUser(hash, tempUserData, callback);
	    });
	  });
	};
	
	nev.configure({
	  tempUserModel: tempAccount,
	  persistentUserModel: account,
	  expirationTime: 600, // 10 minutes
	  tempUserCollection: 'temp_accounts',
	  verificationURL: 'http://localhost:3000/services/verification/${URL}',
	  transportOptions: {
	    service: 'Gmail',
	    auth: {
	      user: 'stevenstradersystem@gmail.com',
	      pass: 'trader$@stevens'
	    }
	  },
	  verifyMailOptions: {
	    from: 'Do Not Reply <stevenstradersystem@gmail.com>',
	    subject: 'Confirm your account',
	    html: '<p>Thank you for registering in the Stevens Trader System\n \nPlease verify your account by clicking <a href="${URL}">this link</a>. If you are unable to do so, copy and ' + 'paste the following link into your browser:</p><p>${URL}</p>',
	    text: 'Please verify your account by clicking the following link, or by copying and pasting it into your browser: ${URL}'
	  },
	  shouldSendConfirmation: true,
	  confirmMailOptions: {
	    from: 'Do Not Reply <stevenstradersystem@gmail.com>',
	    subject: 'Successfully verified!',
	    html: '<p>Your account has been successfully verified.</p>',
	    text: 'Your account has been successfully verified.'
	  },
	
	  hashingFunction: myHasher,
	  passwordFieldName: 'password'
	}, function (err, options) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	
	  console.log('configured: ' + (typeof options === 'object'));
	});
	
	nev.generateTempUserModel(account, function (err, tempAccount) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	
	  console.log('generated temp account model: ' + (typeof tempUserModel === 'function'));
	});
	
	module.exports = nev;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("email-verification");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var mongoose = __webpack_require__(7);
	var Schema = mongoose.Schema;
	
	//This model for unverfied users
	var tempAccountSchema = new Schema({
	  name: String,
	  email: { type: String, required: true, unique: true, lowercase: true },
	  pssword: { type: String, required: true },
	  GENERATED_VERIFYING_URL: String
	});
	
	var Temp_Account = mongoose.model('Temp_Account', tempAccountSchema);
	
	module.exports = Temp_Account;
	
	/* HOT PATCH LOADER */ var __moduleBindings = []; if(true) {
	  module.hot.accept(function(err) {
	    console.log('[HMR] Error accepting: ' + err);
	  });

	  var getEvalSource = function(func) {
	    var code = func.toString();
	    var m = code.match(/^function\s+__eval\s*\((.*)\)\s*\{([\s\S]*)\}$/i);
	    if(!m) {
	      return null;
	    }
	    var args = m[1];
	    var body = m[2];
	    var scope = {};

	    if(args.trim()) {
	      args.split(',').forEach(function(arg) {
	        if(arg.indexOf('=') !== -1) {
	          var p = arg.split('=');
	          scope[p[0].trim()] = JSON.parse(p[1]);
	        }
	        else {
	          scope[arg.trim()] = undefined;
	        }
	      });
	    }

	    return { body: body, scope: scope };
	  }

	  var injectScope = function(scope, code) {
	    // Take an explicit scope object and inject it so that
	    // `code` runs in context of it
	    var injected = Object.keys(scope).map(function(binding) {
	      return 'var ' + binding + ' = evalScope.' + binding + ';'
	    }).join(' ');

	    // Update our scope object with any modifications
	    var extracted = Object.keys(scope).map(function(binding) {
	      return 'evalScope.' + binding + ' = ' + binding + ';';
	    }).join(' ');

	    return injected + code + extracted;
	  }

	  var bindings = __moduleBindings;

	  if(!module.hot.data) {
	    // First time loading. Try and patch something.
	    var patchedBindings = {};
	    var evalScope = {};

	    var moduleEvalWithScope = function(frame) {
	      // Update the scope to reflect only the values specified as
	      // arguments to the __eval function. Copy over values from the
	      // existing scope and ignore the rest.
	      Object.keys(evalScope).forEach(function(arg) {
	        if(arg in frame.scope) {
	          frame.scope[arg] = evalScope[arg];
	        }
	      });
	      evalScope = frame.scope;

	      var code = injectScope(evalScope, frame.body);
	      return eval(code);
	    }

	    var moduleEval = function(code) {
	      return eval(code);
	    }

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        var patched = function() {
	          if(patchedBindings[binding]) {
	            return patchedBindings[binding].apply(this, arguments);
	          }
	          else {
	            return f.apply(this, arguments);
	          }
	        };
	        patched.prototype = f.prototype;

	        eval(binding + ' = patched;\n');

	        if(module.exports[binding]) {
	          module.exports[binding] = patched;
	        }
	      }
	    });

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = moduleEval;
	      data.moduleEvalWithScope = moduleEvalWithScope;
	    });
	  }
	  else {
	    var patchedBindings = module.hot.data.patchedBindings;

	    bindings.forEach(function(binding) {
	      var f = eval(binding);

	      if(typeof f === 'function' && binding !== '__eval') {
	        // We need to reify the function in the original module so
	        // it references any of the original state. Strip the name
	        // and simply eval it.
	        var funcCode = (
	          '(' + f.toString().replace(/^function \w+\(/, 'function (') + ')'
	        );
	        patchedBindings[binding] = module.hot.data.moduleEval(funcCode);
	      }
	    });

	    if(typeof __eval === 'function') {
	      try {
	        module.hot.data.moduleEvalWithScope(getEvalSource(__eval));
	      }
	      catch(e) {
	        console.log('error evaling: ' + e);
	      }
	    }

	    module.hot.dispose(function(data) {
	      data.patchedBindings = patchedBindings;
	      data.moduleEval = module.hot.data.moduleEval;
	      data.moduleEvalWithScope = module.hot.data.moduleEvalWithScope;
	    });
	  }
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("express-history-api-fallback");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ }
/******/ ]);
//# sourceMappingURL=backend.js.map