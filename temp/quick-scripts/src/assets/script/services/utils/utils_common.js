"use strict";
cc._RF.push(module, '38328hs45lM85Ud0D0XUutA', 'utils_common');
// script/services/utils/utils_common.ts

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = exports.$ = void 0;
var _G = require("../../system/all_modules");
var utils_time_1 = require("./utils_time"); // time supportive functions
var utils_coordinate_1 = require("./utils_coordinate"); // time supportive functions
var uuidIndex = 1e5; // uuid to set as names of objects => help identifying objects
// function to get nodeProps object
var $ = function (node, simulationID) {
    if (simulationID === void 0) { simulationID = 0; }
    exports._.$callCount = (exports._.$callCount || 0) + 1;
    if (node.name != _G.types.elem.card)
        simulationID = 0;
    var props = node["props_" + simulationID] || {};
    return node["props_" + simulationID] = props;
};
exports.$ = $;
exports.$.clean = function (node, simulationID) {
    if (simulationID === void 0) { simulationID = 0; }
    if (simulationID == 0)
        return;
    delete node["props_" + simulationID];
};
exports._ = __assign(__assign({ NO_CONSOLE_LOG: false, 
    // NO_CONSOLE_LOG: true,
    //=== device info
    isANDROID: (cc.sys.os == cc.sys.OS_ANDROID), isIOS: (cc.sys.os == cc.sys.OS_IOS), 
    //--- Math
    max: Math.max, min: Math.min, round: Math.round, floor: Math.floor, ceil: Math.ceil, sign: Math.sign, abs: Math.abs, pow: Math.pow, random: Math.random, sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, atan: Math.atan, atan2: Math.atan2, log10: Math.log10, PI: Math.PI, randomArrItem: function (arr, isRemoveItem) {
        if (isRemoveItem === void 0) { isRemoveItem = false; }
        var iRandom = Math.floor(Math.random() * arr.length);
        return (isRemoveItem ? arr.splice(iRandom, 1)[0] : arr[iRandom]);
    },
    isString: function (x) {
        return typeof x === 'string';
    },
    isFunction: function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.NO_CONSOLE_LOG)
            try {
                console.log.apply(console, args);
            }
            catch (e) { }
    },
    // ========= Misc
    getNewUuid: function () {
        return uuidIndex++;
    },
    // ========== array
    removeArrayItem: function (arr, item) {
        var index = arr.indexOf(item);
        if (index != -1)
            arr.splice(index, 1);
    },
    addUniqueElemToArr: function (arr, item) {
        if (arr.includes(item))
            return;
        arr.push(item);
    },
    // ========== numering
    randomNumber: function (maxValue) {
        return exports._.floor(exports._.random() * maxValue);
    },
    shuffleArray: function (arr, isCreateNewArray) {
        var _this = this;
        if (isCreateNewArray === void 0) { isCreateNewArray = false; }
        var newArr = isCreateNewArray ? __spreadArrays(arr) : arr;
        newArr.sort(function () { return _this.random() > 0.5 ? 1 : -1; });
        return newArr;
    },
    // ========== positioning
    directionVec2: function () {
        return {
            top: cc.v2(0, 1),
            bottom: cc.v2(0, -1),
            left: cc.v2(-1, 0),
            right: cc.v2(1, 0),
        };
    },
    reservedDir: function (dir) {
        return { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[dir];
    },
    getGlobalPos: function (node) {
        return node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },
    getGlobalPosDiff: function (node1, node2) {
        return this.getGlobalPos(node2).sub(this.getGlobalPos(node1));
    },
    setGlobalPosToNode: function (nodeToSet, targetNode) {
        var targetGPos = this.getGlobalPos(targetNode);
        var localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
    },
    setGlobalPos: function (nodeToSet, targetGPos) {
        var localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
    },
    moveToNewParentKeepPosition: function (node, newParentNode) {
        var curNodePos = newParentNode.convertToNodeSpaceAR(this.getGlobalPos(node));
        node.parent = newParentNode;
        node.setPosition(curNodePos);
    },
    isGlobalOverlapping: function (node1, node2) {
        return cc.Intersection.rectRect(node1.getBoundingBoxToWorld(), node2.getBoundingBoxToWorld());
    },
    // ========= Grpahics Logic
    // example usage:
    //    var b = bezier([[0, 0, 0], [1, 1, 1], [2, -3, 6]]);
    //    for (var t = 0; t <= 10; t++) console.log(b(t/10));
    getBezierPointFunc: function (pts) {
        return function (t) {
            for (var a = pts; a.length > 1; a = b) // do..while loop in disguise
                for (var i = 0, b = [], j; i < a.length - 1; i++) // cycle over control points
                    for (b[i] = [], j = 0; j < a[i].length; j++) // cycle over dimensions
                        b[i][j] = a[i][j] * (1 - t) + a[i + 1][j] * t; // interpolation
            return a[0];
        };
    },
    // ========= Nodes
    // copy a node to a parent
    copyNode: function (sourceNode, targetParent) {
        var newNode = cc.instantiate(sourceNode);
        if (targetParent)
            newNode.parent = targetParent;
        return newNode;
    },
    setOrgProp: function (node, propName) {
        var _this = this;
        var defaultPropArr = ['x', 'y', 'width', 'height', 'opacity'];
        if (propName)
            this.addUniqueElemToArr(defaultPropArr, propName);
        defaultPropArr.map(function (iPropName) {
            var orgPropName = "org" + _this.capitalize(iPropName);
            node[orgPropName] = node.hasOwnProperty(orgPropName) ? node[orgPropName] : node[iPropName];
        });
        if (propName)
            return node["org" + this.capitalize(propName)];
    },
    // get full path of a node to its highest parent
    getNodePath: function (node) {
        var pathArr = [node.name];
        var parent = node.parent;
        var safeCount = 0;
        while (parent && safeCount++ < 50) {
            if (!parent.parent) {
                break;
            }
            pathArr.push(parent.name);
            parent = parent.parent;
        }
        return pathArr.reverse().join('/');
    },
    // make a node strech to connect 2 points. Used to set position & length of a line/wall as configured positions
    nodeConnect2Points: function (node, p1, p2) {
        var diffVec = p2.sub(p1);
        node.height = diffVec.mag();
        node.setPosition(p1.add(diffVec.mul(0.5)));
        node.angle = 90 + exports._.radianToDegrees(exports._.atan2(diffVec.y, diffVec.x));
    },
    getNodeDistance: function (node1, node2) {
        return this.getGlobalPosDiff(node1, node2).mag();
    },
    // ========================================
    radianToDegrees: function (radian) {
        return radian * 180 / Math.PI;
    },
    degreesToRadian: function (degrees) {
        return degrees * Math.PI / 180;
    },
    vec2ToAngle: function (vec2) {
        return exports._.radianToDegrees(exports._.atan2(vec2.y, vec2.x));
    },
    formatTime: function (timeInSec) {
        //let date = new Date(null);
        //date.setSeconds(timeInSec); // specify value for SECONDS here
        //return date.toISOString().substr(11, 8);
        // e.g. 18245sec = 5 hours (5x3600s) 4 mins (4x60s) 5s
        // this.log('timeInSec: ' + timeInSec);
        var hours = exports._.floor(timeInSec / (60 * 60));
        var mins = exports._.floor((timeInSec % (60 * 60)) / 60);
        var secs = timeInSec % (60 * 60) % 60;
        if (hours < 10)
            hours = '0' + hours;
        if (mins < 10)
            mins = '0' + mins;
        if (secs < 10)
            secs = '0' + secs;
        return hours + ':' + mins + ':' + secs;
    },
    formatMoney: function (gold) {
        // (no suffix), K, M, B, T, aa, ab, ac, ad, ae ...
        var digits = exports._.floor(Math.log10(gold)) + 1;
        if (digits <= 6) {
            return gold.toLocaleString();
        }
        // 1M will write as 1000K
        // 50B will write as 50,000M 
        // baically, get up to >6 digits, then start shifting by 1 suffix
        // divide digits by 3
        var suffixes = ['K', 'M', 'B', 'T'];
        var chunks = exports._.floor((digits - 1) / 3);
        var startingChar = 'a';
        var suffix;
        if (chunks - 2 <= 3) {
            suffix = suffixes[chunks - 2];
        }
        else {
            suffix = String.fromCharCode(((chunks - 6) / 26) + startingChar.charCodeAt(0)) + String.fromCharCode(((chunks - 6) % 26) + startingChar.charCodeAt(0));
        }
        var truncatedGold = exports._.round(gold / exports._.pow(10, (chunks - 1) * 3));
        return truncatedGold.toLocaleString() + suffix;
    },
    capitalize: function (str) {
        var arr = __spreadArrays(str);
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    },
    getInRange: function (num, min, max) {
        return exports._.min(exports._.max(num, min), max);
    } }, utils_time_1.default), utils_coordinate_1.default);

cc._RF.pop();