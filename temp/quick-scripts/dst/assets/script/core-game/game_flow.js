
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/game_flow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2dhbWVfZmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDcEMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRVAsUUFBQSxRQUFRLEdBQUc7SUFFckIsSUFBSTtRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQUMsSUFBSTtZQUMxQixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDbkQsc0NBQXNDO1lBQ3RDLElBQUksU0FBUyxFQUFFO2dCQUNOLElBQUEsS0FBNEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBL0MsWUFBWSxRQUFBLEVBQUUsU0FBUyxRQUF3QixDQUFDO2dCQUN2RCxDQUFDLENBQUMsR0FBRyxDQUFDLHNEQUFvRCxZQUFZLHNCQUFpQixTQUFTLE1BQUcsQ0FBQyxDQUFDO2dCQUNyRyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7Z0JBQzFGLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RDtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUdILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuZXhwb3J0IGNvbnN0IGdhbWVGbG93ID0ge1xuXG4gICBpbml0KCkge1xuICAgICAgX0cudXNlci5hZGRJbml0Q2FsbGJhY2soKGRhdGEpID0+IHtcbiAgICAgICAgIGNvbnN0IHB1enpsZV9pZCA9IF9HLnVzZXIuZW50cnlQb2ludERhdGEucHV6emxlX2lkO1xuICAgICAgICAgLy8gY29uc3QgcHV6emxlX2lkID0gJ05BVFVSRV9mcmFtZTAxJztcbiAgICAgICAgIGlmIChwdXp6bGVfaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IFtjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZV0gPSBwdXp6bGVfaWQuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIF8ubG9nKGAgZ2FtZUZsb3cgPj4gaW5pdCA+PiBwdXp6bGVfaWQgPj4gY2F0ZWdvcnlOYW1lID0gJHtjYXRlZ29yeU5hbWV9IC8vIGZyYW1lTmFtZT0ke2ZyYW1lTmFtZX0gYCk7XG4gICAgICAgICAgICBfRy5nYW1lTWVjaGFuaWMucHJldmlld0dhbWUoY2F0ZWdvcnlOYW1lLCBmcmFtZU5hbWUsIDEsIDEsIHRydWUpOyAvLyByZW5kZXIgc3BlY2lhbCBwdXp6bGVcbiAgICAgICAgICAgIF9HLnJlc291cmNlcy5sb2FkU2luZ2xlRnJhbWUoY2F0ZWdvcnlOYW1lLCBmcmFtZU5hbWUpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9LFxuXG5cbn0iXX0=