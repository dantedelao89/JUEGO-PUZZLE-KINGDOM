"use strict";
cc._RF.push(module, 'fe7d8rtYilGzZPJ5JyltzKp', 'it_IT');
// script/system/localization/language-files/it_IT.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'CONDIVIDI',
    common_label_reward: 'RICOMPENSA',
    common_label_claim: 'RISCATTA',
    common_label_button_play: 'GIOCA',
    common_label_level_intro: 'LIVELLO',
    label_loading_ad: 'Caricamento annunci in corso. Attendi',
    label_game_loading: 'CARICANDO',
    label_game_continue: 'CONTINUA',
    label_game_play_more_puzzle: 'PIÙ PUZZLE',
    label_gameplay_select_difficulty: 'SELEZIONA DIFFICOLTÀ:',
    label_fx_video_error: 'Errore video',
    label_settings_music: 'MUSICA',
    label_settings_sound: 'SUONI',
    label_tut_step_1: "Clicca su due pezzi per muoverli\ne posizionali correttamente",
    label_tut_step_2: function () { return "Clicca qui e paga " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> \nper risolvere alcuni pezzi"; },
    label_tut_step_3: "Il tempo limite di\nogni puzzle dipender\u00E0\ndal numero di pezzi.\n\nNon farlo finire!",
    label_tut_btn_continue: 'CONTINUA',
    label_alert_intro: "GUARDA IL VIDEO PER\nGUADAGNARE " + _G.configGame.videoCoinReward + " MONETE",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'SÌ',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VUOI RIPRENDERE\nIL GIOCO?',
    label_pause_header: 'PAUSA',
    label_gameover_header: 'FINE DEL GIOCO',
    label_gameover_score_intro: 'PUNTEGGIO:',
    label_gameover_btn_try_again: 'PROVA DI NUOVO',
    label_gameover_no_thanks: 'NO, GRAZIE',
    label_home_button_play_w_friends: 'GIOCA CON\nGLI AMICI',
    label_share_intro_1: 'Riesci a battermi?',
    label_share_intro_2: 'PUNTEGGIO:',
    label_win_well_done: 'Molto bene!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Vi invita a risolvere il puzzle!`,
    fb_invite_message_text: function (playerName) { return "Ti invito a risolvere questo Puzzle"; },
    fb_invite_message_cta: 'GIOCA',
};

cc._RF.pop();