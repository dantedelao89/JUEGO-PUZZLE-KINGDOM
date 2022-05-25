import * as _G from '../../system/all_modules';
const { _, $ } = _G;

const { ccclass, property } = cc._decorator;

@ccclass
export default class VisibleFrameColliderComp extends cc.Component {
   onCollisionEnter(otherCollider, selfCollider) {
      const contentNode = otherCollider.node;
      contentNode.opacity = 255;

      // if is category frame, load the frame if not loaded
      // _.log(`VisibleFrameColliderComp >> contentNode.categoryName=${contentNode.categoryName}, contentNode.name=${contentNode.name}  `);
      if (contentNode.categoryName && !contentNode.isTextureLoaded) {
         _G.resources.loadSingleFrame(contentNode.categoryName, contentNode.name);
      }
   }

   onCollisionExit(otherCollider, selfCollider) {
      otherCollider.node.opacity = 0;
   }
}


