"use strict";
cc._RF.push(module, '56da7F4X6tJVqzk9azG74zA', 'inter_ad');
// script/services/inter_ad.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interAd = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.interAd = {
    interAdObj: null,
    isLoading: false,
    init: function () {
        this.preloadInterAds();
        this.lastTimeShowAd = _.getMsPassedUTC();
    },
    preloadInterAds: function () {
        var _this = this;
        if (!window['FBInstant'])
            return;
        if (this.isLoading)
            return;
        _.log("interAd.preloadInterAds ...  ");
        this.interAdObj = null;
        this.isLoading = true;
        FBInstant.getInterstitialAdAsync(_G.configGame.interAdId).then(function (interAdObj) {
            // _log(` preloadInterAds 3333 `);
            interAdObj.loadAsync().then(function () {
                _.log("interAd.preloadInterAds successfully ");
                _this.interAdObj = interAdObj;
                _this.isLoading = false;
            }).catch(function (e) {
                console.warn(e);
                _this.isLoading = false;
                // setTimeout(() => this.preloadInterAds(), 5000);
            });
        }).catch(function (e) {
            console.warn(e);
            _this.isLoading = false;
            // setTimeout(() => this.preloadInterAds(), 5000);
        });
    },
    // loadTimeout = max time to wait for inter ad to be loaded. unless ads will be skipped
    doShowInterAd: function (callBack, maxLoadTimeWait) {
        var _this = this;
        if (maxLoadTimeWait === void 0) { maxLoadTimeWait = 1; }
        // _.log(` showInterAds 1111 `);
        if (!window['FBInstant'])
            return _G.coreUI.showLoadingAds(function () { return callBack && callBack(true); });
        _.waitToRun(function () {
            // show a loading ads 1 secs before do show ad
            _G.coreUI.showLoadingAds(function () {
                // _.log(` showInterAds 2222 `);
                _this.interAdObj.showAsync().then(function () {
                    _.log("interAd.showInterAds success ");
                    if (callBack)
                        callBack(true);
                    _this.preloadInterAds(); // load another ads
                }).catch(function (e) {
                    _.log("interAd.showInterAds fail ");
                    console.warn(e);
                    callBack && callBack();
                    if (e.code != 'RATE_LIMITED')
                        _this.preloadInterAds();
                });
            });
        }, 'interAdObj', this, 0.1, maxLoadTimeWait, function () {
            _.log("interAd.showInterAds fail ");
            console.warn("interAd load wait timeout 5 secs");
            _this.preloadInterAds();
            if (callBack)
                callBack();
        });
    },
    // ===================================
    adShowCount: 0,
    lastTimeShowAd: 0,
    frameClickCount: 0,
    checkToShowInterAd: function (callback) {
        var _this = this;
        var timeArr = _G.configGame.interAdTime[_G.user.isVersionV2 ? 'v2' : 'v1'];
        var timeToWait = timeArr[this.adShowCount] || timeArr[timeArr.length - 1];
        var timeNow = _.getMsPassedUTC();
        _.log("checkToShowInterAd called ! adShowCount=" + this.adShowCount + " // timeToWait=" + timeToWait + " // timePassed = " + _.round(timeNow / 1000 - this.lastTimeShowAd / 1000) + " secs // timeArr=" + timeArr);
        if (timeNow - this.lastTimeShowAd < timeToWait * 1000)
            return callback && callback();
        this.frameClickCount++;
        if (this.frameClickCount < _G.configGame.interAdClickCount)
            return callback && callback();
        _.waitToRun(function () {
            _this.doShowInterAd(function (isShowSuccess) {
                if (!isShowSuccess)
                    return callback && callback();
                _.log("interAd show callback called !");
                _this.adShowCount++;
                _this.lastTimeShowAd = timeNow;
                _this.frameClickCount = 0;
                return callback && callback();
            });
        }, '!isPlayingFxStarsAdd', _G.coreFX, 0.5);
    },
};

cc._RF.pop();