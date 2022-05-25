
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0M7QUFDdkMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBR1AsUUFBQSxTQUFTLEdBQUc7SUFDdEIsSUFBSSxFQUFKLFVBQUssVUFBZSxFQUFFLFFBQW1CO1FBQ3RDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDM0MsY0FBUSxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ25DLFVBQUMsQ0FBQyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQsQ0FDMUQsQ0FBQyxLQUFLLENBQ0osVUFBQyxDQUFDLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUMsQ0FBQyxFQUF6RCxDQUF5RCxDQUNsRSxDQUFDO1NBQ0o7UUFFRCxxREFBcUQ7YUFDaEQ7WUFDRixLQUFLLElBQUksR0FBRyxJQUFJLFVBQVU7Z0JBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLFVBQVUsQ0FBQyxjQUFRLElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNKLENBQUM7SUFHRCxJQUFJLEVBQUosVUFBSyxNQUFnQixFQUFFLFFBQW1CO1FBQ3ZDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQzVDLElBQUksUUFBUTtvQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUVELHFEQUFxRDthQUNoRDtZQUNGLElBQU0sU0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztnQkFDWCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtvQkFBRSxPQUFPO2dCQUMvQyxJQUFJO29CQUNELFNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBMEMsR0FBRyxNQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ25FO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVE7Z0JBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsU0FBTyxDQUFDLEVBQWpCLENBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekQ7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2QsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDO0NBQ0gsQ0FBQTtBQUNBLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuXG5leHBvcnQgY29uc3QgdXRpbHNEYXRhID0ge1xuICAgc2F2ZShkYXRhT2JqZWN0OiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3dbJ0ZCSW5zdGFudCddKSB7XG4gICAgICAgICBGQkluc3RhbnQucGxheWVyLnNldERhdGFBc3luYyhkYXRhT2JqZWN0KS50aGVuKFxuICAgICAgICAgICAgKCkgPT4geyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0sXG4gICAgICAgICAgICAoZSkgPT4gY29uc29sZS53YXJuKGAgdXRpbHNfZGF0YSA+PiBzYXZlID4+IGZhaWxlZCBgLCBlKVxuICAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICAgIChlKSA9PiBjb25zb2xlLndhcm4oYCB1dGlsc19kYXRhID4+IHNhdmUgPj4gZmFpbGVkIChjYXRjaCkgYCwgZSlcbiAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNpbXVsYXRlIGZhY2Vib29rIGRhdGEgYXQgbG9jYWwgdXNpbmcgbG9jYWxTdG9yYWdlXG4gICAgICBlbHNlIHtcbiAgICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhT2JqZWN0KSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGFPYmplY3Rba2V5XSkpO1xuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSwgMzAwKTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgbG9hZChrZXlBcnI6IHN0cmluZ1tdLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgICAgRkJJbnN0YW50LnBsYXllci5nZXREYXRhQXN5bmMoa2V5QXJyKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBTaW11bGF0ZSBmYWNlYm9vayBkYXRhIGF0IGxvY2FsIHVzaW5nIGxvY2FsU3RvcmFnZVxuICAgICAgZWxzZSB7XG4gICAgICAgICBjb25zdCBkYXRhT2JqID0ge307XG4gICAgICAgICBrZXlBcnIubWFwKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgIGRhdGFPYmpba2V5XSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCB1dGlsc0RhdGEubG9hZCgpID4+IEVycm9yICBkYXRhIGtleSA9ICR7a2V5fSBgLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICBpZiAoY2FsbGJhY2spIHNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2soZGF0YU9iaiksIDEwMCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBnZXRFbnRyeVBvaW50RGF0YSgpIHtcbiAgICAgIHJldHVybiB3aW5kb3dbJ0ZCSW5zdGFudCddID8gKEZCSW5zdGFudC5nZXRFbnRyeVBvaW50RGF0YSgpIHx8IHt9KSA6IHt9O1xuICAgfVxufVxufTsiXX0=