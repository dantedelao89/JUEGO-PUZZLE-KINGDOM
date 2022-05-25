"use strict";
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