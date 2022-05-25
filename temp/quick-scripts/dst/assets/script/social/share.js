
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/share.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '180e8XwoltFA42+3dd/LwZl', 'share');
// script/social/share.ts

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
var ORG_FRAME_SIZE = 800;
var Share = /** @class */ (function (_super) {
    __extends(Share, _super);
    function Share() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Share.prototype.initBase64Picture = function (targetNode) {
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
                cameraComp.zoomRatio = (_.isANDROID || _.isIOS) ? 1.7 : 1.5;
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
    Share.prototype.initPayload = function (targetNode, content, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var base64Image, payload, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.initBase64Picture(targetNode)];
                    case 1:
                        base64Image = _a.sent();
                        payload = {
                            intent: 'SHARE',
                            image: base64Image,
                            text: content,
                            data: extraData,
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
    Share.prototype.sharePostNormal = function (isFromV2Screen, shareCode) {
        return __awaiter(this, void 0, void 0, function () {
            var picNode, payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.find('Canvas/shares/picture/overlay').active = !isFromV2Screen;
                        _G.utilsUI.fillLabel(cc.find('Canvas/shares/picture/overlay/score_base/label_score'), '+' + _G.user.exp);
                        picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture/full_frame', this.node));
                        // picNode.scale = ORG_FRAME_SIZE / picNode.width;
                        cc.find('capture_hard_mask', picNode).active = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.initPayload(this.node, '', {
                                version: 'v2',
                                isFromNewsFeed: 1,
                                puzzle_id: _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName
                            })];
                    case 2:
                        payload = _a.sent();
                        // _.log(payload);
                        return [4 /*yield*/, FBInstant.shareAsync(payload)];
                    case 3:
                        // _.log(payload);
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        _.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Share = __decorate([
        ccclass
    ], Share);
    return Share;
}(cc.Component));
exports.default = Share;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL3NoYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUM1QyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRVQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBRzNCO0lBQW1DLHlCQUFZO0lBQS9DOztJQXlGQSxDQUFDO0lBeEZRLGlDQUFpQixHQUF2QixVQUF3QixVQUFtQjs7OztnQkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7b0JBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRXRELFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRWpDLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RSxVQUFVLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztnQkFDbkMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMs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LFdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMvRixrREFBa0Q7d0JBQ2xELEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7Ozt3QkFJakMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FDbkMsSUFBSSxDQUFDLElBQUksRUFDVCxFQUFFLEVBQ0Y7Z0NBQ0csT0FBTyxFQUFFLElBQUk7Z0NBQ2IsY0FBYyxFQUFFLENBQUM7Z0NBQ2pCLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQjs2QkFDekYsQ0FDSCxFQUFBOzt3QkFSSyxPQUFPLEdBQUcsU0FRZjt3QkFFRCxrQkFBa0I7d0JBQ2xCLHFCQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQURuQyxrQkFBa0I7d0JBQ2xCLFNBQW1DLENBQUM7Ozs7d0JBQ3JCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUE7Ozs7OztLQUNoQztJQXRGaUIsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXlGekI7SUFBRCxZQUFDO0NBekZELEFBeUZDLENBekZrQyxFQUFFLENBQUMsU0FBUyxHQXlGOUM7a0JBekZvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5jb25zdCBPUkdfRlJBTUVfU0laRSA9IDgwMDtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgIGFzeW5jIGluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGlmICghdGFyZ2V0Tm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgdGFyZ2V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgIHRhcmdldE5vZGUuYWRkQ2hpbGQoY2FtZXJhTm9kZSk7XG4gICAgICBsZXQgY2FtZXJhQ29tcCA9IGNhbWVyYU5vZGUuYWRkQ29tcG9uZW50KGNjLkNhbWVyYSk7XG4gICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG5cbiAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZSh0YXJnZXROb2RlLndpZHRoLCB0YXJnZXROb2RlLmhlaWdodCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xuICAgICAgY2FtZXJhQ29tcC50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgIGNhbWVyYUNvbXAuem9vbVJhdGlvID0gKF8uaXNBTkRST0lEIHx8IF8uaXNJT1MpID8gMS43IDogMS41O1xuXG4gICAgICBjYW1lcmFDb21wLmJhY2tncm91bmRDb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgY2FtZXJhQ29tcC5jbGVhckZsYWdzID0gY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuREVQVEggfCBjYy5DYW1lcmEuQ2xlYXJGbGFncy5TVEVOQ0lMIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuQ09MT1I7XG4gICAgICAvLyBjYW1lcmFDb21wLmN1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcblxuICAgICAgbGV0IHdpZHRoID0gdGV4dHVyZS53aWR0aDtcbiAgICAgIGxldCBoZWlnaHQgPSB0ZXh0dXJlLmhlaWdodDtcbiAgICAgIGxldCBfY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBfY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICBfY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgbGV0IGN0eCA9IF9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNhbWVyYUNvbXAucmVuZGVyKHRhcmdldE5vZGUpO1xuICAgICAgbGV0IGRhdGEgPSB0ZXh0dXJlLnJlYWRQaXhlbHMoKTtcbiAgICAgIC8vIHdyaXRlIHRoZSByZW5kZXIgZGF0YVxuXG4gICAgICBsZXQgcm93Qnl0ZXMgPSB3aWR0aCAqIDQ7XG4gICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBoZWlnaHQ7IHJvdysrKSB7XG4gICAgICAgICBsZXQgc3JvdyA9IGhlaWdodCAtIDEgLSByb3c7XG4gICAgICAgICBsZXQgZGF0YTIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZGF0YS5idWZmZXIsIHNyb3cgKiB3aWR0aCAqIDQsIHJvd0J5dGVzKTtcbiAgICAgICAgIGxldCBpbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGRhdGEyLCB3aWR0aCwgMSk7XG4gICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgcm93KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YVVSTCA9IF9jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0YXJnZXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgY2FtZXJhTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICB9LCAyMDAwKTtcblxuICAgICAgcmV0dXJuIGRhdGFVUkw7XG4gICB9XG5cbiAgIGFzeW5jIGluaXRQYXlsb2FkKHRhcmdldE5vZGU6IGNjLk5vZGUsIGNvbnRlbnQ6IHN0cmluZywgZXh0cmFEYXRhPzogYW55KSB7XG4gICAgICB0cnkge1xuICAgICAgICAgY29uc3QgYmFzZTY0SW1hZ2UgPSBhd2FpdCB0aGlzLmluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGUpO1xuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGludGVudDogJ1NIQVJFJyxcbiAgICAgICAgICAgIGltYWdlOiBiYXNlNjRJbWFnZSxcbiAgICAgICAgICAgIHRleHQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBkYXRhOiBleHRyYURhdGEsXG4gICAgICAgICB9O1xuICAgICAgICAgXy5sb2coYC0tLS0tLS0tcGF5bG9hZCA9IGAsIHBheWxvYWQpO1xuICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikgeyB0aHJvdyBlcnJvcjsgfVxuICAgfVxuXG4gICBhc3luYyBzaGFyZVBvc3ROb3JtYWwoaXNGcm9tVjJTY3JlZW4sIHNoYXJlQ29kZSkge1xuICAgICAgY2MuZmluZCgnQ2FudmFzL3NoYXJlcy9waWN0dXJlL292ZXJsYXknKS5hY3RpdmUgPSAhaXNGcm9tVjJTY3JlZW47XG5cbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9zaGFyZXMvcGljdHVyZS9vdmVybGF5L3Njb3JlX2Jhc2UvbGFiZWxfc2NvcmUnKSwgJysnICsgX0cudXNlci5leHApO1xuXG4gICAgICAvLyBmaWxsIHNoYXJlIG5vZGUgd2l0aCBjdXJyZW50IGZyYW1lcyBcbiAgICAgIGNvbnN0IHBpY05vZGUgPSBfLmNvcHlOb2RlKF9HLm1hcFZpc3VhbC5mdWxsUGljTm9kZSwgY2MuZmluZCgncGljdHVyZS9mdWxsX2ZyYW1lJywgdGhpcy5ub2RlKSk7XG4gICAgICAvLyBwaWNOb2RlLnNjYWxlID0gT1JHX0ZSQU1FX1NJWkUgLyBwaWNOb2RlLndpZHRoO1xuICAgICAgY2MuZmluZCgnY2FwdHVyZV9oYXJkX21hc2snLCBwaWNOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAvLyBjYXB0dXJlIHRoZSBmcmFtZXNcbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdGhpcy5pbml0UGF5bG9hZChcbiAgICAgICAgICAgIHRoaXMubm9kZSxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgICAgIGlzRnJvbU5ld3NGZWVkOiAxLFxuICAgICAgICAgICAgICAgcHV6emxlX2lkOiBfRy5nYW1lTWVjaGFuaWMuY3VycmVudENhdGVnb3J5TmFtZSArICdfJyArIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50RnJhbWVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICApO1xuXG4gICAgICAgICAvLyBfLmxvZyhwYXlsb2FkKTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC5zaGFyZUFzeW5jKHBheWxvYWQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgXy5sb2coZXJyb3IpIH1cbiAgIH1cblxuXG59XG4iXX0=