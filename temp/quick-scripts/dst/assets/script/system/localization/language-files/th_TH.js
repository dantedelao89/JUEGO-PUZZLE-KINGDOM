
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/th_TH.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy90aF9USC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsbUJBQW1CLEVBQUUsUUFBUTtJQUM3QixrQkFBa0IsRUFBRSxLQUFLO0lBQ3pCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSx3QkFBd0I7SUFFMUMsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLGlCQUFpQjtJQUM5QyxnQ0FBZ0MsRUFBRSxjQUFjO0lBRWhELG9CQUFvQixFQUFFLGVBQWU7SUFFckMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxPQUFPO0lBRTdCLGdCQUFnQixFQUFFLDBQQUE2QztJQUMvRCxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsNEdBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw2TEFBcUUsRUFBckgsQ0FBcUg7SUFDN0ksZ0JBQWdCLEVBQUUseWFBQWdGO0lBQ2xHLHNCQUFzQixFQUFFLFdBQVc7SUFFbkMsaUJBQWlCLEVBQUUsdUdBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSwwQ0FBUztJQUM5RSxnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLHNCQUFzQixFQUFFLEtBQUs7SUFFN0IscUJBQXFCLEVBQUUsV0FBVztJQUNsQyx5QkFBeUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUcsQ0FBRyxFQUFOLENBQU07SUFFeEMsaUJBQWlCLEVBQUUsbUNBQW1DO0lBQ3RELGtCQUFrQixFQUFFLGNBQWM7SUFFbEMscUJBQXFCLEVBQUUsT0FBTztJQUM5QiwwQkFBMEIsRUFBRSxTQUFTO0lBQ3JDLDRCQUE0QixFQUFFLGNBQWM7SUFDNUMsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxpQkFBaUI7SUFFbkQsbUJBQW1CLEVBQUUscUJBQXFCO0lBQzFDLG1CQUFtQixFQUFFLFFBQVE7SUFFN0IsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLHNGQUFzRjtJQUN0RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHdKQUEyQixFQUEzQixDQUEyQjtJQUNqRSxxQkFBcUIsRUFBRSxNQUFNO0NBRS9CLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ+C5geC4iuC4o+C5jCcsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAn4Lij4Liy4LiH4Lin4Lix4LilJyxcbiAgIGNvbW1vbl9sYWJlbF9jbGFpbTogJ+C4o+C4seC4micsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICfguYDguKXguYjguJknLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAn4LmA4Lil4LmA4Lin4LilJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ+C4geC4s+C4peC4seC4h+C5guC4q+C4peC4lOC5guC4huC4qeC4k+C4si4g4LmC4Lib4Lij4LiU4Lij4LitJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAn4LiB4Liz4Lil4Lix4LiH4LmC4Lir4Lil4LiUJyxcbiAgIGxhYmVsX2dhbWVfY29udGludWU6ICfguJTguLPguYDguJnguLTguJnguJXguYjguK0nLFxuICAgbGFiZWxfZ2FtZV9wbGF5X21vcmVfcHV6emxlOiAn4Lib4Lij4Li04Lio4LiZ4Liy4LmA4Lie4Li04LmI4Lih4LmA4LiV4Li04LihJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAn4LmA4Lil4Li34Lit4LiB4LiE4Lin4Liy4Lih4Lii4Liy4LiBJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICfguKfguLTguJTguLXguYLguK3guKXguYnguKHguYDguKvguKXguKcnLFxuXG4gICBsYWJlbF9zZXR0aW5nc19tdXNpYzogJ+C4lOC4meC4leC4o+C4tScsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ+C5gOC4quC4teC4ouC4hycsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGDguITguKXguLTguIHguJfguLXguYjguKrguK3guIfguIrguLTguYnguJnguYDguJ7guLfguYjguK3guKLguYnguLJcXG7guKLguYHguKXguLDguKfguLLguIfguK3guKLguYjguLLguIfguJbguLnguIHguJXguYnguK3guIdgLFxuICAgbGFiZWxfdHV0X3N0ZXBfMjogKCkgPT4gYOC4hOC4peC4tOC4geC4l+C4teC5iOC4meC4teC5iOC5geC4peC4sOC4iOC5iOC4suC4oiAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX0gPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPlxcbuC5gOC4nuC4t+C5iOC4reC5geC4geC5ieC4m+C4seC4jeC4q+C4suC4quC4reC4h+C4quC4suC4oeC4iuC4tOC5ieC4mWAsICAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBg4LiB4Liy4Lij4LiI4Liz4LiB4Lix4LiU4LmA4Lin4Lil4Liy4Liq4LizXFxu4Lir4Lij4Lix4Lia4LmB4LiV4LmI4Lil4Liw4Lib4Lij4Li04Lio4LiZ4Liy4LiI4Liw4LiC4Li24LmJ4LiZ4LitXFxu4Lii4Li54LmI4LiB4Lix4Lia4LiI4Liz4LiZ4Lin4LiZ4LiK4Li04LmJ4LiZXFxuXFxu4Lit4Lii4LmI4Liy4Lib4Lil4LmI4Lit4Lii4LmD4Lir4LmJ4Lih4Lix4LiZ4Lir4Lih4LiUIWAsXG4gICBsYWJlbF90dXRfYnRuX2NvbnRpbnVlOiAn4LiU4Liz4LmA4LiZ4Li04LiZ4LiV4LmI4LitJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGDguJTguLnguKfguLTguJTguLXguYLguK3guYDguJ7guLfguYjguK3guKPguLHguJpcXG4ke19HLmNvbmZpZ0dhbWUudmlkZW9Db2luUmV3YXJkfSDguYDguKvguKPguLXguKLguI1gLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ+C5hOC4oeC5iCcsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAn4LmD4LiK4LmIJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAn4LmA4Lil4LmA4Lin4Lil4Lit4Lix4LieIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ+C4hOC4uOC4k+C4leC5ieC4reC4h+C4gVxcbuC4suC4o+C5gOC4o+C4tOC5iOC4oeC5gOC4geC4oVxcbuC4leC5iOC4reC4q+C4o+C4t+C4reC5hOC4oeC5iD8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAn4Lir4Lii4Li44LiU4LiK4Lix4LmI4Lin4LiE4Lij4Liy4LinJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAn4LiI4Lia4LmA4LiB4LihJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAn4LiE4Li44Liw4LmB4LiZ4LiZOicsXG4gICBsYWJlbF9nYW1lb3Zlcl9idG5fdHJ5X2FnYWluOiAn4LmA4Lil4LmI4LiZ4Lit4Li14LiB4LiE4Lij4Lix4LmJ4LiHJyxcbiAgIGxhYmVsX2dhbWVvdmVyX25vX3RoYW5rczogJ+C5hOC4oeC5iCDguILguK3guJrguITguLjguJMnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ+C5gOC4peC5iOC4meC4geC4seC4mlxcbuC5gOC4nuC4t+C5iOC4reC4mScsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICfguITguLjguJPguYDguK3guLLguIrguJnguLDguInguLHguJnguYTguJTguYnguYTguKvguKE/JyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICfguITguLjguLDguYHguJnguJknLFxuXG4gICBsYWJlbF93aW5fd2VsbF9kb25lOiAn4LiX4Liz4LmE4LiU4LmJ4LiU4Li14Lih4Liy4LiBIScsXG5cbiAgIGxhYmVsX2NhdGVnb3J5X2xpc3RfaGVhZGVyX25hbWU6IHggPT4ge1xuICAgICAgcmV0dXJuIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSB4KT8ubGFuZ3VhZ2VzW19HLmxvY2FsaXplLmN1cnJlbnRMYW5ndWFnZUNvZGVdPy50b1VwcGVyQ2FzZSgpO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IOC4guC4reC5gOC4iuC4tOC4jeC4l+C4uOC4geC4l+C5iOC4suC4meC4l+C4teC5iOC4iOC4sOC5geC4geC5ieC4m+C4o+C4tOC4qOC4meC4siFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBg4LiJ4Lix4LiZ4LiC4Lit4LmA4LiK4Li04LiN4LiE4Li44LiT4Lih4Liy4LmE4LiC4Lib4Lij4Li04Lio4LiZ4Liy4LiZ4Li14LmJYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX2N0YTogJ+C5gOC4peC5iOC4mScsXG5cbn1cblxuXG4iXX0=