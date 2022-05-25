
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_time.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9b241Zt2BFFa5XMWEu3uey', 'utils_time');
// script/services/utils/utils_time.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var $ = _G.$;
var timerUuidIndex = 1e5; // uuid to set as names of objects => help identifying objects
exports.default = {
    // get current time UTC - milliseconds from 1970 to now
    getMsPassedUTC: function () {
        return (new Date()).getTime();
    },
    // get current Pacific Time (PT)  - milliseconds from 1970 to now
    // * Warning: Dont use result (finalPassedMs) to convert back to Date() object - new Date(getMsPassedPT), will results in wrong time
    getMsPassedPT: function () {
        var pacificTimeOffset = this.getPacificTimeOffset();
        var msPassedInPTNow = this.getMsPassedUTC() + pacificTimeOffset * 60 * 60 * 1000;
        return msPassedInPTNow;
    },
    getTimePT: function (dateObj) {
        if (dateObj === void 0) { dateObj = new Date(); }
        var pacificTimeOffset = this.getPacificTimeOffset(dateObj);
        var utcHour = dateObj.getHours() + dateObj.getTimezoneOffset() / 60;
        dateObj.setHours(utcHour + pacificTimeOffset);
        // _.log(`dateObj = ${dateObj} // pacificTimeOffset=${pacificTimeOffset} // dateObj.getTimezoneOffset()=${dateObj.getTimezoneOffset()} // utcHour=${utcHour} // utcHour + pacificTimeOffset=${utcHour + pacificTimeOffset}  `)
        return dateObj;
    },
    isSameDate: function (dateObj1, dateObj2) {
        return dateObj1.getFullYear() == dateObj2.getFullYear()
            && dateObj1.getMonth() == dateObj2.getMonth()
            && dateObj1.getDate() == dateObj2.getDate();
    },
    // get total ms to midnight of current day in PT
    getTotalMsToMidnightPT: function () {
        var msOf1Day = 24 * 60 * 60 * 1000;
        var nowPT = this.getMsPassedPT();
        var msToMidNight = msOf1Day - (nowPT % msOf1Day);
        return msToMidNight;
    },
    // get Daylight Saving Time start & end of current year
    // * Since 2007 DST begins on the second sunday of March,
    // * and ends on the first sunday of November.
    getDSTStartEndDate: function (dateObj) {
        var currentDate = dateObj || new Date();
        var currentYear = currentDate.getFullYear();
        // DST Start
        var firstOfMarch = new Date(currentYear, 2, 1);
        var daysUntilFirstSundayInMarch = (7 - firstOfMarch.getDay()) % 7;
        var secondSundayInMarch = firstOfMarch.getDate() + daysUntilFirstSundayInMarch + 7;
        var dstStartDate = new Date(currentYear, 2, secondSundayInMarch);
        // DST End
        var firstOfNovember = new Date(currentYear, 10, 1);
        var daysUntilFirstSundayInNov = (7 - firstOfNovember.getDay()) % 7;
        var firstSundayInNovember = firstOfNovember.getDate() + daysUntilFirstSundayInNov;
        var dstEndDate = new Date(currentYear, 10, firstSundayInNovember);
        return [dstStartDate, dstEndDate];
    },
    getPacificTimeOffset: function (paramDate) {
        var dateObj = paramDate || new Date();
        var _a = this.getDSTStartEndDate(), startDST = _a[0], endDST = _a[1];
        var isDSTActive = dateObj > startDST && dateObj < endDST;
        var pacificTimeOffset = isDSTActive ? -7 : -8;
        return pacificTimeOffset;
    },
    //==================================
    // overwrite default setTimeout to use schedule - which is paused when user switch to another tab. This will make all animation synced since ccAction is scheduling-base
    setTimeout: function (callback, timeInMillisecond) {
        if (timeInMillisecond === void 0) { timeInMillisecond = 0; }
        var target = { _id: timerUuidIndex++, __instanceId: timerUuidIndex, callback: null };
        target.callback = function () { callback(target); };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1000, 0, 0, false);
        return target;
    },
    clearTimeout: function (target) {
        if (!target || !target._id || !target.callback)
            return;
        cc.director.getScheduler().unschedule(target.callback, target);
    },
    // overwrite default setInterval to use schedule - which is paused when user switch to another tab. This will make all animation synced since ccAction is scheduling-base
    setInterval: function (callback, timeInMillisecond) {
        if (timeInMillisecond === void 0) { timeInMillisecond = 0; }
        var target = { _id: timerUuidIndex++, __instanceId: timerUuidIndex, callback: null };
        target.callback = function () { callback(target); };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1000, cc.macro.REPEAT_FOREVER, 0, false);
        return target;
    },
    clearInterval: function (target) {
        if (!target || !target._id || !target.callback)
            return;
        cc.director.getScheduler().unschedule(target.callback, target);
    },
    addPseudoUpdateFunc: function (f) {
        var _this = this;
        var lastime = this.getMsPassedUTC();
        var intervalVar = this.setInterval(function () {
            var timeNow = _this.getMsPassedUTC();
            var dt = timeNow - lastime;
            lastime = timeNow;
            f(dt);
        }, 0.01);
        return intervalVar;
    },
    // 1d 
    // 01:11:01
    secondsToTimeCountdown: function (secondsCount) {
        if (secondsCount === void 0) { secondsCount = 0; }
        if (secondsCount <= 0)
            return '0:00';
        var days = Math.floor(secondsCount / 86400);
        var hours = Math.floor((secondsCount % 86400) / 3600);
        var minutes = Math.floor((secondsCount % 3600) / 60);
        var seconds = secondsCount % 60;
        // Output like "1 day" or "1:01" or "4:03:59"
        if (days > 2)
            return days + ' days';
        if (days == 1)
            return '1 day';
        var ret = "";
        //   if (hours >= 10) ret = hours + ':';
        //   else if (hours > 0) ret = '0' + hours + ':';
        if (hours > 0)
            ret = hours + ':';
        // if (minutes >= 10) ret += minutes + ':';
        // else ret += '0' + minutes + ':';
        ret += minutes + ':';
        if (seconds >= 10)
            ret += seconds;
        else
            ret += '0' + seconds;
        return ret;
    },
    //--- wait for certain property of certain object to be true & call a callback
    waitToRun: function (callback, propertyName, mainObject, interval, maxTimeWait, timeoutCallback) {
        if (mainObject === void 0) { mainObject = window; }
        if (interval === void 0) { interval = 0.1; }
        var isRunSuccess = false;
        var isReversed = propertyName.startsWith('!');
        var isFunction = propertyName.endsWith('()');
        propertyName = propertyName.replace('!', '').replace('()', '');
        var func = isFunction ? (function () { return mainObject[propertyName](); }) : null;
        var waitInterval;
        var timeTickFunc = function () {
            if (!isReversed) {
                if (isFunction) {
                    if (!func())
                        return;
                }
                else if (!mainObject[propertyName])
                    return;
            }
            else {
                if (isFunction) {
                    if (func())
                        return;
                }
                else if (mainObject[propertyName])
                    return;
            }
            clearInterval(waitInterval);
            isRunSuccess = true;
            callback(mainObject[propertyName]);
            return true;
        };
        if (timeTickFunc())
            return waitInterval;
        waitInterval = setInterval(timeTickFunc, interval * 1000);
        if (maxTimeWait) {
            this.setTimeout(function () {
                clearInterval(waitInterval);
                if (timeoutCallback && !isRunSuccess)
                    timeoutCallback();
            }, maxTimeWait * 1000);
        }
        return waitInterval;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUN2QyxJQUFBLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdqQixJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQyw4REFBOEQ7QUFDeEYsa0JBQWU7SUFHWix1REFBdUQ7SUFDdkQsY0FBYztRQUNYLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxvSUFBb0k7SUFDcEksYUFBYTtRQUNWLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25GLE9BQU8sZUFBZSxDQUFDO0lBQzFCLENBQUM7SUFHRCxTQUFTLFlBQUMsT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxjQUFjLElBQUksRUFBRTtRQUMzQixJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFDOUMsOE5BQThOO1FBQzlOLE9BQU8sT0FBTyxDQUFDO0lBQ2xCLENBQUM7SUFHRCxVQUFVLEVBQVYsVUFBVyxRQUFjLEVBQUUsUUFBYztRQUN0QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2VBQ2pELFFB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QUUsT0FBTztpQkFBRTtxQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7b0JBQUUsT0FBTzthQUM3QztpQkFDSTtnQkFDRixJQUFJLFVBQVUsRUFBRTtvQkFBRSxJQUFJLElBQUksRUFBRTt3QkFBRSxPQUFPO2lCQUFFO3FCQUNsQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUM7b0JBQUUsT0FBTzthQUM1QztZQUVELGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1QixZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNmLENBQUMsQ0FBQztRQUVGLElBQUksWUFBWSxFQUFFO1lBQUUsT0FBTyxZQUFZLENBQUM7UUFDeEMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRTFELElBQUksV0FBVyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDYixhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVCLElBQUksZUFBZSxJQUFJLENBQUMsWUFBWTtvQkFBRSxlQUFlLEVBQUUsQ0FBQztZQUMzRCxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdkIsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyAkIH0gPSBfRztcbmltcG9ydCB7IF8gfSBmcm9tICcuL3V0aWxzX2NvbW1vbic7IC8vIHNwZWNpYWwgY2FzZSBmb3Igc3ViLW1vZHVsZXNcblxubGV0IHRpbWVyVXVpZEluZGV4ID0gMWU1OyAvLyB1dWlkIHRvIHNldCBhcyBuYW1lcyBvZiBvYmplY3RzID0+IGhlbHAgaWRlbnRpZnlpbmcgb2JqZWN0c1xuZXhwb3J0IGRlZmF1bHQge1xuXG5cbiAgIC8vIGdldCBjdXJyZW50IHRpbWUgVVRDIC0gbWlsbGlzZWNvbmRzIGZyb20gMTk3MCB0byBub3dcbiAgIGdldE1zUGFzc2VkVVRDKCkge1xuICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICB9LFxuXG4gICAvLyBnZXQgY3VycmVudCBQYWNpZmljIFRpbWUgKFBUKSAgLSBtaWxsaXNlY29uZHMgZnJvbSAxOTcwIHRvIG5vd1xuICAgLy8gKiBXYXJuaW5nOiBEb250IHVzZSByZXN1bHQgKGZpbmFsUGFzc2VkTXMpIHRvIGNvbnZlcnQgYmFjayB0byBEYXRlKCkgb2JqZWN0IC0gbmV3IERhdGUoZ2V0TXNQYXNzZWRQVCksIHdpbGwgcmVzdWx0cyBpbiB3cm9uZyB0aW1lXG4gICBnZXRNc1Bhc3NlZFBUKCkge1xuICAgICAgY29uc3QgcGFjaWZpY1RpbWVPZmZzZXQgPSB0aGlzLmdldFBhY2lmaWNUaW1lT2Zmc2V0KCk7XG4gICAgICBjb25zdCBtc1Bhc3NlZEluUFROb3cgPSB0aGlzLmdldE1zUGFzc2VkVVRDKCkgKyBwYWNpZmljVGltZU9mZnNldCAqIDYwICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIG1zUGFzc2VkSW5QVE5vdztcbiAgIH0sXG5cblxuICAgZ2V0VGltZVBUKGRhdGVPYmogPSBuZXcgRGF0ZSgpKSB7XG4gICAgICBjb25zdCBwYWNpZmljVGltZU9mZnNldCA9IHRoaXMuZ2V0UGFjaWZpY1RpbWVPZmZzZXQoZGF0ZU9iaik7XG4gICAgICBjb25zdCB1dGNIb3VyID0gZGF0ZU9iai5nZXRIb3VycygpICsgZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpIC8gNjA7XG4gICAgICBkYXRlT2JqLnNldEhvdXJzKHV0Y0hvdXIgKyBwYWNpZmljVGltZU9mZnNldCk7XG4gICAgICAvLyBfLmxvZyhgZGF0ZU9iaiA9ICR7ZGF0ZU9ian0gLy8gcGFjaWZpY1RpbWVPZmZzZXQ9JHtwYWNpZmljVGltZU9mZnNldH0gLy8gZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpPSR7ZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpfSAvLyB1dGNIb3VyPSR7dXRjSG91cn0gLy8gdXRjSG91ciArIHBhY2lmaWNUaW1lT2Zmc2V0PSR7dXRjSG91ciArIHBhY2lmaWNUaW1lT2Zmc2V0fSAgYClcbiAgICAgIHJldHVybiBkYXRlT2JqO1xuICAgfSxcblxuXG4gICBpc1NhbWVEYXRlKGRhdGVPYmoxOiBEYXRlLCBkYXRlT2JqMjogRGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGVPYmoxLmdldEZ1bGxZZWFyKCkgPT0gZGF0ZU9iajIuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgJiYgZGF0ZU9iajEuZ2V0TW9udGgoKSA9PSBkYXRlT2JqMi5nZXRNb250aCgpXG4gICAgICAgICAmJiBkYXRlT2JqMS5nZXREYXRlKCkgPT0gZGF0ZU9iajIuZ2V0RGF0ZSgpO1xuICAgfSxcblxuXG4gICAvLyBnZXQgdG90YWwgbXMgdG8gbWlkbmlnaHQgb2YgY3VycmVudCBkYXkgaW4gUFRcbiAgIGdldFRvdGFsTXNUb01pZG5pZ2h0UFQoKSB7XG4gICAgICBjb25zdCBtc09mMURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gICAgICBjb25zdCBub3dQVCA9IHRoaXMuZ2V0TXNQYXNzZWRQVCgpO1xuICAgICAgY29uc3QgbXNUb01pZE5pZ2h0ID0gbXNPZjFEYXkgLSAobm93UFQgJSBtc09mMURheSk7XG4gICAgICByZXR1cm4gbXNUb01pZE5pZ2h0O1xuICAgfSxcblxuXG4gICAvLyBnZXQgRGF5bGlnaHQgU2F2aW5nIFRpbWUgc3RhcnQgJiBlbmQgb2YgY3VycmVudCB5ZWFyXG4gICAvLyAqIFNpbmNlIDIwMDcgRFNUIGJlZ2lucyBvbiB0aGUgc2Vjb25kIHN1bmRheSBvZiBNYXJjaCxcbiAgIC8vICogYW5kIGVuZHMgb24gdGhlIGZpcnN0IHN1bmRheSBvZiBOb3ZlbWJlci5cbiAgIGdldERTVFN0YXJ0RW5kRGF0ZShkYXRlT2JqPzogRGF0ZSkge1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBkYXRlT2JqIHx8IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBjdXJyZW50WWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgIC8vIERTVCBTdGFydFxuICAgICAgY29uc3QgZmlyc3RPZk1hcmNoID0gbmV3IERhdGUoY3VycmVudFllYXIsIDIsIDEpO1xuICAgICAgY29uc3QgZGF5c1VudGlsRmlyc3RTdW5kYXlJbk1hcmNoID0gKDcgLSBmaXJzdE9mTWFyY2guZ2V0RGF5KCkpICUgNztcbiAgICAgIGNvbnN0IHNlY29uZFN1bmRheUluTWFyY2ggPSBmaXJzdE9mTWFyY2guZ2V0RGF0ZSgpICsgZGF5c1VudGlsRmlyc3RTdW5kYXlJbk1hcmNoICsgNztcbiAgICAgIGNvbnN0IGRzdFN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCAyLCBzZWNvbmRTdW5kYXlJbk1hcmNoKTtcblxuICAgICAgLy8gRFNUIEVuZFxuICAgICAgY29uc3QgZmlyc3RPZk5vdmVtYmVyID0gbmV3IERhdGUoY3VycmVudFllYXIsIDEwLCAxKTtcbiAgICAgIGNvbnN0IGRheXNVbnRpbEZpcnN0U3VuZGF5SW5Ob3YgPSAoNyAtIGZpcnN0T2ZOb3ZlbWJlci5nZXREYXkoKSkgJSA3O1xuICAgICAgY29uc3QgZmlyc3RTdW5kYXlJbk5vdmVtYmVyID0gZmlyc3RPZk5vdmVtYmVyLmdldERhdGUoKSArIGRheXNVbnRpbEZpcnN0U3VuZGF5SW5Ob3Y7XG4gICAgICBjb25zdCBkc3RFbmREYXRlID0gbmV3IERhdGUoY3VycmVudFllYXIsIDEwLCBmaXJzdFN1bmRheUluTm92ZW1iZXIpO1xuICAgICAgcmV0dXJuIFtkc3RTdGFydERhdGUsIGRzdEVuZERhdGVdO1xuICAgfSxcblxuXG4gICBnZXRQYWNpZmljVGltZU9mZnNldChwYXJhbURhdGU/OiBEYXRlKSB7XG4gICAgICBjb25zdCBkYXRlT2JqID0gcGFyYW1EYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBbc3RhcnREU1QsIGVuZERTVF0gPSB0aGlzLmdldERTVFN0YXJ0RW5kRGF0ZSgpO1xuICAgICAgY29uc3QgaXNEU1RBY3RpdmUgPSBkYXRlT2JqID4gc3RhcnREU1QgJiYgZGF0ZU9iaiA8IGVuZERTVDtcbiAgICAgIGNvbnN0IHBhY2lmaWNUaW1lT2Zmc2V0ID0gaXNEU1RBY3RpdmUgPyAtNyA6IC04O1xuICAgICAgcmV0dXJuIHBhY2lmaWNUaW1lT2Zmc2V0O1xuICAgfSxcblxuXG5cbiAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAvLyBvdmVyd3JpdGUgZGVmYXVsdCBzZXRUaW1lb3V0IHRvIHVzZSBzY2hlZHVsZSAtIHdoaWNoIGlzIHBhdXNlZCB3aGVuIHVzZXIgc3dpdGNoIHRvIGFub3RoZXIgdGFiLiBUaGlzIHdpbGwgbWFrZSBhbGwgYW5pbWF0aW9uIHN5bmNlZCBzaW5jZSBjY0FjdGlvbiBpcyBzY2hlZHVsaW5nLWJhc2VcbiAgIHNldFRpbWVvdXQoY2FsbGJhY2s6IEZ1bmN0aW9uLCB0aW1lSW5NaWxsaXNlY29uZDogbnVtYmVyID0gMCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0geyBfaWQ6IHRpbWVyVXVpZEluZGV4KyssIF9faW5zdGFuY2VJZDogdGltZXJVdWlkSW5kZXgsIGNhbGxiYWNrOiBudWxsIH07XG4gICAgICB0YXJnZXQuY2FsbGJhY2sgPSAoKSA9PiB7IGNhbGxiYWNrKHRhcmdldCk7IH1cbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKHRhcmdldC5jYWxsYmFjaywgdGFyZ2V0LCB0aW1lSW5NaWxsaXNlY29uZCAvIDEwMDAsIDAsIDAsIGZhbHNlKTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICB9LFxuXG4gICBjbGVhclRpbWVvdXQodGFyZ2V0OiBhbnkpIHtcbiAgICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuX2lkIHx8ICF0YXJnZXQuY2FsbGJhY2spIHJldHVybjtcbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGUodGFyZ2V0LmNhbGxiYWNrLCB0YXJnZXQpO1xuICAgfSxcblxuXG4gICAvLyBvdmVyd3JpdGUgZGVmYXVsdCBzZXRJbnRlcnZhbCB0byB1c2Ugc2NoZWR1bGUgLSB3aGljaCBpcyBwYXVzZWQgd2hlbiB1c2VyIHN3aXRjaCB0byBhbm90aGVyIHRhYi4gVGhpcyB3aWxsIG1ha2UgYWxsIGFuaW1hdGlvbiBzeW5jZWQgc2luY2UgY2NBY3Rpb24gaXMgc2NoZWR1bGluZy1iYXNlXG4gICBzZXRJbnRlcnZhbChjYWxsYmFjazogRnVuY3Rpb24sIHRpbWVJbk1pbGxpc2Vjb25kID0gMCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0geyBfaWQ6IHRpbWVyVXVpZEluZGV4KyssIF9faW5zdGFuY2VJZDogdGltZXJVdWlkSW5kZXgsIGNhbGxiYWNrOiBudWxsIH07XG4gICAgICB0YXJnZXQuY2FsbGJhY2sgPSAoKSA9PiB7IGNhbGxiYWNrKHRhcmdldCk7IH1cbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKHRhcmdldC5jYWxsYmFjaywgdGFyZ2V0LCB0aW1lSW5NaWxsaXNlY29uZCAvIDEwMDAsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAwLCBmYWxzZSk7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgfSxcblxuICAgY2xlYXJJbnRlcnZhbCh0YXJnZXQ6IGFueSkge1xuICAgICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5faWQgfHwgIXRhcmdldC5jYWxsYmFjaykgcmV0dXJuO1xuICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZSh0YXJnZXQuY2FsbGJhY2ssIHRhcmdldCk7XG4gICB9LFxuXG4gICBhZGRQc2V1ZG9VcGRhdGVGdW5jKGYpIHtcbiAgICAgIGxldCBsYXN0aW1lID0gdGhpcy5nZXRNc1Bhc3NlZFVUQygpO1xuICAgICAgY29uc3QgaW50ZXJ2YWxWYXIgPSB0aGlzLnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgIGNvbnN0IHRpbWVOb3cgPSB0aGlzLmdldE1zUGFzc2VkVVRDKCk7XG4gICAgICAgICBjb25zdCBkdCA9IHRpbWVOb3cgLSBsYXN0aW1lO1xuICAgICAgICAgbGFzdGltZSA9IHRpbWVOb3c7XG4gICAgICAgICBmKGR0KTtcbiAgICAgIH0sIDAuMDEpO1xuICAgICAgcmV0dXJuIGludGVydmFsVmFyO1xuICAgfSxcblxuICAgLy8gMWQgXG4gICAvLyAwMToxMTowMVxuICAgc2Vjb25kc1RvVGltZUNvdW50ZG93bihzZWNvbmRzQ291bnQgPSAwKSB7XG4gICAgICBpZiAoc2Vjb25kc0NvdW50IDw9IDApIHJldHVybiAnMDowMCc7XG5cbiAgICAgIGxldCBkYXlzID0gTWF0aC5mbG9vcihzZWNvbmRzQ291bnQgLyA4NjQwMCk7XG4gICAgICBsZXQgaG91cnMgPSBNYXRoLmZsb29yKChzZWNvbmRzQ291bnQgJSA4NjQwMCkgLyAzNjAwKTtcbiAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kc0NvdW50ICUgMzYwMCkgLyA2MCk7XG4gICAgICBsZXQgc2Vjb25kcyA9IHNlY29uZHNDb3VudCAlIDYwO1xuXG4gICAgICAvLyBPdXRwdXQgbGlrZSBcIjEgZGF5XCIgb3IgXCIxOjAxXCIgb3IgXCI0OjAzOjU5XCJcbiAgICAgIGlmIChkYXlzID4gMikgcmV0dXJuIGRheXMgKyAnIGRheXMnO1xuICAgICAgaWYgKGRheXMgPT0gMSkgcmV0dXJuICcxIGRheSc7XG5cbiAgICAgIGxldCByZXQgPSBcIlwiO1xuICAgICAgLy8gICBpZiAoaG91cnMgPj0gMTApIHJldCA9IGhvdXJzICsgJzonO1xuICAgICAgLy8gICBlbHNlIGlmIChob3VycyA+IDApIHJldCA9ICcwJyArIGhvdXJzICsgJzonO1xuICAgICAgaWYgKGhvdXJzID4gMCkgcmV0ID0gaG91cnMgKyAnOic7XG5cbiAgICAgIC8vIGlmIChtaW51dGVzID49IDEwKSByZXQgKz0gbWludXRlcyArICc6JztcbiAgICAgIC8vIGVsc2UgcmV0ICs9ICcwJyArIG1pbnV0ZXMgKyAnOic7XG4gICAgICByZXQgKz0gbWludXRlcyArICc6JztcblxuICAgICAgaWYgKHNlY29uZHMgPj0gMTApIHJldCArPSBzZWNvbmRzO1xuICAgICAgZWxzZSByZXQgKz0gJzAnICsgc2Vjb25kcztcblxuICAgICAgcmV0dXJuIHJldDtcbiAgIH0sXG5cblxuICAgLy8tLS0gd2FpdCBmb3IgY2VydGFpbiBwcm9wZXJ0eSBvZiBjZXJ0YWluIG9iamVjdCB0byBiZSB0cnVlICYgY2FsbCBhIGNhbGxiYWNrXG4gICB3YWl0VG9SdW4oXG4gICAgICBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgIG1haW5PYmplY3Q6IGFueSA9IHdpbmRvdyxcbiAgICAgIGludGVydmFsOiBudW1iZXIgPSAwLjEsXG4gICAgICBtYXhUaW1lV2FpdD86IG51bWJlcixcbiAgICAgIHRpbWVvdXRDYWxsYmFjaz86IEZ1bmN0aW9uXG4gICApIHtcbiAgICAgIGxldCBpc1J1blN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGlzUmV2ZXJzZWQgPSBwcm9wZXJ0eU5hbWUuc3RhcnRzV2l0aCgnIScpO1xuICAgICAgY29uc3QgaXNGdW5jdGlvbiA9IHByb3BlcnR5TmFtZS5lbmRzV2l0aCgnKCknKTtcbiAgICAgIHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKCchJywgJycpLnJlcGxhY2UoJygpJywgJycpO1xuICAgICAgY29uc3QgZnVuYyA9IGlzRnVuY3Rpb24gPyAoKCkgPT4gbWFpbk9iamVjdFtwcm9wZXJ0eU5hbWVdKCkpIDogbnVsbDtcbiAgICAgIGxldCB3YWl0SW50ZXJ2YWw7XG5cbiAgICAgIGNvbnN0IHRpbWVUaWNrRnVuYyA9ICgpID0+IHtcbiAgICAgICAgIGlmICghaXNSZXZlcnNlZCkge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24pIHsgaWYgKCFmdW5jKCkpIHJldHVybjsgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW1haW5PYmplY3RbcHJvcGVydHlOYW1lXSkgcmV0dXJuO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbikgeyBpZiAoZnVuYygpKSByZXR1cm47IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1haW5PYmplY3RbcHJvcGVydHlOYW1lXSkgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjbGVhckludGVydmFsKHdhaXRJbnRlcnZhbCk7XG4gICAgICAgICBpc1J1blN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgY2FsbGJhY2sobWFpbk9iamVjdFtwcm9wZXJ0eU5hbWVdKTtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcblxuICAgICAgaWYgKHRpbWVUaWNrRnVuYygpKSByZXR1cm4gd2FpdEludGVydmFsO1xuICAgICAgd2FpdEludGVydmFsID0gc2V0SW50ZXJ2YWwodGltZVRpY2tGdW5jLCBpbnRlcnZhbCAqIDEwMDApO1xuXG4gICAgICBpZiAobWF4VGltZVdhaXQpIHtcbiAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRJbnRlcnZhbCk7XG4gICAgICAgICAgICBpZiAodGltZW91dENhbGxiYWNrICYmICFpc1J1blN1Y2Nlc3MpIHRpbWVvdXRDYWxsYmFjaygpO1xuICAgICAgICAgfSwgbWF4VGltZVdhaXQgKiAxMDAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhaXRJbnRlcnZhbDtcbiAgIH0sXG5cbn0iXX0=