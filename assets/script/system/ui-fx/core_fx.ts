import * as _G from '../../system/all_modules';
const { _, $ } = _G;


export const coreFX = {
   fxContainer: null as cc.Node,

   init() {
      this.startClockFx();
      this.fxContainer = cc.find('Canvas/fx_container');

      cc.tween(cc.find('Canvas/layout_home/dialog/game_logo')).repeatForever(
         cc.tween().by(0.7, { scale: 0.1 }).by(0.7, { scale: -0.1 })
      ).start();
   },

   startClockFx() {
      const clockNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/clock');
      clockNode.angle = 10;
      cc.tween(clockNode).repeatForever(
         cc.tween().to(0.5, { angle: -20 }).to(0.5, { angle: 20 })
      ).start();
   },

   showVideoError(startPosY) {
      const sampleNode = cc.find('Canvas/sample_nodes/tooltip_video_err');
      const fxNode = _.copyNode(sampleNode, this.fxContainer);
      _G.localize.translateSingleLabel(cc.find('label_fx_video_error', fxNode));
      fxNode.y = startPosY;
      fxNode.active = true;
      cc.tween(fxNode).by(1.5, { opacity: -255, y: 200 }).call(() => fxNode.removeFromParent(true)).start();
   },


   // =============================================
   // show grid

   showGrid(callback?: Function) {
      const interval = 0.02;
      const childNodeArr = _G.mapVisual.gridNode.children;
      childNodeArr.map((cellNode, index) => {
         this.showCell(cellNode, interval * index);
      });

      const timeWait = childNodeArr.length * interval * 1000 + 250;
      _.setTimeout(() => callback && callback(), timeWait);
   },

   showCell(cellNode: cc.Node, delay = 0) {
      const fxTime1 = 0.15;
      const fxTime2 = 0.08;
      cellNode.stopAllActions();
      cellNode.scale = 0;
      cc.tween(cellNode).delay(delay)
         .to(fxTime1, { scale: 1.08 })
         .to(fxTime2, { scale: 1 })
         .start();
   },



   // =============================================
   // hide grid

   hideGrid(callback?: Function) {
      const interval = 0.02;
      const childNodeArr = _G.mapVisual.gridNode.children;
      childNodeArr.map((cellNode, index) => {
         this.hideCell(cellNode, interval * index);
      });
      const timeWait = childNodeArr.length * interval * 1000 + 400;
      // _.log(`hideGrid >> timeWait = ${timeWait} // childNodeArr.length=${childNodeArr.length} `);
      _.setTimeout(() => callback && callback(), timeWait);
   },


   hideCell(cellNode: cc.Node, delay = 0) {
      const fxTime1 = 0.2;
      const fxTime2 = 0.15;
      cellNode.stopAllActions();
      cc.tween(cellNode).delay(delay)
         .to(fxTime1, { scale: 1.08 })
         .to(fxTime2, { scale: 0 })
         .start();
   },


   onCorrectCellPos(cellNode: cc.Node) {
      const fxNode = cc.find('correct_tile_fx', cellNode);
      fxNode.width = cellNode.width;
      fxNode.height = cellNode.height;
      fxNode.opacity = 255;
      cc.tween(fxNode).to(0.6, { opacity: 0 }).start();
   },


   // level icon shine a little to attract attention
   highlightIconLevel(middleCallback?: Function) {
      const expProgressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar');
      const levelNum = cc.find('level/level_num', expProgressBar);
      const levelBg = cc.find('level/bg', expProgressBar);
      const levelLight = cc.find('level/light_effect 1', expProgressBar);

      const anim = cc.tween().by(0.4, { scale: 0.7 }).delay(0.7).by(0.4, { scale: -0.7 });
      anim.clone(levelNum).start();
      anim.clone(levelBg).start();
      cc.tween(levelLight).to(0.4, { opacity: 255 }).delay(0.7).to(0.4, { opacity: 0 }).start();

      _.setTimeout(() => middleCallback && middleCallback(), 400);
   },


   rotateForever(node: cc.Node, angleFactor = 1) {
      cc.tween(node).repeatForever(cc.tween().by(10, { angle: -360 * angleFactor })).start();
   },


   fxShowPopupHeader(popupNode: cc.Node) {
      const headerNode = cc.find('dialog/header', popupNode);
      const lightNode = cc.find('light_fx', headerNode);
      const starNodeArr = [cc.find('star1', headerNode), cc.find('star2', headerNode), cc.find('star3', headerNode)];

      starNodeArr.map((starNode, i) => {
         starNode.orgScale = starNode.orgScale || starNode.scale;
         starNode.stopAllActions();
         starNode.scale = 0;
         starNode.angle = 0;
         _.setTimeout(() => {
            cc.tween(starNode).delay(i * 0.3).to(0.5, { scale: starNode.orgScale + 0.5, angle: -360 }).by(0.2, { scale: -0.5 }).start();
         }, 300);
      });

      lightNode.stopAllActions();
      lightNode.children[0].stopAllActions();
      lightNode.orgScale = lightNode.orgScale || lightNode.scale;
      lightNode.scale = 0;
      _.setTimeout(() => {
         this.rotateForever(lightNode);
         this.rotateForever(lightNode.children[0], -2);
         cc.tween(lightNode).delay(1).to(0.4, { scale: lightNode.orgScale }).start();
      }, 300);
   },


   // fx stars fly to star-count at top
   isPlayingFxStarsAdd: false,
   isPlayingFxExpAdd: false,
   fxAddCoins(baseNode: cc.Node, amount) {
      this.isPlayingFxStarsAdd = true;
      _.setTimeout(() => this.isPlayingFxStarsAdd = false, 2000);

      _.setTimeout(() => _G.audio.playSound('star_collect'), 1000);
      const targetNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1');
      const sampleParticleNode = cc.find('Canvas/sample_nodes/coin');

      // coins fly
      _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);

      // increasing label
      const labelNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1/label_stars');

      const currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
      _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
   },


   fxAddExp(baseNode: cc.Node, amount) {
      _.setTimeout(() => _G.audio.playSound('exp_collect'), 1000);
      const targetNode = cc.find('Canvas/layout_win/dialog/exp_progress_bar/exp_target');
      const sampleParticleNode = cc.find('Canvas/sample_nodes/exp_icon');

      // coins fly
      _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);

      // increasing label
      const labelNode = cc.find('Canvas/layout_fixed_header/header/exp_icon/label_exp');

      const currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
      _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
   },


   // animation for winning
   playWinAnim() {
      const expFlyTime = 0.5;
      const expFlyDelay = 0.05;
      const allExpDelay = 1;
      const sampleExpNode = cc.find('Canvas/sample_nodes/exp_icon');
      const expTargetNode = cc.find('time_level_bar/exp_target', _G.coreUI.playGridContainer);

      const cellNodeArr = _G.mapVisual.gridNode.children;
      cellNodeArr.sort((A, B) => {
         if (A.cellPos.x != B.cellPos.x) return (A.cellPos.x > B.cellPos.x ? 1 : -1)
         else return (A.cellPos.y < B.cellPos.y ? 1 : -1)
      });

      cellNodeArr.map((cellNode, index) => {
         const expFxNode = _.copyNode(sampleExpNode, this.fxContainer);
         _.setGlobalPosToNode(expFxNode, cellNode);
         cc.tween(expFxNode).to(0.3, { opacity: 255 }).delay(index * expFlyDelay + allExpDelay).call(() => {
            _G.utilsAnimFx.nodeFlyFromAtoB(expFxNode, expTargetNode, expFlyTime, () => {
               _.setTimeout(() => expFxNode.removeFromParent(true), 300);
            });
         }).start();
      });

      _.setTimeout(() => {
         _G.audio.playSound('exp_collect');
      }, (allExpDelay + expFlyTime + 0.2) * 1000);

      _.setTimeout(() => {
         _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_win'));
         _G.coreUI.showLayoutAnim('layout_win');
         _G.audio.playSound('puzzlecompleted');
      }, 2400);
   },


   isPlayingClaimAnim: false,
   playWinClaimAnim() {
      if (this.isPlayingClaimAnim) return;
      this.isPlayingClaimAnim = true;

      const isLevelUp = _G.gameMechanic.isLevelUp;
      const totalWaitTime = isLevelUp ? 4.1 : 2.2;
      _G.coreUI.showNagScreen(totalWaitTime);

      // play aimation collect coins & exp
      _G.coreFX.fxAddCoins(
         cc.find('Canvas/layout_win/dialog/star_num_base/star2_big 1'),
         _G.configGame.winCoinReward[_G.gameMechanic.currentSizeMode]
      );

      _G.coreFX.fxAddExp(
         cc.find('Canvas/layout_win/dialog/exp_num_base/exp_icon'),
         _G.configGame.winExp
      );

      // anim progress bar get filled & label level transform
      _.setTimeout(() => _G.coreUI.updateLevelProgressBar(0.7), 1000);
      if (isLevelUp) _.setTimeout(() => this.highlightIconLevel(() => _G.coreUI.updateLevelNumber()), 1700);

      // hide layout_win
      _.setTimeout(() => {
         _G.coreUI.hideLayoutAnim('layout_win', () => {
            this.isPlayingClaimAnim = false;
            const isLevelUp = _G.gameMechanic.checkToShowLevelUp();
            if (!isLevelUp) _G.gameMechanic.playNextRandomPuzzle();
         });
      }, totalWaitTime * 1000);
   },

}