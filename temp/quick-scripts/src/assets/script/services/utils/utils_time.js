"use strict";
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