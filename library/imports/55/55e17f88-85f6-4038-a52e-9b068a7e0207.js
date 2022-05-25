"use strict";
cc._RF.push(module, '55e17+IhfZAOKUumwaKfgIH', 'utils_data');
// script/services/utils/utils_data.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsData = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
exports.utilsData = {
    save: function (dataObject, callback) {
        if (window['FBInstant']) {
            FBInstant.player.setDataAsync(dataObject).then(function () { if (callback)
                callback(); }, function (e) { return console.warn(" utils_data >> save >> failed ", e); }).catch(function (e) { return console.warn(" utils_data >> save >> failed (catch) ", e); });
        }
        // Simulate facebook data at local using localStorage
        else {
            for (var key in dataObject)
                localStorage.setItem(key, JSON.stringify(dataObject[key]));
            setTimeout(function () { if (callback)
                callback(); }, 300);
        }
    },
    load: function (keyArr, callback) {
        if (window['FBInstant']) {
            FBInstant.player.getDataAsync(keyArr).then(function (data) {
                if (callback)
                    callback(data);
            });
        }
        // Simulate facebook data at local using localStorage
        else {
            var dataObj_1 = {};
            keyArr.map(function (key) {
                if (localStorage.getItem(key) === null)
                    return;
                try {
                    dataObj_1[key] = JSON.parse(localStorage.getItem(key));
                }
                catch (e) {
                    console.warn(" utilsData.load() >> Error  data key = " + key + " ", e);
                }
            });
            if (callback)
                setTimeout(function () { return callback(dataObj_1); }, 100);
        }
    },
    getEntryPointData: function () {
        return window['FBInstant'] ? (FBInstant.getEntryPointData() || {}) : {};
    }
};
;

cc._RF.pop();