
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/levels/level_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5bfd6qY2MNMIowvpPjCZWfQ', 'level_manager');
// script/levels/level_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelManager = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var system_data_1 = require("../system_data/system_data");
exports.levelManager = {
    categoryNameArr: [],
    init: function () {
        var _this = this;
        this.categoryArr.map(function (catInfo) { return _this.categoryNameArr.push(catInfo.id); });
    },
    getAvatarInfo: function (categoryName, frameName) {
        var categoryInfo = this.categoryArr.find(function (catInfo) { return catInfo.id == categoryName; });
        if (!categoryInfo)
            return;
        var avatarInfo = categoryInfo.frameArr.find(function (frameInfo) { return frameInfo.name == frameName; });
        return avatarInfo;
    },
    categoryArr: system_data_1.systemData.categoryArr,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbGV2ZWxzL2xldmVsX21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQiwwREFBd0Q7QUFFM0MsUUFBQSxZQUFZLEdBQUc7SUFDekIsZUFBZSxFQUFFLEVBQUU7SUFFbkIsSUFBSTtRQUFKLGlCQUVDO1FBREUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsYUFBYSxZQUFDLFlBQVksRUFBRSxTQUFTO1FBQ2xDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDMUIsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sVUFBVSxDQUFDO0lBQ3JCLENBQUM7SUFHRCxXQUFXLEVBQUUsd0JBQVUsQ0FBQyxXQUFXO0NBRXJDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuaW1wb3J0IHsgc3lzdGVtRGF0YSB9IGZyb20gJy4uL3N5c3RlbV9kYXRhL3N5c3RlbV9kYXRhJztcblxuZXhwb3J0IGNvbnN0IGxldmVsTWFuYWdlciA9IHtcbiAgIGNhdGVnb3J5TmFtZUFycjogW10sXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5QXJyLm1hcChjYXRJbmZvID0+IHRoaXMuY2F0ZWdvcnlOYW1lQXJyLnB1c2goY2F0SW5mby5pZCkpO1xuICAgfSxcblxuICAgZ2V0QXZhdGFySW5mbyhjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgY29uc3QgY2F0ZWdvcnlJbmZvID0gdGhpcy5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSBjYXRlZ29yeU5hbWUpO1xuICAgICAgaWYgKCFjYXRlZ29yeUluZm8pIHJldHVybjtcbiAgICAgIGNvbnN0IGF2YXRhckluZm8gPSBjYXRlZ29yeUluZm8uZnJhbWVBcnIuZmluZChmcmFtZUluZm8gPT4gZnJhbWVJbmZvLm5hbWUgPT0gZnJhbWVOYW1lKTtcbiAgICAgIHJldHVybiBhdmF0YXJJbmZvO1xuICAgfSxcblxuXG4gICBjYXRlZ29yeUFycjogc3lzdGVtRGF0YS5jYXRlZ29yeUFycixcblxufVxuIl19