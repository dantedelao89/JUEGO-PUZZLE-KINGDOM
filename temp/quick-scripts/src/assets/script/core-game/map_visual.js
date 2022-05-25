"use strict";
cc._RF.push(module, '8e0baH2ZLtGQb52+gG4oZRe', 'map_visual');
// script/core-game/map_visual.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapVisual = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var FRAME_WIDTH = 620;
var FRAME_HEIGHT = 775;
var ORG_FRAME_SIZE = 800;
var FRAME_SCALE = FRAME_WIDTH / ORG_FRAME_SIZE;
exports.mapVisual = {
    mainFrameWidth: FRAME_WIDTH,
    gridNode: null,
    fullPicNode: null,
    currentMaxCellX: 3,
    currentMaxCellY: 3,
    currentCellWidth: 100,
    currentCellHeight: 100,
    avatarSpriteFrame: null,
    isRealAvatarLoaded: false,
    init: function () {
        this.gridNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid');
        this.fullPicNode = cc.find('Canvas/sample_nodes/full_picture');
        var rootAvatarNode = cc.find('avatar', this.fullPicNode);
        this.avatarSpriteFrame = rootAvatarNode.getComponent(cc.Sprite).spriteFrame;
        this.fillAvatarPicture(rootAvatarNode);
    },
    fillAvatarPicture: function (rootAvatarNode) {
        var _this = this;
        if (window['FBInstant']) {
            var avatarUrl = FBInstant.player.getPhoto();
            _G.utilsUI.setNodeSpriteFromUrl(rootAvatarNode, avatarUrl, function (texture) {
                _this.isRealAvatarLoaded = true;
                var newSFrame = new cc.SpriteFrame(texture);
                _this.avatarSpriteFrame = newSFrame;
                _G.utilsUI.setNodeSprite(cc.find('Canvas/sample_nodes/sample_frame_cell/mask/avatar'), newSFrame);
                // const fillAvatarAsSample = (realAvatarNode, sampleAvatarNode) => {
                //    _G.utilsUI.setNodeSprite(realAvatarNode, newSFrame);
                //    _.setTimeout(() => {
                //       const smallerSampleSize = _.min(sampleAvatarNode.width, sampleAvatarNode.height);
                //       realAvatarNode.scale = _.max(smallerSampleSize / realAvatarNode.width, smallerSampleSize / realAvatarNode.height);
                //    });
                // };
                // top avatar
                // const topAvatarNode = cc.find('user_bar/avatar_mask/avatar', _G.coreUI.headerContainer);
                // const sampleAvatarNode = cc.find('sample_avatar', topAvatarNode.parent);
                // fillAvatarAsSample(topAvatarNode, sampleAvatarNode);
                _G.categoryList.setupAllFrameAvatars();
            });
        }
    },
    clearMap: function (callback) {
        var _this = this;
        _G.coreFX.hideGrid(function () {
            _this.gridNode.removeAllChildren();
            if (callback)
                callback();
        });
    },
    render: function (levelInfo, callback) {
        var _a = levelInfo.maxCellX, maxCellX = _a === void 0 ? 3 : _a, _b = levelInfo.maxCellY, maxCellY = _b === void 0 ? 3 : _b, categoryName = levelInfo.categoryName, frameName = levelInfo.frameName;
        var frameNode = cc.find('frame', this.fullPicNode);
        // handle the fullPic
        if (categoryName && frameName) {
            if (categoryName != 'tutorial') {
                var sFrame = _G.resources.frameSprites[categoryName][frameName];
                _G.utilsUI.setNodeSprite(frameNode, sFrame);
            }
            this.setAvatar(categoryName, frameName, frameNode); // setup avatar
        }
        var sampleNode = cc.find('Canvas/sample_nodes/cell');
        this.currentMaxCellX = maxCellX;
        this.currentMaxCellY = maxCellY;
        this.currentCellWidth = FRAME_WIDTH / maxCellX;
        this.currentCellHeight = FRAME_HEIGHT / maxCellX;
        for (var x = 1; x <= maxCellX; x++) {
            for (var y = 1; y <= maxCellY; y++) {
                var newCellNode = _.copyNode(sampleNode, this.gridNode);
                newCellNode.name = x + '_' + y;
                newCellNode.orgCellPos = { x: x, y: y };
                // set up the frame node
                newCellNode.width = this.currentCellWidth;
                newCellNode.height = this.currentCellHeight;
                var cellPicNode = _.copyNode(this.fullPicNode, cc.find('mask', newCellNode));
                this.setCellNodePos(newCellNode, x, y, true);
                cellPicNode.position = newCellNode.position.mul(-1);
                _G.control.bindCellTap(newCellNode); // bind control
                // handle the mask size manually (widgets cause performance slowdown)
                var maskNode = cc.find('mask', newCellNode);
                maskNode.width = newCellNode.width - 4;
                maskNode.height = newCellNode.height - 4;
                // handle the hint-glow
                var glowNode = cc.find('border_highlight/hint_glow', newCellNode);
                glowNode.width = newCellNode.width * 1.33;
                glowNode.height = newCellNode.height + newCellNode.width * 0.33;
            }
        }
        if (callback)
            callback();
    },
    // adjust avatar position, size, angle from level.avatar_info
    setAvatar: function (categoryName, frameName, frameNode, avatarNode, frameScale, frameSize) {
        if (frameScale === void 0) { frameScale = FRAME_SCALE; }
        if (frameSize === void 0) { frameSize = FRAME_WIDTH; }
        avatarNode = avatarNode || cc.find('avatar', this.fullPicNode);
        var avatarInfo = _G.levelManager.getAvatarInfo(categoryName, frameName);
        if (categoryName == 'tutorial')
            avatarInfo = _G.tutorial.frameAvatarInfo;
        var aCorrectX, aCorrectY;
        if (avatarNode.width < avatarNode.height) {
            avatarNode.anchorX = 0;
            avatarNode.anchorY = 0.5 * (1 + avatarNode.width / avatarNode.height);
        }
        else {
            avatarNode.anchorY = 1;
            avatarNode.anchorX = 0.5 * (1 - avatarNode.height / avatarNode.width);
        }
        var _a = [avatarInfo.width, avatarInfo.height, avatarInfo.x, avatarInfo.y].map(function (factor) { return factor * frameScale; }), aWidth = _a[0], aHeight = _a[1], aX = _a[2], aY = _a[3];
        avatarNode.scale = _.max(aWidth / avatarNode.width, aHeight / avatarNode.height);
        aCorrectX = aX - frameSize / 2;
        aCorrectY = frameNode.height / 2 - aY;
        avatarNode.setPosition(aCorrectX, aCorrectY);
        // set the correct angle
        avatarNode.x += avatarNode.width * avatarNode.scale * (0.5 - avatarNode.anchorX);
        avatarNode.y += avatarNode.height * avatarNode.scale * (0.5 - avatarNode.anchorY);
        avatarNode.anchorX = avatarNode.anchorY = 0.5;
        avatarNode.angle = avatarInfo.angle || 0;
    },
    setCellNodePos: function (cellNode, cellX, cellY, isInit) {
        if (isInit === void 0) { isInit = false; }
        cellNode.setPosition(this.cellPosToCoordinate(cellX, cellY));
        cellNode.cellPos = { x: cellX, y: cellY };
        if (!isInit)
            _G.gameMechanic.checkCellInCorrectPos(cellNode);
    },
    swapCellAnim: function (cellNode1, cellNode2, callback) {
        var _this = this;
        _G.mapVisual.bringCellsToTop(cellNode1, cellNode2);
        var tmpCellPos = cellNode1.cellPos;
        var coord1 = this.cellPosToCoordinate(cellNode1.cellPos.x, cellNode1.cellPos.y);
        var coord2 = this.cellPosToCoordinate(cellNode2.cellPos.x, cellNode2.cellPos.y);
        var speed = 1200;
        var distance = coord1.sub(coord2).mag();
        var fxTime = distance / speed;
        var scaleTween = cc.tween().to(fxTime * 0.2, { scale: 1.1 }).delay(fxTime * 0.6).to(fxTime * 0.2, { scale: 1 });
        scaleTween.clone(cellNode1).start();
        scaleTween.clone(cellNode2).start();
        cc.tween(cellNode1).to(fxTime, { position: coord2 }).start();
        cc.tween(cellNode2).to(fxTime, { position: coord1 }).start();
        _G.audio.playSound('card-swap');
        _.setTimeout(function () {
            _this.setCellNodePos(cellNode1, cellNode2.cellPos.x, cellNode2.cellPos.y);
            _this.setCellNodePos(cellNode2, tmpCellPos.x, tmpCellPos.y);
            if (callback)
                callback();
        }, fxTime * 1000);
    },
    bringCellsToTop: function () {
        var cellNodeArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cellNodeArr[_i] = arguments[_i];
        }
        this.gridNode.children.map(function (cellNode) {
            cellNode.zIndex = cellNodeArr.includes(cellNode) ? 2 : 1;
        });
    },
    // ====================================
    // ===== SUPPORTIVE
    cellPosToCoordinate: function (cellX, cellY) {
        return cc.v2((cellX - (this.currentMaxCellX + 1) / 2) * this.currentCellWidth, (cellY - (this.currentMaxCellY + 1) / 2) * this.currentCellHeight);
    },
};

cc._RF.pop();