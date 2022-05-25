import * as _G from './all_modules';
const { _, $ } = _G;

export const resources = {
   frameSprites: {},
   isAllFramesLoaded: false,
   frameLoadCallbackArr: [],

   init() {
      this.frameSprites['tutorial'] = { tut: cc.find('Canvas/sample_nodes/full_picture/frame').getComponent(cc.Sprite).spriteFrame };
      _G.levelManager.categoryNameArr.map(catName => this.frameSprites[catName] = {});
      // _.setTimeout(() => this.loadAllFrames(), 100);

      _.setTimeout(() => this.loadImageMessageHome(), 2000);
   },

   loadImageMessageHome() {
      cc.resources.load('social/img_message_home', cc.Texture2D, (err, res) => {
         if (err) return _.log('loadImageMessageHome err', err);
         const targetNode = cc.find('Canvas/message_home/picture/img_message_home');
         targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
      });
   },

   loadSingleFrame(catName, frameName) {
      // _.setTimeout(() => {
      cc.resources.load(`frames/${catName}/${frameName}`, cc.SpriteFrame, (err, res) => {
         if (!err) {
            this.frameSprites[catName][frameName] = res;
            this.frameLoadCallbackArr.map(f => f(catName, frameName));
         }

         else _.log(err);
      });
      // }, 1000);
   },

   // loadAllFrames() {
   //    let categoryLoaded = 0;
   //    _G.levelManager.categoryNameArr.map(catName => {
   //       cc.resources.loadDir(`frames/${catName}`, cc.SpriteFrame, (err, resArr) => {
   //          if (!err) resArr.map(res => {
   //             this.frameSprites[catName][res.name] = res;
   //             this.frameLoadCallbackArr.map(f => f(catName, res.name));
   //          });

   //          categoryLoaded++;
   //          if (categoryLoaded == _G.levelManager.categoryNameArr.length) {
   //             this.isAllFramesLoaded = true;
   //             _G.coreUI.hideLayout('layout_loading');
   //          }

   //       });
   //    });
   // },

   addFrameLoadCallback(f) {
      this.frameLoadCallbackArr.push(f);
   },

}