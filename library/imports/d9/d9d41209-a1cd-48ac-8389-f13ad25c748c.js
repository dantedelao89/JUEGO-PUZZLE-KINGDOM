"use strict";
cc._RF.push(module, 'd9d41IJoc1IrIOJ8TrSXHSM', 'social');
// script/social/social.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.social = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
var share_1 = require("../social/share");
var message_1 = require("../social/message");
exports.social = {
    init: function () {
        // _G.login.addLoginDataField('subscribeInfo');
        // _G.login.addLoginDataField('shortcutInfo');
        // _G.login.addCallback(data => {
        //    this.subscribeInfo = data.hasOwnProperty('subscribeInfo') ? data.subscribeInfo : 5;
        //    this.shortcutInfo = data.hasOwnProperty('shortcutInfo') ? data.shortcutInfo : 5;
        // })
    },
    share: function (isFromV2Screen, shareCode) {
        if (isFromV2Screen === void 0) { isFromV2Screen = false; }
        if (shareCode === void 0) { shareCode = ''; }
        cc.find('Canvas/shares').getComponent(share_1.default).sharePostNormal(isFromV2Screen, shareCode);
        _G.analytic.logShare(_G.gameMechanic.currentCategoryName, _G.gameMechanic.currentFrameName);
    },
    sendMessage: function () {
        cc.find("Canvas/messages").getComponent(message_1.default).sendMessageScore();
    },
    sendMessageHome: function () {
        cc.find('Canvas/message_home').getComponent(message_1.default).sendMessageStillImage();
    },
    inviteHome: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessageHome();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessageHome();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
    },
    invite: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessage();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessage();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
    },
};

cc._RF.pop();