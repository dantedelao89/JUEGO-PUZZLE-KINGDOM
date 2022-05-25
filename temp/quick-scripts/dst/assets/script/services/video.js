
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/video.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ee5dMFk+9DoqP4sqItcJ1A', 'video');
// script/services/video.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.video = {
    isAvailable: false,
    loadingVideo: false,
    rewardedVideo: null,
    init: function () {
        if (!window['FBInstant'])
            this.isAvailable = true;
        this.isAvailable = _G.utilsFB.isSupportedAPI("getRewardedVideoAsync");
        _.log("VIDEO.isAvailable = " + this.isAvailable + " ");
        this.preloadVideo();
    },
    preloadVideo: function () {
        var _this = this;
        _.log("preloadVideo called........  this.loadingVideo=" + this.loadingVideo);
        var failFunc = function (code) { return _.log("preloadVideo 000 code = " + code); };
        if (!window['FBInstant'])
            return failFunc('OFFLINE');
        if (!_G.utilsFB.isSupportedAPI("getRewardedVideoAsync"))
            return failFunc('NOT_SUPPORTED');
        if (this.loadingVideo)
            return failFunc('LOADING');
        _.log("preloadVideo 1111 ");
        var failFunc1 = function (err) {
            _.log("preloadVideo >> failFunc1 called err = ", err);
            _this.rewardedVideo = null;
            _this.loadingVideo = false;
            _.setTimeout(function (err) {
                if (!err || err.code == 'OFFLINE' || err.code == 'LOADING' || err.code == 'NOT_SUPPORTED' || err.code == 'RATE_LIMITED')
                    return;
                _.setTimeout(function () { return _this.preloadVideo(); }, 5000);
            });
        };
        this.loadingVideo = true;
        FBInstant.getRewardedVideoAsync(_G.configGame.videoRewardId).then(function (rewardedVideo) {
            rewardedVideo.loadAsync().then(function () {
                _.log("preloadVideo >> SUCCESS");
                _this.rewardedVideo = rewardedVideo;
                _this.loadingVideo = false;
            }, failFunc1).catch(failFunc1);
        }, failFunc1).catch(failFunc1);
    },
    showVideo: function (orgSuccessCallBack, orgFailCallBack) {
        var _this = this;
        _.log("VIDEO.showVideo() this.loadingVideo=" + this.loadingVideo + " // videoObject = ", this.rewardedVideo);
        var successCallBack = function () { return orgSuccessCallBack && orgSuccessCallBack(); };
        var failCallBack = function (err) { return orgFailCallBack && orgFailCallBack(err); };
        if (!window['FBInstant'])
            return _.random() > 0.75 ? failCallBack() : successCallBack();
        if (this.rewardedVideo) {
            _.log("ev_video_click_show");
            this.rewardedVideo.showAsync().then(function () {
                _.log("VIDEO.showVideo success");
                _.log("ev_watch_video_success", 1, {});
                successCallBack();
                _this.preloadVideo();
            }).catch(function (err) {
                console.warn("VIDEO.showVideo error ", err);
                if (_this.isErrRewardNotCompleted(err)) {
                    _.log("ev_video_err_reward_not_completed");
                }
                else {
                    _.log("ev_video_err_other");
                }
                _this.preloadVideo();
                failCallBack(err);
            });
        }
        else if (this.loadingVideo) {
            // _.setTimeout(() => this.showVideo(successCallBack, failCallBack, videoPos), 200);
            failCallBack({ code: "LOADING" });
        }
        else {
            failCallBack({ code: "VIDEO_IS_NULL" });
        }
    },
    isErrRewardNotCompleted: function (err) {
        return err.code == 'USER_INPUT' && err.message == 'Reward not completed';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLEtBQUssR0FBRztJQUNsQixXQUFXLEVBQUUsS0FBSztJQUNsQixZQUFZLEVBQUUsS0FBSztJQUNuQixhQUFhLEVBQUUsSUFBSTtJQUVuQixJQUFJO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsSUFBSSxDQUFDLFdBQVcsTUFBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxZQUFZO1FBQVosaUJBaUNDO1FBaENFLENBQUMsQ0FBQyxHQUFHLENBQUMsb0RBQWtELElBQUksQ0FBQyxZQUFjLENBQUMsQ0FBQztRQUU3RSxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQUksSUFBSyxPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsNkJBQTJCLElBQU0sQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUYsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xE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QUMsQ0FBQztpQkFDN0M7cUJBQU07b0JBQ0osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzNCLG9GQUFvRjtZQUNwRixZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0osWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSixDQUFDO0lBR0QsdUJBQXVCLFlBQUMsR0FBRztRQUN4QixPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksc0JBQXNCLENBQUM7SUFDNUUsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCBjb25zdCB2aWRlbyA9IHtcbiAgIGlzQXZhaWxhYmxlOiBmYWxzZSxcbiAgIGxvYWRpbmdWaWRlbzogZmFsc2UsXG4gICByZXdhcmRlZFZpZGVvOiBudWxsLFxuXG4gICBpbml0KCkge1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSB0aGlzLmlzQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNBdmFpbGFibGUgPSBfRy51dGlsc0ZCLmlzU3VwcG9ydGVkQVBJKFwiZ2V0UmV3YXJkZWRWaWRlb0FzeW5jXCIpO1xuICAgICAgXy5sb2coYFZJREVPLmlzQXZhaWxhYmxlID0gJHt0aGlzLmlzQXZhaWxhYmxlfSBgKTtcblxuICAgICAgdGhpcy5wcmVsb2FkVmlkZW8oKTtcbiAgIH0sXG5cblxuICAgcHJlbG9hZFZpZGVvKCkge1xuICAgICAgXy5sb2coYHByZWxvYWRWaWRlbyBjYWxsZWQuLi4uLi4uLiAgdGhpcy5sb2FkaW5nVmlkZW89JHt0aGlzLmxvYWRpbmdWaWRlb31gKTtcblxuICAgICAgY29uc3QgZmFpbEZ1bmMgPSAoY29kZSkgPT4gXy5sb2coYHByZWxvYWRWaWRlbyAwMDAgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuIGZhaWxGdW5jKCdPRkZMSU5FJyk7XG4gICAgICBpZiAoIV9HLnV0aWxzRkIuaXNTdXBwb3J0ZWRBUEkoXCJnZXRSZXdhcmRlZFZpZGVvQXN5bmNcIikpIHJldHVybiBmYWlsRnVuYygnTk9UX1NVUFBPUlRFRCcpO1xuICAgICAgaWYgKHRoaXMubG9hZGluZ1ZpZGVvKSByZXR1cm4gZmFpbEZ1bmMoJ0xPQURJTkcnKTtcbiAgICAgIF8ubG9nKGBwcmVsb2FkVmlkZW8gMTExMSBgKTtcblxuICAgICAgY29uc3QgZmFpbEZ1bmMxID0gKGVycikgPT4ge1xuICAgICAgICAgXy5sb2coYHByZWxvYWRWaWRlbyA+PiBmYWlsRnVuYzEgY2FsbGVkIGVyciA9IGAsIGVycik7XG4gICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW8gPSBudWxsO1xuICAgICAgICAgdGhpcy5sb2FkaW5nVmlkZW8gPSBmYWxzZTtcbiAgICAgICAgIF8uc2V0VGltZW91dCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVyciB8fCBlcnIuY29kZSA9PSAnT0ZGTElORScgfHwgZXJyLmNvZGUgPT0gJ0xPQURJTkcnIHx8IGVyci5jb2RlID09ICdOT1RfU1VQUE9SVEVEJyB8fCBlcnIuY29kZSA9PSAnUkFURV9MSU1JVEVEJykgcmV0dXJuO1xuICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJlbG9hZFZpZGVvKCksIDUwMDApO1xuICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ1ZpZGVvID0gdHJ1ZTtcbiAgICAgIEZCSW5zdGFudC5nZXRSZXdhcmRlZFZpZGVvQXN5bmMoX0cuY29uZmlnR2FtZS52aWRlb1Jld2FyZElkKS50aGVuKFxuICAgICAgICAgcmV3YXJkZWRWaWRlbyA9PiB7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvLmxvYWRBc3luYygpLnRoZW4oXG4gICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBfLmxvZyhcInByZWxvYWRWaWRlbyA+PiBTVUNDRVNTXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvID0gcmV3YXJkZWRWaWRlbztcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ1ZpZGVvID0gZmFsc2U7XG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgZmFpbEZ1bmMxXG4gICAgICAgICAgICApLmNhdGNoKGZhaWxGdW5jMSk7XG4gICAgICAgICB9LFxuICAgICAgICAgZmFpbEZ1bmMxXG4gICAgICApLmNhdGNoKGZhaWxGdW5jMSk7XG4gICB9LFxuXG5cbiAgIHNob3dWaWRlbyhvcmdTdWNjZXNzQ2FsbEJhY2ssIG9yZ0ZhaWxDYWxsQmFjaz8pIHtcbiAgICAgIF8ubG9nKGBWSURFTy5zaG93VmlkZW8oKSB0aGlzLmxvYWRpbmdWaWRlbz0ke3RoaXMubG9hZGluZ1ZpZGVvfSAvLyB2aWRlb09iamVjdCA9IGAsIHRoaXMucmV3YXJkZWRWaWRlbyk7XG4gICAgICBjb25zdCBzdWNjZXNzQ2FsbEJhY2sgPSAoKSA9PiBvcmdTdWNjZXNzQ2FsbEJhY2sgJiYgb3JnU3VjY2Vzc0NhbGxCYWNrKCk7XG4gICAgICBjb25zdCBmYWlsQ2FsbEJhY2sgPSAoZXJyPykgPT4gb3JnRmFpbENhbGxCYWNrICYmIG9yZ0ZhaWxDYWxsQmFjayhlcnIpO1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSByZXR1cm4gXy5yYW5kb20oKSA+IDAuNzUgPyBmYWlsQ2FsbEJhY2soKSA6IHN1Y2Nlc3NDYWxsQmFjaygpO1xuXG4gICAgICBpZiAodGhpcy5yZXdhcmRlZFZpZGVvKSB7XG4gICAgICAgICBfLmxvZyhgZXZfdmlkZW9fY2xpY2tfc2hvd2ApO1xuICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvLnNob3dBc3luYygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgXy5sb2coYFZJREVPLnNob3dWaWRlbyBzdWNjZXNzYCk7XG4gICAgICAgICAgICBfLmxvZyhcImV2X3dhdGNoX3ZpZGVvX3N1Y2Nlc3NcIiwgMSwge30pO1xuICAgICAgICAgICAgc3VjY2Vzc0NhbGxCYWNrKCk7XG4gICAgICAgICAgICB0aGlzLnByZWxvYWRWaWRlbygpO1xuICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVklERU8uc2hvd1ZpZGVvIGVycm9yIGAsIGVycik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VyclJld2FyZE5vdENvbXBsZXRlZChlcnIpKSB7XG4gICAgICAgICAgICAgICBfLmxvZyhgZXZfdmlkZW9fZXJyX3Jld2FyZF9ub3RfY29tcGxldGVkYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgXy5sb2coYGV2X3ZpZGVvX2Vycl9vdGhlcmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkVmlkZW8oKTtcbiAgICAgICAgICAgIGZhaWxDYWxsQmFjayhlcnIpO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubG9hZGluZ1ZpZGVvKSB7XG4gICAgICAgICAvLyBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93VmlkZW8oc3VjY2Vzc0NhbGxCYWNrLCBmYWlsQ2FsbEJhY2ssIHZpZGVvUG9zKSwgMjAwKTtcbiAgICAgICAgIGZhaWxDYWxsQmFjayh7IGNvZGU6IFwiTE9BRElOR1wiIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGZhaWxDYWxsQmFjayh7IGNvZGU6IFwiVklERU9fSVNfTlVMTFwiIH0pO1xuICAgICAgfVxuICAgfSxcblxuXG4gICBpc0VyclJld2FyZE5vdENvbXBsZXRlZChlcnIpIHtcbiAgICAgIHJldHVybiBlcnIuY29kZSA9PSAnVVNFUl9JTlBVVCcgJiYgZXJyLm1lc3NhZ2UgPT0gJ1Jld2FyZCBub3QgY29tcGxldGVkJztcbiAgIH0sXG5cbn0iXX0=