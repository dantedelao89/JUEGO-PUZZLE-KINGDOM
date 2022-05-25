"use strict";
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