"use strict";
cc._RF.push(module, '48ca8j5+9VCx5DbqNLtBGYf', 'system_types');
// script/system/configurations/system_types.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameState = void 0;
var _G = require("../all_modules");
var _ = _G._, $ = _G.$;
// all common types used in project
var gameState;
(function (gameState) {
    gameState[gameState["category"] = 0] = "category";
    gameState[gameState["pick_mode"] = 1] = "pick_mode";
    gameState[gameState["playing"] = 2] = "playing";
    gameState[gameState["won"] = 3] = "won";
    gameState[gameState["v2"] = 4] = "v2";
})(gameState = exports.gameState || (exports.gameState = {}));

cc._RF.pop();