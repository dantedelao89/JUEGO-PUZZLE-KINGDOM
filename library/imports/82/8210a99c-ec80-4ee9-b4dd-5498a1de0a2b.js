"use strict";
cc._RF.push(module, '8210amc7IBO6bTdVJih3gor', 'pt_PT');
// script/system/localization/language-files/pt_PT.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'COMPARTILHAR',
    common_label_reward: 'RECOMPENSA',
    common_label_claim: 'REIVINDICAR',
    common_label_button_play: 'JOGAR',
    common_label_level_intro: 'NÍVEL',
    label_loading_ad: 'Carregando anúncios. Por favor, espere',
    label_game_loading: 'CARREGANDO',
    label_game_continue: 'CONTINUAR',
    label_game_play_more_puzzle: 'MAIS QUEBRA-CABEÇAS',
    label_gameplay_select_difficulty: 'SELECIONAR A DIFICULDADE',
    label_fx_video_error: 'Erro no vídeo',
    label_settings_music: 'MÚSICA',
    label_settings_sound: 'SONS',
    label_tut_step_1: "Clique em duas pe\u00E7as para mov\u00EA-las\ne posicion\u00E1-las corretamente",
    label_tut_step_2: function () { return "Clique aqui e pague " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> para\nresolver algumas pe\u00E7as."; },
    label_tut_step_3: "O limite de tempo para\ncada quebra-cabe\u00E7a depender\u00E1\ndo n\u00FAmero de pe\u00E7as.\n\n\u00A1N\u00E3o deixe o tempo acabar!",
    label_tut_btn_continue: 'CONTINUAR',
    label_alert_intro: "VER UM V\u00CDDEO PARA\nGANHAR " + _G.configGame.videoCoinReward + " MOEDAS",
    label_alert_back: 'NÃO',
    label_alert_earn_stars: 'SIM',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'DESEJA RETOMAR\nO JOGO?',
    label_pause_header: 'PAUSAR',
    label_gameover_header: 'FIM DE JOGO',
    label_gameover_score_intro: 'PONTUAÇÃO:',
    label_gameover_btn_try_again: 'TENTE NOVAMENTE',
    label_gameover_no_thanks: 'NÃO, OBRIGADO',
    label_home_button_play_w_friends: 'JOGAR COM\nAMIGOS',
    label_share_intro_1: 'Você pode me vencer?',
    label_share_intro_2: 'PONTUAÇÃO:',
    label_win_well_done: 'Muito bem!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} convida você a resolver este puzzle!`,
    fb_invite_message_text: function (playerName) { return "Te convido a resolver este quebra-cabe\u00E7a"; },
    fb_invite_message_cta: 'JOGAR',
};

cc._RF.pop();