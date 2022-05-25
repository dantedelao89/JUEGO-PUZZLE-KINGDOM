"use strict";
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