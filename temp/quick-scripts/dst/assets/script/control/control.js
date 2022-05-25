
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/control/control.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29udHJvbC9jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUNwQyxJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFUCxRQUFBLE9BQU8sR0FBRztJQUNwQixnQkFBZ0IsRUFBRSxJQUFlO0lBRWpDLElBQUk7SUFDSixDQUFDO0lBRUQscUJBQXFCLFlBQUMsUUFBZ0I7UUFBaEIseUJBQUEsRUFBQSxnQkFBZ0I7UUFDbkMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEIsSUFBSSxRQUFRO2dCQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QztnQkFDRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2hFO1NBQ0g7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsRUFBWCxVQUFZLFFBQWlCO1FBQTdCLGlCQThCQztRQTdCRSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDN0Isa0RBQWtEO1lBQ2xELElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUVuRCxvQkFBb0I7WUFDcEIsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7Z0JBQUUsT0FBTztZQUVsRCx1Q0FBdUM7WUFDdkMsSUFBSSxRQUFRLElBQUksS0FBSSxDQUFDLGdCQUFnQjtnQkFBRSxPQUFPLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBRTNFLElBQU0sMEJBQTBCLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0YsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEUscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV2QyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3REO1lBRUQsbUJBQW1CO2lCQUNkO2dCQUNGLElBQU0sU0FBUyxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDbEQ7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBjb250cm9sID0ge1xuICAgc2VsZWN0ZWRDZWxsTm9kZTogbnVsbCBhcyBjYy5Ob2RlLFxuXG4gICBpbml0KCkge1xuICAgfSxcblxuICAgY2xlYXJTZWxlY3RlZENlbGxOb2RlKGlzTm9BbmltID0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2VsbE5vZGUpIHtcbiAgICAgICAgIGlmIChpc05vQW5pbSkgdGhpcy5zZWxlY3RlZENlbGxOb2RlLnNjYWxlID0gMTtcbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENlbGxOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnNlbGVjdGVkQ2VsbE5vZGUpLnRvKDAuMiwgeyBzY2FsZTogMSB9KS5zdGFydCgpO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZWxlY3RlZENlbGxOb2RlID0gbnVsbDtcbiAgICAgIF9HLmdhbWVNZWNoYW5pYy5jbGVhckhpbnQoKTtcbiAgIH0sXG5cbiAgIGJpbmRDZWxsVGFwKGNlbGxOb2RlOiBjYy5Ob2RlKSB7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdXR0b24oY2VsbE5vZGUsICgpID0+IHtcbiAgICAgICAgIC8vIGlmIHNob3dpbmcgdHV0LCBhbGxvdyB0byBjbGljayBvbmx5IDIgY2VsbE5vZGVzXG4gICAgICAgICBpZiAoIV9HLnR1dG9yaWFsLmlzQ2xpY2thYmxlQ2VsbChjZWxsTm9kZSkpIHJldHVybjtcblxuICAgICAgICAgLy8gaXMgY29ycmVjdGVkIGNlbGxcbiAgICAgICAgIGlmIChfRy5nYW1lTWVjaGFuaWMuaXNGaXhlZENlbGwoY2VsbE5vZGUpKSByZXR1cm47XG5cbiAgICAgICAgIC8vIGNsaWNrIHNhbWUgY2VsbCBhZ2FpbiB0byBkaXNlbGVjdCBpdFxuICAgICAgICAgaWYgKGNlbGxOb2RlID09IHRoaXMuc2VsZWN0ZWRDZWxsTm9kZSkgcmV0dXJuIHRoaXMuY2xlYXJTZWxlY3RlZENlbGxOb2RlKCk7XG5cbiAgICAgICAgIGNvbnN0IGlzQ2VsbEJlaW5nSGludEhpZ2hsaWdodGVkID0gX0cuZ2FtZU1lY2hhbmljLmN1cnJlbnRIaW50Q2VsbE5vZGVBcnIuaW5jbHVkZXMoY2VsbE5vZGUpO1xuICAgICAgICAgX0cuZ2FtZU1lY2hhbmljLmNsZWFySGludChpc0NlbGxCZWluZ0hpbnRIaWdobGlnaHRlZCA/IGNlbGxOb2RlIDogbnVsbCk7XG5cbiAgICAgICAgIC8vIGZpcnN0IGNlbGwgb2YgcGFpclxuICAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkQ2VsbE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDZWxsTm9kZSA9IGNlbGxOb2RlO1xuICAgICAgICAgICAgX0cubWFwVmlzdWFsLmJyaW5nQ2VsbHNUb1RvcChjZWxsTm9kZSk7XG5cbiAgICAgICAgICAgIGNlbGxOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBjYy50d2VlbihjZWxsTm9kZSkudG8oMC4yLCB7IHNjYWxlOiAxLjE1IH0pLnN0YXJ0KCk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIC8vIDJuZCBjZWxsIG9mIHBhaXJcbiAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgY2VsbE5vZGUyID0gdGhpcy5zZWxlY3RlZENlbGxOb2RlO1xuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGVkQ2VsbE5vZGUodHJ1ZSk7XG4gICAgICAgICAgICBfRy5nYW1lTWVjaGFuaWMub25Td2FwQ2VsbChjZWxsTm9kZSwgY2VsbE5vZGUyKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgfSxcblxufSJdfQ==