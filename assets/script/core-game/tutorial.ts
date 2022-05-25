import * as _G from '../system/all_modules';
const { _, $ } = _G;

export const tutorial = {
   frameAvatarInfo: { x: 100, y: 270, width: 585, height: 370, angle: 0 },

   node: null as cc.Node,
   cellNode1: null as cc.Node,
   cellNode2: null as cc.Node,

   isShowingTut: false,
   hiddenNodeArr1: null,
   hiddenNodeArr2: null,
   currentStep: 0,

   init() {
      this.node = cc.find('Canvas/layout_tutorial');

      this.hiddenNodeArr1 = [
         // cc.find('btn_back', _G.coreUI.headerContainer),
         cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer),
      ];
      this.hiddenNodeArr2 = [
         cc.find('time_level_bar', _G.coreUI.playGridContainer),
         // cc.find('playing_button_bar', _G.coreUI.playGridContainer),
      ];

      _G.user.addInitCallback(data => {
         // _.log(`tutorial.init() ==>>> data.isNewUser = ${data.isNewUser} //  _G.user.entryPointData.puzzle_id = ${_G.user.entryPointData.puzzle_id} `);

         if (!data.isNewUser || _G.user.isPuzzleSpecified) return _G.coreUI.hideLayout('layout_tutorial');

         if (!window['FBInstant']) this.start();
         else _.waitToRun(() => this.start(), 'isRealAvatarLoaded', _G.mapVisual, 0.1, 4, () => this.start());
      });
   },

   isCurrentPuzzleTutorial() {
      return _G.gameMechanic.currentCategoryName == 'tutorial';
   },

   isClickableCell(cellNode) {
      if (!this.isShowingTut) return true;
      return cellNode == this.cellNode1 || cellNode == this.cellNode2;
   },

   checkOnSwapCells() {
      if (this.isShowingTut && this.currentStep == 1) _.setTimeout(() => this.showStep2(), 1000);
   },


   //============= on tut start
   start() {
      this.isShowingTut = true;
      this.currentStep = 1;

      // render special puzzle
      _G.gameMechanic.previewGame('tutorial', 'tutorial', 3, 3);
      _G.gameMechanic.startGame();

      // set up UI
      [...this.hiddenNodeArr1, ...this.hiddenNodeArr2].map(node => node.active = false);
      cc.find('texts/label_tut_step_1', this.node).active = true;

      // fake the level time bar
      const fakeTimeBarContainer = cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer);
      const fakeTimeBar = _.copyNode(cc.find('time_level_bar', _G.coreUI.playGridContainer), fakeTimeBarContainer);
      fakeTimeBar.children.map(childNode => childNode.y = 100);
      fakeTimeBar.y = -120;
      fakeTimeBar.active = true;


      // -------------------------------------------------
      const { colliderNode, containerNode } = _G.categoryList;
      const fakeColliderNode = _.copyNode(colliderNode, colliderNode.parent);
      colliderNode.scale = fakeColliderNode.scale = containerNode.scale = 0.0001;
      // containerNode.opacity = 0;
      _.setGlobalPosToNode(fakeColliderNode, containerNode);
      // _.log(`fakeColliderNode.height = ${fakeColliderNode.height}`);
      fakeColliderNode.height *= 2;
      _.setTimeout(() => fakeColliderNode.removeFromParent(true), 100);

      // start hand animation
      cc.find('black_layer', this.node).active = true;
      _G.coreUI.showLayout(this.node);
      const handNode = cc.find('tut_hand', this.node);

      _.waitToRun(() => {
         _.setGlobalPosToNode(handNode, this.cellNode1);
         const gPosDiff = _.getGlobalPosDiff(this.cellNode1, this.cellNode2);

         cc.tween(handNode).repeatForever(
            cc.tween()
               .by(0.4, { scale: -0.3 })
               .by(0.4, { scale: 0.3 })
               .by(1, { position: gPosDiff })
               .by(0.4, { scale: -0.3 })
               .by(0.4, { scale: 0.3 })
               .by(1, { position: gPosDiff.mul(-1) })
         ).start();

      }, 'cellNode1', this);
   },


   showStep2() {
      this.currentStep = 2;

      // remove block inpout for fake btnHint
      cc.find('block_inputs/block_input_2', this.node).active = false;

      cc.find('texts/label_tut_step_1', this.node).active = false;

      const labelNode2 = cc.find('texts/label_tut_step_2', this.node);
      labelNode2.active = true;

      const fakeBtnHint = cc.find('fake_buttons/btn_hint', this.node);

      const handNode = cc.find('tut_hand', this.node);
      handNode.stopAllActions();
      handNode.scale = 1;
      handNode.angle = -140;
      _.setGlobalPosToNode(handNode, fakeBtnHint);
      handNode.x -= 30;
      handNode.y += 30;

      cc.tween(handNode).repeatForever(
         cc.tween()
            .by(0.4, { scale: -0.3 })
            .by(0.4, { scale: 0.3 })
            .delay(1)
      ).start();

      fakeBtnHint.active = true;
      _G.utilsUI.makeBubbleButton(fakeBtnHint, () => {
         cc.find('disabled', fakeBtnHint).active = true;
         _G.gameMechanic.onHint();
         handNode.active = false;
         _.setTimeout(() => {
            fakeBtnHint.active = false;
            this.showStep3();
         }, 1000);
      });

   },


   //============= on tut done
   showStep3() {
      const delayTime = 1.3;
      _G.coreUI.showNagScreen(delayTime);

      cc.find('tut_hand', this.node).active = false;

      // show black screen with message
      _.setTimeout(() => {
         this.hiddenNodeArr1.map(node => node.active = true);

         const { colliderNode, containerNode } = _G.categoryList;
         colliderNode.scale = containerNode.scale = 1;
         containerNode.opacity = 255;

         _.setTimeout(() => {
            cc.find('black_layer', this.node).active = false;
            cc.find('texts', this.node).active = false;
         }, 300);

         cc.find('fake_buttons/play_time', this.node).active = true;
         cc.find('bg', this.node).active = true;
         cc.find('dialog', this.node).active = true;
         _G.coreUI.showLayoutAnim(this.node, 210);
      }, delayTime * 600);
   },


   onBtnContinue() {
      cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer).removeAllChildren();
      _G.coreUI.hideLayoutAnim('layout_tutorial');
      cc.find('time_level_bar', _G.coreUI.playGridContainer).active = true;
      this.isShowingTut = false;
      _G.gameMechanic.onResume();
   },


}