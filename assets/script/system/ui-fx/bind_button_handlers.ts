import * as _G from '../../system/all_modules';
const _ = _G._;

export const bindButtonHandlers = {
   run() {
      // game over
      _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_replay', () => {
         _G.coreUI.hideLayout('layout_game_over');
         _G.coreUI.showButtonBack();
         _G.gameMechanic.replay();
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/label_gameover_no_thanks', () => {
         _G.coreUI.hideLayout('layout_game_over');
         _G.coreUI.showButtonBack();
         _G.coreUI.setUIPlayState(_G.types.gameState.category);
      });

      // layout home
      _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play', () => {
         _G.coreUI.hideLayout('layout_home');
         _G.coreUI.showButtonBack();
         _G.coreUI.setUIPlayState(_G.types.gameState.category);
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play_w_friends', () => {
         _G.social.inviteHome(() => {
            _G.coreUI.hideLayout('layout_home');
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
         });
      });


      // layout pause
      _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_home', () => {
         _G.coreUI.hideLayoutAnim('layout_pause', () => {
            _G.coreUI.showLayout('layout_home');
            _G.coreUI.hideButtonBack();
         });
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_resume', () => {
         _G.coreUI.hideLayoutAnim('layout_pause', () => {
            _G.gameMechanic.onResume();
         });
      });


      // tut continue
      _G.utilsUI.makeBubbleButton('Canvas/layout_tutorial/dialog/btn_continue', () => {
         _G.tutorial.onBtnContinue();
      });


      // win => claim
      _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_ok', () => {
         if (!_G.user.isVersionV2) {
            _G.interAd.checkToShowInterAd(() => {
               _G.coreFX.playWinClaimAnim();
            });
         }
         else _G.coreFX.playWinClaimAnim();
      });

      // btn hint & hint disabled
      _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_hint', () => _G.gameMechanic.onHint());
      _G.utilsUI.makeBubbleButton(_G.coreUI.btnHintDisabledNode, () => {
         _G.gameMechanic.onPause();
         _G.coreUI.showLayoutAnim('layout_alert');
      });


      _G.utilsUI.makeBubbleButton(
         'Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_pause',
         () => {
            _G.gameMechanic.onPause(true);
         }
      );


      // game tab size 3x3 5x5
      const gMechanic = _G.gameMechanic;
      _G.coreUI.tabButtonContainer.children.map(tabBtnNode => {
         _G.utilsUI.makeButton(tabBtnNode, () => {
            const sizes = tabBtnNode.name.split('x').map(t => parseInt(t));
            gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, sizes[0], sizes[1]);
         });
      });

      // btn play
      _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play', () => gMechanic.startGame());


      // btn_play_v2
      const showPreview3x3 = () => {
         gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
      }
      _G.utilsUI.makeButton('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid_cover', () => {
         if (_G.coreUI.currentState === _G.types.gameState.v2) {
            _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
            showPreview3x3();
         }
         else gMechanic.startGame();
      });

      _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play_v2', () => {
         _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
         showPreview3x3();
      });

      //  UI back
      _G.utilsUI.makeBubbleButton(cc.find('btn_back', _G.coreUI.headerContainer), () => _G.coreUI.back());

      //  close level up
      _G.utilsUI.makeBubbleButton('Canvas/layout_level_up/dialog/btn_ok', () => {
         if (_G.coreFX.isPlayingFxStarsAdd) return;
         _G.coreFX.fxAddCoins(
            cc.find('Canvas/layout_level_up/dialog/star_num_base/star2_big 1'),
            _G.configGame.levelUpCoinReward
         );

         _G.coreUI.hideLayoutAnim('layout_level_up', () => {
            gMechanic.playNextRandomPuzzle();
         });
      });
      _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_close', () => {
         _G.coreUI.hideLayoutAnim('layout_alert', () => {
            gMechanic.onResume();
         });
      });

      // settings
      _G.utilsUI.makeBubbleButton(cc.find('btn_settings', _G.coreUI.headerContainer), () => {
         _G.gameMechanic.onPause();
         _G.coreUI.showLayout('layout_settings');
      });
      _G.utilsUI.makeBubbleButton('Canvas/layout_settings/dialog/btn_back', () => {
         _G.coreUI.hideLayout('layout_settings');
         if (
            gMechanic.isPlaying()
            && !cc.find('Canvas/layout_alert').active
         ) _G.gameMechanic.onResume();
      });

      // ============================
      // social

      // --------------- invite
      _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_invite', () => {
         _G.gameMechanic.onPause();
         _G.social.invite(() => {
            if (gMechanic.isPlaying()) _G.gameMechanic.onResume();
         });
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_invite', () => {
         _G.social.invite();
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_invite', () => {
         _G.social.invite();
      });


      // --------------- share
      _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_share', () => {
         _G.social.share(true);
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_share', () => {
         _G.social.share();
      });

      _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_share', () => {
         _G.social.share();
      });


      // ============================
      // video ads

      _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_video', () => {
         _G.coreUI.showNagScreen();
         _G.video.showVideo(
            () => {
               const starNum = _G.configGame.videoCoinReward;
               const baseNode = cc.find('Canvas/layout_alert/dialog/btn_video');
               _G.user.addStars(starNum, true);
               _G.coreUI.updateBtnHint();
               _G.coreFX.fxAddCoins(baseNode, starNum);
               _G.coreUI.showNagScreen(2);
               _.setTimeout(() => {
                  _G.coreUI.hideLayoutAnim('layout_alert', () => {
                     if (gMechanic.isPlaying()) _G.gameMechanic.onResume();
                  });

               }, 2000);
            },
            () => {
               _G.coreUI.hideNagScreen();
               _G.coreFX.showVideoError(270);
            }
         );
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



}