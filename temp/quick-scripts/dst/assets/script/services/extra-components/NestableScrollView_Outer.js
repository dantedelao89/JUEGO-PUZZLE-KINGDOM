
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/extra-components/NestableScrollView_Outer.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '18098D8WfdL640e1h9u6GOI', 'NestableScrollView_Outer');
// script/services/extra-components/NestableScrollView_Outer.js

"use strict";

cc.Class({
  "extends": cc.ScrollView,
  properties: {
    m_InnerScrollViews: [require("NestableScrollView_Inner")],
    m_PlanDir: {
      "default": null,
      visible: false
    },
    m_ScrollingInnerSv: {
      "default": null,
      visible: false
    }
  },
  onLoad: function onLoad() {
    this.m_PlanDir = null;
    this.reloadInnerScrollViews();
  },
  reloadInnerScrollViews: function reloadInnerScrollViews() {
    var _this = this;

    this.m_InnerScrollViews.forEach(function (inner) {
      inner.setOuterScrollView(_this);
    });
  },
  _isHisChild: function _isHisChild(child, undeterminedParent) {
    if (child == undeterminedParent) {
      return true;
    }

    if (child.parent != null) {
      if (child.parent == undeterminedParent) {
        return true;
      } else {
        return this._isHisChild(child.parent, undeterminedParent);
      }
    }

    return false;
  },
  _findScrollingInnerSv: function _findScrollingInnerSv(target) {
    for (var i = 0; i < this.m_InnerScrollViews.length; i++) {
      var isHisChild = this._isHisChild(target, this.m_InnerScrollViews[i].node);

      if (isHisChild) {
        return this.m_InnerScrollViews[i];
      }
    }

    return null;
  },
  isDifferentBetweenSettingAndPlan: function isDifferentBetweenSettingAndPlan(sv) {
    if (this.m_PlanDir == 0) {
      return false;
    }

    if (this.m_PlanDir == 1 && sv.horizontal) {
      return false;
    }

    if (this.m_PlanDir == -1 && sv.vertical) {
      return false;
    }

    return true;
  },
  _hasNestedViewGroup: function _hasNestedViewGroup(event, captureListeners) {
    if (event.eventPhase !== cc.Event.CAPTURING_PHASE) return;
    return false;
  },
  _onTouchBegan: function _onTouchBegan(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    this.m_PlanDir = null;
    this.m_ScrollingInnerSv = null;
    var touch = event.touch;

    if (this.content) {
      this._handlePressLogic(touch);
    }

    this._touchMoved = false;

    this._stopPropagationIfTargetIsMe(event);
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    if (this._hasNestedViewGroup(event, captureListeners)) return;
    var touch = event.touch;
    var deltaMove = touch.getLocation().sub(touch.getStartLocation());

    if (this.m_PlanDir == null && deltaMove.mag() > 7) {
      this.m_ScrollingInnerSv = this._findScrollingInnerSv(event.target);

      if (this.m_ScrollingInnerSv != null) {
        var contentSize = this.m_ScrollingInnerSv.content.getContentSize();
        var scrollViewSize = this.m_ScrollingInnerSv.node.getContentSize();

        if (this.m_ScrollingInnerSv.vertical && contentSize.height > scrollViewSize.height || this.m_ScrollingInnerSv.horizontal && contentSize.width > scrollViewSize.width) {
          this.m_PlanDir = Math.abs(deltaMove.x) > Math.abs(deltaMove.y) ? 1 : -1;
        } else {
          this.m_PlanDir = 0;
        }
      } else {
        this.m_PlanDir = 0;
      }
    }

    if (this.content) {
      if (!this.isDifferentBetweenSettingAndPlan(this)) {
        this._handleMoveLogic(touch);
      }
    }

    if (!this.cancelInnerEvents) {
      return;
    }

    if (this.m_ScrollingInnerSv == null) {
      if (deltaMove.mag() > 7) {
        if (!this._touchMoved && event.target !== this.node) {
          var cancelEvent = new cc.Event.EventTouch(event.getTouches(), event.bubbles);
          cancelEvent.type = cc.Node.EventType.TOUCH_CANCEL;
          cancelEvent.touch = event.touch;
          cancelEvent.simulate = true;
          event.target.dispatchEvent(cancelEvent);
          this._touchMoved = true;
        }
      }

      this._stopPropagationIfTargetIsMe(event);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvZXh0cmEtY29tcG9uZW50cy9OZXN0YWJsZVNjcm9sbFZpZXdfT3V0ZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIlNjcm9sbFZpZXciLCJwcm9wZXJ0aWVzIiwibV9Jbm5lclNjcm9sbFZpZXdzIiwicmVxdWlyZSIsIm1fUGxhbkRpciIsInZpc2libGUiLCJtX1Njcm9sbGluZ0lubmVyU3YiLCJvbkxvYWQiLCJyZWxvYWRJbm5lclNjcm9sbFZpZXdzIiwiZm9yRWFjaCIsImlubmVyIiwic2V0T3V0ZXJTY3JvbGxWaWV3IiwiX2lzSGlzQ2hpbGQiLCJjaGlsZCIsInVuZGV0ZXJtaW5lZFBhcmVudCIsInBhcmVudCIsIl9maW5kU2Nyb2xsaW5nSW5uZXJTdiIsInRhcmdldCIsImkiLCJsZW5ndGgiLCJpc0hpc0NoaWxkIiwibm9kZSIsImlzRGlmZmVyZW50QmV0d2VlblNldHRpbmdBbmRQbGFuIiwic3YiLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJfaGFzTmVzdGVkVmlld0dyb3VwIiwiZXZlbnQiLCJjYXB0dXJlTGlzdGVuZXJzIiwiZXZlbnRQaGFzZSIsIkV2ZW50IiwiQ0FQVFVSSU5HX1BIQVNFIiwiX29uVG91Y2hCZWdhbiIsImVuYWJsZWRJbkhpZXJhcmNoeSIsInRvdWNoIiwiY29udGVudCIsIl9oYW5kbGVQcmVzc0xvZ2ljIiwiX3RvdWNoTW92ZWQiLCJfc3RvcFByb3BhZ2F0aW9uSWZUYXJnZXRJc01lIiwiX29uVG91Y2hNb3ZlZCIsImRlbHRhTW92ZSIsImdldExvY2F0aW9uIiwic3ViIiwiZ2V0U3RhcnRMb2NhdGlvbiIsIm1hZyIsImNvbnRlbnRTaXplIiwiZ2V0Q29udGVudFNpemUiLCJzY3JvbGxWaWV3U2l6ZSIsImhlaWdodCIsIndpZHRoIiwiTWF0aCIsImFicyIsIngiLCJ5IiwiX2hhbmRsZU1vdmVMb2dpYyIsImNhbmNlbElubmVyRXZlbnRzIiwiY2FuY2VsRXZlbnQiLCJFdmVudFRvdWNoIiwiZ2V0VG91Y2hlcyIsImJ1YmJsZXMiLCJ0eXBlIiwiTm9kZSIsIkV2ZW50VHlwZSIsIlRPVUNIX0NBTkNFTCIsInNpbXVsYXRlIiwiZGlzcGF0Y2hFdmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTixhQUFTRCxFQUFFLENBQUNFLFVBRE47QUFHTkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1RDLElBQUFBLGtCQUFrQixFQUFFLENBQUNDLE9BQU8sQ0FBQywwQkFBRCxDQUFSLENBRFg7QUFFVEMsSUFBQUEsU0FBUyxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxPQUFPLEVBQUU7QUFGRCxLQUZGO0FBTVRDLElBQUFBLGtCQUFrQixFQUFFO0FBQ2pCLGlCQUFTLElBRFE7QUFFakJELE1BQUFBLE9BQU8sRUFBRTtBQUZRO0FBTlgsR0FITjtBQWVORSxFQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDakIsU0FBS0gsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtJLHNCQUFMO0FBQ0YsR0FsQks7QUFvQk5BLEVBQUFBLHNCQXBCTSxvQ0FvQm1CO0FBQUE7O0FBQ3RCLFNBQUtOLGtCQUFMLENBQXdCTyxPQUF4QixDQUFnQyxVQUFBQyxLQUFLLEVBQUk7QUFDdENBLE1BQUFBLEtBQUssQ0FBQ0Msa0JBQU4sQ0FBeUIsS0FBekI7QUFDRixLQUZEO0FBR0YsR0F4Qks7QUEwQk5DLEVBQUFBLFdBMUJNLHVCQTBCTUMsS0ExQk4sRUEwQmFDLGtCQTFCYixFQTBCaUM7QUFDcEMsUUFBSUQsS0FBSyxJQUFJQyxrQkFBYixFQUFpQztBQUM5QixhQUFPLElBQVA7QUFDRjs7QUFDRCxRQUFJRCxLQUFLLENBQUNFLE1BQU4sSUFBZ0IsSUFBcEIsRUFBMEI7QUFDdkIsVUFBSUYsS0FBSyxDQUFDRSxNQUFOLElBQWdCRCxrQkFBcEIsRUFBd0M7QUFDckMsZUFBTyxJQUFQO0FBQ0YsT0FGRCxNQUVPO0FBQ0osZUFBTyxLQUFLRixXQUFMLENB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TixFQUF4QixFQUE0Qy9CLEtBQUssQ0FBQ2dDLE9BQWxELENBQWxCO0FBQ0FILFVBQUFBLFdBQVcsQ0FBQ0ksSUFBWixHQUFtQjlELEVBQUUsQ0FBQytELElBQUgsQ0FBUUMsU0FBUixDQUFrQkMsWUFBckM7QUFDQVAsVUFBQUEsV0FBVyxDQUFDdEIsS0FBWixHQUFvQlAsS0FBSyxDQUFDTyxLQUExQjtBQUNBc0IsVUFBQUEsV0FBVyxDQUFDUSxRQUFaLEdBQXVCLElBQXZCO0FBQ0FyQyxVQUFBQSxLQUFLLENBQUNWLE1BQU4sQ0FBYWdELGFBQWIsQ0FBMkJULFdBQTNCO0FBQ0EsZUFBS25CLFdBQUwsR0FBbUIsSUFBbkI7QUFDRjtBQUNIOztBQUNELFdBQUtDLDRCQUFMLENBQWtDWCxLQUFsQztBQUNGO0FBQ0g7QUFwSUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgZXh0ZW5kczogY2MuU2Nyb2xsVmlldyxcblxuICAgcHJvcGVydGllczoge1xuICAgICAgbV9Jbm5lclNjcm9sbFZpZXdzOiBbcmVxdWlyZShcIk5lc3RhYmxlU2Nyb2xsVmlld19Jbm5lclwiKV0sXG4gICAgICBtX1BsYW5EaXI6IHtcbiAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBtX1Njcm9sbGluZ0lubmVyU3Y6IHtcbiAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgIH0sXG4gICB9LFxuXG4gICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMubV9QbGFuRGlyID0gbnVsbDtcbiAgICAgIHRoaXMucmVsb2FkSW5uZXJTY3JvbGxWaWV3cygpO1xuICAgfSxcblxuICAgcmVsb2FkSW5uZXJTY3JvbGxWaWV3cygpIHtcbiAgICAgIHRoaXMubV9Jbm5lclNjcm9sbFZpZXdzLmZvckVhY2goaW5uZXIgPT4ge1xuICAgICAgICAgaW5uZXIuc2V0T3V0ZXJTY3JvbGxWaWV3KHRoaXMpO1xuICAgICAgfSk7XG4gICB9LFxuXG4gICBfaXNIaXNDaGlsZChjaGlsZCwgdW5kZXRlcm1pbmVkUGFyZW50KSB7XG4gICAgICBpZiAoY2hpbGQgPT0gdW5kZXRlcm1pbmVkUGFyZW50KSB7XG4gICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGlsZC5wYXJlbnQgIT0gbnVsbCkge1xuICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCA9PSB1bmRldGVybWluZWRQYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc0hpc0NoaWxkKGNoaWxkLnBhcmVudCwgdW5kZXRlcm1pbmVkUGFyZW50KTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgIH0sXG5cblxuICAgX2ZpbmRTY3JvbGxpbmdJbm5lclN2KHRhcmdldCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fSW5uZXJTY3JvbGxWaWV3cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgbGV0IGlzSGlzQ2hpbGQgPSB0aGlzLl9pc0hpc0NoaWxkKHRhcmdldCwgdGhpcy5tX0lubmVyU2Nyb2xsVmlld3NbaV0ubm9kZSk7XG4gICAgICAgICBpZiAoaXNIaXNDaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9Jbm5lclNjcm9sbFZpZXdzW2ldO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICB9LFxuXG5cbiAgIGlzRGlmZmVyZW50QmV0d2VlblNldHRpbmdBbmRQbGFuKHN2KSB7XG4gICAgICBpZiAodGhpcy5tX1BsYW5EaXIgPT0gMCkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubV9QbGFuRGlyID09IDEgJiYgc3YuaG9yaXpvbnRhbCkge1xuICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMubV9QbGFuRGlyID09IC0xICYmIHN2LnZlcnRpY2FsKSB7XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgIH0sXG5cblxuICAgX2hhc05lc3RlZFZpZXdHcm91cDogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICBpZiAoZXZlbnQuZXZlbnRQaGFzZSAhPT0gY2MuRXZlbnQuQ0FQVFVSSU5HX1BIQVNFKSByZXR1cm47XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICB9LFxuXG4gICBfb25Ub3VjaEJlZ2FuOiBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XG5cbiAgICAgIHRoaXMubV9QbGFuRGlyID0gbnVsbDtcbiAgICAgIHRoaXMubV9TY3JvbGxpbmdJbm5lclN2ID0gbnVsbDtcblxuICAgICAgdmFyIHRvdWNoID0gZXZlbnQudG91Y2g7XG4gICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICB0aGlzLl9oYW5kbGVQcmVzc0xvZ2ljKHRvdWNoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3RvdWNoTW92ZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XG4gICB9LFxuXG4gICBfb25Ub3VjaE1vdmVkOiBmdW5jdGlvbiAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpIHtcbiAgICAgIGlmICghdGhpcy5lbmFibGVkSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLl9oYXNOZXN0ZWRWaWV3R3JvdXAoZXZlbnQsIGNhcHR1cmVMaXN0ZW5lcnMpKSByZXR1cm47XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoO1xuICAgICAgdmFyIGRlbHRhTW92ZSA9IHRvdWNoLmdldExvY2F0aW9uKCkuc3ViKHRvdWNoLmdldFN0YXJ0TG9jYXRpb24oKSk7XG5cbiAgICAgIGlmICh0aGlzLm1fUGxhbkRpciA9PSBudWxsICYmIGRlbHRhTW92ZS5tYWcoKSA+IDcpIHtcbiAgICAgICAgIHRoaXMubV9TY3JvbGxpbmdJbm5lclN2ID0gdGhpcy5fZmluZFNjcm9sbGluZ0lubmVyU3YoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgIGlmICh0aGlzLm1fU2Nyb2xsaW5nSW5uZXJTdiAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgY29udGVudFNpemUgPSB0aGlzLm1fU2Nyb2xsaW5nSW5uZXJTdi5jb250ZW50LmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICBsZXQgc2Nyb2xsVmlld1NpemUgPSB0aGlzLm1fU2Nyb2xsaW5nSW5uZXJTdi5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICBpZiAoKHRoaXMubV9TY3JvbGxpbmdJbm5lclN2LnZlcnRpY2FsICYmIChjb250ZW50U2l6ZS5oZWlnaHQgPiBzY3JvbGxWaWV3U2l6ZS5oZWlnaHQpKSB8fCAodGhpcy5tX1Njcm9sbGluZ0lubmVyU3YuaG9yaXpvbnRhbCAmJiAoY29udGVudFNpemUud2lkdGggPiBzY3JvbGxWaWV3U2l6ZS53aWR0aCkpKSB7XG4gICAgICAgICAgICAgICB0aGlzLm1fUGxhbkRpciA9IE1hdGguYWJzKGRlbHRhTW92ZS54KSA+IE1hdGguYWJzKGRlbHRhTW92ZS55KSA/IDEgOiAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICB0aGlzLm1fUGxhbkRpciA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tX1BsYW5EaXIgPSAwO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb250ZW50KSB7XG4gICAgICAgICBpZiAoIXRoaXMuaXNEaWZmZXJlbnRCZXR3ZWVuU2V0dGluZ0FuZFBsYW4odGhpcykpIHtcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZU1vdmVMb2dpYyh0b3VjaCk7XG4gICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5jYW5jZWxJbm5lckV2ZW50cykge1xuICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG5cbiAgICAgIGlmICh0aGlzLm1fU2Nyb2xsaW5nSW5uZXJTdiA9PSBudWxsKSB7XG4gICAgICAgICBpZiAoZGVsdGFNb3ZlLm1hZygpID4gNykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl90b3VjaE1vdmVkICYmIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5ub2RlKSB7XG4gICAgICAgICAgICAgICB2YXIgY2FuY2VsRXZlbnQgPSBuZXcgY2MuRXZlbnQuRXZlbnRUb3VjaChldmVudC5nZXRUb3VjaGVzKCksIGV2ZW50LmJ1YmJsZXMpO1xuICAgICAgICAgICAgICAgY2FuY2VsRXZlbnQudHlwZSA9IGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTDtcbiAgICAgICAgICAgICAgIGNhbmNlbEV2ZW50LnRvdWNoID0gZXZlbnQudG91Y2g7XG4gICAgICAgICAgICAgICBjYW5jZWxFdmVudC5zaW11bGF0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICBldmVudC50YXJnZXQuZGlzcGF0Y2hFdmVudChjYW5jZWxFdmVudCk7XG4gICAgICAgICAgICAgICB0aGlzLl90b3VjaE1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgIHRoaXMuX3N0b3BQcm9wYWdhdGlvbklmVGFyZ2V0SXNNZShldmVudCk7XG4gICAgICB9XG4gICB9LFxufSk7Il19