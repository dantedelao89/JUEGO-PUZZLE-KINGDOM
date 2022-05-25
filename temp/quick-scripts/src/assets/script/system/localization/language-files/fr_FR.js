"use strict";
cc._RF.push(module, 'ecab3cCIppDSpZiK4lgRa5D', 'fr_FR');
// script/system/localization/language-files/fr_FR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'PARTAGER',
    common_label_reward: 'RÉCOMPENSE',
    common_label_claim: 'RÉCLAMER',
    common_label_button_play: 'JOUER À',
    common_label_level_intro: 'NIVEAU',
    label_loading_ad: 'Chargement des annonces. Veuillez patienter',
    label_game_loading: 'CHARGEMENT DE',
    label_game_continue: 'CONTINUER',
    label_game_play_more_puzzle: 'PLUS DE PUZZLES',
    label_gameplay_select_difficulty: 'SÉLECTIONNEZ LA DIFFICULTÉ',
    label_fx_video_error: 'Erreur vidéo',
    label_settings_music: 'MUSIQUE',
    label_settings_sound: 'SONS',
    label_tut_step_1: "Cliquez sur deux pi\u00E8ces pour les\nd\u00E9placer et les placer correctement.",
    label_tut_step_2: function () { return "Cliquez ici et payez " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> pour\nr\u00E9soudre un couple de pi\u00E8ces."; },
    label_tut_step_3: "\"Le temps limite pour\nchaque puzzle d\u00E9pendra\ndu nombre de pi\u00E8ces.\n\nNe le laissez pas s'\u00E9puiser !\"",
    label_tut_btn_continue: 'CONTINUER',
    label_alert_intro: "REGARDEZ UNE VID\u00C9O\nPOUR GAGNER " + _G.configGame.videoCoinReward + " PI\u00C8CES",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'OUI',
    label_level_up_header: 'MONTEZ DE NIVEAU !',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VOULEZ-VOUS\nREPRENDRE LE\nJEU ?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'TERMINÉ',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'ESSAYER À NOUVEAU',
    label_gameover_no_thanks: 'NON, MERCI',
    label_home_button_play_w_friends: 'JOUER AVEC\nDES AMIS',
    label_share_intro_1: 'Pouvez-vous me battre?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Bien joué !',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} vous invite à résoudre un puzzle!`,
    fb_invite_message_text: function (playerName) { return "Je vous invite \u00E0 r\u00E9soudre cette \u00E9nigme"; },
    fb_invite_message_cta: 'JOUER À',
};

cc._RF.pop();