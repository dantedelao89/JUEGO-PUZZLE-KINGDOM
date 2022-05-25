
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/it_IT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe7d8rtYilGzZPJ5JyltzKp', 'it_IT');
// script/system/localization/language-files/it_IT.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'CONDIVIDI',
    common_label_reward: 'RICOMPENSA',
    common_label_claim: 'RISCATTA',
    common_label_button_play: 'GIOCA',
    common_label_level_intro: 'LIVELLO',
    label_loading_ad: 'Caricamento annunci in corso. Attendi',
    label_game_loading: 'CARICANDO',
    label_game_continue: 'CONTINUA',
    label_game_play_more_puzzle: 'PIÙ PUZZLE',
    label_gameplay_select_difficulty: 'SELEZIONA DIFFICOLTÀ:',
    label_fx_video_error: 'Errore video',
    label_settings_music: 'MUSICA',
    label_settings_sound: 'SUONI',
    label_tut_step_1: "Clicca su due pezzi per muoverli\ne posizionali correttamente",
    label_tut_step_2: function () { return "Clicca qui e paga " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> \nper risolvere alcuni pezzi"; },
    label_tut_step_3: "Il tempo limite di\nogni puzzle dipender\u00E0\ndal numero di pezzi.\n\nNon farlo finire!",
    label_tut_btn_continue: 'CONTINUA',
    label_alert_intro: "GUARDA IL VIDEO PER\nGUADAGNARE " + _G.configGame.videoCoinReward + " MONETE",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'SÌ',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VUOI RIPRENDERE\nIL GIOCO?',
    label_pause_header: 'PAUSA',
    label_gameover_header: 'FINE DEL GIOCO',
    label_gameover_score_intro: 'PUNTEGGIO:',
    label_gameover_btn_try_again: 'PROVA DI NUOVO',
    label_gameover_no_thanks: 'NO, GRAZIE',
    label_home_button_play_w_friends: 'GIOCA CON\nGLI AMICI',
    label_share_intro_1: 'Riesci a battermi?',
    label_share_intro_2: 'PUNTEGGIO:',
    label_win_well_done: 'Molto bene!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Vi invita a risolvere il puzzle!`,
    fb_invite_message_text: function (playerName) { return "Ti invito a risolvere questo Puzzle"; },
    fb_invite_message_cta: 'GIOCA',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9pdF9JVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFdBQVc7SUFDL0IsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsU0FBUztJQUVuQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7SUFFekQsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixtQkFBbUIsRUFBRSxVQUFVO0lBQy9CLDJCQUEyQixFQUFFLFlBQVk7SUFDekMsZ0NBQWdDLEVBQUUsdUJBQXVCO0lBRXpELG9CQUFvQixFQUFFLGNBQWM7SUFFcEMsb0JBQW9CLEVBQUUsUUFBUTtJQUM5QixvQkFBb0IsRUFBRSxPQUFPO0lBRTdCLGdCQUFnQixFQUFFLCtEQUErRDtJQUNqRixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsdUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw4RUFBeUUsRUFBekgsQ0FBeUg7SUFDakosZ0JBQWdCLEVBQUUsMkZBQXNGO0lBQ3hHLHNCQUFzQixFQUFFLFVBQVU7SUFFbEMsaUJBQWlCLEVBQUUscUNBQW1DLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxZQUFTO0lBQzVGLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsc0JBQXNCLEVBQUUsSUFBSTtJQUU1QixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSw0QkFBNEI7SUFDL0Msa0JBQWtCLEVBQUUsT0FBTztJQUUzQixxQkFBcUIsRUFBRSxnQkFBZ0I7SUFDdkMsMEJBQTBCLEVBQUUsWUFBWTtJQUN4Qyw0QkFBNEIsRUFBRSxnQkFBZ0I7SUFDOUMsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxzQkFBc0I7SUFFeEQsbUJBQW1CLEVBQUUsb0JBQW9CO0lBQ3pDLG1CQUFtQixFQUFFLFlBQVk7SUFFakMsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDBGQUEwRjtJQUMxRixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHFDQUFxQyxFQUFyQyxDQUFxQztJQUMzRSxxQkFBcUIsRUFBRSxPQUFPO0NBRWhDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ0NPTkRJVklESScsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnUklDT01QRU5TQScsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdSSVNDQVRUQScsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdHSU9DQScsXG4gICBjb21tb25fbGFiZWxfbGV2ZWxfaW50cm86ICdMSVZFTExPJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0NhcmljYW1lbnRvIGFubnVuY2kgaW4gY29yc28uIEF0dGVuZGknLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdDQVJJQ0FORE8nLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0NPTlRJTlVBJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ1BJw5kgUFVaWkxFJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnU0VMRVpJT05BIERJRkZJQ09MVMOAOicsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAnRXJyb3JlIHZpZGVvJyxcblxuICAgbGFiZWxfc2V0dGluZ3NfbXVzaWM6ICdNVVNJQ0EnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTVU9OSScsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGBDbGljY2Egc3UgZHVlIHBlenppIHBlciBtdW92ZXJsaVxcbmUgcG9zaXppb25hbGkgY29ycmV0dGFtZW50ZWAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQ2xpY2NhIHF1aSBlIHBhZ2EgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gXFxucGVyIHJpc29sdmVyZSBhbGN1bmkgcGV6emlgLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgSWwgdGVtcG8gbGltaXRlIGRpXFxub2duaSBwdXp6bGUgZGlwZW5kZXLDoFxcbmRhbCBudW1lcm8gZGkgcGV6emkuXFxuXFxuTm9uIGZhcmxvIGZpbmlyZSFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVBJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGBHVUFSREEgSUwgVklERU8gUEVSXFxuR1VBREFHTkFSRSAke19HLmNvbmZpZ0dhbWUudmlkZW9Db2luUmV3YXJkfSBNT05FVEVgLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ05PTicsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnU8OMJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTEVWRUwgVVAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnVlVPSSBSSVBSRU5ERVJFXFxuSUwgR0lPQ08/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ1BBVVNBJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAnRklORSBERUwgR0lPQ08nLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdQVU5URUdHSU86JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdQUk9WQSBESSBOVU9WTycsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdOTywgR1JBWklFJyxcblxuICAgbGFiZWxfaG9tZV9idXR0b25fcGxheV93X2ZyaWVuZHM6ICdHSU9DQSBDT05cXG5HTEkgQU1JQ0knLFxuXG4gICBsYWJlbF9zaGFyZV9pbnRyb18xOiAnUmllc2NpIGEgYmF0dGVybWk/JyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICdQVU5URUdHSU86JyxcblxuICAgbGFiZWxfd2luX3dlbGxfZG9uZTogJ01vbHRvIGJlbmUhJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gVmkgaW52aXRhIGEgcmlzb2x2ZXJlIGlsIHB1enpsZSFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgVGkgaW52aXRvIGEgcmlzb2x2ZXJlIHF1ZXN0byBQdXp6bGVgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfY3RhOiAnR0lPQ0EnLFxuXG59XG5cblxuIl19