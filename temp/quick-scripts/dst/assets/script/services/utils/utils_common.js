
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUUvQywyQ0FBd0MsQ0FBRSw0QkFBNEI7QUFDdEUsdURBQW9ELENBQUUsNEJBQTRCO0FBRWxGLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLDhEQUE4RDtBQUduRixtQ0FBbUM7QUFDNUIsSUFBTSxDQUFDLEdBQUcsVUFBQyxJQUFhLEVBQUUsWUFBZ0I7SUFBaEIsNkJBQUEsRUFBQSxnQkFBZ0I7SUFDOUMsU0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLFNBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN0RCxJQUFNLEtBQUssR0FBdUIsSUFBSSxDQUFDLFdBQVMsWUFBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RFLE9BQU8sSUFBSSxDQUFDLFdBQVMsWUFBYyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2hELENBQUMsQ0FBQTtBQU5ZLFFBQUEsQ0FBQyxLQU1iO0FBRUQsU0FBQyxDQUFDLEtBQUssR0FBRyxVQUFDLElBQWEsRUFBRSxZQUFnQjtJQUFoQiw2QkFBQSxFQUFBLGdCQUFnQjtJQUN2QyxJQUFJLFlBQVksSUFBSSxDQUFDO1FBQUUsT0FBTztJQUM5QixPQUFPLElBQUksQ0FBQyxXQUFTLFlBQWMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQTtBQUdZLFFBQUEsQ0FBQyx1QkFDWCxjQUFjLEVBQUUsS0FBSztJQUNyQix3QkFBd0I7SUFFeEIsaUJBQWlCO0lBQ2pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFB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LENBQUMsU0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxJQUtFLG9CQUFhLEdBR2IsMEJBQW1CLEVBSXZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcblxuaW1wb3J0IHRpbWVGdW5jdGlvbnMgZnJvbSAnLi91dGlsc190aW1lJyAgLy8gdGltZSBzdXBwb3J0aXZlIGZ1bmN0aW9uc1xuaW1wb3J0IGNvb3JkaW5hdGVGdW5jdGlvbnMgZnJvbSAnLi91dGlsc19jb29yZGluYXRlJyAgLy8gdGltZSBzdXBwb3J0aXZlIGZ1bmN0aW9uc1xuXG5sZXQgdXVpZEluZGV4ID0gMWU1OyAvLyB1dWlkIHRvIHNldCBhcyBuYW1lcyBvZiBvYmplY3RzID0+IGhlbHAgaWRlbnRpZnlpbmcgb2JqZWN0c1xuXG5cbi8vIGZ1bmN0aW9uIHRvIGdldCBub2RlUHJvcHMgb2JqZWN0XG5leHBvcnQgY29uc3QgJCA9IChub2RlOiBjYy5Ob2RlLCBzaW11bGF0aW9uSUQgPSAwKSA9PiB7XG4gICBfLiRjYWxsQ291bnQgPSAoXy4kY2FsbENvdW50IHx8IDApICsgMTtcblxuICAgaWYgKG5vZGUubmFtZSAhPSBfRy50eXBlcy5lbGVtLmNhcmQpIHNpbXVsYXRpb25JRCA9IDA7XG4gICBjb25zdCBwcm9wczogX0cudHlwZXMuZWxlbVByb3BzID0gbm9kZVtgcHJvcHNfJHtzaW11bGF0aW9uSUR9YF0gfHwge307XG4gICByZXR1cm4gbm9kZVtgcHJvcHNfJHtzaW11bGF0aW9uSUR9YF0gPSBwcm9wcztcbn1cblxuJC5jbGVhbiA9IChub2RlOiBjYy5Ob2RlLCBzaW11bGF0aW9uSUQgPSAwKSA9PiB7XG4gICBpZiAoc2ltdWxhdGlvbklEID09IDApIHJldHVybjtcbiAgIGRlbGV0ZSBub2RlW2Bwcm9wc18ke3NpbXVsYXRpb25JRH1gXTtcbn1cblxuXG5leHBvcnQgY29uc3QgXyA9IHtcbiAgIE5PX0NPTlNPTEVfTE9HOiBmYWxzZSxcbiAgIC8vIE5PX0NPTlNPTEVfTE9HOiB0cnVlLFxuXG4gICAvLz09PSBkZXZpY2UgaW5mb1xuICAgaXNBTkRST0lEOiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSxcbiAgIGlzSU9TOiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpLFxuXG4gICAvLy0tLSBNYXRoXG4gICBtYXg6IE1hdGgubWF4LFxuICAgbWluOiBNYXRoLm1pbixcbiAgIHJvdW5kOiBNYXRoLnJvdW5kLFxuICAgZmxvb3I6IE1hdGguZmxvb3IsXG4gICBjZWlsOiBNYXRoLmNlaWwsXG4gICBzaWduOiBNYXRoLnNpZ24sXG4gICBhYnM6IE1hdGguYWJzLFxuICAgcG93OiBNYXRoLnBvdyxcbiAgIHJhbmRvbTogTWF0aC5yYW5kb20sXG4gICBzcXJ0OiBNYXRoLnNxcnQsXG4gICBzaW46IE1hdGguc2luLFxuICAgY29zOiBNYXRoLmNvcyxcbiAgIHRhbjogTWF0aC50YW4sXG4gICBhdGFuOiBNYXRoLmF0YW4sXG4gICBhdGFuMjogTWF0aC5hdGFuMixcbiAgIGxvZzEwOiBNYXRoLmxvZzEwLFxuICAgUEk6IE1hdGguUEksXG5cbiAgIHJhbmRvbUFyckl0ZW0oYXJyOiBhbnlbXSwgaXNSZW1vdmVJdGVtID0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGlSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKTtcbiAgICAgIHJldHVybiAoaXNSZW1vdmVJdGVtID8gYXJyLnNwbGljZShpUmFuZG9tLCAxKVswXSA6IGFycltpUmFuZG9tXSk7XG4gICB9LFxuXG4gICBpc1N0cmluZyh4OiBhbnkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG4gICB9LFxuXG4gICBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjazogYW55KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIHt9LnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgIH0sXG5cbiAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgaWYgKCF0aGlzLk5PX0NPTlNPTEVfTE9HKSB0cnkgeyBjb25zb2xlLmxvZyguLi5hcmdzKSB9IGNhdGNoIChlKSB7IH1cbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09IE1pc2NcbiAgIGdldE5ld1V1aWQoKSB7XG4gICAgICByZXR1cm4gdXVpZEluZGV4Kys7XG4gICB9LFxuXG4gICAvLyA9PT09PT09PT09IGFycmF5XG4gICByZW1vdmVBcnJheUl0ZW0oYXJyOiBhbnlbXSwgaXRlbTogYW55KSB7XG4gICAgICBjb25zdCBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGluZGV4ICE9IC0xKSBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgIH0sXG5cbiAgIGFkZFVuaXF1ZUVsZW1Ub0FycihhcnI6IGFueVtdLCBpdGVtOiBhbnkpIHtcbiAgICAgIGlmIChhcnIuaW5jbHVkZXMoaXRlbSkpIHJldHVybjtcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09IG51bWVyaW5nXG4gICByYW5kb21OdW1iZXIobWF4VmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIF8uZmxvb3IoXy5yYW5kb20oKSAqIG1heFZhbHVlKTtcbiAgIH0sXG5cbiAgIHNodWZmbGVBcnJheShhcnIsIGlzQ3JlYXRlTmV3QXJyYXkgPSBmYWxzZSkge1xuICAgICAgY29uc3QgbmV3QXJyID0gaXNDcmVhdGVOZXdBcnJheSA/IFsuLi5hcnJdIDogYXJyO1xuICAgICAgbmV3QXJyLnNvcnQoKCkgPT4gdGhpcy5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSk7XG4gICAgICByZXR1cm4gbmV3QXJyO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09IHBvc2l0aW9uaW5nXG4gICBkaXJlY3Rpb25WZWMyKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHRvcDogY2MudjIoMCwgMSksXG4gICAgICAgICBib3R0b206IGNjLnYyKDAsIC0xKSxcbiAgICAgICAgIGxlZnQ6IGNjLnYyKC0xLCAwKSxcbiAgICAgICAgIHJpZ2h0OiBjYy52MigxLCAwKSxcbiAgICAgIH1cbiAgIH0sXG5cbiAgIHJlc2VydmVkRGlyKGRpcikge1xuICAgICAgcmV0dXJuIHsgdG9wOiAnYm90dG9tJywgYm90dG9tOiAndG9wJywgbGVmdDogJ3JpZ2h0JywgcmlnaHQ6ICdsZWZ0JyB9W2Rpcl07XG4gICB9LFxuXG4gICBnZXRHbG9iYWxQb3Mobm9kZTogY2MuTm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIuWkVSTyk7XG4gICB9LFxuXG4gICBnZXRHbG9iYWxQb3NEaWZmKG5vZGUxOiBjYy5Ob2RlLCBub2RlMjogY2MuTm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0R2xvYmFsUG9zKG5vZGUyKS5zdWIodGhpcy5nZXRHbG9iYWxQb3Mobm9kZTEpKTtcbiAgIH0sXG5cbiAgIHNldEdsb2JhbFBvc1RvTm9kZShub2RlVG9TZXQ6IGNjLk5vZGUsIHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGNvbnN0IHRhcmdldEdQb3MgPSB0aGlzLmdldEdsb2JhbFBvcyh0YXJnZXROb2RlKTtcbiAgICAgIGNvbnN0IGxvY2FsUG9zID0gbm9kZVRvU2V0LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRHUG9zKTtcbiAgICAgIG5vZGVUb1NldC5zZXRQb3NpdGlvbihsb2NhbFBvcyk7XG4gICB9LFxuXG4gICBzZXRHbG9iYWxQb3Mobm9kZVRvU2V0OiBjYy5Ob2RlLCB0YXJnZXRHUG9zOiBjYy5WZWMyKSB7XG4gICAgICBjb25zdCBsb2NhbFBvcyA9IG5vZGVUb1NldC5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0R1Bvcyk7XG4gICAgICBub2RlVG9TZXQuc2V0UG9zaXRpb24obG9jYWxQb3MpO1xuICAgfSxcblxuICAgbW92ZVRvTmV3UGFyZW50S2VlcFBvc2l0aW9uKG5vZGU6IGNjLk5vZGUsIG5ld1BhcmVudE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGNvbnN0IGN1ck5vZGVQb3MgPSBuZXdQYXJlbnROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuZ2V0R2xvYmFsUG9zKG5vZGUpKTtcbiAgICAgIG5vZGUucGFyZW50ID0gbmV3UGFyZW50Tm9kZTtcbiAgICAgIG5vZGUuc2V0UG9zaXRpb24oY3VyTm9kZVBvcyk7XG4gICB9LFxuXG5cbiAgIGlzR2xvYmFsT3ZlcmxhcHBpbmcobm9kZTE6IGNjLk5vZGUsIG5vZGUyOiBjYy5Ob2RlKSB7XG4gICAgICByZXR1cm4gY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KG5vZGUxLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLCBub2RlMi5nZXRCb3VuZGluZ0JveFRvV29ybGQoKSk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PSBHcnBhaGljcyBMb2dpY1xuXG4gICAvLyBleGFtcGxlIHVzYWdlOlxuICAgLy8gICAgdmFyIGIgPSBiZXppZXIoW1swLCAwLCAwXSwgWzEsIDEsIDFdLCBbMiwgLTMsIDZdXSk7XG4gICAvLyAgICBmb3IgKHZhciB0ID0gMDsgdCA8PSAxMDsgdCsrKSBjb25zb2xlLmxvZyhiKHQvMTApKTtcbiAgIGdldEJlemllclBvaW50RnVuYyhwdHMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgZm9yICh2YXIgYSA9IHB0czsgYS5sZW5ndGggPiAxOyBhID0gYikgIC8vIGRvLi53aGlsZSBsb29wIGluIGRpc2d1aXNlXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgYiA9IFtdLCBqOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspICAvLyBjeWNsZSBvdmVyIGNvbnRyb2wgcG9pbnRzXG4gICAgICAgICAgICAgICBmb3IgKGJbaV0gPSBbXSwgaiA9IDA7IGogPCBhW2ldLmxlbmd0aDsgaisrKSAgLy8gY3ljbGUgb3ZlciBkaW1lbnNpb25zXG4gICAgICAgICAgICAgICAgICBiW2ldW2pdID0gYVtpXVtqXSAqICgxIC0gdCkgKyBhW2kgKyAxXVtqXSAqIHQ7ICAvLyBpbnRlcnBvbGF0aW9uXG4gICAgICAgICByZXR1cm4gYVswXTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09IE5vZGVzXG5cbiAgIC8vIGNvcHkgYSBub2RlIHRvIGEgcGFyZW50XG4gICBjb3B5Tm9kZShzb3VyY2VOb2RlOiBjYy5Ob2RlIHwgY2MuUHJlZmFiLCB0YXJnZXRQYXJlbnQ/OiBjYy5Ob2RlKSB7XG4gICAgICBjb25zdCBuZXdOb2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUoc291cmNlTm9kZSk7XG4gICAgICBpZiAodGFyZ2V0UGFyZW50KSBuZXdOb2RlLnBhcmVudCA9IHRhcmdldFBhcmVudDtcbiAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgfSxcblxuICAgc2V0T3JnUHJvcChub2RlOiBjYy5Ob2RlLCBwcm9wTmFtZT86IHN0cmluZykge1xuICAgICAgY29uc3QgZGVmYXVsdFByb3BBcnIgPSBbJ3gnLCAneScsICd3aWR0aCcsICdoZWlnaHQnLCAnb3BhY2l0eSddO1xuICAgICAgaWYgKHByb3BOYW1lKSB0aGlzLmFkZFVuaXF1ZUVsZW1Ub0FycihkZWZhdWx0UHJvcEFyciwgcHJvcE5hbWUpO1xuICAgICAgZGVmYXVsdFByb3BBcnIubWFwKGlQcm9wTmFtZSA9PiB7XG4gICAgICAgICBjb25zdCBvcmdQcm9wTmFtZSA9IGBvcmcke3RoaXMuY2FwaXRhbGl6ZShpUHJvcE5hbWUpfWA7XG4gICAgICAgICBub2RlW29yZ1Byb3BOYW1lXSA9IG5vZGUuaGFzT3duUHJvcGVydHkob3JnUHJvcE5hbWUpID8gbm9kZVtvcmdQcm9wTmFtZV0gOiBub2RlW2lQcm9wTmFtZV07XG4gICAgICB9KTtcbiAgICAgIGlmIChwcm9wTmFtZSkgcmV0dXJuIG5vZGVbYG9yZyR7dGhpcy5jYXBpdGFsaXplKHByb3BOYW1lKX1gXTtcbiAgIH0sXG5cbiAgIC8vIGdldCBmdWxsIHBhdGggb2YgYSBub2RlIHRvIGl0cyBoaWdoZXN0IHBhcmVudFxuICAgZ2V0Tm9kZVBhdGgobm9kZSkge1xuICAgICAgbGV0IHBhdGhBcnIgPSBbbm9kZS5uYW1lXVxuICAgICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgICAgbGV0IHNhZmVDb3VudCA9IDA7XG4gICAgICB3aGlsZSAocGFyZW50ICYmIHNhZmVDb3VudCsrIDwgNTApIHtcbiAgICAgICAgIGlmICghcGFyZW50LnBhcmVudCkgeyBicmVhazsgfVxuICAgICAgICAgcGF0aEFyci5wdXNoKHBhcmVudC5uYW1lKTtcbiAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aEFyci5yZXZlcnNlKCkuam9pbignLycpO1xuICAgfSxcblxuICAgLy8gbWFrZSBhIG5vZGUgc3RyZWNoIHRvIGNvbm5lY3QgMiBwb2ludHMuIFVzZWQgdG8gc2V0IHBvc2l0aW9uICYgbGVuZ3RoIG9mIGEgbGluZS93YWxsIGFzIGNvbmZpZ3VyZWQgcG9zaXRpb25zXG4gICBub2RlQ29ubmVjdDJQb2ludHMobm9kZSwgcDE6IGNjLlZlYzIsIHAyOiBjYy5WZWMyKSB7XG4gICAgICBjb25zdCBkaWZmVmVjID0gcDIuc3ViKHAxKTtcbiAgICAgIG5vZGUuaGVpZ2h0ID0gZGlmZlZlYy5tYWcoKTtcbiAgICAgIG5vZGUuc2V0UG9zaXRpb24ocDEuYWRkKGRpZmZWZWMubXVsKDAuNSkpKTtcbiAgICAgIG5vZGUuYW5nbGUgPSA5MCArIF8ucmFkaWFuVG9EZWdyZWVzKF8uYXRhbjIoZGlmZlZlYy55LCBkaWZmVmVjLngpKTtcbiAgIH0sXG5cbiAgIGdldE5vZGVEaXN0YW5jZShub2RlMTogY2MuTm9kZSwgbm9kZTI6IGNjLk5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEdsb2JhbFBvc0RpZmYobm9kZTEsIG5vZGUyKS5tYWcoKTtcbiAgIH0sXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIHJhZGlhblRvRGVncmVlcyhyYWRpYW4pIHtcbiAgICAgIHJldHVybiByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgfSxcblxuICAgZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpIHtcbiAgICAgIHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbiAgIH0sXG5cbiAgIHZlYzJUb0FuZ2xlKHZlYzI6IGNjLlZlYzIpIHsgIC8vZGVncmVlXG4gICAgICByZXR1cm4gXy5yYWRpYW5Ub0RlZ3JlZXMoXy5hdGFuMih2ZWMyLnksIHZlYzIueCkpO1xuICAgfSxcblxuICAgZm9ybWF0VGltZSh0aW1lSW5TZWMpIHtcbiAgICAgIC8vbGV0IGRhdGUgPSBuZXcgRGF0ZShudWxsKTtcbiAgICAgIC8vZGF0ZS5zZXRTZWNvbmRzKHRpbWVJblNlYyk7IC8vIHNwZWNpZnkgdmFsdWUgZm9yIFNFQ09ORFMgaGVyZVxuICAgICAgLy9yZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XG4gICAgICAvLyBlLmcuIDE4MjQ1c2VjID0gNSBob3VycyAoNXgzNjAwcykgNCBtaW5zICg0eDYwcykgNXNcblxuICAgICAgLy8gdGhpcy5sb2coJ3RpbWVJblNlYzogJyArIHRpbWVJblNlYyk7XG4gICAgICBsZXQgaG91cnM6IGFueSA9IF8uZmxvb3IodGltZUluU2VjIC8gKDYwICogNjApKTtcbiAgICAgIGxldCBtaW5zOiBhbnkgPSBfLmZsb29yKCh0aW1lSW5TZWMgJSAoNjAgKiA2MCkpIC8gNjApO1xuICAgICAgbGV0IHNlY3M6IGFueSA9IHRpbWVJblNlYyAlICg2MCAqIDYwKSAlIDYwO1xuXG4gICAgICBpZiAoaG91cnMgPCAxMCkgaG91cnMgPSAnMCcgKyBob3VycztcbiAgICAgIGlmIChtaW5zIDwgMTApIG1pbnMgPSAnMCcgKyBtaW5zO1xuICAgICAgaWYgKHNlY3MgPCAxMCkgc2VjcyA9ICcwJyArIHNlY3M7XG5cbiAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnMgKyAnOicgKyBzZWNzO1xuICAgfSxcblxuICAgZm9ybWF0TW9uZXkoZ29sZCkge1xuICAgICAgLy8gKG5vIHN1ZmZpeCksIEssIE0sIEIsIFQsIGFhLCBhYiwgYWMsIGFkLCBhZSAuLi5cbiAgICAgIGxldCBkaWdpdHMgPSBfLmZsb29yKE1hdGgubG9nMTAoZ29sZCkpICsgMTtcbiAgICAgIGlmIChkaWdpdHMgPD0gNikge1xuICAgICAgICAgcmV0dXJuIGdvbGQudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgLy8gMU0gd2lsbCB3cml0ZSBhcyAxMDAwS1xuICAgICAgLy8gNTBCIHdpbGwgd3JpdGUgYXMgNTAsMDAwTSBcbiAgICAgIC8vIGJhaWNhbGx5LCBnZXQgdXAgdG8gPjYgZGlnaXRzLCB0aGVuIHN0YXJ0IHNoaWZ0aW5nIGJ5IDEgc3VmZml4XG5cbiAgICAgIC8vIGRpdmlkZSBkaWdpdHMgYnkgM1xuICAgICAgbGV0IHN1ZmZpeGVzID0gWydLJywgJ00nLCAnQicsICdUJ107XG4gICAgICBsZXQgY2h1bmtzID0gXy5mbG9vcigoZGlnaXRzIC0gMSkgLyAzKTtcbiAgICAgIGxldCBzdGFydGluZ0NoYXIgPSAnYSc7XG4gICAgICBsZXQgc3VmZml4O1xuICAgICAgaWYgKGNodW5rcyAtIDIgPD0gMykge1xuICAgICAgICAgc3VmZml4ID0gc3VmZml4ZXNbY2h1bmtzIC0gMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgc3VmZml4ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGNodW5rcyAtIDYpIC8gMjYpICsgc3RhcnRpbmdDaGFyLmNoYXJDb2RlQXQoMCkpICsgU3RyaW5nLmZyb21DaGFyQ29kZSgoKGNodW5rcyAtIDYpICUgMjYpICsgc3RhcnRpbmdDaGFyLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdHJ1bmNhdGVkR29sZCA9IF8ucm91bmQoZ29sZCAvIF8ucG93KDEwLCAoY2h1bmtzIC0gMSkgKiAzKSk7XG5cbiAgICAgIHJldHVybiB0cnVuY2F0ZWRHb2xkLnRvTG9jYWxlU3RyaW5nKCkgKyBzdWZmaXg7XG4gICB9LFxuXG4gICBjYXBpdGFsaXplKHN0cikge1xuICAgICAgY29uc3QgYXJyID0gWy4uLnN0cl07XG4gICAgICBhcnJbMF0gPSBhcnJbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBhcnIuam9pbignJyk7XG4gICB9LFxuXG4gICBnZXRJblJhbmdlKG51bSwgbWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBfLm1pbihfLm1heChudW0sIG1pbiksIG1heCk7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09IERhdGUgdGltZSAmIHNjaGVkdWxpbmcgcHJvY2Vzc1xuICAgLi4udGltZUZ1bmN0aW9ucyxcblxuICAgLy8gPT09PT09PT09IGNlY3RvciwgcG9zaXRpb24gJiBjb29yZGluYXRlc1xuICAgLi4uY29vcmRpbmF0ZUZ1bmN0aW9ucyxcblxuXG5cbn07Il19