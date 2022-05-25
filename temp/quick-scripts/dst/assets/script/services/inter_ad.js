
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/inter_ad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvaW50ZXJfYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLE9BQU8sR0FBRztJQUNwQixVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsS0FBSztJQUVoQixJQUFJO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxlQUFlO1FBQWYsaUJBdUJDO1FBdEJFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTztRQUNqQyxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTztRQUUzQixDQUFDLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsU0FBUyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUN0RSxrQ0FBa0M7WUFDbEMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDekIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztnQkFDUixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsU0FBUyxH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RyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsR0FBRyxJQUFJO1lBQUUsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBRTFGLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQUEsYUFBYTtnQkFDN0IsSUFBSSxDQUFDLGFBQWE7b0JBQUUsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFOUMsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCBjb25zdCBpbnRlckFkID0ge1xuICAgaW50ZXJBZE9iajogbnVsbCxcbiAgIGlzTG9hZGluZzogZmFsc2UsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLnByZWxvYWRJbnRlckFkcygpO1xuICAgICAgdGhpcy5sYXN0VGltZVNob3dBZCA9IF8uZ2V0TXNQYXNzZWRVVEMoKTtcbiAgIH0sXG5cbiAgIHByZWxvYWRJbnRlckFkcygpIHtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm47XG5cbiAgICAgIF8ubG9nKGBpbnRlckFkLnByZWxvYWRJbnRlckFkcyAuLi4gIGApO1xuICAgICAgdGhpcy5pbnRlckFkT2JqID0gbnVsbDtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIEZCSW5zdGFudC5nZXRJbnRlcnN0aXRpYWxBZEFzeW5jKF9HLmNvbmZpZ0dhbWUuaW50ZXJBZElkKS50aGVuKGludGVyQWRPYmogPT4ge1xuICAgICAgICAgLy8gX2xvZyhgIHByZWxvYWRJbnRlckFkcyAzMzMzIGApO1xuICAgICAgICAgaW50ZXJBZE9iai5sb2FkQXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnByZWxvYWRJbnRlckFkcyBzdWNjZXNzZnVsbHkgYCk7XG4gICAgICAgICAgICB0aGlzLmludGVyQWRPYmogPSBpbnRlckFkT2JqO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZWxvYWRJbnRlckFkcygpLCA1MDAwKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJlbG9hZEludGVyQWRzKCksIDUwMDApO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIGxvYWRUaW1lb3V0ID0gbWF4IHRpbWUgdG8gd2FpdCBmb3IgaW50ZXIgYWQgdG8gYmUgbG9hZGVkLiB1bmxlc3MgYWRzIHdpbGwgYmUgc2tpcHBlZFxuICAgZG9TaG93SW50ZXJBZChjYWxsQmFjaz8sIG1heExvYWRUaW1lV2FpdCA9IDEpIHtcbiAgICAgIC8vIF8ubG9nKGAgc2hvd0ludGVyQWRzIDExMTEgYCk7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBfRy5jb3JlVUkuc2hvd0xvYWRpbmdBZHMoKCkgPT4gY2FsbEJhY2sgJiYgY2FsbEJhY2sodHJ1ZSkpO1xuICAgICAgXy53YWl0VG9SdW4oXG4gICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAvLyBzaG93IGEgbG9hZGluZyBhZHMgMSBzZWNzIGJlZm9yZSBkbyBzaG93IGFkXG4gICAgICAgICAgICBfRy5jb3JlVUkuc2hvd0xvYWRpbmdBZHMoKCkgPT4ge1xuICAgICAgICAgICAgICAgLy8gXy5sb2coYCBzaG93SW50ZXJBZHMgMjIyMiBgKTtcbiAgICAgICAgICAgICAgIHRoaXMuaW50ZXJBZE9iai5zaG93QXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBzdWNjZXNzIGApO1xuICAgICAgICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSBjYWxsQmFjayh0cnVlKVxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkSW50ZXJBZHMoKTsgLy8gbG9hZCBhbm90aGVyIGFkc1xuICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBmYWlsIGApO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgIT0gJ1JBVEVfTElNSVRFRCcpIHRoaXMucHJlbG9hZEludGVyQWRzKCk7XG4gICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9LFxuICAgICAgICAgJ2ludGVyQWRPYmonLFxuICAgICAgICAgdGhpcyxcbiAgICAgICAgIDAuMSxcbiAgICAgICAgIG1heExvYWRUaW1lV2FpdCxcbiAgICAgICAgICgpID0+IHsgIC8vIHRpbWVvdXQgY2FsbGJhY2tcbiAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBmYWlsIGApO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBpbnRlckFkIGxvYWQgd2FpdCB0aW1lb3V0IDUgc2Vjc2ApO1xuICAgICAgICAgICAgdGhpcy5wcmVsb2FkSW50ZXJBZHMoKTtcbiAgICAgICAgICAgIGlmIChjYWxsQmFjaykgY2FsbEJhY2soKTtcbiAgICAgICAgIH1cbiAgICAgIClcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIGFkU2hvd0NvdW50OiAwLFxuICAgbGFzdFRpbWVTaG93QWQ6IDAsXG4gICBmcmFtZUNsaWNrQ291bnQ6IDAsXG4gICBjaGVja1RvU2hvd0ludGVyQWQoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgdGltZUFyciA9IF9HLmNvbmZpZ0dhbWUuaW50ZXJBZFRpbWVbX0cudXNlci5pc1ZlcnNpb25WMiA/ICd2MicgOiAndjEnXTtcbiAgICAgIGxldCB0aW1lVG9XYWl0ID0gdGltZUFyclt0aGlzLmFkU2hvd0NvdW50XSB8fCB0aW1lQXJyW3RpbWVBcnIubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCB0aW1lTm93ID0gXy5nZXRNc1Bhc3NlZFVUQygpO1xuICAgICAgXy5sb2coYGNoZWNrVG9TaG93SW50ZXJBZCBjYWxsZWQgISBhZFNob3dDb3VudD0ke3RoaXMuYWRTaG93Q291bnR9IC8vIHRpbWVUb1dhaXQ9JHt0aW1lVG9XYWl0fSAvLyB0aW1lUGFzc2VkID0gJHtfLnJvdW5kKHRpbWVOb3cgLyAxMDAwIC0gdGhpcy5sYXN0VGltZVNob3dBZCAvIDEwMDApfSBzZWNzIC8vIHRpbWVBcnI9JHt0aW1lQXJyfWApO1xuICAgICAgaWYgKHRpbWVOb3cgLSB0aGlzLmxhc3RUaW1lU2hvd0FkIDwgdGltZVRvV2FpdCAqIDEwMDApIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgdGhpcy5mcmFtZUNsaWNrQ291bnQrKztcbiAgICAgIGlmICh0aGlzLmZyYW1lQ2xpY2tDb3VudCA8IF9HLmNvbmZpZ0dhbWUuaW50ZXJBZENsaWNrQ291bnQpIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB7XG4gICAgICAgICB0aGlzLmRvU2hvd0ludGVyQWQoaXNTaG93U3VjY2VzcyA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzU2hvd1N1Y2Nlc3MpIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgXy5sb2coYGludGVyQWQgc2hvdyBjYWxsYmFjayBjYWxsZWQgIWApO1xuICAgICAgICAgICAgdGhpcy5hZFNob3dDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZVNob3dBZCA9IHRpbWVOb3c7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2xpY2tDb3VudCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgICAgfSk7XG4gICAgICB9LCAnIWlzUGxheWluZ0Z4U3RhcnNBZGQnLCBfRy5jb3JlRlgsIDAuNSk7XG5cbiAgIH0sXG5cbn0iXX0=