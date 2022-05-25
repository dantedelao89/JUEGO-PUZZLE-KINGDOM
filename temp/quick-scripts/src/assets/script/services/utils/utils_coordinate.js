"use strict";
cc._RF.push(module, '5df86zHog5HcqIKMKzmLV+k', 'utils_coordinate');
// script/services/utils/utils_coordinate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var $ = _G.$;
var utils_common_1 = require("./utils_common"); // special case for sub-modules
exports.default = {
    isVecHorz: function (vec) {
        return utils_common_1._.abs(vec.x) > utils_common_1._.abs(vec.y);
    },
    getPointRanges: function (pointArr) {
        var BIG_INT = 99999999; // Number.MAX_SAFE_INTEGER;
        var minX = BIG_INT, minY = BIG_INT, maxX = -BIG_INT, maxY = -BIG_INT;
        pointArr.map(function (p) {
            minX = utils_common_1._.min(minX, p.x);
            minY = utils_common_1._.min(minY, p.y);
            maxX = utils_common_1._.max(maxX, p.x);
            maxY = utils_common_1._.max(maxY, p.y);
        });
        // _.log(` minX = ${minX}, minY = ${minY}, maxX = ${maxX}, maxY = ${maxY} `);
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    },
    distance2polygon: function (p, pointArr) {
        function distToSegment(_a, _b, _c) {
            var x = _a.x, y = _a.y;
            var x1 = _b.x, y1 = _b.y;
            var x2 = _c.x, y2 = _c.y;
            var A = x - x1;
            var B = y - y1;
            var C = x2 - x1;
            var D = y2 - y1;
            var dot = A * C + B * D;
            var len_sq = C * C + D * D;
            var param = -1;
            if (len_sq != 0) {
                param = dot / len_sq;
            }
            var xx, yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            }
            else if (param > 1) {
                xx = x2;
                yy = y2;
            }
            else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            var dx = x - xx;
            var dy = y - yy;
            return Math.sqrt(dx * dx + dy * dy);
        }
        var dArr = pointArr.map(function (subPoint, i) {
            var nextSubPoint = pointArr[i + 1] || pointArr[0];
            var distance = distToSegment(p, subPoint, nextSubPoint);
            return distance;
        }).sort(function (A, B) { return A > B ? 1 : -1; });
        var ret = dArr[0];
        return ret;
    },
};

cc._RF.pop();