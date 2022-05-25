"use strict";
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