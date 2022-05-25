
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_anim_fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e273ec92dRLKKGQF99UI9/D', 'utils_anim_fx');
// script/services/utils/utils_anim_fx.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsAnimFx = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
exports.utilsAnimFx = {
    fxNodePool: {},
    init: function () {
    },
    replayParticle: function (node) {
        if (!node || !node.getComponent(cc.ParticleSystem))
            return;
        node.active = true;
        node.getComponent(cc.ParticleSystem).resetSystem();
    },
    // play a clip attached to animation component of a node
    playNodeAnim: function (node, clipName, repeatTime, isKeepPreviousClip, callback) {
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = false; }
        var animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp)
            return;
        clipName = clipName || (animComp.defaultClip ? animComp.defaultClip.name : '');
        if (!clipName)
            return;
        var animState = animComp[isKeepPreviousClip ? 'playAdditive' : 'play'](clipName);
        if (!animState)
            return;
        animState.repeatCount = (repeatTime == -1 ? Infinity : repeatTime) || 1;
        if (callback)
            animComp.on('finished', function () {
                animComp.off('finished');
                callback();
            });
        return animState;
    },
    playNodeAnimAsSoonAsNodeActive: function (node, clipName, repeatTime, isKeepPreviousClip) {
        var _this = this;
        if (repeatTime === void 0) { repeatTime = 1; }
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = true; }
        var varName = 'waitInterval2PlayAnimWhenActive';
        node[varName] = _.waitToRun(function () {
            if (node[varName])
                clearInterval(node[varName]);
            _this.playNodeAnim(node, clipName, repeatTime, isKeepPreviousClip);
        }, 'activeInHierarchy', node);
    },
    // play a clip attached to animation component of a node
    playNodeAnimArr: function (node, orgClipNameArr, isKeepPreviousClip, callback) {
        var _this = this;
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = false; }
        if (!node.activeInHierarchy)
            return;
        var animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp)
            return;
        var clipNameArr = __spreadArrays(orgClipNameArr);
        animComp.on('finished', function () {
            if (clipNameArr.length)
                _this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip);
            else {
                animComp.off('finished');
                if (callback)
                    callback();
            }
        });
        this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip);
    },
    stopAllNodeAnims: function (node) {
        var animComp = node.getComponent(cc.Animation);
        if (!animComp)
            return;
        animComp.stop();
        animComp.off('finished');
    },
    // reset a node at state of frame 0 of an animation clip
    stopAnimAtFrame0: function (node, clipName) {
        var _this = this;
        var animComp = node.getComponent(cc.Animation);
        animComp.play('ufo_ring_fx');
        _.setTimeout(function () {
            animComp.setCurrentTime(0);
            _this.stopAllNodeAnims(node);
        });
    },
    // subtrack current number from 
    playIncreasingNumberLabel: function (labelNode, oldNumber, addedAmount, updateCount, duration, delayStartTime, template) {
        if (updateCount === void 0) { updateCount = 5; }
        if (duration === void 0) { duration = 0.5; }
        if (delayStartTime === void 0) { delayStartTime = 0; }
        if (template === void 0) { template = 'xxx'; }
        // get current number on label
        var labelComp = labelNode.getComponent(cc.Label);
        var incrementAmount = addedAmount / updateCount;
        var updateDelay = duration / updateCount;
        cc.tween(labelNode).delay(delayStartTime).repeat(updateCount, cc.tween().call(function () {
            oldNumber += incrementAmount;
            var currentNumberStr = _.formatMoney(_.round(oldNumber));
            labelComp.string = template.replace(/xxx/g, currentNumberStr);
            // _.log(` playIncreasingNumberLabel >> currentNumberStr = ${currentNumberStr} // labelComp.string=${labelComp.string} `);
        }).delay(updateDelay)).start();
    },
    // handle node pool
    getNewFxNode: function (sampleNode, fxContainer) {
        if (!sampleNode.nodePoolId)
            sampleNode.nodePoolId = _.getNewUuid();
        if (!this.fxNodePool[sampleNode.nodePoolId])
            this.fxNodePool[sampleNode.nodePoolId] = [];
        var newNode = this.fxNodePool[sampleNode.nodePoolId].pop() || _.copyNode(sampleNode);
        newNode.nodePoolId = sampleNode.nodePoolId;
        newNode.parent = fxContainer || _G.coreFX.fxContainer;
        return newNode;
    },
    saveFxNodeToPool: function (node) {
        node.stopAllActions();
        node.active = false;
        this.fxNodePool[node.nodePoolId].unshift(node);
    },
    // particles fly from node A to node B
    particlesFlyFromA2B: function (sampleNode, nodeA, nodeB, animConfig, fxContainer) {
        var _this = this;
        var defaultParticleFlyA2BConfigs = {
            numberOfNode: 20,
            delayStartTime: 0.05,
            flyDuration: 1,
            randomBezierPointRange: { x: 200, y: 200 },
        };
        var _a = animConfig || defaultParticleFlyA2BConfigs, numberOfNode = _a.numberOfNode, flyDuration = _a.flyDuration, delayStartTime = _a.delayStartTime, randomBezierPointRange = _a.randomBezierPointRange;
        var posDiffVec2 = _.getGlobalPosDiff(nodeA, nodeB);
        var _loop_1 = function (i) {
            var newNode = this_1.getNewFxNode(sampleNode, fxContainer);
            newNode.active = true;
            newNode.opacity = 255;
            _.setGlobalPosToNode(newNode, nodeA);
            var bezierP1 = this_1.getRandomPointInRage(randomBezierPointRange);
            var bezierP2 = this_1.getRandomPointInRage(randomBezierPointRange);
            cc.tween(newNode)
                .delay(i * delayStartTime)
                .bezierBy(flyDuration, bezierP1, bezierP2, posDiffVec2)
                .call(function () { _this.saveFxNodeToPool(newNode); })
                .start();
        };
        var this_1 = this;
        // _.log(` particlesFlyFromA2B >> posDiffVec2 = ${posDiffVec2} // numberOfNode=${numberOfNode}, flyDuration=${flyDuration}, delayTimeEachNode=${delayTimeEachNode} `);
        for (var i = 0; i < numberOfNode; i++) {
            _loop_1(i);
        }
    },
    getRandomPointInRage: function (pointRange) {
        return cc.v2(_.randomNumber(pointRange.x * 2) - pointRange.x, _.randomNumber(pointRange.y * 2) - pointRange.y);
    },
    // fly a node to position of another
    nodeFlyFromAtoB: function (node, targetNode, duration, callback) {
        if (duration === void 0) { duration = 0.3; }
        var diffVec = _.getGlobalPosDiff(node, targetNode);
        cc.tween(node).by(duration, { position: diffVec }).call(function () { return callback && callback(); }).start();
    },
    // ===========================================
    // screenshot a node to get spriteFrame (jpg)
    // *** NOTE: CODE NOT WORKING !!! JUST COPIED FROM ANOTHER PLACE
    captureNodeToTexture: function (targetNode) {
        if (!targetNode.activeInHierarchy)
            targetNode.active = true;
        var cameraNode = new cc.Node();
        targetNode.addChild(cameraNode);
        var cameraComp = cameraNode.addComponent(cc.Camera);
        var texture = new cc.RenderTexture();
        var gl = cc.game._renderContext;
        texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
        cameraComp.targetTexture = texture;
        cameraComp.zoomRatio = 1.3;
        cameraComp.backgroundColor = cc.Color.WHITE;
        cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
        // cameraComp.cullingMask = 0xffffffff;
        var width = texture.width;
        var height = texture.height;
        var _canvas = document.createElement('canvas');
        _canvas.width = width;
        _canvas.height = height;
        var ctx = _canvas.getContext('2d');
        cameraComp.render(targetNode);
        var data = texture.readPixels();
        // write the render data
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
            var imageData = new ImageData(data2, width, 1);
            ctx.putImageData(imageData, 0, row);
        }
        var dataURL = _canvas.toDataURL("image/jpeg");
        setTimeout(function () {
            targetNode.active = false;
            cameraNode.removeFromParent();
        }, 1000);
        return dataURL;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfYW5pbV9meC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFHRixRQUFBLFdBQVcsR0FBRztJQUN4QixVQUFVLEVBQUUsRUFBRTtJQUVkLElBQUk7SUFFSixDQUFDO0lBR0QsY0FBYyxFQUFkLFVBQWUsSUFBYTtRQUN6QixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQUUsT0FBTztRQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELFlBQVksRUFBWixVQUFhLElBQWEsRUFBRSxRQUFpQixFQUFFLFVBQW1CLEVBQUUsa0JBQTBCLEVBQUUsUUFBbUI7UUFBL0MsbUNBQUEsRUFBQSwwQkFBMEI7UUFDM0YsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQ2pELFFBQVEsR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBRXRCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMs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QUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNFLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDUixVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMxQixVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxPQUFPLE9BQU8sQ0FBQztJQUNsQixDQUFDO0NBR0gsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuXG5leHBvcnQgY29uc3QgdXRpbHNBbmltRnggPSB7XG4gICBmeE5vZGVQb29sOiB7fSxcblxuICAgaW5pdCgpIHtcblxuICAgfSxcblxuXG4gICByZXBsYXlQYXJ0aWNsZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKSkgcmV0dXJuO1xuICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pLnJlc2V0U3lzdGVtKCk7XG4gICB9LFxuXG4gICAvLyBwbGF5IGEgY2xpcCBhdHRhY2hlZCB0byBhbmltYXRpb24gY29tcG9uZW50IG9mIGEgbm9kZVxuICAgcGxheU5vZGVBbmltKG5vZGU6IGNjLk5vZGUsIGNsaXBOYW1lPzogc3RyaW5nLCByZXBlYXRUaW1lPzogbnVtYmVyLCBpc0tlZXBQcmV2aW91c0NsaXAgPSBmYWxzZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgaWYgKCFub2RlLmFjdGl2ZUluSGllcmFyY2h5IHx8ICFhbmltQ29tcCkgcmV0dXJuO1xuICAgICAgY2xpcE5hbWUgPSBjbGlwTmFtZSB8fCAoYW5pbUNvbXAuZGVmYXVsdENsaXAgPyBhbmltQ29tcC5kZWZhdWx0Q2xpcC5uYW1lIDogJycpO1xuICAgICAgaWYgKCFjbGlwTmFtZSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBhbmltU3RhdGUgPSBhbmltQ29tcFtpc0tlZXBQcmV2aW91c0NsaXAgPyAncGxheUFkZGl0aXZlJyA6ICdwbGF5J10oY2xpcE5hbWUpO1xuICAgICAgaWYgKCFhbmltU3RhdGUpIHJldHVybjtcbiAgICAgIGFuaW1TdGF0ZS5yZXBlYXRDb3VudCA9IChyZXBlYXRUaW1lID09IC0xID8gSW5maW5pdHkgOiByZXBlYXRUaW1lKSB8fCAxO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGFuaW1Db21wLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgIGFuaW1Db21wLm9mZignZmluaXNoZWQnKTtcbiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGFuaW1TdGF0ZTtcbiAgIH0sXG5cbiAgIHBsYXlOb2RlQW5pbUFzU29vbkFzTm9kZUFjdGl2ZShub2RlOiBjYy5Ob2RlLCBjbGlwTmFtZT86IHN0cmluZywgcmVwZWF0VGltZSA9IDEsIGlzS2VlcFByZXZpb3VzQ2xpcCA9IHRydWUpIHtcbiAgICAgIGNvbnN0IHZhck5hbWUgPSAnd2FpdEludGVydmFsMlBsYXlBbmltV2hlbkFjdGl2ZSc7XG4gICAgICBub2RlW3Zhck5hbWVdID0gXy53YWl0VG9SdW4oKCkgPT4ge1xuICAgICAgICAgaWYgKG5vZGVbdmFyTmFtZV0pIGNsZWFySW50ZXJ2YWwobm9kZVt2YXJOYW1lXSk7XG4gICAgICAgICB0aGlzLnBsYXlOb2RlQW5pbShub2RlLCBjbGlwTmFtZSwgcmVwZWF0VGltZSwgaXNLZWVwUHJldmlvdXNDbGlwKTtcbiAgICAgIH0sICdhY3RpdmVJbkhpZXJhcmNoeScsIG5vZGUpO1xuICAgfSxcblxuXG4gICAvLyBwbGF5IGEgY2xpcCBhdHRhY2hlZCB0byBhbmltYXRpb24gY29tcG9uZW50IG9mIGEgbm9kZVxuICAgcGxheU5vZGVBbmltQXJyKG5vZGU6IGNjLk5vZGUsIG9yZ0NsaXBOYW1lQXJyPzogc3RyaW5nW10sIGlzS2VlcFByZXZpb3VzQ2xpcCA9IGZhbHNlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIW5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgIGNvbnN0IGFuaW1Db21wID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgIGlmICghbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSB8fCAhYW5pbUNvbXApIHJldHVybjtcbiAgICAgIGNvbnN0IGNsaXBOYW1lQXJyID0gWy4uLm9yZ0NsaXBOYW1lQXJyXTtcbiAgICAgIGFuaW1Db21wLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgIGlmIChjbGlwTmFtZUFyci5sZW5ndGgpIHRoaXMucGxheU5vZGVBbmltKG5vZGUsIGNsaXBOYW1lQXJyLnNoaWZ0KCksIDEsIGlzS2VlcFByZXZpb3VzQ2xpcCk7XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFuaW1Db21wLm9mZignZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wbGF5Tm9kZUFuaW0obm9kZSwgY2xpcE5hbWVBcnIuc2hpZnQoKSwgMSwgaXNLZWVwUHJldmlvdXNDbGlwKTtcbiAgIH0sXG5cbiAgIHN0b3BBbGxOb2RlQW5pbXMobm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgaWYgKCFhbmltQ29tcCkgcmV0dXJuO1xuICAgICAgYW5pbUNvbXAuc3RvcCgpO1xuICAgICAgYW5pbUNvbXAub2ZmKCdmaW5pc2hlZCcpO1xuICAgfSxcblxuICAgLy8gcmVzZXQgYSBub2RlIGF0IHN0YXRlIG9mIGZyYW1lIDAgb2YgYW4gYW5pbWF0aW9uIGNsaXBcbiAgIHN0b3BBbmltQXRGcmFtZTAobm9kZTogY2MuTm9kZSwgY2xpcE5hbWU6IHN0cmluZykge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgYW5pbUNvbXAucGxheSgndWZvX3JpbmdfZngnKTtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBhbmltQ29tcC5zZXRDdXJyZW50VGltZSgwKTtcbiAgICAgICAgIHRoaXMuc3RvcEFsbE5vZGVBbmltcyhub2RlKVxuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIHN1YnRyYWNrIGN1cnJlbnQgbnVtYmVyIGZyb20gXG4gICBwbGF5SW5jcmVhc2luZ051bWJlckxhYmVsKGxhYmVsTm9kZTogY2MuTm9kZSwgb2xkTnVtYmVyOiBudW1iZXIsIGFkZGVkQW1vdW50OiBudW1iZXIsIHVwZGF0ZUNvdW50ID0gNSwgZHVyYXRpb24gPSAwLjUsIGRlbGF5U3RhcnRUaW1lID0gMCwgdGVtcGxhdGUgPSAneHh4Jykge1xuICAgICAgLy8gZ2V0IGN1cnJlbnQgbnVtYmVyIG9uIGxhYmVsXG4gICAgICBjb25zdCBsYWJlbENvbXAgPSBsYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgIGNvbnN0IGluY3JlbWVudEFtb3VudCA9IGFkZGVkQW1vdW50IC8gdXBkYXRlQ291bnQ7XG4gICAgICBjb25zdCB1cGRhdGVEZWxheSA9IGR1cmF0aW9uIC8gdXBkYXRlQ291bnQ7XG5cbiAgICAgIGNjLnR3ZWVuKGxhYmVsTm9kZSkuZGVsYXkoZGVsYXlTdGFydFRpbWUpLnJlcGVhdChcbiAgICAgICAgIHVwZGF0ZUNvdW50LFxuICAgICAgICAgY2MudHdlZW4oKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIG9sZE51bWJlciArPSBpbmNyZW1lbnRBbW91bnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU3RyID0gXy5mb3JtYXRNb25leShfLnJvdW5kKG9sZE51bWJlcikpO1xuICAgICAgICAgICAgbGFiZWxDb21wLnN0cmluZyA9IHRlbXBsYXRlLnJlcGxhY2UoL3h4eC9nLCBjdXJyZW50TnVtYmVyU3RyKTtcbiAgICAgICAgICAgIC8vIF8ubG9nKGAgcGxheUluY3JlYXNpbmdOdW1iZXJMYWJlbCA+PiBjdXJyZW50TnVtYmVyU3RyID0gJHtjdXJyZW50TnVtYmVyU3RyfSAvLyBsYWJlbENvbXAuc3RyaW5nPSR7bGFiZWxDb21wLnN0cmluZ30gYCk7XG4gICAgICAgICB9KS5kZWxheSh1cGRhdGVEZWxheSlcbiAgICAgICkuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgLy8gaGFuZGxlIG5vZGUgcG9vbFxuICAgZ2V0TmV3RnhOb2RlKHNhbXBsZU5vZGU6IGNjLk5vZGUsIGZ4Q29udGFpbmVyOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIXNhbXBsZU5vZGUubm9kZVBvb2xJZCkgc2FtcGxlTm9kZS5ub2RlUG9vbElkID0gXy5nZXROZXdVdWlkKCk7XG4gICAgICBpZiAoIXRoaXMuZnhOb2RlUG9vbFtzYW1wbGVOb2RlLm5vZGVQb29sSWRdKSB0aGlzLmZ4Tm9kZVBvb2xbc2FtcGxlTm9kZS5ub2RlUG9vbElkXSA9IFtdO1xuICAgICAgY29uc3QgbmV3Tm9kZSA9IHRoaXMuZnhOb2RlUG9vbFtzYW1wbGVOb2RlLm5vZGVQb29sSWRdLnBvcCgpIHx8IF8uY29weU5vZGUoc2FtcGxlTm9kZSk7XG4gICAgICBuZXdOb2RlLm5vZGVQb29sSWQgPSBzYW1wbGVOb2RlLm5vZGVQb29sSWQ7XG4gICAgICBuZXdOb2RlLnBhcmVudCA9IGZ4Q29udGFpbmVyIHx8IF9HLmNvcmVGWC5meENvbnRhaW5lcjtcbiAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgfSxcblxuXG4gICBzYXZlRnhOb2RlVG9Qb29sKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmZ4Tm9kZVBvb2xbbm9kZS5ub2RlUG9vbElkXS51bnNoaWZ0KG5vZGUpO1xuICAgfSxcblxuXG4gICAvLyBwYXJ0aWNsZXMgZmx5IGZyb20gbm9kZSBBIHRvIG5vZGUgQlxuICAgcGFydGljbGVzRmx5RnJvbUEyQihzYW1wbGVOb2RlOiBjYy5Ob2RlLCBub2RlQTogY2MuTm9kZSwgbm9kZUI6IGNjLk5vZGUsIGFuaW1Db25maWc/OiBhbnksIGZ4Q29udGFpbmVyPzogY2MuTm9kZSkge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcnRpY2xlRmx5QTJCQ29uZmlncyA9IHtcbiAgICAgICAgIG51bWJlck9mTm9kZTogMjAsXG4gICAgICAgICBkZWxheVN0YXJ0VGltZTogMC4wNSxcbiAgICAgICAgIGZseUR1cmF0aW9uOiAxLFxuICAgICAgICAgcmFuZG9tQmV6aWVyUG9pbnRSYW5nZTogeyB4OiAyMDAsIHk6IDIwMCB9LCAgLy8geCA+IDAgJiB5ID4gMFxuICAgICAgfVxuICAgICAgY29uc3QgeyBudW1iZXJPZk5vZGUsIGZseUR1cmF0aW9uLCBkZWxheVN0YXJ0VGltZSwgcmFuZG9tQmV6aWVyUG9pbnRSYW5nZSB9ID0gYW5pbUNvbmZpZyB8fCBkZWZhdWx0UGFydGljbGVGbHlBMkJDb25maWdzO1xuICAgICAgY29uc3QgcG9zRGlmZlZlYzIgPSBfLmdldEdsb2JhbFBvc0RpZmYobm9kZUEsIG5vZGVCKTtcbiAgICAgIC8vIF8ubG9nKGAgcGFydGljbGVzRmx5RnJvbUEyQiA+PiBwb3NEaWZmVmVjMiA9ICR7cG9zRGlmZlZlYzJ9IC8vIG51bWJlck9mTm9kZT0ke251bWJlck9mTm9kZX0sIGZseUR1cmF0aW9uPSR7Zmx5RHVyYXRpb259LCBkZWxheVRpbWVFYWNoTm9kZT0ke2RlbGF5VGltZUVhY2hOb2RlfSBgKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZOb2RlOyBpKyspIHtcbiAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB0aGlzLmdldE5ld0Z4Tm9kZShzYW1wbGVOb2RlLCBmeENvbnRhaW5lcik7XG4gICAgICAgICBuZXdOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBuZXdOb2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICBfLnNldEdsb2JhbFBvc1RvTm9kZShuZXdOb2RlLCBub2RlQSk7XG4gICAgICAgICBjb25zdCBiZXppZXJQMSA9IHRoaXMuZ2V0UmFuZG9tUG9pbnRJblJhZ2UocmFuZG9tQmV6aWVyUG9pbnRSYW5nZSk7XG4gICAgICAgICBjb25zdCBiZXppZXJQMiA9IHRoaXMuZ2V0UmFuZG9tUG9pbnRJblJhZ2UocmFuZG9tQmV6aWVyUG9pbnRSYW5nZSk7XG4gICAgICAgICBjYy50d2VlbihuZXdOb2RlKVxuICAgICAgICAgICAgLmRlbGF5KGkgKiBkZWxheVN0YXJ0VGltZSlcbiAgICAgICAgICAgIC5iZXppZXJCeShmbHlEdXJhdGlvbiwgYmV6aWVyUDEsIGJlemllclAyLCBwb3NEaWZmVmVjMilcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5zYXZlRnhOb2RlVG9Qb29sKG5ld05vZGUpOyB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBnZXRSYW5kb21Qb2ludEluUmFnZShwb2ludFJhbmdlKSB7XG4gICAgICByZXR1cm4gY2MudjIoXG4gICAgICAgICBfLnJhbmRvbU51bWJlcihwb2ludFJhbmdlLnggKiAyKSAtIHBvaW50UmFuZ2UueCxcbiAgICAgICAgIF8ucmFuZG9tTnVtYmVyKHBvaW50UmFuZ2UueSAqIDIpIC0gcG9pbnRSYW5nZS55XG4gICAgICApO1xuICAgfSxcblxuXG4gICAvLyBmbHkgYSBub2RlIHRvIHBvc2l0aW9uIG9mIGFub3RoZXJcbiAgIG5vZGVGbHlGcm9tQXRvQihub2RlOiBjYy5Ob2RlLCB0YXJnZXROb2RlOiBjYy5Ob2RlLCBkdXJhdGlvbjogbnVtYmVyID0gMC4zLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBkaWZmVmVjID0gXy5nZXRHbG9iYWxQb3NEaWZmKG5vZGUsIHRhcmdldE5vZGUpO1xuICAgICAgY2MudHdlZW4obm9kZSkuYnkoZHVyYXRpb24sIHsgcG9zaXRpb246IGRpZmZWZWMgfSkuY2FsbCgoKSA9PiBjYWxsYmFjayAmJiBjYWxsYmFjaygpKS5zdGFydCgpO1xuICAgfSxcblxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIHNjcmVlbnNob3QgYSBub2RlIHRvIGdldCBzcHJpdGVGcmFtZSAoanBnKVxuICAgLy8gKioqIE5PVEU6IENPREUgTk9UIFdPUktJTkcgISEhIEpVU1QgQ09QSUVEIEZST00gQU5PVEhFUiBQTEFDRVxuXG4gICBjYXB0dXJlTm9kZVRvVGV4dHVyZSh0YXJnZXROb2RlOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIXRhcmdldE5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHRhcmdldE5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgY2FtZXJhTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICB0YXJnZXROb2RlLmFkZENoaWxkKGNhbWVyYU5vZGUpO1xuICAgICAgbGV0IGNhbWVyYUNvbXAgPSBjYW1lcmFOb2RlLmFkZENvbXBvbmVudChjYy5DYW1lcmEpO1xuICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuUmVuZGVyVGV4dHVyZSgpO1xuXG4gICAgICBsZXQgZ2wgPSBjYy5nYW1lLl9yZW5kZXJDb250ZXh0O1xuICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUodGFyZ2V0Tm9kZS53aWR0aCwgdGFyZ2V0Tm9kZS5oZWlnaHQsIGdsLlNURU5DSUxfSU5ERVg4KTtcbiAgICAgIGNhbWVyYUNvbXAudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICBjYW1lcmFDb21wLnpvb21SYXRpbyA9IDEuMztcblxuICAgICAgY2FtZXJhQ29tcC5iYWNrZ3JvdW5kQ29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgIGNhbWVyYUNvbXAuY2xlYXJGbGFncyA9IGNjLkNhbWVyYS5DbGVhckZsYWdzLkRFUFRIIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuU1RFTkNJTCB8IGNjLkNhbWVyYS5DbGVhckZsYWdzLkNPTE9SO1xuICAgICAgLy8gY2FtZXJhQ29tcC5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG5cbiAgICAgIGxldCB3aWR0aCA9IHRleHR1cmUud2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHQ7XG4gICAgICBsZXQgX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGxldCBjdHggPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjYW1lcmFDb21wLnJlbmRlcih0YXJnZXROb2RlKTtcbiAgICAgIGxldCBkYXRhID0gdGV4dHVyZS5yZWFkUGl4ZWxzKCk7XG4gICAgICAvLyB3cml0ZSB0aGUgcmVuZGVyIGRhdGFcblxuICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgaGVpZ2h0OyByb3crKykge1xuICAgICAgICAgbGV0IHNyb3cgPSBoZWlnaHQgLSAxIC0gcm93O1xuICAgICAgICAgbGV0IGRhdGEyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEuYnVmZmVyLCBzcm93ICogd2lkdGggKiA0LCByb3dCeXRlcyk7XG4gICAgICAgICBsZXQgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhMiwgd2lkdGgsIDEpO1xuICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIHJvdyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFVUkwgPSBfY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGFyZ2V0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGNhbWVyYU5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgfVxuXG5cbn0iXX0=