"use strict";
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