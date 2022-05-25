"use strict";
cc._RF.push(module, '4b431lJxCxH8r1n9TH3yBVp', 'resources_manager');
// script/system/resources_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = void 0;
var _G = require("./all_modules");
var _ = _G._, $ = _G.$;
exports.resources = {
    frameSprites: {},
    isAllFramesLoaded: false,
    frameLoadCallbackArr: [],
    init: function () {
        var _this = this;
        this.frameSprites['tutorial'] = { tut: cc.find('Canvas/sample_nodes/full_picture/frame').getComponent(cc.Sprite).spriteFrame };
        _G.levelManager.categoryNameArr.map(function (catName) { return _this.frameSprites[catName] = {}; });
        // _.setTimeout(() => this.loadAllFrames(), 100);
        _.setTimeout(function () { return _this.loadImageMessageHome(); }, 2000);
    },
    loadImageMessageHome: function () {
        cc.resources.load('social/img_message_home', cc.Texture2D, function (err, res) {
            if (err)
                return _.log('loadImageMessageHome err', err);
            var targetNode = cc.find('Canvas/message_home/picture/img_message_home');
            targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
    },
    loadSingleFrame: function (catName, frameName) {
        var _this = this;
        // _.setTimeout(() => {
        cc.resources.load("frames/" + catName + "/" + frameName, cc.SpriteFrame, function (err, res) {
            if (!err) {
                _this.frameSprites[catName][frameName] = res;
                _this.frameLoadCallbackArr.map(function (f) { return f(catName, frameName); });
            }
            else
                _.log(err);
        });
        // }, 1000);
    },
    // loadAllFrames() {
    //    let categoryLoaded = 0;
    //    _G.levelManager.categoryNameArr.map(catName => {
    //       cc.resources.loadDir(`frames/${catName}`, cc.SpriteFrame, (err, resArr) => {
    //          if (!err) resArr.map(res => {
    //             this.frameSprites[catName][res.name] = res;
    //             this.frameLoadCallbackArr.map(f => f(catName, res.name));
    //          });
    //          categoryLoaded++;
    //          if (categoryLoaded == _G.levelManager.categoryNameArr.length) {
    //             this.isAllFramesLoaded = true;
    //             _G.coreUI.hideLayout('layout_loading');
    //          }
    //       });
    //    });
    // },
    addFrameLoadCallback: function (f) {
        this.frameLoadCallbackArr.push(f);
    },
};

cc._RF.pop();