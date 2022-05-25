"use strict";
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