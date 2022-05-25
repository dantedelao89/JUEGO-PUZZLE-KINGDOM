"use strict";
cc._RF.push(module, '43213CWfmlGOLqN3VgtW2bk', 'vi_VN');
// script/system/localization/language-files/vi_VN.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'CHIA SẺ',
    common_label_reward: 'PHẦN THƯỞNG',
    common_label_claim: 'NHẬN',
    common_label_button_play: 'CHƠI',
    common_label_level_intro: 'CẤP',
    label_loading_ad: 'Đang tải quảng cáo. Vui lòng chờ',
    label_game_loading: 'ĐANG TẢI',
    label_game_continue: 'TIẾP TỤC',
    label_game_play_more_puzzle: 'HÌNH KHÁC',
    label_gameplay_select_difficulty: 'CHỌN ĐỘ KHÓ:',
    label_fx_video_error: 'Lỗi video',
    label_settings_music: 'NHẠC NỀN',
    label_settings_sound: 'ÂM HIỆU ỨNG',
    label_tut_step_1: "B\u1EA5m v\u00E0o c\u00E1c m\u1EA3nh nh\u1ECF \u0111\u1EC3\n\u0111\u1ED5i ch\u1ED7 v\u00E0o \u0111\u00FAng v\u1ECB tr\u00ED",
    label_tut_step_2: function () { return "B\u1EA5m v\u00E0o \u0111\u00E2y v\u00E0 d\u00F9ng " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/>\n\u0111\u1EC3 gi\u1EA3i 2 mi\u1EBFng gh\u00E9p."; },
    label_tut_step_3: "Th\u1EDDi gian cho m\u1ED7i b\u00E0i\nt\u00F9y thu\u1ED9c v\u00E0o s\u1ED1 mi\u1EBFng gh\u00E9p\n\n\u0110\u1EEBng \u0111\u1EC3 b\u1ECB h\u1EBFt gi\u1EDD!",
    label_tut_btn_continue: 'TIẾP TỤC',
    label_alert_intro: "XEM 1 VIDEO \u0110\u1EC2\nNH\u1EACN " + _G.configGame.videoCoinReward + " XU",
    label_alert_back: 'KHÔNG',
    label_alert_earn_stars: 'CÓ',
    label_level_up_header: 'LÊN CẤP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'BẠN CÓ MUỐN\nTIẾP TỤC CHƠI?',
    label_pause_header: 'TẠM DỪNG',
    label_gameover_header: 'THUA RỒI',
    label_gameover_score_intro: 'ĐIỂM:',
    label_gameover_btn_try_again: 'CHƠI LẠI',
    label_gameover_no_thanks: 'KHÔNG, CẢM ƠN',
    label_home_button_play_w_friends: 'CHƠI VỚI\nBẠN BÈ',
    label_share_intro_1: 'Bạn có thể thắng tôi?',
    label_share_intro_2: 'ĐIỂM : ',
    label_win_well_done: 'Tuyệt vời!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} mời bạn giải một bài xếp hình!`,
    fb_invite_message_text: function (playerName) { return "T\u00F4i m\u1EDDi b\u1EA1n gi\u1EA3i m\u1ED9t b\u00E0i x\u1EBFp h\u00ECnh!"; },
    fb_invite_message_cta: 'CHƠI',
};

cc._RF.pop();