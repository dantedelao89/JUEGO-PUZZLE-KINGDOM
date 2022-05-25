// ######## script for services
// (must be included first of all for later modules to use basic functions)

// ######## system constant declarations
export * as types from './configurations/system_types';
export * from '../services/utils/utils_common';
export * from './configurations/config_game';

// ---- level
export * from '../levels/level_manager';



// ######## configurations


// ######## primary utilities
export * from '../services/utils/utils_data';
export * from '../services/utils/utils_ui';
export * from '../services/utils/utils_anim_fx';
export * from '../services/audio';
export * from '../services/analytic';


// ######## system UI, logic, events
export * from '../system/app_events';
export * from '../system/ui-fx/core_fx';
export * from '../system/resources_manager';
export * from '../system/user';
export * from '../system/ui-fx/core_ui';
export * from '../system/localization/localize';


// ######## core game logic

export * from '../core-game/settings';


// ---- game logic & flow
export * from '../core-game/game_mechanic';
export * from '../core-game/map_visual';
export * from '../core-game/category_list';
export * from '../core-game/tutorial';
export * from '../core-game/game_flow';

export * from '../services/utils_facebook';
export * from '../services/video';
export * from '../services/inter_ad';

// social
export * from '../social/social';

// ---- control
export * from '../control/control';



