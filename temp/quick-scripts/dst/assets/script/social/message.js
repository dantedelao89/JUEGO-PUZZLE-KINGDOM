
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/message.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e856c0EEB5McpOaOA31lWy0', 'message');
// script/social/message.ts

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../system/all_modules");
var _ = _G._;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.onLoad = function () {
    };
    Message.prototype.initBase64Picture = function (targetNode) {
        return __awaiter(this, void 0, void 0, function () {
            var cameraNode, cameraComp, texture, gl, width, height, _canvas, ctx, data, rowBytes, row, srow, data2, imageData, dataURL;
            return __generator(this, function (_a) {
                if (!targetNode.activeInHierarchy)
                    targetNode.active = true;
                cameraNode = new cc.Node();
                targetNode.addChild(cameraNode);
                cameraComp = cameraNode.addComponent(cc.Camera);
                texture = new cc.RenderTexture();
                gl = cc.game._renderContext;
                texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
                cameraComp.targetTexture = texture;
                // cameraComp.zoomRatio = 3.2; // ratio for message of size: 640 x 420;
                cameraComp.zoomRatio = 1.3;
                cameraComp.backgroundColor = cc.Color.WHITE;
                cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
                width = texture.width;
                height = texture.height;
                _canvas = document.createElement('canvas');
                _canvas.width = width;
                _canvas.height = height;
                ctx = _canvas.getContext('2d');
                cameraComp.render(targetNode);
                data = texture.readPixels();
                rowBytes = width * 4;
                for (row = 0; row < height; row++) {
                    srow = height - 1 - row;
                    data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                    imageData = new ImageData(data2, width, 1);
                    ctx.putImageData(imageData, 0, row);
                }
                dataURL = _canvas.toDataURL("image/jpeg");
                setTimeout(function () {
                    targetNode.active = false;
                    cameraNode.removeFromParent();
                }, 2000);
                return [2 /*return*/, dataURL];
            });
        });
    };
    Message.prototype.initPayload = function (target, content, ctaText, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var dataObj, base64Image, payload, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataObj = __assign({ version: 'v2', isFromNewsFeed: 1, puzzle_id: (extraData === null || extraData === void 0 ? void 0 : extraData.isNoPuzzleId) ? null : _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName }, (extraData || {}));
                        return [4 /*yield*/, this.initBase64Picture(target)];
                    case 1:
                        base64Image = _a.sent();
                        payload = {
                            action: 'CUSTOM',
                            text: _G.localize.getMultilangugaeFBMessageObj(content),
                            // text: content,
                            cta: _G.localize.getMultilangugaeFBMessageObj(ctaText),
                            // cta: ctaText,
                            image: base64Image,
                            template: 'play_turn',
                            strategy: 'IMMEDIATE',
                            data: dataObj,
                            notification: 'PUSH',
                        };
                        _.log("--------payload = ", payload);
                        return [2 /*return*/, payload];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Message.prototype.sendMessageScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var picNode, content, ctaText, payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window['FBInstant'])
                            return [2 /*return*/];
                        picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture', this.node));
                        cc.find('capture_hard_mask', picNode).active = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
                        ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;
                        return [4 /*yield*/, this.initPayload(this.node, content, ctaText)];
                    case 2:
                        payload = _a.sent();
                        return [4 /*yield*/, FBInstant.updateAsync(payload)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        _.log('sendMessageScore', error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Message.prototype.sendMessageStillImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, ctaText, payload, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window['FBInstant'])
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
                        ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;
                        return [4 /*yield*/, this.initPayload(this.node, content, ctaText, { isNoPuzzleId: true })];
                    case 2:
                        payload = _a.sent();
                        return [4 /*yield*/, FBInstant.updateAsync(payload)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        _.log('sendMessageScore', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Message = __decorate([
        ccclass
    ], Message);
    return Message;
}(cc.Component));
exports.default = Message;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDNUMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVULElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEOztJQW9IQSxDQUFDO0lBbEhFLHdCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUssbUNBQWlCLEdBQXZCLFVBQXdCLFVBQW1COzs7O2dCQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtvQkFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdEQsVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFakMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdFLFVBQVUsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2dCQUNuQyx1RUFBdUU7Z0JBQ3ZFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUUzQixVQUFVLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM1QyxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO2dCQUczRyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDdEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBRXBCLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUc1QixRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDekIsS0FBUyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ2hDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDeEIsS0FBSyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDdkUsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQy9DLEdBQUcsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDdEM7Z0JBRUssT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRWhELFVBQVUsQ0FBQztvQkFDUixVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ2pDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFVCxzQkFBTyxPQUFPLEVBQUM7OztLQUNqQjtJQUVLLDZCQUFXLEdBQWpCLFVBQWtCLE1BQWUsRUFBRSxPQUFlLEVBQUUsT0FBZSxFQUFFLFNBQWU7Ozs7Ozs7d0JBRXhFLE9BQU8sY0FDVixPQUFPLEVBQUUsSUFBSSxFQUNiLGNBQWMsRUFBRSxDQUFDLEVBQ2pCLFNBQVMsRUFBRSxDQUFBLFNBQVMsYUFBVCxTQUFTLHVCQUFULFNBQVMsQ0FBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsSUFDckgsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLENBQ3RCLENBQUE7d0JBQ21CLHFCQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQWxELFdBQVcsR0FBRyxTQUFvQzt3QkFDbEQsT0FBTyxHQUFHOzRCQUNiLE1BQU0sRUFBRSxRQUFROzRCQUNoQixJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxPQUFPLENBQUM7NEJBQ3ZELGlCQUFpQjs0QkFDakIsR0FBRyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDOzRCQUN0RCxnQkFBZ0I7NEJBQ2hCLEtBQUssRUFBRSxXQUFXOzRCQUNsQixRQUFRLEVBQUUsV0FBVzs0QkFDckIsUUFBUSxFQUFFLFdBQVc7NEJBQ3JCLElBQUksRUFBRSxPQUFPOzRCQUNiLFlBQVksRUFBRSxNQUFNO3lCQUN0QixDQUFDO3dCQUNGLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3JDLHNCQUFPLE9BQU8sRUFBQzs7O3dCQUVmLE1BQU0sT0FBSyxDQUFDOzs7OztLQUVqQjtJQUdLLGtDQUFnQixHQUF0Qjs7Ozs7O3dCQUNHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzRCQUFFLHNCQUFPO3dCQUczQixPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDcEYsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOzs7O3dCQUszQyxPQUFPLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7d0JBQy9GLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLHFCQUFxQixDQUFDO3dCQUV4RCxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFBOzt3QkFBN0QsT0FBTyxHQUFHLFNBQW1EO3dCQUNuRSxxQkFBTSxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFBOzt3QkFBcEMsU0FBb0MsQ0FBQzs7Ozt3QkFFckMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxPQUFLLENBQUMsQ0FBQzs7Ozs7O0tBRXRDO0lBRUssdUNBQXFCLEdBQTNCOzs7Ozs7d0JBQ0csSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7NEJBQUUsc0JBQU87Ozs7d0JBSXhCLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDL0YsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUM7d0JBRXhELHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O3dCQUFyRixPQUFPLEdBQUcsU0FBMkU7d0JBQzNGLHFCQUFNLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7O3dCQUVyQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQUssQ0FBQyxDQUFDOzs7Ozs7S0FFdEM7SUFsSGlCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FvSDNCO0lBQUQsY0FBQztDQXBIRCxBQW9IQyxDQXBIb0MsRUFBRSxDQUFDLFNBQVMsR0FvSGhEO2tCQXBIb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICBvbkxvYWQoKSB7XG4gICB9XG5cbiAgIGFzeW5jIGluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGlmICghdGFyZ2V0Tm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgdGFyZ2V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgIHRhcmdldE5vZGUuYWRkQ2hpbGQoY2FtZXJhTm9kZSk7XG4gICAgICBsZXQgY2FtZXJhQ29tcCA9IGNhbWVyYU5vZGUuYWRkQ29tcG9uZW50KGNjLkNhbWVyYSk7XG4gICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG5cbiAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZSh0YXJnZXROb2RlLndpZHRoLCB0YXJnZXROb2RlLmhlaWdodCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xuICAgICAgY2FtZXJhQ29tcC50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgIC8vIGNhbWVyYUNvbXAuem9vbVJhdGlvID0gMy4yOyAvLyByYXRpbyBmb3IgbWVzc2FnZSBvZiBzaXplOiA2NDAgeCA0MjA7XG4gICAgICBjYW1lcmFDb21wLnpvb21SYXRpbyA9IDEuMztcblxuICAgICAgY2FtZXJhQ29tcC5iYWNrZ3JvdW5kQ29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgIGNhbWVyYUNvbXAuY2xlYXJGbGFncyA9IGNjLkNhbWVyYS5DbGVhckZsYWdzLkRFUFRIIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuU1RFTkNJTCB8IGNjLkNhbWVyYS5DbGVhckZsYWdzLkNPTE9SO1xuICAgICAgLy8gY2FtZXJhQ29tcC5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG5cbiAgICAgIGxldCB3aWR0aCA9IHRleHR1cmUud2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHQ7XG4gICAgICBsZXQgX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGxldCBjdHggPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjYW1lcmFDb21wLnJlbmRlcih0YXJnZXROb2RlKTtcbiAgICAgIGxldCBkYXRhID0gdGV4dHVyZS5yZWFkUGl4ZWxzKCk7XG4gICAgICAvLyB3cml0ZSB0aGUgcmVuZGVyIGRhdGFcblxuICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgaGVpZ2h0OyByb3crKykge1xuICAgICAgICAgbGV0IHNyb3cgPSBoZWlnaHQgLSAxIC0gcm93O1xuICAgICAgICAgbGV0IGRhdGEyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEuYnVmZmVyLCBzcm93ICogd2lkdGggKiA0LCByb3dCeXRlcyk7XG4gICAgICAgICBsZXQgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhMiwgd2lkdGgsIDEpO1xuICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIHJvdyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFVUkwgPSBfY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGFyZ2V0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGNhbWVyYU5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgfSwgMjAwMCk7XG5cbiAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgfVxuXG4gICBhc3luYyBpbml0UGF5bG9hZCh0YXJnZXQ6IGNjLk5vZGUsIGNvbnRlbnQ6IHN0cmluZywgY3RhVGV4dDogc3RyaW5nLCBleHRyYURhdGE/OiBhbnkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCBkYXRhT2JqID0ge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIGlzRnJvbU5ld3NGZWVkOiAxLFxuICAgICAgICAgICAgcHV6emxlX2lkOiBleHRyYURhdGE/LmlzTm9QdXp6bGVJZCA/IG51bGwgOiBfRy5nYW1lTWVjaGFuaWMuY3VycmVudENhdGVnb3J5TmFtZSArICdfJyArIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50RnJhbWVOYW1lLFxuICAgICAgICAgICAgLi4uKGV4dHJhRGF0YSB8fCB7fSksXG4gICAgICAgICB9XG4gICAgICAgICBjb25zdCBiYXNlNjRJbWFnZSA9IGF3YWl0IHRoaXMuaW5pdEJhc2U2NFBpY3R1cmUodGFyZ2V0KTtcbiAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBhY3Rpb246ICdDVVNUT00nLFxuICAgICAgICAgICAgdGV4dDogX0cubG9jYWxpemUuZ2V0TXVsdGlsYW5ndWdhZUZCTWVzc2FnZU9iaihjb250ZW50KSxcbiAgICAgICAgICAgIC8vIHRleHQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBjdGE6IF9HLmxvY2FsaXplLmdldE11bHRpbGFuZ3VnYWVGQk1lc3NhZ2VPYmooY3RhVGV4dCksXG4gICAgICAgICAgICAvLyBjdGE6IGN0YVRleHQsXG4gICAgICAgICAgICBpbWFnZTogYmFzZTY0SW1hZ2UsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3BsYXlfdHVybicsXG4gICAgICAgICAgICBzdHJhdGVneTogJ0lNTUVESUFURScsXG4gICAgICAgICAgICBkYXRhOiBkYXRhT2JqLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uOiAnUFVTSCcsXG4gICAgICAgICB9O1xuICAgICAgICAgXy5sb2coYC0tLS0tLS0tcGF5bG9hZCA9IGAsIHBheWxvYWQpO1xuICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICB9XG5cblxuICAgYXN5bmMgc2VuZE1lc3NhZ2VTY29yZSgpIHtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuO1xuXG4gICAgICAvLyBmaWxsIHNhaHJlIG5vZGUgd2l0aCBjdXJyZW50IGZyYW1lcyBcbiAgICAgIGNvbnN0IHBpY05vZGUgPSBfLmNvcHlOb2RlKF9HLm1hcFZpc3VhbC5mdWxsUGljTm9kZSwgY2MuZmluZCgncGljdHVyZScsIHRoaXMubm9kZSkpO1xuICAgICAgY2MuZmluZCgnY2FwdHVyZV9oYXJkX21hc2snLCBwaWNOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICB0cnkge1xuICAgICAgICAgLy8gY29uc3QgY29udGVudCA9IGAke3dpbmRvd1snRkJJbnN0YW50J10/LnBsYXllci5nZXROYW1lKCl9IGludml0ZXMgeW91IHRvIHNvbHZlIGEgcHV6emxlIWA7XG4gICAgICAgICAvLyBjb25zdCBjdGFUZXh0ID0gJ1BMQVkgTk9XJztcbiAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VPYmplY3QuZmJfaW52aXRlX21lc3NhZ2VfdGV4dChGQkluc3RhbnQucGxheWVyLmdldE5hbWUoKSk7XG4gICAgICAgICBjb25zdCBjdGFUZXh0ID0gX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlT2JqZWN0LmZiX2ludml0ZV9tZXNzYWdlX2N0YTtcblxuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuaW5pdFBheWxvYWQodGhpcy5ub2RlLCBjb250ZW50LCBjdGFUZXh0KTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC51cGRhdGVBc3luYyhwYXlsb2FkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICBfLmxvZygnc2VuZE1lc3NhZ2VTY29yZScsIGVycm9yKTtcbiAgICAgIH1cbiAgIH1cblxuICAgYXN5bmMgc2VuZE1lc3NhZ2VTdGlsbEltYWdlKCkge1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSByZXR1cm47XG4gICAgICB0cnkge1xuICAgICAgICAgLy8gY29uc3QgY29udGVudCA9IGAke3dpbmRvd1snRkJJbnN0YW50J10/LnBsYXllci5nZXROYW1lKCl9IGludml0ZXMgeW91IHRvIHNvbHZlIGEgcHV6emxlIWA7XG4gICAgICAgICAvLyBjb25zdCBjdGFUZXh0ID0gJ1BMQVkgTk9XJztcbiAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VPYmplY3QuZmJfaW52aXRlX21lc3NhZ2VfdGV4dChGQkluc3RhbnQucGxheWVyLmdldE5hbWUoKSk7XG4gICAgICAgICBjb25zdCBjdGFUZXh0ID0gX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlT2JqZWN0LmZiX2ludml0ZV9tZXNzYWdlX2N0YTtcblxuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuaW5pdFBheWxvYWQodGhpcy5ub2RlLCBjb250ZW50LCBjdGFUZXh0LCB7IGlzTm9QdXp6bGVJZDogdHJ1ZSB9KTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC51cGRhdGVBc3luYyhwYXlsb2FkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICBfLmxvZygnc2VuZE1lc3NhZ2VTY29yZScsIGVycm9yKTtcbiAgICAgIH1cbiAgIH1cblxufVxuIl19