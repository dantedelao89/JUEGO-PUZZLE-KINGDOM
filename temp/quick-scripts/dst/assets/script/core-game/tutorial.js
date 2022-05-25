
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/tutorial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9fa024zMbVB+Lq+UeHKKCS8', 'tutorial');
// script/core-game/tutorial.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorial = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.tutorial = {
    frameAvatarInfo: { x: 100, y: 270, width: 585, height: 370, angle: 0 },
    node: null,
    cellNode1: null,
    cellNode2: null,
    isShowingTut: false,
    hiddenNodeArr1: null,
    hiddenNodeArr2: null,
    currentStep: 0,
    init: function () {
        var _this = this;
        this.node = cc.find('Canvas/layout_tutorial');
        this.hiddenNodeArr1 = [
            // cc.find('btn_back', _G.coreUI.headerContainer),
            cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer),
        ];
        this.hiddenNodeArr2 = [
            cc.find('time_level_bar', _G.coreUI.playGridContainer),
        ];
        _G.user.addInitCallback(function (data) {
            // _.log(`tutorial.init() ==>>> data.isNewUser = ${data.isNewUser} //  _G.user.entryPointData.puzzle_id = ${_G.user.entryPointData.puzzle_id} `);
            if (!data.isNewUser || _G.user.isPuzzleSpecified)
                return _G.coreUI.hideLayout('layout_tutorial');
            if (!window['FBInstant'])
                _this.start();
            else
                _.waitToRun(function () { return _this.start(); }, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 4, function () { return _this.start(); });
        });
    },
    isCurrentPuzzleTutorial: function () {
        return _G.gameMechanic.currentCategoryName == 'tutorial';
    },
    isClickableCell: function (cellNode) {
        if (!this.isShowingTut)
            return true;
        return cellNode == this.cellNode1 || cellNode == this.cellNode2;
    },
    checkOnSwapCells: function () {
        var _this = this;
        if (this.isShowingTut && this.currentStep == 1)
            _.setTimeout(function () { return _this.showStep2(); }, 1000);
    },
    //============= on tut start
    start: function () {
        var _this = this;
        this.isShowingTut = true;
        this.currentStep = 1;
        // render special puzzle
        _G.gameMechanic.previewGame('tutorial', 'tutorial', 3, 3);
        _G.gameMechanic.startGame();
        // set up UI
        __spreadArrays(this.hiddenNodeArr1, this.hiddenNodeArr2).map(function (node) { return node.active = false; });
        cc.find('texts/label_tut_step_1', this.node).active = true;
        // fake the level time bar
        var fakeTimeBarContainer = cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer);
        var fakeTimeBar = _.copyNode(cc.find('time_level_bar', _G.coreUI.playGridContainer), fakeTimeBarContainer);
        fakeTimeBar.children.map(function (childNode) { return childNode.y = 100; });
        fakeTimeBar.y = -120;
        fakeTimeBar.active = true;
        // -------------------------------------------------
        var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
        var fakeColliderNode = _.copyNode(colliderNode, colliderNode.parent);
        colliderNode.scale = fakeColliderNode.scale = containerNode.scale = 0.0001;
        // containerNode.opacity = 0;
        _.setGlobalPosToNode(fakeColliderNode, containerNode);
        // _.log(`fakeColliderNode.height = ${fakeColliderNode.height}`);
        fakeColliderNode.height *= 2;
        _.setTimeout(function () { return fakeColliderNode.removeFromParent(true); }, 100);
        // start hand animation
        cc.find('black_layer', this.node).active = true;
        _G.coreUI.showLayout(this.node);
        var handNode = cc.find('tut_hand', this.node);
        _.waitToRun(function () {
            _.setGlobalPosToNode(handNode, _this.cellNode1);
            var gPosDiff = _.getGlobalPosDiff(_this.cellNode1, _this.cellNode2);
            cc.tween(handNode).repeatForever(cc.tween()
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff })
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff.mul(-1) })).start();
        }, 'cellNode1', this);
    },
    showStep2: function () {
        var _this = this;
        this.currentStep = 2;
        // remove block inpout for fake btnHint
        cc.find('block_inputs/block_input_2', this.node).active = false;
        cc.find('texts/label_tut_step_1', this.node).active = false;
        var labelNode2 = cc.find('texts/label_tut_step_2', this.node);
        labelNode2.active = true;
        var fakeBtnHint = cc.find('fake_buttons/btn_hint', this.node);
        var handNode = cc.find('tut_hand', this.node);
        handNode.stopAllActions();
        handNode.scale = 1;
        handNode.angle = -140;
        _.setGlobalPosToNode(handNode, fakeBtnHint);
        handNode.x -= 30;
        handNode.y += 30;
        cc.tween(handNode).repeatForever(cc.tween()
            .by(0.4, { scale: -0.3 })
            .by(0.4, { scale: 0.3 })
            .delay(1)).start();
        fakeBtnHint.active = true;
        _G.utilsUI.makeBubbleButton(fakeBtnHint, function () {
            cc.find('disabled', fakeBtnHint).active = true;
            _G.gameMechanic.onHint();
            handNode.active = false;
            _.setTimeout(function () {
                fakeBtnHint.active = false;
                _this.showStep3();
            }, 1000);
        });
    },
    //============= on tut done
    showStep3: function () {
        var _this = this;
        var delayTime = 1.3;
        _G.coreUI.showNagScreen(delayTime);
        cc.find('tut_hand', this.node).active = false;
        // show black screen with message
        _.setTimeout(function () {
            _this.hiddenNodeArr1.map(function (node) { return node.active = true; });
            var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
            colliderNode.scale = containerNode.scale = 1;
            containerNode.opacity = 255;
            _.setTimeout(function () {
                cc.find('black_layer', _this.node).active = false;
                cc.find('texts', _this.node).active = false;
            }, 300);
            cc.find('fake_buttons/play_time', _this.node).active = true;
            cc.find('bg', _this.node).active = true;
            cc.find('dialog', _this.node).active = true;
            _G.coreUI.showLayoutAnim(_this.node, 210);
        }, delayTime * 600);
    },
    onBtnContinue: function () {
        cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer).removeAllChildren();
        _G.coreUI.hideLayoutAnim('layout_tutorial');
        cc.find('time_level_bar', _G.coreUI.playGridContainer).active = true;
        this.isShowingTut = false;
        _G.gameMechanic.onResume();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL3R1dG9yaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDcEMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRVAsUUFBQSxRQUFRLEdBQUc7SUFDckIsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0lBRXRFLElBQUksRUFBRSxJQUFlO0lBQ3JCLFNBQVMsRUFBRSxJQUFlO0lBQzFCLFNBQVMsRUFBRSxJQUFlO0lBRTFCLFlBQVksRUFBRSxLQUFLO0lBQ25CLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFdBQVcsRUFBRSxDQUFDO0lBRWQsSUFBSTtRQUFKLGlCQW9CQztRQW5CRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ25CLGtEQUFrRDtZQUNsRCxFQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7U0FDckUsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBRXhELENBQUM7UUFFRixFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFBLElBQUk7WUFDekIsaUpBQWlKO1lBRWpKLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJB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QUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxhQUFhO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6RixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBR0gsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7IF8sICQgfSA9IF9HO1xuXG5leHBvcnQgY29uc3QgdHV0b3JpYWwgPSB7XG4gICBmcmFtZUF2YXRhckluZm86IHsgeDogMTAwLCB5OiAyNzAsIHdpZHRoOiA1ODUsIGhlaWdodDogMzcwLCBhbmdsZTogMCB9LFxuXG4gICBub2RlOiBudWxsIGFzIGNjLk5vZGUsXG4gICBjZWxsTm9kZTE6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGNlbGxOb2RlMjogbnVsbCBhcyBjYy5Ob2RlLFxuXG4gICBpc1Nob3dpbmdUdXQ6IGZhbHNlLFxuICAgaGlkZGVuTm9kZUFycjE6IG51bGwsXG4gICBoaWRkZW5Ob2RlQXJyMjogbnVsbCxcbiAgIGN1cnJlbnRTdGVwOiAwLFxuXG4gICBpbml0KCkge1xuICAgICAgdGhpcy5ub2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF90dXRvcmlhbCcpO1xuXG4gICAgICB0aGlzLmhpZGRlbk5vZGVBcnIxID0gW1xuICAgICAgICAgLy8gY2MuZmluZCgnYnRuX2JhY2snLCBfRy5jb3JlVUkuaGVhZGVyQ29udGFpbmVyKSxcbiAgICAgICAgIGNjLmZpbmQoJ2xhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZScsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lciksXG4gICAgICBdO1xuICAgICAgdGhpcy5oaWRkZW5Ob2RlQXJyMiA9IFtcbiAgICAgICAgIGNjLmZpbmQoJ3RpbWVfbGV2ZWxfYmFyJywgX0cuY29yZVVJLnBsYXlHcmlkQ29udGFpbmVyKSxcbiAgICAgICAgIC8vIGNjLmZpbmQoJ3BsYXlpbmdfYnV0dG9uX2JhcicsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lciksXG4gICAgICBdO1xuXG4gICAgICBfRy51c2VyLmFkZEluaXRDYWxsYmFjayhkYXRhID0+IHtcbiAgICAgICAgIC8vIF8ubG9nKGB0dXRvcmlhbC5pbml0KCkgPT0+Pj4gZGF0YS5pc05ld1VzZXIgPSAke2RhdGEuaXNOZXdVc2VyfSAvLyAgX0cudXNlci5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQgPSAke19HLnVzZXIuZW50cnlQb2ludERhdGEucHV6emxlX2lkfSBgKTtcblxuICAgICAgICAgaWYgKCFkYXRhLmlzTmV3VXNlciB8fCBfRy51c2VyLmlzUHV6emxlU3BlY2lmaWVkKSByZXR1cm4gX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF90dXRvcmlhbCcpO1xuXG4gICAgICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgIGVsc2UgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5zdGFydCgpLCAnaXNSZWFsQXZhdGFyTG9hZGVkJywgX0cubWFwVmlzdWFsLCAwLjEsIDQsICgpID0+IHRoaXMuc3RhcnQoKSk7XG4gICAgICB9KTtcbiAgIH0sXG5cbiAgIGlzQ3VycmVudFB1enpsZVR1dG9yaWFsKCkge1xuICAgICAgcmV0dXJuIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lID09ICd0dXRvcmlhbCc7XG4gICB9LFxuXG4gICBpc0NsaWNrYWJsZUNlbGwoY2VsbE5vZGUpIHtcbiAgICAgIGlmICghdGhpcy5pc1Nob3dpbmdUdXQpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGNlbGxOb2RlID09IHRoaXMuY2VsbE5vZGUxIHx8IGNlbGxOb2RlID09IHRoaXMuY2VsbE5vZGUyO1xuICAgfSxcblxuICAgY2hlY2tPblN3YXBDZWxscygpIHtcbiAgICAgIGlmICh0aGlzLmlzU2hvd2luZ1R1dCAmJiB0aGlzLmN1cnJlbnRTdGVwID09IDEpIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dTdGVwMigpLCAxMDAwKTtcbiAgIH0sXG5cblxuICAgLy89PT09PT09PT09PT09IG9uIHR1dCBzdGFydFxuICAgc3RhcnQoKSB7XG4gICAgICB0aGlzLmlzU2hvd2luZ1R1dCA9IHRydWU7XG4gICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcblxuICAgICAgLy8gcmVuZGVyIHNwZWNpYWwgcHV6emxlXG4gICAgICBfRy5nYW1lTWVjaGFuaWMucHJldmlld0dhbWUoJ3R1dG9yaWFsJywgJ3R1dG9yaWFsJywgMywgMyk7XG4gICAgICBfRy5nYW1lTWVjaGFuaWMuc3RhcnRHYW1lKCk7XG5cbiAgICAgIC8vIHNldCB1cCBVSVxuICAgICAgWy4uLnRoaXMuaGlkZGVuTm9kZUFycjEsIC4uLnRoaXMuaGlkZGVuTm9kZUFycjJdLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgY2MuZmluZCgndGV4dHMvbGFiZWxfdHV0X3N0ZXBfMScsIHRoaXMubm9kZSkuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgLy8gZmFrZSB0aGUgbGV2ZWwgdGltZSBiYXJcbiAgICAgIGNvbnN0IGZha2VUaW1lQmFyQ29udGFpbmVyID0gY2MuZmluZCgnZ3JpZF9zdGFjay90dXRfZmFrZV90aW1lX2JhcicsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBmYWtlVGltZUJhciA9IF8uY29weU5vZGUoY2MuZmluZCgndGltZV9sZXZlbF9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLCBmYWtlVGltZUJhckNvbnRhaW5lcik7XG4gICAgICBmYWtlVGltZUJhci5jaGlsZHJlbi5tYXAoY2hpbGROb2RlID0+IGNoaWxkTm9kZS55ID0gMTAwKTtcbiAgICAgIGZha2VUaW1lQmFyLnkgPSAtMTIwO1xuICAgICAgZmFrZVRpbWVCYXIuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBjb25zdCB7IGNvbGxpZGVyTm9kZSwgY29udGFpbmVyTm9kZSB9ID0gX0cuY2F0ZWdvcnlMaXN0O1xuICAgICAgY29uc3QgZmFrZUNvbGxpZGVyTm9kZSA9IF8uY29weU5vZGUoY29sbGlkZXJOb2RlLCBjb2xsaWRlck5vZGUucGFyZW50KTtcbiAgICAgIGNvbGxpZGVyTm9kZS5zY2FsZSA9IGZha2VDb2xsaWRlck5vZGUuc2NhbGUgPSBjb250YWluZXJOb2RlLnNjYWxlID0gMC4wMDAxO1xuICAgICAgLy8gY29udGFpbmVyTm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGZha2VDb2xsaWRlck5vZGUsIGNvbnRhaW5lck5vZGUpO1xuICAgICAgLy8gXy5sb2coYGZha2VDb2xsaWRlck5vZGUuaGVpZ2h0ID0gJHtmYWtlQ29sbGlkZXJOb2RlLmhlaWdodH1gKTtcbiAgICAgIGZha2VDb2xsaWRlck5vZGUuaGVpZ2h0ICo9IDI7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gZmFrZUNvbGxpZGVyTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpLCAxMDApO1xuXG4gICAgICAvLyBzdGFydCBoYW5kIGFuaW1hdGlvblxuICAgICAgY2MuZmluZCgnYmxhY2tfbGF5ZXInLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICBfRy5jb3JlVUkuc2hvd0xheW91dCh0aGlzLm5vZGUpO1xuICAgICAgY29uc3QgaGFuZE5vZGUgPSBjYy5maW5kKCd0dXRfaGFuZCcsIHRoaXMubm9kZSk7XG5cbiAgICAgIF8ud2FpdFRvUnVuKCgpID0+IHtcbiAgICAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGhhbmROb2RlLCB0aGlzLmNlbGxOb2RlMSk7XG4gICAgICAgICBjb25zdCBnUG9zRGlmZiA9IF8uZ2V0R2xvYmFsUG9zRGlmZih0aGlzLmNlbGxOb2RlMSwgdGhpcy5jZWxsTm9kZTIpO1xuXG4gICAgICAgICBjYy50d2VlbihoYW5kTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgIC5ieSgwLjQsIHsgc2NhbGU6IC0wLjMgfSlcbiAgICAgICAgICAgICAgIC5ieSgwLjQsIHsgc2NhbGU6IDAuMyB9KVxuICAgICAgICAgICAgICAgLmJ5KDEsIHsgcG9zaXRpb246IGdQb3NEaWZmIH0pXG4gICAgICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAtMC4zIH0pXG4gICAgICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAwLjMgfSlcbiAgICAgICAgICAgICAgIC5ieSgxLCB7IHBvc2l0aW9uOiBnUG9zRGlmZi5tdWwoLTEpIH0pXG4gICAgICAgICApLnN0YXJ0KCk7XG5cbiAgICAgIH0sICdjZWxsTm9kZTEnLCB0aGlzKTtcbiAgIH0sXG5cblxuICAgc2hvd1N0ZXAyKCkge1xuICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDI7XG5cbiAgICAgIC8vIHJlbW92ZSBibG9jayBpbnBvdXQgZm9yIGZha2UgYnRuSGludFxuICAgICAgY2MuZmluZCgnYmxvY2tfaW5wdXRzL2Jsb2NrX2lucHV0XzInLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICBjYy5maW5kKCd0ZXh0cy9sYWJlbF90dXRfc3RlcF8xJywgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgY29uc3QgbGFiZWxOb2RlMiA9IGNjLmZpbmQoJ3RleHRzL2xhYmVsX3R1dF9zdGVwXzInLCB0aGlzLm5vZGUpO1xuICAgICAgbGFiZWxOb2RlMi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBmYWtlQnRuSGludCA9IGNjLmZpbmQoJ2Zha2VfYnV0dG9ucy9idG5faGludCcsIHRoaXMubm9kZSk7XG5cbiAgICAgIGNvbnN0IGhhbmROb2RlID0gY2MuZmluZCgndHV0X2hhbmQnLCB0aGlzLm5vZGUpO1xuICAgICAgaGFuZE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIGhhbmROb2RlLnNjYWxlID0gMTtcbiAgICAgIGhhbmROb2RlLmFuZ2xlID0gLTE0MDtcbiAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGhhbmROb2RlLCBmYWtlQnRuSGludCk7XG4gICAgICBoYW5kTm9kZS54IC09IDMwO1xuICAgICAgaGFuZE5vZGUueSArPSAzMDtcblxuICAgICAgY2MudHdlZW4oaGFuZE5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAtMC4zIH0pXG4gICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAwLjMgfSlcbiAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgKS5zdGFydCgpO1xuXG4gICAgICBmYWtlQnRuSGludC5hY3RpdmUgPSB0cnVlO1xuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKGZha2VCdG5IaW50LCAoKSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdkaXNhYmxlZCcsIGZha2VCdG5IaW50KS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgX0cuZ2FtZU1lY2hhbmljLm9uSGludCgpO1xuICAgICAgICAgaGFuZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmFrZUJ0bkhpbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dTdGVwMygpO1xuICAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcblxuICAgfSxcblxuXG4gICAvLz09PT09PT09PT09PT0gb24gdHV0IGRvbmVcbiAgIHNob3dTdGVwMygpIHtcbiAgICAgIGNvbnN0IGRlbGF5VGltZSA9IDEuMztcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKGRlbGF5VGltZSk7XG5cbiAgICAgIGNjLmZpbmQoJ3R1dF9oYW5kJywgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgLy8gc2hvdyBibGFjayBzY3JlZW4gd2l0aCBtZXNzYWdlXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5oaWRkZW5Ob2RlQXJyMS5tYXAobm9kZSA9PiBub2RlLmFjdGl2ZSA9IHRydWUpO1xuXG4gICAgICAgICBjb25zdCB7IGNvbGxpZGVyTm9kZSwgY29udGFpbmVyTm9kZSB9ID0gX0cuY2F0ZWdvcnlMaXN0O1xuICAgICAgICAgY29sbGlkZXJOb2RlLnNjYWxlID0gY29udGFpbmVyTm9kZS5zY2FsZSA9IDE7XG4gICAgICAgICBjb250YWluZXJOb2RlLm9wYWNpdHkgPSAyNTU7XG5cbiAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYy5maW5kKCdibGFja19sYXllcicsIHRoaXMubm9kZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBjYy5maW5kKCd0ZXh0cycsIHRoaXMubm9kZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgICBjYy5maW5kKCdmYWtlX2J1dHRvbnMvcGxheV90aW1lJywgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgY2MuZmluZCgnYmcnLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBjYy5maW5kKCdkaWFsb2cnLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0odGhpcy5ub2RlLCAyMTApO1xuICAgICAgfSwgZGVsYXlUaW1lICogNjAwKTtcbiAgIH0sXG5cblxuICAgb25CdG5Db250aW51ZSgpIHtcbiAgICAgIGNjLmZpbmQoJ2dyaWRfc3RhY2svdHV0X2Zha2VfdGltZV9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF90dXRvcmlhbCcpO1xuICAgICAgY2MuZmluZCgndGltZV9sZXZlbF9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmlzU2hvd2luZ1R1dCA9IGZhbHNlO1xuICAgICAgX0cuZ2FtZU1lY2hhbmljLm9uUmVzdW1lKCk7XG4gICB9LFxuXG5cbn0iXX0=