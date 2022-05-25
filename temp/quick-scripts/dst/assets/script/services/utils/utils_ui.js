
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLHdCQUF3QixHQUFHO0lBQzlCLFVBQVUsRUFBRSxFQUFFO0lBQ2QsU0FBUyxFQUFFLEVBQUU7SUFDYixRQUFRLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRztJQUNwQixJQUFJO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixTQUFTLEVBQVQsVUFBVSxTQUFrQixFQUFFLElBQVk7UUFDdkMsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUYsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFvQixFQUFwQixVQUFxQixJQUFhLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDM0QsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDJCQUEyQixFQUEzQixVQUE0QixVQUFtQixFQUFFLGFBQXFCLEVBQUUsWUFBb0I7UUFBcEIsNkJBQUEsRUFBQSxvQkFBb0I7UUFDekYsSUFBSSxZQUFxQixDQUFDO1FBQzFCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUztZQUM5QixJ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VyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDO1FBQzFELENBQUMsRUFDRCxVQUFDLEdBQUc7WUFDRCx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQU4sQ0FBTSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUNILENBQUE7SUFDSixDQUFDO0lBRUQscUJBQXFCLFlBQUMsU0FBUyxFQUFFLElBQUk7UUFDbEMsSUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPO1FBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUdILENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzID0ge1xuICAgdG91Y2hzdGFydDogW10sXG4gICB0b3VjaG1vdmU6IFtdLFxuICAgdG91Y2hlbmQ6IFtdLFxufTtcblxuZXhwb3J0IGNvbnN0IHV0aWxzVUkgPSB7XG4gICBpbml0KCkge1xuICAgICAgdGhpcy5iaW5kQ2FudmFzVG91Y2hIYW5kbGVyKCk7XG4gICB9LFxuXG4gICAvLyA9PT09PT09PT09IE5vZGVzICYgTGFiZWxzXG4gICBmaWxsTGFiZWwobGFiZWxOb2RlOiBjYy5Ob2RlLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGxhYmVsQ29tcCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpIHx8IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xuICAgICAgbGFiZWxDb21wLnN0cmluZyA9IHRleHQ7XG4gICB9LFxuXG4gICBmaWxsQ2hpbGRMYWJlbEJ5UGF0aChub2RlOiBjYy5Ob2RlLCBwYXRoOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgICAgY29uc3QgbGFiZWxOb2RlID0gY2MuZmluZChwYXRoLCBub2RlKTtcbiAgICAgIGlmIChsYWJlbE5vZGUpIHRoaXMuZmlsbExhYmVsKGxhYmVsTm9kZSwgdGV4dCk7XG4gICB9LFxuXG4gICBzaG93T25seUNoaWxkTm9kZVdpdGhOYW1lQXMocGFyZW50Tm9kZTogY2MuTm9kZSwgY2hpbGROb2RlTmFtZTogc3RyaW5nLCBpc1VzZU9wYWNpdHkgPSBmYWxzZSkge1xuICAgICAgbGV0IHJldENoaWxkTm9kZTogY2MuTm9kZTtcbiAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW4ubWFwKGNoaWxkTm9kZSA9PiB7XG4gICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gKGNoaWxkTm9kZS5uYW1lID09IGNoaWxkTm9kZU5hbWUpO1xuICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHJldENoaWxkTm9kZSA9IGNoaWxkTm9kZTtcbiAgICAgICAgIGNoaWxkTm9kZS5hY3RpdmUgPSBpc1NlbGVjdGVkO1xuICAgICAgICAgaWYgKGlzVXNlT3BhY2l0eSkgY2hpbGROb2RlLm9wYWNpdHkgPSAoaXNTZWxlY3RlZCA/IDI1NSA6IDApO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0Q2hpbGROb2RlO1xuICAgfSxcblxuXG4gICBzZXRMYWJlbENvdW50RG93blRpbWVyKGxhYmVsTm9kZTogY2MuTm9kZSwgdGFyZ2V0VVRDOiBudW1iZXIsIHRpbWVvdXRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGxhYmVsTm9kZSA9PT0gJ3N0cmluZycpIGxhYmVsTm9kZSA9IGNjLmZpbmQobGFiZWxOb2RlKTtcbiAgICAgIGlmIChsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIpIGNsZWFySW50ZXJ2YWwobGFiZWxOb2RlLmNvdW50RG93blRpbWVyVmFyKTtcblxuICAgICAgY29uc3QgdGltZXJGdW5jID0gKCkgPT4ge1xuICAgICAgICAgaWYgKCFsYWJlbE5vZGUucGFyZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIpO1xuICAgICAgICAgY29uc3QgdGltZURpZmYgPSB0YXJnZXRVVEMgLSBfLmdldE1zUGFzc2VkVVRDKCk7XG4gICAgICAgICBjb25zdCB0aW1lRGlmZlN0ciA9IF8uc2Vjb25kc1RvVGltZUNvdW50ZG93bihfLmZsb29yKHRpbWVEaWZmIC8gMTAwMCkpO1xuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwobGFiZWxOb2RlLCB0aW1lRGlmZlN0cik7XG5cbiAgICAgICAgIGlmICh0aW1lRGlmZiA8PSAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxhYmVsTm9kZS5jb3VudERvd25UaW1lclZhcik7XG4gICAgICAgICAgICBpZiAodGltZW91dENhbGxiYWNrKSB0aW1lb3V0Q2FsbGJhY2soKTtcbiAgICAgICAgIH07XG4gICAgICB9XG4gICAgICBsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIgPSBzZXRJbnRlcnZhbCh0aW1lckZ1bmMsIDUwMCk7XG4gICAgICB0aW1lckZ1bmMoKTtcbiAgIH0sXG5cbiAgIC8vIGZpbGwgbm9kZSBzcHJpdGVGcmFtZVxuICAgc2V0Tm9kZVNwcml0ZShub2RlOiBjYy5Ob2RlLCBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSkgcmV0dXJuXG4gICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICB9LFxuXG4gICAvLyBmaWxsIG5vZGUgc3ByaXRlRnJhbWVcbiAgIHNldE5vZGVTcHJpdGVGcm9tVXJsKG5vZGU6IGNjLk5vZGUsIHVybDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpIHJldHVybjtcbiAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCwgKGVycm9yLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICBpZiAoIWVycm9yKSB0aGlzLnNldE5vZGVTcHJpdGUobm9kZSwgbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpKTtcbiAgICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjayh0ZXh0dXJlKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgLy8gZmlsbCBub2RlIHNwcml0ZUZyYW1lXG4gICBzZXROb2RlU3ByaXRlRmlsbFJhbmdlKG5vZGU6IGNjLk5vZGUsIGZpbGxSYW5nZTogbnVtYmVyKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpIHJldHVyblxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBmaWxsUmFuZ2U7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyBUb3VjaCBoYW5kbGVyc1xuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIC8vIGFkZCBuYXRpdmUgYnV0dG9uIGNvbXBvbmVudCB0byBub2RlIHdpdGggaGFuZGxlciBsaWtlIGRyYWdnaW5nICYgZHJvcHBpbmcgY29tcG9uZW50IG1hbnVhbGx5XG4gICAvLyB0byBleHBsb2l0IGJ1dHRvbiB0cmFzaXRpb24gZWZmZWN0IGFuZCBiZWhhdmlvciBpbiBzY3JvbGxWaWV3XG4gICBtYWtlQnV0dG9uKG5vZGU6IGNjLk5vZGUgfCBzdHJpbmcsIGhhbmRsZXJGdW5jOiBGdW5jdGlvbiwgaXNCdWJibGU/LCBpc011dGVTb3VuZD8pIHtcbiAgICAgIC8vIHNldFRpbWVvdXQgdG8gbWFrZSB0aGlzIHByb2Nlc3MgcnVuIGxhdGVyIHRvIHByZXZlbnQgbm9kZSBub3QgaW5pdGFsaXplZCB5ZXRcbiAgICAgIGNvbnN0IG15Tm9kZTogY2MuTm9kZSA9IF8uaXNTdHJpbmcobm9kZSkgPyBjYy5maW5kKG5vZGUpIDogbm9kZTtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBpZiAoIW15Tm9kZSkgXy5sb2coYHVuZGVmaW5lZCBub2RlIHBhdGggPSAke25vZGV9YCk7XG4gICAgICAgICBpZiAoIW15Tm9kZS5nZXRDb21wb25lbnQoJ2ZyZWVfYnV0dG9uX2NvbXAnKSkgbXlOb2RlLmFkZENvbXBvbmVudCgnZnJlZV9idXR0b25fY29tcCcpO1xuXG4gICAgICAgICBjb25zdCBidXRDb21wID0gbXlOb2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgYnV0Q29tcC50cmFuc2l0aW9uID0gaXNCdWJibGUgPyBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSA6IG51bGw7XG4gICAgICAgICBidXRDb21wLnpvb21TY2FsZSA9IG5vZGUuYnV0dG9uQ29tcFpvb21TY2FsZSB8fCAxLjI7XG4gICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICAgZXZlbnRIYW5kbGVyLnRhcmdldCA9IG15Tm9kZTtcbiAgICAgICAgIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSAnZnJlZV9idXR0b25fY29tcCc7XG4gICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9ICdmcmVlSGFuZGxlcic7XG4gICAgICAgICBidXRDb21wLmNsaWNrRXZlbnRzLnB1c2goZXZlbnRIYW5kbGVyKTtcblxuICAgICAgICAgbXlOb2RlLmZyZWVCdXR0b25IYW5kbGVyRnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXJGdW5jKCk7XG4gICAgICAgICAgICBpZiAoIWlzTXV0ZVNvdW5kKSBfRy5hdWRpby5wbGF5U291bmQoJ2J1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzWyd0b3VjaHN0YXJ0J10ubWFwKGYgPT4gZigpKTtcbiAgICAgICAgIH07XG4gICAgICB9KTtcbiAgIH0sXG5cbiAgIG1ha2VCdWJibGVCdXR0b24obm9kZSwgaGFuZGxlckZ1bmMpIHtcbiAgICAgIHJldHVybiB0aGlzLm1ha2VCdXR0b24obm9kZSwgaGFuZGxlckZ1bmMsIHRydWUpO1xuICAgfSxcblxuXG4gICBzaW5nbGVUb3VjaFNldChub2RlOiBjYy5Ob2RlLCB0b3VjaFN0YXJ0RnVuYzogRnVuY3Rpb24sIHRvdWNoTW92ZUZ1bmM6IEZ1bmN0aW9uLCB0b3VjaEVuZEZ1bmM6IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBjYWxsRnVuY1dpdGhFdmVudCA9IChmdW5jOiBGdW5jdGlvbiwgZXZlbnQsIHRvdWNoSWQ/KSA9PiB7XG4gICAgICAgICBjb25zdCBwb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgZnVuYyhwb3MsIGV2ZW50LCB0b3VjaElkKTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5vbigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICAgaWYgKG5vZGUuX2N1c3RvbVRvdWNoSWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICBub2RlLl9jdXN0b21Ub3VjaElkID0gZXZlbnQudG91Y2guX2lkICsgMTtcbiAgICAgICAgIHRvdWNoU3RhcnRGdW5jICYmIGNhbGxGdW5jV2l0aEV2ZW50KHRvdWNoU3RhcnRGdW5jLCBldmVudCwgbm9kZS5fY3VzdG9tVG91Y2hJZCk7XG4gICAgICB9KTtcblxuICAgICAgdG91Y2hNb3ZlRnVuYyAmJiBub2RlLm9uKCd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgIHZhciB0SUQgPSBldmVudC50b3VjaC5faWQgKyAxO1xuICAgICAgICAgaWYgKHRJRCAhPSBub2RlLl9jdXN0b21Ub3VjaElkKSByZXR1cm47XG4gICAgICAgICBpZiAodG91Y2hNb3ZlRnVuYykgY2FsbEZ1bmNXaXRoRXZlbnQodG91Y2hNb3ZlRnVuYywgZXZlbnQsIHRJRCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIHRvdWNoRGVzdHJveSA9IChldmVudCkgPT4ge1xuICAgICAgICAgdmFyIHRJRCA9IGV2ZW50LnRvdWNoLl9pZCArIDE7XG4gICAgICAgICBpZiAodElEICE9IG5vZGUuX2N1c3RvbVRvdWNoSWQpIHJldHVybjtcbiAgICAgICAgIG5vZGUuX2N1c3RvbVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgaWYgKHRvdWNoRW5kRnVuYykgY2FsbEZ1bmNXaXRoRXZlbnQodG91Y2hFbmRGdW5jLCBldmVudCwgdElEKTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5vbigndG91Y2hlbmQnLCB0b3VjaERlc3Ryb3kpO1xuICAgICAgbm9kZS5vbigndG91Y2hjYW5jZWwnLCB0b3VjaERlc3Ryb3kpO1xuICAgfSxcblxuXG4gICBiaW5kQ2FudmFzVG91Y2hIYW5kbGVyKCkge1xuICAgICAgY29uc3QgY2FudmFzTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcycpO1xuICAgICAgdGhpcy5zaW5nbGVUb3VjaFNldChcbiAgICAgICAgIGNhbnZhc05vZGUsXG4gICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgICBjYW52YXNUb3VjaEV2ZW50SGFuZGxlcnNbJ3RvdWNoc3RhcnQnXS5tYXAoZiA9PiBmKHBvcykpO1xuICAgICAgICAgfSxcbiAgICAgICAgIChwb3MpID0+IHtcbiAgICAgICAgICAgIGNhbnZhc1RvdWNoRXZlbnRIYW5kbGVyc1sndG91Y2htb3ZlJ10ubWFwKGYgPT4gZihwb3MpKTtcbiAgICAgICAgIH0sXG4gICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgICBjYW52YXNUb3VjaEV2ZW50SGFuZGxlcnNbJ3RvdWNoZW5kJ10ubWFwKGYgPT4gZihwb3MpKTtcbiAgICAgICAgIH0sXG4gICAgICApXG4gICB9LFxuXG4gICBhZGRDYW52YXNUb3VjaEhhbmRsZXIoZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBjb25zdCBoYW5kbGVyQXJyID0gY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgICBpZiAoIWhhbmRsZXJBcnIpIHJldHVybjtcbiAgICAgIGhhbmRsZXJBcnIucHVzaChmdW5jKTtcbiAgIH0sXG5cblxufTsiXX0=