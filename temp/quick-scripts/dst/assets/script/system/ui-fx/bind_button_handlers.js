
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/bind_button_handlers.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2JpbmRfYnV0dG9uX2hhbmRsZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUMvQyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRUYsUUFBQSxrQkFBa0IsR0FBRztJQUMvQixHQUFHO1FBQ0EsWUFBWTtRQUNaLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLEVBQUU7WUFDdEUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHlEQUF5RCxFQUFFO1lBQ3BGLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG9DQUFvQyxFQUFFO1lBQy9ELEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFD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QUMsQ0FBQztZQUNaLENBQUMsRUFDRDtnQkFDRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQ0gsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBR0gsNEVBQTRFO1FBQzVFLGdDQUFnQztRQUNoQyx5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLG1GQUFtRjtRQUNuRiwyRUFBMkU7UUFDM0UscUlBQXFJO1FBQ3JJLHNDQUFzQztRQUN0Qyx3REFBd0Q7UUFDeEQsdUNBQXVDO1FBQ3ZDLGdDQUFnQztRQUNoQyxrR0FBa0c7UUFDbEcscUJBQXFCO1FBQ3JCLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQyxVQUFVO1FBQ1YsUUFBUTtRQUNSLE1BQU07SUFHVCxDQUFDO0NBSUgsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0IGNvbnN0IGJpbmRCdXR0b25IYW5kbGVycyA9IHtcbiAgIHJ1bigpIHtcbiAgICAgIC8vIGdhbWUgb3ZlclxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvYnRuX3JlcGxheScsICgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0KCdsYXlvdXRfZ2FtZV9vdmVyJyk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0J1dHRvbkJhY2soKTtcbiAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5yZXBsYXkoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyL2RpYWxvZy9sYWJlbF9nYW1lb3Zlcl9ub190aGFua3MnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2dhbWVfb3ZlcicpO1xuICAgICAgICAgX0cuY29yZVVJLnNob3dCdXR0b25CYWNrKCk7XG4gICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLmNhdGVnb3J5KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBsYXlvdXQgaG9tZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2hvbWUvZGlhbG9nL2J0bl9wbGF5JywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF9ob21lJyk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0J1dHRvbkJhY2soKTtcbiAgICAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9ob21lL2RpYWxvZy9idG5fcGxheV93X2ZyaWVuZHMnLCAoKSA9PiB7XG4gICAgICAgICBfRy5zb2NpYWwuaW52aXRlSG9tZSgoKSA9PiB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2hvbWUnKTtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyBsYXlvdXQgcGF1c2VcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9wYXVzZS9kaWFsb2cvYnRuX2hvbWUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF9wYXVzZScsICgpID0+IHtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TGF5b3V0KCdsYXlvdXRfaG9tZScpO1xuICAgICAgICAgICAgX0cuY29yZVVJLmhpZGVCdXR0b25CYWNrKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfcGF1c2UvZGlhbG9nL2J0bl9yZXN1bWUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF9wYXVzZScsICgpID0+IHtcbiAgICAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblJlc3VtZSgpO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyB0dXQgY29udGludWVcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF90dXRvcmlhbC9kaWFsb2cvYnRuX2NvbnRpbnVlJywgKCkgPT4ge1xuICAgICAgICAgX0cudHV0b3JpYWwub25CdG5Db250aW51ZSgpO1xuICAgICAgfSk7XG5cblxuICAgICAgLy8gd2luID0+IGNsYWltXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9idG5fb2snLCAoKSA9PiB7XG4gICAgICAgICBpZiAoIV9HLnVzZXIuaXNWZXJzaW9uVjIpIHtcbiAgICAgICAgICAgIF9HLmludGVyQWQuY2hlY2tUb1Nob3dJbnRlckFkKCgpID0+IHtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5wbGF5V2luQ2xhaW1BbmltKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2UgX0cuY29yZUZYLnBsYXlXaW5DbGFpbUFuaW0oKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBidG4gaGludCAmIGhpbnQgZGlzYWJsZWRcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3Rlci92aWV3L2NvbnRlbnQvZ3JpZF9hcmVhL3BsYXlpbmdfYnV0dG9uX2Jhci9idG5faGludCcsICgpID0+IF9HLmdhbWVNZWNoYW5pYy5vbkhpbnQoKSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oX0cuY29yZVVJLmJ0bkhpbnREaXNhYmxlZE5vZGUsICgpID0+IHtcbiAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblBhdXNlKCk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9hbGVydCcpO1xuICAgICAgfSk7XG5cblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKFxuICAgICAgICAgJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9wbGF5aW5nX2J1dHRvbl9iYXIvYnRuX3BhdXNlJyxcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblBhdXNlKHRydWUpO1xuICAgICAgICAgfVxuICAgICAgKTtcblxuXG4gICAgICAvLyBnYW1lIHRhYiBzaXplIDN4MyA1eDVcbiAgICAgIGNvbnN0IGdNZWNoYW5pYyA9IF9HLmdhbWVNZWNoYW5pYztcbiAgICAgIF9HLmNvcmVVSS50YWJCdXR0b25Db250YWluZXIuY2hpbGRyZW4ubWFwKHRhYkJ0bk5vZGUgPT4ge1xuICAgICAgICAgX0cudXRpbHNVSS5tYWtlQnV0dG9uKHRhYkJ0bk5vZGUsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpemVzID0gdGFiQnRuTm9kZS5uYW1lLnNwbGl0KCd4JykubWFwKHQgPT4gcGFyc2VJbnQodCkpO1xuICAgICAgICAgICAgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgc2l6ZXNbMF0sIHNpemVzWzFdKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGJ0biBwbGF5XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9idG5fcGxheScsICgpID0+IGdNZWNoYW5pYy5zdGFydEdhbWUoKSk7XG5cblxuICAgICAgLy8gYnRuX3BsYXlfdjJcbiAgICAgIGNvbnN0IHNob3dQcmV2aWV3M3gzID0gKCkgPT4ge1xuICAgICAgICAgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG4gICAgICB9XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdXR0b24oJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9ncmlkX3N0YWNrL2dyaWRfY292ZXInLCAoKSA9PiB7XG4gICAgICAgICBpZiAoX0cuY29yZVVJLmN1cnJlbnRTdGF0ZSA9PT0gX0cudHlwZXMuZ2FtZVN0YXRlLnYyKSB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG4gICAgICAgICAgICBzaG93UHJldmlldzN4MygpO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSBnTWVjaGFuaWMuc3RhcnRHYW1lKCk7XG4gICAgICB9KTtcblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvYnRuX3BsYXlfdjInLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG4gICAgICAgICBzaG93UHJldmlldzN4MygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vICBVSSBiYWNrXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oY2MuZmluZCgnYnRuX2JhY2snLCBfRy5jb3JlVUkuaGVhZGVyQ29udGFpbmVyKSwgKCkgPT4gX0cuY29yZVVJLmJhY2soKSk7XG5cbiAgICAgIC8vICBjbG9zZSBsZXZlbCB1cFxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2xldmVsX3VwL2RpYWxvZy9idG5fb2snLCAoKSA9PiB7XG4gICAgICAgICBpZiAoX0cuY29yZUZYLmlzUGxheWluZ0Z4U3RhcnNBZGQpIHJldHVybjtcbiAgICAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKFxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cC9kaWFsb2cvc3Rhcl9udW1fYmFzZS9zdGFyMl9iaWcgMScpLFxuICAgICAgICAgICAgX0cuY29uZmlnR2FtZS5sZXZlbFVwQ29pblJld2FyZFxuICAgICAgICAgKTtcblxuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXRBbmltKCdsYXlvdXRfbGV2ZWxfdXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBnTWVjaGFuaWMucGxheU5leHRSYW5kb21QdXp6bGUoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfYWxlcnQvZGlhbG9nL2J0bl9jbG9zZScsICgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X2FsZXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgZ01lY2hhbmljLm9uUmVzdW1lKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR0aW5nc1xuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKGNjLmZpbmQoJ2J0bl9zZXR0aW5ncycsIF9HLmNvcmVVSS5oZWFkZXJDb250YWluZXIpLCAoKSA9PiB7XG4gICAgICAgICBfRy5nYW1lTWVjaGFuaWMub25QYXVzZSgpO1xuICAgICAgICAgX0cuY29yZVVJLnNob3dMYXlvdXQoJ2xheW91dF9zZXR0aW5ncycpO1xuICAgICAgfSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfc2V0dGluZ3MvZGlhbG9nL2J0bl9iYWNrJywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF9zZXR0aW5ncycpO1xuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZ01lY2hhbmljLmlzUGxheWluZygpXG4gICAgICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydCcpLmFjdGl2ZVxuICAgICAgICAgKSBfRy5nYW1lTWVjaGFuaWMub25SZXN1bWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvLyBzb2NpYWxcblxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tIGludml0ZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvcGxheWluZ19idXR0b25fYmFyL2J0bl9pbnZpdGUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5nYW1lTWVjaGFuaWMub25QYXVzZSgpO1xuICAgICAgICAgX0cuc29jaWFsLmludml0ZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ01lY2hhbmljLmlzUGxheWluZygpKSBfRy5nYW1lTWVjaGFuaWMub25SZXN1bWUoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl9pbnZpdGUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5zb2NpYWwuaW52aXRlKCk7XG4gICAgICB9KTtcblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvYnRuX2ludml0ZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5pbnZpdGUoKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBzaGFyZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvYnRuX3NoYXJlJywgKCkgPT4ge1xuICAgICAgICAgX0cuc29jaWFsLnNoYXJlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl9zaGFyZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5zaGFyZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9nYW1lX292ZXIvZGlhbG9nL2J0bl9zaGFyZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5zaGFyZSgpO1xuICAgICAgfSk7XG5cblxuICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLy8gdmlkZW8gYWRzXG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9hbGVydC9kaWFsb2cvYnRuX3ZpZGVvJywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oKTtcbiAgICAgICAgIF9HLnZpZGVvLnNob3dWaWRlbyhcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIGNvbnN0IHN0YXJOdW0gPSBfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZDtcbiAgICAgICAgICAgICAgIGNvbnN0IGJhc2VOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydC9kaWFsb2cvYnRuX3ZpZGVvJyk7XG4gICAgICAgICAgICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJOdW0sIHRydWUpO1xuICAgICAgICAgICAgICAgX0cuY29yZVVJLnVwZGF0ZUJ0bkhpbnQoKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKGJhc2VOb2RlLCBzdGFyTnVtKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKDIpO1xuICAgICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X2FsZXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGdNZWNoYW5pYy5pc1BsYXlpbmcoKSkgX0cuZ2FtZU1lY2hhbmljLm9uUmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgX0cuY29yZVVJLmhpZGVOYWdTY3JlZW4oKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5zaG93VmlkZW9FcnJvcigyNzApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl92aWRlbycsICgpID0+IHtcbiAgICAgIC8vICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICAvLyAgICBfRy52aWRlby5zaG93VmlkZW8oXG4gICAgICAvLyAgICAgICAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICBjb25zdCBzdGFyTnVtID0gX0cuY29uZmlnR2FtZS53aW5TdGFyW19HLmdhbWVNZWNoYW5pYy5jdXJyZW50U2l6ZU1vZGVdO1xuICAgICAgLy8gICAgICAgICAgY29uc3QgYmFzZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvYnRuX3ZpZGVvJyk7XG4gICAgICAvLyAgICAgICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJOdW0sIHRydWUpOyAvLyBvbmx5IGFkZCBzdGFyTnVtIGluc3RlYWQgb2YgMiAqIHN0YXJOdW0gY2F1c2UgYWxyZWFkeSBzaWxlbnRseSBhZGRlZCBzdGFyTnVtIHdoZW4gd2luXG4gICAgICAvLyAgICAgICAgICBfRy5jb3JlVUkudXBkYXRlQnRuSGludCgpO1xuICAgICAgLy8gICAgICAgICAgX0cuY29yZUZYLmZ4QWRkQ29pbnMoYmFzZU5vZGUsIDIgKiBzdGFyTnVtKTtcbiAgICAgIC8vICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKDIpO1xuICAgICAgLy8gICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X3dpbicsICgpID0+IF9HLmdhbWVNZWNoYW5pYy5jaGVja1RvU2hvd0xldmVsVXAoKSk7XG4gICAgICAvLyAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgIC8vICAgICAgIH0sXG4gICAgICAvLyAgICAgICAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuICAgICAgLy8gICAgICAgICAgX0cuY29yZUZYLnNob3dWaWRlb0Vycm9yKDQxMCk7XG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICApO1xuICAgICAgLy8gfSk7XG5cblxuICAgfSxcblxuXG5cbn0iXX0=