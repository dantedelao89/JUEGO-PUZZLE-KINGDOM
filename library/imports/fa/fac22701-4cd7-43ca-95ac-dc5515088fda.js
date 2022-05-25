"use strict";
cc._RF.push(module, 'fac22cBTNdDypWs3FUVCI/a', 'utils_ui');
// script/services/utils/utils_ui.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsUI = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
var canvasTouchEventHandlers = {
    touchstart: [],
    touchmove: [],
    touchend: [],
};
exports.utilsUI = {
    init: function () {
        this.bindCanvasTouchHandler();
    },
    // ========== Nodes & Labels
    fillLabel: function (labelNode, text) {
        var labelComp = labelNode.getComponent(cc.Label) || labelNode.getComponent(cc.RichText);
        labelComp.string = text;
    },
    fillChildLabelByPath: function (node, path, text) {
        var labelNode = cc.find(path, node);
        if (labelNode)
            this.fillLabel(labelNode, text);
    },
    showOnlyChildNodeWithNameAs: function (parentNode, childNodeName, isUseOpacity) {
        if (isUseOpacity === void 0) { isUseOpacity = false; }
        var retChildNode;
        parentNode.children.map(function (childNode) {
            var isSelected = (childNode.name == childNodeName);
            if (isSelected)
                retChildNode = childNode;
            childNode.active = isSelected;
            if (isUseOpacity)
                childNode.opacity = (isSelected ? 255 : 0);
        });
        return retChildNode;
    },
    setLabelCountDownTimer: function (labelNode, targetUTC, timeoutCallback) {
        if (typeof labelNode === 'string')
            labelNode = cc.find(labelNode);
        if (labelNode.countDownTimerVar)
            clearInterval(labelNode.countDownTimerVar);
        var timerFunc = function () {
            if (!labelNode.parent)
                return clearInterval(labelNode.countDownTimerVar);
            var timeDiff = targetUTC - _.getMsPassedUTC();
            var timeDiffStr = _.secondsToTimeCountdown(_.floor(timeDiff / 1000));
            _G.utilsUI.fillLabel(labelNode, timeDiffStr);
            if (timeDiff <= 0) {
                clearInterval(labelNode.countDownTimerVar);
                if (timeoutCallback)
                    timeoutCallback();
            }
            ;
        };
        labelNode.countDownTimerVar = setInterval(timerFunc, 500);
        timerFunc();
    },
    // fill node spriteFrame
    setNodeSprite: function (node, spriteFrame) {
        if (!node || !node.getComponent(cc.Sprite))
            return;
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    },
    // fill node spriteFrame
    setNodeSpriteFromUrl: function (node, url, callback) {
        var _this = this;
        if (!node || !node.getComponent(cc.Sprite))
            return;
        cc.assetManager.loadRemote(url, function (error, texture) {
            if (!error)
                _this.setNodeSprite(node, new cc.SpriteFrame(texture));
            return callback && callback(texture);
        });
    },
    // fill node spriteFrame
    setNodeSpriteFillRange: function (node, fillRange) {
        if (!node || !node.getComponent(cc.Sprite))
            return;
        node.getComponent(cc.Sprite).fillRange = fillRange;
    },
    // ===================================================
    // Touch handlers
    // ===================================================
    // add native button component to node with handler like dragging & dropping component manually
    // to exploit button trasition effect and behavior in scrollView
    makeButton: function (node, handlerFunc, isBubble, isMuteSound) {
        // setTimeout to make this process run later to prevent node not initalized yet
        var myNode = _.isString(node) ? cc.find(node) : node;
        _.setTimeout(function () {
            if (!myNode)
                _.log("undefined node path = " + node);
            if (!myNode.getComponent('free_button_comp'))
                myNode.addComponent('free_button_comp');
            var butComp = myNode.addComponent(cc.Button);
            butComp.transition = isBubble ? cc.Button.Transition.SCALE : null;
            butComp.zoomScale = node.buttonCompZoomScale || 1.2;
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = myNode;
            eventHandler.component = 'free_button_comp';
            eventHandler.handler = 'freeHandler';
            butComp.clickEvents.push(eventHandler);
            myNode.freeButtonHandlerFunc = function () {
                handlerFunc();
                if (!isMuteSound)
                    _G.audio.playSound('button_click');
                canvasTouchEventHandlers['touchstart'].map(function (f) { return f(); });
            };
        });
    },
    makeBubbleButton: function (node, handlerFunc) {
        return this.makeButton(node, handlerFunc, true);
    },
    singleTouchSet: function (node, touchStartFunc, touchMoveFunc, touchEndFunc) {
        var callFuncWithEvent = function (func, event, touchId) {
            var pos = event.touch.getLocation();
            func(pos, event, touchId);
        };
        node.on('touchstart', function (event) {
            if (node._customTouchId) {
                return;
            }
            node._customTouchId = event.touch._id + 1;
            touchStartFunc && callFuncWithEvent(touchStartFunc, event, node._customTouchId);
        });
        touchMoveFunc && node.on('touchmove', function (event) {
            var tID = event.touch._id + 1;
            if (tID != node._customTouchId)
                return;
            if (touchMoveFunc)
                callFuncWithEvent(touchMoveFunc, event, tID);
        });
        var touchDestroy = function (event) {
            var tID = event.touch._id + 1;
            if (tID != node._customTouchId)
                return;
            node._customTouchId = null;
            if (touchEndFunc)
                callFuncWithEvent(touchEndFunc, event, tID);
        };
        node.on('touchend', touchDestroy);
        node.on('touchcancel', touchDestroy);
    },
    bindCanvasTouchHandler: function () {
        var canvasNode = cc.find('Canvas');
        this.singleTouchSet(canvasNode, function (pos) {
            canvasTouchEventHandlers['touchstart'].map(function (f) { return f(pos); });
        }, function (pos) {
            canvasTouchEventHandlers['touchmove'].map(function (f) { return f(pos); });
        }, function (pos) {
            canvasTouchEventHandlers['touchend'].map(function (f) { return f(pos); });
        });
    },
    addCanvasTouchHandler: function (eventName, func) {
        var handlerArr = canvasTouchEventHandlers[eventName];
        if (!handlerArr)
            return;
        handlerArr.push(func);
    },
};

cc._RF.pop();