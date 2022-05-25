
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/category_list.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84b7f9dgqBJA4RCnf2HBH9U', 'category_list');
// script/core-game/category_list.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryList = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var FRAME_SIZE = 263;
var ORG_FRAME_SIZE = 800;
var FRAME_SCALE = FRAME_SIZE / ORG_FRAME_SIZE;
var FRAME_SIZE_V2 = 284;
var FRAME_SCALE_V2 = FRAME_SIZE_V2 / ORG_FRAME_SIZE;
exports.categoryList = {
    containerNode: null,
    containerNodeV2: null,
    colliderNode: null,
    frameNodeArr: [],
    init: function () {
        var _this = this;
        this.containerNode = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists');
        this.containerNodeV2 = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists_v2');
        this.colliderNode = cc.find('Canvas/play_area/visible_frame_collider');
        this.containerNode.active = !_G.user.isVersionV2;
        this.containerNodeV2.active = _G.user.isVersionV2;
        if (!_G.user.isVersionV2)
            this.renderList();
        else
            this.renderListV2();
        _G.resources.addFrameLoadCallback(function (catName, frameName) { return _this.onFrameLoaded(catName, frameName); });
        this.setupVisibleFrameCollider();
    },
    onFrameLoaded: function (catName, frameName) {
        // _.log(` onFrameLoaded >> catName=${catName}, frameName=${frameName} `);
        var frameCellNode;
        if (_G.user.isVersionV2) {
            frameCellNode = this.containerNodeV2.children.find(function (node) { return node.categoryName == catName && node.name == frameName; });
        }
        else {
            var catContainerNode = cc.find(catName, this.containerNode);
            var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
            frameCellNode = cc.find(frameName, scrollViewContent);
        }
        if (!frameCellNode)
            return _.log(" onFrameLoaded (" + catName + ", " + frameName + ") >>  frameCellNode = " + frameCellNode + " ");
        frameCellNode.isTextureLoaded = true;
        var frameNode = cc.find('frame', frameCellNode);
        _G.utilsUI.setNodeSprite(frameNode, _G.resources.frameSprites[catName][frameName]);
        // fx fade in to smoothly show
        var frameCover = cc.find('frame_cover', frameCellNode);
        cc.tween(frameCover).to(0.3, { opacity: 0 }).start();
    },
    setupVisibleFrameCollider: function () {
        var _this = this;
        _.setTimeout(function () {
            _this.colliderNode.active = true;
            _this.colliderNode.height = _this.colliderNode.getComponent(cc.BoxCollider).size.height = cc.winSize.height;
            // this.colliderNode.getComponent(cc.BoxCollider).size.width = 300;
            // this.colliderNode.getComponent(cc.BoxCollider).size.height = 300;
        }, 100);
    },
    renderList: function () {
        var _this = this;
        var scrollViewMaster = cc.find('Canvas/play_area/scrollview_master');
        var scrollViewMasterComp = scrollViewMaster.getComponent('NestableScrollView_Outer');
        var sampleNode = cc.find('Canvas/sample_nodes/sample_category_row');
        var sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell');
        sampleFrameNode.opacity = 0;
        _G.levelManager.categoryNameArr.map(function (catName) {
            var newRowNode = _.copyNode(sampleNode, _this.containerNode);
            newRowNode.name = catName;
            newRowNode.opacity = 0; // reduce drawcall. Will appear when touching visible collider
            scrollViewMasterComp.m_InnerScrollViews.push(cc.find('scrollview', newRowNode).getComponent('NestableScrollView_Inner'));
            // _G.utilsUI.fillChildLabelByPath(newRowNode, 'header_bg/label_category_list_header_name', catName);
            var labelCatName = cc.find('header_bg/label_category_list_header_name', newRowNode);
            labelCatName.localizeData = catName;
            var categoryInfo = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == catName; });
            if (!categoryInfo)
                return;
            var scrollViewContent = cc.find('scrollview/view/content', newRowNode);
            categoryInfo.frameArr.map(function (frameInfo) {
                var newFrameCellNode = _.copyNode(sampleFrameNode, scrollViewContent);
                _this.frameNodeArr.push(newFrameCellNode);
                newFrameCellNode.name = frameInfo.name;
                newFrameCellNode.categoryName = catName;
                var frameNode = cc.find('frame', newFrameCellNode);
                var frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
                if (frameTexture)
                    _G.utilsUI.setNodeSprite(frameNode, frameTexture);
                newFrameCellNode.buttonCompZoomScale = 0.9;
                _G.utilsUI.makeBubbleButton(newFrameCellNode, function () { return _G.gameMechanic.previewGame(catName, frameInfo.name, 3, 3, true); });
            });
        });
        scrollViewMasterComp.reloadInnerScrollViews();
        this.setupAllFrameAvatars();
        _.waitToRun(function () { return _this.updateAllIconCheckeds(); }, 'playedGames', _G.user);
    },
    renderListV2: function () {
        var _this = this;
        var sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell_v2');
        sampleFrameNode.opacity = 0;
        _G.levelManager.categoryNameArr.map(function (catName) {
            var categoryInfo = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == catName; });
            if (!categoryInfo)
                return;
            categoryInfo.frameArr.map(function (frameInfo) {
                // zIndexArr.push(i++);
                var newFrameCellNode = _.copyNode(sampleFrameNode, _this.containerNodeV2);
                _this.frameNodeArr.push(newFrameCellNode);
                newFrameCellNode.name = frameInfo.name;
                newFrameCellNode.categoryName = catName;
                var frameNode = cc.find('frame', newFrameCellNode);
                var frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
                if (frameTexture)
                    _G.utilsUI.setNodeSprite(frameNode, frameTexture);
                newFrameCellNode.buttonCompZoomScale = 0.9;
                _G.utilsUI.makeBubbleButton(newFrameCellNode, function () {
                    _G.gameMechanic.previewGame(catName, frameInfo.name, 1, 1, true);
                    _this.sortCategoryV2Randomly();
                    _G.interAd.checkToShowInterAd();
                });
            });
        });
        _.waitToRun(function () { return _this.sortCategoryV2Randomly(); }, 'playedGames', _G.user);
        this.setupAllFrameAvatars();
        _.waitToRun(function () { return _this.updateAllIconCheckeds(); }, 'playedGames', _G.user);
    },
    // random order but newFrame on top, played-frames at bottom
    sortCategoryV2Randomly: function () {
        var frameNodeToScore = function (node) { return _G.user.playedGames[node.categoryName + "_" + node.name] ? 2 : 1; };
        this.frameNodeArr.sort(function (nodeA, nodeB) { return (frameNodeToScore(nodeA) - frameNodeToScore(nodeB)) || (_.random() > 0.5 ? 1 : -1); });
        this.frameNodeArr.map(function (node, i) { return node.zIndex = i; });
    },
    setupAllFrameAvatars: function () {
        var setupFrameCellNode = function (frameCellNode) {
            var frameNode = cc.find('frame', frameCellNode);
            var avatarNode = cc.find('mask/avatar', frameCellNode);
            _G.utilsUI.setNodeSprite(avatarNode, _G.mapVisual.avatarSpriteFrame);
            var frameScale = _G.user.isVersionV2 ? FRAME_SCALE_V2 : FRAME_SCALE;
            var frameSize = _G.user.isVersionV2 ? FRAME_SIZE_V2 : FRAME_SIZE;
            _G.mapVisual.setAvatar(frameCellNode.categoryName, frameCellNode.name, frameNode, avatarNode, frameScale, frameSize);
        };
        if (_G.user.isVersionV2)
            this.containerNodeV2.children.map(function (frameCellNode) { return setupFrameCellNode(frameCellNode); });
        else {
            this.containerNode.children.map(function (catContainerNode) {
                var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
                scrollViewContent.children.map(function (frameCellNode) { return setupFrameCellNode(frameCellNode); });
            });
        }
    },
    updateAllIconCheckeds: function () {
        var setupIconChecked = function (frameCellNode) {
            cc.find('icon_checked', frameCellNode).active = _G.user.playedGames[frameCellNode.categoryName + '_' + frameCellNode.name];
        };
        if (_G.user.isVersionV2)
            this.containerNodeV2.children.map(function (frameCellNode) { return setupIconChecked(frameCellNode); });
        else
            this.containerNode.children.map(function (catContainerNode) {
                var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
                scrollViewContent.children.map(function (frameCellNode) { return setupIconChecked(frameCellNode); });
            });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2NhdGVnb3J5X2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFDdkIsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLElBQU0sV0FBVyxHQUFHLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFFaEQsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLElBQU0sY0FBYyxHQUFHLGFBQWEsR0FBRyxjQUFjLENBQUM7QUFFekMsUUFBQSxZQUFZLEdBQUc7SUFDekIsYUFBYSxFQUFFLElBQWU7SUFDOUIsZUFBZSxFQUFFLElBQWU7SUFDaEMsWUFBWSxFQUFFLElBQWU7SUFFN0IsWUFBWSxFQUFFLEVBQUU7SUFFaEIsSUFBSTtRQUFKLGlCQWFDO1FBWkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztZQUN2QyxJQUFJLENBQUMsWUFB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RyxDQUFDLFVBQUMsYUFBYSxJQUFLLE9BQUEsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztTQUNMO0lBQ0osQ0FBQztJQUdELHFCQUFxQjtRQUNsQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsYUFBYTtZQUNwQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlILENBQUMsQ0FBQTtRQUVELElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7O1lBQ2xGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLGdCQUFnQjtnQkFDbEQsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9FLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1lBQ3BGLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUlILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgRlJBTUVfU0laRSA9IDI2MztcbmNvbnN0IE9SR19GUkFNRV9TSVpFID0gODAwO1xuY29uc3QgRlJBTUVfU0NBTEUgPSBGUkFNRV9TSVpFIC8gT1JHX0ZSQU1FX1NJWkU7XG5cbmNvbnN0IEZSQU1FX1NJWkVfVjIgPSAyODQ7XG5jb25zdCBGUkFNRV9TQ0FMRV9WMiA9IEZSQU1FX1NJWkVfVjIgLyBPUkdfRlJBTUVfU0laRTtcblxuZXhwb3J0IGNvbnN0IGNhdGVnb3J5TGlzdCA9IHtcbiAgIGNvbnRhaW5lck5vZGU6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGNvbnRhaW5lck5vZGVWMjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgY29sbGlkZXJOb2RlOiBudWxsIGFzIGNjLk5vZGUsXG5cbiAgIGZyYW1lTm9kZUFycjogW10sXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9jYXRlZ29yeV9saXN0cycpO1xuICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9jYXRlZ29yeV9saXN0c192MicpO1xuICAgICAgdGhpcy5jb2xsaWRlck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Zpc2libGVfZnJhbWVfY29sbGlkZXInKTtcblxuICAgICAgdGhpcy5jb250YWluZXJOb2RlLmFjdGl2ZSA9ICFfRy51c2VyLmlzVmVyc2lvblYyO1xuICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIuYWN0aXZlID0gX0cudXNlci5pc1ZlcnNpb25WMjtcblxuICAgICAgaWYgKCFfRy51c2VyLmlzVmVyc2lvblYyKSB0aGlzLnJlbmRlckxpc3QoKTtcbiAgICAgIGVsc2UgdGhpcy5yZW5kZXJMaXN0VjIoKTtcbiAgICAgIF9HLnJlc291cmNlcy5hZGRGcmFtZUxvYWRDYWxsYmFjaygoY2F0TmFtZSwgZnJhbWVOYW1lKSA9PiB0aGlzLm9uRnJhbWVMb2FkZWQoY2F0TmFtZSwgZnJhbWVOYW1lKSk7XG5cbiAgICAgIHRoaXMuc2V0dXBWaXNpYmxlRnJhbWVDb2xsaWRlcigpO1xuICAgfSxcblxuXG4gICBvbkZyYW1lTG9hZGVkKGNhdE5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgLy8gXy5sb2coYCBvbkZyYW1lTG9hZGVkID4+IGNhdE5hbWU9JHtjYXROYW1lfSwgZnJhbWVOYW1lPSR7ZnJhbWVOYW1lfSBgKTtcbiAgICAgIGxldCBmcmFtZUNlbGxOb2RlO1xuXG4gICAgICBpZiAoX0cudXNlci5pc1ZlcnNpb25WMikge1xuICAgICAgICAgZnJhbWVDZWxsTm9kZSA9IHRoaXMuY29udGFpbmVyTm9kZVYyLmNoaWxkcmVuLmZpbmQobm9kZSA9PiBub2RlLmNhdGVnb3J5TmFtZSA9PSBjYXROYW1lICYmIG5vZGUubmFtZSA9PSBmcmFtZU5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGNvbnN0IGNhdENvbnRhaW5lck5vZGUgPSBjYy5maW5kKGNhdE5hbWUsIHRoaXMuY29udGFpbmVyTm9kZSlcbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBjYXRDb250YWluZXJOb2RlKTtcbiAgICAgICAgIGZyYW1lQ2VsbE5vZGUgPSBjYy5maW5kKGZyYW1lTmFtZSwgc2Nyb2xsVmlld0NvbnRlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKCFmcmFtZUNlbGxOb2RlKSByZXR1cm4gXy5sb2coYCBvbkZyYW1lTG9hZGVkICgke2NhdE5hbWV9LCAke2ZyYW1lTmFtZX0pID4+ICBmcmFtZUNlbGxOb2RlID0gJHtmcmFtZUNlbGxOb2RlfSBgKTtcblxuICAgICAgZnJhbWVDZWxsTm9kZS5pc1RleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBmcmFtZUNlbGxOb2RlKTtcbiAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShmcmFtZU5vZGUsIF9HLnJlc291cmNlcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bZnJhbWVOYW1lXSk7XG5cbiAgICAgIC8vIGZ4IGZhZGUgaW4gdG8gc21vb3RobHkgc2hvd1xuICAgICAgY29uc3QgZnJhbWVDb3ZlciA9IGNjLmZpbmQoJ2ZyYW1lX2NvdmVyJywgZnJhbWVDZWxsTm9kZSk7XG4gICAgICBjYy50d2VlbihmcmFtZUNvdmVyKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xuICAgfSxcblxuICAgc2V0dXBWaXNpYmxlRnJhbWVDb2xsaWRlcigpIHtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLmNvbGxpZGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgdGhpcy5jb2xsaWRlck5vZGUuaGVpZ2h0ID0gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xuICAgICAgICAgLy8gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLndpZHRoID0gMzAwO1xuICAgICAgICAgLy8gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLmhlaWdodCA9IDMwMDtcbiAgICAgIH0sIDEwMCk7XG4gICB9LFxuXG5cbiAgIHJlbmRlckxpc3QoKSB7XG4gICAgICBjb25zdCBzY3JvbGxWaWV3TWFzdGVyID0gY2MuZmluZCgnQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3RlcicpO1xuICAgICAgY29uc3Qgc2Nyb2xsVmlld01hc3RlckNvbXAgPSBzY3JvbGxWaWV3TWFzdGVyLmdldENvbXBvbmVudCgnTmVzdGFibGVTY3JvbGxWaWV3X091dGVyJyk7XG5cbiAgICAgIGNvbnN0IHNhbXBsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL3NhbXBsZV9jYXRlZ29yeV9yb3cnKTtcbiAgICAgIGNvbnN0IHNhbXBsZUZyYW1lTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9zYW1wbGVfbm9kZXMvc2FtcGxlX2ZyYW1lX2NlbGwnKTtcbiAgICAgIHNhbXBsZUZyYW1lTm9kZS5vcGFjaXR5ID0gMDtcblxuICAgICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB7XG4gICAgICAgICBjb25zdCBuZXdSb3dOb2RlID0gXy5jb3B5Tm9kZShzYW1wbGVOb2RlLCB0aGlzLmNvbnRhaW5lck5vZGUpO1xuICAgICAgICAgbmV3Um93Tm9kZS5uYW1lID0gY2F0TmFtZTtcbiAgICAgICAgIG5ld1Jvd05vZGUub3BhY2l0eSA9IDA7IC8vIHJlZHVjZSBkcmF3Y2FsbC4gV2lsbCBhcHBlYXIgd2hlbiB0b3VjaGluZyB2aXNpYmxlIGNvbGxpZGVyXG4gICAgICAgICBzY3JvbGxWaWV3TWFzdGVyQ29tcC5tX0lubmVyU2Nyb2xsVmlld3MucHVzaChjYy5maW5kKCdzY3JvbGx2aWV3JywgbmV3Um93Tm9kZSkuZ2V0Q29tcG9uZW50KCdOZXN0YWJsZVNjcm9sbFZpZXdfSW5uZXInKSlcbiAgICAgICAgIC8vIF9HLnV0aWxzVUkuZmlsbENoaWxkTGFiZWxCeVBhdGgobmV3Um93Tm9kZSwgJ2hlYWRlcl9iZy9sYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lJywgY2F0TmFtZSk7XG4gICAgICAgICBjb25zdCBsYWJlbENhdE5hbWUgPSBjYy5maW5kKCdoZWFkZXJfYmcvbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZScsIG5ld1Jvd05vZGUpO1xuICAgICAgICAgbGFiZWxDYXROYW1lLmxvY2FsaXplRGF0YSA9IGNhdE5hbWU7XG5cbiAgICAgICAgIGNvbnN0IGNhdGVnb3J5SW5mbyA9IF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSBjYXROYW1lKTtcbiAgICAgICAgIGlmICghY2F0ZWdvcnlJbmZvKSByZXR1cm47XG5cbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBuZXdSb3dOb2RlKTtcbiAgICAgICAgIGNhdGVnb3J5SW5mby5mcmFtZUFyci5tYXAoZnJhbWVJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZyYW1lQ2VsbE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUZyYW1lTm9kZSwgc2Nyb2xsVmlld0NvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGVBcnIucHVzaChuZXdGcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgICAgIG5ld0ZyYW1lQ2VsbE5vZGUubmFtZSA9IGZyYW1lSW5mby5uYW1lO1xuICAgICAgICAgICAgbmV3RnJhbWVDZWxsTm9kZS5jYXRlZ29yeU5hbWUgPSBjYXROYW1lO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBuZXdGcmFtZUNlbGxOb2RlKTtcblxuICAgICAgICAgICAgY29uc3QgZnJhbWVUZXh0dXJlID0gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1tjYXROYW1lXVtmcmFtZUluZm8ubmFtZV07XG4gICAgICAgICAgICBpZiAoZnJhbWVUZXh0dXJlKSBfRy51dGlsc1VJLnNldE5vZGVTcHJpdGUoZnJhbWVOb2RlLCBmcmFtZVRleHR1cmUpO1xuXG4gICAgICAgICAgICBuZXdGcmFtZUNlbGxOb2RlLmJ1dHRvbkNvbXBab29tU2NhbGUgPSAwLjk7XG4gICAgICAgICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24obmV3RnJhbWVDZWxsTm9kZSwgKCkgPT4gX0cuZ2FtZU1lY2hhbmljLnByZXZpZXdHYW1lKGNhdE5hbWUsIGZyYW1lSW5mby5uYW1lLCAzLCAzLCB0cnVlKSk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBzY3JvbGxWaWV3TWFzdGVyQ29tcC5yZWxvYWRJbm5lclNjcm9sbFZpZXdzKCk7XG4gICAgICB0aGlzLnNldHVwQWxsRnJhbWVBdmF0YXJzKCk7XG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB0aGlzLnVwZGF0ZUFsbEljb25DaGVja2VkcygpLCAncGxheWVkR2FtZXMnLCBfRy51c2VyKTtcblxuICAgfSxcblxuXG4gICByZW5kZXJMaXN0VjIoKSB7XG4gICAgICBjb25zdCBzYW1wbGVGcmFtZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL3NhbXBsZV9mcmFtZV9jZWxsX3YyJyk7XG4gICAgICBzYW1wbGVGcmFtZU5vZGUub3BhY2l0eSA9IDA7XG5cbiAgICAgIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeU5hbWVBcnIubWFwKGNhdE5hbWUgPT4ge1xuICAgICAgICAgY29uc3QgY2F0ZWdvcnlJbmZvID0gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IGNhdE5hbWUpO1xuICAgICAgICAgaWYgKCFjYXRlZ29yeUluZm8pIHJldHVybjtcblxuICAgICAgICAgY2F0ZWdvcnlJbmZvLmZyYW1lQXJyLm1hcChmcmFtZUluZm8gPT4ge1xuICAgICAgICAgICAgLy8gekluZGV4QXJyLnB1c2goaSsrKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZyYW1lQ2VsbE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUZyYW1lTm9kZSwgdGhpcy5jb250YWluZXJOb2RlVjIpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGVBcnIucHVzaChuZXdGcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgICAgIG5ld0ZyYW1lQ2VsbE5vZGUubmFtZSA9IGZyYW1lSW5mby5uYW1lO1xuICAgICAgICAgICAgbmV3RnJhbWVDZWxsTm9kZS5jYXRlZ29yeU5hbWUgPSBjYXROYW1lO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBuZXdGcmFtZUNlbGxOb2RlKTtcblxuICAgICAgICAgICAgY29uc3QgZnJhbWVUZXh0dXJlID0gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1tjYXROYW1lXVtmcmFtZUluZm8ubmFtZV07XG4gICAgICAgICAgICBpZiAoZnJhbWVUZXh0dXJlKSBfRy51dGlsc1VJLnNldE5vZGVTcHJpdGUoZnJhbWVOb2RlLCBmcmFtZVRleHR1cmUpO1xuXG4gICAgICAgICAgICBuZXdGcmFtZUNlbGxOb2RlLmJ1dHRvbkNvbXBab29tU2NhbGUgPSAwLjk7XG4gICAgICAgICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24obmV3RnJhbWVDZWxsTm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgX0cuZ2FtZU1lY2hhbmljLnByZXZpZXdHYW1lKGNhdE5hbWUsIGZyYW1lSW5mby5uYW1lLCAxLCAxLCB0cnVlKTtcbiAgICAgICAgICAgICAgIHRoaXMuc29ydENhdGVnb3J5VjJSYW5kb21seSgpO1xuICAgICAgICAgICAgICAgX0cuaW50ZXJBZC5jaGVja1RvU2hvd0ludGVyQWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5zb3J0Q2F0ZWdvcnlWMlJhbmRvbWx5KCksICdwbGF5ZWRHYW1lcycsIF9HLnVzZXIpO1xuXG4gICAgICB0aGlzLnNldHVwQWxsRnJhbWVBdmF0YXJzKCk7XG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB0aGlzLnVwZGF0ZUFsbEljb25DaGVja2VkcygpLCAncGxheWVkR2FtZXMnLCBfRy51c2VyKTtcbiAgIH0sXG5cblxuICAgLy8gcmFuZG9tIG9yZGVyIGJ1dCBuZXdGcmFtZSBvbiB0b3AsIHBsYXllZC1mcmFtZXMgYXQgYm90dG9tXG4gICBzb3J0Q2F0ZWdvcnlWMlJhbmRvbWx5KCkge1xuICAgICAgY29uc3QgZnJhbWVOb2RlVG9TY29yZSA9IG5vZGUgPT4gX0cudXNlci5wbGF5ZWRHYW1lc1tgJHtub2RlLmNhdGVnb3J5TmFtZX1fJHtub2RlLm5hbWV9YF0gPyAyIDogMTtcbiAgICAgIHRoaXMuZnJhbWVOb2RlQXJyLnNvcnQoKG5vZGVBLCBub2RlQikgPT4gKGZyYW1lTm9kZVRvU2NvcmUobm9kZUEpIC0gZnJhbWVOb2RlVG9TY29yZShub2RlQikpIHx8IChfLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSk7XG4gICAgICB0aGlzLmZyYW1lTm9kZUFyci5tYXAoKG5vZGUsIGkpID0+IG5vZGUuekluZGV4ID0gaSk7XG4gICB9LFxuXG5cbiAgIHNldHVwQWxsRnJhbWVBdmF0YXJzKCkge1xuICAgICAgY29uc3Qgc2V0dXBGcmFtZUNlbGxOb2RlID0gKGZyYW1lQ2VsbE5vZGUpID0+IHtcbiAgICAgICAgIGNvbnN0IGZyYW1lTm9kZSA9IGNjLmZpbmQoJ2ZyYW1lJywgZnJhbWVDZWxsTm9kZSk7XG4gICAgICAgICBjb25zdCBhdmF0YXJOb2RlID0gY2MuZmluZCgnbWFzay9hdmF0YXInLCBmcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShhdmF0YXJOb2RlLCBfRy5tYXBWaXN1YWwuYXZhdGFyU3ByaXRlRnJhbWUpO1xuICAgICAgICAgY29uc3QgZnJhbWVTY2FsZSA9IF9HLnVzZXIuaXNWZXJzaW9uVjIgPyBGUkFNRV9TQ0FMRV9WMiA6IEZSQU1FX1NDQUxFO1xuICAgICAgICAgY29uc3QgZnJhbWVTaXplID0gX0cudXNlci5pc1ZlcnNpb25WMiA/IEZSQU1FX1NJWkVfVjIgOiBGUkFNRV9TSVpFO1xuICAgICAgICAgX0cubWFwVmlzdWFsLnNldEF2YXRhcihmcmFtZUNlbGxOb2RlLmNhdGVnb3J5TmFtZSwgZnJhbWVDZWxsTm9kZS5uYW1lLCBmcmFtZU5vZGUsIGF2YXRhck5vZGUsIGZyYW1lU2NhbGUsIGZyYW1lU2l6ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfRy51c2VyLmlzVmVyc2lvblYyKVxuICAgICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIuY2hpbGRyZW4ubWFwKChmcmFtZUNlbGxOb2RlKSA9PiBzZXR1cEZyYW1lQ2VsbE5vZGUoZnJhbWVDZWxsTm9kZSkpXG4gICAgICBlbHNlIHtcbiAgICAgICAgIHRoaXMuY29udGFpbmVyTm9kZS5jaGlsZHJlbi5tYXAoY2F0Q29udGFpbmVyTm9kZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxWaWV3Q29udGVudCA9IGNjLmZpbmQoJ3Njcm9sbHZpZXcvdmlldy9jb250ZW50JywgY2F0Q29udGFpbmVyTm9kZSk7XG4gICAgICAgICAgICBzY3JvbGxWaWV3Q29udGVudC5jaGlsZHJlbi5tYXAoKGZyYW1lQ2VsbE5vZGUpID0+IHNldHVwRnJhbWVDZWxsTm9kZShmcmFtZUNlbGxOb2RlKSk7XG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgdXBkYXRlQWxsSWNvbkNoZWNrZWRzKCkge1xuICAgICAgY29uc3Qgc2V0dXBJY29uQ2hlY2tlZCA9IChmcmFtZUNlbGxOb2RlKSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdpY29uX2NoZWNrZWQnLCBmcmFtZUNlbGxOb2RlKS5hY3RpdmUgPSBfRy51c2VyLnBsYXllZEdhbWVzW2ZyYW1lQ2VsbE5vZGUuY2F0ZWdvcnlOYW1lICsgJ18nICsgZnJhbWVDZWxsTm9kZS5uYW1lXTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9HLnVzZXIuaXNWZXJzaW9uVjIpXG4gICAgICAgICB0aGlzLmNvbnRhaW5lck5vZGVWMi5jaGlsZHJlbi5tYXAoZnJhbWVDZWxsTm9kZSA9PiBzZXR1cEljb25DaGVja2VkKGZyYW1lQ2VsbE5vZGUpKTtcbiAgICAgIGVsc2UgdGhpcy5jb250YWluZXJOb2RlLmNoaWxkcmVuLm1hcChjYXRDb250YWluZXJOb2RlID0+IHtcbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBjYXRDb250YWluZXJOb2RlKTtcbiAgICAgICAgIHNjcm9sbFZpZXdDb250ZW50LmNoaWxkcmVuLm1hcChmcmFtZUNlbGxOb2RlID0+IHNldHVwSWNvbkNoZWNrZWQoZnJhbWVDZWxsTm9kZSkpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cblxufSJdfQ==