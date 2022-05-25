"use strict";
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