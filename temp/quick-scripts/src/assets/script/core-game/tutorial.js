"use strict";
cc._RF.push(module, '9fa024zMbVB+Lq+UeHKKCS8', 'tutorial');
// script/core-game/tutorial.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorial = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.tutorial = {
    frameAvatarInfo: { x: 100, y: 270, width: 585, height: 370, angle: 0 },
    node: null,
    cellNode1: null,
    cellNode2: null,
    isShowingTut: false,
    hiddenNodeArr1: null,
    hiddenNodeArr2: null,
    currentStep: 0,
    init: function () {
        var _this = this;
        this.node = cc.find('Canvas/layout_tutorial');
        this.hiddenNodeArr1 = [
            // cc.find('btn_back', _G.coreUI.headerContainer),
            cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer),
        ];
        this.hiddenNodeArr2 = [
            cc.find('time_level_bar', _G.coreUI.playGridContainer),
        ];
        _G.user.addInitCallback(function (data) {
            // _.log(`tutorial.init() ==>>> data.isNewUser = ${data.isNewUser} //  _G.user.entryPointData.puzzle_id = ${_G.user.entryPointData.puzzle_id} `);
            if (!data.isNewUser || _G.user.isPuzzleSpecified)
                return _G.coreUI.hideLayout('layout_tutorial');
            if (!window['FBInstant'])
                _this.start();
            else
                _.waitToRun(function () { return _this.start(); }, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 4, function () { return _this.start(); });
        });
    },
    isCurrentPuzzleTutorial: function () {
        return _G.gameMechanic.currentCategoryName == 'tutorial';
    },
    isClickableCell: function (cellNode) {
        if (!this.isShowingTut)
            return true;
        return cellNode == this.cellNode1 || cellNode == this.cellNode2;
    },
    checkOnSwapCells: function () {
        var _this = this;
        if (this.isShowingTut && this.currentStep == 1)
            _.setTimeout(function () { return _this.showStep2(); }, 1000);
    },
    //============= on tut start
    start: function () {
        var _this = this;
        this.isShowingTut = true;
        this.currentStep = 1;
        // render special puzzle
        _G.gameMechanic.previewGame('tutorial', 'tutorial', 3, 3);
        _G.gameMechanic.startGame();
        // set up UI
        __spreadArrays(this.hiddenNodeArr1, this.hiddenNodeArr2).map(function (node) { return node.active = false; });
        cc.find('texts/label_tut_step_1', this.node).active = true;
        // fake the level time bar
        var fakeTimeBarContainer = cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer);
        var fakeTimeBar = _.copyNode(cc.find('time_level_bar', _G.coreUI.playGridContainer), fakeTimeBarContainer);
        fakeTimeBar.children.map(function (childNode) { return childNode.y = 100; });
        fakeTimeBar.y = -120;
        fakeTimeBar.active = true;
        // -------------------------------------------------
        var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
        var fakeColliderNode = _.copyNode(colliderNode, colliderNode.parent);
        colliderNode.scale = fakeColliderNode.scale = containerNode.scale = 0.0001;
        // containerNode.opacity = 0;
        _.setGlobalPosToNode(fakeColliderNode, containerNode);
        // _.log(`fakeColliderNode.height = ${fakeColliderNode.height}`);
        fakeColliderNode.height *= 2;
        _.setTimeout(function () { return fakeColliderNode.removeFromParent(true); }, 100);
        // start hand animation
        cc.find('black_layer', this.node).active = true;
        _G.coreUI.showLayout(this.node);
        var handNode = cc.find('tut_hand', this.node);
        _.waitToRun(function () {
            _.setGlobalPosToNode(handNode, _this.cellNode1);
            var gPosDiff = _.getGlobalPosDiff(_this.cellNode1, _this.cellNode2);
            cc.tween(handNode).repeatForever(cc.tween()
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff })
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff.mul(-1) })).start();
        }, 'cellNode1', this);
    },
    showStep2: function () {
        var _this = this;
        this.currentStep = 2;
        // remove block inpout for fake btnHint
        cc.find('block_inputs/block_input_2', this.node).active = false;
        cc.find('texts/label_tut_step_1', this.node).active = false;
        var labelNode2 = cc.find('texts/label_tut_step_2', this.node);
        labelNode2.active = true;
        var fakeBtnHint = cc.find('fake_buttons/btn_hint', this.node);
        var handNode = cc.find('tut_hand', this.node);
        handNode.stopAllActions();
        handNode.scale = 1;
        handNode.angle = -140;
        _.setGlobalPosToNode(handNode, fakeBtnHint);
        handNode.x -= 30;
        handNode.y += 30;
        cc.tween(handNode).repeatForever(cc.tween()
            .by(0.4, { scale: -0.3 })
            .by(0.4, { scale: 0.3 })
            .delay(1)).start();
        fakeBtnHint.active = true;
        _G.utilsUI.makeBubbleButton(fakeBtnHint, function () {
            cc.find('disabled', fakeBtnHint).active = true;
            _G.gameMechanic.onHint();
            handNode.active = false;
            _.setTimeout(function () {
                fakeBtnHint.active = false;
                _this.showStep3();
            }, 1000);
        });
    },
    //============= on tut done
    showStep3: function () {
        var _this = this;
        var delayTime = 1.3;
        _G.coreUI.showNagScreen(delayTime);
        cc.find('tut_hand', this.node).active = false;
        // show black screen with message
        _.setTimeout(function () {
            _this.hiddenNodeArr1.map(function (node) { return node.active = true; });
            var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
            colliderNode.scale = containerNode.scale = 1;
            containerNode.opacity = 255;
            _.setTimeout(function () {
                cc.find('black_layer', _this.node).active = false;
                cc.find('texts', _this.node).active = false;
            }, 300);
            cc.find('fake_buttons/play_time', _this.node).active = true;
            cc.find('bg', _this.node).active = true;
            cc.find('dialog', _this.node).active = true;
            _G.coreUI.showLayoutAnim(_this.node, 210);
        }, delayTime * 600);
    },
    onBtnContinue: function () {
        cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer).removeAllChildren();
        _G.coreUI.hideLayoutAnim('layout_tutorial');
        cc.find('time_level_bar', _G.coreUI.playGridContainer).active = true;
        this.isShowingTut = false;
        _G.gameMechanic.onResume();
    },
};

cc._RF.pop();