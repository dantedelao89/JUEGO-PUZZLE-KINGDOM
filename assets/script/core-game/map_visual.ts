import * as _G from '../system/all_modules';
const { _, $ } = _G;

const FRAME_WIDTH = 620;
const FRAME_HEIGHT = 775;
const ORG_FRAME_SIZE = 800;
const FRAME_SCALE = FRAME_WIDTH / ORG_FRAME_SIZE;

export const mapVisual = {
   mainFrameWidth: FRAME_WIDTH,
   gridNode: null as cc.Node,
   fullPicNode: null as cc.Node,

   currentMaxCellX: 3,
   currentMaxCellY: 3,
   currentCellWidth: 100,
   currentCellHeight: 100,
   avatarSpriteFrame: null as cc.SpriteFrame,
   isRealAvatarLoaded: false,

   init() {
      this.gridNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid');
      this.fullPicNode = cc.find('Canvas/sample_nodes/full_picture');
      const rootAvatarNode = cc.find('avatar', this.fullPicNode);
      this.avatarSpriteFrame = rootAvatarNode.getComponent(cc.Sprite).spriteFrame;

      this.fillAvatarPicture(rootAvatarNode);
   },

   fillAvatarPicture(rootAvatarNode) {
      if (window['FBInstant']) {
         const avatarUrl = FBInstant.player.getPhoto();
         _G.utilsUI.setNodeSpriteFromUrl(rootAvatarNode, avatarUrl, (texture) => {
            this.isRealAvatarLoaded = true;
            const newSFrame = new cc.SpriteFrame(texture);
            this.avatarSpriteFrame = newSFrame;
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


   clearMap(callback?: Function) {
      _G.coreFX.hideGrid(() => {
         this.gridNode.removeAllChildren();
         if (callback) callback();
      });
   },


   render(levelInfo, callback?: Function) {
      const { maxCellX = 3, maxCellY = 3, categoryName, frameName } = levelInfo;
      const frameNode = cc.find('frame', this.fullPicNode);

      // handle the fullPic
      if (categoryName && frameName) {
         if (categoryName != 'tutorial') {
            const sFrame = _G.resources.frameSprites[categoryName][frameName];
            _G.utilsUI.setNodeSprite(frameNode, sFrame);
         }
         this.setAvatar(categoryName, frameName, frameNode); // setup avatar
      }


      const sampleNode = cc.find('Canvas/sample_nodes/cell');

      this.currentMaxCellX = maxCellX;
      this.currentMaxCellY = maxCellY;
      this.currentCellWidth = FRAME_WIDTH / maxCellX;
      this.currentCellHeight = FRAME_HEIGHT / maxCellX;

      for (let x = 1; x <= maxCellX; x++) {
         for (let y = 1; y <= maxCellY; y++) {
            const newCellNode = _.copyNode(sampleNode, this.gridNode);
            newCellNode.name = x + '_' + y;
            newCellNode.orgCellPos = { x, y };

            // set up the frame node
            newCellNode.width = this.currentCellWidth;
            newCellNode.height = this.currentCellHeight;
            const cellPicNode = _.copyNode(this.fullPicNode, cc.find('mask', newCellNode));
            this.setCellNodePos(newCellNode, x, y, true);
            cellPicNode.position = newCellNode.position.mul(-1);


            _G.control.bindCellTap(newCellNode); // bind control

            // handle the mask size manually (widgets cause performance slowdown)
            const maskNode = cc.find('mask', newCellNode);
            maskNode.width = newCellNode.width - 4;
            maskNode.height = newCellNode.height - 4;

            // handle the hint-glow
            const glowNode = cc.find('border_highlight/hint_glow', newCellNode);
            glowNode.width = newCellNode.width * 1.33;
            glowNode.height = newCellNode.height + newCellNode.width * 0.33;
         }
      }

      if (callback) callback();
   },


   // adjust avatar position, size, angle from level.avatar_info
   setAvatar(categoryName, frameName, frameNode, avatarNode?: cc.Node, frameScale = FRAME_SCALE, frameSize = FRAME_WIDTH) {
      avatarNode = avatarNode || cc.find('avatar', this.fullPicNode);
      let avatarInfo = _G.levelManager.getAvatarInfo(categoryName, frameName);
      if (categoryName == 'tutorial') avatarInfo = _G.tutorial.frameAvatarInfo;

      let aCorrectX, aCorrectY;
      if (avatarNode.width < avatarNode.height) {
         avatarNode.anchorX = 0;
         avatarNode.anchorY = 0.5 * (1 + avatarNode.width / avatarNode.height);
      }
      else {
         avatarNode.anchorY = 1;
         avatarNode.anchorX = 0.5 * (1 - avatarNode.height / avatarNode.width);
      }

      const [aWidth, aHeight, aX, aY] = [avatarInfo.width, avatarInfo.height, avatarInfo.x, avatarInfo.y].map(factor => factor * frameScale);
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


   setCellNodePos(cellNode, cellX, cellY, isInit = false) {
      cellNode.setPosition(this.cellPosToCoordinate(cellX, cellY));
      cellNode.cellPos = { x: cellX, y: cellY };
      if (!isInit) _G.gameMechanic.checkCellInCorrectPos(cellNode);
   },

   swapCellAnim(cellNode1: cc.Node, cellNode2: cc.Node, callback?: Function) {
      _G.mapVisual.bringCellsToTop(cellNode1, cellNode2);

      const tmpCellPos = cellNode1.cellPos;
      const coord1 = this.cellPosToCoordinate(cellNode1.cellPos.x, cellNode1.cellPos.y);
      const coord2 = this.cellPosToCoordinate(cellNode2.cellPos.x, cellNode2.cellPos.y);

      const speed = 1200;
      const distance = coord1.sub(coord2).mag();
      const fxTime = distance / speed;

      const scaleTween = cc.tween().to(fxTime * 0.2, { scale: 1.1 }).delay(fxTime * 0.6).to(fxTime * 0.2, { scale: 1 })
      scaleTween.clone(cellNode1).start();
      scaleTween.clone(cellNode2).start();
      cc.tween(cellNode1).to(fxTime, { position: coord2 }).start();
      cc.tween(cellNode2).to(fxTime, { position: coord1 }).start();

      _G.audio.playSound('card-swap');

      _.setTimeout(() => {
         this.setCellNodePos(cellNode1, cellNode2.cellPos.x, cellNode2.cellPos.y);
         this.setCellNodePos(cellNode2, tmpCellPos.x, tmpCellPos.y);
         if (callback) callback();
      }, fxTime * 1000);
   },


   bringCellsToTop(...cellNodeArr) {
      this.gridNode.children.map(cellNode => {
         cellNode.zIndex = cellNodeArr.includes(cellNode) ? 2 : 1;
      })
   },


   // ====================================
   // ===== SUPPORTIVE

   cellPosToCoordinate(cellX, cellY) {
      return cc.v2(
         (cellX - (this.currentMaxCellX + 1) / 2) * this.currentCellWidth,
         (cellY - (this.currentMaxCellY + 1) / 2) * this.currentCellHeight
      );
   },

}