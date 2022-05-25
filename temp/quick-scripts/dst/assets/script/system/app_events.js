
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/app_events.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10990IZBkRJQLreM2+T4aIH', 'app_events');
// script/system/app_events.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.appEvents = {
    isAppHidden: false,
    onAppShowCallbackArr: [],
    onAppHideCallbackArr: [],
    onAppShow: function () {
        this.isAppHidden = false;
        this.onAppShowCallbackArr.map(function (f) { return f(); });
    },
    addAppShowCallback: function (f) {
        this.onAppShowCallbackArr.push(f);
    },
    onAppHide: function () {
        this.isAppHidden = true;
        this.onAppHideCallbackArr.map(function (f) { return f(); });
    },
    addAppHideCallback: function (f) {
        this.onAppHideCallbackArr.push(f);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2FwcF9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLG9CQUFvQixFQUFFLEVBQUU7SUFDeEIsb0JBQW9CLEVBQUUsRUFBRTtJQUV4QixTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxrQkFBa0IsRUFBbEIsVUFBbUIsQ0FBVztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxrQkFBa0IsRUFBbEIsVUFBbUIsQ0FBVztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBhcHBFdmVudHMgPSB7XG4gICAgaXNBcHBIaWRkZW46IGZhbHNlLFxuICAgIG9uQXBwU2hvd0NhbGxiYWNrQXJyOiBbXSxcbiAgICBvbkFwcEhpZGVDYWxsYmFja0FycjogW10sXG5cbiAgICBvbkFwcFNob3coKSB7XG4gICAgICAgIHRoaXMuaXNBcHBIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkFwcFNob3dDYWxsYmFja0Fyci5tYXAoZiA9PiBmKCkpO1xuICAgIH0sXG5cbiAgICBhZGRBcHBTaG93Q2FsbGJhY2soZjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5vbkFwcFNob3dDYWxsYmFja0Fyci5wdXNoKGYpO1xuICAgIH0sXG5cbiAgICBvbkFwcEhpZGUoKSB7XG4gICAgICAgIHRoaXMuaXNBcHBIaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQXBwSGlkZUNhbGxiYWNrQXJyLm1hcChmID0+IGYoKSk7XG4gICAgfSxcblxuICAgIGFkZEFwcEhpZGVDYWxsYmFjayhmOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm9uQXBwSGlkZUNhbGxiYWNrQXJyLnB1c2goZik7XG4gICAgfSxcbn0iXX0=