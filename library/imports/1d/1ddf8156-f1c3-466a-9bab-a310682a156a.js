"use strict";
cc._RF.push(module, '1ddf8FW8cNGapuroxBoKhVq', 'control');
// script/control/control.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.control = {
    selectedCellNode: null,
    init: function () {
    },
    clearSelectedCellNode: function (isNoAnim) {
        if (isNoAnim === void 0) { isNoAnim = false; }
        if (this.selectedCellNode) {
            if (isNoAnim)
                this.selectedCellNode.scale = 1;
            else {
                this.selectedCellNode.stopAllActions();
                cc.tween(this.selectedCellNode).to(0.2, { scale: 1 }).start();
            }
        }
        this.selectedCellNode = null;
        _G.gameMechanic.clearHint();
    },
    bindCellTap: function (cellNode) {
        var _this = this;
        _G.utilsUI.makeButton(cellNode, function () {
            // if showing tut, allow to click only 2 cellNodes
            if (!_G.tutorial.isClickableCell(cellNode))
                return;
            // is corrected cell
            if (_G.gameMechanic.isFixedCell(cellNode))
                return;
            // click same cell again to diselect it
            if (cellNode == _this.selectedCellNode)
                return _this.clearSelectedCellNode();
            var isCellBeingHintHighlighted = _G.gameMechanic.currentHintCellNodeArr.includes(cellNode);
            _G.gameMechanic.clearHint(isCellBeingHintHighlighted ? cellNode : null);
            // first cell of pair
            if (!_this.selectedCellNode) {
                _this.selectedCellNode = cellNode;
                _G.mapVisual.bringCellsToTop(cellNode);
                cellNode.stopAllActions();
                cc.tween(cellNode).to(0.2, { scale: 1.15 }).start();
            }
            // 2nd cell of pair
            else {
                var cellNode2 = _this.selectedCellNode;
                _this.clearSelectedCellNode(true);
                _G.gameMechanic.onSwapCell(cellNode, cellNode2);
            }
        });
    },
};

cc._RF.pop();