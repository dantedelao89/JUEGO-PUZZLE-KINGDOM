"use strict";
cc._RF.push(module, '650ec1b7gpP55CwdTThVL70', 'ar_AR');
// script/system/localization/language-files/ar_AR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'شارك',
    common_label_reward: 'جائزة',
    common_label_claim: 'اجمع العملات\n التي ربحتها',
    common_label_button_play: 'العب',
    common_label_level_intro: 'المستوى',
    label_loading_ad: 'تحميل الإعلانات الرجاء الانتظار',
    label_game_loading: 'تحميل',
    label_game_continue: 'استمر',
    label_game_play_more_puzzle: 'المزيد من الأحجيات',
    label_gameplay_select_difficulty: 'اختر مستوى الصعوبة',
    label_fx_video_error: 'خطأ في عرض الفيديو',
    label_settings_music: 'الموسيقى',
    label_settings_sound: 'الأصوات',
    label_tut_step_1: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0642\u0637\u0639\u062A\u064A\u0646 \u0644\u062A\u062D\u0631\u0643\u0647\u0645\u0627\n\u0648\u062A\u0636\u0639\u0647\u0645\u0627 \u0641\u064A \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0635\u062D\u064A\u062D",
    label_tut_step_2: function () { return "\u0627\u0646\u0642\u0631 \u0647\u0646\u0627 \u0648\u0627\u062F\u0641\u0639  <img src=\"icon_coin\" width=40 height=40/> " + _G.configGame.hintCoinPrice + "\n \u0644\u0645\u0639\u0631\u0641\u0629 \u0645\u0643\u0627\u0646 \u0628\u0636\u0639 \u0642\u0637\u0639."; },
    label_tut_step_3: "\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0627\u062D \u0644\u062D\u0644 \u0643\u0644 \u0623\u062D\u062C\u064A\u0629 \n\u0633\u064A\u064F\u062D\u062F\u062F \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0639\u062F\u062F \u0642\u0637\u0639 \u0627\u0644\u0623\u062D\u062C\u064A\u0629. \n\n\u0644\u0627 \u062A\u062F\u0639 \u0627\u0644\u0648\u0642\u062A \u064A\u0646\u0641\u0630 \u0645\u0646\u0643!",
    label_tut_btn_continue: 'استمر',
    label_alert_intro: "\u0634\u0627\u0647\u062F \u0641\u064A\u062F\u064A\u0648 \u0644\u062A\u0631\u0628\n " + _G.configGame.videoCoinReward + " \u0642\u0637\u0639\u0629 \u0646\u0642\u062F\u064A\u0629",
    label_alert_back: 'لاتفعل',
    label_alert_earn_stars: 'نعم',
    label_level_up_header: 'لقد ارتقيت إلى مستوى أعلى!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'هل ترغب في استكمال اللعب؟',
    label_pause_header: 'إيقاف مؤقت',
    label_gameover_header: 'انتهت اللعبة',
    label_gameover_score_intro: 'النقاط المُسجلة',
    label_gameover_btn_try_again: 'حاول مرة\n أخرى',
    label_gameover_no_thanks: 'لا، شكرا',
    label_home_button_play_w_friends: 'العب مع\nالأصدقاء',
    label_share_intro_1: 'هل تقدر على هزيمتي؟',
    label_share_intro_2: 'النقاط المُسجلة',
    label_win_well_done: 'أحسنت!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} يدعوك إلى حل اللغز!`,
    fb_invite_message_text: function (playerName) { return "\u0623\u062F\u0639\u0648\u0643 \u0625\u0644\u0649 \u062D\u0644 \u0647\u0630\u0647 \u0627\u0644\u0623\u062D\u062C\u064A\u0629"; },
    fb_invite_message_cta: 'العب',
};

cc._RF.pop();