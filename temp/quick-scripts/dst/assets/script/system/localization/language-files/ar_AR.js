
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/ar_AR.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9hcl9BUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixrQkFBa0IsRUFBRSw0QkFBNEI7SUFDaEQsd0JBQXdCLEVBQUUsTUFBTTtJQUNoQyx3QkFBd0IsRUFBRSxTQUFTO0lBRW5DLGdCQUFnQixFQUFFLGlDQUFpQztJQUVuRCxrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsMkJBQTJCLEVBQUUsb0JBQW9CO0lBQ2pELGdDQUFnQyxFQUFFLG9CQUFvQjtJQUV0RCxvQkFBb0IsRUFBRSxvQkFBb0I7SUFFMUMsb0JBQW9CLEVBQUUsVUFBVTtJQUNoQyxvQkFBb0IsRUFBRSxTQUFTO0lBRS9CLGdCQUFnQixFQUFFLHNRQUFvRDtJQUN0RSxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsNkhBQTZELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw0R0FBeUIsRUFBakgsQ0FBaUg7SUFDekksZ0JBQWdCLEVBQUUsK1pBQTBGO0lBQzVHLHNCQUFzQixFQUFFLE9BQU87SUFFL0IsaUJBQWlCLEVBQUUsd0ZBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSw2REFBYTtJQUNsRixnQkFBZ0IsRUFBRSxRQUFRO0lBQzFCLHNCQUFzQixFQUFFLEtBQUs7SUFFN0IscUJBQXFCLEVBQUUsNEJBQTRCO0lBQ25ELHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSwyQkFBMkI7SUFDOUMsa0JBQWtCLEVBQUUsWUFBWTtJQUVoQyxxQkFBcUIsRUFBRSxjQUFjO0lBQ3JDLDBCQUEwQixFQUFFLGlCQUFpQjtJQUM3Qyw0QkFBNEIsRUFBRSxpQkFBaUI7SUFDL0Msd0JBQXdCLEVBQUUsVUFBVTtJQUVwQyxnQ0FBZ0MsRUFBRSxtQkFBbUI7SUFFckQsbUJBQW1CLEVBQUUscUJBQXFCO0lBQzFDLG1CQUFtQixFQUFFLGlCQUFpQjtJQUV0QyxtQkFBbUIsRUFBRSxRQUFRO0lBRTdCLCtCQUErQixFQUFFLFVBQUEsQ0FBQzs7UUFDL0IsbUJBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQiwyQ0FBRyxXQUFXLEdBQUc7SUFDbEksQ0FBQztJQUlELHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsNkVBQTZFO0lBQzdFLHNCQUFzQixFQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsOEhBQTBCLEVBQTFCLENBQTBCO0lBQ2hFLHFCQUFxQixFQUFFLE1BQU07Q0FFL0IsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0ID0ge1xuICAgY29tbW9uX2xhYmVsX3NoYXJlOiAn2LTYp9ix2YMnLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ9is2KfYptiy2KknLFxuICAgY29tbW9uX2xhYmVsX2NsYWltOiAn2KfYrNmF2Lkg2KfZhNi52YXZhNin2KpcXG4g2KfZhNiq2Yog2LHYqNit2KrZh9inJyxcbiAgIGNvbW1vbl9sYWJlbF9idXR0b25fcGxheTogJ9in2YTYudioJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ9in2YTZhdiz2KrZiNmJJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ9iq2K3ZhdmK2YQg2KfZhNil2LnZhNin2YbYp9iqINin2YTYsdis2KfYoSDYp9mE2KfZhtiq2LjYp9ixJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAn2KrYrdmF2YrZhCcsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAn2KfYs9iq2YXYsScsXG4gICBsYWJlbF9nYW1lX3BsYXlfbW9yZV9wdXp6bGU6ICfYp9mE2YXYstmK2K8g2YXZhiDYp9mE2KPYrdis2YrYp9iqJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAn2KfYrtiq2LEg2YXYs9iq2YjZiSDYp9mE2LXYudmI2KjYqScsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAn2K7Yt9ijINmB2Yog2LnYsdi2INin2YTZgdmK2K/ZitmIJyxcblxuICAgbGFiZWxfc2V0dGluZ3NfbXVzaWM6ICfYp9mE2YXZiNiz2YrZgtmJJyxcbiAgIGxhYmVsX3NldHRpbmdzX3NvdW5kOiAn2KfZhNij2LXZiNin2KonLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBg2KfZhtmC2LEg2LnZhNmJINmC2LfYudiq2YrZhiDZhNiq2K3YsdmD2YfZhdinXFxu2YjYqti22LnZh9mF2Kcg2YHZiiDYp9mE2YXZg9in2YYg2KfZhNi12K3ZititYCxcbiAgIGxhYmVsX3R1dF9zdGVwXzI6ICgpID0+IGDYp9mG2YLYsSDZh9mG2Kcg2YjYp9iv2YHYuSAgPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPiAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX1cXG4g2YTZhdi52LHZgdipINmF2YPYp9mGINio2LbYuSDZgti32LkuYCwgIC8vIHRoaXMgbGFiZWwgaXMgUmljaFRleHQuIFwiaWNvbl9jb2luXCIgaXMgc3ByaXRlIG5hbWUgaW4gdGhlIGxpbmtlZCBhdGxhcy5cbiAgIGxhYmVsX3R1dF9zdGVwXzM6IGDYp9mE2YjZgtiqINin2YTZhdiq2KfYrSDZhNit2YQg2YPZhCDYo9it2KzZitipIFxcbtiz2YrZj9it2K/YryDYqNmG2KfYodmLINi52YTZiSDYudiv2K8g2YLYt9i5INin2YTYo9it2KzZitipLiBcXG5cXG7ZhNinINiq2K/YuSDYp9mE2YjZgtiqINmK2YbZgdiwINmF2YbZgyFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ9in2LPYqtmF2LEnLFxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYNi02KfZh9ivINmB2YrYr9mK2Ygg2YTYqtix2KhcXG4gJHtfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZH0g2YLYt9i52Kkg2YbZgtiv2YrYqWAsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAn2YTYp9iq2YHYudmEJyxcbiAgIGxhYmVsX2FsZXJ0X2Vhcm5fc3RhcnM6ICfZhti52YUnLFxuXG4gICBsYWJlbF9sZXZlbF91cF9oZWFkZXI6ICfZhNmC2K8g2KfYsdiq2YLZitiqINil2YTZiSDZhdiz2KrZiNmJINij2LnZhNmJIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ9mH2YQg2KrYsdi62Kgg2YHZiiDYp9iz2KrZg9mF2KfZhCDYp9mE2YTYudio2J8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAn2KXZitmC2KfZgSDZhdik2YLYqicsXG5cbiAgIGxhYmVsX2dhbWVvdmVyX2hlYWRlcjogJ9in2YbYqtmH2Kog2KfZhNmE2LnYqNipJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAn2KfZhNmG2YLYp9i3INin2YTZhdmP2LPYrNmE2KknLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ9it2KfZiNmEINmF2LHYqVxcbiDYo9iu2LHZiScsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICfZhNin2Iwg2LTZg9ix2KcnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ9in2YTYudioINmF2LlcXG7Yp9mE2KPYtdiv2YLYp9ihJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ9mH2YQg2KrZgtiv2LEg2LnZhNmJINmH2LLZitmF2KrZitifJyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICfYp9mE2YbZgtin2Lcg2KfZhNmF2Y/Ys9is2YTYqScsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICfYo9it2LPZhtiqIScsXG5cbiAgIGxhYmVsX2NhdGVnb3J5X2xpc3RfaGVhZGVyX25hbWU6IHggPT4ge1xuICAgICAgcmV0dXJuIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSB4KT8ubGFuZ3VhZ2VzW19HLmxvY2FsaXplLmN1cnJlbnRMYW5ndWFnZUNvZGVdPy50b1VwcGVyQ2FzZSgpO1xuICAgfSxcblxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0g2YrYr9i52YjZgyDYpdmE2Ykg2K3ZhCDYp9mE2YTYutiyIWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGDYo9iv2LnZiNmDINil2YTZiSDYrdmEINmH2LDZhyDYp9mE2KPYrdis2YrYqWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICfYp9mE2LnYqCcsXG5cbn1cblxuXG4iXX0=