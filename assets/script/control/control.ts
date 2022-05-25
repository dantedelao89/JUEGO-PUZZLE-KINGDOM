import * as _G from '../system/all_modules';
const { _, $ } = _G;

export const control = {
   selectedCellNode: null as cc.Node,

   init() {
   },

   clearSelectedCellNode(isNoAnim = false) {
      if (this.selectedCellNode) {
         if (isNoAnim) this.selectedCellNode.scale = 1;
         else {
            this.selectedCellNode.stopAllActions();
            cc.tween(this.selectedCellNode).to(0.2, { scale: 1 }).start();
         }
      }
      this.selectedCellNode = null;
      _G.gameMechanic.clearHint();
   },

   bindCellTap(cellNode: cc.Node) {
      _G.utilsUI.makeButton(cellNode, () => {
         // if showing tut, allow to click only 2 cellNodes
         if (!_G.tutorial.isClickableCell(cellNode)) return;

         // is corrected cell
         if (_G.gameMechanic.isFixedCell(cellNode)) return;

         // click same cell again to diselect it
         if (cellNode == this.selectedCellNode) return this.clearSelectedCellNode();

         const isCellBeingHintHighlighted = _G.gameMechanic.currentHintCellNodeArr.includes(cellNode);
         _G.gameMechanic.clearHint(isCellBeingHintHighlighted ? cellNode : null);

         // first cell of pair
         if (!this.selectedCellNode) {
            this.selectedCellNode = cellNode;
            _G.mapVisual.bringCellsToTop(cellNode);

            cellNode.stopAllActions();
            cc.tween(cellNode).to(0.2, { scale: 1.15 }).start();
         }

         // 2nd cell of pair
         else {
            const cellNode2 = this.selectedCellNode;
            this.clearSelectedCellNode(true);
            _G.gameMechanic.onSwapCell(cellNode, cellNode2);
         }
      });
   },

}