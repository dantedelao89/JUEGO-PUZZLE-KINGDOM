import * as _G from '../../system/all_modules';
const _ = _G._;

const gameState = _G.types.gameState;

import { bindButtonHandlers } from './bind_button_handlers';
export const coreUI = {
   alertOKCallback: null as Function,
   tabButtonContainer: null as cc.Node,
   masterScrollViewNode: null as cc.Node,
   masterScrollViewComp: null as cc.ScrollView,
   masterScrollViewContent: null as cc.Node,
   playGridContainer: null as cc.Node,
   headerContainer: null as cc.Node,
   puzzleProgressBar: null as cc.Node,
   btnHintDisabledNode: null as cc.Node,

   currentState: gameState.category,

   init() {
      this.adjustUI();
      this.masterScrollViewNode = cc.find('Canvas/play_area/scrollview_master');
      this.masterScrollViewComp = this.masterScrollViewNode.getComponent('NestableScrollView_Outer');

      this.masterScrollViewContent = this.playGridContainer = cc.find('view/content', this.masterScrollViewNode);
      this.playGridContainer = cc.find('grid_area', this.masterScrollViewContent);
      this.puzzleProgressBar = cc.find('puzzle_progress_bar', this.masterScrollViewContent);
      this.headerContainer = cc.find('Canvas/layout_fixed_header/header');

      this.tabButtonContainer = cc.find(`size_tabs`, this.playGridContainer);
      this.btnHintDisabledNode = cc.find('playing_button_bar/btn_hint/disabled', this.playGridContainer);

      this.setupLocalization();

      bindButtonHandlers.run();

      _G.user.addInitCallback(data => {
         this.setUIPlayState((data.isNewUser || _G.user.isPuzzleSpecified) ? gameState.playing : gameState.category);
         cc.tween(this.masterScrollViewNode).to(0.3, { opacity: 255 }).start();
      });

      this.handleUIForV2();
      this.fillConfigToUI();

      // if (window['FBInstant']) {
      //    _G.utilsUI.fillLabel(cc.find('user_bar/label_username', this.headerContainer), FBInstant.player.getName());
      // }
   },


   showLoadingAds(callBack?: Function) {
      const layoutNode = cc.find('Canvas/layout_loading_ad');
      const dialog = cc.find('dialog', layoutNode);
      dialog.opacity = 0;
      dialog.x = -dialog.width / 2;
      layoutNode.active = true;
      cc.tween(dialog)
         .to(0.3, { x: 0, opacity: 255 })
         .delay(2)
         .to(0.3, { x: dialog.width / 2, opacity: 0 })
         .call(() => {
            callBack && callBack();
            _.setTimeout(() => this.hideLayout('layout_loading_ad'), 100);
         })
         .start();
   },


   setupLocalization() {
      _G.localize.subscribeTranslate(this.headerContainer);
      _G.localize.subscribeTranslate(cc.find('Canvas/play_area/scrollview_master'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_win'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_level_up'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_settings'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_alert'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_tutorial'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_pause'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_game_over'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_home'));
      _G.localize.subscribeTranslate(cc.find('Canvas/shares'));
      _G.localize.subscribeTranslate(cc.find('Canvas/layout_loading_ad'));

      const handleSharePicLabelGlow = () => {
         const labelGlow = cc.find('Canvas/shares/picture/overlay/text_glow');
         const labelIntroNode = cc.find('Canvas/shares/picture/label_share_intro_1')
         cc.find('Canvas/shares').active = true;
         _.setTimeout(() => {
            labelGlow.height = (labelIntroNode.height + 30) / labelGlow.scale;
            labelGlow.width = (_.min(725, labelIntroNode.width + 50)) / labelGlow.scale;
            cc.find('Canvas/shares').active = false;
         })
      }
      _G.localize.addInitCallback(handleSharePicLabelGlow);
      _G.localize.languageChangeCallbackArr.push(handleSharePicLabelGlow);
   },


   fillConfigToUI() {
      // level up stars
      _G.utilsUI.fillLabel(
         cc.find('Canvas/layout_level_up/dialog/star_num_base/label_stars'),
         '' + _G.configGame.levelUpCoinReward
      );

      // hint stars
      _G.utilsUI.fillLabel(cc.find('playing_button_bar/btn_hint/label_game_btn_hint/label_stars', this.playGridContainer), '' + _G.configGame.hintCoinPrice);
      _G.utilsUI.fillLabel(cc.find('label_game_btn_hint/label_stars', this.btnHintDisabledNode), '' + _G.configGame.hintCoinPrice);

      // win coins
      this.tabButtonContainer.children.map(btnNode => {
         const coinNumber = _G.configGame.winCoinReward[btnNode.name];
         _G.utilsUI.fillLabel(cc.find('coin_label', btnNode), '' + coinNumber);
      });
   },



   // users from social posts
   handleUIForV2() {
      if (!_G.user.isVersionV2) return;
      cc.find('btn_back', this.headerContainer).active = true;
      cc.find('btn_settings', this.headerContainer).x = -255;
   },


   showButtonBack() {
      cc.find('btn_back', this.headerContainer).active = true;
   },

   hideButtonBack() {
      cc.find('btn_back', this.headerContainer).active = false;
   },

   // =================================================================
   // UI SIZE ADJUSTMENT
   // =================================================================

   // adjuts UI to fit
   adjustUI() {
      const maxRatio = 720 / 1280;
      const actualRatio = cc.winSize.width / cc.winSize.height;
      if (actualRatio > maxRatio) {
         cc.find('Canvas').getComponent(cc.Canvas).fitWidth = false;
         cc.find('Canvas').getComponent(cc.Canvas).fitHeight = true;
      }

      // make layout height = windows height
      const layoutArr = [
         'Canvas/play_area',
         'Canvas/bg',
         'Canvas/control_layer',
         'Canvas/layout_win',
         'Canvas/layout_settings',
         'Canvas/fx_container',
         'Canvas/nag_screen',
         'Canvas/layout_fixed_header',
         'Canvas/layout_tutorial',
      ].map(path => {
         const layerNode = cc.find(path);
         layerNode.height = cc.winSize.height;
      });
   },


   // =================================================================
   // SETUP GAME PLAY STATE: PICK MODE/ PLAYING/ WON
   // =================================================================

   setUIPlayState(state: _G.types.gameState) {
      this.currentState = state;

      const btnBack = cc.find('btn_back', this.headerContainer);
      const btnPlay = cc.find('btn_play', this.playGridContainer);
      const btnPlayV2 = cc.find('btn_play_v2', this.playGridContainer);
      const btnShare = cc.find('btn_share', this.playGridContainer);

      const sizeTabsIntro = cc.find('size_tabs_intro', this.playGridContainer);
      const playingBtnBar = cc.find('playing_button_bar', this.playGridContainer);
      const playTimeLevelBar = cc.find('time_level_bar', this.playGridContainer);
      const fakeTimeStack = cc.find('fake_time_stack', this.playGridContainer);

      const gridStack = cc.find('grid_stack', this.playGridContainer);
      const gridStackBg = cc.find('grid_bg', gridStack);
      const gridCover = cc.find('grid_cover', gridStack);
      const dummyStack = cc.find('dummy_stack', this.playGridContainer.parent);
      const labelMorePuzzle = cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer);

      const level = cc.find('level', this.puzzleProgressBar) || {};

      let activeNodeArr, hiddenNodeArr;
      if (state == gameState.category) {
         activeNodeArr = [level, dummyStack, btnBack];
         hiddenNodeArr = [this.playGridContainer, this.puzzleProgressBar, labelMorePuzzle, btnPlayV2, btnShare];
      }

      else if (state == gameState.pick_mode) {
         activeNodeArr = [this.playGridContainer, this.tabButtonContainer, sizeTabsIntro, btnPlay, gridCover, btnBack];
         hiddenNodeArr = [playingBtnBar, playTimeLevelBar, fakeTimeStack, level, this.puzzleProgressBar, dummyStack, labelMorePuzzle, btnPlayV2, btnShare];
         gridStack.scale = 0.88;
         gridStackBg.scale = 1;
      }

      else if (state == gameState.playing || state == gameState.won) {
         activeNodeArr = [this.playGridContainer, playTimeLevelBar, fakeTimeStack, playingBtnBar, btnBack, level, this.puzzleProgressBar];
         hiddenNodeArr = [this.tabButtonContainer, sizeTabsIntro, gridCover, btnPlay, dummyStack, labelMorePuzzle, btnPlayV2, btnShare];
         gridStack.scale = 1;
         gridStackBg.scale = 1;
      }

      else if (state == gameState.v2) {
         activeNodeArr = [this.playGridContainer, btnBack, gridCover, labelMorePuzzle, btnPlayV2, btnShare];
         hiddenNodeArr = [this.tabButtonContainer, playingBtnBar, this.puzzleProgressBar, level, fakeTimeStack, playTimeLevelBar, sizeTabsIntro, btnPlay, dummyStack];
         gridStack.scale = 0.994;
         gridStackBg.scale = 0.98;
      }

      // set active/ hidden
      activeNodeArr.map(node => node.active = true);
      hiddenNodeArr.map(node => node.active = false);
      if (_G.user.isPuzzleSpecified) {
         btnBack.active = false;
      }
   },



   // =================================================================
   // =================================================================

   // --- THE TAB 3x3 & 5x5
   onTabPreview(size: '3x3' | '4x4' | '5x5' | '6x6') {
      this.tabButtonContainer.children.map(btnNode => {
         const isFocus = btnNode.name.includes(size);
         cc.find('bg_on', btnNode).active = isFocus;
         cc.tween(btnNode).to(0.2, { scale: isFocus ? 1 : 0.8 }).start();
      });
   },


   // --- BACK
   back() {
      const gMechanic = _G.gameMechanic;
      if (this.currentState == gameState.category) {
         _G.coreUI.hideButtonBack();
         return this.showLayout('layout_home');
      }
      if (this.currentState == gameState.pick_mode) return this.setUIPlayState(gameState.category);
      if (this.currentState == gameState.playing /*|| this.currentState == gameState.won*/) {
         if (_G.tutorial.isCurrentPuzzleTutorial()) {
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
         }
         else gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
         // _G.interAd.checkToShowInterAd();
      }
   },


   // =================================================================
   // LAYOUTS
   // =================================================================

   // =======
   showLayout(layout: cc.Node | string) {
      const layoutNode: cc.Node = (_.isString(layout) ? cc.find(`Canvas/${layout}`) : layout);
      layoutNode.active = true;
   },

   hideLayout(layout: cc.Node | string) {
      const layoutNode: cc.Node = (_.isString(layout) ? cc.find(`Canvas/${layout}`) : layout);
      layoutNode.active = false;
   },


   // === with animations
   showLayoutAnim(layout: cc.Node | string, bgOpacity?) {
      this.showNagScreen(0.4);
      const layoutNode: cc.Node = (_.isString(layout) ? cc.find(`Canvas/${layout}`) : layout);

      const dialogNode = cc.find('dialog', layoutNode);
      const bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
      bgNode.stopAllActions();
      dialogNode.stopAllActions();

      dialogNode.scale = 0;
      bgNode.opacity = 0;
      layoutNode.active = true;

      cc.tween(bgNode).to(0.3, { opacity: bgOpacity || 200 }).start();
      cc.tween(dialogNode).to(0.3, { scale: 1.03 }).to(0.1, { scale: 1 }).start();
      this.hideButtonBack();
   },

   hideLayoutAnim(layout: cc.Node | string, callback?: Function) {
      this.showNagScreen(0.4);
      const layoutNode: cc.Node = (_.isString(layout) ? cc.find(`Canvas/${layout}`) : layout);

      const dialogNode = cc.find('dialog', layoutNode);
      const bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
      layoutNode.active = true;

      bgNode.stopAllActions();
      dialogNode.stopAllActions();

      cc.tween(bgNode).to(0.3, { opacity: 0 }).start();
      cc.tween(dialogNode).to(0.2, { scale: 1.06 }).to(0.2, { scale: 0 }).call(() => {
         layoutNode.active = false;
      }).call(() => callback && callback()).start();
      this.showButtonBack();
   },



   // ========
   showAlert(msg, okCallback?: Function) {
      this.showLayout("layer_alert");
      _G.utilsUI.fillLabel(cc.find('Canvas/layer_alert/bg_msg/label_msg'), msg);
      this.alertOKCallback = okCallback;
   },

   // =======
   hideLoadingTimer: null,
   showLoading() {
      this.showLayout("layer_loading");

      // auto turn off loading if shown more than 10 secs but not being turned off
      if (this.hideLoadingTimer) clearTimeout(this.hideLoadingTimer);
      this.hideLoadingTimer = setTimeout(() => this.hideLoading(), 10000);
   },
   hideLoading() {
      this.hideLayout("layer_loading");
      if (this.hideLoadingTimer) clearTimeout(this.hideLoadingTimer);
   },


   // =========
   // nag screen: prevent user from clicking buttons while showing animations
   showNagScreen(timeout?: number) {
      cc.find('Canvas/nag_screen').active = true;
      if (timeout) _.setTimeout(() => this.hideNagScreen(), timeout * 1000);
   },
   hideNagScreen() {
      cc.find('Canvas/nag_screen').active = false;
   },


   // ====== Some system labels ================
   // update gold to all places in game ui
   updateUserStats(isSkipUpdateUI = false) {
      // coins
      if (!isSkipUpdateUI) {
         _G.utilsUI.fillLabel(
            cc.find('star2_big 1/label_stars', this.headerContainer),
            _.formatMoney(_G.user.stars)
         );

         // exp
         _G.utilsUI.fillLabel(
            cc.find('exp_icon/label_exp', this.headerContainer),
            _.formatMoney(_G.user.exp)
         );
      }

      _G.utilsUI.fillLabel(
         cc.find('Canvas/layout_game_over/dialog/label_gameover_score'),
         _.formatMoney(_G.user.exp)
      );

      this.updateBtnHint();

      // level
      if (!isSkipUpdateUI) {
         this.updateLevelNumber();
         this.updateLevelProgressBar();
      }
   },

   // button hint on/off
   updateBtnHint() {
      this.btnHintDisabledNode.active = _G.user.stars < _G.configGame.hintCoinPrice;
   },

   updateLevelNumber() {
      _G.utilsUI.fillLabel(cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/level/level_num'), '' + _G.user.level);
      _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/exp_progress_bar/level/level_num'), '' + _G.user.level);
   },


   // puzzle progress bar
   updatePuzzleProgressBar(ratio, fxTime = 0) {
      const progressBar = cc.find('bar', this.puzzleProgressBar);
      this.updateProgressBar(progressBar, ratio, fxTime);
   },


   // level progress bar
   updateLevelProgressBar(fxTime = 0) {
      const progressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar/bar');
      const isEven = !(_G.user.exp % _G.configGame.levelUpExp);
      const ratio = isEven ? 1 : 0.5;
      this.updateProgressBar(progressBar, ratio, fxTime);
      _.setTimeout(() => {
         if (ratio == 1) this.updateProgressBar(progressBar, 0);
      }, 5000);
   },


   updateProgressBar(barNode: cc.Node, ratio, fxTime = 0) {
      barNode.orgWidth = barNode.orgWidth || barNode.width;

      const labelPercentage = cc.find('label_percentage', barNode.parent);
      _G.utilsUI.fillLabel(labelPercentage, `${_.floor(ratio * 100)}%`);

      cc.tween(barNode).to(fxTime, { width: ratio * barNode.orgWidth }).start();
   },
}