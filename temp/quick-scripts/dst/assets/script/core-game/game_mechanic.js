
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/game_mechanic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '438ea0dqARKwKWtyk/Ae8uA', 'game_mechanic');
// script/core-game/game_mechanic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameMechanic = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.gameMechanic = {
    currentHintCellNodeArr: [],
    isShowingHint: false,
    lastCategoryName: '',
    lastFrameName: '',
    currentCategoryName: '',
    currentFrameName: '',
    currentSizeMode: '3x3',
    isPaused: true,
    timeRemaining: 0,
    timeTickUnit: 0.2,
    timerNode: null,
    isLevelUp: false,
    init: function () {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        this.timerNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/label_time');
        _.setInterval(function () { return _this.timerTickFunc(); }, this.timeTickUnit * 1000);
    },
    timerTickFunc: function () {
        if (!this.isPlaying() || this.isPaused || _G.tutorial.isShowingTut)
            return;
        this.timeRemaining = _.max(this.timeRemaining - this.timeTickUnit, 0);
        var str = _.secondsToTimeCountdown(_.ceil(this.timeRemaining));
        _G.utilsUI.fillLabel(this.timerNode, str);
        if (this.timeRemaining == 0)
            return this.onLose();
    },
    previewGame: function (categoryName, frameName, maxCellX, maxCellY, isFromCategory) {
        var _this = this;
        if (maxCellX === void 0) { maxCellX = 3; }
        if (maxCellY === void 0) { maxCellY = 3; }
        if (isFromCategory === void 0) { isFromCategory = false; }
        if (!isFromCategory && !this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial')
            return;
        this.currentSizeMode = maxCellX + 'x' + maxCellY;
        _G.coreUI.onTabPreview(this.currentSizeMode);
        _G.coreUI.setUIPlayState((_G.user.isVersionV2 && isFromCategory) ? _G.types.gameState.v2 : _G.types.gameState.pick_mode);
        var levelInfo = { maxCellX: maxCellX, maxCellY: maxCellY, categoryName: categoryName, frameName: frameName };
        this.currentCategoryName = categoryName;
        this.currentFrameName = frameName;
        _G.control.clearSelectedCellNode();
        _G.coreUI.showNagScreen();
        _G.mapVisual.clearMap(function () {
            _G.coreUI.hideNagScreen();
            // check the frame is loaded to show. Unless show loading
            var loadingLabelNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/label_game_loading');
            loadingLabelNode.active = true;
            _.waitToRun(function () {
                _G.coreUI.showNagScreen();
                loadingLabelNode.active = false;
                _G.mapVisual.render(levelInfo, function () {
                    // _.log(`calling _G.coreFX.showGrid() after mapVisual.render()`);
                    _G.coreFX.showGrid(function () { return _G.coreUI.hideNagScreen(); });
                });
                if (_this.lastCategoryName != _this.currentCategoryName || _this.lastFrameName != _this.currentFrameName) {
                    _this.lastCategoryName = _this.currentCategoryName;
                    _this.lastFrameName = _this.currentFrameName;
                    _G.analytic.logViewContent(_this.currentCategoryName, _this.currentFrameName);
                }
            }, 'isCurrentFrameLoaded()', _this);
        });
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
    },
    startGame: function () {
        var _this = this;
        if (!this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial')
            return;
        if (this.currentSizeMode == '1x1')
            this.previewGame(this.currentCategoryName, this.currentFrameName, 3, 3);
        this.timeRemaining = _G.configGame.playTime[this.currentSizeMode == '1x1' ? '3x3' : this.currentSizeMode];
        _G.coreUI.setUIPlayState(_G.types.gameState.playing);
        this.timerTickFunc();
        _G.coreUI.updatePuzzleProgressBar(0);
        _G.coreFX.hideGrid(function () {
            _this.shuffleCells(function () {
                // _.log(`calling _G.coreFX.showGrid() after gameMechanic.shuffleCells()`);
                _G.coreFX.showGrid();
                _this.updatePuzzleCompletionBar();
            });
        });
        if (!_G.tutorial.isShowingTut)
            this.onResume();
    },
    replay: function () {
        this.currentSizeMode = (this.currentSizeMode == '1x1') ? '3x3' : this.currentSizeMode;
        var currentSizeArr = this.currentSizeMode.split('x');
        this.previewGame(this.currentCategoryName, this.currentFrameName, parseInt(currentSizeArr[0]), parseInt(currentSizeArr[1]));
        this.startGame();
    },
    // when user won a puzzle, pick a random puzzle that he has not played 
    playNextRandomPuzzle: function () {
        var newPuzzleIdArr = _G.categoryList.frameNodeArr
            .map(function (node) { return node.categoryName + "_" + node.name; })
            .filter(function (puzzleId) { return !_G.user.playedGames[puzzleId]; });
        var newPuzzleId = _.randomArrItem(newPuzzleIdArr) || _.randomArrItem(Object.keys(_G.user.playedGames));
        // _.log(`onWinContinue >> newPuzzleId = ${newPuzzleId} // newPuzzleIdArr=`, newPuzzleIdArr);
        var tmpArr = newPuzzleId.split('_');
        _G.resources.loadSingleFrame(tmpArr[0], tmpArr[1]);
        this.previewGame(tmpArr[0], tmpArr[1], 3, 3, true);
    },
    isCurrentFrameLoaded: function () {
        if (_G.tutorial.isShowingTut || _G.tutorial.isCurrentPuzzleTutorial())
            return true;
        return _G.resources.frameSprites[this.currentCategoryName][this.currentFrameName];
    },
    shuffleCells: function (callback) {
        if (_G.tutorial.isShowingTut)
            return this.shuffleCellsForTut(callback);
        // generate random cell position
        var randomCellPosArr = [];
        var orderIndex = 0;
        for (var x = 1; x <= _G.mapVisual.currentMaxCellX; x++) {
            for (var y = 1; y <= _G.mapVisual.currentMaxCellY; y++) {
                randomCellPosArr.push({ x: x, y: y, orderIndex: orderIndex++ });
            }
        }
        _.shuffleArray(randomCellPosArr);
        // check if too many cells are in their correct positions
        var correctedCellNum = 0;
        var toltalCellNum = _G.mapVisual.currentMaxCellX * _G.mapVisual.currentMaxCellY;
        var maxCorrectCellRatio = 0.35;
        var isTooManyCorrectedCells = randomCellPosArr.some(function (cellPosInfo, index) {
            if (index == cellPosInfo.orderIndex)
                correctedCellNum++;
            if (correctedCellNum / toltalCellNum > maxCorrectCellRatio)
                return true;
        });
        // _.log(`shuffleCells >> isTooManyCorrectedCells = ${isTooManyCorrectedCells} // correctedCellNum (${correctedCellNum}) / toltalCellNum(${toltalCellNum}) = ${correctedCellNum / toltalCellNum} `);
        if (isTooManyCorrectedCells)
            return this.shuffleCells(callback);
        // set real cell pos
        _G.mapVisual.gridNode.children.map(function (childNode, i) {
            _G.mapVisual.setCellNodePos(childNode, randomCellPosArr[i].x, randomCellPosArr[i].y);
        });
        if (callback)
            callback();
    },
    shuffleCellsForTut: function (callback) {
        var _this = this;
        var cellPosArr = [
            { x: 3, y: 3 },
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 3, y: 2 },
        ];
        var cellNodeArr = _G.mapVisual.gridNode.children;
        cellNodeArr.map(function (cellNode, index) { return _G.mapVisual.setCellNodePos(cellNode, cellPosArr[index].x, cellPosArr[index].y); });
        var cellNode1 = _G.tutorial.cellNode1 = cellNodeArr[5];
        var cellNode2 = _G.tutorial.cellNode2 = cellNodeArr[4];
        // _G.mapVisual.setCellNodePos(cellNode1, cellNode2.orgCellPos.x, cellNode2.orgCellPos.y);
        // _G.mapVisual.setCellNodePos(cellNode2, cellNode1.orgCellPos.x, cellNode1.orgCellPos.y);
        cellNodeArr.map(function (cellNode) {
            _this.checkCellInCorrectPos(cellNode);
        });
        if (callback)
            callback();
    },
    updatePuzzleCompletionBar: function () {
        var _this = this;
        var correctCellCount = 0;
        var wrongCellCount = 0;
        _G.mapVisual.gridNode.children.map(function (cellNode) {
            if (_this.isFixedCell(cellNode))
                correctCellCount++;
            else
                wrongCellCount++;
        });
        _G.coreUI.updatePuzzleProgressBar(correctCellCount / (wrongCellCount + correctCellCount), 0.2);
    },
    onSwapCell: function (cellNode1, cellNode2) {
        var _this = this;
        _G.gameMechanic.clearHint();
        _G.coreUI.showNagScreen();
        _G.mapVisual.swapCellAnim(cellNode1, cellNode2, function () {
            _G.coreUI.hideNagScreen();
            _this.checkCellInCorrectPos(cellNode1);
            _this.checkCellInCorrectPos(cellNode2);
            _this.updatePuzzleCompletionBar();
            _this.checkWin();
            _G.tutorial.checkOnSwapCells();
        });
    },
    checkWin: function () {
        var _this = this;
        var isWin = _G.mapVisual.gridNode.children.every(function (cellNode) { return _this.isFixedCell(cellNode); });
        _.log(" isWin = " + isWin + " ");
        if (!isWin)
            return;
        this.onPause();
        var starToAdd = _G.configGame.winCoinReward[this.currentSizeMode];
        _G.user.addStars(starToAdd, true);
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/star_num_base/label_stars'), '+' + starToAdd);
        // _G.utilsUI.fillLabel(this.winTimerNode, this.timerNode.getComponent(cc.Label).string);
        _G.coreUI.setUIPlayState(_G.types.gameState.won);
        this.isLevelUp = _G.user.addExp(_G.configGame.winExp, true);
        if (this.isLevelUp)
            _G.user.addStars(_G.configGame.levelUpCoinReward, true);
        // save game as played & re-render icon-checked for all frame cells
        var gameName = this.currentCategoryName + '_' + this.currentFrameName;
        if (!_G.user.playedGames[gameName]) {
            _G.user.playedGames[gameName] = 1;
            _G.utilsData.save({ playedGames: _G.user.playedGames });
            _G.categoryList.updateAllIconCheckeds();
        }
        // Play win anim
        _G.coreUI.showNagScreen(3.8);
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
        _.setTimeout(function () { return _G.coreFX.playWinAnim(); }, 200);
        // copy frame grid to show in "layotu_win"
        _.setTimeout(function () {
            _this.copyFrameGridToTarget(cc.find('Canvas/layout_win/dialog/grid/grid_container'));
        }, 2000);
    },
    copyFrameGridToTarget: function (targetGridNode) {
        targetGridNode.removeAllChildren();
        var gridNode = _.copyNode(_G.mapVisual.gridNode, targetGridNode);
        gridNode.y = 0;
        gridNode.scale = targetGridNode.width / _G.mapVisual.mainFrameWidth;
        gridNode.children.map(function (cellNode) {
            cc.find('mask', cellNode).width -= 3;
            cc.find('mask', cellNode).height -= 3;
            cellNode.scale = 1;
            cc.find('correct_tile_fx', cellNode).active = false;
        });
    },
    onLose: function () {
        var _this = this;
        this.onPause();
        _G.control.clearSelectedCellNode(true);
        _G.coreUI.showNagScreen(0.5);
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
        _.setTimeout(function () {
            _G.coreUI.showLayout('layout_game_over');
            _G.coreUI.hideButtonBack();
            _G.mapVisual.gridNode.children.map(function (cellNode) {
                _G.mapVisual.setCellNodePos(cellNode, cellNode.orgCellPos.x, cellNode.orgCellPos.y, true);
            });
            _this.copyFrameGridToTarget(cc.find('Canvas/layout_game_over/dialog/grid/grid_container'));
        }, 200);
    },
    checkToShowLevelUp: function () {
        if (!this.isLevelUp)
            return;
        this.isLevelUp = false;
        var labelLevelX = cc.find('Canvas/layout_level_up/dialog/label_level_up_to_level_X');
        _G.localize.translateSingleLabel(labelLevelX, _G.user.level);
        _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_level_up'));
        _G.coreUI.showLayoutAnim('layout_level_up');
        return true;
    },
    onHint: function () {
        var _a;
        var _this = this;
        if (this.isShowingHint)
            return;
        _.setTimeout(function () { return _this.isShowingHint = true; });
        var wrongCellNode = _G.mapVisual.gridNode.children.find(function (cellNode) { return !_this.isFixedCell(cellNode); });
        if (!wrongCellNode)
            return;
        _G.user.addStars(-_G.configGame.hintCoinPrice);
        _G.control.clearSelectedCellNode();
        var wrongCellNode2 = _G.mapVisual.gridNode.children.find(function (cellNode) {
            return cellNode.cellPos.x == wrongCellNode.orgCellPos.x && cellNode.cellPos.y == wrongCellNode.orgCellPos.y;
        });
        this.currentHintCellNodeArr = [wrongCellNode, wrongCellNode2];
        (_a = _G.mapVisual).bringCellsToTop.apply(_a, this.currentHintCellNodeArr);
        var fxTime = 0.2;
        _G.coreUI.showNagScreen(fxTime);
        this.currentHintCellNodeArr.map(function (cellNode) {
            cc.find('border_highlight', cellNode).active = true;
            cellNode.stopAllActions();
            cc.tween(cellNode).to(fxTime, { scale: 1.15 }).start();
        });
        _.setTimeout(function () {
            _this.onSwapCell(_this.currentHintCellNodeArr[0], _this.currentHintCellNodeArr[1]);
        }, fxTime * 1000);
    },
    isPlaying: function () {
        return _G.coreUI.currentState == _G.types.gameState.playing;
    },
    onPause: function (isShowPopupPause) {
        if (_G.tutorial.isShowingTut)
            return;
        this.isPaused = true;
        if (isShowPopupPause && !_G.tutorial.isShowingTut && this.isPlaying()
            && !cc.find('Canvas/layout_pause').active
            && !cc.find('Canvas/layout_game_over').active
            && !cc.find('Canvas/layout_alert').active)
            _G.coreUI.showLayoutAnim('layout_pause');
    },
    onResume: function () {
        this.isPaused = false;
        if (cc.find('Canvas/layout_pause').active)
            _G.coreUI.hideLayoutAnim('layout_pause');
    },
    clearHint: function (specificCell) {
        this.isShowingHint = false;
        _G.mapVisual.gridNode.children.map(function (cellNode) {
            if (specificCell && cellNode != specificCell)
                return;
            cc.find('border_highlight', cellNode).active = false;
            if (!specificCell)
                cellNode.scale = 1;
        });
    },
    // =====================================================
    // SUPPROTIVE FUNCS
    // =====================================================
    checkCellInCorrectPos: function (cellNode) {
        if (!this.isFixedCell(cellNode))
            return;
        var maskNode = cc.find('mask', cellNode);
        maskNode.width = cellNode.width;
        maskNode.height = cellNode.height;
        _G.audio.playSound('correctpiece');
        _G.coreFX.onCorrectCellPos(cellNode);
    },
    isFixedCell: function (cellNode) {
        return cellNode.cellPos.x == cellNode.orgCellPos.x && cellNode.cellPos.y == cellNode.orgCellPos.y;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2dhbWVfbWVjaGFuaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsWUFBWSxHQUFHO0lBQ3pCLHNCQUFzQixFQUFFLEVBQUU7SUFDMUIsYUFBYSxFQUFFLEtBQUs7SUFFcEIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixhQUFhLEVBQUUsRUFBRTtJQUNqQixtQkFBbUIsRUFBRSxFQUFFO0lBQ3ZCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsZUFBZSxFQUFFLEtBQUs7SUFFdEIsUUFBUSxFQUFFLElBQUk7SUFDZCxhQUFhLEVBQUUsQ0FBQztJQUNoQixZQUFZLEVBQUUsR0FBRztJQUVqQixTQUFTLEVBQUUsSUFBZTtJQUMxQixTQUFTLEVBQUUsS0FBSztJQUVoQixJQUFJO1FBQUosaUJBSUM7UUFIRSxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0ZBQStGLENBQUMsQ0FBQztRQUMxSCxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBR0QsYUFBYTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElB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QUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsWUFBWTtnQkFBRSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFHRCx3REFBd0Q7SUFDeEQsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUV4RCxxQkFBcUIsWUFBQyxRQUFRO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU87UUFDeEMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFHRCxXQUFXLFlBQUMsUUFBUTtRQUNqQixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7Q0FHSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBnYW1lTWVjaGFuaWMgPSB7XG4gICBjdXJyZW50SGludENlbGxOb2RlQXJyOiBbXSxcbiAgIGlzU2hvd2luZ0hpbnQ6IGZhbHNlLFxuXG4gICBsYXN0Q2F0ZWdvcnlOYW1lOiAnJyxcbiAgIGxhc3RGcmFtZU5hbWU6ICcnLFxuICAgY3VycmVudENhdGVnb3J5TmFtZTogJycsXG4gICBjdXJyZW50RnJhbWVOYW1lOiAnJyxcbiAgIGN1cnJlbnRTaXplTW9kZTogJzN4MycsIC8vIGRlZmF1bHQgZm9yIHR1dFxuXG4gICBpc1BhdXNlZDogdHJ1ZSxcbiAgIHRpbWVSZW1haW5pbmc6IDAsXG4gICB0aW1lVGlja1VuaXQ6IDAuMixcblxuICAgdGltZXJOb2RlOiBudWxsIGFzIGNjLk5vZGUsXG4gICBpc0xldmVsVXA6IGZhbHNlLFxuXG4gICBpbml0KCkge1xuICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy50aW1lck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvdGltZV9sZXZlbF9iYXIvcGxheV90aW1lL2xhYmVsX3RpbWUnKTtcbiAgICAgIF8uc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aW1lclRpY2tGdW5jKCksIHRoaXMudGltZVRpY2tVbml0ICogMTAwMCk7XG4gICB9LFxuXG5cbiAgIHRpbWVyVGlja0Z1bmMoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkgfHwgdGhpcy5pc1BhdXNlZCB8fCBfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IF8ubWF4KHRoaXMudGltZVJlbWFpbmluZyAtIHRoaXMudGltZVRpY2tVbml0LCAwKTtcblxuICAgICAgY29uc3Qgc3RyID0gXy5zZWNvbmRzVG9UaW1lQ291bnRkb3duKF8uY2VpbCh0aGlzLnRpbWVSZW1haW5pbmcpKTtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKHRoaXMudGltZXJOb2RlLCBzdHIpO1xuXG4gICAgICBpZiAodGhpcy50aW1lUmVtYWluaW5nID09IDApIHJldHVybiB0aGlzLm9uTG9zZSgpO1xuICAgfSxcblxuXG4gICBwcmV2aWV3R2FtZShjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSwgbWF4Q2VsbFggPSAzLCBtYXhDZWxsWSA9IDMsIGlzRnJvbUNhdGVnb3J5ID0gZmFsc2UpIHtcbiAgICAgIGlmICghaXNGcm9tQ2F0ZWdvcnkgJiYgIXRoaXMuaXNDdXJyZW50RnJhbWVMb2FkZWQoKSAmJiB0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUgIT0gJ3R1dG9yaWFsJykgcmV0dXJuO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTaXplTW9kZSA9IG1heENlbGxYICsgJ3gnICsgbWF4Q2VsbFlcbiAgICAgIF9HLmNvcmVVSS5vblRhYlByZXZpZXcodGhpcy5jdXJyZW50U2l6ZU1vZGUpO1xuXG4gICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoKF9HLnVzZXIuaXNWZXJzaW9uVjIgJiYgaXNGcm9tQ2F0ZWdvcnkpID8gX0cudHlwZXMuZ2FtZVN0YXRlLnYyIDogX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG5cbiAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHsgbWF4Q2VsbFgsIG1heENlbGxZLCBjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSB9O1xuICAgICAgdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnlOYW1lO1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWVOYW1lID0gZnJhbWVOYW1lO1xuICAgICAgX0cuY29udHJvbC5jbGVhclNlbGVjdGVkQ2VsbE5vZGUoKTtcblxuICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oKTtcbiAgICAgIF9HLm1hcFZpc3VhbC5jbGVhck1hcCgoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuXG4gICAgICAgICAvLyBjaGVjayB0aGUgZnJhbWUgaXMgbG9hZGVkIHRvIHNob3cuIFVubGVzcyBzaG93IGxvYWRpbmdcbiAgICAgICAgIGNvbnN0IGxvYWRpbmdMYWJlbE5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvZ3JpZF9zdGFjay9sYWJlbF9nYW1lX2xvYWRpbmcnKTtcbiAgICAgICAgIGxvYWRpbmdMYWJlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgIF8ud2FpdFRvUnVuKCgpID0+IHtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICAgICAgICBsb2FkaW5nTGFiZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgX0cubWFwVmlzdWFsLnJlbmRlcihsZXZlbEluZm8sICgpID0+IHtcbiAgICAgICAgICAgICAgIC8vIF8ubG9nKGBjYWxsaW5nIF9HLmNvcmVGWC5zaG93R3JpZCgpIGFmdGVyIG1hcFZpc3VhbC5yZW5kZXIoKWApO1xuICAgICAgICAgICAgICAgX0cuY29yZUZYLnNob3dHcmlkKCgpID0+IF9HLmNvcmVVSS5oaWRlTmFnU2NyZWVuKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RDYXRlZ29yeU5hbWUgIT0gdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lIHx8IHRoaXMubGFzdEZyYW1lTmFtZSAhPSB0aGlzLmN1cnJlbnRGcmFtZU5hbWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMubGFzdENhdGVnb3J5TmFtZSA9IHRoaXMuY3VycmVudENhdGVnb3J5TmFtZTtcbiAgICAgICAgICAgICAgIHRoaXMubGFzdEZyYW1lTmFtZSA9IHRoaXMuY3VycmVudEZyYW1lTmFtZTtcbiAgICAgICAgICAgICAgIF9HLmFuYWx5dGljLmxvZ1ZpZXdDb250ZW50KHRoaXMuY3VycmVudENhdGVnb3J5TmFtZSwgdGhpcy5jdXJyZW50RnJhbWVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0sICdpc0N1cnJlbnRGcmFtZUxvYWRlZCgpJywgdGhpcyk7XG5cbiAgICAgIH0pO1xuXG4gICAgICBfRy5jb3JlVUkubWFzdGVyU2Nyb2xsVmlld0NvbXAuc2Nyb2xsVG9Ub3AoMC4yKTtcbiAgIH0sXG5cblxuICAgc3RhcnRHYW1lKCkge1xuICAgICAgaWYgKCF0aGlzLmlzQ3VycmVudEZyYW1lTG9hZGVkKCkgJiYgdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lICE9ICd0dXRvcmlhbCcpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTaXplTW9kZSA9PSAnMXgxJykgdGhpcy5wcmV2aWV3R2FtZSh0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUsIHRoaXMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG5cbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IF9HLmNvbmZpZ0dhbWUucGxheVRpbWVbdGhpcy5jdXJyZW50U2l6ZU1vZGUgPT0gJzF4MScgPyAnM3gzJyA6IHRoaXMuY3VycmVudFNpemVNb2RlXTtcbiAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUucGxheWluZyk7XG4gICAgICB0aGlzLnRpbWVyVGlja0Z1bmMoKTtcblxuICAgICAgX0cuY29yZVVJLnVwZGF0ZVB1enpsZVByb2dyZXNzQmFyKDApO1xuICAgICAgX0cuY29yZUZYLmhpZGVHcmlkKCgpID0+IHtcbiAgICAgICAgIHRoaXMuc2h1ZmZsZUNlbGxzKCgpID0+IHtcbiAgICAgICAgICAgIC8vIF8ubG9nKGBjYWxsaW5nIF9HLmNvcmVGWC5zaG93R3JpZCgpIGFmdGVyIGdhbWVNZWNoYW5pYy5zaHVmZmxlQ2VsbHMoKWApO1xuICAgICAgICAgICAgX0cuY29yZUZYLnNob3dHcmlkKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghX0cudHV0b3JpYWwuaXNTaG93aW5nVHV0KSB0aGlzLm9uUmVzdW1lKCk7XG4gICB9LFxuXG5cbiAgIHJlcGxheSgpIHtcbiAgICAgIHRoaXMuY3VycmVudFNpemVNb2RlID0gKHRoaXMuY3VycmVudFNpemVNb2RlID09ICcxeDEnKSA/ICczeDMnIDogdGhpcy5jdXJyZW50U2l6ZU1vZGU7XG4gICAgICBjb25zdCBjdXJyZW50U2l6ZUFyciA9IHRoaXMuY3VycmVudFNpemVNb2RlLnNwbGl0KCd4Jyk7XG4gICAgICB0aGlzLnByZXZpZXdHYW1lKHRoaXMuY3VycmVudENhdGVnb3J5TmFtZSwgdGhpcy5jdXJyZW50RnJhbWVOYW1lLCBwYXJzZUludChjdXJyZW50U2l6ZUFyclswXSksIHBhcnNlSW50KGN1cnJlbnRTaXplQXJyWzFdKSk7XG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xuICAgfSxcblxuICAgLy8gd2hlbiB1c2VyIHdvbiBhIHB1enpsZSwgcGljayBhIHJhbmRvbSBwdXp6bGUgdGhhdCBoZSBoYXMgbm90IHBsYXllZCBcbiAgIHBsYXlOZXh0UmFuZG9tUHV6emxlKCkge1xuICAgICAgY29uc3QgbmV3UHV6emxlSWRBcnIgPSBfRy5jYXRlZ29yeUxpc3QuZnJhbWVOb2RlQXJyXG4gICAgICAgICAubWFwKG5vZGUgPT4gYCR7bm9kZS5jYXRlZ29yeU5hbWV9XyR7bm9kZS5uYW1lfWApXG4gICAgICAgICAuZmlsdGVyKHB1enpsZUlkID0+ICFfRy51c2VyLnBsYXllZEdhbWVzW3B1enpsZUlkXSlcbiAgICAgIGNvbnN0IG5ld1B1enpsZUlkID0gXy5yYW5kb21BcnJJdGVtKG5ld1B1enpsZUlkQXJyKSB8fCBfLnJhbmRvbUFyckl0ZW0oT2JqZWN0LmtleXMoX0cudXNlci5wbGF5ZWRHYW1lcykpO1xuICAgICAgLy8gXy5sb2coYG9uV2luQ29udGludWUgPj4gbmV3UHV6emxlSWQgPSAke25ld1B1enpsZUlkfSAvLyBuZXdQdXp6bGVJZEFycj1gLCBuZXdQdXp6bGVJZEFycik7XG5cbiAgICAgIGNvbnN0IHRtcEFyciA9IG5ld1B1enpsZUlkLnNwbGl0KCdfJyk7XG4gICAgICBfRy5yZXNvdXJjZXMubG9hZFNpbmdsZUZyYW1lKHRtcEFyclswXSwgdG1wQXJyWzFdKTtcbiAgICAgIHRoaXMucHJldmlld0dhbWUodG1wQXJyWzBdLCB0bXBBcnJbMV0sIDMsIDMsIHRydWUpO1xuICAgfSxcblxuXG4gICBpc0N1cnJlbnRGcmFtZUxvYWRlZCgpIHtcbiAgICAgIGlmIChfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQgfHwgX0cudHV0b3JpYWwuaXNDdXJyZW50UHV6emxlVHV0b3JpYWwoKSkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1t0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWVdW3RoaXMuY3VycmVudEZyYW1lTmFtZV07XG4gICB9LFxuXG5cbiAgIHNodWZmbGVDZWxscyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoX0cudHV0b3JpYWwuaXNTaG93aW5nVHV0KSByZXR1cm4gdGhpcy5zaHVmZmxlQ2VsbHNGb3JUdXQoY2FsbGJhY2spO1xuXG4gICAgICAvLyBnZW5lcmF0ZSByYW5kb20gY2VsbCBwb3NpdGlvblxuICAgICAgY29uc3QgcmFuZG9tQ2VsbFBvc0FyciA9IFtdO1xuICAgICAgbGV0IG9yZGVySW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gX0cubWFwVmlzdWFsLmN1cnJlbnRNYXhDZWxsWDsgeCsrKSB7XG4gICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8PSBfRy5tYXBWaXN1YWwuY3VycmVudE1heENlbGxZOyB5KyspIHtcbiAgICAgICAgICAgIHJhbmRvbUNlbGxQb3NBcnIucHVzaCh7IHgsIHksIG9yZGVySW5kZXg6IG9yZGVySW5kZXgrKyB9KTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF8uc2h1ZmZsZUFycmF5KHJhbmRvbUNlbGxQb3NBcnIpO1xuXG4gICAgICAvLyBjaGVjayBpZiB0b28gbWFueSBjZWxscyBhcmUgaW4gdGhlaXIgY29ycmVjdCBwb3NpdGlvbnNcbiAgICAgIGxldCBjb3JyZWN0ZWRDZWxsTnVtID0gMDtcbiAgICAgIGNvbnN0IHRvbHRhbENlbGxOdW0gPSBfRy5tYXBWaXN1YWwuY3VycmVudE1heENlbGxYICogX0cubWFwVmlzdWFsLmN1cnJlbnRNYXhDZWxsWTtcbiAgICAgIGNvbnN0IG1heENvcnJlY3RDZWxsUmF0aW8gPSAwLjM1O1xuICAgICAgY29uc3QgaXNUb29NYW55Q29ycmVjdGVkQ2VsbHMgPSByYW5kb21DZWxsUG9zQXJyLnNvbWUoKGNlbGxQb3NJbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgaWYgKGluZGV4ID09IGNlbGxQb3NJbmZvLm9yZGVySW5kZXgpIGNvcnJlY3RlZENlbGxOdW0rKztcbiAgICAgICAgIGlmIChjb3JyZWN0ZWRDZWxsTnVtIC8gdG9sdGFsQ2VsbE51bSA+IG1heENvcnJlY3RDZWxsUmF0aW8pIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICAvLyBfLmxvZyhgc2h1ZmZsZUNlbGxzID4+IGlzVG9vTWFueUNvcnJlY3RlZENlbGxzID0gJHtpc1Rvb01hbnlDb3JyZWN0ZWRDZWxsc30gLy8gY29ycmVjdGVkQ2VsbE51bSAoJHtjb3JyZWN0ZWRDZWxsTnVtfSkgLyB0b2x0YWxDZWxsTnVtKCR7dG9sdGFsQ2VsbE51bX0pID0gJHtjb3JyZWN0ZWRDZWxsTnVtIC8gdG9sdGFsQ2VsbE51bX0gYCk7XG4gICAgICBpZiAoaXNUb29NYW55Q29ycmVjdGVkQ2VsbHMpIHJldHVybiB0aGlzLnNodWZmbGVDZWxscyhjYWxsYmFjayk7XG5cbiAgICAgIC8vIHNldCByZWFsIGNlbGwgcG9zXG4gICAgICBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZE5vZGUsIGkpID0+IHtcbiAgICAgICAgIF9HLm1hcFZpc3VhbC5zZXRDZWxsTm9kZVBvcyhjaGlsZE5vZGUsIHJhbmRvbUNlbGxQb3NBcnJbaV0ueCwgcmFuZG9tQ2VsbFBvc0FycltpXS55KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICB9LFxuXG5cbiAgIHNodWZmbGVDZWxsc0ZvclR1dChjYWxsYmFjaykge1xuICAgICAgY29uc3QgY2VsbFBvc0FyciA9IFtcbiAgICAgICAgIHsgeDogMywgeTogMyB9LFxuICAgICAgICAgeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgICB7IHg6IDMsIHk6IDEgfSxcbiAgICAgICAgIHsgeDogMSwgeTogMyB9LFxuICAgICAgICAgeyB4OiAyLCB5OiAzIH0sIC8vIC0tIG11c3Qga2VlcCBhdCBpbmRleD00ICg1dGggZWxlbSBpbiBhcnIpXG4gICAgICAgICB7IHg6IDIsIHk6IDIgfSwgLy8gLS0gbXVzdCBrZWVwIGF0IGluZGV4PTUgKDZ0aCBlbGVtIGluIGFycilcbiAgICAgICAgIHsgeDogMiwgeTogMSB9LFxuICAgICAgICAgeyB4OiAxLCB5OiAyIH0sXG4gICAgICAgICB7IHg6IDMsIHk6IDIgfSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGNlbGxOb2RlQXJyID0gX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuO1xuICAgICAgY2VsbE5vZGVBcnIubWFwKChjZWxsTm9kZSwgaW5kZXgpID0+IF9HLm1hcFZpc3VhbC5zZXRDZWxsTm9kZVBvcyhjZWxsTm9kZSwgY2VsbFBvc0FycltpbmRleF0ueCwgY2VsbFBvc0FycltpbmRleF0ueSkpO1xuXG4gICAgICBjb25zdCBjZWxsTm9kZTEgPSBfRy50dXRvcmlhbC5jZWxsTm9kZTEgPSBjZWxsTm9kZUFycls1XTtcbiAgICAgIGNvbnN0IGNlbGxOb2RlMiA9IF9HLnR1dG9yaWFsLmNlbGxOb2RlMiA9IGNlbGxOb2RlQXJyWzRdO1xuICAgICAgLy8gX0cubWFwVmlzdWFsLnNldENlbGxOb2RlUG9zKGNlbGxOb2RlMSwgY2VsbE5vZGUyLm9yZ0NlbGxQb3MueCwgY2VsbE5vZGUyLm9yZ0NlbGxQb3MueSk7XG4gICAgICAvLyBfRy5tYXBWaXN1YWwuc2V0Q2VsbE5vZGVQb3MoY2VsbE5vZGUyLCBjZWxsTm9kZTEub3JnQ2VsbFBvcy54LCBjZWxsTm9kZTEub3JnQ2VsbFBvcy55KTtcblxuICAgICAgY2VsbE5vZGVBcnIubWFwKGNlbGxOb2RlID0+IHtcbiAgICAgICAgIHRoaXMuY2hlY2tDZWxsSW5Db3JyZWN0UG9zKGNlbGxOb2RlKTtcbiAgICAgIH0pXG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgIH0sXG5cbiAgIHVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKSB7XG4gICAgICBsZXQgY29ycmVjdENlbGxDb3VudCA9IDA7XG4gICAgICBsZXQgd3JvbmdDZWxsQ291bnQgPSAwO1xuICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBpZiAodGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpIGNvcnJlY3RDZWxsQ291bnQrKztcbiAgICAgICAgIGVsc2Ugd3JvbmdDZWxsQ291bnQrKztcbiAgICAgIH0pO1xuICAgICAgX0cuY29yZVVJLnVwZGF0ZVB1enpsZVByb2dyZXNzQmFyKGNvcnJlY3RDZWxsQ291bnQgLyAod3JvbmdDZWxsQ291bnQgKyBjb3JyZWN0Q2VsbENvdW50KSwgMC4yKTtcbiAgIH0sXG5cbiAgIG9uU3dhcENlbGwoY2VsbE5vZGUxLCBjZWxsTm9kZTIpIHtcbiAgICAgIF9HLmdhbWVNZWNoYW5pYy5jbGVhckhpbnQoKTtcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICBfRy5tYXBWaXN1YWwuc3dhcENlbGxBbmltKGNlbGxOb2RlMSwgY2VsbE5vZGUyLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuICAgICAgICAgdGhpcy5jaGVja0NlbGxJbkNvcnJlY3RQb3MoY2VsbE5vZGUxKTtcbiAgICAgICAgIHRoaXMuY2hlY2tDZWxsSW5Db3JyZWN0UG9zKGNlbGxOb2RlMik7XG4gICAgICAgICB0aGlzLnVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKTtcbiAgICAgICAgIHRoaXMuY2hlY2tXaW4oKTtcblxuICAgICAgICAgX0cudHV0b3JpYWwuY2hlY2tPblN3YXBDZWxscygpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIGNoZWNrV2luKCkge1xuICAgICAgY29uc3QgaXNXaW4gPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4uZXZlcnkoY2VsbE5vZGUgPT4gdGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpO1xuICAgICAgXy5sb2coYCBpc1dpbiA9ICR7aXNXaW59IGApO1xuICAgICAgaWYgKCFpc1dpbikgcmV0dXJuO1xuICAgICAgdGhpcy5vblBhdXNlKCk7XG5cbiAgICAgIGNvbnN0IHN0YXJUb0FkZCA9IF9HLmNvbmZpZ0dhbWUud2luQ29pblJld2FyZFt0aGlzLmN1cnJlbnRTaXplTW9kZV07XG4gICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJUb0FkZCwgdHJ1ZSk7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvc3Rhcl9udW1fYmFzZS9sYWJlbF9zdGFycycpLCAnKycgKyBzdGFyVG9BZGQpO1xuICAgICAgLy8gX0cudXRpbHNVSS5maWxsTGFiZWwodGhpcy53aW5UaW1lck5vZGUsIHRoaXMudGltZXJOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nKTtcblxuICAgICAgX0cuY29yZVVJLnNldFVJUGxheVN0YXRlKF9HLnR5cGVzLmdhbWVTdGF0ZS53b24pO1xuXG4gICAgICB0aGlzLmlzTGV2ZWxVcCA9IF9HLnVzZXIuYWRkRXhwKF9HLmNvbmZpZ0dhbWUud2luRXhwLCB0cnVlKTtcbiAgICAgIGlmICh0aGlzLmlzTGV2ZWxVcCkgX0cudXNlci5hZGRTdGFycyhfRy5jb25maWdHYW1lLmxldmVsVXBDb2luUmV3YXJkLCB0cnVlKTtcblxuICAgICAgLy8gc2F2ZSBnYW1lIGFzIHBsYXllZCAmIHJlLXJlbmRlciBpY29uLWNoZWNrZWQgZm9yIGFsbCBmcmFtZSBjZWxsc1xuICAgICAgY29uc3QgZ2FtZU5hbWUgPSB0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUgKyAnXycgKyB0aGlzLmN1cnJlbnRGcmFtZU5hbWU7XG4gICAgICBpZiAoIV9HLnVzZXIucGxheWVkR2FtZXNbZ2FtZU5hbWVdKSB7XG4gICAgICAgICBfRy51c2VyLnBsYXllZEdhbWVzW2dhbWVOYW1lXSA9IDE7XG4gICAgICAgICBfRy51dGlsc0RhdGEuc2F2ZSh7IHBsYXllZEdhbWVzOiBfRy51c2VyLnBsYXllZEdhbWVzIH0pO1xuICAgICAgICAgX0cuY2F0ZWdvcnlMaXN0LnVwZGF0ZUFsbEljb25DaGVja2VkcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBQbGF5IHdpbiBhbmltXG4gICAgICBfRy5jb3JlVUkuc2hvd05hZ1NjcmVlbigzLjgpO1xuICAgICAgX0cuY29yZVVJLm1hc3RlclNjcm9sbFZpZXdDb21wLnNjcm9sbFRvVG9wKDAuMik7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuY29yZUZYLnBsYXlXaW5BbmltKCksIDIwMCk7XG5cbiAgICAgIC8vIGNvcHkgZnJhbWUgZ3JpZCB0byBzaG93IGluIFwibGF5b3R1X3dpblwiXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5jb3B5RnJhbWVHcmlkVG9UYXJnZXQoY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2dyaWQvZ3JpZF9jb250YWluZXInKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgIH0sXG5cbiAgIGNvcHlGcmFtZUdyaWRUb1RhcmdldCh0YXJnZXRHcmlkTm9kZTogY2MuTm9kZSkge1xuICAgICAgdGFyZ2V0R3JpZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIGNvbnN0IGdyaWROb2RlID0gXy5jb3B5Tm9kZShfRy5tYXBWaXN1YWwuZ3JpZE5vZGUsIHRhcmdldEdyaWROb2RlKTtcbiAgICAgIGdyaWROb2RlLnkgPSAwO1xuICAgICAgZ3JpZE5vZGUuc2NhbGUgPSB0YXJnZXRHcmlkTm9kZS53aWR0aCAvIF9HLm1hcFZpc3VhbC5tYWluRnJhbWVXaWR0aDtcbiAgICAgIGdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpLndpZHRoIC09IDM7XG4gICAgICAgICBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpLmhlaWdodCAtPSAzO1xuICAgICAgICAgY2VsbE5vZGUuc2NhbGUgPSAxO1xuICAgICAgICAgY2MuZmluZCgnY29ycmVjdF90aWxlX2Z4JywgY2VsbE5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIG9uTG9zZSgpIHtcbiAgICAgIHRoaXMub25QYXVzZSgpO1xuICAgICAgX0cuY29udHJvbC5jbGVhclNlbGVjdGVkQ2VsbE5vZGUodHJ1ZSk7XG4gICAgICBfRy5jb3JlVUkuc2hvd05hZ1NjcmVlbigwLjUpO1xuICAgICAgX0cuY29yZVVJLm1hc3RlclNjcm9sbFZpZXdDb21wLnNjcm9sbFRvVG9wKDAuMik7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLnNob3dMYXlvdXQoJ2xheW91dF9nYW1lX292ZXInKTtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlQnV0dG9uQmFjaygpO1xuICAgICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICAgICBfRy5tYXBWaXN1YWwuc2V0Q2VsbE5vZGVQb3MoY2VsbE5vZGUsIGNlbGxOb2RlLm9yZ0NlbGxQb3MueCwgY2VsbE5vZGUub3JnQ2VsbFBvcy55LCB0cnVlKTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgdGhpcy5jb3B5RnJhbWVHcmlkVG9UYXJnZXQoY2MuZmluZCgnQ2FudmFzL2xheW91dF9nYW1lX292ZXIvZGlhbG9nL2dyaWQvZ3JpZF9jb250YWluZXInKSk7XG4gICAgICB9LCAyMDApO1xuICAgfSxcblxuXG4gICBjaGVja1RvU2hvd0xldmVsVXAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNMZXZlbFVwKSByZXR1cm47XG4gICAgICB0aGlzLmlzTGV2ZWxVcCA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBsYWJlbExldmVsWCA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbGV2ZWxfdXAvZGlhbG9nL2xhYmVsX2xldmVsX3VwX3RvX2xldmVsX1gnKTtcbiAgICAgIF9HLmxvY2FsaXplLnRyYW5zbGF0ZVNpbmdsZUxhYmVsKGxhYmVsTGV2ZWxYLCBfRy51c2VyLmxldmVsKTtcblxuICAgICAgX0cuY29yZUZYLmZ4U2hvd1BvcHVwSGVhZGVyKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbGV2ZWxfdXAnKSk7XG4gICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9sZXZlbF91cCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICB9LFxuXG4gICBvbkhpbnQoKSB7XG4gICAgICBpZiAodGhpcy5pc1Nob3dpbmdIaW50KSByZXR1cm47XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc1Nob3dpbmdIaW50ID0gdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHdyb25nQ2VsbE5vZGUgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4uZmluZChjZWxsTm9kZSA9PiAhdGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpO1xuICAgICAgaWYgKCF3cm9uZ0NlbGxOb2RlKSByZXR1cm47XG5cbiAgICAgIF9HLnVzZXIuYWRkU3RhcnMoLV9HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZSk7XG5cbiAgICAgIF9HLmNvbnRyb2wuY2xlYXJTZWxlY3RlZENlbGxOb2RlKCk7XG4gICAgICBjb25zdCB3cm9uZ0NlbGxOb2RlMiA9IF9HLm1hcFZpc3VhbC5ncmlkTm9kZS5jaGlsZHJlbi5maW5kKGNlbGxOb2RlID0+IHtcbiAgICAgICAgIHJldHVybiBjZWxsTm9kZS5jZWxsUG9zLnggPT0gd3JvbmdDZWxsTm9kZS5vcmdDZWxsUG9zLnggJiYgY2VsbE5vZGUuY2VsbFBvcy55ID09IHdyb25nQ2VsbE5vZGUub3JnQ2VsbFBvcy55XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyID0gW3dyb25nQ2VsbE5vZGUsIHdyb25nQ2VsbE5vZGUyXTtcbiAgICAgIF9HLm1hcFZpc3VhbC5icmluZ0NlbGxzVG9Ub3AoLi4udGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyKTtcblxuICAgICAgY29uc3QgZnhUaW1lID0gMC4yO1xuICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oZnhUaW1lKTtcbiAgICAgIHRoaXMuY3VycmVudEhpbnRDZWxsTm9kZUFyci5tYXAoY2VsbE5vZGUgPT4ge1xuICAgICAgICAgY2MuZmluZCgnYm9yZGVyX2hpZ2hsaWdodCcsIGNlbGxOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLnRvKGZ4VGltZSwgeyBzY2FsZTogMS4xNSB9KS5zdGFydCgpO1xuICAgICAgfSk7XG5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLm9uU3dhcENlbGwodGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyWzBdLCB0aGlzLmN1cnJlbnRIaW50Q2VsbE5vZGVBcnJbMV0pO1xuICAgICAgfSwgZnhUaW1lICogMTAwMCk7XG4gICB9LFxuXG4gICBpc1BsYXlpbmcoKSB7XG4gICAgICByZXR1cm4gX0cuY29yZVVJLmN1cnJlbnRTdGF0ZSA9PSBfRy50eXBlcy5nYW1lU3RhdGUucGxheWluZztcbiAgIH0sXG5cbiAgIG9uUGF1c2UoaXNTaG93UG9wdXBQYXVzZT8pIHtcbiAgICAgIGlmIChfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQpIHJldHVybjtcbiAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgICAgaWYgKGlzU2hvd1BvcHVwUGF1c2UgJiYgIV9HLnR1dG9yaWFsLmlzU2hvd2luZ1R1dCAmJiB0aGlzLmlzUGxheWluZygpXG4gICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9wYXVzZScpLmFjdGl2ZVxuICAgICAgICAgJiYgIWNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyJykuYWN0aXZlXG4gICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydCcpLmFjdGl2ZVxuICAgICAgKSBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9wYXVzZScpO1xuICAgfSxcblxuICAgb25SZXN1bWUoKSB7XG4gICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgICBpZiAoY2MuZmluZCgnQ2FudmFzL2xheW91dF9wYXVzZScpLmFjdGl2ZSkgX0cuY29yZVVJLmhpZGVMYXlvdXRBbmltKCdsYXlvdXRfcGF1c2UnKTtcbiAgIH0sXG5cblxuICAgY2xlYXJIaW50KHNwZWNpZmljQ2VsbD86IGNjLk5vZGUpIHtcbiAgICAgIHRoaXMuaXNTaG93aW5nSGludCA9IGZhbHNlO1xuICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBpZiAoc3BlY2lmaWNDZWxsICYmIGNlbGxOb2RlICE9IHNwZWNpZmljQ2VsbCkgcmV0dXJuO1xuICAgICAgICAgY2MuZmluZCgnYm9yZGVyX2hpZ2hsaWdodCcsIGNlbGxOb2RlKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGlmICghc3BlY2lmaWNDZWxsKSBjZWxsTm9kZS5zY2FsZSA9IDE7XG4gICAgICB9KTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIFNVUFBST1RJVkUgRlVOQ1NcbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIGNoZWNrQ2VsbEluQ29ycmVjdFBvcyhjZWxsTm9kZSkge1xuICAgICAgaWYgKCF0aGlzLmlzRml4ZWRDZWxsKGNlbGxOb2RlKSkgcmV0dXJuO1xuICAgICAgY29uc3QgbWFza05vZGUgPSBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpO1xuICAgICAgbWFza05vZGUud2lkdGggPSBjZWxsTm9kZS53aWR0aDtcbiAgICAgIG1hc2tOb2RlLmhlaWdodCA9IGNlbGxOb2RlLmhlaWdodDtcbiAgICAgIF9HLmF1ZGlvLnBsYXlTb3VuZCgnY29ycmVjdHBpZWNlJyk7XG4gICAgICBfRy5jb3JlRlgub25Db3JyZWN0Q2VsbFBvcyhjZWxsTm9kZSk7XG4gICB9LFxuXG5cbiAgIGlzRml4ZWRDZWxsKGNlbGxOb2RlKSB7XG4gICAgICByZXR1cm4gY2VsbE5vZGUuY2VsbFBvcy54ID09IGNlbGxOb2RlLm9yZ0NlbGxQb3MueCAmJiBjZWxsTm9kZS5jZWxsUG9zLnkgPT0gY2VsbE5vZGUub3JnQ2VsbFBvcy55O1xuICAgfVxuXG5cbn0iXX0=