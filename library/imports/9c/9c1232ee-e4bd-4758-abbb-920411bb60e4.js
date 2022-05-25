"use strict";
cc._RF.push(module, '9c123Lu5L1HWKu7kgQRu2Dk', 'bind_button_handlers');
// script/system/ui-fx/bind_button_handlers.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindButtonHandlers = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
exports.bindButtonHandlers = {
    run: function () {
        // game over
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_replay', function () {
            _G.coreUI.hideLayout('layout_game_over');
            _G.coreUI.showButtonBack();
            _G.gameMechanic.replay();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/label_gameover_no_thanks', function () {
            _G.coreUI.hideLayout('layout_game_over');
            _G.coreUI.showButtonBack();
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
        });
        // layout home
        _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play', function () {
            _G.coreUI.hideLayout('layout_home');
            _G.coreUI.showButtonBack();
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play_w_friends', function () {
            _G.social.inviteHome(function () {
                _G.coreUI.hideLayout('layout_home');
                _G.coreUI.setUIPlayState(_G.types.gameState.category);
            });
        });
        // layout pause
        _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_home', function () {
            _G.coreUI.hideLayoutAnim('layout_pause', function () {
                _G.coreUI.showLayout('layout_home');
                _G.coreUI.hideButtonBack();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_resume', function () {
            _G.coreUI.hideLayoutAnim('layout_pause', function () {
                _G.gameMechanic.onResume();
            });
        });
        // tut continue
        _G.utilsUI.makeBubbleButton('Canvas/layout_tutorial/dialog/btn_continue', function () {
            _G.tutorial.onBtnContinue();
        });
        // win => claim
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_ok', function () {
            if (!_G.user.isVersionV2) {
                _G.interAd.checkToShowInterAd(function () {
                    _G.coreFX.playWinClaimAnim();
                });
            }
            else
                _G.coreFX.playWinClaimAnim();
        });
        // btn hint & hint disabled
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_hint', function () { return _G.gameMechanic.onHint(); });
        _G.utilsUI.makeBubbleButton(_G.coreUI.btnHintDisabledNode, function () {
            _G.gameMechanic.onPause();
            _G.coreUI.showLayoutAnim('layout_alert');
        });
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_pause', function () {
            _G.gameMechanic.onPause(true);
        });
        // game tab size 3x3 5x5
        var gMechanic = _G.gameMechanic;
        _G.coreUI.tabButtonContainer.children.map(function (tabBtnNode) {
            _G.utilsUI.makeButton(tabBtnNode, function () {
                var sizes = tabBtnNode.name.split('x').map(function (t) { return parseInt(t); });
                gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, sizes[0], sizes[1]);
            });
        });
        // btn play
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play', function () { return gMechanic.startGame(); });
        // btn_play_v2
        var showPreview3x3 = function () {
            gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
        };
        _G.utilsUI.makeButton('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid_cover', function () {
            if (_G.coreUI.currentState === _G.types.gameState.v2) {
                _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
                showPreview3x3();
            }
            else
                gMechanic.startGame();
        });
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play_v2', function () {
            _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
            showPreview3x3();
        });
        //  UI back
        _G.utilsUI.makeBubbleButton(cc.find('btn_back', _G.coreUI.headerContainer), function () { return _G.coreUI.back(); });
        //  close level up
        _G.utilsUI.makeBubbleButton('Canvas/layout_level_up/dialog/btn_ok', function () {
            if (_G.coreFX.isPlayingFxStarsAdd)
                return;
            _G.coreFX.fxAddCoins(cc.find('Canvas/layout_level_up/dialog/star_num_base/star2_big 1'), _G.configGame.levelUpCoinReward);
            _G.coreUI.hideLayoutAnim('layout_level_up', function () {
                gMechanic.playNextRandomPuzzle();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_close', function () {
            _G.coreUI.hideLayoutAnim('layout_alert', function () {
                gMechanic.onResume();
            });
        });
        // settings
        _G.utilsUI.makeBubbleButton(cc.find('btn_settings', _G.coreUI.headerContainer), function () {
            _G.gameMechanic.onPause();
            _G.coreUI.showLayout('layout_settings');
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_settings/dialog/btn_back', function () {
            _G.coreUI.hideLayout('layout_settings');
            if (gMechanic.isPlaying()
                && !cc.find('Canvas/layout_alert').active)
                _G.gameMechanic.onResume();
        });
        // ============================
        // social
        // --------------- invite
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_invite', function () {
            _G.gameMechanic.onPause();
            _G.social.invite(function () {
                if (gMechanic.isPlaying())
                    _G.gameMechanic.onResume();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_invite', function () {
            _G.social.invite();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_invite', function () {
            _G.social.invite();
        });
        // --------------- share
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_share', function () {
            _G.social.share(true);
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_share', function () {
            _G.social.share();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_share', function () {
            _G.social.share();
        });
        // ============================
        // video ads
        _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_video', function () {
            _G.coreUI.showNagScreen();
            _G.video.showVideo(function () {
                var starNum = _G.configGame.videoCoinReward;
                var baseNode = cc.find('Canvas/layout_alert/dialog/btn_video');
                _G.user.addStars(starNum, true);
                _G.coreUI.updateBtnHint();
                _G.coreFX.fxAddCoins(baseNode, starNum);
                _G.coreUI.showNagScreen(2);
                _.setTimeout(function () {
                    _G.coreUI.hideLayoutAnim('layout_alert', function () {
                        if (gMechanic.isPlaying())
                            _G.gameMechanic.onResume();
                    });
                }, 2000);
            }, function () {
                _G.coreUI.hideNagScreen();
                _G.coreFX.showVideoError(270);
            });
        });
        // _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_video', () => {
        //    _G.coreUI.showNagScreen();
        //    _G.video.showVideo(
        //       () => {
        //          const starNum = _G.configGame.winStar[_G.gameMechanic.currentSizeMode];
        //          const baseNode = cc.find('Canvas/layout_win/dialog/btn_video');
        //          _G.user.addStars(starNum, true); // only add starNum instead of 2 * starNum cause already silently added starNum when win
        //          _G.coreUI.updateBtnHint();
        //          _G.coreFX.fxAddCoins(baseNode, 2 * starNum);
        //          _G.coreUI.showNagScreen(2);
        //          _.setTimeout(() => {
        //             _G.coreUI.hideLayoutAnim('layout_win', () => _G.gameMechanic.checkToShowLevelUp());
        //          }, 2000);
        //       },
        //       () => {
        //          _G.coreUI.hideNagScreen();
        //          _G.coreFX.showVideoError(410);
        //       }
        //    );
        // });
    },
};

cc._RF.pop();