
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/free_button_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee307OeX0lMvqRwlJoeXArM', 'free_button_comp');
// script/services/utils/free_button_comp.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var freeButtonComp = /** @class */ (function (_super) {
    __extends(freeButtonComp, _super);
    function freeButtonComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    freeButtonComp.prototype.freeHandler = function (e) {
        if (e.target.freeButtonHandlerFunc)
            e.target.freeButtonHandlerFunc(e.target);
    };
    freeButtonComp = __decorate([
        ccclass
    ], freeButtonComp);
    return freeButtonComp;
}(cc.Component));
exports.default = freeButtonComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvZnJlZV9idXR0b25fY29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0M7QUFDdkMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRWQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBNEMsa0NBQVk7SUFBeEQ7O0lBSUEsQ0FBQztJQUhHLG9DQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ1QsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQjtZQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFIZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQUlsQztJQUFELHFCQUFDO0NBSkQsQUFJQyxDQUoyQyxFQUFFLENBQUMsU0FBUyxHQUl2RDtrQkFKb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7IF8sICQgfSA9IF9HO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZyZWVCdXR0b25Db21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBmcmVlSGFuZGxlcihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5mcmVlQnV0dG9uSGFuZGxlckZ1bmMpIGUudGFyZ2V0LmZyZWVCdXR0b25IYW5kbGVyRnVuYyhlLnRhcmdldCk7XG4gICAgfVxufVxuIl19