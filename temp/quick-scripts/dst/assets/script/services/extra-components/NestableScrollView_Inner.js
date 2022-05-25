
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/extra-components/NestableScrollView_Inner.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5cb55RIW3FDJrgQs5qmh4U/', 'NestableScrollView_Inner');
// script/services/extra-components/NestableScrollView_Inner.js

"use strict";

cc.Class({
  "extends": cc.ScrollView,
  properties: {
    m_OuterScrollView: {
      "default": null,
      visible: false
    }
  },
  setOuterScrollView: function setOuterScrollView(outer) {
    this.m_OuterScrollView = outer;
  },
  _onTouchMoved: function _onTouchMoved(event, captureListeners) {
    if (!this.enabledInHierarchy) return;
    var touch = event.touch;
    var deltaMove = touch.getLocation().sub(touch.getStartLocation());

    if (this.content) {
      if (!this.m_OuterScrollView.isDifferentBetweenSettingAndPlan(this)) {
        this._handleMoveLogic(touch);
      }
    }

    if (!this.cancelInnerEvents) {
      return;
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvZXh0cmEtY29tcG9uZW50cy9OZXN0YWJsZVNjcm9sbFZpZXdfSW5uZXIuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIlNjcm9sbFZpZXciLCJwcm9wZXJ0aWVzIiwibV9PdXRlclNjcm9sbFZpZXciLCJ2aXNpYmxlIiwic2V0T3V0ZXJTY3JvbGxWaWV3Iiwib3V0ZXIiLCJfb25Ub3VjaE1vdmVkIiwiZXZlbnQiLCJjYXB0dXJlTGlzdGVuZXJzIiwiZW5hYmxlZEluSGllcmFyY2h5IiwidG91Y2giLCJkZWx0YU1vdmUiLCJnZXRMb2NhdGlvbiIsInN1YiIsImdldFN0YXJ0TG9jYXRpb24iLCJjb250ZW50IiwiaXNEaWZmZXJlbnRCZXR3ZWVuU2V0dGluZ0FuZFBsYW4iLCJfaGFuZGxlTW92ZUxvZ2ljIiwiY2FuY2VsSW5uZXJFdmVudHMiLCJtYWciLCJfdG91Y2hNb3ZlZCIsInRhcmdldCIsIm5vZGUiLCJjYW5jZWxFdmVudCIsIkV2ZW50IiwiRXZlbnRUb3VjaCIsImdldFRvdWNoZXMiLCJidWJibGVzIiwidHlwZSIsIk5vZGUiLCJFdmVudFR5cGUiLCJUT1VDSF9DQU5DRUwiLCJzaW11bGF0ZSIsImRpc3BhdGNoRXZlbnQiLCJfc3RvcFByb3BhZ2F0aW9uSWZUYXJnZXRJc01lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNOLGFBQVNELEVBQUUsQ0FBQ0UsVUFETjtBQUdOQyxFQUFBQSxVQUFVLEVBQUU7QUFDVEMsSUFBQUEsaUJBQWlCLEVBQUU7QUFDaEIsaUJBQVMsSUFETztBQUVoQkMsTUFBQUEsT0FBTyxFQUFFO0FBRk87QUFEVixHQUhOO0FBVU5DLEVBQUFBLGtCQVZNLDhCQVVhQyxLQVZiLEVBVW9CO0FBQ3ZCLFNBQUtILGlCQUFMLEdBQXlCRyxLQUF6QjtBQUNGLEdBWks7QUFjTkMsRUFBQUEsYUFBYSxFQUFFLHVCQUFVQyxLQUFWLEVBQWlCQyxnQkFBakIsRUFBbUM7QUFDL0MsUUFBSSxDQUFDLEtBQUtDLGtCQUFWLEVBQThCO0FBRTlCLFFBQUlDLEtBQUssR0FBR0gsS0FBSyxDQUFDRyxLQUFsQjtBQUNBLFFBQUlDLFNBQVMsR0FBR0QsS0FBSyxDQUFDRSxXQUFOLEdBQW9CQyxHQUFwQixDQUF3QkgsS0FBSyxDQUFDSSxnQkFBTixFQUF4QixDQUFoQjs7QUFFQSxRQUFJLEtBQUtDLE9BQVQsRUFBa0I7QUFDZixVQUFJLENBQUMsS0FBS2IsaUJBQUwsQ0FBdUJjLGdDQUF2QixDQUF3RCxJQUF4RCxDQUFMLEVBQW9FO0FBQ2pFLGFBQUtDLGdCQUFMLENBQXNCUCxLQUF0QjtBQUNGO0FBQ0g7O0FBRUQsUUFBSSxDQUFDLEtBQUtRLGlCQUFWLEVBQTZCO0FBQzFCO0FBQ0Y7O0FBRUQsUUFBSVAsU0FBUyxDQUFDUSxHQUFWLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3RCLFVBQUksQ0FBQyxLQUFLQyxXQUFOLElBQXFCYixLQUFLLENBQUNjLE1BQU4sS0FBaUIsS0FBS0MsSUFBL0MsRUFBcUQ7QUFDbEQsWUFBSUMsV0FBVyxHQUFHLElBQUl6QixFQUFFLENBQUMwQixLQUFILENBQVNDLFVBQWIsQ0FBd0JsQixLQUFLLENBQUNtQixVQUFOLEVBQXhCLEVBQTRDbkIsS0FBSyxDQUFDb0IsT0FBbEQsQ0FBbEI7QUFDQUosUUFBQUEsV0FBVyxDQUFDSyxJQUFaLEdBQW1COUIsRUFBRSxDQUFDK0IsSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxZQUFyQztBQUNBUixRQUFBQSxXQUFXLENBQUNiLEtBQVosR0FBb0JILEtBQUssQ0FBQ0csS0FBMUI7QUFDQWEsUUFBQUEsV0FBVyxDQUFDUyxRQUFaLEdBQXVCLElBQXZCO0FBQ0F6QixRQUFBQSxLQUFLLENBQUNjLE1BQU4sQ0FBYVksYUFBYixDQUEyQlYsV0FBM0I7QUFDQSxhQUFLSCxXQUFMLEdBQW1CLElBQW5CO0FBQ0Y7QUFDSDs7QUFDRCxTQUFLYyw0QkFBTCxDQUFrQzNCLEtBQWxDO0FBQ0Y7QUF6Q0ssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xuICAgZXh0ZW5kczogY2MuU2Nyb2xsVmlldyxcblxuICAgcHJvcGVydGllczoge1xuICAgICAgbV9PdXRlclNjcm9sbFZpZXc6IHtcbiAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgIH1cbiAgIH0sXG5cbiAgIHNldE91dGVyU2Nyb2xsVmlldyhvdXRlcikge1xuICAgICAgdGhpcy5tX091dGVyU2Nyb2xsVmlldyA9IG91dGVyO1xuICAgfSxcblxuICAgX29uVG91Y2hNb3ZlZDogZnVuY3Rpb24gKGV2ZW50LCBjYXB0dXJlTGlzdGVuZXJzKSB7XG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZEluSGllcmFyY2h5KSByZXR1cm47XG5cbiAgICAgIHZhciB0b3VjaCA9IGV2ZW50LnRvdWNoO1xuICAgICAgdmFyIGRlbHRhTW92ZSA9IHRvdWNoLmdldExvY2F0aW9uKCkuc3ViKHRvdWNoLmdldFN0YXJ0TG9jYXRpb24oKSk7XG5cbiAgICAgIGlmICh0aGlzLmNvbnRlbnQpIHtcbiAgICAgICAgIGlmICghdGhpcy5tX091dGVyU2Nyb2xsVmlldy5pc0RpZmZlcmVudEJldHdlZW5TZXR0aW5nQW5kUGxhbih0aGlzKSkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlTW92ZUxvZ2ljKHRvdWNoKTtcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmNhbmNlbElubmVyRXZlbnRzKSB7XG4gICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWx0YU1vdmUubWFnKCkgPiA3KSB7XG4gICAgICAgICBpZiAoIXRoaXMuX3RvdWNoTW92ZWQgJiYgZXZlbnQudGFyZ2V0ICE9PSB0aGlzLm5vZGUpIHtcbiAgICAgICAgICAgIHZhciBjYW5jZWxFdmVudCA9IG5ldyBjYy5FdmVudC5FdmVudFRvdWNoKGV2ZW50LmdldFRvdWNoZXMoKSwgZXZlbnQuYnViYmxlcyk7XG4gICAgICAgICAgICBjYW5jZWxFdmVudC50eXBlID0gY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfQ0FOQ0VMO1xuICAgICAgICAgICAgY2FuY2VsRXZlbnQudG91Y2ggPSBldmVudC50b3VjaDtcbiAgICAgICAgICAgIGNhbmNlbEV2ZW50LnNpbXVsYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGNhbmNlbEV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMuX3RvdWNoTW92ZWQgPSB0cnVlO1xuICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fc3RvcFByb3BhZ2F0aW9uSWZUYXJnZXRJc01lKGV2ZW50KTtcbiAgIH1cbn0pO1xuIl19