
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/core_fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2NvcmVfZngudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdQLFFBQUEsTUFBTSxHQUFHO0lBQ25CLFdBQVcsRUFBRSxJQUFlO0lBRTVCLElBQUk7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQ25FLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQzdELENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsWUFBWTtRQUNULElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEZBQTBGLENBQUMsQ0FBQztRQUN0SCxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FDOUIsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDM0QsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7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LENBQXFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxTQUFTO1lBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQTdCLENBQTZCLENBQUMsRUFBNUQsQ0FBNEQsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RyxrQkFBa0I7UUFDbEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNWLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDcEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsU0FBUztvQkFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cblxuZXhwb3J0IGNvbnN0IGNvcmVGWCA9IHtcbiAgIGZ4Q29udGFpbmVyOiBudWxsIGFzIGNjLk5vZGUsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLnN0YXJ0Q2xvY2tGeCgpO1xuICAgICAgdGhpcy5meENvbnRhaW5lciA9IGNjLmZpbmQoJ0NhbnZhcy9meF9jb250YWluZXInKTtcblxuICAgICAgY2MudHdlZW4oY2MuZmluZCgnQ2FudmFzL2xheW91dF9ob21lL2RpYWxvZy9nYW1lX2xvZ28nKSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgIGNjLnR3ZWVuKCkuYnkoMC43LCB7IHNjYWxlOiAwLjEgfSkuYnkoMC43LCB7IHNjYWxlOiAtMC4xIH0pXG4gICAgICApLnN0YXJ0KCk7XG4gICB9LFxuXG4gICBzdGFydENsb2NrRngoKSB7XG4gICAgICBjb25zdCBjbG9ja05vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvdGltZV9sZXZlbF9iYXIvcGxheV90aW1lL2Nsb2NrJyk7XG4gICAgICBjbG9ja05vZGUuYW5nbGUgPSAxMDtcbiAgICAgIGNjLnR3ZWVuKGNsb2NrTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgIGNjLnR3ZWVuKCkudG8oMC41LCB7IGFuZ2xlOiAtMjAgfSkudG8oMC41LCB7IGFuZ2xlOiAyMCB9KVxuICAgICAgKS5zdGFydCgpO1xuICAgfSxcblxuICAgc2hvd1ZpZGVvRXJyb3Ioc3RhcnRQb3NZKSB7XG4gICAgICBjb25zdCBzYW1wbGVOb2RlID0gY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy90b29sdGlwX3ZpZGVvX2VycicpO1xuICAgICAgY29uc3QgZnhOb2RlID0gXy5jb3B5Tm9kZShzYW1wbGVOb2RlLCB0aGlzLmZ4Q29udGFpbmVyKTtcbiAgICAgIF9HLmxvY2FsaXplLnRyYW5zbGF0ZVNpbmdsZUxhYmVsKGNjLmZpbmQoJ2xhYmVsX2Z4X3ZpZGVvX2Vycm9yJywgZnhOb2RlKSk7XG4gICAgICBmeE5vZGUueSA9IHN0YXJ0UG9zWTtcbiAgICAgIGZ4Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MudHdlZW4oZnhOb2RlKS5ieSgxLjUsIHsgb3BhY2l0eTogLTI1NSwgeTogMjAwIH0pLmNhbGwoKCkgPT4gZnhOb2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSkpLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gc2hvdyBncmlkXG5cbiAgIHNob3dHcmlkKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gMC4wMjtcbiAgICAgIGNvbnN0IGNoaWxkTm9kZUFyciA9IF9HLm1hcFZpc3VhbC5ncmlkTm9kZS5jaGlsZHJlbjtcbiAgICAgIGNoaWxkTm9kZUFyci5tYXAoKGNlbGxOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgdGhpcy5zaG93Q2VsbChjZWxsTm9kZSwgaW50ZXJ2YWwgKiBpbmRleCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGltZVdhaXQgPSBjaGlsZE5vZGVBcnIubGVuZ3RoICogaW50ZXJ2YWwgKiAxMDAwICsgMjUwO1xuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCksIHRpbWVXYWl0KTtcbiAgIH0sXG5cbiAgIHNob3dDZWxsKGNlbGxOb2RlOiBjYy5Ob2RlLCBkZWxheSA9IDApIHtcbiAgICAgIGNvbnN0IGZ4VGltZTEgPSAwLjE1O1xuICAgICAgY29uc3QgZnhUaW1lMiA9IDAuMDg7XG4gICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgY2VsbE5vZGUuc2NhbGUgPSAwO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLmRlbGF5KGRlbGF5KVxuICAgICAgICAgLnRvKGZ4VGltZTEsIHsgc2NhbGU6IDEuMDggfSlcbiAgICAgICAgIC50byhmeFRpbWUyLCB7IHNjYWxlOiAxIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIGhpZGUgZ3JpZFxuXG4gICBoaWRlR3JpZChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IDAuMDI7XG4gICAgICBjb25zdCBjaGlsZE5vZGVBcnIgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW47XG4gICAgICBjaGlsZE5vZGVBcnIubWFwKChjZWxsTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgIHRoaXMuaGlkZUNlbGwoY2VsbE5vZGUsIGludGVydmFsICogaW5kZXgpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0aW1lV2FpdCA9IGNoaWxkTm9kZUFyci5sZW5ndGggKiBpbnRlcnZhbCAqIDEwMDAgKyA0MDA7XG4gICAgICAvLyBfLmxvZyhgaGlkZUdyaWQgPj4gdGltZVdhaXQgPSAke3RpbWVXYWl0fSAvLyBjaGlsZE5vZGVBcnIubGVuZ3RoPSR7Y2hpbGROb2RlQXJyLmxlbmd0aH0gYCk7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKSwgdGltZVdhaXQpO1xuICAgfSxcblxuXG4gICBoaWRlQ2VsbChjZWxsTm9kZTogY2MuTm9kZSwgZGVsYXkgPSAwKSB7XG4gICAgICBjb25zdCBmeFRpbWUxID0gMC4yO1xuICAgICAgY29uc3QgZnhUaW1lMiA9IDAuMTU7XG4gICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLmRlbGF5KGRlbGF5KVxuICAgICAgICAgLnRvKGZ4VGltZTEsIHsgc2NhbGU6IDEuMDggfSlcbiAgICAgICAgIC50byhmeFRpbWUyLCB7IHNjYWxlOiAwIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgb25Db3JyZWN0Q2VsbFBvcyhjZWxsTm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgZnhOb2RlID0gY2MuZmluZCgnY29ycmVjdF90aWxlX2Z4JywgY2VsbE5vZGUpO1xuICAgICAgZnhOb2RlLndpZHRoID0gY2VsbE5vZGUud2lkdGg7XG4gICAgICBmeE5vZGUuaGVpZ2h0ID0gY2VsbE5vZGUuaGVpZ2h0O1xuICAgICAgZnhOb2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICBjYy50d2VlbihmeE5vZGUpLnRvKDAuNiwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIC8vIGxldmVsIGljb24gc2hpbmUgYSBsaXR0bGUgdG8gYXR0cmFjdCBhdHRlbnRpb25cbiAgIGhpZ2hsaWdodEljb25MZXZlbChtaWRkbGVDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBleHBQcm9ncmVzc0JhciA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9leHBfcHJvZ3Jlc3NfYmFyJyk7XG4gICAgICBjb25zdCBsZXZlbE51bSA9IGNjLmZpbmQoJ2xldmVsL2xldmVsX251bScsIGV4cFByb2dyZXNzQmFyKTtcbiAgICAgIGNvbnN0IGxldmVsQmcgPSBjYy5maW5kKCdsZXZlbC9iZycsIGV4cFByb2dyZXNzQmFyKTtcbiAgICAgIGNvbnN0IGxldmVsTGlnaHQgPSBjYy5maW5kKCdsZXZlbC9saWdodF9lZmZlY3QgMScsIGV4cFByb2dyZXNzQmFyKTtcblxuICAgICAgY29uc3QgYW5pbSA9IGNjLnR3ZWVuKCkuYnkoMC40LCB7IHNjYWxlOiAwLjcgfSkuZGVsYXkoMC43KS5ieSgwLjQsIHsgc2NhbGU6IC0wLjcgfSk7XG4gICAgICBhbmltLmNsb25lKGxldmVsTnVtKS5zdGFydCgpO1xuICAgICAgYW5pbS5jbG9uZShsZXZlbEJnKS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4obGV2ZWxMaWdodCkudG8oMC40LCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjcpLnRvKDAuNCwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XG5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBtaWRkbGVDYWxsYmFjayAmJiBtaWRkbGVDYWxsYmFjaygpLCA0MDApO1xuICAgfSxcblxuXG4gICByb3RhdGVGb3JldmVyKG5vZGU6IGNjLk5vZGUsIGFuZ2xlRmFjdG9yID0gMSkge1xuICAgICAgY2MudHdlZW4obm9kZSkucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KDEwLCB7IGFuZ2xlOiAtMzYwICogYW5nbGVGYWN0b3IgfSkpLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIGZ4U2hvd1BvcHVwSGVhZGVyKHBvcHVwTm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgaGVhZGVyTm9kZSA9IGNjLmZpbmQoJ2RpYWxvZy9oZWFkZXInLCBwb3B1cE5vZGUpO1xuICAgICAgY29uc3QgbGlnaHROb2RlID0gY2MuZmluZCgnbGlnaHRfZngnLCBoZWFkZXJOb2RlKTtcbiAgICAgIGNvbnN0IHN0YXJOb2RlQXJyID0gW2NjLmZpbmQoJ3N0YXIxJywgaGVhZGVyTm9kZSksIGNjLmZpbmQoJ3N0YXIyJywgaGVhZGVyTm9kZSksIGNjLmZpbmQoJ3N0YXIzJywgaGVhZGVyTm9kZSldO1xuXG4gICAgICBzdGFyTm9kZUFyci5tYXAoKHN0YXJOb2RlLCBpKSA9PiB7XG4gICAgICAgICBzdGFyTm9kZS5vcmdTY2FsZSA9IHN0YXJOb2RlLm9yZ1NjYWxlIHx8IHN0YXJOb2RlLnNjYWxlO1xuICAgICAgICAgc3Rhck5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgIHN0YXJOb2RlLnNjYWxlID0gMDtcbiAgICAgICAgIHN0YXJOb2RlLmFuZ2xlID0gMDtcbiAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2VlbihzdGFyTm9kZSkuZGVsYXkoaSAqIDAuMykudG8oMC41LCB7IHNjYWxlOiBzdGFyTm9kZS5vcmdTY2FsZSArIDAuNSwgYW5nbGU6IC0zNjAgfSkuYnkoMC4yLCB7IHNjYWxlOiAtMC41IH0pLnN0YXJ0KCk7XG4gICAgICAgICB9LCAzMDApO1xuICAgICAgfSk7XG5cbiAgICAgIGxpZ2h0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgbGlnaHROb2RlLmNoaWxkcmVuWzBdLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICBsaWdodE5vZGUub3JnU2NhbGUgPSBsaWdodE5vZGUub3JnU2NhbGUgfHwgbGlnaHROb2RlLnNjYWxlO1xuICAgICAgbGlnaHROb2RlLnNjYWxlID0gMDtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLnJvdGF0ZUZvcmV2ZXIobGlnaHROb2RlKTtcbiAgICAgICAgIHRoaXMucm90YXRlRm9yZXZlcihsaWdodE5vZGUuY2hpbGRyZW5bMF0sIC0yKTtcbiAgICAgICAgIGNjLnR3ZWVuKGxpZ2h0Tm9kZSkuZGVsYXkoMSkudG8oMC40LCB7IHNjYWxlOiBsaWdodE5vZGUub3JnU2NhbGUgfSkuc3RhcnQoKTtcbiAgICAgIH0sIDMwMCk7XG4gICB9LFxuXG5cbiAgIC8vIGZ4IHN0YXJzIGZseSB0byBzdGFyLWNvdW50IGF0IHRvcFxuICAgaXNQbGF5aW5nRnhTdGFyc0FkZDogZmFsc2UsXG4gICBpc1BsYXlpbmdGeEV4cEFkZDogZmFsc2UsXG4gICBmeEFkZENvaW5zKGJhc2VOb2RlOiBjYy5Ob2RlLCBhbW91bnQpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nRnhTdGFyc0FkZCA9IHRydWU7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc1BsYXlpbmdGeFN0YXJzQWRkID0gZmFsc2UsIDIwMDApO1xuXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuYXVkaW8ucGxheVNvdW5kKCdzdGFyX2NvbGxlY3QnKSwgMTAwMCk7XG4gICAgICBjb25zdCB0YXJnZXROb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9maXhlZF9oZWFkZXIvaGVhZGVyL3N0YXIyX2JpZyAxJyk7XG4gICAgICBjb25zdCBzYW1wbGVQYXJ0aWNsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL2NvaW4nKTtcblxuICAgICAgLy8gY29pbnMgZmx5XG4gICAgICBfRy51dGlsc0FuaW1GeC5wYXJ0aWNsZXNGbHlGcm9tQTJCKHNhbXBsZVBhcnRpY2xlTm9kZSwgYmFzZU5vZGUsIHRhcmdldE5vZGUsIG51bGwsIHRoaXMuZnhDb250YWluZXIpO1xuXG4gICAgICAvLyBpbmNyZWFzaW5nIGxhYmVsXG4gICAgICBjb25zdCBsYWJlbE5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X2ZpeGVkX2hlYWRlci9oZWFkZXIvc3RhcjJfYmlnIDEvbGFiZWxfc3RhcnMnKTtcblxuICAgICAgY29uc3QgY3VycmVudE51bSA9IHBhcnNlSW50KGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZy5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICAgIF9HLnV0aWxzQW5pbUZ4LnBsYXlJbmNyZWFzaW5nTnVtYmVyTGFiZWwobGFiZWxOb2RlLCBjdXJyZW50TnVtLCBhbW91bnQsIDIwLCAxLjIsIDEpO1xuICAgfSxcblxuXG4gICBmeEFkZEV4cChiYXNlTm9kZTogY2MuTm9kZSwgYW1vdW50KSB7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuYXVkaW8ucGxheVNvdW5kKCdleHBfY29sbGVjdCcpLCAxMDAwKTtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvZXhwX3Byb2dyZXNzX2Jhci9leHBfdGFyZ2V0Jyk7XG4gICAgICBjb25zdCBzYW1wbGVQYXJ0aWNsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL2V4cF9pY29uJyk7XG5cbiAgICAgIC8vIGNvaW5zIGZseVxuICAgICAgX0cudXRpbHNBbmltRngucGFydGljbGVzRmx5RnJvbUEyQihzYW1wbGVQYXJ0aWNsZU5vZGUsIGJhc2VOb2RlLCB0YXJnZXROb2RlLCBudWxsLCB0aGlzLmZ4Q29udGFpbmVyKTtcblxuICAgICAgLy8gaW5jcmVhc2luZyBsYWJlbFxuICAgICAgY29uc3QgbGFiZWxOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9maXhlZF9oZWFkZXIvaGVhZGVyL2V4cF9pY29uL2xhYmVsX2V4cCcpO1xuXG4gICAgICBjb25zdCBjdXJyZW50TnVtID0gcGFyc2VJbnQobGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgX0cudXRpbHNBbmltRngucGxheUluY3JlYXNpbmdOdW1iZXJMYWJlbChsYWJlbE5vZGUsIGN1cnJlbnROdW0sIGFtb3VudCwgMjAsIDEuMiwgMSk7XG4gICB9LFxuXG5cbiAgIC8vIGFuaW1hdGlvbiBmb3Igd2lubmluZ1xuICAgcGxheVdpbkFuaW0oKSB7XG4gICAgICBjb25zdCBleHBGbHlUaW1lID0gMC41O1xuICAgICAgY29uc3QgZXhwRmx5RGVsYXkgPSAwLjA1O1xuICAgICAgY29uc3QgYWxsRXhwRGVsYXkgPSAxO1xuICAgICAgY29uc3Qgc2FtcGxlRXhwTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9zYW1wbGVfbm9kZXMvZXhwX2ljb24nKTtcbiAgICAgIGNvbnN0IGV4cFRhcmdldE5vZGUgPSBjYy5maW5kKCd0aW1lX2xldmVsX2Jhci9leHBfdGFyZ2V0JywgX0cuY29yZVVJLnBsYXlHcmlkQ29udGFpbmVyKTtcblxuICAgICAgY29uc3QgY2VsbE5vZGVBcnIgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW47XG4gICAgICBjZWxsTm9kZUFyci5zb3J0KChBLCBCKSA9PiB7XG4gICAgICAgICBpZiAoQS5jZWxsUG9zLnggIT0gQi5jZWxsUG9zLngpIHJldHVybiAoQS5jZWxsUG9zLnggPiBCLmNlbGxQb3MueCA/IDEgOiAtMSlcbiAgICAgICAgIGVsc2UgcmV0dXJuIChBLmNlbGxQb3MueSA8IEIuY2VsbFBvcy55ID8gMSA6IC0xKVxuICAgICAgfSk7XG5cbiAgICAgIGNlbGxOb2RlQXJyLm1hcCgoY2VsbE5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICBjb25zdCBleHBGeE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUV4cE5vZGUsIHRoaXMuZnhDb250YWluZXIpO1xuICAgICAgICAgXy5zZXRHbG9iYWxQb3NUb05vZGUoZXhwRnhOb2RlLCBjZWxsTm9kZSk7XG4gICAgICAgICBjYy50d2VlbihleHBGeE5vZGUpLnRvKDAuMywgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoaW5kZXggKiBleHBGbHlEZWxheSArIGFsbEV4cERlbGF5KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIF9HLnV0aWxzQW5pbUZ4Lm5vZGVGbHlGcm9tQXRvQihleHBGeE5vZGUsIGV4cFRhcmdldE5vZGUsIGV4cEZseVRpbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBleHBGeE5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKSwgMzAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgX0cuYXVkaW8ucGxheVNvdW5kKCdleHBfY29sbGVjdCcpO1xuICAgICAgfSwgKGFsbEV4cERlbGF5ICsgZXhwRmx5VGltZSArIDAuMikgKiAxMDAwKTtcblxuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVGWC5meFNob3dQb3B1cEhlYWRlcihjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbicpKTtcbiAgICAgICAgIF9HLmNvcmVVSS5zaG93TGF5b3V0QW5pbSgnbGF5b3V0X3dpbicpO1xuICAgICAgICAgX0cuYXVkaW8ucGxheVNvdW5kKCdwdXp6bGVjb21wbGV0ZWQnKTtcbiAgICAgIH0sIDI0MDApO1xuICAgfSxcblxuXG4gICBpc1BsYXlpbmdDbGFpbUFuaW06IGZhbHNlLFxuICAgcGxheVdpbkNsYWltQW5pbSgpIHtcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZ0NsYWltQW5pbSkgcmV0dXJuO1xuICAgICAgdGhpcy5pc1BsYXlpbmdDbGFpbUFuaW0gPSB0cnVlO1xuXG4gICAgICBjb25zdCBpc0xldmVsVXAgPSBfRy5nYW1lTWVjaGFuaWMuaXNMZXZlbFVwO1xuICAgICAgY29uc3QgdG90YWxXYWl0VGltZSA9IGlzTGV2ZWxVcCA/IDQuMSA6IDIuMjtcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKHRvdGFsV2FpdFRpbWUpO1xuXG4gICAgICAvLyBwbGF5IGFpbWF0aW9uIGNvbGxlY3QgY29pbnMgJiBleHBcbiAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL3N0YXJfbnVtX2Jhc2Uvc3RhcjJfYmlnIDEnKSxcbiAgICAgICAgIF9HLmNvbmZpZ0dhbWUud2luQ29pblJld2FyZFtfRy5nYW1lTWVjaGFuaWMuY3VycmVudFNpemVNb2RlXVxuICAgICAgKTtcblxuICAgICAgX0cuY29yZUZYLmZ4QWRkRXhwKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2V4cF9udW1fYmFzZS9leHBfaWNvbicpLFxuICAgICAgICAgX0cuY29uZmlnR2FtZS53aW5FeHBcbiAgICAgICk7XG5cbiAgICAgIC8vIGFuaW0gcHJvZ3Jlc3MgYmFyIGdldCBmaWxsZWQgJiBsYWJlbCBsZXZlbCB0cmFuc2Zvcm1cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBfRy5jb3JlVUkudXBkYXRlTGV2ZWxQcm9ncmVzc0JhcigwLjcpLCAxMDAwKTtcbiAgICAgIGlmIChpc0xldmVsVXApIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZ2hsaWdodEljb25MZXZlbCgoKSA9PiBfRy5jb3JlVUkudXBkYXRlTGV2ZWxOdW1iZXIoKSksIDE3MDApO1xuXG4gICAgICAvLyBoaWRlIGxheW91dF93aW5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF93aW4nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZ0NsYWltQW5pbSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgaXNMZXZlbFVwID0gX0cuZ2FtZU1lY2hhbmljLmNoZWNrVG9TaG93TGV2ZWxVcCgpO1xuICAgICAgICAgICAgaWYgKCFpc0xldmVsVXApIF9HLmdhbWVNZWNoYW5pYy5wbGF5TmV4dFJhbmRvbVB1enpsZSgpO1xuICAgICAgICAgfSk7XG4gICAgICB9LCB0b3RhbFdhaXRUaW1lICogMTAwMCk7XG4gICB9LFxuXG59Il19