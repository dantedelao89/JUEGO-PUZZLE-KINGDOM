
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/de_DE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9kZV9ERS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFFBQVE7SUFDNUIsbUJBQW1CLEVBQUUsV0FBVztJQUNoQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7SUFFekQsa0JBQWtCLEVBQUUsT0FBTztJQUMzQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLDJCQUEyQixFQUFFLGFBQWE7SUFDMUMsZ0NBQWdDLEVBQUUsdUJBQXVCO0lBRXpELG9CQUFvQixFQUFFLGNBQWM7SUFFcEMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxRQUFRO0lBRTlCLGdCQUFnQixFQUFFLHdFQUF3RTtJQUMxRixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsMkJBQXlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxxRkFBMkUsRUFBL0gsQ0FBK0g7SUFDdkosZ0JBQWdCLEVBQUUsZ0hBQWlHO0lBQ25ILHNCQUFzQixFQUFFLFFBQVE7SUFFaEMsaUJBQWlCLEVBQUUsc0NBQW9DLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSwrQkFBdUI7SUFDM0csZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixzQkFBc0IsRUFBRSxJQUFJO0lBRTVCLHFCQUFxQixFQUFFLGNBQWM7SUFDckMseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLG1DQUFtQztJQUN0RCxrQkFBa0IsRUFBRSxPQUFPO0lBRTNCLHFCQUFxQixFQUFFLGNBQWM7SUFDckMsMEJBQTBCLEVBQUUsY0FBYztJQUMxQyw0QkFBNEIsRUFBRSxrQkFBa0I7SUFDaEQsd0JBQXdCLEVBQUUsYUFBYTtJQUV2QyxnQ0FBZ0MsRUFBRSx1QkFBdUI7SUFFekQsbUJBQW1CLEVBQUUsMkJBQTJCO0lBQ2hELG1CQUFtQixFQUFFLGNBQWM7SUFFbkMsbUJBQW1CLEVBQUUsY0FBYztJQUVuQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFJRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDRGQUE0RjtJQUM1RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHFEQUEyQyxFQUEzQyxDQUEyQztJQUNqRixxQkFBcUIsRUFBRSxPQUFPO0NBRWhDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ1RFSUxFTicsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnQkVMT0hOVU5HJyxcbiAgIGNvbW1vbl9sYWJlbF9jbGFpbTogJ0JFSEFVUFRFJyxcbiAgIGNvbW1vbl9sYWJlbF9idXR0b25fcGxheTogJ1NQSUVMJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ0xFVkVMJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0FuemVpZ2VuIHdlcmRlbiBnZWxhZGVuLiBCaXR0ZSB3YXJ0ZW4nLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdMQURFTicsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAnV0VJVEVSJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ01FSFIgUsOEVFNFTCcsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1NDSFdJRVJJR0tFSVQgV8OESExFTjonLFxuXG4gICBsYWJlbF9meF92aWRlb19lcnJvcjogJ1ZpZGVvLUZlaGxlcicsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUsnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTT1VORFMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgS2xpY2tlIGF1ZiB6d2VpIEZpZ3VyZW4sXFxudW0gc2llIHp1IGJld2VnZW4gdW5kXFxucmljaHRpZyB6dSBwbGF0emllcmVuYCxcbiAgIGxhYmVsX3R1dF9zdGVwXzI6ICgpID0+IGBLbGlja2UgaGllciB1bmQgemFobGUgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9ICA8aW1nIHNyYz1cImljb25fY29pblwiIHdpZHRoPTQwIGhlaWdodD00MC8+LFxcbnVtIGVpbiBwYWFyIFRlaWxlIHp1IGzDtnNlbi5gLCAgLy8gdGhpcyBsYWJlbCBpcyBSaWNoVGV4dC4gXCJpY29uX2NvaW5cIiBpcyBzcHJpdGUgbmFtZSBpbiB0aGUgbGlua2VkIGF0bGFzLlxuICAgbGFiZWxfdHV0X3N0ZXBfMzogYERhcyBaZWl0bGltaXQgZsO8clxcbmplZGVzIFLDpHRzZWwgaMOkbmd0IHZvbiBkZXJcXG5BbnphaGwgZGVyIFRlaWxlIGFiLlxcblxcbkxhc3Mgc2llIG5pY2h0IGFibGF1ZmVuIWAsXG4gICBsYWJlbF90dXRfYnRuX2NvbnRpbnVlOiAnV0VJVEVSJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGBTRUhFTiBTSUUgU0lDSCBEQVNcXG5WSURFTyBBTiwgVU0gJHtfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZH0gTcOcTlpFTlxcblpVIFZFUkRJRU5FTmAsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAnTklDSFQnLFxuICAgbGFiZWxfYWxlcnRfZWFybl9zdGFyczogJ0pBJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTkVVRVMgTEVWRUwhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnV0lMTFNUIERVXFxuREFTIFNQSUVMXFxuRk9SVFNFVFpFTj8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAnUEFVU0UnLFxuXG4gICBsYWJlbF9nYW1lb3Zlcl9oZWFkZXI6ICdTUElFTCBWT1JCRUknLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdQVU5LVEVTVEFORDonLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ0VSTkVVVCBWRVJTVUNIRU4nLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTkVJTiwgREFOS0UnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ01JVCBGUkVVTkRFTlxcblNQSUVMRU4nLFxuXG4gICBsYWJlbF9zaGFyZV9pbnRyb18xOiAnS8O2bm5lbiBTaWUgbWljaCBzY2hsYWdlbj8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1BVTktURVNUQU5EOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdHdXQgZ2VtYWNodCEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IEzDpGR0IFNpZSBlaW4sIGRhcyBSw6R0c2VsIHp1IGzDtnNlbiFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgSWNoIGxhZGUgZGljaCBlaW4sIGRpZXNlcyBSw6R0c2VsIHp1IGzDtnNlbmAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdTUElFTCcsXG5cbn1cblxuXG4iXX0=