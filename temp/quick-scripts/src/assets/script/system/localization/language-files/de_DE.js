"use strict";
cc._RF.push(module, '7191ezpsclCrZGFy0VpGGQK', 'de_DE');
// script/system/localization/language-files/de_DE.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'TEILEN',
    common_label_reward: 'BELOHNUNG',
    common_label_claim: 'BEHAUPTE',
    common_label_button_play: 'SPIEL',
    common_label_level_intro: 'LEVEL',
    label_loading_ad: 'Anzeigen werden geladen. Bitte warten',
    label_game_loading: 'LADEN',
    label_game_continue: 'WEITER',
    label_game_play_more_puzzle: 'MEHR RÄTSEL',
    label_gameplay_select_difficulty: 'SCHWIERIGKEIT WÄHLEN:',
    label_fx_video_error: 'Video-Fehler',
    label_settings_music: 'MUSIK',
    label_settings_sound: 'SOUNDS',
    label_tut_step_1: "Klicke auf zwei Figuren,\num sie zu bewegen und\nrichtig zu platzieren",
    label_tut_step_2: function () { return "Klicke hier und zahle " + _G.configGame.hintCoinPrice + "  <img src=\"icon_coin\" width=40 height=40/>,\num ein paar Teile zu l\u00F6sen."; },
    label_tut_step_3: "Das Zeitlimit f\u00FCr\njedes R\u00E4tsel h\u00E4ngt von der\nAnzahl der Teile ab.\n\nLass sie nicht ablaufen!",
    label_tut_btn_continue: 'WEITER',
    label_alert_intro: "SEHEN SIE SICH DAS\nVIDEO AN, UM " + _G.configGame.videoCoinReward + " M\u00DCNZEN\nZU VERDIENEN",
    label_alert_back: 'NICHT',
    label_alert_earn_stars: 'JA',
    label_level_up_header: 'NEUES LEVEL!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'WILLST DU\nDAS SPIEL\nFORTSETZEN?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'SPIEL VORBEI',
    label_gameover_score_intro: 'PUNKTESTAND:',
    label_gameover_btn_try_again: 'ERNEUT VERSUCHEN',
    label_gameover_no_thanks: 'NEIN, DANKE',
    label_home_button_play_w_friends: 'MIT FREUNDEN\nSPIELEN',
    label_share_intro_1: 'Können Sie mich schlagen?',
    label_share_intro_2: 'PUNKTESTAND:',
    label_win_well_done: 'Gut gemacht!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Lädt Sie ein, das Rätsel zu lösen!`,
    fb_invite_message_text: function (playerName) { return "Ich lade dich ein, dieses R\u00E4tsel zu l\u00F6sen"; },
    fb_invite_message_cta: 'SPIEL',
};

cc._RF.pop();