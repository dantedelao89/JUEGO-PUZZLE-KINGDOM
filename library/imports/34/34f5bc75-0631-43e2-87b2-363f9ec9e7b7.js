"use strict";
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