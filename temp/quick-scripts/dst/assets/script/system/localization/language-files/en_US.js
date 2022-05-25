
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/en_US.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0dc5MvQdREN7dWh2ZAwfX1', 'en_US');
// script/system/localization/language-files/en_US.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'SHARE',
    common_label_reward: 'REWARD',
    common_label_claim: 'CLAIM',
    common_label_button_play: 'PLAY',
    common_label_level_intro: 'LEVEL',
    label_loading_ad: 'Loading ads. Please wait',
    label_game_loading: 'LOADING',
    label_game_continue: 'CONTINUE',
    label_game_play_more_puzzle: 'MORE PUZZLES',
    label_gameplay_select_difficulty: 'SELECT DIFFICULTY',
    label_fx_video_error: 'Video error',
    label_settings_music: 'MUSIC',
    label_settings_sound: 'SOUNDS',
    label_tut_step_1: "Click on two pieces to move\nthem and place them correctly",
    label_tut_step_2: function () { return "Click here and pay " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> to\nsolve a couple of pieces."; },
    label_tut_step_3: "The time limit for each\npuzzle will depend on the\nnumber of pieces.\n\nDon't let it run out!",
    label_tut_btn_continue: 'CONTINUE',
    label_alert_intro: "WATCH A VIDEO TO\nEARN " + _G.configGame.videoCoinReward + " COINS",
    label_alert_back: 'NO',
    label_alert_earn_stars: 'YES',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'DO YOU WANT\nTO RESUME\nTHE GAME?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'GAME OVER',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'TRY AGAIN',
    label_gameover_no_thanks: 'NO, THANKS',
    label_home_button_play_w_friends: 'PLAY WITH\nFRIENDS',
    label_share_intro_1: 'Can you beat me?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Well done!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} invites you to solve a puzzle!`,
    fb_invite_message_text: function (playerName) { return "I invite you to solve this Puzzle"; },
    fb_invite_message_cta: 'PLAY NOW',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9lbl9VUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsbUJBQW1CLEVBQUUsUUFBUTtJQUM3QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSwwQkFBMEI7SUFFNUMsa0JBQWtCLEVBQUUsU0FBUztJQUM3QixtQkFBbUIsRUFBRSxVQUFVO0lBQy9CLDJCQUEyQixFQUFFLGNBQWM7SUFDM0MsZ0NBQWdDLEVBQUUsbUJBQW1CO0lBRXJELG9CQUFvQixFQUFFLGFBQWE7SUFFbkMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxRQUFRO0lBRTlCLGdCQUFnQixFQUFFLDREQUE0RDtJQUM5RSxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsd0JBQXNCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSwrRUFBMEUsRUFBM0gsQ0FBMkg7SUFDbkosZ0JBQWdCLEVBQUUsZ0dBQWdHO0lBQ2xILHNCQUFzQixFQUFFLFVBQVU7SUFHbEMsaUJBQWlCLEVBQUUsNEJBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxXQUFRO0lBQ2xGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsc0JBQXNCLEVBQUUsS0FBSztJQUU3QixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSxtQ0FBbUM7SUFDdEQsa0JBQWtCLEVBQUUsT0FBTztJQUUzQixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLDBCQUEwQixFQUFFLFFBQVE7SUFDcEMsNEJBQTRCLEVBQUUsV0FBVztJQUN6Qyx3QkFBd0IsRUFBRSxZQUFZO0lBRXRDLGdDQUFnQyxFQUFFLG9CQUFvQjtJQUV0RCxtQkFBbUIsRUFBRSxrQkFBa0I7SUFDdkMsbUJBQW1CLEVBQUUsUUFBUTtJQUU3QixtQkFBbUIsRUFBRSxZQUFZO0lBRWpDLCtCQUErQixFQUFFLFVBQUEsQ0FBQzs7UUFDL0IsbUJBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQiwyQ0FBRyxXQUFXLEdBQUc7SUFDbEksQ0FBQztJQUdELHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsd0ZBQXdGO0lBQ3hGLHNCQUFzQixFQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsbUNBQW1DLEVBQW5DLENBQW1DO0lBQ3pFLHFCQUFxQixFQUFFLFVBQVU7Q0FFbkMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0ID0ge1xuICAgY29tbW9uX2xhYmVsX3NoYXJlOiAnU0hBUkUnLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ1JFV0FSRCcsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdDTEFJTScsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdQTEFZJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ0xFVkVMJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0xvYWRpbmcgYWRzLiBQbGVhc2Ugd2FpdCcsXG5cbiAgIGxhYmVsX2dhbWVfbG9hZGluZzogJ0xPQURJTkcnLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0NPTlRJTlVFJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ01PUkUgUFVaWkxFUycsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1NFTEVDVCBESUZGSUNVTFRZJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICdWaWRlbyBlcnJvcicsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUMnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTT1VORFMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgQ2xpY2sgb24gdHdvIHBpZWNlcyB0byBtb3ZlXFxudGhlbSBhbmQgcGxhY2UgdGhlbSBjb3JyZWN0bHlgLFxuICAgbGFiZWxfdHV0X3N0ZXBfMjogKCkgPT4gYENsaWNrIGhlcmUgYW5kIHBheSAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX0gPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPiB0b1xcbnNvbHZlIGEgY291cGxlIG9mIHBpZWNlcy5gLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgVGhlIHRpbWUgbGltaXQgZm9yIGVhY2hcXG5wdXp6bGUgd2lsbCBkZXBlbmQgb24gdGhlXFxubnVtYmVyIG9mIHBpZWNlcy5cXG5cXG5Eb24ndCBsZXQgaXQgcnVuIG91dCFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVFJyxcblxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYFdBVENIIEEgVklERU8gVE9cXG5FQVJOICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IENPSU5TYCxcbiAgIGxhYmVsX2FsZXJ0X2JhY2s6ICdOTycsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnWUVTJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTEVWRUwgVVAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnRE8gWU9VIFdBTlRcXG5UTyBSRVNVTUVcXG5USEUgR0FNRT8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAnUEFVU0UnLFxuXG4gICBsYWJlbF9nYW1lb3Zlcl9oZWFkZXI6ICdHQU1FIE9WRVInLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdTQ09SRTonLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ1RSWSBBR0FJTicsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdOTywgVEhBTktTJyxcblxuICAgbGFiZWxfaG9tZV9idXR0b25fcGxheV93X2ZyaWVuZHM6ICdQTEFZIFdJVEhcXG5GUklFTkRTJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ0NhbiB5b3UgYmVhdCBtZT8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1NDT1JFOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdXZWxsIGRvbmUhJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gaW52aXRlcyB5b3UgdG8gc29sdmUgYSBwdXp6bGUhYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYEkgaW52aXRlIHlvdSB0byBzb2x2ZSB0aGlzIFB1enpsZWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdQTEFZIE5PVycsXG5cbn1cblxuXG4iXX0=