
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/control/control');
require('./assets/script/core-game/category_list');
require('./assets/script/core-game/game_flow');
require('./assets/script/core-game/game_mechanic');
require('./assets/script/core-game/map_visual');
require('./assets/script/core-game/settings');
require('./assets/script/core-game/tutorial');
require('./assets/script/levels/level_manager');
require('./assets/script/services/analytic');
require('./assets/script/services/audio');
require('./assets/script/services/extra-components/NestableScrollView_Inner');
require('./assets/script/services/extra-components/NestableScrollView_Outer');
require('./assets/script/services/extra-components/visible_frame_collider_comp');
require('./assets/script/services/inter_ad');
require('./assets/script/services/utils/free_button_comp');
require('./assets/script/services/utils/utils_anim_fx');
require('./assets/script/services/utils/utils_common');
require('./assets/script/services/utils/utils_coordinate');
require('./assets/script/services/utils/utils_data');
require('./assets/script/services/utils/utils_time');
require('./assets/script/services/utils/utils_ui');
require('./assets/script/services/utils_facebook');
require('./assets/script/services/video');
require('./assets/script/social/message');
require('./assets/script/social/share');
require('./assets/script/social/social');
require('./assets/script/system/all_modules');
require('./assets/script/system/app_events');
require('./assets/script/system/configurations/config_game');
require('./assets/script/system/configurations/system_types');
require('./assets/script/system/localization/language-files/ar_AR');
require('./assets/script/system/localization/language-files/de_DE');
require('./assets/script/system/localization/language-files/en_US');
require('./assets/script/system/localization/language-files/es_ES');
require('./assets/script/system/localization/language-files/fr_FR');
require('./assets/script/system/localization/language-files/id_ID');
require('./assets/script/system/localization/language-files/it_IT');
require('./assets/script/system/localization/language-files/pt_PT');
require('./assets/script/system/localization/language-files/th_TH');
require('./assets/script/system/localization/language-files/tr_TR');
require('./assets/script/system/localization/language-files/vi_VN');
require('./assets/script/system/localization/localize');
require('./assets/script/system/localization/localize_message');
require('./assets/script/system/project_init_comp');
require('./assets/script/system/resources_manager');
require('./assets/script/system/ui-fx/bind_button_handlers');
require('./assets/script/system/ui-fx/core_fx');
require('./assets/script/system/ui-fx/core_ui');
require('./assets/script/system/user');
require('./assets/script/system_data/system_data');

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