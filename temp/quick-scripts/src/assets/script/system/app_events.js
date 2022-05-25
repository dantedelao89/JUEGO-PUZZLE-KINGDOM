"use strict";
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