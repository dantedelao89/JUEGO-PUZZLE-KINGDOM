"use strict";
cc._RF.push(module, '6a573g+HCdKnYr0iab16Em0', 'project_init_comp');
// script/system/project_init_comp.ts

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
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ProjectInitComp = /** @class */ (function (_super) {
    __extends(ProjectInitComp, _super);
    function ProjectInitComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // *** Needa put these lines in start() to make 'em execute first before all other component onLoads
    ProjectInitComp.prototype.start = function () {
        window['_G'] = _G;
    };
    // ---- Initialize logic for entire project
    ProjectInitComp.prototype.onLoad = function () {
        // remove loading bg: htmlLoadingBackground (html div tag)
        // only start after 0.5 secs and (maximum 5 secs passed /or/ avatar loaded)
        var startFunc = function () {
            var loadingBg = document.getElementById('htmlLoadingBackground');
            if (loadingBg)
                loadingBg.style.display = 'none';
            _G.analytic.logPageView();
        };
        _.waitToRun(startFunc, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 5, startFunc);
        // app event on show/hide
        cc.game.on(cc.game.EVENT_SHOW, function () { return _G.appEvents.onAppShow(); });
        cc.game.on(cc.game.EVENT_HIDE, function () { return _G.appEvents.onAppHide(); });
        // init sub modules
        for (var moduleName in _G)
            if (_G[moduleName].init)
                _G[moduleName].init();
        // add onshow & hide => pause & unpause
        _G.appEvents.addAppHideCallback(function () { return _G.gameMechanic.onPause(true); });
    };
    ProjectInitComp = __decorate([
        ccclass
    ], ProjectInitComp);
    return ProjectInitComp;
}(cc.Component));
exports.default = ProjectInitComp;

cc._RF.pop();