
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils_facebook.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34f5bx1BjFD4oeyNj+eyee3', 'utils_facebook');
// script/services/utils_facebook.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsFB = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.utilsFB = {
    init: function () {
        if (window['FBInstant']) {
            FBInstant.onPause(function () { }); // chi can goi ham de FB tick la` API da su dung
            window.fbSupportedAPIs = FBInstant.getSupportedAPIs();
            // console.table(FBInstant.getSupportedAPIs());
        }
    },
    isSupportedAPI: function (name) {
        if (!window['FBInstant'])
            return false;
        var arr = FBInstant.getSupportedAPIs();
        return arr.indexOf(name) != -1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHNfZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLE9BQU8sR0FBRztJQUNwQixJQUFJO1FBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO1lBQzlFLE1BQU0sQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEQsK0NBQStDO1NBQ2pEO0lBQ0osQ0FBQztJQUVELGNBQWMsWUFBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdkMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FHSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5leHBvcnQgY29uc3QgdXRpbHNGQiA9IHtcbiAgIGluaXQoKSB7XG4gICAgICBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgICAgRkJJbnN0YW50Lm9uUGF1c2UoKCkgPT4geyB9KTsgLy8gY2hpIGNhbiBnb2kgaGFtIGRlIEZCIHRpY2sgbGFgIEFQSSBkYSBzdSBkdW5nXG4gICAgICAgICB3aW5kb3cuZmJTdXBwb3J0ZWRBUElzID0gRkJJbnN0YW50LmdldFN1cHBvcnRlZEFQSXMoKTtcbiAgICAgICAgIC8vIGNvbnNvbGUudGFibGUoRkJJbnN0YW50LmdldFN1cHBvcnRlZEFQSXMoKSk7XG4gICAgICB9XG4gICB9LFxuXG4gICBpc1N1cHBvcnRlZEFQSShuYW1lKSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IGFyciA9IEZCSW5zdGFudC5nZXRTdXBwb3J0ZWRBUElzKCk7XG4gICAgICByZXR1cm4gYXJyLmluZGV4T2YobmFtZSkgIT0gLTE7XG4gICB9LFxuXG5cbn0iXX0=