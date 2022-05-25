
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/user.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61662fIpZFE47aAaicYHcc7', 'user');
// script/system/user.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var _G = require("./all_modules");
var _ = _G._, $ = _G.$;
var callbackArr = [];
var dataFieldArr = [
    'IsOldUser',
    'exp',
    'stars',
    'playedGames',
];
exports.user = {
    loginData: null,
    entryPointData: {},
    exp: 0,
    stars: 0,
    level: 0,
    playedGames: null,
    isPuzzleSpecified: false,
    isVersionV2: false,
    init: function () {
        var _this = this;
        this.entryPointData = _G.utilsData.getEntryPointData();
        // TESTTTTTTTTTTTTTTTTTTTTT 
        // this.entryPointData.puzzle_id = 'POSTER_frame02';
        // this.entryPointData.version = 'v2'; // 'v2' or 'normal'
        // TESTTTTTTTTTTTTTTTTTTTTT 
        // validate the puzzle_id to prevent outdated puzzle_id to cause error
        var puzzleId = this.entryPointData.puzzle_id;
        if (puzzleId) {
            var _a = puzzleId.split('_'), catName = _a[0], frameName = _a[1];
            var isCatNameValid = _G.levelManager.categoryNameArr.includes(catName);
            if (!isCatNameValid)
                this.entryPointData.puzzle_id = null;
            else {
                var isFrameNameValid = _G.levelManager.getAvatarInfo(catName, frameName);
                if (!isFrameNameValid)
                    this.entryPointData.puzzle_id = null;
            }
        }
        if (this.entryPointData.isFromNewsFeed)
            _G.analytic.logPageViewFromFeed(this.entryPointData.puzzle_id);
        this.isPuzzleSpecified = this.entryPointData.puzzle_id;
        this.isVersionV2 = this.isPuzzleSpecified && (this.entryPointData.version == 'v2');
        // this.isPuzzleSpecified = null;
        setTimeout(function () { return _this.getFBData(); }); //delay 1 thread for other modules to register dataField
    },
    getFBData: function () {
        var _this = this;
        _G.utilsData.load(dataFieldArr, function (data) {
            _this.loginData = data;
            data.isNewUser = !data.IsOldUser;
            _G.utilsData.save({ 'IsOldUser': true });
            // fill exp, stars, level
            _this.stars = data.isNewUser ? _G.configGame.hintCoinPrice : (data.stars || 0);
            _this.exp = data.exp || 0;
            _this.level = _this.expToLevel(_this.exp);
            _this.playedGames = data.playedGames || {};
            _G.coreUI.updateUserStats();
            // call all the loginCallback
            callbackArr.map(function (func) { return func(data); });
        });
    },
    addLoginDataFields: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.map(function (fieldName) { return _.addUniqueElemToArr(dataFieldArr, fieldName); });
    },
    addInitCallback: function (callbackFunc) {
        if (!this.loginData)
            callbackArr.push(callbackFunc);
        else
            callbackFunc(this.loginData);
    },
    // Supportive
    addStars: function (starNum, isSkipUpdateUI) {
        if (isSkipUpdateUI === void 0) { isSkipUpdateUI = false; }
        this.stars = _.max(this.stars + starNum, 0);
        _G.utilsData.save({ stars: this.stars });
        _G.coreUI.updateUserStats(isSkipUpdateUI);
    },
    expToLevel: function (exp) {
        return 1 + _.floor(this.exp / _G.configGame.levelUpExp);
    },
    addExp: function (exp, isSkipUpdateUIStars) {
        if (isSkipUpdateUIStars === void 0) { isSkipUpdateUIStars = false; }
        var oldLevel = this.expToLevel(this.exp);
        this.exp += exp;
        var newLevel = this.level = this.expToLevel(this.exp);
        _G.utilsData.save({ exp: this.exp });
        _G.coreUI.updateUserStats(isSkipUpdateUIStars);
        return newLevel != oldLevel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0NBQW9DO0FBQzVCLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdwQixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsSUFBTSxZQUFZLEdBQUc7SUFDbEIsV0FBVztJQUNYLEtBQUs7SUFDTCxPQUFPO0lBQ1AsYUFBYTtDQUNmLENBQUM7QUFHVyxRQUFBLElBQUksR0FBRztJQUNqQixTQUFTLEVBQUUsSUFBSTtJQUNmLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLEVBQUUsQ0FBQztJQUNSLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLEtBQUs7SUFFbEIsSUFBSTtRQUFKLGlCQThCQztRQTdCRSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV2RCw0QkFBNEI7UUFDNUIsb0RBQW9EO1FBQ3BELDBEQUEwRDtRQUMxRCw0QkFBNEI7UUFHNUIsc0VBQXNFO1FBQ3RFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksUUFBUSxFQUFFO1lBQ0wsSUFBQSxLQUF1QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF6QyxPQUFPLFFBQUEsRUFBRSxTQUFTLFFBQXVCLENBQUM7WUFDakQsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElB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Q0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFVBQVUsWUFBQyxHQUFHO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELE1BQU0sWUFBQyxHQUFHLEVBQUUsbUJBQTJCO1FBQTNCLG9DQUFBLEVBQUEsMkJBQTJCO1FBQ3BDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2hCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvQyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUM7SUFDL0IsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cblxuY29uc3QgY2FsbGJhY2tBcnIgPSBbXTtcbmNvbnN0IGRhdGFGaWVsZEFyciA9IFtcbiAgICdJc09sZFVzZXInLFxuICAgJ2V4cCcsXG4gICAnc3RhcnMnLFxuICAgJ3BsYXllZEdhbWVzJyxcbl07XG5cblxuZXhwb3J0IGNvbnN0IHVzZXIgPSB7XG4gICBsb2dpbkRhdGE6IG51bGwsXG4gICBlbnRyeVBvaW50RGF0YToge30sXG4gICBleHA6IDAsXG4gICBzdGFyczogMCxcbiAgIGxldmVsOiAwLFxuICAgcGxheWVkR2FtZXM6IG51bGwsXG4gICBpc1B1enpsZVNwZWNpZmllZDogZmFsc2UsXG4gICBpc1ZlcnNpb25WMjogZmFsc2UsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmVudHJ5UG9pbnREYXRhID0gX0cudXRpbHNEYXRhLmdldEVudHJ5UG9pbnREYXRhKCk7XG5cbiAgICAgIC8vIFRFU1RUVFRUVFRUVFRUVFRUVFRUVFRUVCBcbiAgICAgIC8vIHRoaXMuZW50cnlQb2ludERhdGEucHV6emxlX2lkID0gJ1BPU1RFUl9mcmFtZTAyJztcbiAgICAgIC8vIHRoaXMuZW50cnlQb2ludERhdGEudmVyc2lvbiA9ICd2Mic7IC8vICd2Micgb3IgJ25vcm1hbCdcbiAgICAgIC8vIFRFU1RUVFRUVFRUVFRUVFRUVFRUVFRUVCBcblxuXG4gICAgICAvLyB2YWxpZGF0ZSB0aGUgcHV6emxlX2lkIHRvIHByZXZlbnQgb3V0ZGF0ZWQgcHV6emxlX2lkIHRvIGNhdXNlIGVycm9yXG4gICAgICBjb25zdCBwdXp6bGVJZCA9IHRoaXMuZW50cnlQb2ludERhdGEucHV6emxlX2lkO1xuICAgICAgaWYgKHB1enpsZUlkKSB7XG4gICAgICAgICBjb25zdCBbY2F0TmFtZSwgZnJhbWVOYW1lXSA9IHB1enpsZUlkLnNwbGl0KCdfJyk7XG4gICAgICAgICBjb25zdCBpc0NhdE5hbWVWYWxpZCA9IF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeU5hbWVBcnIuaW5jbHVkZXMoY2F0TmFtZSk7XG4gICAgICAgICBpZiAoIWlzQ2F0TmFtZVZhbGlkKSB0aGlzLmVudHJ5UG9pbnREYXRhLnB1enpsZV9pZCA9IG51bGw7XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRnJhbWVOYW1lVmFsaWQgPSBfRy5sZXZlbE1hbmFnZXIuZ2V0QXZhdGFySW5mbyhjYXROYW1lLCBmcmFtZU5hbWUpO1xuICAgICAgICAgICAgaWYgKCFpc0ZyYW1lTmFtZVZhbGlkKSB0aGlzLmVudHJ5UG9pbnREYXRhLnB1enpsZV9pZCA9IG51bGw7XG4gICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgaWYgKHRoaXMuZW50cnlQb2ludERhdGEuaXNGcm9tTmV3c0ZlZWQpIF9HLmFuYWx5dGljLmxvZ1BhZ2VWaWV3RnJvbUZlZWQodGhpcy5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQpO1xuXG4gICAgICB0aGlzLmlzUHV6emxlU3BlY2lmaWVkID0gdGhpcy5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQ7XG4gICAgICB0aGlzLmlzVmVyc2lvblYyID0gdGhpcy5pc1B1enpsZVNwZWNpZmllZCAmJiAodGhpcy5lbnRyeVBvaW50RGF0YS52ZXJzaW9uID09ICd2MicpO1xuXG4gICAgICAvLyB0aGlzLmlzUHV6emxlU3BlY2lmaWVkID0gbnVsbDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5nZXRGQkRhdGEoKSk7IC8vZGVsYXkgMSB0aHJlYWQgZm9yIG90aGVyIG1vZHVsZXMgdG8gcmVnaXN0ZXIgZGF0YUZpZWxkXG5cbiAgIH0sXG5cbiAgIGdldEZCRGF0YSgpIHtcbiAgICAgIF9HLnV0aWxzRGF0YS5sb2FkKGRhdGFGaWVsZEFyciwgKGRhdGEpID0+IHtcbiAgICAgICAgIHRoaXMubG9naW5EYXRhID0gZGF0YTtcbiAgICAgICAgIGRhdGEuaXNOZXdVc2VyID0gIWRhdGEuSXNPbGRVc2VyO1xuICAgICAgICAgX0cudXRpbHNEYXRhLnNhdmUoeyAnSXNPbGRVc2VyJzogdHJ1ZSB9KTtcblxuICAgICAgICAgLy8gZmlsbCBleHAsIHN0YXJzLCBsZXZlbFxuICAgICAgICAgdGhpcy5zdGFycyA9IGRhdGEuaXNOZXdVc2VyID8gX0cuY29uZmlnR2FtZS5oaW50Q29pblByaWNlIDogKGRhdGEuc3RhcnMgfHwgMCk7XG4gICAgICAgICB0aGlzLmV4cCA9IGRhdGEuZXhwIHx8IDA7XG4gICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5leHBUb0xldmVsKHRoaXMuZXhwKTtcbiAgICAgICAgIHRoaXMucGxheWVkR2FtZXMgPSBkYXRhLnBsYXllZEdhbWVzIHx8IHt9O1xuICAgICAgICAgX0cuY29yZVVJLnVwZGF0ZVVzZXJTdGF0cygpO1xuXG4gICAgICAgICAvLyBjYWxsIGFsbCB0aGUgbG9naW5DYWxsYmFja1xuICAgICAgICAgY2FsbGJhY2tBcnIubWFwKGZ1bmMgPT4gZnVuYyhkYXRhKSk7XG4gICAgICB9KTtcbiAgIH0sXG5cblxuICAgYWRkTG9naW5EYXRhRmllbGRzKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBhcmdzLm1hcChmaWVsZE5hbWUgPT4gXy5hZGRVbmlxdWVFbGVtVG9BcnIoZGF0YUZpZWxkQXJyLCBmaWVsZE5hbWUpKVxuICAgfSxcblxuXG4gICBhZGRJbml0Q2FsbGJhY2soY2FsbGJhY2tGdW5jOiBGdW5jdGlvbikge1xuICAgICAgaWYgKCF0aGlzLmxvZ2luRGF0YSkgY2FsbGJhY2tBcnIucHVzaChjYWxsYmFja0Z1bmMpO1xuICAgICAgZWxzZSBjYWxsYmFja0Z1bmModGhpcy5sb2dpbkRhdGEpO1xuICAgfSxcblxuXG4gICAvLyBTdXBwb3J0aXZlXG4gICBhZGRTdGFycyhzdGFyTnVtLCBpc1NraXBVcGRhdGVVSSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLnN0YXJzID0gXy5tYXgodGhpcy5zdGFycyArIHN0YXJOdW0sIDApO1xuICAgICAgX0cudXRpbHNEYXRhLnNhdmUoeyBzdGFyczogdGhpcy5zdGFycyB9KTtcbiAgICAgIF9HLmNvcmVVSS51cGRhdGVVc2VyU3RhdHMoaXNTa2lwVXBkYXRlVUkpO1xuICAgfSxcblxuICAgZXhwVG9MZXZlbChleHApIHtcbiAgICAgIHJldHVybiAxICsgXy5mbG9vcih0aGlzLmV4cCAvIF9HLmNvbmZpZ0dhbWUubGV2ZWxVcEV4cCk7XG4gICB9LFxuXG4gICBhZGRFeHAoZXhwLCBpc1NraXBVcGRhdGVVSVN0YXJzID0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IG9sZExldmVsID0gdGhpcy5leHBUb0xldmVsKHRoaXMuZXhwKTtcbiAgICAgIHRoaXMuZXhwICs9IGV4cDtcbiAgICAgIGNvbnN0IG5ld0xldmVsID0gdGhpcy5sZXZlbCA9IHRoaXMuZXhwVG9MZXZlbCh0aGlzLmV4cCk7XG5cbiAgICAgIF9HLnV0aWxzRGF0YS5zYXZlKHsgZXhwOiB0aGlzLmV4cCB9KTtcbiAgICAgIF9HLmNvcmVVSS51cGRhdGVVc2VyU3RhdHMoaXNTa2lwVXBkYXRlVUlTdGFycyk7XG4gICAgICByZXR1cm4gbmV3TGV2ZWwgIT0gb2xkTGV2ZWw7XG4gICB9LFxuXG59Il19