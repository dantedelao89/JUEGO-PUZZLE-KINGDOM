
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/fr_FR.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ecab3cCIppDSpZiK4lgRa5D', 'fr_FR');
// script/system/localization/language-files/fr_FR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'PARTAGER',
    common_label_reward: 'RÉCOMPENSE',
    common_label_claim: 'RÉCLAMER',
    common_label_button_play: 'JOUER À',
    common_label_level_intro: 'NIVEAU',
    label_loading_ad: 'Chargement des annonces. Veuillez patienter',
    label_game_loading: 'CHARGEMENT DE',
    label_game_continue: 'CONTINUER',
    label_game_play_more_puzzle: 'PLUS DE PUZZLES',
    label_gameplay_select_difficulty: 'SÉLECTIONNEZ LA DIFFICULTÉ',
    label_fx_video_error: 'Erreur vidéo',
    label_settings_music: 'MUSIQUE',
    label_settings_sound: 'SONS',
    label_tut_step_1: "Cliquez sur deux pi\u00E8ces pour les\nd\u00E9placer et les placer correctement.",
    label_tut_step_2: function () { return "Cliquez ici et payez " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> pour\nr\u00E9soudre un couple de pi\u00E8ces."; },
    label_tut_step_3: "\"Le temps limite pour\nchaque puzzle d\u00E9pendra\ndu nombre de pi\u00E8ces.\n\nNe le laissez pas s'\u00E9puiser !\"",
    label_tut_btn_continue: 'CONTINUER',
    label_alert_intro: "REGARDEZ UNE VID\u00C9O\nPOUR GAGNER " + _G.configGame.videoCoinReward + " PI\u00C8CES",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'OUI',
    label_level_up_header: 'MONTEZ DE NIVEAU !',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VOULEZ-VOUS\nREPRENDRE LE\nJEU ?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'TERMINÉ',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'ESSAYER À NOUVEAU',
    label_gameover_no_thanks: 'NON, MERCI',
    label_home_button_play_w_friends: 'JOUER AVEC\nDES AMIS',
    label_share_intro_1: 'Pouvez-vous me battre?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Bien joué !',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} vous invite à résoudre un puzzle!`,
    fb_invite_message_text: function (playerName) { return "Je vous invite \u00E0 r\u00E9soudre cette \u00E9nigme"; },
    fb_invite_message_cta: 'JOUER À',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9mcl9GUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFVBQVU7SUFDOUIsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLFNBQVM7SUFDbkMsd0JBQXdCLEVBQUUsUUFBUTtJQUVsQyxnQkFBZ0IsRUFBRSw2Q0FBNkM7SUFFL0Qsa0JBQWtCLEVBQUUsZUFBZTtJQUNuQyxtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLGlCQUFpQjtJQUM5QyxnQ0FBZ0MsRUFBRSw0QkFBNEI7SUFFOUQsb0JBQW9CLEVBQUUsY0FBYztJQUVwQyxvQkFBb0IsRUFBRSxTQUFTO0lBQy9CLG9CQUFvQixFQUFFLE1BQU07SUFFNUIsZ0JBQWdCLEVBQUUsa0ZBQXdFO0lBQzFGLGdCQUFnQixFQUFFLGNBQU0sT0FBQSwwQkFBd0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLCtGQUFnRixFQUFuSSxDQUFtSTtJQUMzSixnQkFBZ0IsRUFBRSx3SEFBdUc7SUFDekgsc0JBQXNCLEVBQUUsV0FBVztJQUVuQyxpQkFBaUIsRUFBRSwwQ0FBbUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLGlCQUFTO0lBQzVGLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsc0JBQXNCLEVBQUUsS0FBSztJQUU3QixxQkFBcUIsRUFBRSxvQkFBb0I7SUFDM0MseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLGtDQUFrQztJQUNyRCxrQkFBa0IsRUFBRSxPQUFPO0lBRTNCLHFCQUFxQixFQUFFLFNBQVM7SUFDaEMsMEJBQTBCLEVBQUUsUUFBUTtJQUNwQyw0QkFBNEIsRUFBRSxtQkFBbUI7SUFDakQsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxzQkFBc0I7SUFFeEQsbUJBQW1CLEVBQUUsd0JBQXdCO0lBQzdDLG1CQUFtQixFQUFFLFFBQVE7SUFFN0IsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFJRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDJGQUEyRjtJQUMzRixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHVEQUF3QyxFQUF4QyxDQUF3QztJQUM5RSxxQkFBcUIsRUFBRSxTQUFTO0NBRWxDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ1BBUlRBR0VSJyxcbiAgIGNvbW1vbl9sYWJlbF9yZXdhcmQ6ICdSw4lDT01QRU5TRScsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdSw4lDTEFNRVInLFxuICAgY29tbW9uX2xhYmVsX2J1dHRvbl9wbGF5OiAnSk9VRVIgw4AnLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAnTklWRUFVJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0NoYXJnZW1lbnQgZGVzIGFubm9uY2VzLiBWZXVpbGxleiBwYXRpZW50ZXInLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdDSEFSR0VNRU5UIERFJyxcbiAgIGxhYmVsX2dhbWVfY29udGludWU6ICdDT05USU5VRVInLFxuICAgbGFiZWxfZ2FtZV9wbGF5X21vcmVfcHV6emxlOiAnUExVUyBERSBQVVpaTEVTJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnU8OJTEVDVElPTk5FWiBMQSBESUZGSUNVTFTDiScsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAnRXJyZXVyIHZpZMOpbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSVFVRScsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ1NPTlMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgQ2xpcXVleiBzdXIgZGV1eCBwacOoY2VzIHBvdXIgbGVzXFxuZMOpcGxhY2VyIGV0IGxlcyBwbGFjZXIgY29ycmVjdGVtZW50LmAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQ2xpcXVleiBpY2kgZXQgcGF5ZXogJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gcG91clxcbnLDqXNvdWRyZSB1biBjb3VwbGUgZGUgcGnDqGNlcy5gLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgXCJMZSB0ZW1wcyBsaW1pdGUgcG91clxcbmNoYXF1ZSBwdXp6bGUgZMOpcGVuZHJhXFxuZHUgbm9tYnJlIGRlIHBpw6hjZXMuXFxuXFxuTmUgbGUgbGFpc3NleiBwYXMgcyfDqXB1aXNlciAhXCJgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVFUicsXG5cbiAgIGxhYmVsX2FsZXJ0X2ludHJvOiBgUkVHQVJERVogVU5FIFZJRMOJT1xcblBPVVIgR0FHTkVSICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IFBJw4hDRVNgLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ05PTicsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnT1VJJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTU9OVEVaIERFIE5JVkVBVSAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnVk9VTEVaLVZPVVNcXG5SRVBSRU5EUkUgTEVcXG5KRVUgPycsXG4gICBsYWJlbF9wYXVzZV9oZWFkZXI6ICdQQVVTRScsXG5cbiAgIGxhYmVsX2dhbWVvdmVyX2hlYWRlcjogJ1RFUk1JTsOJJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAnU0NPUkU6JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdFU1NBWUVSIMOAIE5PVVZFQVUnLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTk9OLCBNRVJDSScsXG5cbiAgIGxhYmVsX2hvbWVfYnV0dG9uX3BsYXlfd19mcmllbmRzOiAnSk9VRVIgQVZFQ1xcbkRFUyBBTUlTJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ1BvdXZlei12b3VzIG1lIGJhdHRyZT8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1NDT1JFOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdCaWVuIGpvdcOpICEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IHZvdXMgaW52aXRlIMOgIHLDqXNvdWRyZSB1biBwdXp6bGUhYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYEplIHZvdXMgaW52aXRlIMOgIHLDqXNvdWRyZSBjZXR0ZSDDqW5pZ21lYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX2N0YTogJ0pPVUVSIMOAJyxcblxufVxuXG5cbiJdfQ==