import * as _G from '../system/all_modules';
const _ = _G._;

const { ccclass, property } = cc._decorator;

@ccclass
export default class Message extends cc.Component {

   onLoad() {
   }

   async initBase64Picture(targetNode: cc.Node) {
      if (!targetNode.activeInHierarchy) targetNode.active = true;

      const cameraNode = new cc.Node();
      targetNode.addChild(cameraNode);
      let cameraComp = cameraNode.addComponent(cc.Camera);
      let texture = new cc.RenderTexture();

      let gl = cc.game._renderContext;
      texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
      cameraComp.targetTexture = texture;
      // cameraComp.zoomRatio = 3.2; // ratio for message of size: 640 x 420;
      cameraComp.zoomRatio = 1.3;

      cameraComp.backgroundColor = cc.Color.WHITE;
      cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
      // cameraComp.cullingMask = 0xffffffff;

      let width = texture.width;
      let height = texture.height;
      let _canvas = document.createElement('canvas');
      _canvas.width = width;
      _canvas.height = height;

      let ctx = _canvas.getContext('2d');
      cameraComp.render(targetNode);
      let data = texture.readPixels();
      // write the render data

      let rowBytes = width * 4;
      for (let row = 0; row < height; row++) {
         let srow = height - 1 - row;
         let data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
         let imageData = new ImageData(data2, width, 1);
         ctx.putImageData(imageData, 0, row);
      }

      const dataURL = _canvas.toDataURL("image/jpeg");

      setTimeout(() => {
         targetNode.active = false;
         cameraNode.removeFromParent();
      }, 2000);

      return dataURL;
   }

   async initPayload(target: cc.Node, content: string, ctaText: string, extraData?: any) {
      try {
         const dataObj = {
            version: 'v2',
            isFromNewsFeed: 1,
            puzzle_id: extraData?.isNoPuzzleId ? null : _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName,
            ...(extraData || {}),
         }
         const base64Image = await this.initBase64Picture(target);
         const payload = {
            action: 'CUSTOM',
            text: _G.localize.getMultilangugaeFBMessageObj(content),
            // text: content,
            cta: _G.localize.getMultilangugaeFBMessageObj(ctaText),
            // cta: ctaText,
            image: base64Image,
            template: 'play_turn',
            strategy: 'IMMEDIATE',
            data: dataObj,
            notification: 'PUSH',
         };
         _.log(`--------payload = `, payload);
         return payload;
      } catch (error) {
         throw error;
      }
   }


   async sendMessageScore() {
      if (!window['FBInstant']) return;

      // fill sahre node with current frames 
      const picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture', this.node));
      cc.find('capture_hard_mask', picNode).active = true;

      try {
         // const content = `${window['FBInstant']?.player.getName()} invites you to solve a puzzle!`;
         // const ctaText = 'PLAY NOW';
         const content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
         const ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;

         const payload = await this.initPayload(this.node, content, ctaText);
         await FBInstant.updateAsync(payload);
      } catch (error) {
         _.log('sendMessageScore', error);
      }
   }

   async sendMessageStillImage() {
      if (!window['FBInstant']) return;
      try {
         // const content = `${window['FBInstant']?.player.getName()} invites you to solve a puzzle!`;
         // const ctaText = 'PLAY NOW';
         const content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
         const ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;

         const payload = await this.initPayload(this.node, content, ctaText, { isNoPuzzleId: true });
         await FBInstant.updateAsync(payload);
      } catch (error) {
         _.log('sendMessageScore', error);
      }
   }

}
