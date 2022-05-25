import * as _G from '../system/all_modules';
const { _, $ } = _G;

export const gameMechanic = {
   currentHintCellNodeArr: [],
   isShowingHint: false,

   lastCategoryName: '',
   lastFrameName: '',
   currentCategoryName: '',
   currentFrameName: '',
   currentSizeMode: '3x3', // default for tut

   isPaused: true,
   timeRemaining: 0,
   timeTickUnit: 0.2,

   timerNode: null as cc.Node,
   isLevelUp: false,

   init() {
      cc.director.getCollisionManager().enabled = true;
      this.timerNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/label_time');
      _.setInterval(() => this.timerTickFunc(), this.timeTickUnit * 1000);
   },


   timerTickFunc() {
      if (!this.isPlaying() || this.isPaused || _G.tutorial.isShowingTut) return;
      this.timeRemaining = _.max(this.timeRemaining - this.timeTickUnit, 0);

      const str = _.secondsToTimeCountdown(_.ceil(this.timeRemaining));
      _G.utilsUI.fillLabel(this.timerNode, str);

      if (this.timeRemaining == 0) return this.onLose();
   },


   previewGame(categoryName, frameName, maxCellX = 3, maxCellY = 3, isFromCategory = false) {
      if (!isFromCategory && !this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial') return;

      this.currentSizeMode = maxCellX + 'x' + maxCellY
      _G.coreUI.onTabPreview(this.currentSizeMode);

      _G.coreUI.setUIPlayState((_G.user.isVersionV2 && isFromCategory) ? _G.types.gameState.v2 : _G.types.gameState.pick_mode);

      const levelInfo = { maxCellX, maxCellY, categoryName, frameName };
      this.currentCategoryName = categoryName;
      this.currentFrameName = frameName;
      _G.control.clearSelectedCellNode();

      _G.coreUI.showNagScreen();
      _G.mapVisual.clearMap(() => {
         _G.coreUI.hideNagScreen();

         // check the frame is loaded to show. Unless show loading
         const loadingLabelNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/label_game_loading');
         loadingLabelNode.active = true;
         _.waitToRun(() => {
            _G.coreUI.showNagScreen();
            loadingLabelNode.active = false;
            _G.mapVisual.render(levelInfo, () => {
               // _.log(`calling _G.coreFX.showGrid() after mapVisual.render()`);
               _G.coreFX.showGrid(() => _G.coreUI.hideNagScreen());
            });

            if (this.lastCategoryName != this.currentCategoryName || this.lastFrameName != this.currentFrameName) {
               this.lastCategoryName = this.currentCategoryName;
               this.lastFrameName = this.currentFrameName;
               _G.analytic.logViewContent(this.currentCategoryName, this.currentFrameName);
            }
         }, 'isCurrentFrameLoaded()', this);

      });

      _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
   },


   startGame() {
      if (!this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial') return;
      if (this.currentSizeMode == '1x1') this.previewGame(this.currentCategoryName, this.currentFrameName, 3, 3);

      this.timeRemaining = _G.configGame.playTime[this.currentSizeMode == '1x1' ? '3x3' : this.currentSizeMode];
      _G.coreUI.setUIPlayState(_G.types.gameState.playing);
      this.timerTickFunc();

      _G.coreUI.updatePuzzleProgressBar(0);
      _G.coreFX.hideGrid(() => {
         this.shuffleCells(() => {
            // _.log(`calling _G.coreFX.showGrid() after gameMechanic.shuffleCells()`);
            _G.coreFX.showGrid();
            this.updatePuzzleCompletionBar();
         });
      });

      if (!_G.tutorial.isShowingTut) this.onResume();
   },


   replay() {
      this.currentSizeMode = (this.currentSizeMode == '1x1') ? '3x3' : this.currentSizeMode;
      const currentSizeArr = this.currentSizeMode.split('x');
      this.previewGame(this.currentCategoryName, this.currentFrameName, parseInt(currentSizeArr[0]), parseInt(currentSizeArr[1]));
      this.startGame();
   },

   // when user won a puzzle, pick a random puzzle that he has not played 
   playNextRandomPuzzle() {
      const newPuzzleIdArr = _G.categoryList.frameNodeArr
         .map(node => `${node.categoryName}_${node.name}`)
         .filter(puzzleId => !_G.user.playedGames[puzzleId])
      const newPuzzleId = _.randomArrItem(newPuzzleIdArr) || _.randomArrItem(Object.keys(_G.user.playedGames));
      // _.log(`onWinContinue >> newPuzzleId = ${newPuzzleId} // newPuzzleIdArr=`, newPuzzleIdArr);

      const tmpArr = newPuzzleId.split('_');
      _G.resources.loadSingleFrame(tmpArr[0], tmpArr[1]);
      this.previewGame(tmpArr[0], tmpArr[1], 3, 3, true);
   },


   isCurrentFrameLoaded() {
      if (_G.tutorial.isShowingTut || _G.tutorial.isCurrentPuzzleTutorial()) return true;
      return _G.resources.frameSprites[this.currentCategoryName][this.currentFrameName];
   },


   shuffleCells(callback?: Function) {
      if (_G.tutorial.isShowingTut) return this.shuffleCellsForTut(callback);

      // generate random cell position
      const randomCellPosArr = [];
      let orderIndex = 0;
      for (let x = 1; x <= _G.mapVisual.currentMaxCellX; x++) {
         for (let y = 1; y <= _G.mapVisual.currentMaxCellY; y++) {
            randomCellPosArr.push({ x, y, orderIndex: orderIndex++ });
         }
      }
      _.shuffleArray(randomCellPosArr);

      // check if too many cells are in their correct positions
      let correctedCellNum = 0;
      const toltalCellNum = _G.mapVisual.currentMaxCellX * _G.mapVisual.currentMaxCellY;
      const maxCorrectCellRatio = 0.35;
      const isTooManyCorrectedCells = randomCellPosArr.some((cellPosInfo, index) => {
         if (index == cellPosInfo.orderIndex) correctedCellNum++;
         if (correctedCellNum / toltalCellNum > maxCorrectCellRatio) return true;
      });
      // _.log(`shuffleCells >> isTooManyCorrectedCells = ${isTooManyCorrectedCells} // correctedCellNum (${correctedCellNum}) / toltalCellNum(${toltalCellNum}) = ${correctedCellNum / toltalCellNum} `);
      if (isTooManyCorrectedCells) return this.shuffleCells(callback);

      // set real cell pos
      _G.mapVisual.gridNode.children.map((childNode, i) => {
         _G.mapVisual.setCellNodePos(childNode, randomCellPosArr[i].x, randomCellPosArr[i].y);
      });

      if (callback) callback();
   },


   shuffleCellsForTut(callback) {
      const cellPosArr = [
         { x: 3, y: 3 },
         { x: 1, y: 1 },
         { x: 3, y: 1 },
         { x: 1, y: 3 },
         { x: 2, y: 3 }, // -- must keep at index=4 (5th elem in arr)
         { x: 2, y: 2 }, // -- must keep at index=5 (6th elem in arr)
         { x: 2, y: 1 },
         { x: 1, y: 2 },
         { x: 3, y: 2 },
      ];

      const cellNodeArr = _G.mapVisual.gridNode.children;
      cellNodeArr.map((cellNode, index) => _G.mapVisual.setCellNodePos(cellNode, cellPosArr[index].x, cellPosArr[index].y));

      const cellNode1 = _G.tutorial.cellNode1 = cellNodeArr[5];
      const cellNode2 = _G.tutorial.cellNode2 = cellNodeArr[4];
      // _G.mapVisual.setCellNodePos(cellNode1, cellNode2.orgCellPos.x, cellNode2.orgCellPos.y);
      // _G.mapVisual.setCellNodePos(cellNode2, cellNode1.orgCellPos.x, cellNode1.orgCellPos.y);

      cellNodeArr.map(cellNode => {
         this.checkCellInCorrectPos(cellNode);
      })

      if (callback) callback();
   },

   updatePuzzleCompletionBar() {
      let correctCellCount = 0;
      let wrongCellCount = 0;
      _G.mapVisual.gridNode.children.map(cellNode => {
         if (this.isFixedCell(cellNode)) correctCellCount++;
         else wrongCellCount++;
      });
      _G.coreUI.updatePuzzleProgressBar(correctCellCount / (wrongCellCount + correctCellCount), 0.2);
   },

   onSwapCell(cellNode1, cellNode2) {
      _G.gameMechanic.clearHint();
      _G.coreUI.showNagScreen();
      _G.mapVisual.swapCellAnim(cellNode1, cellNode2, () => {
         _G.coreUI.hideNagScreen();
         this.checkCellInCorrectPos(cellNode1);
         this.checkCellInCorrectPos(cellNode2);
         this.updatePuzzleCompletionBar();
         this.checkWin();

         _G.tutorial.checkOnSwapCells();
      });
   },


   checkWin() {
      const isWin = _G.mapVisual.gridNode.children.every(cellNode => this.isFixedCell(cellNode));
      _.log(` isWin = ${isWin} `);
      if (!isWin) return;
      this.onPause();

      const starToAdd = _G.configGame.winCoinReward[this.currentSizeMode];
      _G.user.addStars(starToAdd, true);
      _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/star_num_base/label_stars'), '+' + starToAdd);
      // _G.utilsUI.fillLabel(this.winTimerNode, this.timerNode.getComponent(cc.Label).string);

      _G.coreUI.setUIPlayState(_G.types.gameState.won);

      this.isLevelUp = _G.user.addExp(_G.configGame.winExp, true);
      if (this.isLevelUp) _G.user.addStars(_G.configGame.levelUpCoinReward, true);

      // save game as played & re-render icon-checked for all frame cells
      const gameName = this.currentCategoryName + '_' + this.currentFrameName;
      if (!_G.user.playedGames[gameName]) {
         _G.user.playedGames[gameName] = 1;
         _G.utilsData.save({ playedGames: _G.user.playedGames });
         _G.categoryList.updateAllIconCheckeds();
      }

      // Play win anim
      _G.coreUI.showNagScreen(3.8);
      _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
      _.setTimeout(() => _G.coreFX.playWinAnim(), 200);

      // copy frame grid to show in "layotu_win"
      _.setTimeout(() => {
         this.copyFrameGridToTarget(cc.find('Canvas/layout_win/dialog/grid/grid_container'));
      }, 2000);
   },

   copyFrameGridToTarget(targetGridNode: cc.Node) {
      targetGridNode.removeAllChildren();
      const gridNode = _.copyNode(_G.mapVisual.gridNode, targetGridNode);
      gridNode.y = 0;
      gridNode.scale = targetGridNode.width / _G.mapVisual.mainFrameWidth;
      gridNode.children.map(cellNode => {
         cc.find('mask', cellNode).width -= 3;
         cc.find('mask', cellNode).height -= 3;
         cellNode.scale = 1;
         cc.find('correct_tile_fx', cellNode).active = false;
      });
   },


   onLose() {
      this.onPause();
      _G.control.clearSelectedCellNode(true);
      _G.coreUI.showNagScreen(0.5);
      _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
      _.setTimeout(() => {
         _G.coreUI.showLayout('layout_game_over');
         _G.coreUI.hideButtonBack();
         _G.mapVisual.gridNode.children.map(cellNode => {
            _G.mapVisual.setCellNodePos(cellNode, cellNode.orgCellPos.x, cellNode.orgCellPos.y, true);
         });
         this.copyFrameGridToTarget(cc.find('Canvas/layout_game_over/dialog/grid/grid_container'));
      }, 200);
   },


   checkToShowLevelUp() {
      if (!this.isLevelUp) return;
      this.isLevelUp = false;

      const labelLevelX = cc.find('Canvas/layout_level_up/dialog/label_level_up_to_level_X');
      _G.localize.translateSingleLabel(labelLevelX, _G.user.level);

      _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_level_up'));
      _G.coreUI.showLayoutAnim('layout_level_up');
      return true;
   },

   onHint() {
      if (this.isShowingHint) return;
      _.setTimeout(() => this.isShowingHint = true);

      const wrongCellNode = _G.mapVisual.gridNode.children.find(cellNode => !this.isFixedCell(cellNode));
      if (!wrongCellNode) return;

      _G.user.addStars(-_G.configGame.hintCoinPrice);

      _G.control.clearSelectedCellNode();
      const wrongCellNode2 = _G.mapVisual.gridNode.children.find(cellNode => {
         return cellNode.cellPos.x == wrongCellNode.orgCellPos.x && cellNode.cellPos.y == wrongCellNode.orgCellPos.y
      });

      this.currentHintCellNodeArr = [wrongCellNode, wrongCellNode2];
      _G.mapVisual.bringCellsToTop(...this.currentHintCellNodeArr);

      const fxTime = 0.2;
      _G.coreUI.showNagScreen(fxTime);
      this.currentHintCellNodeArr.map(cellNode => {
         cc.find('border_highlight', cellNode).active = true;

         cellNode.stopAllActions();
         cc.tween(cellNode).to(fxTime, { scale: 1.15 }).start();
      });

      _.setTimeout(() => {
         this.onSwapCell(this.currentHintCellNodeArr[0], this.currentHintCellNodeArr[1]);
      }, fxTime * 1000);
   },

   isPlaying() {
      return _G.coreUI.currentState == _G.types.gameState.playing;
   },

   onPause(isShowPopupPause?) {
      if (_G.tutorial.isShowingTut) return;
      this.isPaused = true;
      if (isShowPopupPause && !_G.tutorial.isShowingTut && this.isPlaying()
         && !cc.find('Canvas/layout_pause').active
         && !cc.find('Canvas/layout_game_over').active
         && !cc.find('Canvas/layout_alert').active
      ) _G.coreUI.showLayoutAnim('layout_pause');
   },

   onResume() {
      this.isPaused = false;
      if (cc.find('Canvas/layout_pause').active) _G.coreUI.hideLayoutAnim('layout_pause');
   },


   clearHint(specificCell?: cc.Node) {
      this.isShowingHint = false;
      _G.mapVisual.gridNode.children.map(cellNode => {
         if (specificCell && cellNode != specificCell) return;
         cc.find('border_highlight', cellNode).active = false;
         if (!specificCell) cellNode.scale = 1;
      });
   },


   // =====================================================
   // SUPPROTIVE FUNCS
   // =====================================================

   checkCellInCorrectPos(cellNode) {
      if (!this.isFixedCell(cellNode)) return;
      const maskNode = cc.find('mask', cellNode);
      maskNode.width = cellNode.width;
      maskNode.height = cellNode.height;
      _G.audio.playSound('correctpiece');
      _G.coreFX.onCorrectCellPos(cellNode);
   },


   isFixedCell(cellNode) {
      return cellNode.cellPos.x == cellNode.orgCellPos.x && cellNode.cellPos.y == cellNode.orgCellPos.y;
   }


}