"use strict";
cc._RF.push(module, '29860DFamdN5ZCn5Wb24XC/', 'tr_TR');
// script/system/localization/language-files/tr_TR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'PAYLAŞ',
    common_label_reward: 'ÖDÜL',
    common_label_claim: 'AL',
    common_label_button_play: 'OYNA',
    common_label_level_intro: 'SEVIYE',
    label_loading_ad: 'Reklamlar yükleniyor. Lütfen bekleyin',
    label_game_loading: 'YÜKLENIYOR',
    label_game_continue: 'DEVAM',
    label_game_play_more_puzzle: 'DAHA ÇOK YAPBOZ',
    label_gameplay_select_difficulty: 'ZORLUK DERECESINI SEÇ',
    label_fx_video_error: 'Video hatası',
    label_settings_music: 'MÜZIK',
    label_settings_sound: 'SES',
    label_tut_step_1: "\u0130ki par\u00E7aya t\u0131klay\u0131p ta\u015F\u0131yarak\ndo\u011Fru yerlere yerle\u015Ftirin.",
    label_tut_step_2: function () { return "Buraya t\u0131klay\u0131p birka\u00E7\npar\u00E7ay\u0131 \u00E7\u00F6zmek i\u00E7in " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> \u00F6de."; },
    label_tut_step_3: "Her yapboz i\u00E7in\ns\u00FCre s\u0131n\u0131r\u0131 par\u00E7a say\u0131s\u0131na\nba\u011Fl\u0131 olarak de\u011Fi\u015Fecektir.\n\nSak\u0131n s\u00FCrenin\ndolmas\u0131na izin vermeyin!",
    label_tut_btn_continue: 'DEVAM',
    label_alert_intro: _G.configGame.videoCoinReward + " JETON KAZANMAK\nI\u00C7IN VIDEOYU IZLEYIN",
    label_alert_back: 'OLUMSUZLUK',
    label_alert_earn_stars: 'EVET',
    label_level_up_header: 'SEVIYE GEÇILDI!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'OYUNA DEVAM\nETMEK ISTIYOR\nMUSUNUZ?',
    label_pause_header: 'DURAKLAT',
    label_gameover_header: 'OYUN BITTI!',
    label_gameover_score_intro: 'PUAN',
    label_gameover_btn_try_again: 'TEKRAR DENE',
    label_gameover_no_thanks: 'HAYIR, TEŞEKKÜRLER',
    label_home_button_play_w_friends: 'ARKADAŞLARINLA\nOYNA',
    label_share_intro_1: 'Beni yenebilir misin?',
    label_share_intro_2: 'PUAN:',
    label_win_well_done: 'Aferin!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Bulmacayı çözmek için davet ediyor!`,
    fb_invite_message_text: function (playerName) { return "Seni bu Yapbozu \u00E7\u00F6zmen i\u00E7in davet ediyorum."; },
    fb_invite_message_cta: 'OYNA',
};

cc._RF.pop();