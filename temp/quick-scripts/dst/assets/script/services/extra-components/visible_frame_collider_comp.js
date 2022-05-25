
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/extra-components/visible_frame_collider_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvZXh0cmEtY29tcG9uZW50cy92aXNpYmxlX2ZyYW1lX2NvbGxpZGVyX2NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVkLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNELDRDQUFZO0lBQWxFOztJQWVBLENBQUM7SUFkRSxtREFBZ0IsR0FBaEIsVUFBaUIsYUFBYSxFQUFFLFlBQVk7UUFDekMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN2QyxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUUxQixxREFBcUQ7UUFDckQscUlBQXFJO1FBQ3JJLElBQUksV0FBVyxDQUFDLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7WUFDM0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0U7SUFDSixDQUFDO0lBRUQsa0RBQWUsR0FBZixVQUFnQixhQUFhLEVBQUUsWUFBWTtRQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQWRpQix3QkFBd0I7UUFENUMsT0FBTztPQUNhLHdCQUF3QixDQWU1QztJQUFELCtCQUFDO0NBZkQsQUFlQyxDQWZxRCxFQUFFLENBQUMsU0FBUyxHQWVqRTtrQkFmb0Isd0JBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXNpYmxlRnJhbWVDb2xsaWRlckNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgb25Db2xsaXNpb25FbnRlcihvdGhlckNvbGxpZGVyLCBzZWxmQ29sbGlkZXIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnROb2RlID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgY29udGVudE5vZGUub3BhY2l0eSA9IDI1NTtcblxuICAgICAgLy8gaWYgaXMgY2F0ZWdvcnkgZnJhbWUsIGxvYWQgdGhlIGZyYW1lIGlmIG5vdCBsb2FkZWRcbiAgICAgIC8vIF8ubG9nKGBWaXNpYmxlRnJhbWVDb2xsaWRlckNvbXAgPj4gY29udGVudE5vZGUuY2F0ZWdvcnlOYW1lPSR7Y29udGVudE5vZGUuY2F0ZWdvcnlOYW1lfSwgY29udGVudE5vZGUubmFtZT0ke2NvbnRlbnROb2RlLm5hbWV9ICBgKTtcbiAgICAgIGlmIChjb250ZW50Tm9kZS5jYXRlZ29yeU5hbWUgJiYgIWNvbnRlbnROb2RlLmlzVGV4dHVyZUxvYWRlZCkge1xuICAgICAgICAgX0cucmVzb3VyY2VzLmxvYWRTaW5nbGVGcmFtZShjb250ZW50Tm9kZS5jYXRlZ29yeU5hbWUsIGNvbnRlbnROb2RlLm5hbWUpO1xuICAgICAgfVxuICAgfVxuXG4gICBvbkNvbGxpc2lvbkV4aXQob3RoZXJDb2xsaWRlciwgc2VsZkNvbGxpZGVyKSB7XG4gICAgICBvdGhlckNvbGxpZGVyLm5vZGUub3BhY2l0eSA9IDA7XG4gICB9XG59XG5cblxuIl19