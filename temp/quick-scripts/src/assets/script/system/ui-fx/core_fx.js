"use strict";
cc._RF.push(module, '58583JUlBRDj43pXro2UfkX', 'core_fx');
// script/system/ui-fx/core_fx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreFX = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
exports.coreFX = {
    fxContainer: null,
    init: function () {
        this.startClockFx();
        this.fxContainer = cc.find('Canvas/fx_container');
        cc.tween(cc.find('Canvas/layout_home/dialog/game_logo')).repeatForever(cc.tween().by(0.7, { scale: 0.1 }).by(0.7, { scale: -0.1 })).start();
    },
    startClockFx: function () {
        var clockNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/clock');
        clockNode.angle = 10;
        cc.tween(clockNode).repeatForever(cc.tween().to(0.5, { angle: -20 }).to(0.5, { angle: 20 })).start();
    },
    showVideoError: function (startPosY) {
        var sampleNode = cc.find('Canvas/sample_nodes/tooltip_video_err');
        var fxNode = _.copyNode(sampleNode, this.fxContainer);
        _G.localize.translateSingleLabel(cc.find('label_fx_video_error', fxNode));
        fxNode.y = startPosY;
        fxNode.active = true;
        cc.tween(fxNode).by(1.5, { opacity: -255, y: 200 }).call(function () { return fxNode.removeFromParent(true); }).start();
    },
    // =============================================
    // show grid
    showGrid: function (callback) {
        var _this = this;
        var interval = 0.02;
        var childNodeArr = _G.mapVisual.gridNode.children;
        childNodeArr.map(function (cellNode, index) {
            _this.showCell(cellNode, interval * index);
        });
        var timeWait = childNodeArr.length * interval * 1000 + 250;
        _.setTimeout(function () { return callback && callback(); }, timeWait);
    },
    showCell: function (cellNode, delay) {
        if (delay === void 0) { delay = 0; }
        var fxTime1 = 0.15;
        var fxTime2 = 0.08;
        cellNode.stopAllActions();
        cellNode.scale = 0;
        cc.tween(cellNode).delay(delay)
            .to(fxTime1, { scale: 1.08 })
            .to(fxTime2, { scale: 1 })
            .start();
    },
    // =============================================
    // hide grid
    hideGrid: function (callback) {
        var _this = this;
        var interval = 0.02;
        var childNodeArr = _G.mapVisual.gridNode.children;
        childNodeArr.map(function (cellNode, index) {
            _this.hideCell(cellNode, interval * index);
        });
        var timeWait = childNodeArr.length * interval * 1000 + 400;
        // _.log(`hideGrid >> timeWait = ${timeWait} // childNodeArr.length=${childNodeArr.length} `);
        _.setTimeout(function () { return callback && callback(); }, timeWait);
    },
    hideCell: function (cellNode, delay) {
        if (delay === void 0) { delay = 0; }
        var fxTime1 = 0.2;
        var fxTime2 = 0.15;
        cellNode.stopAllActions();
        cc.tween(cellNode).delay(delay)
            .to(fxTime1, { scale: 1.08 })
            .to(fxTime2, { scale: 0 })
            .start();
    },
    onCorrectCellPos: function (cellNode) {
        var fxNode = cc.find('correct_tile_fx', cellNode);
        fxNode.width = cellNode.width;
        fxNode.height = cellNode.height;
        fxNode.opacity = 255;
        cc.tween(fxNode).to(0.6, { opacity: 0 }).start();
    },
    // level icon shine a little to attract attention
    highlightIconLevel: function (middleCallback) {
        var expProgressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar');
        var levelNum = cc.find('level/level_num', expProgressBar);
        var levelBg = cc.find('level/bg', expProgressBar);
        var levelLight = cc.find('level/light_effect 1', expProgressBar);
        var anim = cc.tween().by(0.4, { scale: 0.7 }).delay(0.7).by(0.4, { scale: -0.7 });
        anim.clone(levelNum).start();
        anim.clone(levelBg).start();
        cc.tween(levelLight).to(0.4, { opacity: 255 }).delay(0.7).to(0.4, { opacity: 0 }).start();
        _.setTimeout(function () { return middleCallback && middleCallback(); }, 400);
    },
    rotateForever: function (node, angleFactor) {
        if (angleFactor === void 0) { angleFactor = 1; }
        cc.tween(node).repeatForever(cc.tween().by(10, { angle: -360 * angleFactor })).start();
    },
    fxShowPopupHeader: function (popupNode) {
        var _this = this;
        var headerNode = cc.find('dialog/header', popupNode);
        var lightNode = cc.find('light_fx', headerNode);
        var starNodeArr = [cc.find('star1', headerNode), cc.find('star2', headerNode), cc.find('star3', headerNode)];
        starNodeArr.map(function (starNode, i) {
            starNode.orgScale = starNode.orgScale || starNode.scale;
            starNode.stopAllActions();
            starNode.scale = 0;
            starNode.angle = 0;
            _.setTimeout(function () {
                cc.tween(starNode).delay(i * 0.3).to(0.5, { scale: starNode.orgScale + 0.5, angle: -360 }).by(0.2, { scale: -0.5 }).start();
            }, 300);
        });
        lightNode.stopAllActions();
        lightNode.children[0].stopAllActions();
        lightNode.orgScale = lightNode.orgScale || lightNode.scale;
        lightNode.scale = 0;
        _.setTimeout(function () {
            _this.rotateForever(lightNode);
            _this.rotateForever(lightNode.children[0], -2);
            cc.tween(lightNode).delay(1).to(0.4, { scale: lightNode.orgScale }).start();
        }, 300);
    },
    // fx stars fly to star-count at top
    isPlayingFxStarsAdd: false,
    isPlayingFxExpAdd: false,
    fxAddCoins: function (baseNode, amount) {
        var _this = this;
        this.isPlayingFxStarsAdd = true;
        _.setTimeout(function () { return _this.isPlayingFxStarsAdd = false; }, 2000);
        _.setTimeout(function () { return _G.audio.playSound('star_collect'); }, 1000);
        var targetNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1');
        var sampleParticleNode = cc.find('Canvas/sample_nodes/coin');
        // coins fly
        _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);
        // increasing label
        var labelNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1/label_stars');
        var currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
        _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
    },
    fxAddExp: function (baseNode, amount) {
        _.setTimeout(function () { return _G.audio.playSound('exp_collect'); }, 1000);
        var targetNode = cc.find('Canvas/layout_win/dialog/exp_progress_bar/exp_target');
        var sampleParticleNode = cc.find('Canvas/sample_nodes/exp_icon');
        // coins fly
        _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);
        // increasing label
        var labelNode = cc.find('Canvas/layout_fixed_header/header/exp_icon/label_exp');
        var currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
        _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
    },
    // animation for winning
    playWinAnim: function () {
        var _this = this;
        var expFlyTime = 0.5;
        var expFlyDelay = 0.05;
        var allExpDelay = 1;
        var sampleExpNode = cc.find('Canvas/sample_nodes/exp_icon');
        var expTargetNode = cc.find('time_level_bar/exp_target', _G.coreUI.playGridContainer);
        var cellNodeArr = _G.mapVisual.gridNode.children;
        cellNodeArr.sort(function (A, B) {
            if (A.cellPos.x != B.cellPos.x)
                return (A.cellPos.x > B.cellPos.x ? 1 : -1);
            else
                return (A.cellPos.y < B.cellPos.y ? 1 : -1);
        });
        cellNodeArr.map(function (cellNode, index) {
            var expFxNode = _.copyNode(sampleExpNode, _this.fxContainer);
            _.setGlobalPosToNode(expFxNode, cellNode);
            cc.tween(expFxNode).to(0.3, { opacity: 255 }).delay(index * expFlyDelay + allExpDelay).call(function () {
                _G.utilsAnimFx.nodeFlyFromAtoB(expFxNode, expTargetNode, expFlyTime, function () {
                    _.setTimeout(function () { return expFxNode.removeFromParent(true); }, 300);
                });
            }).start();
        });
        _.setTimeout(function () {
            _G.audio.playSound('exp_collect');
        }, (allExpDelay + expFlyTime + 0.2) * 1000);
        _.setTimeout(function () {
            _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_win'));
            _G.coreUI.showLayoutAnim('layout_win');
            _G.audio.playSound('puzzlecompleted');
        }, 2400);
    },
    isPlayingClaimAnim: false,
    playWinClaimAnim: function () {
        var _this = this;
        if (this.isPlayingClaimAnim)
            return;
        this.isPlayingClaimAnim = true;
        var isLevelUp = _G.gameMechanic.isLevelUp;
        var totalWaitTime = isLevelUp ? 4.1 : 2.2;
        _G.coreUI.showNagScreen(totalWaitTime);
        // play aimation collect coins & exp
        _G.coreFX.fxAddCoins(cc.find('Canvas/layout_win/dialog/star_num_base/star2_big 1'), _G.configGame.winCoinReward[_G.gameMechanic.currentSizeMode]);
        _G.coreFX.fxAddExp(cc.find('Canvas/layout_win/dialog/exp_num_base/exp_icon'), _G.configGame.winExp);
        // anim progress bar get filled & label level transform
        _.setTimeout(function () { return _G.coreUI.updateLevelProgressBar(0.7); }, 1000);
        if (isLevelUp)
            _.setTimeout(function () { return _this.highlightIconLevel(function () { return _G.coreUI.updateLevelNumber(); }); }, 1700);
        // hide layout_win
        _.setTimeout(function () {
            _G.coreUI.hideLayoutAnim('layout_win', function () {
                _this.isPlayingClaimAnim = false;
                var isLevelUp = _G.gameMechanic.checkToShowLevelUp();
                if (!isLevelUp)
                    _G.gameMechanic.playNextRandomPuzzle();
            });
        }, totalWaitTime * 1000);
    },
};

cc._RF.pop();