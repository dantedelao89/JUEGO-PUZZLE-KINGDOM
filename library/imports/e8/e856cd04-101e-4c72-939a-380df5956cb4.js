"use strict";
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