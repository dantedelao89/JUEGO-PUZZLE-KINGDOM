
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/core_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b15554JuJ1HfrbLWDvHND0f', 'core_ui');
// script/system/ui-fx/core_ui.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreUI = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
var gameState = _G.types.gameState;
var bind_button_handlers_1 = require("./bind_button_handlers");
exports.coreUI = {
    alertOKCallback: null,
    tabButtonContainer: null,
    masterScrollViewNode: null,
    masterScrollViewComp: null,
    masterScrollViewContent: null,
    playGridContainer: null,
    headerContainer: null,
    puzzleProgressBar: null,
    btnHintDisabledNode: null,
    currentState: gameState.category,
    init: function () {
        var _this = this;
        this.adjustUI();
        this.masterScrollViewNode = cc.find('Canvas/play_area/scrollview_master');
        this.masterScrollViewComp = this.masterScrollViewNode.getComponent('NestableScrollView_Outer');
        this.masterScrollViewContent = this.playGridContainer = cc.find('view/content', this.masterScrollViewNode);
        this.playGridContainer = cc.find('grid_area', this.masterScrollViewContent);
        this.puzzleProgressBar = cc.find('puzzle_progress_bar', this.masterScrollViewContent);
        this.headerContainer = cc.find('Canvas/layout_fixed_header/header');
        this.tabButtonContainer = cc.find("size_tabs", this.playGridContainer);
        this.btnHintDisabledNode = cc.find('playing_button_bar/btn_hint/disabled', this.playGridContainer);
        this.setupLocalization();
        bind_button_handlers_1.bindButtonHandlers.run();
        _G.user.addInitCallback(function (data) {
            _this.setUIPlayState((data.isNewUser || _G.user.isPuzzleSpecified) ? gameState.playing : gameState.category);
            cc.tween(_this.masterScrollViewNode).to(0.3, { opacity: 255 }).start();
        });
        this.handleUIForV2();
        this.fillConfigToUI();
        // if (window['FBInstant']) {
        //    _G.utilsUI.fillLabel(cc.find('user_bar/label_username', this.headerContainer), FBInstant.player.getName());
        // }
    },
    showLoadingAds: function (callBack) {
        var _this = this;
        var layoutNode = cc.find('Canvas/layout_loading_ad');
        var dialog = cc.find('dialog', layoutNode);
        dialog.opacity = 0;
        dialog.x = -dialog.width / 2;
        layoutNode.active = true;
        cc.tween(dialog)
            .to(0.3, { x: 0, opacity: 255 })
            .delay(2)
            .to(0.3, { x: dialog.width / 2, opacity: 0 })
            .call(function () {
            callBack && callBack();
            _.setTimeout(function () { return _this.hideLayout('layout_loading_ad'); }, 100);
        })
            .start();
    },
    setupLocalization: function () {
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
        var handleSharePicLabelGlow = function () {
            var labelGlow = cc.find('Canvas/shares/picture/overlay/text_glow');
            var labelIntroNode = cc.find('Canvas/shares/picture/label_share_intro_1');
            cc.find('Canvas/shares').active = true;
            _.setTimeout(function () {
                labelGlow.height = (labelIntroNode.height + 30) / labelGlow.scale;
                labelGlow.width = (_.min(725, labelIntroNode.width + 50)) / labelGlow.scale;
                cc.find('Canvas/shares').active = false;
            });
        };
        _G.localize.addInitCallback(handleSharePicLabelGlow);
        _G.localize.languageChangeCallbackArr.push(handleSharePicLabelGlow);
    },
    fillConfigToUI: function () {
        // level up stars
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_level_up/dialog/star_num_base/label_stars'), '' + _G.configGame.levelUpCoinReward);
        // hint stars
        _G.utilsUI.fillLabel(cc.find('playing_button_bar/btn_hint/label_game_btn_hint/label_stars', this.playGridContainer), '' + _G.configGame.hintCoinPrice);
        _G.utilsUI.fillLabel(cc.find('label_game_btn_hint/label_stars', this.btnHintDisabledNode), '' + _G.configGame.hintCoinPrice);
        // win coins
        this.tabButtonContainer.children.map(function (btnNode) {
            var coinNumber = _G.configGame.winCoinReward[btnNode.name];
            _G.utilsUI.fillLabel(cc.find('coin_label', btnNode), '' + coinNumber);
        });
    },
    // users from social posts
    handleUIForV2: function () {
        if (!_G.user.isVersionV2)
            return;
        cc.find('btn_back', this.headerContainer).active = true;
        cc.find('btn_settings', this.headerContainer).x = -255;
    },
    showButtonBack: function () {
        cc.find('btn_back', this.headerContainer).active = true;
    },
    hideButtonBack: function () {
        cc.find('btn_back', this.headerContainer).active = false;
    },
    // =================================================================
    // UI SIZE ADJUSTMENT
    // =================================================================
    // adjuts UI to fit
    adjustUI: function () {
        var maxRatio = 720 / 1280;
        var actualRatio = cc.winSize.width / cc.winSize.height;
        if (actualRatio > maxRatio) {
            cc.find('Canvas').getComponent(cc.Canvas).fitWidth = false;
            cc.find('Canvas').getComponent(cc.Canvas).fitHeight = true;
        }
        // make layout height = windows height
        var layoutArr = [
            'Canvas/play_area',
            'Canvas/bg',
            'Canvas/control_layer',
            'Canvas/layout_win',
            'Canvas/layout_settings',
            'Canvas/fx_container',
            'Canvas/nag_screen',
            'Canvas/layout_fixed_header',
            'Canvas/layout_tutorial',
        ].map(function (path) {
            var layerNode = cc.find(path);
            layerNode.height = cc.winSize.height;
        });
    },
    // =================================================================
    // SETUP GAME PLAY STATE: PICK MODE/ PLAYING/ WON
    // =================================================================
    setUIPlayState: function (state) {
        this.currentState = state;
        var btnBack = cc.find('btn_back', this.headerContainer);
        var btnPlay = cc.find('btn_play', this.playGridContainer);
        var btnPlayV2 = cc.find('btn_play_v2', this.playGridContainer);
        var btnShare = cc.find('btn_share', this.playGridContainer);
        var sizeTabsIntro = cc.find('size_tabs_intro', this.playGridContainer);
        var playingBtnBar = cc.find('playing_button_bar', this.playGridContainer);
        var playTimeLevelBar = cc.find('time_level_bar', this.playGridContainer);
        var fakeTimeStack = cc.find('fake_time_stack', this.playGridContainer);
        var gridStack = cc.find('grid_stack', this.playGridContainer);
        var gridStackBg = cc.find('grid_bg', gridStack);
        var gridCover = cc.find('grid_cover', gridStack);
        var dummyStack = cc.find('dummy_stack', this.playGridContainer.parent);
        var labelMorePuzzle = cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer);
        var level = cc.find('level', this.puzzleProgressBar) || {};
        var activeNodeArr, hiddenNodeArr;
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
        activeNodeArr.map(function (node) { return node.active = true; });
        hiddenNodeArr.map(function (node) { return node.active = false; });
        if (_G.user.isPuzzleSpecified) {
            btnBack.active = false;
        }
    },
    // =================================================================
    // =================================================================
    // --- THE TAB 3x3 & 5x5
    onTabPreview: function (size) {
        this.tabButtonContainer.children.map(function (btnNode) {
            var isFocus = btnNode.name.includes(size);
            cc.find('bg_on', btnNode).active = isFocus;
            cc.tween(btnNode).to(0.2, { scale: isFocus ? 1 : 0.8 }).start();
        });
    },
    // --- BACK
    back: function () {
        var gMechanic = _G.gameMechanic;
        if (this.currentState == gameState.category) {
            _G.coreUI.hideButtonBack();
            return this.showLayout('layout_home');
        }
        if (this.currentState == gameState.pick_mode)
            return this.setUIPlayState(gameState.category);
        if (this.currentState == gameState.playing /*|| this.currentState == gameState.won*/) {
            if (_G.tutorial.isCurrentPuzzleTutorial()) {
                _G.coreUI.setUIPlayState(_G.types.gameState.category);
            }
            else
                gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
            // _G.interAd.checkToShowInterAd();
        }
    },
    // =================================================================
    // LAYOUTS
    // =================================================================
    // =======
    showLayout: function (layout) {
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        layoutNode.active = true;
    },
    hideLayout: function (layout) {
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        layoutNode.active = false;
    },
    // === with animations
    showLayoutAnim: function (layout, bgOpacity) {
        this.showNagScreen(0.4);
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        var dialogNode = cc.find('dialog', layoutNode);
        var bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
        bgNode.stopAllActions();
        dialogNode.stopAllActions();
        dialogNode.scale = 0;
        bgNode.opacity = 0;
        layoutNode.active = true;
        cc.tween(bgNode).to(0.3, { opacity: bgOpacity || 200 }).start();
        cc.tween(dialogNode).to(0.3, { scale: 1.03 }).to(0.1, { scale: 1 }).start();
        this.hideButtonBack();
    },
    hideLayoutAnim: function (layout, callback) {
        this.showNagScreen(0.4);
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        var dialogNode = cc.find('dialog', layoutNode);
        var bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
        layoutNode.active = true;
        bgNode.stopAllActions();
        dialogNode.stopAllActions();
        cc.tween(bgNode).to(0.3, { opacity: 0 }).start();
        cc.tween(dialogNode).to(0.2, { scale: 1.06 }).to(0.2, { scale: 0 }).call(function () {
            layoutNode.active = false;
        }).call(function () { return callback && callback(); }).start();
        this.showButtonBack();
    },
    // ========
    showAlert: function (msg, okCallback) {
        this.showLayout("layer_alert");
        _G.utilsUI.fillLabel(cc.find('Canvas/layer_alert/bg_msg/label_msg'), msg);
        this.alertOKCallback = okCallback;
    },
    // =======
    hideLoadingTimer: null,
    showLoading: function () {
        var _this = this;
        this.showLayout("layer_loading");
        // auto turn off loading if shown more than 10 secs but not being turned off
        if (this.hideLoadingTimer)
            clearTimeout(this.hideLoadingTimer);
        this.hideLoadingTimer = setTimeout(function () { return _this.hideLoading(); }, 10000);
    },
    hideLoading: function () {
        this.hideLayout("layer_loading");
        if (this.hideLoadingTimer)
            clearTimeout(this.hideLoadingTimer);
    },
    // =========
    // nag screen: prevent user from clicking buttons while showing animations
    showNagScreen: function (timeout) {
        var _this = this;
        cc.find('Canvas/nag_screen').active = true;
        if (timeout)
            _.setTimeout(function () { return _this.hideNagScreen(); }, timeout * 1000);
    },
    hideNagScreen: function () {
        cc.find('Canvas/nag_screen').active = false;
    },
    // ====== Some system labels ================
    // update gold to all places in game ui
    updateUserStats: function (isSkipUpdateUI) {
        if (isSkipUpdateUI === void 0) { isSkipUpdateUI = false; }
        // coins
        if (!isSkipUpdateUI) {
            _G.utilsUI.fillLabel(cc.find('star2_big 1/label_stars', this.headerContainer), _.formatMoney(_G.user.stars));
            // exp
            _G.utilsUI.fillLabel(cc.find('exp_icon/label_exp', this.headerContainer), _.formatMoney(_G.user.exp));
        }
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_game_over/dialog/label_gameover_score'), _.formatMoney(_G.user.exp));
        this.updateBtnHint();
        // level
        if (!isSkipUpdateUI) {
            this.updateLevelNumber();
            this.updateLevelProgressBar();
        }
    },
    // button hint on/off
    updateBtnHint: function () {
        this.btnHintDisabledNode.active = _G.user.stars < _G.configGame.hintCoinPrice;
    },
    updateLevelNumber: function () {
        _G.utilsUI.fillLabel(cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/level/level_num'), '' + _G.user.level);
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/exp_progress_bar/level/level_num'), '' + _G.user.level);
    },
    // puzzle progress bar
    updatePuzzleProgressBar: function (ratio, fxTime) {
        if (fxTime === void 0) { fxTime = 0; }
        var progressBar = cc.find('bar', this.puzzleProgressBar);
        this.updateProgressBar(progressBar, ratio, fxTime);
    },
    // level progress bar
    updateLevelProgressBar: function (fxTime) {
        var _this = this;
        if (fxTime === void 0) { fxTime = 0; }
        var progressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar/bar');
        var isEven = !(_G.user.exp % _G.configGame.levelUpExp);
        var ratio = isEven ? 1 : 0.5;
        this.updateProgressBar(progressBar, ratio, fxTime);
        _.setTimeout(function () {
            if (ratio == 1)
                _this.updateProgressBar(progressBar, 0);
        }, 5000);
    },
    updateProgressBar: function (barNode, ratio, fxTime) {
        if (fxTime === void 0) { fxTime = 0; }
        barNode.orgWidth = barNode.orgWidth || barNode.width;
        var labelPercentage = cc.find('label_percentage', barNode.parent);
        _G.utilsUI.fillLabel(labelPercentage, _.floor(ratio * 100) + "%");
        cc.tween(barNode).to(fxTime, { width: ratio * barNode.orgWidth }).start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2NvcmVfdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUVyQywrREFBNEQ7QUFDL0MsUUFBQSxNQUFNLEdBQUc7SUFDbkIsZUFBZSxFQUFFLElBQWdCO0lBQ2pDLGtCQUFrQixFQUFFLElBQWU7SUFDbkMsb0JBQW9CLEVBQUUsSUFBZTtJQUNyQyxvQkFBb0IsRUFBRSxJQUFxQjtJQUMzQyx1QkFBdUIsRUFBRSxJQUFlO0lBQ3hDLGlCQUFpQixFQUFFLElBQWU7SUFDbEMsZUFBZSxFQUFFLElBQWU7SUFDaEMsaUJBQWlCLEVBQUUsSUFBZTtJQUNsQyxtQkFBbUIsRUFBRSxJQUFlO0lBRXBDLFlBQVksRUFBRSxTQUFTLENBQUMsUUFBUTtJQUVoQyxJQUFJO1FBQUosaUJBNEJDO1FBM0JFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFL0YsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRW5HLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLHlDQUFrQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRXpCLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQUEsSUFBSTtZQUN6QixLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1RyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsNkJBQTZCO1FBQzdCLGlIQUFpSDtRQUNqSCxJQUFJO0lBQ1AsQ0FBQztJQUdELGNBQWMsRUFBZCxVQUFlLFFBQW1CO1FBQWxDLGlCQWVDO1FBZEUsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3ZELElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM3QixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN6QixFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUNaLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQzthQUMvQixLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ1IsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDNUMsSUFBSSxDQUFDO1lBQ0gsUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBcEMsQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7YUFDRCxLQUFLLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFHRCxpQkFBaUI7UUFDZCxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRCxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLENBQUMsQ0FBQyxDQUFDO1FBQzlFLEVBQUUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFDN0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLEVBQUUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUNsRSxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7UUFDbkUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUN6RCxFQUFFLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO1FBRXBFLElBQU0sdUJBQXVCLEdBQUc7WUFDN0IsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1lBQ3JFLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtZQUMzRSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDdkMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztnQkFDVixTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUNsRSxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUNMLENBQUMsQ0FBQTtRQUNELEVBQUUsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBR0QsY0FBYztRQUNYLGlCQUFpQjtRQUNqQixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDakIsRUFBRSxDQUFDLElBQUksQ0FBQyx5REFBeUQsQ0FBQyxFQUNsRSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FDdEMsQ0FBQztRQUVGLGFBQWE7UUFDYixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLDZEQUE2RCxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZKLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0gsWUFBWTtRQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTztZQUN6QyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUlELDBCQUEwQjtJQUMxQixhQUFhO1FBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFDakMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDeEQsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUMxRCxDQUFDO0lBR0QsY0FBYztRQUNYLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzNELENBQUM7SUFFRCxjQUFjO1FBQ1gsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDNUQsQ0FBQztJQUVELG9FQUFvRTtJQUNwRSxxQkFBcUI7SUFDckIsb0VBQW9FO0lBRXBFLG1CQUFtQjtJQUNuQixRQUFRO1FBQ0wsSUFBTSxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN6RCxJQUFJLFdBQVcsR0FBRyxRQUFRLEVBQUU7WUFDekIsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDM0QsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDN0Q7UUFFRCxzQ0FBc0M7UUFDdEMsSUFBTSxTQUFTLEdBQUc7WUFDZixrQkFBa0I7WUFDbEIsV0FBVztZQUNYLHNCQUFzQjtZQUN0QixtQkFBbUI7WUFDbkIsd0JBQXdCO1lBQ3hCLHFCQUFxQjtZQUNyQixtQkFBbUI7WUFDbkIsNEJBQTRCO1lBQzVCLHdCQUF3QjtTQUMxQixDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUk7WUFDUCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBR0Qsb0VBQW9FO0lBQ3BFLGlEQUFpRDtJQUNqRCxvRUFBb0U7SUFFcEUsY0FBYyxFQUFkLFVBQWUsS0FBeUI7UUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFFMUIsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzFELElBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVELElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pFLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRTlELElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM1RSxJQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0UsSUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV6RSxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNoRSxJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekUsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFNUYsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDO1FBRTdELElBQUksYUFBYSxFQUFFLGFBQWEsQ0FBQztRQUNqQyxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzlCLGFBQWEsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDN0MsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3pHO2FBRUksSUFBSSxLQUFLLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUNwQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlHLGFBQWEsR0FBRyxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNsSixTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN2QixXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUN4QjthQUVJLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxPQUFPLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDNUQsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNqSSxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0gsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDcEIsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDeEI7YUFFSSxJQUFJLEtBQUssSUFBSSxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQzdCLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbkcsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdKLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBRUQscUJBQXFCO1FBQ3JCLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQzlDLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQy9DLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztTQUN6QjtJQUNKLENBQUM7SUFJRCxvRUFBb0U7SUFDcEUsb0VBQW9FO0lBRXBFLHdCQUF3QjtJQUN4QixZQUFZLEVBQVosVUFBYSxJQUFtQztRQUM3QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLE9BQU87WUFDekMsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUMzQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBR0QsV0FBVztJQUNYLElBQUk7UUFDRCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0IsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyx5Q0FBeUMsRUFBRTtZQUNuRixJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVBQUUsRUFBRTtnQkFDeEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDeEQ7O2dCQUNJLFNBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUYsbUNBQW1DO1NBQ3JDO0lBQ0osQ0FBQztJQUdELG9FQUFvRTtJQUNwRSxVQUFVO0lBQ1Ysb0VBQW9FO0lBRXBFLFVBQVU7SUFDVixVQUFVLEVBQVYsVUFBVyxNQUF3QjtRQUNoQyxJQUFNLFVBQVUsR0FBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBVSxNQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEYsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsRUFBVixVQUFXLE1BQXdCO1FBQ2hDLElBQU0sVUFBVSxHQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFVLE1BQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RixVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBR0Qsc0JBQXNCO0lBQ3RCLGNBQWMsRUFBZCxVQUFlLE1BQXdCLEVBQUUsU0FBVTtRQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQU0sVUFBVSxHQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFVLE1BQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRCxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTVCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXpCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxjQUFjLEVBQWQsVUFBZSxNQUF3QixFQUFFLFFBQW1CO1FBQ3pELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBTSxVQUFVLEdBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVUsTUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXhGLElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELElBQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdFLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakQsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0RSxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLFFBQVEsSUFBSSxRQUFRLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBSUQsV0FBVztJQUNYLFNBQVMsRUFBVCxVQUFVLEdBQUcsRUFBRSxVQUFxQjtRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsZUFBZSxHQUFHLFVBQVUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsVUFBVTtJQUNWLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsV0FBVztRQUFYLGlCQU1DO1FBTEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUVqQyw0RUFBNEU7UUFDNUUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0QsV0FBVztRQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCO1lBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFHRCxZQUFZO0lBQ1osMEVBQTBFO0lBQzFFLGFBQWEsRUFBYixVQUFjLE9BQWdCO1FBQTlCLGlCQUdDO1FBRkUsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDM0MsSUFBSSxPQUFPO1lBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsYUFBYTtRQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQy9DLENBQUM7SUFHRCw2Q0FBNkM7SUFDN0MsdUNBQXVDO0lBQ3ZDLGVBQWUsWUFBQyxjQUFzQjtRQUF0QiwrQkFBQSxFQUFBLHNCQUFzQjtRQUNuQyxRQUFRO1FBQ1IsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNsQixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDakIsRUFBRSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3hELENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDOUIsQ0FBQztZQUVGLE1BQU07WUFDTixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDakIsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ25ELENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDNUIsQ0FBQztTQUNKO1FBRUQsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQ2pCLEVBQUUsQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsRUFDOUQsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUM1QixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLFFBQVE7UUFDUixJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2hDO0lBQ0osQ0FBQztJQUVELHFCQUFxQjtJQUNyQixhQUFhO1FBQ1YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUNqRixDQUFDO0lBRUQsaUJBQWlCO1FBQ2QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQywwRkFBMEYsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkRBQTJELENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsSCxDQUFDO0lBR0Qsc0JBQXNCO0lBQ3RCLHVCQUF1QixZQUFDLEtBQUssRUFBRSxNQUFVO1FBQVYsdUJBQUEsRUFBQSxVQUFVO1FBQ3RDLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFHRCxxQkFBcUI7SUFDckIsc0JBQXNCLFlBQUMsTUFBVTtRQUFqQyxpQkFRQztRQVJzQix1QkFBQSxFQUFBLFVBQVU7UUFDOUIsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQzdFLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNWLElBQUksS0FBSyxJQUFJLENBQUM7Z0JBQUUsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMxRCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0lBR0QsaUJBQWlCLEVBQWpCLFVBQWtCLE9BQWdCLEVBQUUsS0FBSyxFQUFFLE1BQVU7UUFBVix1QkFBQSxFQUFBLFVBQVU7UUFDbEQsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFFckQsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFHLENBQUMsQ0FBQztRQUVsRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdFLENBQUM7Q0FDSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5jb25zdCBnYW1lU3RhdGUgPSBfRy50eXBlcy5nYW1lU3RhdGU7XG5cbmltcG9ydCB7IGJpbmRCdXR0b25IYW5kbGVycyB9IGZyb20gJy4vYmluZF9idXR0b25faGFuZGxlcnMnO1xuZXhwb3J0IGNvbnN0IGNvcmVVSSA9IHtcbiAgIGFsZXJ0T0tDYWxsYmFjazogbnVsbCBhcyBGdW5jdGlvbixcbiAgIHRhYkJ1dHRvbkNvbnRhaW5lcjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgbWFzdGVyU2Nyb2xsVmlld05vZGU6IG51bGwgYXMgY2MuTm9kZSxcbiAgIG1hc3RlclNjcm9sbFZpZXdDb21wOiBudWxsIGFzIGNjLlNjcm9sbFZpZXcsXG4gICBtYXN0ZXJTY3JvbGxWaWV3Q29udGVudDogbnVsbCBhcyBjYy5Ob2RlLFxuICAgcGxheUdyaWRDb250YWluZXI6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGhlYWRlckNvbnRhaW5lcjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgcHV6emxlUHJvZ3Jlc3NCYXI6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGJ0bkhpbnREaXNhYmxlZE5vZGU6IG51bGwgYXMgY2MuTm9kZSxcblxuICAgY3VycmVudFN0YXRlOiBnYW1lU3RhdGUuY2F0ZWdvcnksXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmFkanVzdFVJKCk7XG4gICAgICB0aGlzLm1hc3RlclNjcm9sbFZpZXdOb2RlID0gY2MuZmluZCgnQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3RlcicpO1xuICAgICAgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29tcCA9IHRoaXMubWFzdGVyU2Nyb2xsVmlld05vZGUuZ2V0Q29tcG9uZW50KCdOZXN0YWJsZVNjcm9sbFZpZXdfT3V0ZXInKTtcblxuICAgICAgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29udGVudCA9IHRoaXMucGxheUdyaWRDb250YWluZXIgPSBjYy5maW5kKCd2aWV3L2NvbnRlbnQnLCB0aGlzLm1hc3RlclNjcm9sbFZpZXdOb2RlKTtcbiAgICAgIHRoaXMucGxheUdyaWRDb250YWluZXIgPSBjYy5maW5kKCdncmlkX2FyZWEnLCB0aGlzLm1hc3RlclNjcm9sbFZpZXdDb250ZW50KTtcbiAgICAgIHRoaXMucHV6emxlUHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdwdXp6bGVfcHJvZ3Jlc3NfYmFyJywgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29udGVudCk7XG4gICAgICB0aGlzLmhlYWRlckNvbnRhaW5lciA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZml4ZWRfaGVhZGVyL2hlYWRlcicpO1xuXG4gICAgICB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lciA9IGNjLmZpbmQoYHNpemVfdGFic2AsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlID0gY2MuZmluZCgncGxheWluZ19idXR0b25fYmFyL2J0bl9oaW50L2Rpc2FibGVkJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIHRoaXMuc2V0dXBMb2NhbGl6YXRpb24oKTtcblxuICAgICAgYmluZEJ1dHRvbkhhbmRsZXJzLnJ1bigpO1xuXG4gICAgICBfRy51c2VyLmFkZEluaXRDYWxsYmFjayhkYXRhID0+IHtcbiAgICAgICAgIHRoaXMuc2V0VUlQbGF5U3RhdGUoKGRhdGEuaXNOZXdVc2VyIHx8IF9HLnVzZXIuaXNQdXp6bGVTcGVjaWZpZWQpID8gZ2FtZVN0YXRlLnBsYXlpbmcgOiBnYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgICAgY2MudHdlZW4odGhpcy5tYXN0ZXJTY3JvbGxWaWV3Tm9kZSkudG8oMC4zLCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaGFuZGxlVUlGb3JWMigpO1xuICAgICAgdGhpcy5maWxsQ29uZmlnVG9VSSgpO1xuXG4gICAgICAvLyBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgLy8gICAgX0cudXRpbHNVSS5maWxsTGFiZWwoY2MuZmluZCgndXNlcl9iYXIvbGFiZWxfdXNlcm5hbWUnLCB0aGlzLmhlYWRlckNvbnRhaW5lciksIEZCSW5zdGFudC5wbGF5ZXIuZ2V0TmFtZSgpKTtcbiAgICAgIC8vIH1cbiAgIH0sXG5cblxuICAgc2hvd0xvYWRpbmdBZHMoY2FsbEJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbG9hZGluZ19hZCcpO1xuICAgICAgY29uc3QgZGlhbG9nID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBkaWFsb2cub3BhY2l0eSA9IDA7XG4gICAgICBkaWFsb2cueCA9IC1kaWFsb2cud2lkdGggLyAyO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MudHdlZW4oZGlhbG9nKVxuICAgICAgICAgLnRvKDAuMywgeyB4OiAwLCBvcGFjaXR5OiAyNTUgfSlcbiAgICAgICAgIC5kZWxheSgyKVxuICAgICAgICAgLnRvKDAuMywgeyB4OiBkaWFsb2cud2lkdGggLyAyLCBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xuICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZUxheW91dCgnbGF5b3V0X2xvYWRpbmdfYWQnKSwgMTAwKTtcbiAgICAgICAgIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgc2V0dXBMb2NhbGl6YXRpb24oKSB7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUodGhpcy5oZWFkZXJDb250YWluZXIpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXInKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4nKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cCcpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvbGF5b3V0X3NldHRpbmdzJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfYWxlcnQnKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF90dXRvcmlhbCcpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvbGF5b3V0X3BhdXNlJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfaG9tZScpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvc2hhcmVzJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbG9hZGluZ19hZCcpKTtcblxuICAgICAgY29uc3QgaGFuZGxlU2hhcmVQaWNMYWJlbEdsb3cgPSAoKSA9PiB7XG4gICAgICAgICBjb25zdCBsYWJlbEdsb3cgPSBjYy5maW5kKCdDYW52YXMvc2hhcmVzL3BpY3R1cmUvb3ZlcmxheS90ZXh0X2dsb3cnKTtcbiAgICAgICAgIGNvbnN0IGxhYmVsSW50cm9Ob2RlID0gY2MuZmluZCgnQ2FudmFzL3NoYXJlcy9waWN0dXJlL2xhYmVsX3NoYXJlX2ludHJvXzEnKVxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NoYXJlcycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGFiZWxHbG93LmhlaWdodCA9IChsYWJlbEludHJvTm9kZS5oZWlnaHQgKyAzMCkgLyBsYWJlbEdsb3cuc2NhbGU7XG4gICAgICAgICAgICBsYWJlbEdsb3cud2lkdGggPSAoXy5taW4oNzI1LCBsYWJlbEludHJvTm9kZS53aWR0aCArIDUwKSkgLyBsYWJlbEdsb3cuc2NhbGU7XG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2hhcmVzJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICB9KVxuICAgICAgfVxuICAgICAgX0cubG9jYWxpemUuYWRkSW5pdENhbGxiYWNrKGhhbmRsZVNoYXJlUGljTGFiZWxHbG93KTtcbiAgICAgIF9HLmxvY2FsaXplLmxhbmd1YWdlQ2hhbmdlQ2FsbGJhY2tBcnIucHVzaChoYW5kbGVTaGFyZVBpY0xhYmVsR2xvdyk7XG4gICB9LFxuXG5cbiAgIGZpbGxDb25maWdUb1VJKCkge1xuICAgICAgLy8gbGV2ZWwgdXAgc3RhcnNcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cC9kaWFsb2cvc3Rhcl9udW1fYmFzZS9sYWJlbF9zdGFycycpLFxuICAgICAgICAgJycgKyBfRy5jb25maWdHYW1lLmxldmVsVXBDb2luUmV3YXJkXG4gICAgICApO1xuXG4gICAgICAvLyBoaW50IHN0YXJzXG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdwbGF5aW5nX2J1dHRvbl9iYXIvYnRuX2hpbnQvbGFiZWxfZ2FtZV9idG5faGludC9sYWJlbF9zdGFycycsIHRoaXMucGxheUdyaWRDb250YWluZXIpLCAnJyArIF9HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZSk7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdsYWJlbF9nYW1lX2J0bl9oaW50L2xhYmVsX3N0YXJzJywgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlKSwgJycgKyBfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2UpO1xuXG4gICAgICAvLyB3aW4gY29pbnNcbiAgICAgIHRoaXMudGFiQnV0dG9uQ29udGFpbmVyLmNoaWxkcmVuLm1hcChidG5Ob2RlID0+IHtcbiAgICAgICAgIGNvbnN0IGNvaW5OdW1iZXIgPSBfRy5jb25maWdHYW1lLndpbkNvaW5SZXdhcmRbYnRuTm9kZS5uYW1lXTtcbiAgICAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ2NvaW5fbGFiZWwnLCBidG5Ob2RlKSwgJycgKyBjb2luTnVtYmVyKTtcbiAgICAgIH0pO1xuICAgfSxcblxuXG5cbiAgIC8vIHVzZXJzIGZyb20gc29jaWFsIHBvc3RzXG4gICBoYW5kbGVVSUZvclYyKCkge1xuICAgICAgaWYgKCFfRy51c2VyLmlzVmVyc2lvblYyKSByZXR1cm47XG4gICAgICBjYy5maW5kKCdidG5fYmFjaycsIHRoaXMuaGVhZGVyQ29udGFpbmVyKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MuZmluZCgnYnRuX3NldHRpbmdzJywgdGhpcy5oZWFkZXJDb250YWluZXIpLnggPSAtMjU1O1xuICAgfSxcblxuXG4gICBzaG93QnV0dG9uQmFjaygpIHtcbiAgICAgIGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpLmFjdGl2ZSA9IHRydWU7XG4gICB9LFxuXG4gICBoaWRlQnV0dG9uQmFjaygpIHtcbiAgICAgIGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgfSxcblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIFVJIFNJWkUgQURKVVNUTUVOVFxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgLy8gYWRqdXRzIFVJIHRvIGZpdFxuICAgYWRqdXN0VUkoKSB7XG4gICAgICBjb25zdCBtYXhSYXRpbyA9IDcyMCAvIDEyODA7XG4gICAgICBjb25zdCBhY3R1YWxSYXRpbyA9IGNjLndpblNpemUud2lkdGggLyBjYy53aW5TaXplLmhlaWdodDtcbiAgICAgIGlmIChhY3R1YWxSYXRpbyA+IG1heFJhdGlvKSB7XG4gICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoY2MuQ2FudmFzKS5maXRXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcykuZml0SGVpZ2h0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBsYXlvdXQgaGVpZ2h0ID0gd2luZG93cyBoZWlnaHRcbiAgICAgIGNvbnN0IGxheW91dEFyciA9IFtcbiAgICAgICAgICdDYW52YXMvcGxheV9hcmVhJyxcbiAgICAgICAgICdDYW52YXMvYmcnLFxuICAgICAgICAgJ0NhbnZhcy9jb250cm9sX2xheWVyJyxcbiAgICAgICAgICdDYW52YXMvbGF5b3V0X3dpbicsXG4gICAgICAgICAnQ2FudmFzL2xheW91dF9zZXR0aW5ncycsXG4gICAgICAgICAnQ2FudmFzL2Z4X2NvbnRhaW5lcicsXG4gICAgICAgICAnQ2FudmFzL25hZ19zY3JlZW4nLFxuICAgICAgICAgJ0NhbnZhcy9sYXlvdXRfZml4ZWRfaGVhZGVyJyxcbiAgICAgICAgICdDYW52YXMvbGF5b3V0X3R1dG9yaWFsJyxcbiAgICAgIF0ubWFwKHBhdGggPT4ge1xuICAgICAgICAgY29uc3QgbGF5ZXJOb2RlID0gY2MuZmluZChwYXRoKTtcbiAgICAgICAgIGxheWVyTm9kZS5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodDtcbiAgICAgIH0pO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gU0VUVVAgR0FNRSBQTEFZIFNUQVRFOiBQSUNLIE1PREUvIFBMQVlJTkcvIFdPTlxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgc2V0VUlQbGF5U3RhdGUoc3RhdGU6IF9HLnR5cGVzLmdhbWVTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcblxuICAgICAgY29uc3QgYnRuQmFjayA9IGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpO1xuICAgICAgY29uc3QgYnRuUGxheSA9IGNjLmZpbmQoJ2J0bl9wbGF5JywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBidG5QbGF5VjIgPSBjYy5maW5kKCdidG5fcGxheV92MicsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgYnRuU2hhcmUgPSBjYy5maW5kKCdidG5fc2hhcmUnLCB0aGlzLnBsYXlHcmlkQ29udGFpbmVyKTtcblxuICAgICAgY29uc3Qgc2l6ZVRhYnNJbnRybyA9IGNjLmZpbmQoJ3NpemVfdGFic19pbnRybycsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgcGxheWluZ0J0bkJhciA9IGNjLmZpbmQoJ3BsYXlpbmdfYnV0dG9uX2JhcicsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgcGxheVRpbWVMZXZlbEJhciA9IGNjLmZpbmQoJ3RpbWVfbGV2ZWxfYmFyJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBmYWtlVGltZVN0YWNrID0gY2MuZmluZCgnZmFrZV90aW1lX3N0YWNrJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGdyaWRTdGFjayA9IGNjLmZpbmQoJ2dyaWRfc3RhY2snLCB0aGlzLnBsYXlHcmlkQ29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGdyaWRTdGFja0JnID0gY2MuZmluZCgnZ3JpZF9iZycsIGdyaWRTdGFjayk7XG4gICAgICBjb25zdCBncmlkQ292ZXIgPSBjYy5maW5kKCdncmlkX2NvdmVyJywgZ3JpZFN0YWNrKTtcbiAgICAgIGNvbnN0IGR1bW15U3RhY2sgPSBjYy5maW5kKCdkdW1teV9zdGFjaycsIHRoaXMucGxheUdyaWRDb250YWluZXIucGFyZW50KTtcbiAgICAgIGNvbnN0IGxhYmVsTW9yZVB1enpsZSA9IGNjLmZpbmQoJ2xhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZScsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGxldmVsID0gY2MuZmluZCgnbGV2ZWwnLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyKSB8fCB7fTtcblxuICAgICAgbGV0IGFjdGl2ZU5vZGVBcnIsIGhpZGRlbk5vZGVBcnI7XG4gICAgICBpZiAoc3RhdGUgPT0gZ2FtZVN0YXRlLmNhdGVnb3J5KSB7XG4gICAgICAgICBhY3RpdmVOb2RlQXJyID0gW2xldmVsLCBkdW1teVN0YWNrLCBidG5CYWNrXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbdGhpcy5wbGF5R3JpZENvbnRhaW5lciwgdGhpcy5wdXp6bGVQcm9ncmVzc0JhciwgbGFiZWxNb3JlUHV6emxlLCBidG5QbGF5VjIsIGJ0blNoYXJlXTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gZ2FtZVN0YXRlLnBpY2tfbW9kZSkge1xuICAgICAgICAgYWN0aXZlTm9kZUFyciA9IFt0aGlzLnBsYXlHcmlkQ29udGFpbmVyLCB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lciwgc2l6ZVRhYnNJbnRybywgYnRuUGxheSwgZ3JpZENvdmVyLCBidG5CYWNrXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbcGxheWluZ0J0bkJhciwgcGxheVRpbWVMZXZlbEJhciwgZmFrZVRpbWVTdGFjaywgbGV2ZWwsIHRoaXMucHV6emxlUHJvZ3Jlc3NCYXIsIGR1bW15U3RhY2ssIGxhYmVsTW9yZVB1enpsZSwgYnRuUGxheVYyLCBidG5TaGFyZV07XG4gICAgICAgICBncmlkU3RhY2suc2NhbGUgPSAwLjg4O1xuICAgICAgICAgZ3JpZFN0YWNrQmcuc2NhbGUgPSAxO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSBnYW1lU3RhdGUucGxheWluZyB8fCBzdGF0ZSA9PSBnYW1lU3RhdGUud29uKSB7XG4gICAgICAgICBhY3RpdmVOb2RlQXJyID0gW3RoaXMucGxheUdyaWRDb250YWluZXIsIHBsYXlUaW1lTGV2ZWxCYXIsIGZha2VUaW1lU3RhY2ssIHBsYXlpbmdCdG5CYXIsIGJ0bkJhY2ssIGxldmVsLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbdGhpcy50YWJCdXR0b25Db250YWluZXIsIHNpemVUYWJzSW50cm8sIGdyaWRDb3ZlciwgYnRuUGxheSwgZHVtbXlTdGFjaywgbGFiZWxNb3JlUHV6emxlLCBidG5QbGF5VjIsIGJ0blNoYXJlXTtcbiAgICAgICAgIGdyaWRTdGFjay5zY2FsZSA9IDE7XG4gICAgICAgICBncmlkU3RhY2tCZy5zY2FsZSA9IDE7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IGdhbWVTdGF0ZS52Mikge1xuICAgICAgICAgYWN0aXZlTm9kZUFyciA9IFt0aGlzLnBsYXlHcmlkQ29udGFpbmVyLCBidG5CYWNrLCBncmlkQ292ZXIsIGxhYmVsTW9yZVB1enpsZSwgYnRuUGxheVYyLCBidG5TaGFyZV07XG4gICAgICAgICBoaWRkZW5Ob2RlQXJyID0gW3RoaXMudGFiQnV0dG9uQ29udGFpbmVyLCBwbGF5aW5nQnRuQmFyLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyLCBsZXZlbCwgZmFrZVRpbWVTdGFjaywgcGxheVRpbWVMZXZlbEJhciwgc2l6ZVRhYnNJbnRybywgYnRuUGxheSwgZHVtbXlTdGFja107XG4gICAgICAgICBncmlkU3RhY2suc2NhbGUgPSAwLjk5NDtcbiAgICAgICAgIGdyaWRTdGFja0JnLnNjYWxlID0gMC45ODtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IGFjdGl2ZS8gaGlkZGVuXG4gICAgICBhY3RpdmVOb2RlQXJyLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICBoaWRkZW5Ob2RlQXJyLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgaWYgKF9HLnVzZXIuaXNQdXp6bGVTcGVjaWZpZWQpIHtcbiAgICAgICAgIGJ0bkJhY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIC8vIC0tLSBUSEUgVEFCIDN4MyAmIDV4NVxuICAgb25UYWJQcmV2aWV3KHNpemU6ICczeDMnIHwgJzR4NCcgfCAnNXg1JyB8ICc2eDYnKSB7XG4gICAgICB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lci5jaGlsZHJlbi5tYXAoYnRuTm9kZSA9PiB7XG4gICAgICAgICBjb25zdCBpc0ZvY3VzID0gYnRuTm9kZS5uYW1lLmluY2x1ZGVzKHNpemUpO1xuICAgICAgICAgY2MuZmluZCgnYmdfb24nLCBidG5Ob2RlKS5hY3RpdmUgPSBpc0ZvY3VzO1xuICAgICAgICAgY2MudHdlZW4oYnRuTm9kZSkudG8oMC4yLCB7IHNjYWxlOiBpc0ZvY3VzID8gMSA6IDAuOCB9KS5zdGFydCgpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIC0tLSBCQUNLXG4gICBiYWNrKCkge1xuICAgICAgY29uc3QgZ01lY2hhbmljID0gX0cuZ2FtZU1lY2hhbmljO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09IGdhbWVTdGF0ZS5jYXRlZ29yeSkge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVCdXR0b25CYWNrKCk7XG4gICAgICAgICByZXR1cm4gdGhpcy5zaG93TGF5b3V0KCdsYXlvdXRfaG9tZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09IGdhbWVTdGF0ZS5waWNrX21vZGUpIHJldHVybiB0aGlzLnNldFVJUGxheVN0YXRlKGdhbWVTdGF0ZS5jYXRlZ29yeSk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT0gZ2FtZVN0YXRlLnBsYXlpbmcgLyp8fCB0aGlzLmN1cnJlbnRTdGF0ZSA9PSBnYW1lU3RhdGUud29uKi8pIHtcbiAgICAgICAgIGlmIChfRy50dXRvcmlhbC5pc0N1cnJlbnRQdXp6bGVUdXRvcmlhbCgpKSB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLmNhdGVnb3J5KTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2UgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG4gICAgICAgICAvLyBfRy5pbnRlckFkLmNoZWNrVG9TaG93SW50ZXJBZCgpO1xuICAgICAgfVxuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gTEFZT1VUU1xuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgLy8gPT09PT09PVxuICAgc2hvd0xheW91dChsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGxheW91dE5vZGU6IGNjLk5vZGUgPSAoXy5pc1N0cmluZyhsYXlvdXQpID8gY2MuZmluZChgQ2FudmFzLyR7bGF5b3V0fWApIDogbGF5b3V0KTtcbiAgICAgIGxheW91dE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgIH0sXG5cbiAgIGhpZGVMYXlvdXQobGF5b3V0OiBjYy5Ob2RlIHwgc3RyaW5nKSB7XG4gICAgICBjb25zdCBsYXlvdXROb2RlOiBjYy5Ob2RlID0gKF8uaXNTdHJpbmcobGF5b3V0KSA/IGNjLmZpbmQoYENhbnZhcy8ke2xheW91dH1gKSA6IGxheW91dCk7XG4gICAgICBsYXlvdXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgfSxcblxuXG4gICAvLyA9PT0gd2l0aCBhbmltYXRpb25zXG4gICBzaG93TGF5b3V0QW5pbShsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcsIGJnT3BhY2l0eT8pIHtcbiAgICAgIHRoaXMuc2hvd05hZ1NjcmVlbigwLjQpO1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IChfLmlzU3RyaW5nKGxheW91dCkgPyBjYy5maW5kKGBDYW52YXMvJHtsYXlvdXR9YCkgOiBsYXlvdXQpO1xuXG4gICAgICBjb25zdCBkaWFsb2dOb2RlID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBjb25zdCBiZ05vZGUgPSBjYy5maW5kKCdiZycsIGxheW91dE5vZGUpIHx8IGNjLmZpbmQoJ3NjcmVlbl9iZycsIGxheW91dE5vZGUpO1xuICAgICAgYmdOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICBkaWFsb2dOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgIGRpYWxvZ05vZGUuc2NhbGUgPSAwO1xuICAgICAgYmdOb2RlLm9wYWNpdHkgPSAwO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjYy50d2VlbihiZ05vZGUpLnRvKDAuMywgeyBvcGFjaXR5OiBiZ09wYWNpdHkgfHwgMjAwIH0pLnN0YXJ0KCk7XG4gICAgICBjYy50d2VlbihkaWFsb2dOb2RlKS50bygwLjMsIHsgc2NhbGU6IDEuMDMgfSkudG8oMC4xLCB7IHNjYWxlOiAxIH0pLnN0YXJ0KCk7XG4gICAgICB0aGlzLmhpZGVCdXR0b25CYWNrKCk7XG4gICB9LFxuXG4gICBoaWRlTGF5b3V0QW5pbShsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuc2hvd05hZ1NjcmVlbigwLjQpO1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IChfLmlzU3RyaW5nKGxheW91dCkgPyBjYy5maW5kKGBDYW52YXMvJHtsYXlvdXR9YCkgOiBsYXlvdXQpO1xuXG4gICAgICBjb25zdCBkaWFsb2dOb2RlID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBjb25zdCBiZ05vZGUgPSBjYy5maW5kKCdiZycsIGxheW91dE5vZGUpIHx8IGNjLmZpbmQoJ3NjcmVlbl9iZycsIGxheW91dE5vZGUpO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBiZ05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIGRpYWxvZ05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgY2MudHdlZW4oYmdOb2RlKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4oZGlhbG9nTm9kZSkudG8oMC4yLCB7IHNjYWxlOiAxLjA2IH0pLnRvKDAuMiwgeyBzY2FsZTogMCB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgIGxheW91dE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9KS5jYWxsKCgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCkpLnN0YXJ0KCk7XG4gICAgICB0aGlzLnNob3dCdXR0b25CYWNrKCk7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT1cbiAgIHNob3dBbGVydChtc2csIG9rQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5zaG93TGF5b3V0KFwibGF5ZXJfYWxlcnRcIik7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdDYW52YXMvbGF5ZXJfYWxlcnQvYmdfbXNnL2xhYmVsX21zZycpLCBtc2cpO1xuICAgICAgdGhpcy5hbGVydE9LQ2FsbGJhY2sgPSBva0NhbGxiYWNrO1xuICAgfSxcblxuICAgLy8gPT09PT09PVxuICAgaGlkZUxvYWRpbmdUaW1lcjogbnVsbCxcbiAgIHNob3dMb2FkaW5nKCkge1xuICAgICAgdGhpcy5zaG93TGF5b3V0KFwibGF5ZXJfbG9hZGluZ1wiKTtcblxuICAgICAgLy8gYXV0byB0dXJuIG9mZiBsb2FkaW5nIGlmIHNob3duIG1vcmUgdGhhbiAxMCBzZWNzIGJ1dCBub3QgYmVpbmcgdHVybmVkIG9mZlxuICAgICAgaWYgKHRoaXMuaGlkZUxvYWRpbmdUaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUxvYWRpbmdUaW1lcik7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZUxvYWRpbmcoKSwgMTAwMDApO1xuICAgfSxcbiAgIGhpZGVMb2FkaW5nKCkge1xuICAgICAgdGhpcy5oaWRlTGF5b3V0KFwibGF5ZXJfbG9hZGluZ1wiKTtcbiAgICAgIGlmICh0aGlzLmhpZGVMb2FkaW5nVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLmhpZGVMb2FkaW5nVGltZXIpO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT1cbiAgIC8vIG5hZyBzY3JlZW46IHByZXZlbnQgdXNlciBmcm9tIGNsaWNraW5nIGJ1dHRvbnMgd2hpbGUgc2hvd2luZyBhbmltYXRpb25zXG4gICBzaG93TmFnU2NyZWVuKHRpbWVvdXQ/OiBudW1iZXIpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9uYWdfc2NyZWVuJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGlmICh0aW1lb3V0KSBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlTmFnU2NyZWVuKCksIHRpbWVvdXQgKiAxMDAwKTtcbiAgIH0sXG4gICBoaWRlTmFnU2NyZWVuKCkge1xuICAgICAgY2MuZmluZCgnQ2FudmFzL25hZ19zY3JlZW4nKS5hY3RpdmUgPSBmYWxzZTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09IFNvbWUgc3lzdGVtIGxhYmVscyA9PT09PT09PT09PT09PT09XG4gICAvLyB1cGRhdGUgZ29sZCB0byBhbGwgcGxhY2VzIGluIGdhbWUgdWlcbiAgIHVwZGF0ZVVzZXJTdGF0cyhpc1NraXBVcGRhdGVVSSA9IGZhbHNlKSB7XG4gICAgICAvLyBjb2luc1xuICAgICAgaWYgKCFpc1NraXBVcGRhdGVVSSkge1xuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICAgICBjYy5maW5kKCdzdGFyMl9iaWcgMS9sYWJlbF9zdGFycycsIHRoaXMuaGVhZGVyQ29udGFpbmVyKSxcbiAgICAgICAgICAgIF8uZm9ybWF0TW9uZXkoX0cudXNlci5zdGFycylcbiAgICAgICAgICk7XG5cbiAgICAgICAgIC8vIGV4cFxuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICAgICBjYy5maW5kKCdleHBfaWNvbi9sYWJlbF9leHAnLCB0aGlzLmhlYWRlckNvbnRhaW5lciksXG4gICAgICAgICAgICBfLmZvcm1hdE1vbmV5KF9HLnVzZXIuZXhwKVxuICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICBjYy5maW5kKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvbGFiZWxfZ2FtZW92ZXJfc2NvcmUnKSxcbiAgICAgICAgIF8uZm9ybWF0TW9uZXkoX0cudXNlci5leHApXG4gICAgICApO1xuXG4gICAgICB0aGlzLnVwZGF0ZUJ0bkhpbnQoKTtcblxuICAgICAgLy8gbGV2ZWxcbiAgICAgIGlmICghaXNTa2lwVXBkYXRlVUkpIHtcbiAgICAgICAgIHRoaXMudXBkYXRlTGV2ZWxOdW1iZXIoKTtcbiAgICAgICAgIHRoaXMudXBkYXRlTGV2ZWxQcm9ncmVzc0JhcigpO1xuICAgICAgfVxuICAgfSxcblxuICAgLy8gYnV0dG9uIGhpbnQgb24vb2ZmXG4gICB1cGRhdGVCdG5IaW50KCkge1xuICAgICAgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlLmFjdGl2ZSA9IF9HLnVzZXIuc3RhcnMgPCBfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2U7XG4gICB9LFxuXG4gICB1cGRhdGVMZXZlbE51bWJlcigpIHtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS90aW1lX2xldmVsX2Jhci9sZXZlbC9sZXZlbF9udW0nKSwgJycgKyBfRy51c2VyLmxldmVsKTtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9leHBfcHJvZ3Jlc3NfYmFyL2xldmVsL2xldmVsX251bScpLCAnJyArIF9HLnVzZXIubGV2ZWwpO1xuICAgfSxcblxuXG4gICAvLyBwdXp6bGUgcHJvZ3Jlc3MgYmFyXG4gICB1cGRhdGVQdXp6bGVQcm9ncmVzc0JhcihyYXRpbywgZnhUaW1lID0gMCkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdiYXInLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIocHJvZ3Jlc3NCYXIsIHJhdGlvLCBmeFRpbWUpO1xuICAgfSxcblxuXG4gICAvLyBsZXZlbCBwcm9ncmVzcyBiYXJcbiAgIHVwZGF0ZUxldmVsUHJvZ3Jlc3NCYXIoZnhUaW1lID0gMCkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvZXhwX3Byb2dyZXNzX2Jhci9iYXInKTtcbiAgICAgIGNvbnN0IGlzRXZlbiA9ICEoX0cudXNlci5leHAgJSBfRy5jb25maWdHYW1lLmxldmVsVXBFeHApO1xuICAgICAgY29uc3QgcmF0aW8gPSBpc0V2ZW4gPyAxIDogMC41O1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0Jhcihwcm9ncmVzc0JhciwgcmF0aW8sIGZ4VGltZSk7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgaWYgKHJhdGlvID09IDEpIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIocHJvZ3Jlc3NCYXIsIDApO1xuICAgICAgfSwgNTAwMCk7XG4gICB9LFxuXG5cbiAgIHVwZGF0ZVByb2dyZXNzQmFyKGJhck5vZGU6IGNjLk5vZGUsIHJhdGlvLCBmeFRpbWUgPSAwKSB7XG4gICAgICBiYXJOb2RlLm9yZ1dpZHRoID0gYmFyTm9kZS5vcmdXaWR0aCB8fCBiYXJOb2RlLndpZHRoO1xuXG4gICAgICBjb25zdCBsYWJlbFBlcmNlbnRhZ2UgPSBjYy5maW5kKCdsYWJlbF9wZXJjZW50YWdlJywgYmFyTm9kZS5wYXJlbnQpO1xuICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwobGFiZWxQZXJjZW50YWdlLCBgJHtfLmZsb29yKHJhdGlvICogMTAwKX0lYCk7XG5cbiAgICAgIGNjLnR3ZWVuKGJhck5vZGUpLnRvKGZ4VGltZSwgeyB3aWR0aDogcmF0aW8gKiBiYXJOb2RlLm9yZ1dpZHRoIH0pLnN0YXJ0KCk7XG4gICB9LFxufSJdfQ==