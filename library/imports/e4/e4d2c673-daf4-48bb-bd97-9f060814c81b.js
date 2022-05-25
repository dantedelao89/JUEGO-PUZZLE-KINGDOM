"use strict";
cc._RF.push(module, 'e4d2cZz2vRIu72XnwYIFMgb', 'th_TH');
// script/system/localization/language-files/th_TH.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'แชร์',
    common_label_reward: 'รางวัล',
    common_label_claim: 'รับ',
    common_label_button_play: 'เล่น',
    common_label_level_intro: 'เลเวล',
    label_loading_ad: 'กำลังโหลดโฆษณา. โปรดรอ',
    label_game_loading: 'กำลังโหลด',
    label_game_continue: 'ดำเนินต่อ',
    label_game_play_more_puzzle: 'ปริศนาเพิ่มเติม',
    label_gameplay_select_difficulty: 'เลือกความยาก',
    label_fx_video_error: 'วิดีโอล้มเหลว',
    label_settings_music: 'ดนตรี',
    label_settings_sound: 'เสียง',
    label_tut_step_1: "\u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E07\u0E0A\u0E34\u0E49\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E49\u0E32\n\u0E22\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    label_tut_step_2: function () { return "\u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48\u0E41\u0E25\u0E30\u0E08\u0E48\u0E32\u0E22 " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/>\n\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E49\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E2A\u0E2D\u0E07\u0E2A\u0E32\u0E21\u0E0A\u0E34\u0E49\u0E19"; },
    label_tut_step_3: "\u0E01\u0E32\u0E23\u0E08\u0E33\u0E01\u0E31\u0E14\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E33\n\u0E2B\u0E23\u0E31\u0E1A\u0E41\u0E15\u0E48\u0E25\u0E30\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32\u0E08\u0E30\u0E02\u0E36\u0E49\u0E19\u0E2D\n\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E34\u0E49\u0E19\n\n\u0E2D\u0E22\u0E48\u0E32\u0E1B\u0E25\u0E48\u0E2D\u0E22\u0E43\u0E2B\u0E49\u0E21\u0E31\u0E19\u0E2B\u0E21\u0E14!",
    label_tut_btn_continue: 'ดำเนินต่อ',
    label_alert_intro: "\u0E14\u0E39\u0E27\u0E34\u0E14\u0E35\u0E42\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\n" + _G.configGame.videoCoinReward + " \u0E40\u0E2B\u0E23\u0E35\u0E22\u0E0D",
    label_alert_back: 'ไม่',
    label_alert_earn_stars: 'ใช่',
    label_level_up_header: 'เลเวลอัพ!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'คุณต้องก\nารเริ่มเกม\nต่อหรือไม่?',
    label_pause_header: 'หยุดชั่วคราว',
    label_gameover_header: 'จบเกม',
    label_gameover_score_intro: 'คุะแนน:',
    label_gameover_btn_try_again: 'เล่นอีกครั้ง',
    label_gameover_no_thanks: 'ไม่ ขอบคุณ',
    label_home_button_play_w_friends: 'เล่นกับ\nเพื่อน',
    label_share_intro_1: 'คุณเอาชนะฉันได้ไหม?',
    label_share_intro_2: 'คุะแนน',
    label_win_well_done: 'ทำได้ดีมาก!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} ขอเชิญทุกท่านที่จะแก้ปริศนา!`,
    fb_invite_message_text: function (playerName) { return "\u0E09\u0E31\u0E19\u0E02\u0E2D\u0E40\u0E0A\u0E34\u0E0D\u0E04\u0E38\u0E13\u0E21\u0E32\u0E44\u0E02\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32\u0E19\u0E35\u0E49"; },
    fb_invite_message_cta: 'เล่น',
};

cc._RF.pop();