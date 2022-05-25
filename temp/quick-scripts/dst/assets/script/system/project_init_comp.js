
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/project_init_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3Byb2plY3RfaW5pdF9jb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUNwQyxJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFZCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QztJQUE2QyxtQ0FBWTtJQUF6RDs7SUE0QkEsQ0FBQztJQTNCRSxvR0FBb0c7SUFDcEcsK0JBQUssR0FBTDtRQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxnQ0FBTSxHQUFOO1FBRUcsMERBQTBEO1FBQzFELDJFQUEyRTtRQUMzRSxJQUFNLFNBQVMsR0FBRztZQUNmLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRSxJQUFJLFNBQVM7Z0JBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFBO1FBQ0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTlFLHlCQUF5QjtRQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFFL0QsbUJBQW1CO1FBQ25CLEtBQUssSUFBSSxVQUFVLElBQUksRUFBRTtZQUFFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUk7Z0JBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFFLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUEzQmlCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0E0Qm5DO0lBQUQsc0JBQUM7Q0E1QkQsQUE0QkMsQ0E1QjRDLEVBQUUsQ0FBQyxTQUFTLEdBNEJ4RDtrQkE1Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0SW5pdENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgLy8gKioqIE5lZWRhIHB1dCB0aGVzZSBsaW5lcyBpbiBzdGFydCgpIHRvIG1ha2UgJ2VtIGV4ZWN1dGUgZmlyc3QgYmVmb3JlIGFsbCBvdGhlciBjb21wb25lbnQgb25Mb2Fkc1xuICAgc3RhcnQoKSB7XG4gICAgICB3aW5kb3dbJ19HJ10gPSBfRztcbiAgIH1cblxuICAgLy8gLS0tLSBJbml0aWFsaXplIGxvZ2ljIGZvciBlbnRpcmUgcHJvamVjdFxuICAgb25Mb2FkKCkge1xuXG4gICAgICAvLyByZW1vdmUgbG9hZGluZyBiZzogaHRtbExvYWRpbmdCYWNrZ3JvdW5kIChodG1sIGRpdiB0YWcpXG4gICAgICAvLyBvbmx5IHN0YXJ0IGFmdGVyIDAuNSBzZWNzIGFuZCAobWF4aW11bSA1IHNlY3MgcGFzc2VkIC9vci8gYXZhdGFyIGxvYWRlZClcbiAgICAgIGNvbnN0IHN0YXJ0RnVuYyA9ICgpID0+IHtcbiAgICAgICAgIGNvbnN0IGxvYWRpbmdCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodG1sTG9hZGluZ0JhY2tncm91bmQnKTtcbiAgICAgICAgIGlmIChsb2FkaW5nQmcpIGxvYWRpbmdCZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgX0cuYW5hbHl0aWMubG9nUGFnZVZpZXcoKTtcbiAgICAgIH1cbiAgICAgIF8ud2FpdFRvUnVuKHN0YXJ0RnVuYywgJ2lzUmVhbEF2YXRhckxvYWRlZCcsIF9HLm1hcFZpc3VhbCwgMC4xLCA1LCBzdGFydEZ1bmMpO1xuXG4gICAgICAvLyBhcHAgZXZlbnQgb24gc2hvdy9oaWRlXG4gICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgKCkgPT4gX0cuYXBwRXZlbnRzLm9uQXBwU2hvdygpKTtcbiAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCAoKSA9PiBfRy5hcHBFdmVudHMub25BcHBIaWRlKCkpO1xuXG4gICAgICAvLyBpbml0IHN1YiBtb2R1bGVzXG4gICAgICBmb3IgKGxldCBtb2R1bGVOYW1lIGluIF9HKSBpZiAoX0dbbW9kdWxlTmFtZV0uaW5pdCkgX0dbbW9kdWxlTmFtZV0uaW5pdCgpO1xuXG4gICAgICAvLyBhZGQgb25zaG93ICYgaGlkZSA9PiBwYXVzZSAmIHVucGF1c2VcbiAgICAgIF9HLmFwcEV2ZW50cy5hZGRBcHBIaWRlQ2FsbGJhY2soKCkgPT4gX0cuZ2FtZU1lY2hhbmljLm9uUGF1c2UodHJ1ZSkpO1xuICAgfVxufVxuXG4iXX0=