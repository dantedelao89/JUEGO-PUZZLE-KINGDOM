"use strict";
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