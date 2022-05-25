"use strict";
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