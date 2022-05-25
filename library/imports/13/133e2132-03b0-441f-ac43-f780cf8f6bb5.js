"use strict";
cc._RF.push(module, '133e2EyA7BEH6xD94DPj2u1', 'game_flow');
// script/core-game/game_flow.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameFlow = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.gameFlow = {
    init: function () {
        _G.user.addInitCallback(function (data) {
            var puzzle_id = _G.user.entryPointData.puzzle_id;
            // const puzzle_id = 'NATURE_frame01';
            if (puzzle_id) {
                var _a = puzzle_id.split('_'), categoryName = _a[0], frameName = _a[1];
                _.log(" gameFlow >> init >> puzzle_id >> categoryName = " + categoryName + " // frameName=" + frameName + " ");
                _G.gameMechanic.previewGame(categoryName, frameName, 1, 1, true); // render special puzzle
                _G.resources.loadSingleFrame(categoryName, frameName);
            }
        });
    },
};

cc._RF.pop();