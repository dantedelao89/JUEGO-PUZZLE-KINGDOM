import * as _G from '../system/all_modules';
const _ = _G._;

const { ccclass, property } = cc._decorator;

const ORG_FRAME_SIZE = 800;

@ccclass
export default class Share extends cc.Component {
   async initBase64Picture(targetNode: cc.Node) {
      if (!targetNode.activeInHierarchy) targetNode.active = true;

      const cameraNode = new cc.Node();
      targetNode.addChild(cameraNode);
      let cameraComp = cameraNode.addComponent(cc.Camera);
      let texture = new cc.RenderTexture();

      let gl = cc.game._renderContext;
      texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
      cameraComp.targetTexture = texture;
      cameraComp.zoomRatio = (_.isANDROID || _.isIOS) ? 1.7 : 1.5;

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

   async initPayload(targetNode: cc.Node, content: string, extraData?: any) {
      try {
         const base64Image = await this.initBase64Picture(targetNode);
         const payload = {
            intent: 'SHARE',
            image: base64Image,
            text: content,
            data: extraData,
         };
         _.log(`--------payload = `, payload);
         return payload;
      } catch (error) { throw error; }
   }

   async sharePostNormal(isFromV2Screen, shareCode) {
      cc.find('Canvas/shares/picture/overlay').active = !isFromV2Screen;

      _G.utilsUI.fillLabel(cc.find('Canvas/shares/picture/overlay/score_base/label_score'), '+' + _G.user.exp);

      // fill share node with current frames 
      const picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture/full_frame', this.node));
      // picNode.scale = ORG_FRAME_SIZE / picNode.width;
      cc.find('capture_hard_mask', picNode).active = true;

      // capture the frames
      try {
         const payload = await this.initPayload(
            this.node,
            '',
            {
               version: 'v2',
               isFromNewsFeed: 1,
               puzzle_id: _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName
            }
         );

         // _.log(payload);
         await FBInstant.shareAsync(payload);
      } catch (error) { _.log(error) }
   }


}
