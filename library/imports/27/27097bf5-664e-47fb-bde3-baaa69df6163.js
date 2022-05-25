"use strict";
cc._RF.push(module, '27097v1Zk5H+73juqpp32Fj', 'visible_frame_collider_comp');
// script/services/extra-components/visible_frame_collider_comp.ts

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
var VisibleFrameColliderComp = /** @class */ (function (_super) {
    __extends(VisibleFrameColliderComp, _super);
    function VisibleFrameColliderComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisibleFrameColliderComp.prototype.onCollisionEnter = function (otherCollider, selfCollider) {
        var contentNode = otherCollider.node;
        contentNode.opacity = 255;
        // if is category frame, load the frame if not loaded
        // _.log(`VisibleFrameColliderComp >> contentNode.categoryName=${contentNode.categoryName}, contentNode.name=${contentNode.name}  `);
        if (contentNode.categoryName && !contentNode.isTextureLoaded) {
            _G.resources.loadSingleFrame(contentNode.categoryName, contentNode.name);
        }
    };
    VisibleFrameColliderComp.prototype.onCollisionExit = function (otherCollider, selfCollider) {
        otherCollider.node.opacity = 0;
    };
    VisibleFrameColliderComp = __decorate([
        ccclass
    ], VisibleFrameColliderComp);
    return VisibleFrameColliderComp;
}(cc.Component));
exports.default = VisibleFrameColliderComp;

cc._RF.pop();