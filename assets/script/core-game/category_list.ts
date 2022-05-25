import * as _G from '../system/all_modules';
const { _, $ } = _G;

const FRAME_SIZE = 263;
const ORG_FRAME_SIZE = 800;
const FRAME_SCALE = FRAME_SIZE / ORG_FRAME_SIZE;

const FRAME_SIZE_V2 = 284;
const FRAME_SCALE_V2 = FRAME_SIZE_V2 / ORG_FRAME_SIZE;

export const categoryList = {
   containerNode: null as cc.Node,
   containerNodeV2: null as cc.Node,
   colliderNode: null as cc.Node,

   frameNodeArr: [],

   init() {
      this.containerNode = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists');
      this.containerNodeV2 = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists_v2');
      this.colliderNode = cc.find('Canvas/play_area/visible_frame_collider');

      this.containerNode.active = !_G.user.isVersionV2;
      this.containerNodeV2.active = _G.user.isVersionV2;

      if (!_G.user.isVersionV2) this.renderList();
      else this.renderListV2();
      _G.resources.addFrameLoadCallback((catName, frameName) => this.onFrameLoaded(catName, frameName));

      this.setupVisibleFrameCollider();
   },


   onFrameLoaded(catName, frameName) {
      // _.log(` onFrameLoaded >> catName=${catName}, frameName=${frameName} `);
      let frameCellNode;

      if (_G.user.isVersionV2) {
         frameCellNode = this.containerNodeV2.children.find(node => node.categoryName == catName && node.name == frameName);
      } else {
         const catContainerNode = cc.find(catName, this.containerNode)
         const scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
         frameCellNode = cc.find(frameName, scrollViewContent);
      }
      if (!frameCellNode) return _.log(` onFrameLoaded (${catName}, ${frameName}) >>  frameCellNode = ${frameCellNode} `);

      frameCellNode.isTextureLoaded = true;
      const frameNode = cc.find('frame', frameCellNode);
      _G.utilsUI.setNodeSprite(frameNode, _G.resources.frameSprites[catName][frameName]);

      // fx fade in to smoothly show
      const frameCover = cc.find('frame_cover', frameCellNode);
      cc.tween(frameCover).to(0.3, { opacity: 0 }).start();
   },

   setupVisibleFrameCollider() {
      _.setTimeout(() => {
         this.colliderNode.active = true;
         this.colliderNode.height = this.colliderNode.getComponent(cc.BoxCollider).size.height = cc.winSize.height;
         // this.colliderNode.getComponent(cc.BoxCollider).size.width = 300;
         // this.colliderNode.getComponent(cc.BoxCollider).size.height = 300;
      }, 100);
   },


   renderList() {
      const scrollViewMaster = cc.find('Canvas/play_area/scrollview_master');
      const scrollViewMasterComp = scrollViewMaster.getComponent('NestableScrollView_Outer');

      const sampleNode = cc.find('Canvas/sample_nodes/sample_category_row');
      const sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell');
      sampleFrameNode.opacity = 0;

      _G.levelManager.categoryNameArr.map(catName => {
         const newRowNode = _.copyNode(sampleNode, this.containerNode);
         newRowNode.name = catName;
         newRowNode.opacity = 0; // reduce drawcall. Will appear when touching visible collider
         scrollViewMasterComp.m_InnerScrollViews.push(cc.find('scrollview', newRowNode).getComponent('NestableScrollView_Inner'))
         // _G.utilsUI.fillChildLabelByPath(newRowNode, 'header_bg/label_category_list_header_name', catName);
         const labelCatName = cc.find('header_bg/label_category_list_header_name', newRowNode);
         labelCatName.localizeData = catName;

         const categoryInfo = _G.levelManager.categoryArr.find(catInfo => catInfo.id == catName);
         if (!categoryInfo) return;

         const scrollViewContent = cc.find('scrollview/view/content', newRowNode);
         categoryInfo.frameArr.map(frameInfo => {
            const newFrameCellNode = _.copyNode(sampleFrameNode, scrollViewContent);
            this.frameNodeArr.push(newFrameCellNode);
            newFrameCellNode.name = frameInfo.name;
            newFrameCellNode.categoryName = catName;
            const frameNode = cc.find('frame', newFrameCellNode);

            const frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
            if (frameTexture) _G.utilsUI.setNodeSprite(frameNode, frameTexture);

            newFrameCellNode.buttonCompZoomScale = 0.9;
            _G.utilsUI.makeBubbleButton(newFrameCellNode, () => _G.gameMechanic.previewGame(catName, frameInfo.name, 3, 3, true));
         });
      });

      scrollViewMasterComp.reloadInnerScrollViews();
      this.setupAllFrameAvatars();
      _.waitToRun(() => this.updateAllIconCheckeds(), 'playedGames', _G.user);

   },


   renderListV2() {
      const sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell_v2');
      sampleFrameNode.opacity = 0;

      _G.levelManager.categoryNameArr.map(catName => {
         const categoryInfo = _G.levelManager.categoryArr.find(catInfo => catInfo.id == catName);
         if (!categoryInfo) return;

         categoryInfo.frameArr.map(frameInfo => {
            // zIndexArr.push(i++);
            const newFrameCellNode = _.copyNode(sampleFrameNode, this.containerNodeV2);
            this.frameNodeArr.push(newFrameCellNode);
            newFrameCellNode.name = frameInfo.name;
            newFrameCellNode.categoryName = catName;
            const frameNode = cc.find('frame', newFrameCellNode);

            const frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
            if (frameTexture) _G.utilsUI.setNodeSprite(frameNode, frameTexture);

            newFrameCellNode.buttonCompZoomScale = 0.9;
            _G.utilsUI.makeBubbleButton(newFrameCellNode, () => {
               _G.gameMechanic.previewGame(catName, frameInfo.name, 1, 1, true);
               this.sortCategoryV2Randomly();
               _G.interAd.checkToShowInterAd();
            });
         });
      });

      _.waitToRun(() => this.sortCategoryV2Randomly(), 'playedGames', _G.user);

      this.setupAllFrameAvatars();
      _.waitToRun(() => this.updateAllIconCheckeds(), 'playedGames', _G.user);
   },


   // random order but newFrame on top, played-frames at bottom
   sortCategoryV2Randomly() {
      const frameNodeToScore = node => _G.user.playedGames[`${node.categoryName}_${node.name}`] ? 2 : 1;
      this.frameNodeArr.sort((nodeA, nodeB) => (frameNodeToScore(nodeA) - frameNodeToScore(nodeB)) || (_.random() > 0.5 ? 1 : -1));
      this.frameNodeArr.map((node, i) => node.zIndex = i);
   },


   setupAllFrameAvatars() {
      const setupFrameCellNode = (frameCellNode) => {
         const frameNode = cc.find('frame', frameCellNode);
         const avatarNode = cc.find('mask/avatar', frameCellNode);
         _G.utilsUI.setNodeSprite(avatarNode, _G.mapVisual.avatarSpriteFrame);
         const frameScale = _G.user.isVersionV2 ? FRAME_SCALE_V2 : FRAME_SCALE;
         const frameSize = _G.user.isVersionV2 ? FRAME_SIZE_V2 : FRAME_SIZE;
         _G.mapVisual.setAvatar(frameCellNode.categoryName, frameCellNode.name, frameNode, avatarNode, frameScale, frameSize);
      }

      if (_G.user.isVersionV2)
         this.containerNodeV2.children.map((frameCellNode) => setupFrameCellNode(frameCellNode))
      else {
         this.containerNode.children.map(catContainerNode => {
            const scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
            scrollViewContent.children.map((frameCellNode) => setupFrameCellNode(frameCellNode));
         });
      }
   },


   updateAllIconCheckeds() {
      const setupIconChecked = (frameCellNode) => {
         cc.find('icon_checked', frameCellNode).active = _G.user.playedGames[frameCellNode.categoryName + '_' + frameCellNode.name];
      }

      if (_G.user.isVersionV2)
         this.containerNodeV2.children.map(frameCellNode => setupIconChecked(frameCellNode));
      else this.containerNode.children.map(catContainerNode => {
         const scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
         scrollViewContent.children.map(frameCellNode => setupIconChecked(frameCellNode));
      });
   },



}