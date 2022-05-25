"use strict";
cc._RF.push(module, 'e0dc5MvQdREN7dWh2ZAwfX1', 'en_US');
// script/system/localization/language-files/en_US.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'SHARE',
    common_label_reward: 'REWARD',
    common_label_claim: 'CLAIM',
    common_label_button_play: 'PLAY',
    common_label_level_intro: 'LEVEL',
    label_loading_ad: 'Loading ads. Please wait',
    label_game_loading: 'LOADING',
    label_game_continue: 'CONTINUE',
    label_game_play_more_puzzle: 'MORE PUZZLES',
    label_gameplay_select_difficulty: 'SELECT DIFFICULTY',
    label_fx_video_error: 'Video error',
    label_settings_music: 'MUSIC',
    label_settings_sound: 'SOUNDS',
    label_tut_step_1: "Click on two pieces to move\nthem and place them correctly",
    label_tut_step_2: function () { return "Click here and pay " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> to\nsolve a couple of pieces."; },
    label_tut_step_3: "The time limit for each\npuzzle will depend on the\nnumber of pieces.\n\nDon't let it run out!",
    label_tut_btn_continue: 'CONTINUE',
    label_alert_intro: "WATCH A VIDEO TO\nEARN " + _G.configGame.videoCoinReward + " COINS",
    label_alert_back: 'NO',
    label_alert_earn_stars: 'YES',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'DO YOU WANT\nTO RESUME\nTHE GAME?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'GAME OVER',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'TRY AGAIN',
    label_gameover_no_thanks: 'NO, THANKS',
    label_home_button_play_w_friends: 'PLAY WITH\nFRIENDS',
    label_share_intro_1: 'Can you beat me?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Well done!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} invites you to solve a puzzle!`,
    fb_invite_message_text: function (playerName) { return "I invite you to solve this Puzzle"; },
    fb_invite_message_cta: 'PLAY NOW',
};

cc._RF.pop();