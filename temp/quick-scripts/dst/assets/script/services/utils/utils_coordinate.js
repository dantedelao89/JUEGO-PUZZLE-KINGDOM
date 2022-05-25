
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_coordinate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfY29vcmRpbmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUN2QyxJQUFBLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVqQiwrQ0FBbUMsQ0FBQywrQkFBK0I7QUFDbkUsa0JBQWU7SUFDWCxTQUFTLEVBQVQsVUFBVSxHQUFZO1FBQ2xCLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsY0FBYyxZQUFDLFFBQVE7UUFDbkIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsMkJBQTJCO1FBQ3JELElBQUksSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDckUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDVixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILDZFQUE2RTtRQUM3RSxPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBR0QsZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLFFBQVE7UUFDeEIsU0FBUyxhQUFhLENBQUMsRUFBUSxFQUFFLEVBQWdCLEVBQUUsRUFBZ0I7Z0JBQTFDLENBQUMsT0FBQSxFQUFFLENBQUMsT0FBQTtnQkFBUyxFQUFFLE9BQUEsRUFBSyxFQUFFLE9BQUE7Z0JBQVMsRUFBRSxPQUFBLEVBQUssRUFBRSxPQUFBO1lBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7YUFBRTtZQUUxQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDWCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ1g7aUJBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUN2QjtZQUVELElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQ3JCLFVBQUMsUUFBUSxFQUFFLENBQUM7WUFDUixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMxRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQyxJQUFJLENBQ0YsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBZCxDQUFjLENBQzNCLENBQUM7UUFDRixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7ICQgfSA9IF9HO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi91dGlsc19jb21tb24nOyAvLyBzcGVjaWFsIGNhc2UgZm9yIHN1Yi1tb2R1bGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaXNWZWNIb3J6KHZlYzogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gXy5hYnModmVjLngpID4gXy5hYnModmVjLnkpO1xuICAgIH0sXG5cbiAgICBnZXRQb2ludFJhbmdlcyhwb2ludEFycikge1xuICAgICAgICBjb25zdCBCSUdfSU5UID0gOTk5OTk5OTk7IC8vIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICBsZXQgbWluWCA9IEJJR19JTlQsIG1pblkgPSBCSUdfSU5ULCBtYXhYID0gLUJJR19JTlQsIG1heFkgPSAtQklHX0lOVDtcbiAgICAgICAgcG9pbnRBcnIubWFwKHAgPT4ge1xuICAgICAgICAgICAgbWluWCA9IF8ubWluKG1pblgsIHAueCk7XG4gICAgICAgICAgICBtaW5ZID0gXy5taW4obWluWSwgcC55KTtcbiAgICAgICAgICAgIG1heFggPSBfLm1heChtYXhYLCBwLngpO1xuICAgICAgICAgICAgbWF4WSA9IF8ubWF4KG1heFksIHAueSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBfLmxvZyhgIG1pblggPSAke21pblh9LCBtaW5ZID0gJHttaW5ZfSwgbWF4WCA9ICR7bWF4WH0sIG1heFkgPSAke21heFl9IGApO1xuICAgICAgICByZXR1cm4geyBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZIH07XG4gICAgfSxcblxuXG4gICAgZGlzdGFuY2UycG9seWdvbihwLCBwb2ludEFycikge1xuICAgICAgICBmdW5jdGlvbiBkaXN0VG9TZWdtZW50KHsgeCwgeSB9LCB7IHg6IHgxLCB5OiB5MSB9LCB7IHg6IHgyLCB5OiB5MiB9KSB7XG4gICAgICAgICAgICB2YXIgQSA9IHggLSB4MTtcbiAgICAgICAgICAgIHZhciBCID0geSAtIHkxO1xuICAgICAgICAgICAgdmFyIEMgPSB4MiAtIHgxO1xuICAgICAgICAgICAgdmFyIEQgPSB5MiAtIHkxO1xuXG4gICAgICAgICAgICB2YXIgZG90ID0gQSAqIEMgKyBCICogRDtcbiAgICAgICAgICAgIHZhciBsZW5fc3EgPSBDICogQyArIEQgKiBEO1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gLTE7XG4gICAgICAgICAgICBpZiAobGVuX3NxICE9IDApIHsgcGFyYW0gPSBkb3QgLyBsZW5fc3E7IH1cblxuICAgICAgICAgICAgdmFyIHh4LCB5eTtcbiAgICAgICAgICAgIGlmIChwYXJhbSA8IDApIHtcbiAgICAgICAgICAgICAgICB4eCA9IHgxO1xuICAgICAgICAgICAgICAgIHl5ID0geTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtID4gMSkge1xuICAgICAgICAgICAgICAgIHh4ID0geDI7XG4gICAgICAgICAgICAgICAgeXkgPSB5MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeHggPSB4MSArIHBhcmFtICogQztcbiAgICAgICAgICAgICAgICB5eSA9IHkxICsgcGFyYW0gKiBEO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHggPSB4IC0geHg7XG4gICAgICAgICAgICB2YXIgZHkgPSB5IC0geXk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRBcnIgPSBwb2ludEFyci5tYXAoXG4gICAgICAgICAgICAoc3ViUG9pbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U3ViUG9pbnQgPSBwb2ludEFycltpICsgMV0gfHwgcG9pbnRBcnJbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBkaXN0VG9TZWdtZW50KHAsIHN1YlBvaW50LCBuZXh0U3ViUG9pbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5zb3J0KFxuICAgICAgICAgICAgKEEsIEIpID0+IEEgPiBCID8gMSA6IC0xXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJldCA9IGRBcnJbMF07XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbn1cblxuIl19