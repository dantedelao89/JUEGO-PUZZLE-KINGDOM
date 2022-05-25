
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/script/control/control');
require('./assets/script/core-game/category_list');
require('./assets/script/core-game/game_flow');
require('./assets/script/core-game/game_mechanic');
require('./assets/script/core-game/map_visual');
require('./assets/script/core-game/settings');
require('./assets/script/core-game/tutorial');
require('./assets/script/levels/level_manager');
require('./assets/script/services/analytic');
require('./assets/script/services/audio');
require('./assets/script/services/extra-components/NestableScrollView_Inner');
require('./assets/script/services/extra-components/NestableScrollView_Outer');
require('./assets/script/services/extra-components/visible_frame_collider_comp');
require('./assets/script/services/inter_ad');
require('./assets/script/services/utils/free_button_comp');
require('./assets/script/services/utils/utils_anim_fx');
require('./assets/script/services/utils/utils_common');
require('./assets/script/services/utils/utils_coordinate');
require('./assets/script/services/utils/utils_data');
require('./assets/script/services/utils/utils_time');
require('./assets/script/services/utils/utils_ui');
require('./assets/script/services/utils_facebook');
require('./assets/script/services/video');
require('./assets/script/social/message');
require('./assets/script/social/share');
require('./assets/script/social/social');
require('./assets/script/system/all_modules');
require('./assets/script/system/app_events');
require('./assets/script/system/configurations/config_game');
require('./assets/script/system/configurations/system_types');
require('./assets/script/system/localization/language-files/ar_AR');
require('./assets/script/system/localization/language-files/de_DE');
require('./assets/script/system/localization/language-files/en_US');
require('./assets/script/system/localization/language-files/es_ES');
require('./assets/script/system/localization/language-files/fr_FR');
require('./assets/script/system/localization/language-files/id_ID');
require('./assets/script/system/localization/language-files/it_IT');
require('./assets/script/system/localization/language-files/pt_PT');
require('./assets/script/system/localization/language-files/th_TH');
require('./assets/script/system/localization/language-files/tr_TR');
require('./assets/script/system/localization/language-files/vi_VN');
require('./assets/script/system/localization/localize');
require('./assets/script/system/localization/localize_message');
require('./assets/script/system/project_init_comp');
require('./assets/script/system/resources_manager');
require('./assets/script/system/ui-fx/bind_button_handlers');
require('./assets/script/system/ui-fx/core_fx');
require('./assets/script/system/ui-fx/core_ui');
require('./assets/script/system/user');
require('./assets/script/system_data/system_data');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/de_DE.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7191ezpsclCrZGFy0VpGGQK', 'de_DE');
// script/system/localization/language-files/de_DE.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'TEILEN',
    common_label_reward: 'BELOHNUNG',
    common_label_claim: 'BEHAUPTE',
    common_label_button_play: 'SPIEL',
    common_label_level_intro: 'LEVEL',
    label_loading_ad: 'Anzeigen werden geladen. Bitte warten',
    label_game_loading: 'LADEN',
    label_game_continue: 'WEITER',
    label_game_play_more_puzzle: 'MEHR RÄTSEL',
    label_gameplay_select_difficulty: 'SCHWIERIGKEIT WÄHLEN:',
    label_fx_video_error: 'Video-Fehler',
    label_settings_music: 'MUSIK',
    label_settings_sound: 'SOUNDS',
    label_tut_step_1: "Klicke auf zwei Figuren,\num sie zu bewegen und\nrichtig zu platzieren",
    label_tut_step_2: function () { return "Klicke hier und zahle " + _G.configGame.hintCoinPrice + "  <img src=\"icon_coin\" width=40 height=40/>,\num ein paar Teile zu l\u00F6sen."; },
    label_tut_step_3: "Das Zeitlimit f\u00FCr\njedes R\u00E4tsel h\u00E4ngt von der\nAnzahl der Teile ab.\n\nLass sie nicht ablaufen!",
    label_tut_btn_continue: 'WEITER',
    label_alert_intro: "SEHEN SIE SICH DAS\nVIDEO AN, UM " + _G.configGame.videoCoinReward + " M\u00DCNZEN\nZU VERDIENEN",
    label_alert_back: 'NICHT',
    label_alert_earn_stars: 'JA',
    label_level_up_header: 'NEUES LEVEL!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'WILLST DU\nDAS SPIEL\nFORTSETZEN?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'SPIEL VORBEI',
    label_gameover_score_intro: 'PUNKTESTAND:',
    label_gameover_btn_try_again: 'ERNEUT VERSUCHEN',
    label_gameover_no_thanks: 'NEIN, DANKE',
    label_home_button_play_w_friends: 'MIT FREUNDEN\nSPIELEN',
    label_share_intro_1: 'Können Sie mich schlagen?',
    label_share_intro_2: 'PUNKTESTAND:',
    label_win_well_done: 'Gut gemacht!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Lädt Sie ein, das Rätsel zu lösen!`,
    fb_invite_message_text: function (playerName) { return "Ich lade dich ein, dieses R\u00E4tsel zu l\u00F6sen"; },
    fb_invite_message_cta: 'SPIEL',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9kZV9ERS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFFBQVE7SUFDNUIsbUJBQW1CLEVBQUUsV0FBVztJQUNoQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7SUFFekQsa0JBQWtCLEVBQUUsT0FBTztJQUMzQixtQkFBbUIsRUFBRSxRQUFRO0lBQzdCLDJCQUEyQixFQUFFLGFBQWE7SUFDMUMsZ0NBQWdDLEVBQUUsdUJBQXVCO0lBRXpELG9CQUFvQixFQUFFLGNBQWM7SUFFcEMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxRQUFRO0lBRTlCLGdCQUFnQixFQUFFLHdFQUF3RTtJQUMxRixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsMkJBQXlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxxRkFBMkUsRUFBL0gsQ0FBK0g7SUFDdkosZ0JBQWdCLEVBQUUsZ0hBQWlHO0lBQ25ILHNCQUFzQixFQUFFLFFBQVE7SUFFaEMsaUJBQWlCLEVBQUUsc0NBQW9DLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSwrQkFBdUI7SUFDM0csZ0JBQWdCLEVBQUUsT0FBTztJQUN6QixzQkFBc0IsRUFBRSxJQUFJO0lBRTVCLHFCQUFxQixFQUFFLGNBQWM7SUFDckMseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLG1DQUFtQztJQUN0RCxrQkFBa0IsRUFBRSxPQUFPO0lBRTNCLHFCQUFxQixFQUFFLGNBQWM7SUFDckMsMEJBQTBCLEVBQUUsY0FBYztJQUMxQyw0QkFBNEIsRUFBRSxrQkFBa0I7SUFDaEQsd0JBQXdCLEVBQUUsYUFBYTtJQUV2QyxnQ0FBZ0MsRUFBRSx1QkFBdUI7SUFFekQsbUJBQW1CLEVBQUUsMkJBQTJCO0lBQ2hELG1CQUFtQixFQUFFLGNBQWM7SUFFbkMsbUJBQW1CLEVBQUUsY0FBYztJQUVuQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFJRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDRGQUE0RjtJQUM1RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHFEQUEyQyxFQUEzQyxDQUEyQztJQUNqRixxQkFBcUIsRUFBRSxPQUFPO0NBRWhDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ1RFSUxFTicsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnQkVMT0hOVU5HJyxcbiAgIGNvbW1vbl9sYWJlbF9jbGFpbTogJ0JFSEFVUFRFJyxcbiAgIGNvbW1vbl9sYWJlbF9idXR0b25fcGxheTogJ1NQSUVMJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ0xFVkVMJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0FuemVpZ2VuIHdlcmRlbiBnZWxhZGVuLiBCaXR0ZSB3YXJ0ZW4nLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdMQURFTicsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAnV0VJVEVSJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ01FSFIgUsOEVFNFTCcsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1NDSFdJRVJJR0tFSVQgV8OESExFTjonLFxuXG4gICBsYWJlbF9meF92aWRlb19lcnJvcjogJ1ZpZGVvLUZlaGxlcicsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUsnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTT1VORFMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgS2xpY2tlIGF1ZiB6d2VpIEZpZ3VyZW4sXFxudW0gc2llIHp1IGJld2VnZW4gdW5kXFxucmljaHRpZyB6dSBwbGF0emllcmVuYCxcbiAgIGxhYmVsX3R1dF9zdGVwXzI6ICgpID0+IGBLbGlja2UgaGllciB1bmQgemFobGUgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9ICA8aW1nIHNyYz1cImljb25fY29pblwiIHdpZHRoPTQwIGhlaWdodD00MC8+LFxcbnVtIGVpbiBwYWFyIFRlaWxlIHp1IGzDtnNlbi5gLCAgLy8gdGhpcyBsYWJlbCBpcyBSaWNoVGV4dC4gXCJpY29uX2NvaW5cIiBpcyBzcHJpdGUgbmFtZSBpbiB0aGUgbGlua2VkIGF0bGFzLlxuICAgbGFiZWxfdHV0X3N0ZXBfMzogYERhcyBaZWl0bGltaXQgZsO8clxcbmplZGVzIFLDpHRzZWwgaMOkbmd0IHZvbiBkZXJcXG5BbnphaGwgZGVyIFRlaWxlIGFiLlxcblxcbkxhc3Mgc2llIG5pY2h0IGFibGF1ZmVuIWAsXG4gICBsYWJlbF90dXRfYnRuX2NvbnRpbnVlOiAnV0VJVEVSJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGBTRUhFTiBTSUUgU0lDSCBEQVNcXG5WSURFTyBBTiwgVU0gJHtfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZH0gTcOcTlpFTlxcblpVIFZFUkRJRU5FTmAsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAnTklDSFQnLFxuICAgbGFiZWxfYWxlcnRfZWFybl9zdGFyczogJ0pBJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTkVVRVMgTEVWRUwhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnV0lMTFNUIERVXFxuREFTIFNQSUVMXFxuRk9SVFNFVFpFTj8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAnUEFVU0UnLFxuXG4gICBsYWJlbF9nYW1lb3Zlcl9oZWFkZXI6ICdTUElFTCBWT1JCRUknLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdQVU5LVEVTVEFORDonLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ0VSTkVVVCBWRVJTVUNIRU4nLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTkVJTiwgREFOS0UnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ01JVCBGUkVVTkRFTlxcblNQSUVMRU4nLFxuXG4gICBsYWJlbF9zaGFyZV9pbnRyb18xOiAnS8O2bm5lbiBTaWUgbWljaCBzY2hsYWdlbj8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1BVTktURVNUQU5EOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdHdXQgZ2VtYWNodCEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IEzDpGR0IFNpZSBlaW4sIGRhcyBSw6R0c2VsIHp1IGzDtnNlbiFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgSWNoIGxhZGUgZGljaCBlaW4sIGRpZXNlcyBSw6R0c2VsIHp1IGzDtnNlbmAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdTUElFTCcsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/map_visual.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8e0baH2ZLtGQb52+gG4oZRe', 'map_visual');
// script/core-game/map_visual.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapVisual = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var FRAME_WIDTH = 620;
var FRAME_HEIGHT = 775;
var ORG_FRAME_SIZE = 800;
var FRAME_SCALE = FRAME_WIDTH / ORG_FRAME_SIZE;
exports.mapVisual = {
    mainFrameWidth: FRAME_WIDTH,
    gridNode: null,
    fullPicNode: null,
    currentMaxCellX: 3,
    currentMaxCellY: 3,
    currentCellWidth: 100,
    currentCellHeight: 100,
    avatarSpriteFrame: null,
    isRealAvatarLoaded: false,
    init: function () {
        this.gridNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid');
        this.fullPicNode = cc.find('Canvas/sample_nodes/full_picture');
        var rootAvatarNode = cc.find('avatar', this.fullPicNode);
        this.avatarSpriteFrame = rootAvatarNode.getComponent(cc.Sprite).spriteFrame;
        this.fillAvatarPicture(rootAvatarNode);
    },
    fillAvatarPicture: function (rootAvatarNode) {
        var _this = this;
        if (window['FBInstant']) {
            var avatarUrl = FBInstant.player.getPhoto();
            _G.utilsUI.setNodeSpriteFromUrl(rootAvatarNode, avatarUrl, function (texture) {
                _this.isRealAvatarLoaded = true;
                var newSFrame = new cc.SpriteFrame(texture);
                _this.avatarSpriteFrame = newSFrame;
                _G.utilsUI.setNodeSprite(cc.find('Canvas/sample_nodes/sample_frame_cell/mask/avatar'), newSFrame);
                // const fillAvatarAsSample = (realAvatarNode, sampleAvatarNode) => {
                //    _G.utilsUI.setNodeSprite(realAvatarNode, newSFrame);
                //    _.setTimeout(() => {
                //       const smallerSampleSize = _.min(sampleAvatarNode.width, sampleAvatarNode.height);
                //       realAvatarNode.scale = _.max(smallerSampleSize / realAvatarNode.width, smallerSampleSize / realAvatarNode.height);
                //    });
                // };
                // top avatar
                // const topAvatarNode = cc.find('user_bar/avatar_mask/avatar', _G.coreUI.headerContainer);
                // const sampleAvatarNode = cc.find('sample_avatar', topAvatarNode.parent);
                // fillAvatarAsSample(topAvatarNode, sampleAvatarNode);
                _G.categoryList.setupAllFrameAvatars();
            });
        }
    },
    clearMap: function (callback) {
        var _this = this;
        _G.coreFX.hideGrid(function () {
            _this.gridNode.removeAllChildren();
            if (callback)
                callback();
        });
    },
    render: function (levelInfo, callback) {
        var _a = levelInfo.maxCellX, maxCellX = _a === void 0 ? 3 : _a, _b = levelInfo.maxCellY, maxCellY = _b === void 0 ? 3 : _b, categoryName = levelInfo.categoryName, frameName = levelInfo.frameName;
        var frameNode = cc.find('frame', this.fullPicNode);
        // handle the fullPic
        if (categoryName && frameName) {
            if (categoryName != 'tutorial') {
                var sFrame = _G.resources.frameSprites[categoryName][frameName];
                _G.utilsUI.setNodeSprite(frameNode, sFrame);
            }
            this.setAvatar(categoryName, frameName, frameNode); // setup avatar
        }
        var sampleNode = cc.find('Canvas/sample_nodes/cell');
        this.currentMaxCellX = maxCellX;
        this.currentMaxCellY = maxCellY;
        this.currentCellWidth = FRAME_WIDTH / maxCellX;
        this.currentCellHeight = FRAME_HEIGHT / maxCellX;
        for (var x = 1; x <= maxCellX; x++) {
            for (var y = 1; y <= maxCellY; y++) {
                var newCellNode = _.copyNode(sampleNode, this.gridNode);
                newCellNode.name = x + '_' + y;
                newCellNode.orgCellPos = { x: x, y: y };
                // set up the frame node
                newCellNode.width = this.currentCellWidth;
                newCellNode.height = this.currentCellHeight;
                var cellPicNode = _.copyNode(this.fullPicNode, cc.find('mask', newCellNode));
                this.setCellNodePos(newCellNode, x, y, true);
                cellPicNode.position = newCellNode.position.mul(-1);
                _G.control.bindCellTap(newCellNode); // bind control
                // handle the mask size manually (widgets cause performance slowdown)
                var maskNode = cc.find('mask', newCellNode);
                maskNode.width = newCellNode.width - 4;
                maskNode.height = newCellNode.height - 4;
                // handle the hint-glow
                var glowNode = cc.find('border_highlight/hint_glow', newCellNode);
                glowNode.width = newCellNode.width * 1.33;
                glowNode.height = newCellNode.height + newCellNode.width * 0.33;
            }
        }
        if (callback)
            callback();
    },
    // adjust avatar position, size, angle from level.avatar_info
    setAvatar: function (categoryName, frameName, frameNode, avatarNode, frameScale, frameSize) {
        if (frameScale === void 0) { frameScale = FRAME_SCALE; }
        if (frameSize === void 0) { frameSize = FRAME_WIDTH; }
        avatarNode = avatarNode || cc.find('avatar', this.fullPicNode);
        var avatarInfo = _G.levelManager.getAvatarInfo(categoryName, frameName);
        if (categoryName == 'tutorial')
            avatarInfo = _G.tutorial.frameAvatarInfo;
        var aCorrectX, aCorrectY;
        if (avatarNode.width < avatarNode.height) {
            avatarNode.anchorX = 0;
            avatarNode.anchorY = 0.5 * (1 + avatarNode.width / avatarNode.height);
        }
        else {
            avatarNode.anchorY = 1;
            avatarNode.anchorX = 0.5 * (1 - avatarNode.height / avatarNode.width);
        }
        var _a = [avatarInfo.width, avatarInfo.height, avatarInfo.x, avatarInfo.y].map(function (factor) { return factor * frameScale; }), aWidth = _a[0], aHeight = _a[1], aX = _a[2], aY = _a[3];
        avatarNode.scale = _.max(aWidth / avatarNode.width, aHeight / avatarNode.height);
        aCorrectX = aX - frameSize / 2;
        aCorrectY = frameNode.height / 2 - aY;
        avatarNode.setPosition(aCorrectX, aCorrectY);
        // set the correct angle
        avatarNode.x += avatarNode.width * avatarNode.scale * (0.5 - avatarNode.anchorX);
        avatarNode.y += avatarNode.height * avatarNode.scale * (0.5 - avatarNode.anchorY);
        avatarNode.anchorX = avatarNode.anchorY = 0.5;
        avatarNode.angle = avatarInfo.angle || 0;
    },
    setCellNodePos: function (cellNode, cellX, cellY, isInit) {
        if (isInit === void 0) { isInit = false; }
        cellNode.setPosition(this.cellPosToCoordinate(cellX, cellY));
        cellNode.cellPos = { x: cellX, y: cellY };
        if (!isInit)
            _G.gameMechanic.checkCellInCorrectPos(cellNode);
    },
    swapCellAnim: function (cellNode1, cellNode2, callback) {
        var _this = this;
        _G.mapVisual.bringCellsToTop(cellNode1, cellNode2);
        var tmpCellPos = cellNode1.cellPos;
        var coord1 = this.cellPosToCoordinate(cellNode1.cellPos.x, cellNode1.cellPos.y);
        var coord2 = this.cellPosToCoordinate(cellNode2.cellPos.x, cellNode2.cellPos.y);
        var speed = 1200;
        var distance = coord1.sub(coord2).mag();
        var fxTime = distance / speed;
        var scaleTween = cc.tween().to(fxTime * 0.2, { scale: 1.1 }).delay(fxTime * 0.6).to(fxTime * 0.2, { scale: 1 });
        scaleTween.clone(cellNode1).start();
        scaleTween.clone(cellNode2).start();
        cc.tween(cellNode1).to(fxTime, { position: coord2 }).start();
        cc.tween(cellNode2).to(fxTime, { position: coord1 }).start();
        _G.audio.playSound('card-swap');
        _.setTimeout(function () {
            _this.setCellNodePos(cellNode1, cellNode2.cellPos.x, cellNode2.cellPos.y);
            _this.setCellNodePos(cellNode2, tmpCellPos.x, tmpCellPos.y);
            if (callback)
                callback();
        }, fxTime * 1000);
    },
    bringCellsToTop: function () {
        var cellNodeArr = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cellNodeArr[_i] = arguments[_i];
        }
        this.gridNode.children.map(function (cellNode) {
            cellNode.zIndex = cellNodeArr.includes(cellNode) ? 2 : 1;
        });
    },
    // ====================================
    // ===== SUPPORTIVE
    cellPosToCoordinate: function (cellX, cellY) {
        return cc.v2((cellX - (this.currentMaxCellX + 1) / 2) * this.currentCellWidth, (cellY - (this.currentMaxCellY + 1) / 2) * this.currentCellHeight);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL21hcF92aXN1YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBQ3pCLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUMzQixJQUFNLFdBQVcsR0FBRyxXQUFXLEdBQUcsY0FBYyxDQUFDO0FBRXBDLFFBQUEsU0FBUyxHQUFHO0lBQ3RCLGNBQWMsRUFBRSxXQUFXO0lBQzNCLFFBQVEsRUFBRSxJQUFlO0lBQ3pCLFdBQVcsRUFBRSxJQUFlO0lBRTVCLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGVBQWUsRUFBRSxDQUFDO0lBQ2xCLGdCQUFnQixFQUFFLEdBQUc7SUFDckIsaUJBQWlCLEVBQUUsR0FBRztJQUN0QixpQkFBaUIsRUFBRSxJQUFzQjtJQUN6QyxrQkFBa0IsRUFBRSxLQUFLO0lBRXpCLElBQUk7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMkVBQTJFLENBQUMsQ0FBQztRQUNyRyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUMvRCxJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUU1RSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGlCQUFpQixZQUFDLGNB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RyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxDQUFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFHRCx1Q0FBdUM7SUFDdkMsbUJBQW1CO0lBRW5CLG1CQUFtQixZQUFDLEtBQUssRUFBRSxLQUFLO1FBQzdCLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FDVCxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUNoRSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUNuRSxDQUFDO0lBQ0wsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgRlJBTUVfV0lEVEggPSA2MjA7XG5jb25zdCBGUkFNRV9IRUlHSFQgPSA3NzU7XG5jb25zdCBPUkdfRlJBTUVfU0laRSA9IDgwMDtcbmNvbnN0IEZSQU1FX1NDQUxFID0gRlJBTUVfV0lEVEggLyBPUkdfRlJBTUVfU0laRTtcblxuZXhwb3J0IGNvbnN0IG1hcFZpc3VhbCA9IHtcbiAgIG1haW5GcmFtZVdpZHRoOiBGUkFNRV9XSURUSCxcbiAgIGdyaWROb2RlOiBudWxsIGFzIGNjLk5vZGUsXG4gICBmdWxsUGljTm9kZTogbnVsbCBhcyBjYy5Ob2RlLFxuXG4gICBjdXJyZW50TWF4Q2VsbFg6IDMsXG4gICBjdXJyZW50TWF4Q2VsbFk6IDMsXG4gICBjdXJyZW50Q2VsbFdpZHRoOiAxMDAsXG4gICBjdXJyZW50Q2VsbEhlaWdodDogMTAwLFxuICAgYXZhdGFyU3ByaXRlRnJhbWU6IG51bGwgYXMgY2MuU3ByaXRlRnJhbWUsXG4gICBpc1JlYWxBdmF0YXJMb2FkZWQ6IGZhbHNlLFxuXG4gICBpbml0KCkge1xuICAgICAgdGhpcy5ncmlkTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9ncmlkX3N0YWNrL2dyaWQnKTtcbiAgICAgIHRoaXMuZnVsbFBpY05vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL2Z1bGxfcGljdHVyZScpO1xuICAgICAgY29uc3Qgcm9vdEF2YXRhck5vZGUgPSBjYy5maW5kKCdhdmF0YXInLCB0aGlzLmZ1bGxQaWNOb2RlKTtcbiAgICAgIHRoaXMuYXZhdGFyU3ByaXRlRnJhbWUgPSByb290QXZhdGFyTm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZTtcblxuICAgICAgdGhpcy5maWxsQXZhdGFyUGljdHVyZShyb290QXZhdGFyTm9kZSk7XG4gICB9LFxuXG4gICBmaWxsQXZhdGFyUGljdHVyZShyb290QXZhdGFyTm9kZSkge1xuICAgICAgaWYgKHdpbmRvd1snRkJJbnN0YW50J10pIHtcbiAgICAgICAgIGNvbnN0IGF2YXRhclVybCA9IEZCSW5zdGFudC5wbGF5ZXIuZ2V0UGhvdG8oKTtcbiAgICAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZUZyb21Vcmwocm9vdEF2YXRhck5vZGUsIGF2YXRhclVybCwgKHRleHR1cmUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFsQXZhdGFyTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1NGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXh0dXJlKTtcbiAgICAgICAgICAgIHRoaXMuYXZhdGFyU3ByaXRlRnJhbWUgPSBuZXdTRnJhbWU7XG4gICAgICAgICAgICBfRy51dGlsc1VJLnNldE5vZGVTcHJpdGUoY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy9zYW1wbGVfZnJhbWVfY2VsbC9tYXNrL2F2YXRhcicpLCBuZXdTRnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBjb25zdCBmaWxsQXZhdGFyQXNTYW1wbGUgPSAocmVhbEF2YXRhck5vZGUsIHNhbXBsZUF2YXRhck5vZGUpID0+IHtcbiAgICAgICAgICAgIC8vICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShyZWFsQXZhdGFyTm9kZSwgbmV3U0ZyYW1lKTtcbiAgICAgICAgICAgIC8vICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICBjb25zdCBzbWFsbGVyU2FtcGxlU2l6ZSA9IF8ubWluKHNhbXBsZUF2YXRhck5vZGUud2lkdGgsIHNhbXBsZUF2YXRhck5vZGUuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vICAgICAgIHJlYWxBdmF0YXJOb2RlLnNjYWxlID0gXy5tYXgoc21hbGxlclNhbXBsZVNpemUgLyByZWFsQXZhdGFyTm9kZS53aWR0aCwgc21hbGxlclNhbXBsZVNpemUgLyByZWFsQXZhdGFyTm9kZS5oZWlnaHQpO1xuICAgICAgICAgICAgLy8gICAgfSk7XG4gICAgICAgICAgICAvLyB9O1xuXG4gICAgICAgICAgICAvLyB0b3AgYXZhdGFyXG4gICAgICAgICAgICAvLyBjb25zdCB0b3BBdmF0YXJOb2RlID0gY2MuZmluZCgndXNlcl9iYXIvYXZhdGFyX21hc2svYXZhdGFyJywgX0cuY29yZVVJLmhlYWRlckNvbnRhaW5lcik7XG4gICAgICAgICAgICAvLyBjb25zdCBzYW1wbGVBdmF0YXJOb2RlID0gY2MuZmluZCgnc2FtcGxlX2F2YXRhcicsIHRvcEF2YXRhck5vZGUucGFyZW50KTtcbiAgICAgICAgICAgIC8vIGZpbGxBdmF0YXJBc1NhbXBsZSh0b3BBdmF0YXJOb2RlLCBzYW1wbGVBdmF0YXJOb2RlKTtcblxuICAgICAgICAgICAgX0cuY2F0ZWdvcnlMaXN0LnNldHVwQWxsRnJhbWVBdmF0YXJzKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgY2xlYXJNYXAoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgX0cuY29yZUZYLmhpZGVHcmlkKCgpID0+IHtcbiAgICAgICAgIHRoaXMuZ3JpZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgfSxcblxuXG4gICByZW5kZXIobGV2ZWxJbmZvLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCB7IG1heENlbGxYID0gMywgbWF4Q2VsbFkgPSAzLCBjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSB9ID0gbGV2ZWxJbmZvO1xuICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCB0aGlzLmZ1bGxQaWNOb2RlKTtcblxuICAgICAgLy8gaGFuZGxlIHRoZSBmdWxsUGljXG4gICAgICBpZiAoY2F0ZWdvcnlOYW1lICYmIGZyYW1lTmFtZSkge1xuICAgICAgICAgaWYgKGNhdGVnb3J5TmFtZSAhPSAndHV0b3JpYWwnKSB7XG4gICAgICAgICAgICBjb25zdCBzRnJhbWUgPSBfRy5yZXNvdXJjZXMuZnJhbWVTcHJpdGVzW2NhdGVnb3J5TmFtZV1bZnJhbWVOYW1lXTtcbiAgICAgICAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShmcmFtZU5vZGUsIHNGcmFtZSk7XG4gICAgICAgICB9XG4gICAgICAgICB0aGlzLnNldEF2YXRhcihjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSwgZnJhbWVOb2RlKTsgLy8gc2V0dXAgYXZhdGFyXG4gICAgICB9XG5cblxuICAgICAgY29uc3Qgc2FtcGxlTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9zYW1wbGVfbm9kZXMvY2VsbCcpO1xuXG4gICAgICB0aGlzLmN1cnJlbnRNYXhDZWxsWCA9IG1heENlbGxYO1xuICAgICAgdGhpcy5jdXJyZW50TWF4Q2VsbFkgPSBtYXhDZWxsWTtcbiAgICAgIHRoaXMuY3VycmVudENlbGxXaWR0aCA9IEZSQU1FX1dJRFRIIC8gbWF4Q2VsbFg7XG4gICAgICB0aGlzLmN1cnJlbnRDZWxsSGVpZ2h0ID0gRlJBTUVfSEVJR0hUIC8gbWF4Q2VsbFg7XG5cbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDw9IG1heENlbGxYOyB4KyspIHtcbiAgICAgICAgIGZvciAobGV0IHkgPSAxOyB5IDw9IG1heENlbGxZOyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0NlbGxOb2RlID0gXy5jb3B5Tm9kZShzYW1wbGVOb2RlLCB0aGlzLmdyaWROb2RlKTtcbiAgICAgICAgICAgIG5ld0NlbGxOb2RlLm5hbWUgPSB4ICsgJ18nICsgeTtcbiAgICAgICAgICAgIG5ld0NlbGxOb2RlLm9yZ0NlbGxQb3MgPSB7IHgsIHkgfTtcblxuICAgICAgICAgICAgLy8gc2V0IHVwIHRoZSBmcmFtZSBub2RlXG4gICAgICAgICAgICBuZXdDZWxsTm9kZS53aWR0aCA9IHRoaXMuY3VycmVudENlbGxXaWR0aDtcbiAgICAgICAgICAgIG5ld0NlbGxOb2RlLmhlaWdodCA9IHRoaXMuY3VycmVudENlbGxIZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBjZWxsUGljTm9kZSA9IF8uY29weU5vZGUodGhpcy5mdWxsUGljTm9kZSwgY2MuZmluZCgnbWFzaycsIG5ld0NlbGxOb2RlKSk7XG4gICAgICAgICAgICB0aGlzLnNldENlbGxOb2RlUG9zKG5ld0NlbGxOb2RlLCB4LCB5LCB0cnVlKTtcbiAgICAgICAgICAgIGNlbGxQaWNOb2RlLnBvc2l0aW9uID0gbmV3Q2VsbE5vZGUucG9zaXRpb24ubXVsKC0xKTtcblxuXG4gICAgICAgICAgICBfRy5jb250cm9sLmJpbmRDZWxsVGFwKG5ld0NlbGxOb2RlKTsgLy8gYmluZCBjb250cm9sXG5cbiAgICAgICAgICAgIC8vIGhhbmRsZSB0aGUgbWFzayBzaXplIG1hbnVhbGx5ICh3aWRnZXRzIGNhdXNlIHBlcmZvcm1hbmNlIHNsb3dkb3duKVxuICAgICAgICAgICAgY29uc3QgbWFza05vZGUgPSBjYy5maW5kKCdtYXNrJywgbmV3Q2VsbE5vZGUpO1xuICAgICAgICAgICAgbWFza05vZGUud2lkdGggPSBuZXdDZWxsTm9kZS53aWR0aCAtIDQ7XG4gICAgICAgICAgICBtYXNrTm9kZS5oZWlnaHQgPSBuZXdDZWxsTm9kZS5oZWlnaHQgLSA0O1xuXG4gICAgICAgICAgICAvLyBoYW5kbGUgdGhlIGhpbnQtZ2xvd1xuICAgICAgICAgICAgY29uc3QgZ2xvd05vZGUgPSBjYy5maW5kKCdib3JkZXJfaGlnaGxpZ2h0L2hpbnRfZ2xvdycsIG5ld0NlbGxOb2RlKTtcbiAgICAgICAgICAgIGdsb3dOb2RlLndpZHRoID0gbmV3Q2VsbE5vZGUud2lkdGggKiAxLjMzO1xuICAgICAgICAgICAgZ2xvd05vZGUuaGVpZ2h0ID0gbmV3Q2VsbE5vZGUuaGVpZ2h0ICsgbmV3Q2VsbE5vZGUud2lkdGggKiAwLjMzO1xuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICB9LFxuXG5cbiAgIC8vIGFkanVzdCBhdmF0YXIgcG9zaXRpb24sIHNpemUsIGFuZ2xlIGZyb20gbGV2ZWwuYXZhdGFyX2luZm9cbiAgIHNldEF2YXRhcihjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSwgZnJhbWVOb2RlLCBhdmF0YXJOb2RlPzogY2MuTm9kZSwgZnJhbWVTY2FsZSA9IEZSQU1FX1NDQUxFLCBmcmFtZVNpemUgPSBGUkFNRV9XSURUSCkge1xuICAgICAgYXZhdGFyTm9kZSA9IGF2YXRhck5vZGUgfHwgY2MuZmluZCgnYXZhdGFyJywgdGhpcy5mdWxsUGljTm9kZSk7XG4gICAgICBsZXQgYXZhdGFySW5mbyA9IF9HLmxldmVsTWFuYWdlci5nZXRBdmF0YXJJbmZvKGNhdGVnb3J5TmFtZSwgZnJhbWVOYW1lKTtcbiAgICAgIGlmIChjYXRlZ29yeU5hbWUgPT0gJ3R1dG9yaWFsJykgYXZhdGFySW5mbyA9IF9HLnR1dG9yaWFsLmZyYW1lQXZhdGFySW5mbztcblxuICAgICAgbGV0IGFDb3JyZWN0WCwgYUNvcnJlY3RZO1xuICAgICAgaWYgKGF2YXRhck5vZGUud2lkdGggPCBhdmF0YXJOb2RlLmhlaWdodCkge1xuICAgICAgICAgYXZhdGFyTm9kZS5hbmNob3JYID0gMDtcbiAgICAgICAgIGF2YXRhck5vZGUuYW5jaG9yWSA9IDAuNSAqICgxICsgYXZhdGFyTm9kZS53aWR0aCAvIGF2YXRhck5vZGUuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAgYXZhdGFyTm9kZS5hbmNob3JZID0gMTtcbiAgICAgICAgIGF2YXRhck5vZGUuYW5jaG9yWCA9IDAuNSAqICgxIC0gYXZhdGFyTm9kZS5oZWlnaHQgLyBhdmF0YXJOb2RlLndpZHRoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgW2FXaWR0aCwgYUhlaWdodCwgYVgsIGFZXSA9IFthdmF0YXJJbmZvLndpZHRoLCBhdmF0YXJJbmZvLmhlaWdodCwgYXZhdGFySW5mby54LCBhdmF0YXJJbmZvLnldLm1hcChmYWN0b3IgPT4gZmFjdG9yICogZnJhbWVTY2FsZSk7XG4gICAgICBhdmF0YXJOb2RlLnNjYWxlID0gXy5tYXgoYVdpZHRoIC8gYXZhdGFyTm9kZS53aWR0aCwgYUhlaWdodCAvIGF2YXRhck5vZGUuaGVpZ2h0KTtcblxuICAgICAgYUNvcnJlY3RYID0gYVggLSBmcmFtZVNpemUgLyAyO1xuICAgICAgYUNvcnJlY3RZID0gZnJhbWVOb2RlLmhlaWdodCAvIDIgLSBhWTtcbiAgICAgIGF2YXRhck5vZGUuc2V0UG9zaXRpb24oYUNvcnJlY3RYLCBhQ29ycmVjdFkpO1xuXG4gICAgICAvLyBzZXQgdGhlIGNvcnJlY3QgYW5nbGVcbiAgICAgIGF2YXRhck5vZGUueCArPSBhdmF0YXJOb2RlLndpZHRoICogYXZhdGFyTm9kZS5zY2FsZSAqICgwLjUgLSBhdmF0YXJOb2RlLmFuY2hvclgpO1xuICAgICAgYXZhdGFyTm9kZS55ICs9IGF2YXRhck5vZGUuaGVpZ2h0ICogYXZhdGFyTm9kZS5zY2FsZSAqICgwLjUgLSBhdmF0YXJOb2RlLmFuY2hvclkpO1xuICAgICAgYXZhdGFyTm9kZS5hbmNob3JYID0gYXZhdGFyTm9kZS5hbmNob3JZID0gMC41O1xuICAgICAgYXZhdGFyTm9kZS5hbmdsZSA9IGF2YXRhckluZm8uYW5nbGUgfHwgMDtcbiAgIH0sXG5cblxuICAgc2V0Q2VsbE5vZGVQb3MoY2VsbE5vZGUsIGNlbGxYLCBjZWxsWSwgaXNJbml0ID0gZmFsc2UpIHtcbiAgICAgIGNlbGxOb2RlLnNldFBvc2l0aW9uKHRoaXMuY2VsbFBvc1RvQ29vcmRpbmF0ZShjZWxsWCwgY2VsbFkpKTtcbiAgICAgIGNlbGxOb2RlLmNlbGxQb3MgPSB7IHg6IGNlbGxYLCB5OiBjZWxsWSB9O1xuICAgICAgaWYgKCFpc0luaXQpIF9HLmdhbWVNZWNoYW5pYy5jaGVja0NlbGxJbkNvcnJlY3RQb3MoY2VsbE5vZGUpO1xuICAgfSxcblxuICAgc3dhcENlbGxBbmltKGNlbGxOb2RlMTogY2MuTm9kZSwgY2VsbE5vZGUyOiBjYy5Ob2RlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBfRy5tYXBWaXN1YWwuYnJpbmdDZWxsc1RvVG9wKGNlbGxOb2RlMSwgY2VsbE5vZGUyKTtcblxuICAgICAgY29uc3QgdG1wQ2VsbFBvcyA9IGNlbGxOb2RlMS5jZWxsUG9zO1xuICAgICAgY29uc3QgY29vcmQxID0gdGhpcy5jZWxsUG9zVG9Db29yZGluYXRlKGNlbGxOb2RlMS5jZWxsUG9zLngsIGNlbGxOb2RlMS5jZWxsUG9zLnkpO1xuICAgICAgY29uc3QgY29vcmQyID0gdGhpcy5jZWxsUG9zVG9Db29yZGluYXRlKGNlbGxOb2RlMi5jZWxsUG9zLngsIGNlbGxOb2RlMi5jZWxsUG9zLnkpO1xuXG4gICAgICBjb25zdCBzcGVlZCA9IDEyMDA7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IGNvb3JkMS5zdWIoY29vcmQyKS5tYWcoKTtcbiAgICAgIGNvbnN0IGZ4VGltZSA9IGRpc3RhbmNlIC8gc3BlZWQ7XG5cbiAgICAgIGNvbnN0IHNjYWxlVHdlZW4gPSBjYy50d2VlbigpLnRvKGZ4VGltZSAqIDAuMiwgeyBzY2FsZTogMS4xIH0pLmRlbGF5KGZ4VGltZSAqIDAuNikudG8oZnhUaW1lICogMC4yLCB7IHNjYWxlOiAxIH0pXG4gICAgICBzY2FsZVR3ZWVuLmNsb25lKGNlbGxOb2RlMSkuc3RhcnQoKTtcbiAgICAgIHNjYWxlVHdlZW4uY2xvbmUoY2VsbE5vZGUyKS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUxKS50byhmeFRpbWUsIHsgcG9zaXRpb246IGNvb3JkMiB9KS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUyKS50byhmeFRpbWUsIHsgcG9zaXRpb246IGNvb3JkMSB9KS5zdGFydCgpO1xuXG4gICAgICBfRy5hdWRpby5wbGF5U291bmQoJ2NhcmQtc3dhcCcpO1xuXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5zZXRDZWxsTm9kZVBvcyhjZWxsTm9kZTEsIGNlbGxOb2RlMi5jZWxsUG9zLngsIGNlbGxOb2RlMi5jZWxsUG9zLnkpO1xuICAgICAgICAgdGhpcy5zZXRDZWxsTm9kZVBvcyhjZWxsTm9kZTIsIHRtcENlbGxQb3MueCwgdG1wQ2VsbFBvcy55KTtcbiAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgIH0sIGZ4VGltZSAqIDEwMDApO1xuICAgfSxcblxuXG4gICBicmluZ0NlbGxzVG9Ub3AoLi4uY2VsbE5vZGVBcnIpIHtcbiAgICAgIHRoaXMuZ3JpZE5vZGUuY2hpbGRyZW4ubWFwKGNlbGxOb2RlID0+IHtcbiAgICAgICAgIGNlbGxOb2RlLnpJbmRleCA9IGNlbGxOb2RlQXJyLmluY2x1ZGVzKGNlbGxOb2RlKSA/IDIgOiAxO1xuICAgICAgfSlcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyA9PT09PSBTVVBQT1JUSVZFXG5cbiAgIGNlbGxQb3NUb0Nvb3JkaW5hdGUoY2VsbFgsIGNlbGxZKSB7XG4gICAgICByZXR1cm4gY2MudjIoXG4gICAgICAgICAoY2VsbFggLSAodGhpcy5jdXJyZW50TWF4Q2VsbFggKyAxKSAvIDIpICogdGhpcy5jdXJyZW50Q2VsbFdpZHRoLFxuICAgICAgICAgKGNlbGxZIC0gKHRoaXMuY3VycmVudE1heENlbGxZICsgMSkgLyAyKSAqIHRoaXMuY3VycmVudENlbGxIZWlnaHRcbiAgICAgICk7XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/levels/level_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5bfd6qY2MNMIowvpPjCZWfQ', 'level_manager');
// script/levels/level_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.levelManager = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var system_data_1 = require("../system_data/system_data");
exports.levelManager = {
    categoryNameArr: [],
    init: function () {
        var _this = this;
        this.categoryArr.map(function (catInfo) { return _this.categoryNameArr.push(catInfo.id); });
    },
    getAvatarInfo: function (categoryName, frameName) {
        var categoryInfo = this.categoryArr.find(function (catInfo) { return catInfo.id == categoryName; });
        if (!categoryInfo)
            return;
        var avatarInfo = categoryInfo.frameArr.find(function (frameInfo) { return frameInfo.name == frameName; });
        return avatarInfo;
    },
    categoryArr: system_data_1.systemData.categoryArr,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvbGV2ZWxzL2xldmVsX21hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQiwwREFBd0Q7QUFFM0MsUUFBQSxZQUFZLEdBQUc7SUFDekIsZUFBZSxFQUFFLEVBQUU7SUFFbkIsSUFBSTtRQUFKLGlCQUVDO1FBREUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsYUFBYSxZQUFDLFlBQVksRUFBRSxTQUFTO1FBQ2xDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxZQUFZLEVBQTFCLENBQTBCLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDMUIsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sVUFBVSxDQUFDO0lBQ3JCLENBQUM7SUFHRCxXQUFXLEVBQUUsd0JBQVUsQ0FBQyxXQUFXO0NBRXJDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuaW1wb3J0IHsgc3lzdGVtRGF0YSB9IGZyb20gJy4uL3N5c3RlbV9kYXRhL3N5c3RlbV9kYXRhJztcblxuZXhwb3J0IGNvbnN0IGxldmVsTWFuYWdlciA9IHtcbiAgIGNhdGVnb3J5TmFtZUFycjogW10sXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmNhdGVnb3J5QXJyLm1hcChjYXRJbmZvID0+IHRoaXMuY2F0ZWdvcnlOYW1lQXJyLnB1c2goY2F0SW5mby5pZCkpO1xuICAgfSxcblxuICAgZ2V0QXZhdGFySW5mbyhjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgY29uc3QgY2F0ZWdvcnlJbmZvID0gdGhpcy5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSBjYXRlZ29yeU5hbWUpO1xuICAgICAgaWYgKCFjYXRlZ29yeUluZm8pIHJldHVybjtcbiAgICAgIGNvbnN0IGF2YXRhckluZm8gPSBjYXRlZ29yeUluZm8uZnJhbWVBcnIuZmluZChmcmFtZUluZm8gPT4gZnJhbWVJbmZvLm5hbWUgPT0gZnJhbWVOYW1lKTtcbiAgICAgIHJldHVybiBhdmF0YXJJbmZvO1xuICAgfSxcblxuXG4gICBjYXRlZ29yeUFycjogc3lzdGVtRGF0YS5jYXRlZ29yeUFycixcblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_anim_fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e273ec92dRLKKGQF99UI9/D', 'utils_anim_fx');
// script/services/utils/utils_anim_fx.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsAnimFx = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
exports.utilsAnimFx = {
    fxNodePool: {},
    init: function () {
    },
    replayParticle: function (node) {
        if (!node || !node.getComponent(cc.ParticleSystem))
            return;
        node.active = true;
        node.getComponent(cc.ParticleSystem).resetSystem();
    },
    // play a clip attached to animation component of a node
    playNodeAnim: function (node, clipName, repeatTime, isKeepPreviousClip, callback) {
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = false; }
        var animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp)
            return;
        clipName = clipName || (animComp.defaultClip ? animComp.defaultClip.name : '');
        if (!clipName)
            return;
        var animState = animComp[isKeepPreviousClip ? 'playAdditive' : 'play'](clipName);
        if (!animState)
            return;
        animState.repeatCount = (repeatTime == -1 ? Infinity : repeatTime) || 1;
        if (callback)
            animComp.on('finished', function () {
                animComp.off('finished');
                callback();
            });
        return animState;
    },
    playNodeAnimAsSoonAsNodeActive: function (node, clipName, repeatTime, isKeepPreviousClip) {
        var _this = this;
        if (repeatTime === void 0) { repeatTime = 1; }
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = true; }
        var varName = 'waitInterval2PlayAnimWhenActive';
        node[varName] = _.waitToRun(function () {
            if (node[varName])
                clearInterval(node[varName]);
            _this.playNodeAnim(node, clipName, repeatTime, isKeepPreviousClip);
        }, 'activeInHierarchy', node);
    },
    // play a clip attached to animation component of a node
    playNodeAnimArr: function (node, orgClipNameArr, isKeepPreviousClip, callback) {
        var _this = this;
        if (isKeepPreviousClip === void 0) { isKeepPreviousClip = false; }
        if (!node.activeInHierarchy)
            return;
        var animComp = node.getComponent(cc.Animation);
        if (!node.activeInHierarchy || !animComp)
            return;
        var clipNameArr = __spreadArrays(orgClipNameArr);
        animComp.on('finished', function () {
            if (clipNameArr.length)
                _this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip);
            else {
                animComp.off('finished');
                if (callback)
                    callback();
            }
        });
        this.playNodeAnim(node, clipNameArr.shift(), 1, isKeepPreviousClip);
    },
    stopAllNodeAnims: function (node) {
        var animComp = node.getComponent(cc.Animation);
        if (!animComp)
            return;
        animComp.stop();
        animComp.off('finished');
    },
    // reset a node at state of frame 0 of an animation clip
    stopAnimAtFrame0: function (node, clipName) {
        var _this = this;
        var animComp = node.getComponent(cc.Animation);
        animComp.play('ufo_ring_fx');
        _.setTimeout(function () {
            animComp.setCurrentTime(0);
            _this.stopAllNodeAnims(node);
        });
    },
    // subtrack current number from 
    playIncreasingNumberLabel: function (labelNode, oldNumber, addedAmount, updateCount, duration, delayStartTime, template) {
        if (updateCount === void 0) { updateCount = 5; }
        if (duration === void 0) { duration = 0.5; }
        if (delayStartTime === void 0) { delayStartTime = 0; }
        if (template === void 0) { template = 'xxx'; }
        // get current number on label
        var labelComp = labelNode.getComponent(cc.Label);
        var incrementAmount = addedAmount / updateCount;
        var updateDelay = duration / updateCount;
        cc.tween(labelNode).delay(delayStartTime).repeat(updateCount, cc.tween().call(function () {
            oldNumber += incrementAmount;
            var currentNumberStr = _.formatMoney(_.round(oldNumber));
            labelComp.string = template.replace(/xxx/g, currentNumberStr);
            // _.log(` playIncreasingNumberLabel >> currentNumberStr = ${currentNumberStr} // labelComp.string=${labelComp.string} `);
        }).delay(updateDelay)).start();
    },
    // handle node pool
    getNewFxNode: function (sampleNode, fxContainer) {
        if (!sampleNode.nodePoolId)
            sampleNode.nodePoolId = _.getNewUuid();
        if (!this.fxNodePool[sampleNode.nodePoolId])
            this.fxNodePool[sampleNode.nodePoolId] = [];
        var newNode = this.fxNodePool[sampleNode.nodePoolId].pop() || _.copyNode(sampleNode);
        newNode.nodePoolId = sampleNode.nodePoolId;
        newNode.parent = fxContainer || _G.coreFX.fxContainer;
        return newNode;
    },
    saveFxNodeToPool: function (node) {
        node.stopAllActions();
        node.active = false;
        this.fxNodePool[node.nodePoolId].unshift(node);
    },
    // particles fly from node A to node B
    particlesFlyFromA2B: function (sampleNode, nodeA, nodeB, animConfig, fxContainer) {
        var _this = this;
        var defaultParticleFlyA2BConfigs = {
            numberOfNode: 20,
            delayStartTime: 0.05,
            flyDuration: 1,
            randomBezierPointRange: { x: 200, y: 200 },
        };
        var _a = animConfig || defaultParticleFlyA2BConfigs, numberOfNode = _a.numberOfNode, flyDuration = _a.flyDuration, delayStartTime = _a.delayStartTime, randomBezierPointRange = _a.randomBezierPointRange;
        var posDiffVec2 = _.getGlobalPosDiff(nodeA, nodeB);
        var _loop_1 = function (i) {
            var newNode = this_1.getNewFxNode(sampleNode, fxContainer);
            newNode.active = true;
            newNode.opacity = 255;
            _.setGlobalPosToNode(newNode, nodeA);
            var bezierP1 = this_1.getRandomPointInRage(randomBezierPointRange);
            var bezierP2 = this_1.getRandomPointInRage(randomBezierPointRange);
            cc.tween(newNode)
                .delay(i * delayStartTime)
                .bezierBy(flyDuration, bezierP1, bezierP2, posDiffVec2)
                .call(function () { _this.saveFxNodeToPool(newNode); })
                .start();
        };
        var this_1 = this;
        // _.log(` particlesFlyFromA2B >> posDiffVec2 = ${posDiffVec2} // numberOfNode=${numberOfNode}, flyDuration=${flyDuration}, delayTimeEachNode=${delayTimeEachNode} `);
        for (var i = 0; i < numberOfNode; i++) {
            _loop_1(i);
        }
    },
    getRandomPointInRage: function (pointRange) {
        return cc.v2(_.randomNumber(pointRange.x * 2) - pointRange.x, _.randomNumber(pointRange.y * 2) - pointRange.y);
    },
    // fly a node to position of another
    nodeFlyFromAtoB: function (node, targetNode, duration, callback) {
        if (duration === void 0) { duration = 0.3; }
        var diffVec = _.getGlobalPosDiff(node, targetNode);
        cc.tween(node).by(duration, { position: diffVec }).call(function () { return callback && callback(); }).start();
    },
    // ===========================================
    // screenshot a node to get spriteFrame (jpg)
    // *** NOTE: CODE NOT WORKING !!! JUST COPIED FROM ANOTHER PLACE
    captureNodeToTexture: function (targetNode) {
        if (!targetNode.activeInHierarchy)
            targetNode.active = true;
        var cameraNode = new cc.Node();
        targetNode.addChild(cameraNode);
        var cameraComp = cameraNode.addComponent(cc.Camera);
        var texture = new cc.RenderTexture();
        var gl = cc.game._renderContext;
        texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
        cameraComp.targetTexture = texture;
        cameraComp.zoomRatio = 1.3;
        cameraComp.backgroundColor = cc.Color.WHITE;
        cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
        // cameraComp.cullingMask = 0xffffffff;
        var width = texture.width;
        var height = texture.height;
        var _canvas = document.createElement('canvas');
        _canvas.width = width;
        _canvas.height = height;
        var ctx = _canvas.getContext('2d');
        cameraComp.render(targetNode);
        var data = texture.readPixels();
        // write the render data
        var rowBytes = width * 4;
        for (var row = 0; row < height; row++) {
            var srow = height - 1 - row;
            var data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
            var imageData = new ImageData(data2, width, 1);
            ctx.putImageData(imageData, 0, row);
        }
        var dataURL = _canvas.toDataURL("image/jpeg");
        setTimeout(function () {
            targetNode.active = false;
            cameraNode.removeFromParent();
        }, 1000);
        return dataURL;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfYW5pbV9meC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFHRixRQUFBLFdBQVcsR0FBRztJQUN4QixVQUFVLEVBQUUsRUFBRTtJQUVkLElBQUk7SUFFSixDQUFDO0lBR0QsY0FBYyxFQUFkLFVBQWUsSUFBYTtRQUN6QixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDO1lBQUUsT0FBTztRQUMzRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELFlBQVksRUFBWixVQUFhLElBQWEsRUFBRSxRQUFpQixFQUFFLFVBQW1CLEVBQUUsa0JBQTBCLEVBQUUsUUFBbUI7UUFBL0MsbUNBQUEsRUFBQSwwQkFBMEI7UUFDM0YsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQ2pELFFBQVEsR0FBRyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBRXRCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsU0FBUztZQUFFLE9BQU87UUFDdkIsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEUsSUFBSSxRQUFRO1lBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25DLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLFNBQVMsQ0FBQztJQUNwQixDQUFDO0lBRUQsOEJBQThCLEVBQTlCLFVBQStCLElBQWEsRUFBRSxRQUFpQixFQUFFLFVBQWMsRUFBRSxrQkFBeUI7UUFBMUcsaUJBTUM7UUFOZ0UsMkJBQUEsRUFBQSxjQUFjO1FBQUUsbUNBQUEsRUFBQSx5QkFBeUI7UUFDdkcsSUFBTSxPQUFPLEdBQUcsaUNBQWlDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFFLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDckUsQ0FBQyxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFHRCx3REFBd0Q7SUFDeEQsZUFBZSxFQUFmLFVBQWdCLElBQWEsRUFBRSxjQUF5QixFQUFFLGtCQUEwQixFQUFFLFFBQW1CO1FBQXpHLGlCQWFDO1FBYnlELG1DQUFBLEVBQUEsMEJBQTBCO1FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCO1lBQUUsT0FBTztRQUNwQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDakQsSUFBTSxXQUFXLGtCQUFPLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO1lBQ3JCLElBQUksV0FBVyxDQUFDLE1BQU07Z0JBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUN2RjtnQkFDRixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLFFBQVE7b0JBQUUsUUFBUSxFQUFFLENBQUM7YUFDM0I7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsZ0JBQWdCLEVBQWhCLFVBQWlCLElBQWE7UUFDM0IsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQ3RCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCx3REFBd0Q7SUFDeEQsZ0JBQWdCLEVBQWhCLFVBQWlCLElBQWEsRUFBRSxRQUFnQjtRQUFoRCxpQkFPQztRQU5FLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNWLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUdELGdDQUFnQztJQUNoQyx5QkFBeUIsRUFBekIsVUFBMEIsU0FBa0IsRUFBRSxTQUFpQixFQUFFLFdBQW1CLEVBQUUsV0FBZSxFQUFFLFFBQWMsRUFBRSxjQUFrQixFQUFFLFFBQWdCO1FBQXJFLDRCQUFBLEVBQUEsZUFBZTtRQUFFLHlCQUFBLEVBQUEsY0FBYztRQUFFLCtCQUFBLEVBQUEsa0JBQWtCO1FBQUUseUJBQUEsRUFBQSxnQkFBZ0I7UUFDeEosOEJBQThCO1FBQzlCLElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQU0sZUFBZSxHQUFHLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDbEQsSUFBTSxXQUFXLEdBQUcsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUUzQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQzdDLFdBQVcsRUFDWCxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2IsU0FBUyxJQUFJLGVBQWUsQ0FBQztZQUM3QixJQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzNELFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUM5RCwwSEFBMEg7UUFDN0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUN2QixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUdELG1CQUFtQjtJQUNuQixZQUFZLEVBQVosVUFBYSxVQUFtQixFQUFFLFdBQW9CO1FBQ25ELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUFFLFVBQVUsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDekYsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RixPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDM0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxXQUFXLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdEQsT0FBTyxPQUFPLENBQUM7SUFDbEIsQ0FBQztJQUdELGdCQUFnQixFQUFoQixVQUFpQixJQUFhO1FBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUdELHNDQUFzQztJQUN0QyxtQkFBbUIsRUFBbkIsVUFBb0IsVUFBbUIsRUFBRSxLQUFjLEVBQUUsS0FBYyxFQUFFLFVBQWdCLEVBQUUsV0FBcUI7UUFBaEgsaUJBdUJDO1FBdEJFLElBQU0sNEJBQTRCLEdBQUc7WUFDbEMsWUFBWSxFQUFFLEVBQUU7WUFDaEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsV0FBVyxFQUFFLENBQUM7WUFDZCxzQkFBc0IsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtTQUM1QyxDQUFBO1FBQ0ssSUFBQSxLQUF3RSxVQUFVLElBQUksNEJBQTRCLEVBQWhILFlBQVksa0JBQUEsRUFBRSxXQUFXLGlCQUFBLEVBQUUsY0FBYyxvQkFBQSxFQUFFLHNCQUFzQiw0QkFBK0MsQ0FBQztRQUN6SCxJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dDQUU1QyxDQUFDO1lBQ1AsSUFBTSxPQUFPLEdBQUcsT0FBSyxZQUFZLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBTSxRQUFRLEdBQUcsT0FBSyxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ25FLElBQU0sUUFBUSxHQUFHLE9BQUssb0JBQW9CLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDYixLQUFLLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQztpQkFDekIsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQztpQkFDdEQsSUFBSSxDQUFDLGNBQVEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMvQyxLQUFLLEVBQUUsQ0FBQzs7O1FBWmYsc0tBQXNLO1FBQ3RLLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFO29CQUE1QixDQUFDO1NBWVQ7SUFDSixDQUFDO0lBRUQsb0JBQW9CLFlBQUMsVUFBVTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQ1QsQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEVBQy9DLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUNqRCxDQUFDO0lBQ0wsQ0FBQztJQUdELG9DQUFvQztJQUNwQyxlQUFlLEVBQWYsVUFBZ0IsSUFBYSxFQUFFLFVBQW1CLEVBQUUsUUFBc0IsRUFBRSxRQUFtQjtRQUEzQyx5QkFBQSxFQUFBLGNBQXNCO1FBQ3ZFLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxRQUFRLElBQUksUUFBUSxFQUFFLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqRyxDQUFDO0lBSUQsOENBQThDO0lBQzlDLDZDQUE2QztJQUM3QyxnRUFBZ0U7SUFFaEUsb0JBQW9CLEVBQXBCLFVBQXFCLFVBQW1CO1FBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsaUJBQWlCO1lBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFNUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNoQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0UsVUFBVSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDbkMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFFM0IsVUFBVSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUM1QyxVQUFVLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQy9HLHVDQUF1QztRQUV2QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN0QixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV4QixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2hDLHdCQUF3QjtRQUV4QixJQUFJLFFBQVEsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLEtBQUssSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDNUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNFLElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBRUQsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDUixVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUMxQixVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxPQUFPLE9BQU8sQ0FBQztJQUNsQixDQUFDO0NBR0gsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuXG5leHBvcnQgY29uc3QgdXRpbHNBbmltRnggPSB7XG4gICBmeE5vZGVQb29sOiB7fSxcblxuICAgaW5pdCgpIHtcblxuICAgfSxcblxuXG4gICByZXBsYXlQYXJ0aWNsZShub2RlOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKSkgcmV0dXJuO1xuICAgICAgbm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuUGFydGljbGVTeXN0ZW0pLnJlc2V0U3lzdGVtKCk7XG4gICB9LFxuXG4gICAvLyBwbGF5IGEgY2xpcCBhdHRhY2hlZCB0byBhbmltYXRpb24gY29tcG9uZW50IG9mIGEgbm9kZVxuICAgcGxheU5vZGVBbmltKG5vZGU6IGNjLk5vZGUsIGNsaXBOYW1lPzogc3RyaW5nLCByZXBlYXRUaW1lPzogbnVtYmVyLCBpc0tlZXBQcmV2aW91c0NsaXAgPSBmYWxzZSwgY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgaWYgKCFub2RlLmFjdGl2ZUluSGllcmFyY2h5IHx8ICFhbmltQ29tcCkgcmV0dXJuO1xuICAgICAgY2xpcE5hbWUgPSBjbGlwTmFtZSB8fCAoYW5pbUNvbXAuZGVmYXVsdENsaXAgPyBhbmltQ29tcC5kZWZhdWx0Q2xpcC5uYW1lIDogJycpO1xuICAgICAgaWYgKCFjbGlwTmFtZSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBhbmltU3RhdGUgPSBhbmltQ29tcFtpc0tlZXBQcmV2aW91c0NsaXAgPyAncGxheUFkZGl0aXZlJyA6ICdwbGF5J10oY2xpcE5hbWUpO1xuICAgICAgaWYgKCFhbmltU3RhdGUpIHJldHVybjtcbiAgICAgIGFuaW1TdGF0ZS5yZXBlYXRDb3VudCA9IChyZXBlYXRUaW1lID09IC0xID8gSW5maW5pdHkgOiByZXBlYXRUaW1lKSB8fCAxO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGFuaW1Db21wLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgIGFuaW1Db21wLm9mZignZmluaXNoZWQnKTtcbiAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGFuaW1TdGF0ZTtcbiAgIH0sXG5cbiAgIHBsYXlOb2RlQW5pbUFzU29vbkFzTm9kZUFjdGl2ZShub2RlOiBjYy5Ob2RlLCBjbGlwTmFtZT86IHN0cmluZywgcmVwZWF0VGltZSA9IDEsIGlzS2VlcFByZXZpb3VzQ2xpcCA9IHRydWUpIHtcbiAgICAgIGNvbnN0IHZhck5hbWUgPSAnd2FpdEludGVydmFsMlBsYXlBbmltV2hlbkFjdGl2ZSc7XG4gICAgICBub2RlW3Zhck5hbWVdID0gXy53YWl0VG9SdW4oKCkgPT4ge1xuICAgICAgICAgaWYgKG5vZGVbdmFyTmFtZV0pIGNsZWFySW50ZXJ2YWwobm9kZVt2YXJOYW1lXSk7XG4gICAgICAgICB0aGlzLnBsYXlOb2RlQW5pbShub2RlLCBjbGlwTmFtZSwgcmVwZWF0VGltZSwgaXNLZWVwUHJldmlvdXNDbGlwKTtcbiAgICAgIH0sICdhY3RpdmVJbkhpZXJhcmNoeScsIG5vZGUpO1xuICAgfSxcblxuXG4gICAvLyBwbGF5IGEgY2xpcCBhdHRhY2hlZCB0byBhbmltYXRpb24gY29tcG9uZW50IG9mIGEgbm9kZVxuICAgcGxheU5vZGVBbmltQXJyKG5vZGU6IGNjLk5vZGUsIG9yZ0NsaXBOYW1lQXJyPzogc3RyaW5nW10sIGlzS2VlcFByZXZpb3VzQ2xpcCA9IGZhbHNlLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIW5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHJldHVybjtcbiAgICAgIGNvbnN0IGFuaW1Db21wID0gbm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKTtcbiAgICAgIGlmICghbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSB8fCAhYW5pbUNvbXApIHJldHVybjtcbiAgICAgIGNvbnN0IGNsaXBOYW1lQXJyID0gWy4uLm9yZ0NsaXBOYW1lQXJyXTtcbiAgICAgIGFuaW1Db21wLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgIGlmIChjbGlwTmFtZUFyci5sZW5ndGgpIHRoaXMucGxheU5vZGVBbmltKG5vZGUsIGNsaXBOYW1lQXJyLnNoaWZ0KCksIDEsIGlzS2VlcFByZXZpb3VzQ2xpcCk7XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFuaW1Db21wLm9mZignZmluaXNoZWQnKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wbGF5Tm9kZUFuaW0obm9kZSwgY2xpcE5hbWVBcnIuc2hpZnQoKSwgMSwgaXNLZWVwUHJldmlvdXNDbGlwKTtcbiAgIH0sXG5cbiAgIHN0b3BBbGxOb2RlQW5pbXMobm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgaWYgKCFhbmltQ29tcCkgcmV0dXJuO1xuICAgICAgYW5pbUNvbXAuc3RvcCgpO1xuICAgICAgYW5pbUNvbXAub2ZmKCdmaW5pc2hlZCcpO1xuICAgfSxcblxuICAgLy8gcmVzZXQgYSBub2RlIGF0IHN0YXRlIG9mIGZyYW1lIDAgb2YgYW4gYW5pbWF0aW9uIGNsaXBcbiAgIHN0b3BBbmltQXRGcmFtZTAobm9kZTogY2MuTm9kZSwgY2xpcE5hbWU6IHN0cmluZykge1xuICAgICAgY29uc3QgYW5pbUNvbXAgPSBub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pO1xuICAgICAgYW5pbUNvbXAucGxheSgndWZvX3JpbmdfZngnKTtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBhbmltQ29tcC5zZXRDdXJyZW50VGltZSgwKTtcbiAgICAgICAgIHRoaXMuc3RvcEFsbE5vZGVBbmltcyhub2RlKVxuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIHN1YnRyYWNrIGN1cnJlbnQgbnVtYmVyIGZyb20gXG4gICBwbGF5SW5jcmVhc2luZ051bWJlckxhYmVsKGxhYmVsTm9kZTogY2MuTm9kZSwgb2xkTnVtYmVyOiBudW1iZXIsIGFkZGVkQW1vdW50OiBudW1iZXIsIHVwZGF0ZUNvdW50ID0gNSwgZHVyYXRpb24gPSAwLjUsIGRlbGF5U3RhcnRUaW1lID0gMCwgdGVtcGxhdGUgPSAneHh4Jykge1xuICAgICAgLy8gZ2V0IGN1cnJlbnQgbnVtYmVyIG9uIGxhYmVsXG4gICAgICBjb25zdCBsYWJlbENvbXAgPSBsYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICAgIGNvbnN0IGluY3JlbWVudEFtb3VudCA9IGFkZGVkQW1vdW50IC8gdXBkYXRlQ291bnQ7XG4gICAgICBjb25zdCB1cGRhdGVEZWxheSA9IGR1cmF0aW9uIC8gdXBkYXRlQ291bnQ7XG5cbiAgICAgIGNjLnR3ZWVuKGxhYmVsTm9kZSkuZGVsYXkoZGVsYXlTdGFydFRpbWUpLnJlcGVhdChcbiAgICAgICAgIHVwZGF0ZUNvdW50LFxuICAgICAgICAgY2MudHdlZW4oKS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIG9sZE51bWJlciArPSBpbmNyZW1lbnRBbW91bnQ7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU3RyID0gXy5mb3JtYXRNb25leShfLnJvdW5kKG9sZE51bWJlcikpO1xuICAgICAgICAgICAgbGFiZWxDb21wLnN0cmluZyA9IHRlbXBsYXRlLnJlcGxhY2UoL3h4eC9nLCBjdXJyZW50TnVtYmVyU3RyKTtcbiAgICAgICAgICAgIC8vIF8ubG9nKGAgcGxheUluY3JlYXNpbmdOdW1iZXJMYWJlbCA+PiBjdXJyZW50TnVtYmVyU3RyID0gJHtjdXJyZW50TnVtYmVyU3RyfSAvLyBsYWJlbENvbXAuc3RyaW5nPSR7bGFiZWxDb21wLnN0cmluZ30gYCk7XG4gICAgICAgICB9KS5kZWxheSh1cGRhdGVEZWxheSlcbiAgICAgICkuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgLy8gaGFuZGxlIG5vZGUgcG9vbFxuICAgZ2V0TmV3RnhOb2RlKHNhbXBsZU5vZGU6IGNjLk5vZGUsIGZ4Q29udGFpbmVyOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIXNhbXBsZU5vZGUubm9kZVBvb2xJZCkgc2FtcGxlTm9kZS5ub2RlUG9vbElkID0gXy5nZXROZXdVdWlkKCk7XG4gICAgICBpZiAoIXRoaXMuZnhOb2RlUG9vbFtzYW1wbGVOb2RlLm5vZGVQb29sSWRdKSB0aGlzLmZ4Tm9kZVBvb2xbc2FtcGxlTm9kZS5ub2RlUG9vbElkXSA9IFtdO1xuICAgICAgY29uc3QgbmV3Tm9kZSA9IHRoaXMuZnhOb2RlUG9vbFtzYW1wbGVOb2RlLm5vZGVQb29sSWRdLnBvcCgpIHx8IF8uY29weU5vZGUoc2FtcGxlTm9kZSk7XG4gICAgICBuZXdOb2RlLm5vZGVQb29sSWQgPSBzYW1wbGVOb2RlLm5vZGVQb29sSWQ7XG4gICAgICBuZXdOb2RlLnBhcmVudCA9IGZ4Q29udGFpbmVyIHx8IF9HLmNvcmVGWC5meENvbnRhaW5lcjtcbiAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgfSxcblxuXG4gICBzYXZlRnhOb2RlVG9Qb29sKG5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIG5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmZ4Tm9kZVBvb2xbbm9kZS5ub2RlUG9vbElkXS51bnNoaWZ0KG5vZGUpO1xuICAgfSxcblxuXG4gICAvLyBwYXJ0aWNsZXMgZmx5IGZyb20gbm9kZSBBIHRvIG5vZGUgQlxuICAgcGFydGljbGVzRmx5RnJvbUEyQihzYW1wbGVOb2RlOiBjYy5Ob2RlLCBub2RlQTogY2MuTm9kZSwgbm9kZUI6IGNjLk5vZGUsIGFuaW1Db25maWc/OiBhbnksIGZ4Q29udGFpbmVyPzogY2MuTm9kZSkge1xuICAgICAgY29uc3QgZGVmYXVsdFBhcnRpY2xlRmx5QTJCQ29uZmlncyA9IHtcbiAgICAgICAgIG51bWJlck9mTm9kZTogMjAsXG4gICAgICAgICBkZWxheVN0YXJ0VGltZTogMC4wNSxcbiAgICAgICAgIGZseUR1cmF0aW9uOiAxLFxuICAgICAgICAgcmFuZG9tQmV6aWVyUG9pbnRSYW5nZTogeyB4OiAyMDAsIHk6IDIwMCB9LCAgLy8geCA+IDAgJiB5ID4gMFxuICAgICAgfVxuICAgICAgY29uc3QgeyBudW1iZXJPZk5vZGUsIGZseUR1cmF0aW9uLCBkZWxheVN0YXJ0VGltZSwgcmFuZG9tQmV6aWVyUG9pbnRSYW5nZSB9ID0gYW5pbUNvbmZpZyB8fCBkZWZhdWx0UGFydGljbGVGbHlBMkJDb25maWdzO1xuICAgICAgY29uc3QgcG9zRGlmZlZlYzIgPSBfLmdldEdsb2JhbFBvc0RpZmYobm9kZUEsIG5vZGVCKTtcbiAgICAgIC8vIF8ubG9nKGAgcGFydGljbGVzRmx5RnJvbUEyQiA+PiBwb3NEaWZmVmVjMiA9ICR7cG9zRGlmZlZlYzJ9IC8vIG51bWJlck9mTm9kZT0ke251bWJlck9mTm9kZX0sIGZseUR1cmF0aW9uPSR7Zmx5RHVyYXRpb259LCBkZWxheVRpbWVFYWNoTm9kZT0ke2RlbGF5VGltZUVhY2hOb2RlfSBgKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZOb2RlOyBpKyspIHtcbiAgICAgICAgIGNvbnN0IG5ld05vZGUgPSB0aGlzLmdldE5ld0Z4Tm9kZShzYW1wbGVOb2RlLCBmeENvbnRhaW5lcik7XG4gICAgICAgICBuZXdOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBuZXdOb2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICBfLnNldEdsb2JhbFBvc1RvTm9kZShuZXdOb2RlLCBub2RlQSk7XG4gICAgICAgICBjb25zdCBiZXppZXJQMSA9IHRoaXMuZ2V0UmFuZG9tUG9pbnRJblJhZ2UocmFuZG9tQmV6aWVyUG9pbnRSYW5nZSk7XG4gICAgICAgICBjb25zdCBiZXppZXJQMiA9IHRoaXMuZ2V0UmFuZG9tUG9pbnRJblJhZ2UocmFuZG9tQmV6aWVyUG9pbnRSYW5nZSk7XG4gICAgICAgICBjYy50d2VlbihuZXdOb2RlKVxuICAgICAgICAgICAgLmRlbGF5KGkgKiBkZWxheVN0YXJ0VGltZSlcbiAgICAgICAgICAgIC5iZXppZXJCeShmbHlEdXJhdGlvbiwgYmV6aWVyUDEsIGJlemllclAyLCBwb3NEaWZmVmVjMilcbiAgICAgICAgICAgIC5jYWxsKCgpID0+IHsgdGhpcy5zYXZlRnhOb2RlVG9Qb29sKG5ld05vZGUpOyB9KVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBnZXRSYW5kb21Qb2ludEluUmFnZShwb2ludFJhbmdlKSB7XG4gICAgICByZXR1cm4gY2MudjIoXG4gICAgICAgICBfLnJhbmRvbU51bWJlcihwb2ludFJhbmdlLnggKiAyKSAtIHBvaW50UmFuZ2UueCxcbiAgICAgICAgIF8ucmFuZG9tTnVtYmVyKHBvaW50UmFuZ2UueSAqIDIpIC0gcG9pbnRSYW5nZS55XG4gICAgICApO1xuICAgfSxcblxuXG4gICAvLyBmbHkgYSBub2RlIHRvIHBvc2l0aW9uIG9mIGFub3RoZXJcbiAgIG5vZGVGbHlGcm9tQXRvQihub2RlOiBjYy5Ob2RlLCB0YXJnZXROb2RlOiBjYy5Ob2RlLCBkdXJhdGlvbjogbnVtYmVyID0gMC4zLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBkaWZmVmVjID0gXy5nZXRHbG9iYWxQb3NEaWZmKG5vZGUsIHRhcmdldE5vZGUpO1xuICAgICAgY2MudHdlZW4obm9kZSkuYnkoZHVyYXRpb24sIHsgcG9zaXRpb246IGRpZmZWZWMgfSkuY2FsbCgoKSA9PiBjYWxsYmFjayAmJiBjYWxsYmFjaygpKS5zdGFydCgpO1xuICAgfSxcblxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIHNjcmVlbnNob3QgYSBub2RlIHRvIGdldCBzcHJpdGVGcmFtZSAoanBnKVxuICAgLy8gKioqIE5PVEU6IENPREUgTk9UIFdPUktJTkcgISEhIEpVU1QgQ09QSUVEIEZST00gQU5PVEhFUiBQTEFDRVxuXG4gICBjYXB0dXJlTm9kZVRvVGV4dHVyZSh0YXJnZXROb2RlOiBjYy5Ob2RlKSB7XG4gICAgICBpZiAoIXRhcmdldE5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHRhcmdldE5vZGUuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgY29uc3QgY2FtZXJhTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XG4gICAgICB0YXJnZXROb2RlLmFkZENoaWxkKGNhbWVyYU5vZGUpO1xuICAgICAgbGV0IGNhbWVyYUNvbXAgPSBjYW1lcmFOb2RlLmFkZENvbXBvbmVudChjYy5DYW1lcmEpO1xuICAgICAgbGV0IHRleHR1cmUgPSBuZXcgY2MuUmVuZGVyVGV4dHVyZSgpO1xuXG4gICAgICBsZXQgZ2wgPSBjYy5nYW1lLl9yZW5kZXJDb250ZXh0O1xuICAgICAgdGV4dHVyZS5pbml0V2l0aFNpemUodGFyZ2V0Tm9kZS53aWR0aCwgdGFyZ2V0Tm9kZS5oZWlnaHQsIGdsLlNURU5DSUxfSU5ERVg4KTtcbiAgICAgIGNhbWVyYUNvbXAudGFyZ2V0VGV4dHVyZSA9IHRleHR1cmU7XG4gICAgICBjYW1lcmFDb21wLnpvb21SYXRpbyA9IDEuMztcblxuICAgICAgY2FtZXJhQ29tcC5iYWNrZ3JvdW5kQ29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgIGNhbWVyYUNvbXAuY2xlYXJGbGFncyA9IGNjLkNhbWVyYS5DbGVhckZsYWdzLkRFUFRIIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuU1RFTkNJTCB8IGNjLkNhbWVyYS5DbGVhckZsYWdzLkNPTE9SO1xuICAgICAgLy8gY2FtZXJhQ29tcC5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG5cbiAgICAgIGxldCB3aWR0aCA9IHRleHR1cmUud2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHQ7XG4gICAgICBsZXQgX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGxldCBjdHggPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjYW1lcmFDb21wLnJlbmRlcih0YXJnZXROb2RlKTtcbiAgICAgIGxldCBkYXRhID0gdGV4dHVyZS5yZWFkUGl4ZWxzKCk7XG4gICAgICAvLyB3cml0ZSB0aGUgcmVuZGVyIGRhdGFcblxuICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgaGVpZ2h0OyByb3crKykge1xuICAgICAgICAgbGV0IHNyb3cgPSBoZWlnaHQgLSAxIC0gcm93O1xuICAgICAgICAgbGV0IGRhdGEyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEuYnVmZmVyLCBzcm93ICogd2lkdGggKiA0LCByb3dCeXRlcyk7XG4gICAgICAgICBsZXQgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhMiwgd2lkdGgsIDEpO1xuICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIHJvdyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFVUkwgPSBfY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGFyZ2V0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGNhbWVyYU5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgfSwgMTAwMCk7XG5cbiAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgfVxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/share.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '180e8XwoltFA42+3dd/LwZl', 'share');
// script/social/share.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../system/all_modules");
var _ = _G._;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ORG_FRAME_SIZE = 800;
var Share = /** @class */ (function (_super) {
    __extends(Share, _super);
    function Share() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Share.prototype.initBase64Picture = function (targetNode) {
        return __awaiter(this, void 0, void 0, function () {
            var cameraNode, cameraComp, texture, gl, width, height, _canvas, ctx, data, rowBytes, row, srow, data2, imageData, dataURL;
            return __generator(this, function (_a) {
                if (!targetNode.activeInHierarchy)
                    targetNode.active = true;
                cameraNode = new cc.Node();
                targetNode.addChild(cameraNode);
                cameraComp = cameraNode.addComponent(cc.Camera);
                texture = new cc.RenderTexture();
                gl = cc.game._renderContext;
                texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
                cameraComp.targetTexture = texture;
                cameraComp.zoomRatio = (_.isANDROID || _.isIOS) ? 1.7 : 1.5;
                cameraComp.backgroundColor = cc.Color.WHITE;
                cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
                width = texture.width;
                height = texture.height;
                _canvas = document.createElement('canvas');
                _canvas.width = width;
                _canvas.height = height;
                ctx = _canvas.getContext('2d');
                cameraComp.render(targetNode);
                data = texture.readPixels();
                rowBytes = width * 4;
                for (row = 0; row < height; row++) {
                    srow = height - 1 - row;
                    data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                    imageData = new ImageData(data2, width, 1);
                    ctx.putImageData(imageData, 0, row);
                }
                dataURL = _canvas.toDataURL("image/jpeg");
                setTimeout(function () {
                    targetNode.active = false;
                    cameraNode.removeFromParent();
                }, 2000);
                return [2 /*return*/, dataURL];
            });
        });
    };
    Share.prototype.initPayload = function (targetNode, content, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var base64Image, payload, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.initBase64Picture(targetNode)];
                    case 1:
                        base64Image = _a.sent();
                        payload = {
                            intent: 'SHARE',
                            image: base64Image,
                            text: content,
                            data: extraData,
                        };
                        _.log("--------payload = ", payload);
                        return [2 /*return*/, payload];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Share.prototype.sharePostNormal = function (isFromV2Screen, shareCode) {
        return __awaiter(this, void 0, void 0, function () {
            var picNode, payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cc.find('Canvas/shares/picture/overlay').active = !isFromV2Screen;
                        _G.utilsUI.fillLabel(cc.find('Canvas/shares/picture/overlay/score_base/label_score'), '+' + _G.user.exp);
                        picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture/full_frame', this.node));
                        // picNode.scale = ORG_FRAME_SIZE / picNode.width;
                        cc.find('capture_hard_mask', picNode).active = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.initPayload(this.node, '', {
                                version: 'v2',
                                isFromNewsFeed: 1,
                                puzzle_id: _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName
                            })];
                    case 2:
                        payload = _a.sent();
                        // _.log(payload);
                        return [4 /*yield*/, FBInstant.shareAsync(payload)];
                    case 3:
                        // _.log(payload);
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        _.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Share = __decorate([
        ccclass
    ], Share);
    return Share;
}(cc.Component));
exports.default = Share;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL3NoYXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUM1QyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRVQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUMsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBRzNCO0lBQW1DLHlCQUFZO0lBQS9DOztJQXlGQSxDQUFDO0lBeEZRLGlDQUFpQixHQUF2QixVQUF3QixVQUFtQjs7OztnQkFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7b0JBQUUsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRXRELFVBQVUsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEdBQUcsSUFBSSxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRWpDLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUM3RSxVQUFVLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztnQkFDbkMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMs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LFdBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMvRixrREFBa0Q7d0JBQ2xELEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7Ozt3QkFJakMscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FDbkMsSUFBSSxDQUFDLElBQUksRUFDVCxFQUFFLEVBQ0Y7Z0NBQ0csT0FBTyxFQUFFLElBQUk7Z0NBQ2IsY0FBYyxFQUFFLENBQUM7Z0NBQ2pCLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQjs2QkFDekYsQ0FDSCxFQUFBOzt3QkFSSyxPQUFPLEdBQUcsU0FRZjt3QkFFRCxrQkFBa0I7d0JBQ2xCLHFCQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQURuQyxrQkFBa0I7d0JBQ2xCLFNBQW1DLENBQUM7Ozs7d0JBQ3JCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUE7Ozs7OztLQUNoQztJQXRGaUIsS0FBSztRQUR6QixPQUFPO09BQ2EsS0FBSyxDQXlGekI7SUFBRCxZQUFDO0NBekZELEFBeUZDLENBekZrQyxFQUFFLENBQUMsU0FBUyxHQXlGOUM7a0JBekZvQixLQUFLIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5jb25zdCBPUkdfRlJBTUVfU0laRSA9IDgwMDtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXJlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgIGFzeW5jIGluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGlmICghdGFyZ2V0Tm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgdGFyZ2V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgIHRhcmdldE5vZGUuYWRkQ2hpbGQoY2FtZXJhTm9kZSk7XG4gICAgICBsZXQgY2FtZXJhQ29tcCA9IGNhbWVyYU5vZGUuYWRkQ29tcG9uZW50KGNjLkNhbWVyYSk7XG4gICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG5cbiAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZSh0YXJnZXROb2RlLndpZHRoLCB0YXJnZXROb2RlLmhlaWdodCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xuICAgICAgY2FtZXJhQ29tcC50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgIGNhbWVyYUNvbXAuem9vbVJhdGlvID0gKF8uaXNBTkRST0lEIHx8IF8uaXNJT1MpID8gMS43IDogMS41O1xuXG4gICAgICBjYW1lcmFDb21wLmJhY2tncm91bmRDb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgY2FtZXJhQ29tcC5jbGVhckZsYWdzID0gY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuREVQVEggfCBjYy5DYW1lcmEuQ2xlYXJGbGFncy5TVEVOQ0lMIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuQ09MT1I7XG4gICAgICAvLyBjYW1lcmFDb21wLmN1bGxpbmdNYXNrID0gMHhmZmZmZmZmZjtcblxuICAgICAgbGV0IHdpZHRoID0gdGV4dHVyZS53aWR0aDtcbiAgICAgIGxldCBoZWlnaHQgPSB0ZXh0dXJlLmhlaWdodDtcbiAgICAgIGxldCBfY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBfY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICBfY2FudmFzLmhlaWdodCA9IGhlaWdodDtcblxuICAgICAgbGV0IGN0eCA9IF9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNhbWVyYUNvbXAucmVuZGVyKHRhcmdldE5vZGUpO1xuICAgICAgbGV0IGRhdGEgPSB0ZXh0dXJlLnJlYWRQaXhlbHMoKTtcbiAgICAgIC8vIHdyaXRlIHRoZSByZW5kZXIgZGF0YVxuXG4gICAgICBsZXQgcm93Qnl0ZXMgPSB3aWR0aCAqIDQ7XG4gICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBoZWlnaHQ7IHJvdysrKSB7XG4gICAgICAgICBsZXQgc3JvdyA9IGhlaWdodCAtIDEgLSByb3c7XG4gICAgICAgICBsZXQgZGF0YTIgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoZGF0YS5idWZmZXIsIHNyb3cgKiB3aWR0aCAqIDQsIHJvd0J5dGVzKTtcbiAgICAgICAgIGxldCBpbWFnZURhdGEgPSBuZXcgSW1hZ2VEYXRhKGRhdGEyLCB3aWR0aCwgMSk7XG4gICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgcm93KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YVVSTCA9IF9jYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiKTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0YXJnZXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgY2FtZXJhTm9kZS5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICB9LCAyMDAwKTtcblxuICAgICAgcmV0dXJuIGRhdGFVUkw7XG4gICB9XG5cbiAgIGFzeW5jIGluaXRQYXlsb2FkKHRhcmdldE5vZGU6IGNjLk5vZGUsIGNvbnRlbnQ6IHN0cmluZywgZXh0cmFEYXRhPzogYW55KSB7XG4gICAgICB0cnkge1xuICAgICAgICAgY29uc3QgYmFzZTY0SW1hZ2UgPSBhd2FpdCB0aGlzLmluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGUpO1xuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGludGVudDogJ1NIQVJFJyxcbiAgICAgICAgICAgIGltYWdlOiBiYXNlNjRJbWFnZSxcbiAgICAgICAgICAgIHRleHQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBkYXRhOiBleHRyYURhdGEsXG4gICAgICAgICB9O1xuICAgICAgICAgXy5sb2coYC0tLS0tLS0tcGF5bG9hZCA9IGAsIHBheWxvYWQpO1xuICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikgeyB0aHJvdyBlcnJvcjsgfVxuICAgfVxuXG4gICBhc3luYyBzaGFyZVBvc3ROb3JtYWwoaXNGcm9tVjJTY3JlZW4sIHNoYXJlQ29kZSkge1xuICAgICAgY2MuZmluZCgnQ2FudmFzL3NoYXJlcy9waWN0dXJlL292ZXJsYXknKS5hY3RpdmUgPSAhaXNGcm9tVjJTY3JlZW47XG5cbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9zaGFyZXMvcGljdHVyZS9vdmVybGF5L3Njb3JlX2Jhc2UvbGFiZWxfc2NvcmUnKSwgJysnICsgX0cudXNlci5leHApO1xuXG4gICAgICAvLyBmaWxsIHNoYXJlIG5vZGUgd2l0aCBjdXJyZW50IGZyYW1lcyBcbiAgICAgIGNvbnN0IHBpY05vZGUgPSBfLmNvcHlOb2RlKF9HLm1hcFZpc3VhbC5mdWxsUGljTm9kZSwgY2MuZmluZCgncGljdHVyZS9mdWxsX2ZyYW1lJywgdGhpcy5ub2RlKSk7XG4gICAgICAvLyBwaWNOb2RlLnNjYWxlID0gT1JHX0ZSQU1FX1NJWkUgLyBwaWNOb2RlLndpZHRoO1xuICAgICAgY2MuZmluZCgnY2FwdHVyZV9oYXJkX21hc2snLCBwaWNOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAvLyBjYXB0dXJlIHRoZSBmcmFtZXNcbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdGhpcy5pbml0UGF5bG9hZChcbiAgICAgICAgICAgIHRoaXMubm9kZSxcbiAgICAgICAgICAgICcnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgICAgIGlzRnJvbU5ld3NGZWVkOiAxLFxuICAgICAgICAgICAgICAgcHV6emxlX2lkOiBfRy5nYW1lTWVjaGFuaWMuY3VycmVudENhdGVnb3J5TmFtZSArICdfJyArIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50RnJhbWVOYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICApO1xuXG4gICAgICAgICAvLyBfLmxvZyhwYXlsb2FkKTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC5zaGFyZUFzeW5jKHBheWxvYWQpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgXy5sb2coZXJyb3IpIH1cbiAgIH1cblxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/configurations/system_types.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '48ca8j5+9VCx5DbqNLtBGYf', 'system_types');
// script/system/configurations/system_types.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameState = void 0;
var _G = require("../all_modules");
var _ = _G._, $ = _G.$;
// all common types used in project
var gameState;
(function (gameState) {
    gameState[gameState["category"] = 0] = "category";
    gameState[gameState["pick_mode"] = 1] = "pick_mode";
    gameState[gameState["playing"] = 2] = "playing";
    gameState[gameState["won"] = 3] = "won";
    gameState[gameState["v2"] = 4] = "v2";
})(gameState = exports.gameState || (exports.gameState = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2NvbmZpZ3VyYXRpb25zL3N5c3RlbV90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBcUM7QUFDN0IsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBR3BCLG1DQUFtQztBQUVuQyxJQUFZLFNBQTZEO0FBQXpFLFdBQVksU0FBUztJQUFHLGlEQUFVLENBQUE7SUFBRSxtREFBVyxDQUFBO0lBQUUsK0NBQVMsQ0FBQTtJQUFFLHVDQUFLLENBQUE7SUFBRSxxQ0FBSSxDQUFBO0FBQUMsQ0FBQyxFQUE3RCxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUFvRCIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cblxuLy8gYWxsIGNvbW1vbiB0eXBlcyB1c2VkIGluIHByb2plY3RcblxuZXhwb3J0IGVudW0gZ2FtZVN0YXRlIHsgJ2NhdGVnb3J5JywgJ3BpY2tfbW9kZScsICdwbGF5aW5nJywgJ3dvbicsICd2MicgfVxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/core_fx.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '58583JUlBRDj43pXro2UfkX', 'core_fx');
// script/system/ui-fx/core_fx.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreFX = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
exports.coreFX = {
    fxContainer: null,
    init: function () {
        this.startClockFx();
        this.fxContainer = cc.find('Canvas/fx_container');
        cc.tween(cc.find('Canvas/layout_home/dialog/game_logo')).repeatForever(cc.tween().by(0.7, { scale: 0.1 }).by(0.7, { scale: -0.1 })).start();
    },
    startClockFx: function () {
        var clockNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/clock');
        clockNode.angle = 10;
        cc.tween(clockNode).repeatForever(cc.tween().to(0.5, { angle: -20 }).to(0.5, { angle: 20 })).start();
    },
    showVideoError: function (startPosY) {
        var sampleNode = cc.find('Canvas/sample_nodes/tooltip_video_err');
        var fxNode = _.copyNode(sampleNode, this.fxContainer);
        _G.localize.translateSingleLabel(cc.find('label_fx_video_error', fxNode));
        fxNode.y = startPosY;
        fxNode.active = true;
        cc.tween(fxNode).by(1.5, { opacity: -255, y: 200 }).call(function () { return fxNode.removeFromParent(true); }).start();
    },
    // =============================================
    // show grid
    showGrid: function (callback) {
        var _this = this;
        var interval = 0.02;
        var childNodeArr = _G.mapVisual.gridNode.children;
        childNodeArr.map(function (cellNode, index) {
            _this.showCell(cellNode, interval * index);
        });
        var timeWait = childNodeArr.length * interval * 1000 + 250;
        _.setTimeout(function () { return callback && callback(); }, timeWait);
    },
    showCell: function (cellNode, delay) {
        if (delay === void 0) { delay = 0; }
        var fxTime1 = 0.15;
        var fxTime2 = 0.08;
        cellNode.stopAllActions();
        cellNode.scale = 0;
        cc.tween(cellNode).delay(delay)
            .to(fxTime1, { scale: 1.08 })
            .to(fxTime2, { scale: 1 })
            .start();
    },
    // =============================================
    // hide grid
    hideGrid: function (callback) {
        var _this = this;
        var interval = 0.02;
        var childNodeArr = _G.mapVisual.gridNode.children;
        childNodeArr.map(function (cellNode, index) {
            _this.hideCell(cellNode, interval * index);
        });
        var timeWait = childNodeArr.length * interval * 1000 + 400;
        // _.log(`hideGrid >> timeWait = ${timeWait} // childNodeArr.length=${childNodeArr.length} `);
        _.setTimeout(function () { return callback && callback(); }, timeWait);
    },
    hideCell: function (cellNode, delay) {
        if (delay === void 0) { delay = 0; }
        var fxTime1 = 0.2;
        var fxTime2 = 0.15;
        cellNode.stopAllActions();
        cc.tween(cellNode).delay(delay)
            .to(fxTime1, { scale: 1.08 })
            .to(fxTime2, { scale: 0 })
            .start();
    },
    onCorrectCellPos: function (cellNode) {
        var fxNode = cc.find('correct_tile_fx', cellNode);
        fxNode.width = cellNode.width;
        fxNode.height = cellNode.height;
        fxNode.opacity = 255;
        cc.tween(fxNode).to(0.6, { opacity: 0 }).start();
    },
    // level icon shine a little to attract attention
    highlightIconLevel: function (middleCallback) {
        var expProgressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar');
        var levelNum = cc.find('level/level_num', expProgressBar);
        var levelBg = cc.find('level/bg', expProgressBar);
        var levelLight = cc.find('level/light_effect 1', expProgressBar);
        var anim = cc.tween().by(0.4, { scale: 0.7 }).delay(0.7).by(0.4, { scale: -0.7 });
        anim.clone(levelNum).start();
        anim.clone(levelBg).start();
        cc.tween(levelLight).to(0.4, { opacity: 255 }).delay(0.7).to(0.4, { opacity: 0 }).start();
        _.setTimeout(function () { return middleCallback && middleCallback(); }, 400);
    },
    rotateForever: function (node, angleFactor) {
        if (angleFactor === void 0) { angleFactor = 1; }
        cc.tween(node).repeatForever(cc.tween().by(10, { angle: -360 * angleFactor })).start();
    },
    fxShowPopupHeader: function (popupNode) {
        var _this = this;
        var headerNode = cc.find('dialog/header', popupNode);
        var lightNode = cc.find('light_fx', headerNode);
        var starNodeArr = [cc.find('star1', headerNode), cc.find('star2', headerNode), cc.find('star3', headerNode)];
        starNodeArr.map(function (starNode, i) {
            starNode.orgScale = starNode.orgScale || starNode.scale;
            starNode.stopAllActions();
            starNode.scale = 0;
            starNode.angle = 0;
            _.setTimeout(function () {
                cc.tween(starNode).delay(i * 0.3).to(0.5, { scale: starNode.orgScale + 0.5, angle: -360 }).by(0.2, { scale: -0.5 }).start();
            }, 300);
        });
        lightNode.stopAllActions();
        lightNode.children[0].stopAllActions();
        lightNode.orgScale = lightNode.orgScale || lightNode.scale;
        lightNode.scale = 0;
        _.setTimeout(function () {
            _this.rotateForever(lightNode);
            _this.rotateForever(lightNode.children[0], -2);
            cc.tween(lightNode).delay(1).to(0.4, { scale: lightNode.orgScale }).start();
        }, 300);
    },
    // fx stars fly to star-count at top
    isPlayingFxStarsAdd: false,
    isPlayingFxExpAdd: false,
    fxAddCoins: function (baseNode, amount) {
        var _this = this;
        this.isPlayingFxStarsAdd = true;
        _.setTimeout(function () { return _this.isPlayingFxStarsAdd = false; }, 2000);
        _.setTimeout(function () { return _G.audio.playSound('star_collect'); }, 1000);
        var targetNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1');
        var sampleParticleNode = cc.find('Canvas/sample_nodes/coin');
        // coins fly
        _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);
        // increasing label
        var labelNode = cc.find('Canvas/layout_fixed_header/header/star2_big 1/label_stars');
        var currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
        _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
    },
    fxAddExp: function (baseNode, amount) {
        _.setTimeout(function () { return _G.audio.playSound('exp_collect'); }, 1000);
        var targetNode = cc.find('Canvas/layout_win/dialog/exp_progress_bar/exp_target');
        var sampleParticleNode = cc.find('Canvas/sample_nodes/exp_icon');
        // coins fly
        _G.utilsAnimFx.particlesFlyFromA2B(sampleParticleNode, baseNode, targetNode, null, this.fxContainer);
        // increasing label
        var labelNode = cc.find('Canvas/layout_fixed_header/header/exp_icon/label_exp');
        var currentNum = parseInt(labelNode.getComponent(cc.Label).string.replace(/\D/g, ''));
        _G.utilsAnimFx.playIncreasingNumberLabel(labelNode, currentNum, amount, 20, 1.2, 1);
    },
    // animation for winning
    playWinAnim: function () {
        var _this = this;
        var expFlyTime = 0.5;
        var expFlyDelay = 0.05;
        var allExpDelay = 1;
        var sampleExpNode = cc.find('Canvas/sample_nodes/exp_icon');
        var expTargetNode = cc.find('time_level_bar/exp_target', _G.coreUI.playGridContainer);
        var cellNodeArr = _G.mapVisual.gridNode.children;
        cellNodeArr.sort(function (A, B) {
            if (A.cellPos.x != B.cellPos.x)
                return (A.cellPos.x > B.cellPos.x ? 1 : -1);
            else
                return (A.cellPos.y < B.cellPos.y ? 1 : -1);
        });
        cellNodeArr.map(function (cellNode, index) {
            var expFxNode = _.copyNode(sampleExpNode, _this.fxContainer);
            _.setGlobalPosToNode(expFxNode, cellNode);
            cc.tween(expFxNode).to(0.3, { opacity: 255 }).delay(index * expFlyDelay + allExpDelay).call(function () {
                _G.utilsAnimFx.nodeFlyFromAtoB(expFxNode, expTargetNode, expFlyTime, function () {
                    _.setTimeout(function () { return expFxNode.removeFromParent(true); }, 300);
                });
            }).start();
        });
        _.setTimeout(function () {
            _G.audio.playSound('exp_collect');
        }, (allExpDelay + expFlyTime + 0.2) * 1000);
        _.setTimeout(function () {
            _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_win'));
            _G.coreUI.showLayoutAnim('layout_win');
            _G.audio.playSound('puzzlecompleted');
        }, 2400);
    },
    isPlayingClaimAnim: false,
    playWinClaimAnim: function () {
        var _this = this;
        if (this.isPlayingClaimAnim)
            return;
        this.isPlayingClaimAnim = true;
        var isLevelUp = _G.gameMechanic.isLevelUp;
        var totalWaitTime = isLevelUp ? 4.1 : 2.2;
        _G.coreUI.showNagScreen(totalWaitTime);
        // play aimation collect coins & exp
        _G.coreFX.fxAddCoins(cc.find('Canvas/layout_win/dialog/star_num_base/star2_big 1'), _G.configGame.winCoinReward[_G.gameMechanic.currentSizeMode]);
        _G.coreFX.fxAddExp(cc.find('Canvas/layout_win/dialog/exp_num_base/exp_icon'), _G.configGame.winExp);
        // anim progress bar get filled & label level transform
        _.setTimeout(function () { return _G.coreUI.updateLevelProgressBar(0.7); }, 1000);
        if (isLevelUp)
            _.setTimeout(function () { return _this.highlightIconLevel(function () { return _G.coreUI.updateLevelNumber(); }); }, 1700);
        // hide layout_win
        _.setTimeout(function () {
            _G.coreUI.hideLayoutAnim('layout_win', function () {
                _this.isPlayingClaimAnim = false;
                var isLevelUp = _G.gameMechanic.checkToShowLevelUp();
                if (!isLevelUp)
                    _G.gameMechanic.playNextRandomPuzzle();
            });
        }, totalWaitTime * 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2NvcmVfZngudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdQLFFBQUEsTUFBTSxHQUFHO0lBQ25CLFdBQVcsRUFBRSxJQUFlO0lBRTVCLElBQUk7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQ25FLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQzdELENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsWUFBWTtRQUNULElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsMEZBQTBGLENBQUMsQ0FBQztRQUN0SCxTQUFTLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGFBQWEsQ0FDOUIsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FDM0QsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFRCxjQUFjLFlBQUMsU0FBUztRQUNyQixJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7UUFDcEUsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hELEVBQUUsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pHLENBQUM7SUFHRCxnREFBZ0Q7SUFDaEQsWUFBWTtJQUVaLFFBQVEsRUFBUixVQUFTLFFBQW1CO1FBQTVCLGlCQVNDO1FBUkUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7WUFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM3RCxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLElBQUksUUFBUSxFQUFFLEVBQXRCLENBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELFFBQVEsRUFBUixVQUFTLFFBQWlCLEVBQUUsS0FBUztRQUFULHNCQUFBLEVBQUEsU0FBUztRQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUM1QixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3pCLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUlELGdEQUFnRDtJQUNoRCxZQUFZO0lBRVosUUFBUSxFQUFSLFVBQVMsUUFBbUI7UUFBNUIsaUJBU0M7UUFSRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ3BELFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLEVBQUUsS0FBSztZQUM5QixLQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzdELDhGQUE4RjtRQUM5RixDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLElBQUksUUFBUSxFQUFFLEVBQXRCLENBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdELFFBQVEsRUFBUixVQUFTLFFBQWlCLEVBQUUsS0FBUztRQUFULHNCQUFBLEVBQUEsU0FBUztRQUNsQyxJQUFNLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDcEIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDM0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUM1QixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ3pCLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUdELGdCQUFnQixFQUFoQixVQUFpQixRQUFpQjtRQUMvQixJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM5QixNQUFNLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7UUFDckIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUdELGlEQUFpRDtJQUNqRCxrQkFBa0IsRUFBbEIsVUFBbUIsY0FBeUI7UUFDekMsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBQzVFLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDNUQsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEQsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUVuRSxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUxRixDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxjQUFjLElBQUksY0FBYyxFQUFFLEVBQWxDLENBQWtDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUdELGFBQWEsRUFBYixVQUFjLElBQWEsRUFBRSxXQUFlO1FBQWYsNEJBQUEsRUFBQSxlQUFlO1FBQ3pDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRixDQUFDO0lBR0QsaUJBQWlCLEVBQWpCLFVBQWtCLFNBQWtCO1FBQXBDLGlCQXdCQztRQXZCRSxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRCxJQUFNLFdBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFFL0csV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxQixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNuQixRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUNWLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDM0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQztRQUMzRCxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ1YsS0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9FLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNYLENBQUM7SUFHRCxvQ0FBb0M7SUFDcEMsbUJBQW1CLEVBQUUsS0FBSztJQUMxQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLFVBQVUsRUFBVixVQUFXLFFBQWlCLEVBQUUsTUFBTTtRQUFwQyxpQkFnQkM7UUFmRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLEVBQWhDLENBQWdDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0QsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQWxDLENBQWtDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQzVFLElBQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBRS9ELFlBQVk7UUFDWixFQUFFLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVyRyxtQkFBbUI7UUFDbkIsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1FBRXZGLElBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hGLEVBQUUsQ0FBQyxXQUFXLENBQUMseUJBQXlCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBR0QsUUFBUSxFQUFSLFVBQVMsUUFBaUIsRUFBRSxNQUFNO1FBQy9CLENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFqQyxDQUFpQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUNuRixJQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUVuRSxZQUFZO1FBQ1osRUFBRSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckcsbUJBQW1CO1FBQ25CLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztRQUVsRixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RixFQUFFLENBQUMsV0FBVyxDQUFDLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUdELHdCQUF3QjtJQUN4QixXQUFXO1FBQVgsaUJBZ0NDO1FBL0JFLElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUM5RCxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV4RixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbkQsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOztnQkFDdEUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxFQUFFLEtBQUs7WUFDN0IsSUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDMUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN6RixFQUFFLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRTtvQkFDbEUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7UUFFSCxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ1YsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFFLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUU1QyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ1YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUMxRCxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNaLENBQUM7SUFHRCxrQkFBa0IsRUFBRSxLQUFLO0lBQ3pCLGdCQUFnQjtRQUFoQixpQkErQkM7UUE5QkUsSUFBSSxJQUFJLENBQUMsa0JBQWtCO1lBQUUsT0FBTztRQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRS9CLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQU0sYUFBYSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDNUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkMsb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUNqQixFQUFFLENBQUMsSUFBSSxDQUFDLG9EQUFvRCxDQUFDLEVBQzdELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLENBQzlELENBQUM7UUFFRixFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDZixFQUFFLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLEVBQ3pELEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUN0QixDQUFDO1FBRUYsdURBQXVEO1FBQ3ZELENBQUMsQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLEVBQXJDLENBQXFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxTQUFTO1lBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQTdCLENBQTZCLENBQUMsRUFBNUQsQ0FBNEQsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RyxrQkFBa0I7UUFDbEIsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUNWLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtnQkFDcEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDaEMsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN2RCxJQUFJLENBQUMsU0FBUztvQkFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cblxuZXhwb3J0IGNvbnN0IGNvcmVGWCA9IHtcbiAgIGZ4Q29udGFpbmVyOiBudWxsIGFzIGNjLk5vZGUsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLnN0YXJ0Q2xvY2tGeCgpO1xuICAgICAgdGhpcy5meENvbnRhaW5lciA9IGNjLmZpbmQoJ0NhbnZhcy9meF9jb250YWluZXInKTtcblxuICAgICAgY2MudHdlZW4oY2MuZmluZCgnQ2FudmFzL2xheW91dF9ob21lL2RpYWxvZy9nYW1lX2xvZ28nKSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgIGNjLnR3ZWVuKCkuYnkoMC43LCB7IHNjYWxlOiAwLjEgfSkuYnkoMC43LCB7IHNjYWxlOiAtMC4xIH0pXG4gICAgICApLnN0YXJ0KCk7XG4gICB9LFxuXG4gICBzdGFydENsb2NrRngoKSB7XG4gICAgICBjb25zdCBjbG9ja05vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvdGltZV9sZXZlbF9iYXIvcGxheV90aW1lL2Nsb2NrJyk7XG4gICAgICBjbG9ja05vZGUuYW5nbGUgPSAxMDtcbiAgICAgIGNjLnR3ZWVuKGNsb2NrTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgIGNjLnR3ZWVuKCkudG8oMC41LCB7IGFuZ2xlOiAtMjAgfSkudG8oMC41LCB7IGFuZ2xlOiAyMCB9KVxuICAgICAgKS5zdGFydCgpO1xuICAgfSxcblxuICAgc2hvd1ZpZGVvRXJyb3Ioc3RhcnRQb3NZKSB7XG4gICAgICBjb25zdCBzYW1wbGVOb2RlID0gY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy90b29sdGlwX3ZpZGVvX2VycicpO1xuICAgICAgY29uc3QgZnhOb2RlID0gXy5jb3B5Tm9kZShzYW1wbGVOb2RlLCB0aGlzLmZ4Q29udGFpbmVyKTtcbiAgICAgIF9HLmxvY2FsaXplLnRyYW5zbGF0ZVNpbmdsZUxhYmVsKGNjLmZpbmQoJ2xhYmVsX2Z4X3ZpZGVvX2Vycm9yJywgZnhOb2RlKSk7XG4gICAgICBmeE5vZGUueSA9IHN0YXJ0UG9zWTtcbiAgICAgIGZ4Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MudHdlZW4oZnhOb2RlKS5ieSgxLjUsIHsgb3BhY2l0eTogLTI1NSwgeTogMjAwIH0pLmNhbGwoKCkgPT4gZnhOb2RlLnJlbW92ZUZyb21QYXJlbnQodHJ1ZSkpLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gc2hvdyBncmlkXG5cbiAgIHNob3dHcmlkKGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIGNvbnN0IGludGVydmFsID0gMC4wMjtcbiAgICAgIGNvbnN0IGNoaWxkTm9kZUFyciA9IF9HLm1hcFZpc3VhbC5ncmlkTm9kZS5jaGlsZHJlbjtcbiAgICAgIGNoaWxkTm9kZUFyci5tYXAoKGNlbGxOb2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgdGhpcy5zaG93Q2VsbChjZWxsTm9kZSwgaW50ZXJ2YWwgKiBpbmRleCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGltZVdhaXQgPSBjaGlsZE5vZGVBcnIubGVuZ3RoICogaW50ZXJ2YWwgKiAxMDAwICsgMjUwO1xuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCksIHRpbWVXYWl0KTtcbiAgIH0sXG5cbiAgIHNob3dDZWxsKGNlbGxOb2RlOiBjYy5Ob2RlLCBkZWxheSA9IDApIHtcbiAgICAgIGNvbnN0IGZ4VGltZTEgPSAwLjE1O1xuICAgICAgY29uc3QgZnhUaW1lMiA9IDAuMDg7XG4gICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgY2VsbE5vZGUuc2NhbGUgPSAwO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLmRlbGF5KGRlbGF5KVxuICAgICAgICAgLnRvKGZ4VGltZTEsIHsgc2NhbGU6IDEuMDggfSlcbiAgICAgICAgIC50byhmeFRpbWUyLCB7IHNjYWxlOiAxIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIGhpZGUgZ3JpZFxuXG4gICBoaWRlR3JpZChjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IDAuMDI7XG4gICAgICBjb25zdCBjaGlsZE5vZGVBcnIgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW47XG4gICAgICBjaGlsZE5vZGVBcnIubWFwKChjZWxsTm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgIHRoaXMuaGlkZUNlbGwoY2VsbE5vZGUsIGludGVydmFsICogaW5kZXgpO1xuICAgICAgfSk7XG4gICAgICBjb25zdCB0aW1lV2FpdCA9IGNoaWxkTm9kZUFyci5sZW5ndGggKiBpbnRlcnZhbCAqIDEwMDAgKyA0MDA7XG4gICAgICAvLyBfLmxvZyhgaGlkZUdyaWQgPj4gdGltZVdhaXQgPSAke3RpbWVXYWl0fSAvLyBjaGlsZE5vZGVBcnIubGVuZ3RoPSR7Y2hpbGROb2RlQXJyLmxlbmd0aH0gYCk7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKSwgdGltZVdhaXQpO1xuICAgfSxcblxuXG4gICBoaWRlQ2VsbChjZWxsTm9kZTogY2MuTm9kZSwgZGVsYXkgPSAwKSB7XG4gICAgICBjb25zdCBmeFRpbWUxID0gMC4yO1xuICAgICAgY29uc3QgZnhUaW1lMiA9IDAuMTU7XG4gICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLmRlbGF5KGRlbGF5KVxuICAgICAgICAgLnRvKGZ4VGltZTEsIHsgc2NhbGU6IDEuMDggfSlcbiAgICAgICAgIC50byhmeFRpbWUyLCB7IHNjYWxlOiAwIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgb25Db3JyZWN0Q2VsbFBvcyhjZWxsTm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgZnhOb2RlID0gY2MuZmluZCgnY29ycmVjdF90aWxlX2Z4JywgY2VsbE5vZGUpO1xuICAgICAgZnhOb2RlLndpZHRoID0gY2VsbE5vZGUud2lkdGg7XG4gICAgICBmeE5vZGUuaGVpZ2h0ID0gY2VsbE5vZGUuaGVpZ2h0O1xuICAgICAgZnhOb2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICBjYy50d2VlbihmeE5vZGUpLnRvKDAuNiwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIC8vIGxldmVsIGljb24gc2hpbmUgYSBsaXR0bGUgdG8gYXR0cmFjdCBhdHRlbnRpb25cbiAgIGhpZ2hsaWdodEljb25MZXZlbChtaWRkbGVDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBleHBQcm9ncmVzc0JhciA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9leHBfcHJvZ3Jlc3NfYmFyJyk7XG4gICAgICBjb25zdCBsZXZlbE51bSA9IGNjLmZpbmQoJ2xldmVsL2xldmVsX251bScsIGV4cFByb2dyZXNzQmFyKTtcbiAgICAgIGNvbnN0IGxldmVsQmcgPSBjYy5maW5kKCdsZXZlbC9iZycsIGV4cFByb2dyZXNzQmFyKTtcbiAgICAgIGNvbnN0IGxldmVsTGlnaHQgPSBjYy5maW5kKCdsZXZlbC9saWdodF9lZmZlY3QgMScsIGV4cFByb2dyZXNzQmFyKTtcblxuICAgICAgY29uc3QgYW5pbSA9IGNjLnR3ZWVuKCkuYnkoMC40LCB7IHNjYWxlOiAwLjcgfSkuZGVsYXkoMC43KS5ieSgwLjQsIHsgc2NhbGU6IC0wLjcgfSk7XG4gICAgICBhbmltLmNsb25lKGxldmVsTnVtKS5zdGFydCgpO1xuICAgICAgYW5pbS5jbG9uZShsZXZlbEJnKS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4obGV2ZWxMaWdodCkudG8oMC40LCB7IG9wYWNpdHk6IDI1NSB9KS5kZWxheSgwLjcpLnRvKDAuNCwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XG5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBtaWRkbGVDYWxsYmFjayAmJiBtaWRkbGVDYWxsYmFjaygpLCA0MDApO1xuICAgfSxcblxuXG4gICByb3RhdGVGb3JldmVyKG5vZGU6IGNjLk5vZGUsIGFuZ2xlRmFjdG9yID0gMSkge1xuICAgICAgY2MudHdlZW4obm9kZSkucmVwZWF0Rm9yZXZlcihjYy50d2VlbigpLmJ5KDEwLCB7IGFuZ2xlOiAtMzYwICogYW5nbGVGYWN0b3IgfSkpLnN0YXJ0KCk7XG4gICB9LFxuXG5cbiAgIGZ4U2hvd1BvcHVwSGVhZGVyKHBvcHVwTm9kZTogY2MuTm9kZSkge1xuICAgICAgY29uc3QgaGVhZGVyTm9kZSA9IGNjLmZpbmQoJ2RpYWxvZy9oZWFkZXInLCBwb3B1cE5vZGUpO1xuICAgICAgY29uc3QgbGlnaHROb2RlID0gY2MuZmluZCgnbGlnaHRfZngnLCBoZWFkZXJOb2RlKTtcbiAgICAgIGNvbnN0IHN0YXJOb2RlQXJyID0gW2NjLmZpbmQoJ3N0YXIxJywgaGVhZGVyTm9kZSksIGNjLmZpbmQoJ3N0YXIyJywgaGVhZGVyTm9kZSksIGNjLmZpbmQoJ3N0YXIzJywgaGVhZGVyTm9kZSldO1xuXG4gICAgICBzdGFyTm9kZUFyci5tYXAoKHN0YXJOb2RlLCBpKSA9PiB7XG4gICAgICAgICBzdGFyTm9kZS5vcmdTY2FsZSA9IHN0YXJOb2RlLm9yZ1NjYWxlIHx8IHN0YXJOb2RlLnNjYWxlO1xuICAgICAgICAgc3Rhck5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgIHN0YXJOb2RlLnNjYWxlID0gMDtcbiAgICAgICAgIHN0YXJOb2RlLmFuZ2xlID0gMDtcbiAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYy50d2VlbihzdGFyTm9kZSkuZGVsYXkoaSAqIDAuMykudG8oMC41LCB7IHNjYWxlOiBzdGFyTm9kZS5vcmdTY2FsZSArIDAuNSwgYW5nbGU6IC0zNjAgfSkuYnkoMC4yLCB7IHNjYWxlOiAtMC41IH0pLnN0YXJ0KCk7XG4gICAgICAgICB9LCAzMDApO1xuICAgICAgfSk7XG5cbiAgICAgIGxpZ2h0Tm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgbGlnaHROb2RlLmNoaWxkcmVuWzBdLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICBsaWdodE5vZGUub3JnU2NhbGUgPSBsaWdodE5vZGUub3JnU2NhbGUgfHwgbGlnaHROb2RlLnNjYWxlO1xuICAgICAgbGlnaHROb2RlLnNjYWxlID0gMDtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLnJvdGF0ZUZvcmV2ZXIobGlnaHROb2RlKTtcbiAgICAgICAgIHRoaXMucm90YXRlRm9yZXZlcihsaWdodE5vZGUuY2hpbGRyZW5bMF0sIC0yKTtcbiAgICAgICAgIGNjLnR3ZWVuKGxpZ2h0Tm9kZSkuZGVsYXkoMSkudG8oMC40LCB7IHNjYWxlOiBsaWdodE5vZGUub3JnU2NhbGUgfSkuc3RhcnQoKTtcbiAgICAgIH0sIDMwMCk7XG4gICB9LFxuXG5cbiAgIC8vIGZ4IHN0YXJzIGZseSB0byBzdGFyLWNvdW50IGF0IHRvcFxuICAgaXNQbGF5aW5nRnhTdGFyc0FkZDogZmFsc2UsXG4gICBpc1BsYXlpbmdGeEV4cEFkZDogZmFsc2UsXG4gICBmeEFkZENvaW5zKGJhc2VOb2RlOiBjYy5Ob2RlLCBhbW91bnQpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nRnhTdGFyc0FkZCA9IHRydWU7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc1BsYXlpbmdGeFN0YXJzQWRkID0gZmFsc2UsIDIwMDApO1xuXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuYXVkaW8ucGxheVNvdW5kKCdzdGFyX2NvbGxlY3QnKSwgMTAwMCk7XG4gICAgICBjb25zdCB0YXJnZXROb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9maXhlZF9oZWFkZXIvaGVhZGVyL3N0YXIyX2JpZyAxJyk7XG4gICAgICBjb25zdCBzYW1wbGVQYXJ0aWNsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL2NvaW4nKTtcblxuICAgICAgLy8gY29pbnMgZmx5XG4gICAgICBfRy51dGlsc0FuaW1GeC5wYXJ0aWNsZXNGbHlGcm9tQTJCKHNhbXBsZVBhcnRpY2xlTm9kZSwgYmFzZU5vZGUsIHRhcmdldE5vZGUsIG51bGwsIHRoaXMuZnhDb250YWluZXIpO1xuXG4gICAgICAvLyBpbmNyZWFzaW5nIGxhYmVsXG4gICAgICBjb25zdCBsYWJlbE5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X2ZpeGVkX2hlYWRlci9oZWFkZXIvc3RhcjJfYmlnIDEvbGFiZWxfc3RhcnMnKTtcblxuICAgICAgY29uc3QgY3VycmVudE51bSA9IHBhcnNlSW50KGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZy5yZXBsYWNlKC9cXEQvZywgJycpKTtcbiAgICAgIF9HLnV0aWxzQW5pbUZ4LnBsYXlJbmNyZWFzaW5nTnVtYmVyTGFiZWwobGFiZWxOb2RlLCBjdXJyZW50TnVtLCBhbW91bnQsIDIwLCAxLjIsIDEpO1xuICAgfSxcblxuXG4gICBmeEFkZEV4cChiYXNlTm9kZTogY2MuTm9kZSwgYW1vdW50KSB7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuYXVkaW8ucGxheVNvdW5kKCdleHBfY29sbGVjdCcpLCAxMDAwKTtcbiAgICAgIGNvbnN0IHRhcmdldE5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvZXhwX3Byb2dyZXNzX2Jhci9leHBfdGFyZ2V0Jyk7XG4gICAgICBjb25zdCBzYW1wbGVQYXJ0aWNsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL2V4cF9pY29uJyk7XG5cbiAgICAgIC8vIGNvaW5zIGZseVxuICAgICAgX0cudXRpbHNBbmltRngucGFydGljbGVzRmx5RnJvbUEyQihzYW1wbGVQYXJ0aWNsZU5vZGUsIGJhc2VOb2RlLCB0YXJnZXROb2RlLCBudWxsLCB0aGlzLmZ4Q29udGFpbmVyKTtcblxuICAgICAgLy8gaW5jcmVhc2luZyBsYWJlbFxuICAgICAgY29uc3QgbGFiZWxOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9maXhlZF9oZWFkZXIvaGVhZGVyL2V4cF9pY29uL2xhYmVsX2V4cCcpO1xuXG4gICAgICBjb25zdCBjdXJyZW50TnVtID0gcGFyc2VJbnQobGFiZWxOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgX0cudXRpbHNBbmltRngucGxheUluY3JlYXNpbmdOdW1iZXJMYWJlbChsYWJlbE5vZGUsIGN1cnJlbnROdW0sIGFtb3VudCwgMjAsIDEuMiwgMSk7XG4gICB9LFxuXG5cbiAgIC8vIGFuaW1hdGlvbiBmb3Igd2lubmluZ1xuICAgcGxheVdpbkFuaW0oKSB7XG4gICAgICBjb25zdCBleHBGbHlUaW1lID0gMC41O1xuICAgICAgY29uc3QgZXhwRmx5RGVsYXkgPSAwLjA1O1xuICAgICAgY29uc3QgYWxsRXhwRGVsYXkgPSAxO1xuICAgICAgY29uc3Qgc2FtcGxlRXhwTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9zYW1wbGVfbm9kZXMvZXhwX2ljb24nKTtcbiAgICAgIGNvbnN0IGV4cFRhcmdldE5vZGUgPSBjYy5maW5kKCd0aW1lX2xldmVsX2Jhci9leHBfdGFyZ2V0JywgX0cuY29yZVVJLnBsYXlHcmlkQ29udGFpbmVyKTtcblxuICAgICAgY29uc3QgY2VsbE5vZGVBcnIgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW47XG4gICAgICBjZWxsTm9kZUFyci5zb3J0KChBLCBCKSA9PiB7XG4gICAgICAgICBpZiAoQS5jZWxsUG9zLnggIT0gQi5jZWxsUG9zLngpIHJldHVybiAoQS5jZWxsUG9zLnggPiBCLmNlbGxQb3MueCA/IDEgOiAtMSlcbiAgICAgICAgIGVsc2UgcmV0dXJuIChBLmNlbGxQb3MueSA8IEIuY2VsbFBvcy55ID8gMSA6IC0xKVxuICAgICAgfSk7XG5cbiAgICAgIGNlbGxOb2RlQXJyLm1hcCgoY2VsbE5vZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICBjb25zdCBleHBGeE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUV4cE5vZGUsIHRoaXMuZnhDb250YWluZXIpO1xuICAgICAgICAgXy5zZXRHbG9iYWxQb3NUb05vZGUoZXhwRnhOb2RlLCBjZWxsTm9kZSk7XG4gICAgICAgICBjYy50d2VlbihleHBGeE5vZGUpLnRvKDAuMywgeyBvcGFjaXR5OiAyNTUgfSkuZGVsYXkoaW5kZXggKiBleHBGbHlEZWxheSArIGFsbEV4cERlbGF5KS5jYWxsKCgpID0+IHtcbiAgICAgICAgICAgIF9HLnV0aWxzQW5pbUZ4Lm5vZGVGbHlGcm9tQXRvQihleHBGeE5vZGUsIGV4cFRhcmdldE5vZGUsIGV4cEZseVRpbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBleHBGeE5vZGUucmVtb3ZlRnJvbVBhcmVudCh0cnVlKSwgMzAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSkuc3RhcnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgX0cuYXVkaW8ucGxheVNvdW5kKCdleHBfY29sbGVjdCcpO1xuICAgICAgfSwgKGFsbEV4cERlbGF5ICsgZXhwRmx5VGltZSArIDAuMikgKiAxMDAwKTtcblxuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVGWC5meFNob3dQb3B1cEhlYWRlcihjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbicpKTtcbiAgICAgICAgIF9HLmNvcmVVSS5zaG93TGF5b3V0QW5pbSgnbGF5b3V0X3dpbicpO1xuICAgICAgICAgX0cuYXVkaW8ucGxheVNvdW5kKCdwdXp6bGVjb21wbGV0ZWQnKTtcbiAgICAgIH0sIDI0MDApO1xuICAgfSxcblxuXG4gICBpc1BsYXlpbmdDbGFpbUFuaW06IGZhbHNlLFxuICAgcGxheVdpbkNsYWltQW5pbSgpIHtcbiAgICAgIGlmICh0aGlzLmlzUGxheWluZ0NsYWltQW5pbSkgcmV0dXJuO1xuICAgICAgdGhpcy5pc1BsYXlpbmdDbGFpbUFuaW0gPSB0cnVlO1xuXG4gICAgICBjb25zdCBpc0xldmVsVXAgPSBfRy5nYW1lTWVjaGFuaWMuaXNMZXZlbFVwO1xuICAgICAgY29uc3QgdG90YWxXYWl0VGltZSA9IGlzTGV2ZWxVcCA/IDQuMSA6IDIuMjtcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKHRvdGFsV2FpdFRpbWUpO1xuXG4gICAgICAvLyBwbGF5IGFpbWF0aW9uIGNvbGxlY3QgY29pbnMgJiBleHBcbiAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL3N0YXJfbnVtX2Jhc2Uvc3RhcjJfYmlnIDEnKSxcbiAgICAgICAgIF9HLmNvbmZpZ0dhbWUud2luQ29pblJld2FyZFtfRy5nYW1lTWVjaGFuaWMuY3VycmVudFNpemVNb2RlXVxuICAgICAgKTtcblxuICAgICAgX0cuY29yZUZYLmZ4QWRkRXhwKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2V4cF9udW1fYmFzZS9leHBfaWNvbicpLFxuICAgICAgICAgX0cuY29uZmlnR2FtZS53aW5FeHBcbiAgICAgICk7XG5cbiAgICAgIC8vIGFuaW0gcHJvZ3Jlc3MgYmFyIGdldCBmaWxsZWQgJiBsYWJlbCBsZXZlbCB0cmFuc2Zvcm1cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiBfRy5jb3JlVUkudXBkYXRlTGV2ZWxQcm9ncmVzc0JhcigwLjcpLCAxMDAwKTtcbiAgICAgIGlmIChpc0xldmVsVXApIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZ2hsaWdodEljb25MZXZlbCgoKSA9PiBfRy5jb3JlVUkudXBkYXRlTGV2ZWxOdW1iZXIoKSksIDE3MDApO1xuXG4gICAgICAvLyBoaWRlIGxheW91dF93aW5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF93aW4nLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZ0NsYWltQW5pbSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgaXNMZXZlbFVwID0gX0cuZ2FtZU1lY2hhbmljLmNoZWNrVG9TaG93TGV2ZWxVcCgpO1xuICAgICAgICAgICAgaWYgKCFpc0xldmVsVXApIF9HLmdhbWVNZWNoYW5pYy5wbGF5TmV4dFJhbmRvbVB1enpsZSgpO1xuICAgICAgICAgfSk7XG4gICAgICB9LCB0b3RhbFdhaXRUaW1lICogMTAwMCk7XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system_data/system_data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2d3f90jS9VCwoNMERUFqHX4', 'system_data');
// script/system_data/system_data.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemData = void 0;
exports.systemData = {
    configGame: {
        interAdId: '546140006799320_662235088523144',
        videoRewardId: '546140006799320_662235628523090',
        // interAdTimeWait2FirstAds: 30,
        // interAdTimeWaitNthAd: 120,
        interAdClickCount: 1,
        interAdTime: {
            v1: [30, 45, 60],
            v2: [10, 60, 120],
        },
        winExp: 15,
        levelUpExp: 30,
        videoCoinReward: 50,
        levelUpCoinReward: 100,
        hintCoinPrice: 50,
        winCoinReward: {
            '3x3': 10,
            '4x4': 15,
            '5x5': 20,
            '6x6': 25,
        },
        playTime: {
            '3x3': 20,
            '4x4': 35,
            '5x5': 60,
            '6x6': 120,
        },
    },
    categoryArr: [
        {
            id: 'TRENDING',
            languages: {
                ar_AR: 'شهيرة',
                de_DE: 'TREND',
                en_US: 'TRENDING',
                es_ES: 'TENDENCIAS',
                fr_FR: 'TENDANCE',
                id_ID: 'SEDANG TREN',
                it_IT: 'TRENDING',
                pt_PT: 'EM ALTA',
                th_TH: 'อยู่ในเทรนด์',
                tr_TR: 'POPÜLER',
                vi_VN: 'XU HƯỚNG',
            },
            frameArr: [
                { name: 'trending.frame1', x: 149, y: 122, width: 480, height: 579, angle: 355 },
                { name: 'trending.frame2', x: 255, y: 112, width: 394, height: 554, angle: 0 },
                { name: 'trending.frame3', x: 186, y: 281, width: 408, height: 494, angle: 7 },
                { name: 'trending.frame4', x: 310, y: 134, width: 338, height: 426, angle: 0 },
                { name: 'trending.frame5', x: 169, y: 125, width: 580, height: 666, angle: 0 },
                { name: 'trending.frame6', x: 335, y: 307, width: 442, height: 580, angle: 355 },
                { name: 'trending.frame7', x: 172, y: 90, width: 556, height: 627, angle: 342 },
                { name: 'trending.frame8', x: 210, y: 10, width: 224, height: 640, angle: 0 },
                { name: 'trending.frame9', x: 123, y: 56, width: 519, height: 519, angle: 0 },
                { name: 'trending.frame10', x: 70, y: 184, width: 466, height: 532, angle: 0 },
                { name: 'trending.frame11', x: 261, y: 375, width: 448, height: 448, angle: 0 },
                { name: 'trending.frame12', x: 155, y: 444, width: 443, height: 443, angle: 0 },
                { name: 'trending.frame13', x: -21, y: -15, width: 652, height: 734, angle: 28 },
                { name: 'trending.frame14', x: 213, y: 185, width: 323, height: 488, angle: 0 },
            ],
        },
        {
            id: 'LOVE',
            languages: {
                ar_AR: 'حب',
                de_DE: 'LIEBE',
                en_US: 'LOVE',
                es_ES: 'AMOR',
                fr_FR: 'AMOUR',
                id_ID: 'CINTA',
                it_IT: 'AMORE',
                pt_PT: 'AMOR',
                th_TH: 'ความรัก',
                tr_TR: 'AŞK',
                vi_VN: 'TÌNH YÊU',
            },
            frameArr: [
                { name: 'love.frame1', x: -106, y: 197, width: 786, height: 736, angle: 344 },
                { name: 'love.frame2', x: 125, y: 252, width: 557, height: 557, angle: 0 },
                { name: 'love.frame3', x: 156, y: 231, width: 395, height: 382, angle: 9 },
                { name: 'love.frame4', x: 93, y: 242, width: 612, height: 612, angle: 0 },
                { name: 'love.frame5', x: 141, y: 239, width: 519, height: 519, angle: 0 },
                { name: 'love.frame6', x: 131, y: 193, width: 500, height: 500, angle: 0 },
                { name: 'love.frame7', x: 113, y: 226, width: 562, height: 562, angle: 0 },
                { name: 'love.frame8', x: 206, y: 313, width: 437, height: 437, angle: 0 },
                { name: 'love.frame9', x: 73, y: 153, width: 653, height: 653, angle: 0 },
                { name: 'love.frame10', x: 217, y: 163, width: 573, height: 573, angle: 0 },
                { name: 'love.frame11', x: 96, y: 312, width: 443, height: 443, angle: 0 },
                { name: 'love.frame12', x: 130, y: 286, width: 513, height: 513, angle: 6 },
                { name: 'love.frame13', x: 95, y: 209, width: 601, height: 601, angle: 9 },
                { name: 'love.frame14', x: 19, y: 45, width: 702, height: 702, angle: 0 },
                { name: 'love.frame15', x: 191, y: 221, width: 464, height: 464, angle: 0 },
                { name: 'love.frame16', x: 335, y: 300, width: 351, height: 351, angle: 0 },
                { name: 'love.frame17', x: 16, y: 307, width: 450, height: 450, angle: 4 },
                { name: 'love.frame18', x: -20, y: 51, width: 532, height: 532, angle: 8 },
                { name: 'love.frame19', x: 148, y: 343, width: 624, height: 624, angle: 0 },
                { name: 'love.frame20', x: 150, y: 326, width: 457, height: 457, angle: 0 },
                { name: 'love.frame21', x: 276, y: 109, width: 490, height: 490, angle: 0 },
                { name: 'love.frame22', x: 4, y: 143, width: 475, height: 475, angle: 10 },
                { name: 'love.frame23', x: 47, y: 35, width: 614, height: 614, angle: 9 },
            ],
        },
        {
            id: 'RELIGION',
            languages: {
                ar_AR: 'RELIGION',
                de_DE: 'RELIGION',
                en_US: 'RELIGION',
                es_ES: 'RELIGION',
                fr_FR: 'RELIGION',
                id_ID: 'RELIGION',
                it_IT: 'RELIGION',
                pt_PT: 'RELIGION',
                th_TH: 'RELIGION',
                tr_TR: 'RELIGION',
                vi_VN: 'RELIGION',
            },
            frameArr: [
                { name: 'religion.frame1', x: 144, y: 403, width: 517, height: 517, angle: 0 },
                { name: 'religion.frame2', x: -28, y: 178, width: 670, height: 670, angle: 4.568 },
                { name: 'religion.frame3', x: -52, y: 92, width: 730, height: 730, angle: 0 },
                { name: 'religion.frame4', x: 231, y: 358, width: 608, height: 608, angle: 354.01 },
                { name: 'religion.frame5', x: 201, y: 226, width: 608, height: 608, angle: 354.123 },
                { name: 'religion.frame6', x: 0, y: 52, width: 553, height: 553, angle: 0 },
                { name: 'religion.frame7', x: 32, y: 126, width: 603, height: 603, angle: 0 },
                { name: 'religion.frame8', x: 196, y: 187, width: 603, height: 603, angle: 0 },
                { name: 'religion.frame9', x: 6, y: 208, width: 685, height: 685, angle: 0 },
                { name: 'religion.frame10', x: 98, y: 234, width: 593, height: 593, angle: 0 },
                { name: 'religion.frame11', x: 52, y: 98, width: 556, height: 556, angle: 0 },
                { name: 'religion.frame12', x: 54, y: 154, width: 691, height: 691, angle: 0 },
            ],
        },
        {
            id: 'FANTASY',
            languages: {
                ar_AR: 'FANTASY',
                de_DE: 'FANTASY',
                en_US: 'FANTASY',
                es_ES: 'FANTASIA',
                fr_FR: 'FANTASY',
                id_ID: 'FANTASY',
                it_IT: 'FANTASY',
                pt_PT: 'FANTASY',
                th_TH: 'FANTASY',
                tr_TR: 'FANTASY',
                vi_VN: 'FANTASY',
            },
            frameArr: [
                { name: 'fantasy.frame1', x: 127, y: 272, width: 545, height: 545, angle: 0 },
                { name: 'fantasy.frame2', x: 99, y: 199, width: 487, height: 487, angle: 0 },
                { name: 'fantasy.frame3', x: 56, y: 179, width: 677, height: 677, angle: 0 },
                { name: 'fantasy.frame4', x: 152, y: 191, width: 547, height: 547, angle: 0 },
                { name: 'fantasy.frame5', x: 42, y: 227, width: 600, height: 600, angle: 0 },
                { name: 'fantasy.frame6', x: 273, y: 410, width: 487, height: 487, angle: 0 },
                { name: 'fantasy.frame7', x: 145, y: 278, width: 534, height: 534, angle: 0 },
                { name: 'fantasy.frame8', x: -41, y: 0, width: 877, height: 877, angle: 0 },
                { name: 'fantasy.frame9', x: 98, y: 432, width: 450, height: 450, angle: 0 },
                { name: 'fantasy.frame10', x: 9, y: 120, width: 782, height: 782, angle: 355.214 },
                { name: 'fantasy.frame11', x: -13, y: 217, width: 548, height: 548, angle: 9.823 },
                { name: 'fantasy.frame12', x: 206, y: 254, width: 376, height: 376, angle: 0 },
                { name: 'fantasy.frame13', x: 149, y: 288, width: 472, height: 472, angle: 0 },
                { name: 'fantasy.frame14', x: 73, y: 203, width: 530, height: 530, angle: 4.271 },
                { name: 'fantasy.frame15', x: 219, y: 217, width: 564, height: 564, angle: 0 },
                { name: 'fantasy.frame16', x: 165, y: 176, width: 470, height: 470, angle: 0 },
                { name: 'fantasy.frame17', x: 321, y: 273, width: 605, height: 605, angle: 343.38 },
                { name: 'fantasy.frame18', x: 263, y: 33, width: 537, height: 537, angle: 0 },
                { name: 'fantasy.frame19', x: 185, y: 109, width: 437, height: 437, angle: 0 },
                { name: 'fantasy.frame20', x: 181, y: 275, width: 437, height: 437, angle: 0 },
                { name: 'fantasy.frame21', x: 170, y: 69, width: 458, height: 458, angle: 0 },
                { name: 'fantasy.frame22', x: 203, y: 308, width: 335, height: 335, angle: 0 },
                { name: 'fantasy.frame23', x: 53, y: 77, width: 431, height: 431, angle: 0 },
                { name: 'fantasy.frame24', x: 210, y: 159, width: 385, height: 385, angle: 0 },
                { name: 'fantasy.frame25', x: 62, y: 276, width: 605, height: 605, angle: 356.856 },
                { name: 'fantasy.frame26', x: 67, y: 345, width: 478, height: 478, angle: 0 },
                { name: 'fantasy.frame27', x: 29, y: 200, width: 432, height: 432, angle: 0 },
                { name: 'fantasy.frame28', x: 56, y: 124, width: 500, height: 500, angle: 0 },
                { name: 'fantasy.frame29', x: 169, y: 129, width: 522, height: 522, angle: 0 },
            ],
        },
        {
            id: 'POSTER',
            languages: {
                ar_AR: 'مُلصق',
                de_DE: 'POSTER',
                en_US: 'POSTER',
                es_ES: 'CARTELES',
                fr_FR: 'POSTER',
                id_ID: 'POSTER',
                it_IT: 'POSTER',
                pt_PT: 'POSTER',
                th_TH: 'โปสเตอร์',
                tr_TR: 'AFIŞ',
                vi_VN: 'POSTER',
            },
            frameArr: [
                { name: 'poster.frame1', x: 142, y: 136, width: 591, height: 711, angle: 0 },
                { name: 'poster.frame2', x: 70, y: 135, width: 420, height: 680, angle: -48 },
                { name: 'poster.frame3', x: 206, y: 75, width: 611, height: 501, angle: 0 },
                { name: 'poster.frame4', x: 209, y: 110, width: 400, height: 537, angle: 0 },
                { name: 'poster.frame5', x: 150, y: 161, width: 485, height: 679, angle: 0 },
                { name: 'poster.frame6', x: 151, y: 172, width: 473, height: 589, angle: 0 },
                { name: 'poster.frame7', x: 214, y: 238, width: 500, height: 609, angle: 0 },
                { name: 'poster.frame8', x: 145, y: 145, width: 516, height: 660, angle: 0 },
            ],
        },
        {
            id: 'FLOWERS',
            languages: {
                ar_AR: 'أزهار',
                de_DE: 'BLUMEN',
                en_US: 'FLOWERS',
                es_ES: 'FLORES',
                fr_FR: 'FLEURS',
                id_ID: 'BUNGA-BUNGA',
                it_IT: 'FIORI',
                pt_PT: 'FLORES',
                th_TH: 'ดอกไม้',
                tr_TR: 'ÇIÇEKLER',
                vi_VN: 'HOA',
            },
            frameArr: [
                { name: 'flowers.frame1', x: 122, y: 191, width: 513, height: 492, angle: 0 },
                { name: 'flowers.frame2', x: 110, y: 210, width: 580, height: 580, angle: 0 },
                { name: 'flowers.frame3', x: 212, y: 402, width: 385, height: 469, angle: 4 },
                { name: 'flowers.frame4', x: 73, y: 181, width: 681, height: 521, angle: 0 },
                { name: 'flowers.frame5', x: 50, y: 91, width: 700, height: 818, angle: 0 },
                { name: 'flowers.frame6', x: 6, y: 263, width: 516, height: 575, angle: 0 },
                { name: 'flowers.frame7', x: 154, y: 192, width: 532, height: 577, angle: 356 },
                { name: 'flowers.frame8', x: 275, y: 166, width: 487, height: 623, angle: 0 },
            ],
        },
        {
            id: 'MANSIONS',
            languages: {
                ar_AR: 'MANSIONS',
                de_DE: 'MANSIONS',
                en_US: 'MANSIONS',
                es_ES: 'MANSIONES',
                fr_FR: 'MANSIONS',
                id_ID: 'MANSIONS',
                it_IT: 'MANSIONS',
                pt_PT: 'MANSÕES',
                th_TH: 'MANSIONS',
                tr_TR: 'MANSIONS',
                vi_VN: 'MANSIONS',
            },
            frameArr: [
                { name: 'mansions.frame1', x: 283, y: 118, width: 303, height: 303, angle: 0 },
                { name: 'mansions.frame2', x: 254, y: 230, width: 321, height: 321, angle: 0 },
                { name: 'mansions.frame3', x: 202, y: 277, width: 377, height: 377, angle: 0 },
                { name: 'mansions.frame4', x: 44, y: 70, width: 430, height: 430, angle: 0 },
                { name: 'mansions.frame5', x: 182, y: 121, width: 437, height: 437, angle: 0 },
                { name: 'mansions.frame6', x: 334, y: 162, width: 383, height: 383, angle: 0 },
                { name: 'mansions.frame7', x: 42, y: 52, width: 406, height: 406, angle: 0 },
                { name: 'mansions.frame8', x: 19, y: 170, width: 379, height: 379, angle: 0 },
                { name: 'mansions.frame9', x: 220, y: 231, width: 401, height: 401, angle: 0 },
                { name: 'mansions.frame10', x: 39, y: 289, width: 465, height: 465, angle: 0 },
                { name: 'mansions.frame11', x: 155, y: 152, width: 491, height: 491, angle: 0 },
                { name: 'mansions.frame12', x: 17, y: 92, width: 431, height: 431, angle: 0 },
                { name: 'mansions.frame13', x: 232, y: 196, width: 451, height: 451, angle: 0 },
                { name: 'mansions.frame14', x: 333, y: 143, width: 483, height: 483, angle: 0 },
                { name: 'mansions.frame15', x: 57, y: 96, width: 425, height: 425, angle: 0 },
                { name: 'mansions.frame16', x: 170, y: 56, width: 461, height: 461, angle: 0 },
                { name: 'mansions.frame17', x: 169, y: 66, width: 461, height: 461, angle: 0 },
                { name: 'mansions.frame18', x: 221, y: 98, width: 369, height: 369, angle: 0 },
                { name: 'mansions.frame19', x: 44, y: 38, width: 418, height: 418, angle: 0 },
                { name: 'mansions.frame20', x: 37, y: 84, width: 380, height: 380, angle: 0 },
                { name: 'mansions.frame21', x: 65, y: 233, width: 347, height: 347, angle: 0 },
                { name: 'mansions.frame22', x: 44, y: 167, width: 370, height: 370, angle: 0 },
                { name: 'mansions.frame23', x: 15, y: 121, width: 429, height: 429, angle: 0 },
            ],
        },
        {
            id: 'TRAVEL',
            languages: {
                ar_AR: 'سفر',
                de_DE: 'REISEN',
                en_US: 'TRAVEL',
                es_ES: 'VIAJES',
                fr_FR: 'VOYAGE',
                id_ID: 'BEPERGIAN',
                it_IT: 'VIAGGIO',
                pt_PT: 'VIAGEM',
                th_TH: 'ท่องเที่ยว',
                tr_TR: 'SEYAHAT',
                vi_VN: 'DU LỊCH',
            },
            frameArr: [
                { name: 'travel.frame1', x: 180, y: 397, width: 424, height: 424, angle: 0 },
                { name: 'travel.frame2', x: 260, y: 271, width: 426, height: 449, angle: 352 },
                { name: 'travel.frame3', x: 341, y: 145, width: 403, height: 458, angle: 0 },
                { name: 'travel.frame4', x: 204, y: 282, width: 398, height: 398, angle: 348 },
                { name: 'travel.frame5', x: 237, y: 511, width: 319, height: 370, angle: 0 },
                { name: 'travel.frame6', x: 16, y: 275, width: 350, height: 439, angle: 0 },
                { name: 'travel.frame7', x: 316, y: 351, width: 366, height: 451, angle: 3 },
                { name: 'travel.frame8', x: 186, y: 286, width: 581, height: 603, angle: 340 },
            ],
        },
        {
            id: 'CITIES',
            languages: {
                ar_AR: 'مُدن',
                de_DE: 'STÄDTE',
                en_US: 'CITIES',
                es_ES: 'CIUDADES',
                fr_FR: 'VILLES',
                id_ID: 'KOTA',
                it_IT: 'CITTÀ',
                pt_PT: 'CIDADES',
                th_TH: 'เมือง',
                tr_TR: 'KENTLER',
                vi_VN: 'ĐÔ THỊ',
            },
            frameArr: [
                { name: 'cities.frame1', x: 323, y: 127, width: 424, height: 424, angle: 0 },
                { name: 'cities.frame2', x: 64, y: 115, width: 376, height: 376, angle: 0 },
                { name: 'cities.frame3', x: 84, y: 106, width: 444, height: 444, angle: 0 },
                { name: 'cities.frame4', x: 166, y: 73, width: 468, height: 468, angle: 0 },
                { name: 'cities.frame5', x: 92, y: 54, width: 459, height: 617, angle: 0 },
                { name: 'cities.frame6', x: 280, y: 115, width: 420, height: 420, angle: 0 },
                { name: 'cities.frame7', x: 81, y: 150, width: 518, height: 592, angle: 4 },
                { name: 'cities.frame8', x: 82, y: 127, width: 542, height: 597, angle: 2 },
            ],
        },
        {
            id: 'ANIMALS',
            languages: {
                ar_AR: 'حيوانات',
                de_DE: 'TIERE',
                en_US: 'ANIMALS',
                es_ES: 'ANIMALES',
                fr_FR: 'ANIMAUX',
                id_ID: 'HEWAN',
                it_IT: 'ANIMALI',
                pt_PT: 'ANIMAIS',
                th_TH: 'สัตว์',
                tr_TR: 'HAYVANLAR',
                vi_VN: 'ĐỘNG VẬT',
            },
            frameArr: [
                { name: 'animals.frame1', x: 294, y: 65, width: 477, height: 497, angle: 343 },
                { name: 'animals.frame2', x: 137, y: 104, width: 526, height: 526, angle: 0 },
                { name: 'animals.frame3', x: 360, y: 420, width: 421, height: 421, angle: 0 },
                { name: 'animals.frame4', x: 109, y: 79, width: 549, height: 549, angle: 0 },
                { name: 'animals.frame5', x: 281, y: 137, width: 457, height: 457, angle: 0 },
                { name: 'animals.frame6', x: 177, y: 267, width: 446, height: 576, angle: 0 },
                { name: 'animals.frame7', x: 77, y: 122, width: 390, height: 495, angle: 0 },
                { name: 'animals.frame8', x: 9, y: 276, width: 446, height: 488, angle: 0, },
            ],
        },
        {
            id: 'MAGAZINE',
            languages: {
                ar_AR: 'MAGAZINE',
                de_DE: 'MAGAZINE',
                en_US: 'MAGAZINE',
                es_ES: 'REVISTA',
                fr_FR: 'MAGAZINE',
                id_ID: 'MAGAZINE',
                it_IT: 'MAGAZINE',
                pt_PT: 'MAGAZINES',
                th_TH: 'MAGAZINE',
                tr_TR: 'MAGAZINE',
                vi_VN: 'MAGAZINE',
            },
            frameArr: [
                { name: 'magazine.frame1', x: 148, y: 130, width: 587, height: 587, angle: 17.574 },
                { name: 'magazine.frame2', x: 73, y: -6, width: 602, height: 602, angle: 20.38 },
                { name: 'magazine.frame3', x: 29, y: 60, width: 685, height: 685, angle: 327.496 },
                { name: 'magazine.frame4', x: -72, y: 364, width: 683, height: 683, angle: 17.457 },
                { name: 'magazine.frame5', x: -107, y: 372, width: 711, height: 711, angle: 10.526 },
                { name: 'magazine.frame6', x: -24, y: 247, width: 811, height: 811, angle: 18 },
                { name: 'magazine.frame7', x: 215, y: 399, width: 555, height: 555, angle: 354 },
                { name: 'magazine.frame8', x: -24, y: 294, width: 682, height: 682, angle: 45 },
            ],
        },
        {
            id: 'LANDSCAPE',
            languages: {
                ar_AR: 'مناظر طبيعية',
                de_DE: 'LANDSCHAFT',
                en_US: 'LANDSCAPE',
                es_ES: 'PAISAJES',
                fr_FR: 'PAYSAGE',
                id_ID: 'PEMANDANGAN',
                it_IT: 'PAESAGGIO',
                pt_PT: 'PAISAGEM',
                th_TH: 'ภูมิประเทศ',
                tr_TR: 'MANZARA',
                vi_VN: 'PHONG CẢNH',
            },
            frameArr: [
                { name: 'landscape.frame1', x: 170, y: 160, width: 458, height: 468, angle: 0 },
                { name: 'landscape.frame2', x: 159, y: 108, width: 480, height: 480, angle: 0 },
                { name: 'landscape.frame3', x: 115, y: 135, width: 522, height: 522, angle: 0 },
                { name: 'landscape.frame4', x: 268, y: 260, width: 442, height: 507, angle: 0 },
                { name: 'landscape.frame5', x: 155, y: 254, width: 501, height: 567, angle: 4 },
                { name: 'landscape.frame6', x: 119, y: 127, width: 553, height: 553, angle: 0 },
                { name: 'landscape.frame7', x: 154, y: 217, width: 492, height: 492, angle: 0 },
                { name: 'landscape.frame8', x: 180, y: 184, width: 441, height: 441, angle: 0 },
            ],
        },
        {
            id: 'CLASSIC',
            languages: {
                ar_AR: 'CLASSIC',
                de_DE: 'CLASSIC',
                en_US: 'CLASSIC',
                es_ES: 'CLASICO',
                fr_FR: 'CLASSIC',
                id_ID: 'CLASSIC',
                it_IT: 'CLASSIC',
                pt_PT: 'CLASSICOS',
                th_TH: 'CLASSIC',
                tr_TR: 'CLASSIC',
                vi_VN: 'CLASSIC',
            },
            frameArr: [
                { name: 'clasicos.frame1', x: 27.64, y: 277.54, width: 579, height: 579, angle: 7.53 },
                { name: 'clasicos.frame2', x: 160, y: 166, width: 574, height: 574, angle: 353.04 },
                { name: 'clasicos.frame3', x: 1, y: 206, width: 544, height: 544, angle: 0 },
                { name: 'clasicos.frame4', x: 202, y: 172, width: 396, height: 396, angle: 0 },
                { name: 'clasicos.frame5', x: 193, y: 254, width: 545, height: 545, angle: 4 },
                { name: 'clasicos.frame6', x: 37, y: 245, width: 580, height: 580, angle: 7.011 },
                { name: 'clasicos.frame7', x: 32, y: 91, width: 415, height: 415, angle: 0 },
                { name: 'clasicos.frame8', x: 211, y: 80, width: 540, height: 540, angle: 0 },
            ],
        },
        {
            id: 'NATURE',
            languages: {
                ar_AR: 'طبيعة',
                de_DE: 'NATUR',
                en_US: 'NATURE',
                es_ES: 'NATURALEZA',
                fr_FR: 'NATURE',
                id_ID: 'ALAM',
                it_IT: 'NATURA',
                pt_PT: 'NATUREZA',
                th_TH: 'ธรรมชาติ',
                tr_TR: 'DOĞA',
                vi_VN: 'TỰ NHIÊN',
            },
            frameArr: [
                { name: 'nature.frame1', x: 113, y: 276, width: 546, height: 546, angle: 0 },
                { name: 'nature.frame2', x: 68, y: 45, width: 663, height: 663, angle: 0 },
                { name: 'nature.frame3', x: 148, y: 80, width: 484, height: 569, angle: 0 },
                { name: 'nature.frame4', x: 209, y: 102, width: 426, height: 561, angle: 0 },
                { name: 'nature.frame5', x: 197, y: 152, width: 461, height: 546, angle: 356 },
                { name: 'nature.frame6', x: 213, y: 300, width: 449, height: 533, angle: 355 },
                { name: 'nature.frame7', x: 240, y: 256, width: 483, height: 587, angle: 0 },
                { name: 'nature.frame8', x: 61, y: 60, width: 650, height: 814, angle: 0 },
            ],
        },
    ],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtX2RhdGEvc3lzdGVtX2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWEsUUFBQSxVQUFVLEdBQUc7SUFDdkIsVUFBVSxFQUFFO1FBQ1QsU0FBUyxFQUFFLGlDQUFpQztRQUM1QyxhQUFhLEVBQUUsaUNBQWlDO1FBRWhELGdDQUFnQztRQUNoQyw2QkFBNkI7UUFDN0IsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixXQUFXLEVBQUU7WUFDVixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNoQixFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztTQUNuQjtRQUVELE1BQU0sRUFBRSxFQUFFO1FBQ1YsVUFBVSxFQUFFLEVBQUU7UUFFZCxlQUFlLEVBQUUsRUFBRTtRQUNuQixpQkFBaUIsRUFBRSxHQUFHO1FBQ3RCLGFBQWEsRUFBRSxFQUFFO1FBRWpCLGFBQWEsRUFBRTtZQUNaLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1NBQ1g7UUFFRCxRQUFRLEVBQUU7WUFDUCxLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxLQUFLLEVBQUUsR0FBRztTQUNaO0tBQ0g7SUFFRCxXQUFXLEVBQUU7UUFDVjtZQUNHLEVBQUUsRUFBRSxVQUFVO1lBQ2QsU0FBUyxFQUFFO2dCQUNSLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxVQUFVO2dCQUNqQixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLEtBQUssRUFBRSxhQUFhO2dCQUNwQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsS0FBSyxFQUFFLFNBQVM7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QWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ3pFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ3pFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzNFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzNFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQ3pFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzNFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzNFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDMUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtnQkFDMUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTthQUUzRTtTQUNIO1FBRUQ7WUFDRyxFQUFFLEVBQUUsVUFBVTtZQUVkLFNBQVMsRUFBRTtnQkFDUixLQUFLLEVBQUUsVUFBVTtnQkFDakIs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QkFDN0UsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUM1RSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzdFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDN0UsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzNFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2dCQUNsRixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FB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Z0JBQ2pCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsUUFBUSxFQUFFO2dCQUNQLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzVFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0UsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFB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RSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDOUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDOUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFL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S0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQzlFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDN0UsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUM3RSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzVFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDN0UsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO2dCQUM3RSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUU7Z0JBQzVFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLENB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QixLQUFLLEVBQUUsVUFBVTtnQkFDakIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLFVBQVU7YUFDbkI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1AsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDMUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDM0UsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDOUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDOUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtnQkFDNUUsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTthQUM1RTtTQUNIO0tBQ0g7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHN5c3RlbURhdGEgPSB7XG4gICBjb25maWdHYW1lOiB7XG4gICAgICBpbnRlckFkSWQ6ICc1NDYxNDAwMDY3OTkzMjBfNjYyMjM1MDg4NTIzMTQ0JyxcbiAgICAgIHZpZGVvUmV3YXJkSWQ6ICc1NDYxNDAwMDY3OTkzMjBfNjYyMjM1NjI4NTIzMDkwJyxcblxuICAgICAgLy8gaW50ZXJBZFRpbWVXYWl0MkZpcnN0QWRzOiAzMCxcbiAgICAgIC8vIGludGVyQWRUaW1lV2FpdE50aEFkOiAxMjAsXG4gICAgICBpbnRlckFkQ2xpY2tDb3VudDogMSxcbiAgICAgIGludGVyQWRUaW1lOiB7XG4gICAgICAgICB2MTogWzMwLCA0NSwgNjBdLFxuICAgICAgICAgdjI6IFsxMCwgNjAsIDEyMF0sXG4gICAgICB9LFxuXG4gICAgICB3aW5FeHA6IDE1LFxuICAgICAgbGV2ZWxVcEV4cDogMzAsXG5cbiAgICAgIHZpZGVvQ29pblJld2FyZDogNTAsXG4gICAgICBsZXZlbFVwQ29pblJld2FyZDogMTAwLFxuICAgICAgaGludENvaW5QcmljZTogNTAsXG5cbiAgICAgIHdpbkNvaW5SZXdhcmQ6IHtcbiAgICAgICAgICczeDMnOiAxMCxcbiAgICAgICAgICc0eDQnOiAxNSxcbiAgICAgICAgICc1eDUnOiAyMCxcbiAgICAgICAgICc2eDYnOiAyNSxcbiAgICAgIH0sXG5cbiAgICAgIHBsYXlUaW1lOiB7XG4gICAgICAgICAnM3gzJzogMjAsXG4gICAgICAgICAnNHg0JzogMzUsXG4gICAgICAgICAnNXg1JzogNjAsXG4gICAgICAgICAnNng2JzogMTIwLFxuICAgICAgfSxcbiAgIH0sXG5cbiAgIGNhdGVnb3J5QXJyOiBbXG4gICAgICB7XG4gICAgICAgICBpZDogJ1RSRU5ESU5HJyxcbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICfYtNmH2YrYsdipJyxcbiAgICAgICAgICAgIGRlX0RFOiAnVFJFTkQnLFxuICAgICAgICAgICAgZW5fVVM6ICdUUkVORElORycsXG4gICAgICAgICAgICBlc19FUzogJ1RFTkRFTkNJQVMnLFxuICAgICAgICAgICAgZnJfRlI6ICdURU5EQU5DRScsXG4gICAgICAgICAgICBpZF9JRDogJ1NFREFORyBUUkVOJyxcbiAgICAgICAgICAgIGl0X0lUOiAnVFJFTkRJTkcnLFxuICAgICAgICAgICAgcHRfUFQ6ICdFTSBBTFRBJyxcbiAgICAgICAgICAgIHRoX1RIOiAn4Lit4Lii4Li54LmI4LmD4LiZ4LmA4LiX4Lij4LiZ4LiU4LmMJyxcbiAgICAgICAgICAgIHRyX1RSOiAnUE9Qw5xMRVInLFxuICAgICAgICAgICAgdmlfVk46ICdYVSBIxq/hu5pORycsXG4gICAgICAgICB9LFxuICAgICAgICAgZnJhbWVBcnI6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyZW5kaW5nLmZyYW1lMScsIHg6IDE0OSwgeTogMTIyLCB3aWR0aDogNDgwLCBoZWlnaHQ6IDU3OSwgYW5nbGU6IDM1NSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWUyJywgeDogMjU1LCB5OiAxMTIsIHdpZHRoOiAzOTQsIGhlaWdodDogNTU0LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWUzJywgeDogMTg2LCB5OiAyODEsIHdpZHRoOiA0MDgsIGhlaWdodDogNDk0LCBhbmdsZTogNyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWU0JywgeDogMzEwLCB5OiAxMzQsIHdpZHRoOiAzMzgsIGhlaWdodDogNDI2LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWU1JywgeDogMTY5LCB5OiAxMjUsIHdpZHRoOiA1ODAsIGhlaWdodDogNjY2LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWU2JywgeDogMzM1LCB5OiAzMDcsIHdpZHRoOiA0NDIsIGhlaWdodDogNTgwLCBhbmdsZTogMzU1IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmVuZGluZy5mcmFtZTcnLCB4OiAxNzIsIHk6IDkwLCB3aWR0aDogNTU2LCBoZWlnaHQ6IDYyNywgYW5nbGU6IDM0MiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWU4JywgeDogMjEwLCB5OiAxMCwgd2lkdGg6IDIyNCwgaGVpZ2h0OiA2NDAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmVuZGluZy5mcmFtZTknLCB4OiAxMjMsIHk6IDU2LCB3aWR0aDogNTE5LCBoZWlnaHQ6IDUxOSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyZW5kaW5nLmZyYW1lMTAnLCB4OiA3MCwgeTogMTg0LCB3aWR0aDogNDY2LCBoZWlnaHQ6IDUzMiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyZW5kaW5nLmZyYW1lMTEnLCB4OiAyNjEsIHk6IDM3NSwgd2lkdGg6IDQ0OCwgaGVpZ2h0OiA0NDgsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmVuZGluZy5mcmFtZTEyJywgeDogMTU1LCB5OiA0NDQsIHdpZHRoOiA0NDMsIGhlaWdodDogNDQzLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJlbmRpbmcuZnJhbWUxMycsIHg6IC0yMSwgeTogLTE1LCB3aWR0aDogNjUyLCBoZWlnaHQ6IDczNCwgYW5nbGU6IDI4IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmVuZGluZy5mcmFtZTE0JywgeDogMjEzLCB5OiAxODUsIHdpZHRoOiAzMjMsIGhlaWdodDogNDg4LCBhbmdsZTogMCB9LFxuICAgICAgICAgXSxcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAgIGlkOiAnTE9WRScsXG5cbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICfYrdioJyxcbiAgICAgICAgICAgIGRlX0RFOiAnTElFQkUnLFxuICAgICAgICAgICAgZW5fVVM6ICdMT1ZFJyxcbiAgICAgICAgICAgIGVzX0VTOiAnQU1PUicsXG4gICAgICAgICAgICBmcl9GUjogJ0FNT1VSJyxcbiAgICAgICAgICAgIGlkX0lEOiAnQ0lOVEEnLFxuICAgICAgICAgICAgaXRfSVQ6ICdBTU9SRScsXG4gICAgICAgICAgICBwdF9QVDogJ0FNT1InLFxuICAgICAgICAgICAgdGhfVEg6ICfguITguKfguLLguKHguKPguLHguIEnLFxuICAgICAgICAgICAgdHJfVFI6ICdBxZ5LJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnVMOMTkggWcOKVScsXG4gICAgICAgICB9LFxuICAgICAgICAgZnJhbWVBcnI6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxJywgeDogLTEwNiwgeTogMTk3LCB3aWR0aDogNzg2LCBoZWlnaHQ6IDczNiwgYW5nbGU6IDM0NCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG92ZS5mcmFtZTInLCB4OiAxMjUsIHk6IDI1Miwgd2lkdGg6IDU1NywgaGVpZ2h0OiA1NTcsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMycsIHg6IDE1NiwgeTogMjMxLCB3aWR0aDogMzk1LCBoZWlnaHQ6IDM4MiwgYW5nbGU6IDkgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWU0JywgeDogOTMsIHk6IDI0Miwgd2lkdGg6IDYxMiwgaGVpZ2h0OiA2MTIsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lNScsIHg6IDE0MSwgeTogMjM5LCB3aWR0aDogNTE5LCBoZWlnaHQ6IDUxOSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWU2JywgeDogMTMxLCB5OiAxOTMsIHdpZHRoOiA1MDAsIGhlaWdodDogNTAwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG92ZS5mcmFtZTcnLCB4OiAxMTMsIHk6IDIyNiwgd2lkdGg6IDU2MiwgaGVpZ2h0OiA1NjIsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lOCcsIHg6IDIwNiwgeTogMzEzLCB3aWR0aDogNDM3LCBoZWlnaHQ6IDQzNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWU5JywgeDogNzMsIHk6IDE1Mywgd2lkdGg6IDY1MywgaGVpZ2h0OiA2NTMsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMTAnLCB4OiAyMTcsIHk6IDE2Mywgd2lkdGg6IDU3MywgaGVpZ2h0OiA1NzMsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMTEnLCB4OiA5NiwgeTogMzEyLCB3aWR0aDogNDQzLCBoZWlnaHQ6IDQ0MywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxMicsIHg6IDEzMCwgeTogMjg2LCB3aWR0aDogNTEzLCBoZWlnaHQ6IDUxMywgYW5nbGU6IDYgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxMycsIHg6IDk1LCB5OiAyMDksIHdpZHRoOiA2MDEsIGhlaWdodDogNjAxLCBhbmdsZTogOSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG92ZS5mcmFtZTE0JywgeDogMTksIHk6IDQ1LCB3aWR0aDogNzAyLCBoZWlnaHQ6IDcwMiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxNScsIHg6IDE5MSwgeTogMjIxLCB3aWR0aDogNDY0LCBoZWlnaHQ6IDQ2NCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxNicsIHg6IDMzNSwgeTogMzAwLCB3aWR0aDogMzUxLCBoZWlnaHQ6IDM1MSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUxNycsIHg6IDE2LCB5OiAzMDcsIHdpZHRoOiA0NTAsIGhlaWdodDogNDUwLCBhbmdsZTogNCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbG92ZS5mcmFtZTE4JywgeDogLTIwLCB5OiA1MSwgd2lkdGg6IDUzMiwgaGVpZ2h0OiA1MzIsIGFuZ2xlOiA4IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMTknLCB4OiAxNDgsIHk6IDM0Mywgd2lkdGg6IDYyNCwgaGVpZ2h0OiA2MjQsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMjAnLCB4OiAxNTAsIHk6IDMyNiwgd2lkdGg6IDQ1NywgaGVpZ2h0OiA0NTcsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMjEnLCB4OiAyNzYsIHk6IDEwOSwgd2lkdGg6IDQ5MCwgaGVpZ2h0OiA0OTAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsb3ZlLmZyYW1lMjInLCB4OiA0LCB5OiAxNDMsIHdpZHRoOiA0NzUsIGhlaWdodDogNDc1LCBhbmdsZTogMTAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xvdmUuZnJhbWUyMycsIHg6IDQ3LCB5OiAzNSwgd2lkdGg6IDYxNCwgaGVpZ2h0OiA2MTQsIGFuZ2xlOiA5IH0sXG5cbiAgICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgICBpZDogJ1JFTElHSU9OJyxcblxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ1JFTElHSU9OJyxcbiAgICAgICAgICAgIGRlX0RFOiAnUkVMSUdJT04nLFxuICAgICAgICAgICAgZW5fVVM6ICdSRUxJR0lPTicsXG4gICAgICAgICAgICBlc19FUzogJ1JFTElHSU9OJyxcbiAgICAgICAgICAgIGZyX0ZSOiAnUkVMSUdJT04nLFxuICAgICAgICAgICAgaWRfSUQ6ICdSRUxJR0lPTicsXG4gICAgICAgICAgICBpdF9JVDogJ1JFTElHSU9OJyxcbiAgICAgICAgICAgIHB0X1BUOiAnUkVMSUdJT04nLFxuICAgICAgICAgICAgdGhfVEg6ICdSRUxJR0lPTicsXG4gICAgICAgICAgICB0cl9UUjogJ1JFTElHSU9OJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnUkVMSUdJT04nLFxuICAgICAgICAgfSxcbiAgICAgICAgIGZyYW1lQXJyOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWxpZ2lvbi5mcmFtZTEnLCB4OiAxNDQsIHk6IDQwMywgd2lkdGg6IDUxNywgaGVpZ2h0OiA1MTcsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWxpZ2lvbi5mcmFtZTInLCB4OiAtMjgsIHk6IDE3OCwgd2lkdGg6IDY3MCwgaGVpZ2h0OiA2NzAsIGFuZ2xlOiA0LjU2OCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVsaWdpb24uZnJhbWUzJywgeDogLTUyLCB5OiA5Miwgd2lkdGg6IDczMCwgaGVpZ2h0OiA3MzAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdyZWxpZ2lvbi5mcmFtZTQnLCB4OiAyMzEsIHk6IDM1OCwgd2lkdGg6IDYwOCwgaGVpZ2h0OiA2MDgsIGFuZ2xlOiAzNTQuMDEgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlbGlnaW9uLmZyYW1lNScsIHg6IDIwMSwgeTogMjI2LCB3aWR0aDogNjA4LCBoZWlnaHQ6IDYwOCwgYW5nbGU6IDM1NC4xMjMgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlbGlnaW9uLmZyYW1lNicsIHg6IDAsIHk6IDUyLCB3aWR0aDogNTUzLCBoZWlnaHQ6IDU1MywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlbGlnaW9uLmZyYW1lNycsIHg6IDMyLCB5OiAxMjYsIHdpZHRoOiA2MDMsIGhlaWdodDogNjAzLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVsaWdpb24uZnJhbWU4JywgeDogMTk2LCB5OiAxODcsIHdpZHRoOiA2MDMsIGhlaWdodDogNjAzLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVsaWdpb24uZnJhbWU5JywgeDogNiwgeTogMjA4LCB3aWR0aDogNjg1LCBoZWlnaHQ6IDY4NSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlbGlnaW9uLmZyYW1lMTAnLCB4OiA5OCwgeTogMjM0LCB3aWR0aDogNTkzLCBoZWlnaHQ6IDU5MywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3JlbGlnaW9uLmZyYW1lMTEnLCB4OiA1MiwgeTogOTgsIHdpZHRoOiA1NTYsIGhlaWdodDogNTU2LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncmVsaWdpb24uZnJhbWUxMicsIHg6IDU0LCB5OiAxNTQsIHdpZHRoOiA2OTEsIGhlaWdodDogNjkxLCBhbmdsZTogMCB9LFxuXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdGQU5UQVNZJyxcblxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ0ZBTlRBU1knLFxuICAgICAgICAgICAgZGVfREU6ICdGQU5UQVNZJyxcbiAgICAgICAgICAgIGVuX1VTOiAnRkFOVEFTWScsXG4gICAgICAgICAgICBlc19FUzogJ0ZBTlRBU0lBJyxcbiAgICAgICAgICAgIGZyX0ZSOiAnRkFOVEFTWScsXG4gICAgICAgICAgICBpZF9JRDogJ0ZBTlRBU1knLFxuICAgICAgICAgICAgaXRfSVQ6ICdGQU5UQVNZJyxcbiAgICAgICAgICAgIHB0X1BUOiAnRkFOVEFTWScsXG4gICAgICAgICAgICB0aF9USDogJ0ZBTlRBU1knLFxuICAgICAgICAgICAgdHJfVFI6ICdGQU5UQVNZJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnRkFOVEFTWScsXG4gICAgICAgICB9LFxuICAgICAgICAgZnJhbWVBcnI6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUxJywgeDogMTI3LCB5OiAyNzIsIHdpZHRoOiA1NDUsIGhlaWdodDogNTQ1LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTInLCB4OiA5OSwgeTogMTk5LCB3aWR0aDogNDg3LCBoZWlnaHQ6IDQ4NywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUzJywgeDogNTYsIHk6IDE3OSwgd2lkdGg6IDY3NywgaGVpZ2h0OiA2NzcsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmYW50YXN5LmZyYW1lNCcsIHg6IDE1MiwgeTogMTkxLCB3aWR0aDogNTQ3LCBoZWlnaHQ6IDU0NywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWU1JywgeDogNDIsIHk6IDIyNywgd2lkdGg6IDYwMCwgaGVpZ2h0OiA2MDAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmYW50YXN5LmZyYW1lNicsIHg6IDI3MywgeTogNDEwLCB3aWR0aDogNDg3LCBoZWlnaHQ6IDQ4NywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWU3JywgeDogMTQ1LCB5OiAyNzgsIHdpZHRoOiA1MzQsIGhlaWdodDogNTM0LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTgnLCB4OiAtNDEsIHk6IDAsIHdpZHRoOiA4NzcsIGhlaWdodDogODc3LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTknLCB4OiA5OCwgeTogNDMyLCB3aWR0aDogNDUwLCBoZWlnaHQ6IDQ1MCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUxMCcsIHg6IDksIHk6IDEyMCwgd2lkdGg6IDc4MiwgaGVpZ2h0OiA3ODIsIGFuZ2xlOiAzNTUuMjE0IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmYW50YXN5LmZyYW1lMTEnLCB4OiAtMTMsIHk6IDIxNywgd2lkdGg6IDU0OCwgaGVpZ2h0OiA1NDgsIGFuZ2xlOiA5LjgyMyB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTEyJywgeDogMjA2LCB5OiAyNTQsIHdpZHRoOiAzNzYsIGhlaWdodDogMzc2LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTEzJywgeDogMTQ5LCB5OiAyODgsIHdpZHRoOiA0NzIsIGhlaWdodDogNDcyLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTE0JywgeDogNzMsIHk6IDIwMywgd2lkdGg6IDUzMCwgaGVpZ2h0OiA1MzAsIGFuZ2xlOiA0LjI3MSB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTE1JywgeDogMjE5LCB5OiAyMTcsIHdpZHRoOiA1NjQsIGhlaWdodDogNTY0LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTE2JywgeDogMTY1LCB5OiAxNzYsIHdpZHRoOiA0NzAsIGhlaWdodDogNDcwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTE3JywgeDogMzIxLCB5OiAyNzMsIHdpZHRoOiA2MDUsIGhlaWdodDogNjA1LCBhbmdsZTogMzQzLjM4IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmYW50YXN5LmZyYW1lMTgnLCB4OiAyNjMsIHk6IDMzLCB3aWR0aDogNTM3LCBoZWlnaHQ6IDUzNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUxOScsIHg6IDE4NSwgeTogMTA5LCB3aWR0aDogNDM3LCBoZWlnaHQ6IDQzNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUyMCcsIHg6IDE4MSwgeTogMjc1LCB3aWR0aDogNDM3LCBoZWlnaHQ6IDQzNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUyMScsIHg6IDE3MCwgeTogNjksIHdpZHRoOiA0NTgsIGhlaWdodDogNDU4LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTIyJywgeDogMjAzLCB5OiAzMDgsIHdpZHRoOiAzMzUsIGhlaWdodDogMzM1LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTIzJywgeDogNTMsIHk6IDc3LCB3aWR0aDogNDMxLCBoZWlnaHQ6IDQzMSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUyNCcsIHg6IDIxMCwgeTogMTU5LCB3aWR0aDogMzg1LCBoZWlnaHQ6IDM4NSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUyNScsIHg6IDYyLCB5OiAyNzYsIHdpZHRoOiA2MDUsIGhlaWdodDogNjA1LCBhbmdsZTogMzU2Ljg1NiB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTI2JywgeDogNjcsIHk6IDM0NSwgd2lkdGg6IDQ3OCwgaGVpZ2h0OiA0NzgsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmYW50YXN5LmZyYW1lMjcnLCB4OiAyOSwgeTogMjAwLCB3aWR0aDogNDMyLCBoZWlnaHQ6IDQzMiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2ZhbnRhc3kuZnJhbWUyOCcsIHg6IDU2LCB5OiAxMjQsIHdpZHRoOiA1MDAsIGhlaWdodDogNTAwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmFudGFzeS5mcmFtZTI5JywgeDogMTY5LCB5OiAxMjksIHdpZHRoOiA1MjIsIGhlaWdodDogNTIyLCBhbmdsZTogMCB9LFxuXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdQT1NURVInLFxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ9mF2Y/ZhNi12YInLFxuICAgICAgICAgICAgZGVfREU6ICdQT1NURVInLFxuICAgICAgICAgICAgZW5fVVM6ICdQT1NURVInLFxuICAgICAgICAgICAgZXNfRVM6ICdDQVJURUxFUycsXG4gICAgICAgICAgICBmcl9GUjogJ1BPU1RFUicsXG4gICAgICAgICAgICBpZF9JRDogJ1BPU1RFUicsXG4gICAgICAgICAgICBpdF9JVDogJ1BPU1RFUicsXG4gICAgICAgICAgICBwdF9QVDogJ1BPU1RFUicsXG4gICAgICAgICAgICB0aF9USDogJ+C5guC4m+C4quC5gOC4leC4reC4o+C5jCcsXG4gICAgICAgICAgICB0cl9UUjogJ0FGScWeJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnUE9TVEVSJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAncG9zdGVyLmZyYW1lMScsIHg6IDE0MiwgeTogMTM2LCB3aWR0aDogNTkxLCBoZWlnaHQ6IDcxMSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc3Rlci5mcmFtZTInLCB4OiA3MCwgeTogMTM1LCB3aWR0aDogNDIwLCBoZWlnaHQ6IDY4MCwgYW5nbGU6IC00OCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncG9zdGVyLmZyYW1lMycsIHg6IDIwNiwgeTogNzUsIHdpZHRoOiA2MTEsIGhlaWdodDogNTAxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncG9zdGVyLmZyYW1lNCcsIHg6IDIwOSwgeTogMTEwLCB3aWR0aDogNDAwLCBoZWlnaHQ6IDUzNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc3Rlci5mcmFtZTUnLCB4OiAxNTAsIHk6IDE2MSwgd2lkdGg6IDQ4NSwgaGVpZ2h0OiA2NzksIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdwb3N0ZXIuZnJhbWU2JywgeDogMTUxLCB5OiAxNzIsIHdpZHRoOiA0NzMsIGhlaWdodDogNTg5LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAncG9zdGVyLmZyYW1lNycsIHg6IDIxNCwgeTogMjM4LCB3aWR0aDogNTAwLCBoZWlnaHQ6IDYwOSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3Bvc3Rlci5mcmFtZTgnLCB4OiAxNDUsIHk6IDE0NSwgd2lkdGg6IDUxNiwgaGVpZ2h0OiA2NjAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdGTE9XRVJTJyxcbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICfYo9iy2YfYp9ixJyxcbiAgICAgICAgICAgIGRlX0RFOiAnQkxVTUVOJyxcbiAgICAgICAgICAgIGVuX1VTOiAnRkxPV0VSUycsXG4gICAgICAgICAgICBlc19FUzogJ0ZMT1JFUycsXG4gICAgICAgICAgICBmcl9GUjogJ0ZMRVVSUycsXG4gICAgICAgICAgICBpZF9JRDogJ0JVTkdBLUJVTkdBJyxcbiAgICAgICAgICAgIGl0X0lUOiAnRklPUkknLFxuICAgICAgICAgICAgcHRfUFQ6ICdGTE9SRVMnLFxuICAgICAgICAgICAgdGhfVEg6ICfguJTguK3guIHguYTguKHguYknLFxuICAgICAgICAgICAgdHJfVFI6ICfDh0nDh0VLTEVSJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnSE9BJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnZmxvd2Vycy5mcmFtZTEnLCB4OiAxMjIsIHk6IDE5MSwgd2lkdGg6IDUxMywgaGVpZ2h0OiA0OTIsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmbG93ZXJzLmZyYW1lMicsIHg6IDExMCwgeTogMjEwLCB3aWR0aDogNTgwLCBoZWlnaHQ6IDU4MCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Zsb3dlcnMuZnJhbWUzJywgeDogMjEyLCB5OiA0MDIsIHdpZHRoOiAzODUsIGhlaWdodDogNDY5LCBhbmdsZTogNCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnZmxvd2Vycy5mcmFtZTQnLCB4OiA3MywgeTogMTgxLCB3aWR0aDogNjgxLCBoZWlnaHQ6IDUyMSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Zsb3dlcnMuZnJhbWU1JywgeDogNTAsIHk6IDkxLCB3aWR0aDogNzAwLCBoZWlnaHQ6IDgxOCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Zsb3dlcnMuZnJhbWU2JywgeDogNiwgeTogMjYzLCB3aWR0aDogNTE2LCBoZWlnaHQ6IDU3NSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2Zsb3dlcnMuZnJhbWU3JywgeDogMTU0LCB5OiAxOTIsIHdpZHRoOiA1MzIsIGhlaWdodDogNTc3LCBhbmdsZTogMzU2IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdmbG93ZXJzLmZyYW1lOCcsIHg6IDI3NSwgeTogMTY2LCB3aWR0aDogNDg3LCBoZWlnaHQ6IDYyMywgYW5nbGU6IDAgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgICBpZDogJ01BTlNJT05TJyxcbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICdNQU5TSU9OUycsXG4gICAgICAgICAgICBkZV9ERTogJ01BTlNJT05TJyxcbiAgICAgICAgICAgIGVuX1VTOiAnTUFOU0lPTlMnLFxuICAgICAgICAgICAgZXNfRVM6ICdNQU5TSU9ORVMnLFxuICAgICAgICAgICAgZnJfRlI6ICdNQU5TSU9OUycsXG4gICAgICAgICAgICBpZF9JRDogJ01BTlNJT05TJyxcbiAgICAgICAgICAgIGl0X0lUOiAnTUFOU0lPTlMnLFxuICAgICAgICAgICAgcHRfUFQ6ICdNQU5Tw5VFUycsXG4gICAgICAgICAgICB0aF9USDogJ01BTlNJT05TJyxcbiAgICAgICAgICAgIHRyX1RSOiAnTUFOU0lPTlMnLFxuICAgICAgICAgICAgdmlfVk46ICdNQU5TSU9OUycsXG4gICAgICAgICB9LFxuICAgICAgICAgZnJhbWVBcnI6IFtcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lMScsIHg6IDI4MywgeTogMTE4LCB3aWR0aDogMzAzLCBoZWlnaHQ6IDMwMywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lMicsIHg6IDI1NCwgeTogMjMwLCB3aWR0aDogMzIxLCBoZWlnaHQ6IDMyMSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lMycsIHg6IDIwMiwgeTogMjc3LCB3aWR0aDogMzc3LCBoZWlnaHQ6IDM3NywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lNCcsIHg6IDQ0LCB5OiA3MCwgd2lkdGg6IDQzMCwgaGVpZ2h0OiA0MzAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYW5zaW9ucy5mcmFtZTUnLCB4OiAxODIsIHk6IDEyMSwgd2lkdGg6IDQzNywgaGVpZ2h0OiA0MzcgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lNicsIHg6IDMzNCwgeTogMTYyLCB3aWR0aDogMzgzLCBoZWlnaHQ6IDM4MywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lNycsIHg6IDQyLCB5OiA1Miwgd2lkdGg6IDQwNiwgaGVpZ2h0OiA0MDYsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYW5zaW9ucy5mcmFtZTgnLCB4OiAxOSwgeTogMTcwLCB3aWR0aDogMzc5LCBoZWlnaHQ6IDM3OSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lOScsIHg6IDIyMCB5OiAyMzEsIHdpZHRoOiA0MDEgaGVpZ2h0OiA0MDEsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYW5zaW9ucy5mcmFtZTEwJywgeDogMzksIHk6IDI4OSwgd2lkdGg6IDQ2NSwgaGVpZ2h0OiA0NjUsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYW5zaW9ucy5mcmFtZTExJywgeDogMTU1LCB5OiAxNTIsIHdpZHRoOiA0OTEsIGhlaWdodDogNDkxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxMicsIHg6IDE3LCB5OiA5Miwgd2lkdGg6IDQzMSwgaGVpZ2h0OiA0MzEsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYW5zaW9ucy5mcmFtZTEzJywgeDogMjMyLCB5OiAxOTYsIHdpZHRoOiA0NTEsIGhlaWdodDogNDUxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxNCcsIHg6IDMzMywgeTogMTQzLCB3aWR0aDogNDgzLCBoZWlnaHQ6IDQ4MywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lMTUnLCB4OiA1NywgeTogOTYsIHdpZHRoOiA0MjUsIGhlaWdodDogNDI1LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxNicsIHg6IDE3MCwgeTogNTYsIHdpZHRoOiA0NjEsIGhlaWdodDogNDYxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxNycsIHg6IDE2OSwgeTogNjYsIHdpZHRoOiA0NjEsIGhlaWdodDogNDYxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxOCcsIHg6IDIyMSwgeTogOTgsIHdpZHRoOiAzNjksIGhlaWdodDogMzY5LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUxOScsIHg6IDQ0LCB5OiAzOCB3aWR0aDogNDE4LCBoZWlnaHQ6IDQxOCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hbnNpb25zLmZyYW1lMjAnLCB4OiAzNywgeTogODQsIHdpZHRoOiAzODAsIGhlaWdodDogMzgwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUyMScsIHg6IDY1LCB5OiAyMzMsIHdpZHRoOiAzNDcsIGhlaWdodDogMzQ3LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUyMicsIHg6IDQ0LCB5OiAxNjcsIHdpZHRoOiAzNzAsIGhlaWdodDogMzcwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbWFuc2lvbnMuZnJhbWUyMycsIHg6IDE1LCB5OiAxMjEsIHdpZHRoOiA0MjksIGhlaWdodDogNDI5LCBhbmdsZTogMCB9LFxuXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdUUkFWRUwnLFxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ9iz2YHYsScsXG4gICAgICAgICAgICBkZV9ERTogJ1JFSVNFTicsXG4gICAgICAgICAgICBlbl9VUzogJ1RSQVZFTCcsXG4gICAgICAgICAgICBlc19FUzogJ1ZJQUpFUycsXG4gICAgICAgICAgICBmcl9GUjogJ1ZPWUFHRScsXG4gICAgICAgICAgICBpZF9JRDogJ0JFUEVSR0lBTicsXG4gICAgICAgICAgICBpdF9JVDogJ1ZJQUdHSU8nLFxuICAgICAgICAgICAgcHRfUFQ6ICdWSUFHRU0nLFxuICAgICAgICAgICAgdGhfVEg6ICfguJfguYjguK3guIfguYDguJfguLXguYjguKLguKcnLFxuICAgICAgICAgICAgdHJfVFI6ICdTRVlBSEFUJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnRFUgTOG7ikNIJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAndHJhdmVsLmZyYW1lMScsIHg6IDE4MCwgeTogMzk3LCB3aWR0aDogNDI0LCBoZWlnaHQ6IDQyNCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyYXZlbC5mcmFtZTInLCB4OiAyNjAsIHk6IDI3MSwgd2lkdGg6IDQyNiwgaGVpZ2h0OiA0NDksIGFuZ2xlOiAzNTIgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyYXZlbC5mcmFtZTMnLCB4OiAzNDEsIHk6IDE0NSwgd2lkdGg6IDQwMywgaGVpZ2h0OiA0NTgsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmF2ZWwuZnJhbWU0JywgeDogMjA0LCB5OiAyODIsIHdpZHRoOiAzOTgsIGhlaWdodDogMzk4LCBhbmdsZTogMzQ4IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICd0cmF2ZWwuZnJhbWU1JywgeDogMjM3LCB5OiA1MTEsIHdpZHRoOiAzMTksIGhlaWdodDogMzcwLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJhdmVsLmZyYW1lNicsIHg6IDE2LCB5OiAyNzUsIHdpZHRoOiAzNTAsIGhlaWdodDogNDM5LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAndHJhdmVsLmZyYW1lNycsIHg6IDMxNiwgeTogMzUxLCB3aWR0aDogMzY2LCBoZWlnaHQ6IDQ1MSwgYW5nbGU6IDMgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ3RyYXZlbC5mcmFtZTgnLCB4OiAxODYsIHk6IDI4Niwgd2lkdGg6IDU4MSwgaGVpZ2h0OiA2MDMsIGFuZ2xlOiAzNDAgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgICBpZDogJ0NJVElFUycsXG4gICAgICAgICBsYW5ndWFnZXM6IHtcbiAgICAgICAgICAgIGFyX0FSOiAn2YXZj9iv2YYnLFxuICAgICAgICAgICAgZGVfREU6ICdTVMOERFRFJyxcbiAgICAgICAgICAgIGVuX1VTOiAnQ0lUSUVTJyxcbiAgICAgICAgICAgIGVzX0VTOiAnQ0lVREFERVMnLFxuICAgICAgICAgICAgZnJfRlI6ICdWSUxMRVMnLFxuICAgICAgICAgICAgaWRfSUQ6ICdLT1RBJyxcbiAgICAgICAgICAgIGl0X0lUOiAnQ0lUVMOAJyxcbiAgICAgICAgICAgIHB0X1BUOiAnQ0lEQURFUycsXG4gICAgICAgICAgICB0aF9USDogJ+C5gOC4oeC4t+C4reC4hycsXG4gICAgICAgICAgICB0cl9UUjogJ0tFTlRMRVInLFxuICAgICAgICAgICAgdmlfVk46ICfEkMOUIFRI4buKJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2l0aWVzLmZyYW1lMScsIHg6IDMyMywgeTogMTI3LCB3aWR0aDogNDI0LCBoZWlnaHQ6IDQyNCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTInLCB4OiA2NCwgeTogMTE1LCB3aWR0aDogMzc2LCBoZWlnaHQ6IDM3NiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTMnLCB4OiA4NCwgeTogMTA2LCB3aWR0aDogNDQ0LCBoZWlnaHQ6IDQ0NCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTQnLCB4OiAxNjYsIHk6IDczLCB3aWR0aDogNDY4LCBoZWlnaHQ6IDQ2OCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTUnLCB4OiA5MiwgeTogNTQsIHdpZHRoOiA0NTksIGhlaWdodDogNjE3LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY2l0aWVzLmZyYW1lNicsIHg6IDI4MCwgeTogMTE1LCB3aWR0aDogNDIwLCBoZWlnaHQ6IDQyMCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTcnLCB4OiA4MSwgeTogMTUwLCB3aWR0aDogNTE4LCBoZWlnaHQ6IDU5MiwgYW5nbGU6IDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NpdGllcy5mcmFtZTgnLCB4OiA4MiwgeTogMTI3LCB3aWR0aDogNTQyLCBoZWlnaHQ6IDU5NywgYW5nbGU6IDIgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgICBpZDogJ0FOSU1BTFMnLFxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ9it2YrZiNin2YbYp9iqJyxcbiAgICAgICAgICAgIGRlX0RFOiAnVElFUkUnLFxuICAgICAgICAgICAgZW5fVVM6ICdBTklNQUxTJyxcbiAgICAgICAgICAgIGVzX0VTOiAnQU5JTUFMRVMnLFxuICAgICAgICAgICAgZnJfRlI6ICdBTklNQVVYJyxcbiAgICAgICAgICAgIGlkX0lEOiAnSEVXQU4nLFxuICAgICAgICAgICAgaXRfSVQ6ICdBTklNQUxJJyxcbiAgICAgICAgICAgIHB0X1BUOiAnQU5JTUFJUycsXG4gICAgICAgICAgICB0aF9USDogJ+C4quC4seC4leC4p+C5jCcsXG4gICAgICAgICAgICB0cl9UUjogJ0hBWVZBTkxBUicsXG4gICAgICAgICAgICB2aV9WTjogJ8SQ4buYTkcgVuG6rFQnLFxuICAgICAgICAgfSxcbiAgICAgICAgIGZyYW1lQXJyOiBbXG4gICAgICAgICAgICB7IG5hbWU6ICdhbmltYWxzLmZyYW1lMScsIHg6IDI5NCwgeTogNjUsIHdpZHRoOiA0NzcsIGhlaWdodDogNDk3LCBhbmdsZTogMzQzIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdhbmltYWxzLmZyYW1lMicsIHg6IDEzNywgeTogMTA0LCB3aWR0aDogNTI2LCBoZWlnaHQ6IDUyNiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2FuaW1hbHMuZnJhbWUzJywgeDogMzYwLCB5OiA0MjAsIHdpZHRoOiA0MjEsIGhlaWdodDogNDIxLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYW5pbWFscy5mcmFtZTQnLCB4OiAxMDksIHk6IDc5LCB3aWR0aDogNTQ5LCBoZWlnaHQ6IDU0OSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2FuaW1hbHMuZnJhbWU1JywgeDogMjgxLCB5OiAxMzcsIHdpZHRoOiA0NTcsIGhlaWdodDogNDU3LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYW5pbWFscy5mcmFtZTYnLCB4OiAxNzcsIHk6IDI2Nywgd2lkdGg6IDQ0NiwgaGVpZ2h0OiA1NzYsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdhbmltYWxzLmZyYW1lNycsIHg6IDc3LCB5OiAxMjIsIHdpZHRoOiAzOTAsIGhlaWdodDogNDk1LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnYW5pbWFscy5mcmFtZTgnLCB4OiA5LCB5OiAyNzYsIHdpZHRoOiA0NDYsIGhlaWdodDogNDg4LCBhbmdsZTogMCwgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuXG4gICAgICB7XG4gICAgICAgICBpZDogJ01BR0FaSU5FJyxcbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICdNQUdBWklORScsXG4gICAgICAgICAgICBkZV9ERTogJ01BR0FaSU5FJyxcbiAgICAgICAgICAgIGVuX1VTOiAnTUFHQVpJTkUnLFxuICAgICAgICAgICAgZXNfRVM6ICdSRVZJU1RBJyxcbiAgICAgICAgICAgIGZyX0ZSOiAnTUFHQVpJTkUnLFxuICAgICAgICAgICAgaWRfSUQ6ICdNQUdBWklORScsXG4gICAgICAgICAgICBpdF9JVDogJ01BR0FaSU5FJyxcbiAgICAgICAgICAgIHB0X1BUOiAnTUFHQVpJTkVTJyxcbiAgICAgICAgICAgIHRoX1RIOiAnTUFHQVpJTkUnLFxuICAgICAgICAgICAgdHJfVFI6ICdNQUdBWklORScsXG4gICAgICAgICAgICB2aV9WTjogJ01BR0FaSU5FJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbWFnYXppbmUuZnJhbWUxJywgeDogMTQ4LCB5OiAxMzAsIHdpZHRoOiA1ODcsIGhlaWdodDogNTg3LCBhbmdsZTogMTcuNTc0IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYWdhemluZS5mcmFtZTInLCB4OiA3MywgeTogLTYsIHdpZHRoOiA2MDIsIGhlaWdodDogNjAyLCBhbmdsZTogMjAuMzggfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hZ2F6aW5lLmZyYW1lMycsIHg6IDI5LCB5OiA2MCwgd2lkdGg6IDY4NSwgaGVpZ2h0OiA2ODUsIGFuZ2xlOiAzMjcuNDk2IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYWdhemluZS5mcmFtZTQnLCB4OiAtNzIsIHk6IDM2NCwgd2lkdGg6IDY4MywgaGVpZ2h0OiA2ODMsIGFuZ2xlOiAxNy40NTcgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hZ2F6aW5lLmZyYW1lNScsIHg6IC0xMDcsIHk6IDM3Miwgd2lkdGg6IDcxMSwgaGVpZ2h0OiA3MTEsIGFuZ2xlOiAxMC41MjYgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hZ2F6aW5lLmZyYW1lNicsIHg6IC0yNCwgeTogMjQ3LCB3aWR0aDogODExLCBoZWlnaHQ6IDgxMSwgYW5nbGU6IDE4IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdtYWdhemluZS5mcmFtZTcnLCB4OiAyMTUsIHk6IDM5OSwgd2lkdGg6IDU1NSwgaGVpZ2h0OiA1NTUsIGFuZ2xlOiAzNTQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ21hZ2F6aW5lLmZyYW1lOCcsIHg6IC0yNCwgeTogMjk0LCB3aWR0aDogNjgyLCBoZWlnaHQ6IDY4MiwgYW5nbGU6IDQ1IH0sXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdMQU5EU0NBUEUnLFxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ9mF2YbYp9i42LEg2LfYqNmK2LnZitipJyxcbiAgICAgICAgICAgIGRlX0RFOiAnTEFORFNDSEFGVCcsXG4gICAgICAgICAgICBlbl9VUzogJ0xBTkRTQ0FQRScsXG4gICAgICAgICAgICBlc19FUzogJ1BBSVNBSkVTJyxcbiAgICAgICAgICAgIGZyX0ZSOiAnUEFZU0FHRScsXG4gICAgICAgICAgICBpZF9JRDogJ1BFTUFOREFOR0FOJyxcbiAgICAgICAgICAgIGl0X0lUOiAnUEFFU0FHR0lPJyxcbiAgICAgICAgICAgIHB0X1BUOiAnUEFJU0FHRU0nLFxuICAgICAgICAgICAgdGhfVEg6ICfguKDguLnguKHguLTguJvguKPguLDguYDguJfguKgnLFxuICAgICAgICAgICAgdHJfVFI6ICdNQU5aQVJBJyxcbiAgICAgICAgICAgIHZpX1ZOOiAnUEhPTkcgQ+G6ok5IJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbGFuZHNjYXBlLmZyYW1lMScsIHg6IDE3MCwgeTogMTYwLCB3aWR0aDogNDU4LCBoZWlnaHQ6IDQ2OCwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xhbmRzY2FwZS5mcmFtZTInLCB4OiAxNTksIHk6IDEwOCwgd2lkdGg6IDQ4MCwgaGVpZ2h0OiA0ODAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsYW5kc2NhcGUuZnJhbWUzJywgeDogMTE1LCB5OiAxMzUsIHdpZHRoOiA1MjIsIGhlaWdodDogNTIyLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbGFuZHNjYXBlLmZyYW1lNCcsIHg6IDI2OCwgeTogMjYwLCB3aWR0aDogNDQyLCBoZWlnaHQ6IDUwNywgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xhbmRzY2FwZS5mcmFtZTUnLCB4OiAxNTUsIHk6IDI1NCwgd2lkdGg6IDUwMSwgaGVpZ2h0OiA1NjcsIGFuZ2xlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdsYW5kc2NhcGUuZnJhbWU2JywgeDogMTE5LCB5OiAxMjcsIHdpZHRoOiA1NTMsIGhlaWdodDogNTUzLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbGFuZHNjYXBlLmZyYW1lNycsIHg6IDE1NCwgeTogMjE3LCB3aWR0aDogNDkyLCBoZWlnaHQ6IDQ5MiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2xhbmRzY2FwZS5mcmFtZTgnLCB4OiAxODAsIHk6IDE4NCwgd2lkdGg6IDQ0MSwgaGVpZ2h0OiA0NDEsIGFuZ2xlOiAwIH0sXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdDTEFTU0lDJyxcbiAgICAgICAgIGxhbmd1YWdlczoge1xuICAgICAgICAgICAgYXJfQVI6ICdDTEFTU0lDJyxcbiAgICAgICAgICAgIGRlX0RFOiAnQ0xBU1NJQycsXG4gICAgICAgICAgICBlbl9VUzogJ0NMQVNTSUMnLFxuICAgICAgICAgICAgZXNfRVM6ICdDTEFTSUNPJyxcbiAgICAgICAgICAgIGZyX0ZSOiAnQ0xBU1NJQycsXG4gICAgICAgICAgICBpZF9JRDogJ0NMQVNTSUMnLFxuICAgICAgICAgICAgaXRfSVQ6ICdDTEFTU0lDJyxcbiAgICAgICAgICAgIHB0X1BUOiAnQ0xBU1NJQ09TJyxcbiAgICAgICAgICAgIHRoX1RIOiAnQ0xBU1NJQycsXG4gICAgICAgICAgICB0cl9UUjogJ0NMQVNTSUMnLFxuICAgICAgICAgICAgdmlfVk46ICdDTEFTU0lDJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnY2xhc2ljb3MuZnJhbWUxJywgeDogMjcuNjQsIHk6IDI3Ny41NCwgd2lkdGg6IDU3OSwgaGVpZ2h0OiA1NzksIGFuZ2xlOiA3LjUzIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGFzaWNvcy5mcmFtZTInLCB4OiAxNjAsIHk6IDE2Niwgd2lkdGg6IDU3NCwgaGVpZ2h0OiA1NzQsIGFuZ2xlOiAzNTMuMDQgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ2NsYXNpY29zLmZyYW1lMycsIHg6IDEsIHk6IDIwNiwgd2lkdGg6IDU0NCwgaGVpZ2h0OiA1NDQsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGFzaWNvcy5mcmFtZTQnLCB4OiAyMDIsIHk6IDE3Miwgd2lkdGg6IDM5NiwgaGVpZ2h0OiAzOTYsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGFzaWNvcy5mcmFtZTUnLCB4OiAxOTMsIHk6IDI1NCwgd2lkdGg6IDU0NSwgaGVpZ2h0OiA1NDUsIGFuZ2xlOiA0IH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGFzaWNvcy5mcmFtZTYnLCB4OiAzNywgeTogMjQ1LCB3aWR0aDogNTgwLCBoZWlnaHQ6IDU4MCwgYW5nbGU6IDcuMDExIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICdjbGFzaWNvcy5mcmFtZTcnLCB4OiAzMiwgeTogOTEsIHdpZHRoOiA0MTUsIGhlaWdodDogNDE1LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnY2xhc2ljb3MuZnJhbWU4JywgeDogMjExLCB5OiA4MCwgd2lkdGg6IDU0MCwgaGVpZ2h0OiA1NDAsIGFuZ2xlOiAwIH0sXG4gICAgICAgICBdLFxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICAgaWQ6ICdOQVRVUkUnLFxuICAgICAgICAgbGFuZ3VhZ2VzOiB7XG4gICAgICAgICAgICBhcl9BUjogJ9i32KjZiti52KknLFxuICAgICAgICAgICAgZGVfREU6ICdOQVRVUicsXG4gICAgICAgICAgICBlbl9VUzogJ05BVFVSRScsXG4gICAgICAgICAgICBlc19FUzogJ05BVFVSQUxFWkEnLFxuICAgICAgICAgICAgZnJfRlI6ICdOQVRVUkUnLFxuICAgICAgICAgICAgaWRfSUQ6ICdBTEFNJyxcbiAgICAgICAgICAgIGl0X0lUOiAnTkFUVVJBJyxcbiAgICAgICAgICAgIHB0X1BUOiAnTkFUVVJFWkEnLFxuICAgICAgICAgICAgdGhfVEg6ICfguJjguKPguKPguKHguIrguLLguJXguLQnLFxuICAgICAgICAgICAgdHJfVFI6ICdET8SeQScsXG4gICAgICAgICAgICB2aV9WTjogJ1Thu7AgTkhJw4pOJyxcbiAgICAgICAgIH0sXG4gICAgICAgICBmcmFtZUFycjogW1xuICAgICAgICAgICAgeyBuYW1lOiAnbmF0dXJlLmZyYW1lMScsIHg6IDExMywgeTogMjc2LCB3aWR0aDogNTQ2LCBoZWlnaHQ6IDU0NiwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ25hdHVyZS5mcmFtZTInLCB4OiA2OCwgeTogNDUsIHdpZHRoOiA2NjMsIGhlaWdodDogNjYzLCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbmF0dXJlLmZyYW1lMycsIHg6IDE0OCwgeTogODAsIHdpZHRoOiA0ODQsIGhlaWdodDogNTY5LCBhbmdsZTogMCB9LFxuICAgICAgICAgICAgeyBuYW1lOiAnbmF0dXJlLmZyYW1lNCcsIHg6IDIwOSwgeTogMTAyLCB3aWR0aDogNDI2LCBoZWlnaHQ6IDU2MSwgYW5nbGU6IDAgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ25hdHVyZS5mcmFtZTUnLCB4OiAxOTcsIHk6IDE1Miwgd2lkdGg6IDQ2MSwgaGVpZ2h0OiA1NDYsIGFuZ2xlOiAzNTYgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ25hdHVyZS5mcmFtZTYnLCB4OiAyMTMsIHk6IDMwMCwgd2lkdGg6IDQ0OSwgaGVpZ2h0OiA1MzMsIGFuZ2xlOiAzNTUgfSxcbiAgICAgICAgICAgIHsgbmFtZTogJ25hdHVyZS5mcmFtZTcnLCB4OiAyNDAsIHk6IDI1Niwgd2lkdGg6IDQ4MywgaGVpZ2h0OiA1ODcsIGFuZ2xlOiAwIH0sXG4gICAgICAgICAgICB7IG5hbWU6ICduYXR1cmUuZnJhbWU4JywgeDogNjEsIHk6IDYwLCB3aWR0aDogNjUwLCBoZWlnaHQ6IDgxNCwgYW5nbGU6IDAgfSxcbiAgICAgICAgIF0sXG4gICAgICB9LFxuICAgXSxcblxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/game_mechanic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '438ea0dqARKwKWtyk/Ae8uA', 'game_mechanic');
// script/core-game/game_mechanic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameMechanic = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.gameMechanic = {
    currentHintCellNodeArr: [],
    isShowingHint: false,
    lastCategoryName: '',
    lastFrameName: '',
    currentCategoryName: '',
    currentFrameName: '',
    currentSizeMode: '3x3',
    isPaused: true,
    timeRemaining: 0,
    timeTickUnit: 0.2,
    timerNode: null,
    isLevelUp: false,
    init: function () {
        var _this = this;
        cc.director.getCollisionManager().enabled = true;
        this.timerNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/play_time/label_time');
        _.setInterval(function () { return _this.timerTickFunc(); }, this.timeTickUnit * 1000);
    },
    timerTickFunc: function () {
        if (!this.isPlaying() || this.isPaused || _G.tutorial.isShowingTut)
            return;
        this.timeRemaining = _.max(this.timeRemaining - this.timeTickUnit, 0);
        var str = _.secondsToTimeCountdown(_.ceil(this.timeRemaining));
        _G.utilsUI.fillLabel(this.timerNode, str);
        if (this.timeRemaining == 0)
            return this.onLose();
    },
    previewGame: function (categoryName, frameName, maxCellX, maxCellY, isFromCategory) {
        var _this = this;
        if (maxCellX === void 0) { maxCellX = 3; }
        if (maxCellY === void 0) { maxCellY = 3; }
        if (isFromCategory === void 0) { isFromCategory = false; }
        if (!isFromCategory && !this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial')
            return;
        this.currentSizeMode = maxCellX + 'x' + maxCellY;
        _G.coreUI.onTabPreview(this.currentSizeMode);
        _G.coreUI.setUIPlayState((_G.user.isVersionV2 && isFromCategory) ? _G.types.gameState.v2 : _G.types.gameState.pick_mode);
        var levelInfo = { maxCellX: maxCellX, maxCellY: maxCellY, categoryName: categoryName, frameName: frameName };
        this.currentCategoryName = categoryName;
        this.currentFrameName = frameName;
        _G.control.clearSelectedCellNode();
        _G.coreUI.showNagScreen();
        _G.mapVisual.clearMap(function () {
            _G.coreUI.hideNagScreen();
            // check the frame is loaded to show. Unless show loading
            var loadingLabelNode = cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/label_game_loading');
            loadingLabelNode.active = true;
            _.waitToRun(function () {
                _G.coreUI.showNagScreen();
                loadingLabelNode.active = false;
                _G.mapVisual.render(levelInfo, function () {
                    // _.log(`calling _G.coreFX.showGrid() after mapVisual.render()`);
                    _G.coreFX.showGrid(function () { return _G.coreUI.hideNagScreen(); });
                });
                if (_this.lastCategoryName != _this.currentCategoryName || _this.lastFrameName != _this.currentFrameName) {
                    _this.lastCategoryName = _this.currentCategoryName;
                    _this.lastFrameName = _this.currentFrameName;
                    _G.analytic.logViewContent(_this.currentCategoryName, _this.currentFrameName);
                }
            }, 'isCurrentFrameLoaded()', _this);
        });
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
    },
    startGame: function () {
        var _this = this;
        if (!this.isCurrentFrameLoaded() && this.currentCategoryName != 'tutorial')
            return;
        if (this.currentSizeMode == '1x1')
            this.previewGame(this.currentCategoryName, this.currentFrameName, 3, 3);
        this.timeRemaining = _G.configGame.playTime[this.currentSizeMode == '1x1' ? '3x3' : this.currentSizeMode];
        _G.coreUI.setUIPlayState(_G.types.gameState.playing);
        this.timerTickFunc();
        _G.coreUI.updatePuzzleProgressBar(0);
        _G.coreFX.hideGrid(function () {
            _this.shuffleCells(function () {
                // _.log(`calling _G.coreFX.showGrid() after gameMechanic.shuffleCells()`);
                _G.coreFX.showGrid();
                _this.updatePuzzleCompletionBar();
            });
        });
        if (!_G.tutorial.isShowingTut)
            this.onResume();
    },
    replay: function () {
        this.currentSizeMode = (this.currentSizeMode == '1x1') ? '3x3' : this.currentSizeMode;
        var currentSizeArr = this.currentSizeMode.split('x');
        this.previewGame(this.currentCategoryName, this.currentFrameName, parseInt(currentSizeArr[0]), parseInt(currentSizeArr[1]));
        this.startGame();
    },
    // when user won a puzzle, pick a random puzzle that he has not played 
    playNextRandomPuzzle: function () {
        var newPuzzleIdArr = _G.categoryList.frameNodeArr
            .map(function (node) { return node.categoryName + "_" + node.name; })
            .filter(function (puzzleId) { return !_G.user.playedGames[puzzleId]; });
        var newPuzzleId = _.randomArrItem(newPuzzleIdArr) || _.randomArrItem(Object.keys(_G.user.playedGames));
        // _.log(`onWinContinue >> newPuzzleId = ${newPuzzleId} // newPuzzleIdArr=`, newPuzzleIdArr);
        var tmpArr = newPuzzleId.split('_');
        _G.resources.loadSingleFrame(tmpArr[0], tmpArr[1]);
        this.previewGame(tmpArr[0], tmpArr[1], 3, 3, true);
    },
    isCurrentFrameLoaded: function () {
        if (_G.tutorial.isShowingTut || _G.tutorial.isCurrentPuzzleTutorial())
            return true;
        return _G.resources.frameSprites[this.currentCategoryName][this.currentFrameName];
    },
    shuffleCells: function (callback) {
        if (_G.tutorial.isShowingTut)
            return this.shuffleCellsForTut(callback);
        // generate random cell position
        var randomCellPosArr = [];
        var orderIndex = 0;
        for (var x = 1; x <= _G.mapVisual.currentMaxCellX; x++) {
            for (var y = 1; y <= _G.mapVisual.currentMaxCellY; y++) {
                randomCellPosArr.push({ x: x, y: y, orderIndex: orderIndex++ });
            }
        }
        _.shuffleArray(randomCellPosArr);
        // check if too many cells are in their correct positions
        var correctedCellNum = 0;
        var toltalCellNum = _G.mapVisual.currentMaxCellX * _G.mapVisual.currentMaxCellY;
        var maxCorrectCellRatio = 0.35;
        var isTooManyCorrectedCells = randomCellPosArr.some(function (cellPosInfo, index) {
            if (index == cellPosInfo.orderIndex)
                correctedCellNum++;
            if (correctedCellNum / toltalCellNum > maxCorrectCellRatio)
                return true;
        });
        // _.log(`shuffleCells >> isTooManyCorrectedCells = ${isTooManyCorrectedCells} // correctedCellNum (${correctedCellNum}) / toltalCellNum(${toltalCellNum}) = ${correctedCellNum / toltalCellNum} `);
        if (isTooManyCorrectedCells)
            return this.shuffleCells(callback);
        // set real cell pos
        _G.mapVisual.gridNode.children.map(function (childNode, i) {
            _G.mapVisual.setCellNodePos(childNode, randomCellPosArr[i].x, randomCellPosArr[i].y);
        });
        if (callback)
            callback();
    },
    shuffleCellsForTut: function (callback) {
        var _this = this;
        var cellPosArr = [
            { x: 3, y: 3 },
            { x: 1, y: 1 },
            { x: 3, y: 1 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 2, y: 2 },
            { x: 2, y: 1 },
            { x: 1, y: 2 },
            { x: 3, y: 2 },
        ];
        var cellNodeArr = _G.mapVisual.gridNode.children;
        cellNodeArr.map(function (cellNode, index) { return _G.mapVisual.setCellNodePos(cellNode, cellPosArr[index].x, cellPosArr[index].y); });
        var cellNode1 = _G.tutorial.cellNode1 = cellNodeArr[5];
        var cellNode2 = _G.tutorial.cellNode2 = cellNodeArr[4];
        // _G.mapVisual.setCellNodePos(cellNode1, cellNode2.orgCellPos.x, cellNode2.orgCellPos.y);
        // _G.mapVisual.setCellNodePos(cellNode2, cellNode1.orgCellPos.x, cellNode1.orgCellPos.y);
        cellNodeArr.map(function (cellNode) {
            _this.checkCellInCorrectPos(cellNode);
        });
        if (callback)
            callback();
    },
    updatePuzzleCompletionBar: function () {
        var _this = this;
        var correctCellCount = 0;
        var wrongCellCount = 0;
        _G.mapVisual.gridNode.children.map(function (cellNode) {
            if (_this.isFixedCell(cellNode))
                correctCellCount++;
            else
                wrongCellCount++;
        });
        _G.coreUI.updatePuzzleProgressBar(correctCellCount / (wrongCellCount + correctCellCount), 0.2);
    },
    onSwapCell: function (cellNode1, cellNode2) {
        var _this = this;
        _G.gameMechanic.clearHint();
        _G.coreUI.showNagScreen();
        _G.mapVisual.swapCellAnim(cellNode1, cellNode2, function () {
            _G.coreUI.hideNagScreen();
            _this.checkCellInCorrectPos(cellNode1);
            _this.checkCellInCorrectPos(cellNode2);
            _this.updatePuzzleCompletionBar();
            _this.checkWin();
            _G.tutorial.checkOnSwapCells();
        });
    },
    checkWin: function () {
        var _this = this;
        var isWin = _G.mapVisual.gridNode.children.every(function (cellNode) { return _this.isFixedCell(cellNode); });
        _.log(" isWin = " + isWin + " ");
        if (!isWin)
            return;
        this.onPause();
        var starToAdd = _G.configGame.winCoinReward[this.currentSizeMode];
        _G.user.addStars(starToAdd, true);
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/star_num_base/label_stars'), '+' + starToAdd);
        // _G.utilsUI.fillLabel(this.winTimerNode, this.timerNode.getComponent(cc.Label).string);
        _G.coreUI.setUIPlayState(_G.types.gameState.won);
        this.isLevelUp = _G.user.addExp(_G.configGame.winExp, true);
        if (this.isLevelUp)
            _G.user.addStars(_G.configGame.levelUpCoinReward, true);
        // save game as played & re-render icon-checked for all frame cells
        var gameName = this.currentCategoryName + '_' + this.currentFrameName;
        if (!_G.user.playedGames[gameName]) {
            _G.user.playedGames[gameName] = 1;
            _G.utilsData.save({ playedGames: _G.user.playedGames });
            _G.categoryList.updateAllIconCheckeds();
        }
        // Play win anim
        _G.coreUI.showNagScreen(3.8);
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
        _.setTimeout(function () { return _G.coreFX.playWinAnim(); }, 200);
        // copy frame grid to show in "layotu_win"
        _.setTimeout(function () {
            _this.copyFrameGridToTarget(cc.find('Canvas/layout_win/dialog/grid/grid_container'));
        }, 2000);
    },
    copyFrameGridToTarget: function (targetGridNode) {
        targetGridNode.removeAllChildren();
        var gridNode = _.copyNode(_G.mapVisual.gridNode, targetGridNode);
        gridNode.y = 0;
        gridNode.scale = targetGridNode.width / _G.mapVisual.mainFrameWidth;
        gridNode.children.map(function (cellNode) {
            cc.find('mask', cellNode).width -= 3;
            cc.find('mask', cellNode).height -= 3;
            cellNode.scale = 1;
            cc.find('correct_tile_fx', cellNode).active = false;
        });
    },
    onLose: function () {
        var _this = this;
        this.onPause();
        _G.control.clearSelectedCellNode(true);
        _G.coreUI.showNagScreen(0.5);
        _G.coreUI.masterScrollViewComp.scrollToTop(0.2);
        _.setTimeout(function () {
            _G.coreUI.showLayout('layout_game_over');
            _G.coreUI.hideButtonBack();
            _G.mapVisual.gridNode.children.map(function (cellNode) {
                _G.mapVisual.setCellNodePos(cellNode, cellNode.orgCellPos.x, cellNode.orgCellPos.y, true);
            });
            _this.copyFrameGridToTarget(cc.find('Canvas/layout_game_over/dialog/grid/grid_container'));
        }, 200);
    },
    checkToShowLevelUp: function () {
        if (!this.isLevelUp)
            return;
        this.isLevelUp = false;
        var labelLevelX = cc.find('Canvas/layout_level_up/dialog/label_level_up_to_level_X');
        _G.localize.translateSingleLabel(labelLevelX, _G.user.level);
        _G.coreFX.fxShowPopupHeader(cc.find('Canvas/layout_level_up'));
        _G.coreUI.showLayoutAnim('layout_level_up');
        return true;
    },
    onHint: function () {
        var _a;
        var _this = this;
        if (this.isShowingHint)
            return;
        _.setTimeout(function () { return _this.isShowingHint = true; });
        var wrongCellNode = _G.mapVisual.gridNode.children.find(function (cellNode) { return !_this.isFixedCell(cellNode); });
        if (!wrongCellNode)
            return;
        _G.user.addStars(-_G.configGame.hintCoinPrice);
        _G.control.clearSelectedCellNode();
        var wrongCellNode2 = _G.mapVisual.gridNode.children.find(function (cellNode) {
            return cellNode.cellPos.x == wrongCellNode.orgCellPos.x && cellNode.cellPos.y == wrongCellNode.orgCellPos.y;
        });
        this.currentHintCellNodeArr = [wrongCellNode, wrongCellNode2];
        (_a = _G.mapVisual).bringCellsToTop.apply(_a, this.currentHintCellNodeArr);
        var fxTime = 0.2;
        _G.coreUI.showNagScreen(fxTime);
        this.currentHintCellNodeArr.map(function (cellNode) {
            cc.find('border_highlight', cellNode).active = true;
            cellNode.stopAllActions();
            cc.tween(cellNode).to(fxTime, { scale: 1.15 }).start();
        });
        _.setTimeout(function () {
            _this.onSwapCell(_this.currentHintCellNodeArr[0], _this.currentHintCellNodeArr[1]);
        }, fxTime * 1000);
    },
    isPlaying: function () {
        return _G.coreUI.currentState == _G.types.gameState.playing;
    },
    onPause: function (isShowPopupPause) {
        if (_G.tutorial.isShowingTut)
            return;
        this.isPaused = true;
        if (isShowPopupPause && !_G.tutorial.isShowingTut && this.isPlaying()
            && !cc.find('Canvas/layout_pause').active
            && !cc.find('Canvas/layout_game_over').active
            && !cc.find('Canvas/layout_alert').active)
            _G.coreUI.showLayoutAnim('layout_pause');
    },
    onResume: function () {
        this.isPaused = false;
        if (cc.find('Canvas/layout_pause').active)
            _G.coreUI.hideLayoutAnim('layout_pause');
    },
    clearHint: function (specificCell) {
        this.isShowingHint = false;
        _G.mapVisual.gridNode.children.map(function (cellNode) {
            if (specificCell && cellNode != specificCell)
                return;
            cc.find('border_highlight', cellNode).active = false;
            if (!specificCell)
                cellNode.scale = 1;
        });
    },
    // =====================================================
    // SUPPROTIVE FUNCS
    // =====================================================
    checkCellInCorrectPos: function (cellNode) {
        if (!this.isFixedCell(cellNode))
            return;
        var maskNode = cc.find('mask', cellNode);
        maskNode.width = cellNode.width;
        maskNode.height = cellNode.height;
        _G.audio.playSound('correctpiece');
        _G.coreFX.onCorrectCellPos(cellNode);
    },
    isFixedCell: function (cellNode) {
        return cellNode.cellPos.x == cellNode.orgCellPos.x && cellNode.cellPos.y == cellNode.orgCellPos.y;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2dhbWVfbWVjaGFuaWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsWUFBWSxHQUFHO0lBQ3pCLHNCQUFzQixFQUFFLEVBQUU7SUFDMUIsYUFBYSxFQUFFLEtBQUs7SUFFcEIsZ0JBQWdCLEVBQUUsRUFBRTtJQUNwQixhQUFhLEVBQUUsRUFBRTtJQUNqQixtQkFBbUIsRUFBRSxFQUFFO0lBQ3ZCLGdCQUFnQixFQUFFLEVBQUU7SUFDcEIsZUFBZSxFQUFFLEtBQUs7SUFFdEIsUUFBUSxFQUFFLElBQUk7SUFDZCxhQUFhLEVBQUUsQ0FBQztJQUNoQixZQUFZLEVBQUUsR0FBRztJQUVqQixTQUFTLEVBQUUsSUFBZTtJQUMxQixTQUFTLEVBQUUsS0FBSztJQUVoQixJQUFJO1FBQUosaUJBSUM7UUFIRSxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsK0ZBQStGLENBQUMsQ0FBQztRQUMxSCxDQUFDLENBQUMsV0FBVyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsYUFBYSxFQUFFLEVBQXBCLENBQW9CLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBR0QsYUFBYTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElB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QUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNyRCxJQUFJLENBQUMsWUFBWTtnQkFBRSxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFHRCx3REFBd0Q7SUFDeEQsbUJBQW1CO0lBQ25CLHdEQUF3RDtJQUV4RCxxQkFBcUIsWUFBQyxRQUFRO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUFFLE9BQU87UUFDeEMsSUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFHRCxXQUFXLFlBQUMsUUFBUTtRQUNqQixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7Q0FHSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBnYW1lTWVjaGFuaWMgPSB7XG4gICBjdXJyZW50SGludENlbGxOb2RlQXJyOiBbXSxcbiAgIGlzU2hvd2luZ0hpbnQ6IGZhbHNlLFxuXG4gICBsYXN0Q2F0ZWdvcnlOYW1lOiAnJyxcbiAgIGxhc3RGcmFtZU5hbWU6ICcnLFxuICAgY3VycmVudENhdGVnb3J5TmFtZTogJycsXG4gICBjdXJyZW50RnJhbWVOYW1lOiAnJyxcbiAgIGN1cnJlbnRTaXplTW9kZTogJzN4MycsIC8vIGRlZmF1bHQgZm9yIHR1dFxuXG4gICBpc1BhdXNlZDogdHJ1ZSxcbiAgIHRpbWVSZW1haW5pbmc6IDAsXG4gICB0aW1lVGlja1VuaXQ6IDAuMixcblxuICAgdGltZXJOb2RlOiBudWxsIGFzIGNjLk5vZGUsXG4gICBpc0xldmVsVXA6IGZhbHNlLFxuXG4gICBpbml0KCkge1xuICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgdGhpcy50aW1lck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvdGltZV9sZXZlbF9iYXIvcGxheV90aW1lL2xhYmVsX3RpbWUnKTtcbiAgICAgIF8uc2V0SW50ZXJ2YWwoKCkgPT4gdGhpcy50aW1lclRpY2tGdW5jKCksIHRoaXMudGltZVRpY2tVbml0ICogMTAwMCk7XG4gICB9LFxuXG5cbiAgIHRpbWVyVGlja0Z1bmMoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKCkgfHwgdGhpcy5pc1BhdXNlZCB8fCBfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQpIHJldHVybjtcbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IF8ubWF4KHRoaXMudGltZVJlbWFpbmluZyAtIHRoaXMudGltZVRpY2tVbml0LCAwKTtcblxuICAgICAgY29uc3Qgc3RyID0gXy5zZWNvbmRzVG9UaW1lQ291bnRkb3duKF8uY2VpbCh0aGlzLnRpbWVSZW1haW5pbmcpKTtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKHRoaXMudGltZXJOb2RlLCBzdHIpO1xuXG4gICAgICBpZiAodGhpcy50aW1lUmVtYWluaW5nID09IDApIHJldHVybiB0aGlzLm9uTG9zZSgpO1xuICAgfSxcblxuXG4gICBwcmV2aWV3R2FtZShjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSwgbWF4Q2VsbFggPSAzLCBtYXhDZWxsWSA9IDMsIGlzRnJvbUNhdGVnb3J5ID0gZmFsc2UpIHtcbiAgICAgIGlmICghaXNGcm9tQ2F0ZWdvcnkgJiYgIXRoaXMuaXNDdXJyZW50RnJhbWVMb2FkZWQoKSAmJiB0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUgIT0gJ3R1dG9yaWFsJykgcmV0dXJuO1xuXG4gICAgICB0aGlzLmN1cnJlbnRTaXplTW9kZSA9IG1heENlbGxYICsgJ3gnICsgbWF4Q2VsbFlcbiAgICAgIF9HLmNvcmVVSS5vblRhYlByZXZpZXcodGhpcy5jdXJyZW50U2l6ZU1vZGUpO1xuXG4gICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoKF9HLnVzZXIuaXNWZXJzaW9uVjIgJiYgaXNGcm9tQ2F0ZWdvcnkpID8gX0cudHlwZXMuZ2FtZVN0YXRlLnYyIDogX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG5cbiAgICAgIGNvbnN0IGxldmVsSW5mbyA9IHsgbWF4Q2VsbFgsIG1heENlbGxZLCBjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZSB9O1xuICAgICAgdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lID0gY2F0ZWdvcnlOYW1lO1xuICAgICAgdGhpcy5jdXJyZW50RnJhbWVOYW1lID0gZnJhbWVOYW1lO1xuICAgICAgX0cuY29udHJvbC5jbGVhclNlbGVjdGVkQ2VsbE5vZGUoKTtcblxuICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oKTtcbiAgICAgIF9HLm1hcFZpc3VhbC5jbGVhck1hcCgoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuXG4gICAgICAgICAvLyBjaGVjayB0aGUgZnJhbWUgaXMgbG9hZGVkIHRvIHNob3cuIFVubGVzcyBzaG93IGxvYWRpbmdcbiAgICAgICAgIGNvbnN0IGxvYWRpbmdMYWJlbE5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvZ3JpZF9zdGFjay9sYWJlbF9nYW1lX2xvYWRpbmcnKTtcbiAgICAgICAgIGxvYWRpbmdMYWJlbE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgIF8ud2FpdFRvUnVuKCgpID0+IHtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICAgICAgICBsb2FkaW5nTGFiZWxOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgX0cubWFwVmlzdWFsLnJlbmRlcihsZXZlbEluZm8sICgpID0+IHtcbiAgICAgICAgICAgICAgIC8vIF8ubG9nKGBjYWxsaW5nIF9HLmNvcmVGWC5zaG93R3JpZCgpIGFmdGVyIG1hcFZpc3VhbC5yZW5kZXIoKWApO1xuICAgICAgICAgICAgICAgX0cuY29yZUZYLnNob3dHcmlkKCgpID0+IF9HLmNvcmVVSS5oaWRlTmFnU2NyZWVuKCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmxhc3RDYXRlZ29yeU5hbWUgIT0gdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lIHx8IHRoaXMubGFzdEZyYW1lTmFtZSAhPSB0aGlzLmN1cnJlbnRGcmFtZU5hbWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMubGFzdENhdGVnb3J5TmFtZSA9IHRoaXMuY3VycmVudENhdGVnb3J5TmFtZTtcbiAgICAgICAgICAgICAgIHRoaXMubGFzdEZyYW1lTmFtZSA9IHRoaXMuY3VycmVudEZyYW1lTmFtZTtcbiAgICAgICAgICAgICAgIF9HLmFuYWx5dGljLmxvZ1ZpZXdDb250ZW50KHRoaXMuY3VycmVudENhdGVnb3J5TmFtZSwgdGhpcy5jdXJyZW50RnJhbWVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgIH0sICdpc0N1cnJlbnRGcmFtZUxvYWRlZCgpJywgdGhpcyk7XG5cbiAgICAgIH0pO1xuXG4gICAgICBfRy5jb3JlVUkubWFzdGVyU2Nyb2xsVmlld0NvbXAuc2Nyb2xsVG9Ub3AoMC4yKTtcbiAgIH0sXG5cblxuICAgc3RhcnRHYW1lKCkge1xuICAgICAgaWYgKCF0aGlzLmlzQ3VycmVudEZyYW1lTG9hZGVkKCkgJiYgdGhpcy5jdXJyZW50Q2F0ZWdvcnlOYW1lICE9ICd0dXRvcmlhbCcpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRTaXplTW9kZSA9PSAnMXgxJykgdGhpcy5wcmV2aWV3R2FtZSh0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUsIHRoaXMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG5cbiAgICAgIHRoaXMudGltZVJlbWFpbmluZyA9IF9HLmNvbmZpZ0dhbWUucGxheVRpbWVbdGhpcy5jdXJyZW50U2l6ZU1vZGUgPT0gJzF4MScgPyAnM3gzJyA6IHRoaXMuY3VycmVudFNpemVNb2RlXTtcbiAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUucGxheWluZyk7XG4gICAgICB0aGlzLnRpbWVyVGlja0Z1bmMoKTtcblxuICAgICAgX0cuY29yZVVJLnVwZGF0ZVB1enpsZVByb2dyZXNzQmFyKDApO1xuICAgICAgX0cuY29yZUZYLmhpZGVHcmlkKCgpID0+IHtcbiAgICAgICAgIHRoaXMuc2h1ZmZsZUNlbGxzKCgpID0+IHtcbiAgICAgICAgICAgIC8vIF8ubG9nKGBjYWxsaW5nIF9HLmNvcmVGWC5zaG93R3JpZCgpIGFmdGVyIGdhbWVNZWNoYW5pYy5zaHVmZmxlQ2VsbHMoKWApO1xuICAgICAgICAgICAgX0cuY29yZUZYLnNob3dHcmlkKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghX0cudHV0b3JpYWwuaXNTaG93aW5nVHV0KSB0aGlzLm9uUmVzdW1lKCk7XG4gICB9LFxuXG5cbiAgIHJlcGxheSgpIHtcbiAgICAgIHRoaXMuY3VycmVudFNpemVNb2RlID0gKHRoaXMuY3VycmVudFNpemVNb2RlID09ICcxeDEnKSA/ICczeDMnIDogdGhpcy5jdXJyZW50U2l6ZU1vZGU7XG4gICAgICBjb25zdCBjdXJyZW50U2l6ZUFyciA9IHRoaXMuY3VycmVudFNpemVNb2RlLnNwbGl0KCd4Jyk7XG4gICAgICB0aGlzLnByZXZpZXdHYW1lKHRoaXMuY3VycmVudENhdGVnb3J5TmFtZSwgdGhpcy5jdXJyZW50RnJhbWVOYW1lLCBwYXJzZUludChjdXJyZW50U2l6ZUFyclswXSksIHBhcnNlSW50KGN1cnJlbnRTaXplQXJyWzFdKSk7XG4gICAgICB0aGlzLnN0YXJ0R2FtZSgpO1xuICAgfSxcblxuICAgLy8gd2hlbiB1c2VyIHdvbiBhIHB1enpsZSwgcGljayBhIHJhbmRvbSBwdXp6bGUgdGhhdCBoZSBoYXMgbm90IHBsYXllZCBcbiAgIHBsYXlOZXh0UmFuZG9tUHV6emxlKCkge1xuICAgICAgY29uc3QgbmV3UHV6emxlSWRBcnIgPSBfRy5jYXRlZ29yeUxpc3QuZnJhbWVOb2RlQXJyXG4gICAgICAgICAubWFwKG5vZGUgPT4gYCR7bm9kZS5jYXRlZ29yeU5hbWV9XyR7bm9kZS5uYW1lfWApXG4gICAgICAgICAuZmlsdGVyKHB1enpsZUlkID0+ICFfRy51c2VyLnBsYXllZEdhbWVzW3B1enpsZUlkXSlcbiAgICAgIGNvbnN0IG5ld1B1enpsZUlkID0gXy5yYW5kb21BcnJJdGVtKG5ld1B1enpsZUlkQXJyKSB8fCBfLnJhbmRvbUFyckl0ZW0oT2JqZWN0LmtleXMoX0cudXNlci5wbGF5ZWRHYW1lcykpO1xuICAgICAgLy8gXy5sb2coYG9uV2luQ29udGludWUgPj4gbmV3UHV6emxlSWQgPSAke25ld1B1enpsZUlkfSAvLyBuZXdQdXp6bGVJZEFycj1gLCBuZXdQdXp6bGVJZEFycik7XG5cbiAgICAgIGNvbnN0IHRtcEFyciA9IG5ld1B1enpsZUlkLnNwbGl0KCdfJyk7XG4gICAgICBfRy5yZXNvdXJjZXMubG9hZFNpbmdsZUZyYW1lKHRtcEFyclswXSwgdG1wQXJyWzFdKTtcbiAgICAgIHRoaXMucHJldmlld0dhbWUodG1wQXJyWzBdLCB0bXBBcnJbMV0sIDMsIDMsIHRydWUpO1xuICAgfSxcblxuXG4gICBpc0N1cnJlbnRGcmFtZUxvYWRlZCgpIHtcbiAgICAgIGlmIChfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQgfHwgX0cudHV0b3JpYWwuaXNDdXJyZW50UHV6emxlVHV0b3JpYWwoKSkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1t0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWVdW3RoaXMuY3VycmVudEZyYW1lTmFtZV07XG4gICB9LFxuXG5cbiAgIHNodWZmbGVDZWxscyhjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoX0cudHV0b3JpYWwuaXNTaG93aW5nVHV0KSByZXR1cm4gdGhpcy5zaHVmZmxlQ2VsbHNGb3JUdXQoY2FsbGJhY2spO1xuXG4gICAgICAvLyBnZW5lcmF0ZSByYW5kb20gY2VsbCBwb3NpdGlvblxuICAgICAgY29uc3QgcmFuZG9tQ2VsbFBvc0FyciA9IFtdO1xuICAgICAgbGV0IG9yZGVySW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgeCA9IDE7IHggPD0gX0cubWFwVmlzdWFsLmN1cnJlbnRNYXhDZWxsWDsgeCsrKSB7XG4gICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8PSBfRy5tYXBWaXN1YWwuY3VycmVudE1heENlbGxZOyB5KyspIHtcbiAgICAgICAgICAgIHJhbmRvbUNlbGxQb3NBcnIucHVzaCh7IHgsIHksIG9yZGVySW5kZXg6IG9yZGVySW5kZXgrKyB9KTtcbiAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF8uc2h1ZmZsZUFycmF5KHJhbmRvbUNlbGxQb3NBcnIpO1xuXG4gICAgICAvLyBjaGVjayBpZiB0b28gbWFueSBjZWxscyBhcmUgaW4gdGhlaXIgY29ycmVjdCBwb3NpdGlvbnNcbiAgICAgIGxldCBjb3JyZWN0ZWRDZWxsTnVtID0gMDtcbiAgICAgIGNvbnN0IHRvbHRhbENlbGxOdW0gPSBfRy5tYXBWaXN1YWwuY3VycmVudE1heENlbGxYICogX0cubWFwVmlzdWFsLmN1cnJlbnRNYXhDZWxsWTtcbiAgICAgIGNvbnN0IG1heENvcnJlY3RDZWxsUmF0aW8gPSAwLjM1O1xuICAgICAgY29uc3QgaXNUb29NYW55Q29ycmVjdGVkQ2VsbHMgPSByYW5kb21DZWxsUG9zQXJyLnNvbWUoKGNlbGxQb3NJbmZvLCBpbmRleCkgPT4ge1xuICAgICAgICAgaWYgKGluZGV4ID09IGNlbGxQb3NJbmZvLm9yZGVySW5kZXgpIGNvcnJlY3RlZENlbGxOdW0rKztcbiAgICAgICAgIGlmIChjb3JyZWN0ZWRDZWxsTnVtIC8gdG9sdGFsQ2VsbE51bSA+IG1heENvcnJlY3RDZWxsUmF0aW8pIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgICAvLyBfLmxvZyhgc2h1ZmZsZUNlbGxzID4+IGlzVG9vTWFueUNvcnJlY3RlZENlbGxzID0gJHtpc1Rvb01hbnlDb3JyZWN0ZWRDZWxsc30gLy8gY29ycmVjdGVkQ2VsbE51bSAoJHtjb3JyZWN0ZWRDZWxsTnVtfSkgLyB0b2x0YWxDZWxsTnVtKCR7dG9sdGFsQ2VsbE51bX0pID0gJHtjb3JyZWN0ZWRDZWxsTnVtIC8gdG9sdGFsQ2VsbE51bX0gYCk7XG4gICAgICBpZiAoaXNUb29NYW55Q29ycmVjdGVkQ2VsbHMpIHJldHVybiB0aGlzLnNodWZmbGVDZWxscyhjYWxsYmFjayk7XG5cbiAgICAgIC8vIHNldCByZWFsIGNlbGwgcG9zXG4gICAgICBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4ubWFwKChjaGlsZE5vZGUsIGkpID0+IHtcbiAgICAgICAgIF9HLm1hcFZpc3VhbC5zZXRDZWxsTm9kZVBvcyhjaGlsZE5vZGUsIHJhbmRvbUNlbGxQb3NBcnJbaV0ueCwgcmFuZG9tQ2VsbFBvc0FycltpXS55KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XG4gICB9LFxuXG5cbiAgIHNodWZmbGVDZWxsc0ZvclR1dChjYWxsYmFjaykge1xuICAgICAgY29uc3QgY2VsbFBvc0FyciA9IFtcbiAgICAgICAgIHsgeDogMywgeTogMyB9LFxuICAgICAgICAgeyB4OiAxLCB5OiAxIH0sXG4gICAgICAgICB7IHg6IDMsIHk6IDEgfSxcbiAgICAgICAgIHsgeDogMSwgeTogMyB9LFxuICAgICAgICAgeyB4OiAyLCB5OiAzIH0sIC8vIC0tIG11c3Qga2VlcCBhdCBpbmRleD00ICg1dGggZWxlbSBpbiBhcnIpXG4gICAgICAgICB7IHg6IDIsIHk6IDIgfSwgLy8gLS0gbXVzdCBrZWVwIGF0IGluZGV4PTUgKDZ0aCBlbGVtIGluIGFycilcbiAgICAgICAgIHsgeDogMiwgeTogMSB9LFxuICAgICAgICAgeyB4OiAxLCB5OiAyIH0sXG4gICAgICAgICB7IHg6IDMsIHk6IDIgfSxcbiAgICAgIF07XG5cbiAgICAgIGNvbnN0IGNlbGxOb2RlQXJyID0gX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuO1xuICAgICAgY2VsbE5vZGVBcnIubWFwKChjZWxsTm9kZSwgaW5kZXgpID0+IF9HLm1hcFZpc3VhbC5zZXRDZWxsTm9kZVBvcyhjZWxsTm9kZSwgY2VsbFBvc0FycltpbmRleF0ueCwgY2VsbFBvc0FycltpbmRleF0ueSkpO1xuXG4gICAgICBjb25zdCBjZWxsTm9kZTEgPSBfRy50dXRvcmlhbC5jZWxsTm9kZTEgPSBjZWxsTm9kZUFycls1XTtcbiAgICAgIGNvbnN0IGNlbGxOb2RlMiA9IF9HLnR1dG9yaWFsLmNlbGxOb2RlMiA9IGNlbGxOb2RlQXJyWzRdO1xuICAgICAgLy8gX0cubWFwVmlzdWFsLnNldENlbGxOb2RlUG9zKGNlbGxOb2RlMSwgY2VsbE5vZGUyLm9yZ0NlbGxQb3MueCwgY2VsbE5vZGUyLm9yZ0NlbGxQb3MueSk7XG4gICAgICAvLyBfRy5tYXBWaXN1YWwuc2V0Q2VsbE5vZGVQb3MoY2VsbE5vZGUyLCBjZWxsTm9kZTEub3JnQ2VsbFBvcy54LCBjZWxsTm9kZTEub3JnQ2VsbFBvcy55KTtcblxuICAgICAgY2VsbE5vZGVBcnIubWFwKGNlbGxOb2RlID0+IHtcbiAgICAgICAgIHRoaXMuY2hlY2tDZWxsSW5Db3JyZWN0UG9zKGNlbGxOb2RlKTtcbiAgICAgIH0pXG5cbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgIH0sXG5cbiAgIHVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKSB7XG4gICAgICBsZXQgY29ycmVjdENlbGxDb3VudCA9IDA7XG4gICAgICBsZXQgd3JvbmdDZWxsQ291bnQgPSAwO1xuICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBpZiAodGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpIGNvcnJlY3RDZWxsQ291bnQrKztcbiAgICAgICAgIGVsc2Ugd3JvbmdDZWxsQ291bnQrKztcbiAgICAgIH0pO1xuICAgICAgX0cuY29yZVVJLnVwZGF0ZVB1enpsZVByb2dyZXNzQmFyKGNvcnJlY3RDZWxsQ291bnQgLyAod3JvbmdDZWxsQ291bnQgKyBjb3JyZWN0Q2VsbENvdW50KSwgMC4yKTtcbiAgIH0sXG5cbiAgIG9uU3dhcENlbGwoY2VsbE5vZGUxLCBjZWxsTm9kZTIpIHtcbiAgICAgIF9HLmdhbWVNZWNoYW5pYy5jbGVhckhpbnQoKTtcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICBfRy5tYXBWaXN1YWwuc3dhcENlbGxBbmltKGNlbGxOb2RlMSwgY2VsbE5vZGUyLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuICAgICAgICAgdGhpcy5jaGVja0NlbGxJbkNvcnJlY3RQb3MoY2VsbE5vZGUxKTtcbiAgICAgICAgIHRoaXMuY2hlY2tDZWxsSW5Db3JyZWN0UG9zKGNlbGxOb2RlMik7XG4gICAgICAgICB0aGlzLnVwZGF0ZVB1enpsZUNvbXBsZXRpb25CYXIoKTtcbiAgICAgICAgIHRoaXMuY2hlY2tXaW4oKTtcblxuICAgICAgICAgX0cudHV0b3JpYWwuY2hlY2tPblN3YXBDZWxscygpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIGNoZWNrV2luKCkge1xuICAgICAgY29uc3QgaXNXaW4gPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4uZXZlcnkoY2VsbE5vZGUgPT4gdGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpO1xuICAgICAgXy5sb2coYCBpc1dpbiA9ICR7aXNXaW59IGApO1xuICAgICAgaWYgKCFpc1dpbikgcmV0dXJuO1xuICAgICAgdGhpcy5vblBhdXNlKCk7XG5cbiAgICAgIGNvbnN0IHN0YXJUb0FkZCA9IF9HLmNvbmZpZ0dhbWUud2luQ29pblJld2FyZFt0aGlzLmN1cnJlbnRTaXplTW9kZV07XG4gICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJUb0FkZCwgdHJ1ZSk7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvc3Rhcl9udW1fYmFzZS9sYWJlbF9zdGFycycpLCAnKycgKyBzdGFyVG9BZGQpO1xuICAgICAgLy8gX0cudXRpbHNVSS5maWxsTGFiZWwodGhpcy53aW5UaW1lck5vZGUsIHRoaXMudGltZXJOb2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nKTtcblxuICAgICAgX0cuY29yZVVJLnNldFVJUGxheVN0YXRlKF9HLnR5cGVzLmdhbWVTdGF0ZS53b24pO1xuXG4gICAgICB0aGlzLmlzTGV2ZWxVcCA9IF9HLnVzZXIuYWRkRXhwKF9HLmNvbmZpZ0dhbWUud2luRXhwLCB0cnVlKTtcbiAgICAgIGlmICh0aGlzLmlzTGV2ZWxVcCkgX0cudXNlci5hZGRTdGFycyhfRy5jb25maWdHYW1lLmxldmVsVXBDb2luUmV3YXJkLCB0cnVlKTtcblxuICAgICAgLy8gc2F2ZSBnYW1lIGFzIHBsYXllZCAmIHJlLXJlbmRlciBpY29uLWNoZWNrZWQgZm9yIGFsbCBmcmFtZSBjZWxsc1xuICAgICAgY29uc3QgZ2FtZU5hbWUgPSB0aGlzLmN1cnJlbnRDYXRlZ29yeU5hbWUgKyAnXycgKyB0aGlzLmN1cnJlbnRGcmFtZU5hbWU7XG4gICAgICBpZiAoIV9HLnVzZXIucGxheWVkR2FtZXNbZ2FtZU5hbWVdKSB7XG4gICAgICAgICBfRy51c2VyLnBsYXllZEdhbWVzW2dhbWVOYW1lXSA9IDE7XG4gICAgICAgICBfRy51dGlsc0RhdGEuc2F2ZSh7IHBsYXllZEdhbWVzOiBfRy51c2VyLnBsYXllZEdhbWVzIH0pO1xuICAgICAgICAgX0cuY2F0ZWdvcnlMaXN0LnVwZGF0ZUFsbEljb25DaGVja2VkcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBQbGF5IHdpbiBhbmltXG4gICAgICBfRy5jb3JlVUkuc2hvd05hZ1NjcmVlbigzLjgpO1xuICAgICAgX0cuY29yZVVJLm1hc3RlclNjcm9sbFZpZXdDb21wLnNjcm9sbFRvVG9wKDAuMik7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gX0cuY29yZUZYLnBsYXlXaW5BbmltKCksIDIwMCk7XG5cbiAgICAgIC8vIGNvcHkgZnJhbWUgZ3JpZCB0byBzaG93IGluIFwibGF5b3R1X3dpblwiXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5jb3B5RnJhbWVHcmlkVG9UYXJnZXQoY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2dyaWQvZ3JpZF9jb250YWluZXInKSk7XG4gICAgICB9LCAyMDAwKTtcbiAgIH0sXG5cbiAgIGNvcHlGcmFtZUdyaWRUb1RhcmdldCh0YXJnZXRHcmlkTm9kZTogY2MuTm9kZSkge1xuICAgICAgdGFyZ2V0R3JpZE5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgIGNvbnN0IGdyaWROb2RlID0gXy5jb3B5Tm9kZShfRy5tYXBWaXN1YWwuZ3JpZE5vZGUsIHRhcmdldEdyaWROb2RlKTtcbiAgICAgIGdyaWROb2RlLnkgPSAwO1xuICAgICAgZ3JpZE5vZGUuc2NhbGUgPSB0YXJnZXRHcmlkTm9kZS53aWR0aCAvIF9HLm1hcFZpc3VhbC5tYWluRnJhbWVXaWR0aDtcbiAgICAgIGdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpLndpZHRoIC09IDM7XG4gICAgICAgICBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpLmhlaWdodCAtPSAzO1xuICAgICAgICAgY2VsbE5vZGUuc2NhbGUgPSAxO1xuICAgICAgICAgY2MuZmluZCgnY29ycmVjdF90aWxlX2Z4JywgY2VsbE5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIG9uTG9zZSgpIHtcbiAgICAgIHRoaXMub25QYXVzZSgpO1xuICAgICAgX0cuY29udHJvbC5jbGVhclNlbGVjdGVkQ2VsbE5vZGUodHJ1ZSk7XG4gICAgICBfRy5jb3JlVUkuc2hvd05hZ1NjcmVlbigwLjUpO1xuICAgICAgX0cuY29yZVVJLm1hc3RlclNjcm9sbFZpZXdDb21wLnNjcm9sbFRvVG9wKDAuMik7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLnNob3dMYXlvdXQoJ2xheW91dF9nYW1lX292ZXInKTtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlQnV0dG9uQmFjaygpO1xuICAgICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICAgICBfRy5tYXBWaXN1YWwuc2V0Q2VsbE5vZGVQb3MoY2VsbE5vZGUsIGNlbGxOb2RlLm9yZ0NlbGxQb3MueCwgY2VsbE5vZGUub3JnQ2VsbFBvcy55LCB0cnVlKTtcbiAgICAgICAgIH0pO1xuICAgICAgICAgdGhpcy5jb3B5RnJhbWVHcmlkVG9UYXJnZXQoY2MuZmluZCgnQ2FudmFzL2xheW91dF9nYW1lX292ZXIvZGlhbG9nL2dyaWQvZ3JpZF9jb250YWluZXInKSk7XG4gICAgICB9LCAyMDApO1xuICAgfSxcblxuXG4gICBjaGVja1RvU2hvd0xldmVsVXAoKSB7XG4gICAgICBpZiAoIXRoaXMuaXNMZXZlbFVwKSByZXR1cm47XG4gICAgICB0aGlzLmlzTGV2ZWxVcCA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBsYWJlbExldmVsWCA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbGV2ZWxfdXAvZGlhbG9nL2xhYmVsX2xldmVsX3VwX3RvX2xldmVsX1gnKTtcbiAgICAgIF9HLmxvY2FsaXplLnRyYW5zbGF0ZVNpbmdsZUxhYmVsKGxhYmVsTGV2ZWxYLCBfRy51c2VyLmxldmVsKTtcblxuICAgICAgX0cuY29yZUZYLmZ4U2hvd1BvcHVwSGVhZGVyKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbGV2ZWxfdXAnKSk7XG4gICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9sZXZlbF91cCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICB9LFxuXG4gICBvbkhpbnQoKSB7XG4gICAgICBpZiAodGhpcy5pc1Nob3dpbmdIaW50KSByZXR1cm47XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc1Nob3dpbmdIaW50ID0gdHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHdyb25nQ2VsbE5vZGUgPSBfRy5tYXBWaXN1YWwuZ3JpZE5vZGUuY2hpbGRyZW4uZmluZChjZWxsTm9kZSA9PiAhdGhpcy5pc0ZpeGVkQ2VsbChjZWxsTm9kZSkpO1xuICAgICAgaWYgKCF3cm9uZ0NlbGxOb2RlKSByZXR1cm47XG5cbiAgICAgIF9HLnVzZXIuYWRkU3RhcnMoLV9HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZSk7XG5cbiAgICAgIF9HLmNvbnRyb2wuY2xlYXJTZWxlY3RlZENlbGxOb2RlKCk7XG4gICAgICBjb25zdCB3cm9uZ0NlbGxOb2RlMiA9IF9HLm1hcFZpc3VhbC5ncmlkTm9kZS5jaGlsZHJlbi5maW5kKGNlbGxOb2RlID0+IHtcbiAgICAgICAgIHJldHVybiBjZWxsTm9kZS5jZWxsUG9zLnggPT0gd3JvbmdDZWxsTm9kZS5vcmdDZWxsUG9zLnggJiYgY2VsbE5vZGUuY2VsbFBvcy55ID09IHdyb25nQ2VsbE5vZGUub3JnQ2VsbFBvcy55XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyID0gW3dyb25nQ2VsbE5vZGUsIHdyb25nQ2VsbE5vZGUyXTtcbiAgICAgIF9HLm1hcFZpc3VhbC5icmluZ0NlbGxzVG9Ub3AoLi4udGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyKTtcblxuICAgICAgY29uc3QgZnhUaW1lID0gMC4yO1xuICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oZnhUaW1lKTtcbiAgICAgIHRoaXMuY3VycmVudEhpbnRDZWxsTm9kZUFyci5tYXAoY2VsbE5vZGUgPT4ge1xuICAgICAgICAgY2MuZmluZCgnYm9yZGVyX2hpZ2hsaWdodCcsIGNlbGxOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICBjZWxsTm9kZS5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgY2MudHdlZW4oY2VsbE5vZGUpLnRvKGZ4VGltZSwgeyBzY2FsZTogMS4xNSB9KS5zdGFydCgpO1xuICAgICAgfSk7XG5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLm9uU3dhcENlbGwodGhpcy5jdXJyZW50SGludENlbGxOb2RlQXJyWzBdLCB0aGlzLmN1cnJlbnRIaW50Q2VsbE5vZGVBcnJbMV0pO1xuICAgICAgfSwgZnhUaW1lICogMTAwMCk7XG4gICB9LFxuXG4gICBpc1BsYXlpbmcoKSB7XG4gICAgICByZXR1cm4gX0cuY29yZVVJLmN1cnJlbnRTdGF0ZSA9PSBfRy50eXBlcy5nYW1lU3RhdGUucGxheWluZztcbiAgIH0sXG5cbiAgIG9uUGF1c2UoaXNTaG93UG9wdXBQYXVzZT8pIHtcbiAgICAgIGlmIChfRy50dXRvcmlhbC5pc1Nob3dpbmdUdXQpIHJldHVybjtcbiAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xuICAgICAgaWYgKGlzU2hvd1BvcHVwUGF1c2UgJiYgIV9HLnR1dG9yaWFsLmlzU2hvd2luZ1R1dCAmJiB0aGlzLmlzUGxheWluZygpXG4gICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9wYXVzZScpLmFjdGl2ZVxuICAgICAgICAgJiYgIWNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyJykuYWN0aXZlXG4gICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydCcpLmFjdGl2ZVxuICAgICAgKSBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9wYXVzZScpO1xuICAgfSxcblxuICAgb25SZXN1bWUoKSB7XG4gICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgICBpZiAoY2MuZmluZCgnQ2FudmFzL2xheW91dF9wYXVzZScpLmFjdGl2ZSkgX0cuY29yZVVJLmhpZGVMYXlvdXRBbmltKCdsYXlvdXRfcGF1c2UnKTtcbiAgIH0sXG5cblxuICAgY2xlYXJIaW50KHNwZWNpZmljQ2VsbD86IGNjLk5vZGUpIHtcbiAgICAgIHRoaXMuaXNTaG93aW5nSGludCA9IGZhbHNlO1xuICAgICAgX0cubWFwVmlzdWFsLmdyaWROb2RlLmNoaWxkcmVuLm1hcChjZWxsTm9kZSA9PiB7XG4gICAgICAgICBpZiAoc3BlY2lmaWNDZWxsICYmIGNlbGxOb2RlICE9IHNwZWNpZmljQ2VsbCkgcmV0dXJuO1xuICAgICAgICAgY2MuZmluZCgnYm9yZGVyX2hpZ2hsaWdodCcsIGNlbGxOb2RlKS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGlmICghc3BlY2lmaWNDZWxsKSBjZWxsTm9kZS5zY2FsZSA9IDE7XG4gICAgICB9KTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIFNVUFBST1RJVkUgRlVOQ1NcbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIGNoZWNrQ2VsbEluQ29ycmVjdFBvcyhjZWxsTm9kZSkge1xuICAgICAgaWYgKCF0aGlzLmlzRml4ZWRDZWxsKGNlbGxOb2RlKSkgcmV0dXJuO1xuICAgICAgY29uc3QgbWFza05vZGUgPSBjYy5maW5kKCdtYXNrJywgY2VsbE5vZGUpO1xuICAgICAgbWFza05vZGUud2lkdGggPSBjZWxsTm9kZS53aWR0aDtcbiAgICAgIG1hc2tOb2RlLmhlaWdodCA9IGNlbGxOb2RlLmhlaWdodDtcbiAgICAgIF9HLmF1ZGlvLnBsYXlTb3VuZCgnY29ycmVjdHBpZWNlJyk7XG4gICAgICBfRy5jb3JlRlgub25Db3JyZWN0Q2VsbFBvcyhjZWxsTm9kZSk7XG4gICB9LFxuXG5cbiAgIGlzRml4ZWRDZWxsKGNlbGxOb2RlKSB7XG4gICAgICByZXR1cm4gY2VsbE5vZGUuY2VsbFBvcy54ID09IGNlbGxOb2RlLm9yZ0NlbGxQb3MueCAmJiBjZWxsTm9kZS5jZWxsUG9zLnkgPT0gY2VsbE5vZGUub3JnQ2VsbFBvcy55O1xuICAgfVxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/tutorial.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9fa024zMbVB+Lq+UeHKKCS8', 'tutorial');
// script/core-game/tutorial.ts

"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorial = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.tutorial = {
    frameAvatarInfo: { x: 100, y: 270, width: 585, height: 370, angle: 0 },
    node: null,
    cellNode1: null,
    cellNode2: null,
    isShowingTut: false,
    hiddenNodeArr1: null,
    hiddenNodeArr2: null,
    currentStep: 0,
    init: function () {
        var _this = this;
        this.node = cc.find('Canvas/layout_tutorial');
        this.hiddenNodeArr1 = [
            // cc.find('btn_back', _G.coreUI.headerContainer),
            cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer),
        ];
        this.hiddenNodeArr2 = [
            cc.find('time_level_bar', _G.coreUI.playGridContainer),
        ];
        _G.user.addInitCallback(function (data) {
            // _.log(`tutorial.init() ==>>> data.isNewUser = ${data.isNewUser} //  _G.user.entryPointData.puzzle_id = ${_G.user.entryPointData.puzzle_id} `);
            if (!data.isNewUser || _G.user.isPuzzleSpecified)
                return _G.coreUI.hideLayout('layout_tutorial');
            if (!window['FBInstant'])
                _this.start();
            else
                _.waitToRun(function () { return _this.start(); }, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 4, function () { return _this.start(); });
        });
    },
    isCurrentPuzzleTutorial: function () {
        return _G.gameMechanic.currentCategoryName == 'tutorial';
    },
    isClickableCell: function (cellNode) {
        if (!this.isShowingTut)
            return true;
        return cellNode == this.cellNode1 || cellNode == this.cellNode2;
    },
    checkOnSwapCells: function () {
        var _this = this;
        if (this.isShowingTut && this.currentStep == 1)
            _.setTimeout(function () { return _this.showStep2(); }, 1000);
    },
    //============= on tut start
    start: function () {
        var _this = this;
        this.isShowingTut = true;
        this.currentStep = 1;
        // render special puzzle
        _G.gameMechanic.previewGame('tutorial', 'tutorial', 3, 3);
        _G.gameMechanic.startGame();
        // set up UI
        __spreadArrays(this.hiddenNodeArr1, this.hiddenNodeArr2).map(function (node) { return node.active = false; });
        cc.find('texts/label_tut_step_1', this.node).active = true;
        // fake the level time bar
        var fakeTimeBarContainer = cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer);
        var fakeTimeBar = _.copyNode(cc.find('time_level_bar', _G.coreUI.playGridContainer), fakeTimeBarContainer);
        fakeTimeBar.children.map(function (childNode) { return childNode.y = 100; });
        fakeTimeBar.y = -120;
        fakeTimeBar.active = true;
        // -------------------------------------------------
        var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
        var fakeColliderNode = _.copyNode(colliderNode, colliderNode.parent);
        colliderNode.scale = fakeColliderNode.scale = containerNode.scale = 0.0001;
        // containerNode.opacity = 0;
        _.setGlobalPosToNode(fakeColliderNode, containerNode);
        // _.log(`fakeColliderNode.height = ${fakeColliderNode.height}`);
        fakeColliderNode.height *= 2;
        _.setTimeout(function () { return fakeColliderNode.removeFromParent(true); }, 100);
        // start hand animation
        cc.find('black_layer', this.node).active = true;
        _G.coreUI.showLayout(this.node);
        var handNode = cc.find('tut_hand', this.node);
        _.waitToRun(function () {
            _.setGlobalPosToNode(handNode, _this.cellNode1);
            var gPosDiff = _.getGlobalPosDiff(_this.cellNode1, _this.cellNode2);
            cc.tween(handNode).repeatForever(cc.tween()
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff })
                .by(0.4, { scale: -0.3 })
                .by(0.4, { scale: 0.3 })
                .by(1, { position: gPosDiff.mul(-1) })).start();
        }, 'cellNode1', this);
    },
    showStep2: function () {
        var _this = this;
        this.currentStep = 2;
        // remove block inpout for fake btnHint
        cc.find('block_inputs/block_input_2', this.node).active = false;
        cc.find('texts/label_tut_step_1', this.node).active = false;
        var labelNode2 = cc.find('texts/label_tut_step_2', this.node);
        labelNode2.active = true;
        var fakeBtnHint = cc.find('fake_buttons/btn_hint', this.node);
        var handNode = cc.find('tut_hand', this.node);
        handNode.stopAllActions();
        handNode.scale = 1;
        handNode.angle = -140;
        _.setGlobalPosToNode(handNode, fakeBtnHint);
        handNode.x -= 30;
        handNode.y += 30;
        cc.tween(handNode).repeatForever(cc.tween()
            .by(0.4, { scale: -0.3 })
            .by(0.4, { scale: 0.3 })
            .delay(1)).start();
        fakeBtnHint.active = true;
        _G.utilsUI.makeBubbleButton(fakeBtnHint, function () {
            cc.find('disabled', fakeBtnHint).active = true;
            _G.gameMechanic.onHint();
            handNode.active = false;
            _.setTimeout(function () {
                fakeBtnHint.active = false;
                _this.showStep3();
            }, 1000);
        });
    },
    //============= on tut done
    showStep3: function () {
        var _this = this;
        var delayTime = 1.3;
        _G.coreUI.showNagScreen(delayTime);
        cc.find('tut_hand', this.node).active = false;
        // show black screen with message
        _.setTimeout(function () {
            _this.hiddenNodeArr1.map(function (node) { return node.active = true; });
            var _a = _G.categoryList, colliderNode = _a.colliderNode, containerNode = _a.containerNode;
            colliderNode.scale = containerNode.scale = 1;
            containerNode.opacity = 255;
            _.setTimeout(function () {
                cc.find('black_layer', _this.node).active = false;
                cc.find('texts', _this.node).active = false;
            }, 300);
            cc.find('fake_buttons/play_time', _this.node).active = true;
            cc.find('bg', _this.node).active = true;
            cc.find('dialog', _this.node).active = true;
            _G.coreUI.showLayoutAnim(_this.node, 210);
        }, delayTime * 600);
    },
    onBtnContinue: function () {
        cc.find('grid_stack/tut_fake_time_bar', _G.coreUI.playGridContainer).removeAllChildren();
        _G.coreUI.hideLayoutAnim('layout_tutorial');
        cc.find('time_level_bar', _G.coreUI.playGridContainer).active = true;
        this.isShowingTut = false;
        _G.gameMechanic.onResume();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL3R1dG9yaWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDcEMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRVAsUUFBQSxRQUFRLEdBQUc7SUFDckIsZUFBZSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0lBRXRFLElBQUksRUFBRSxJQUFlO0lBQ3JCLFNBQVMsRUFBRSxJQUFlO0lBQzFCLFNBQVMsRUFBRSxJQUFlO0lBRTFCLFlBQVksRUFBRSxLQUFLO0lBQ25CLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLGNBQWMsRUFBRSxJQUFJO0lBQ3BCLFdBQVcsRUFBRSxDQUFDO0lBRWQsSUFBSTtRQUFKLGlCQW9CQztRQW5CRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ25CLGtEQUFrRDtZQUNsRCxFQUFFLENBQUMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUM7U0FDckUsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLEdBQUc7WUFDbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBRXhELENBQUM7UUFFRixFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFBLElBQUk7WUFDekIsaUpBQWlKO1lBRWpKLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJB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QUFHLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxhQUFhO1FBQ1YsRUFBRSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6RixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBR0gsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7IF8sICQgfSA9IF9HO1xuXG5leHBvcnQgY29uc3QgdHV0b3JpYWwgPSB7XG4gICBmcmFtZUF2YXRhckluZm86IHsgeDogMTAwLCB5OiAyNzAsIHdpZHRoOiA1ODUsIGhlaWdodDogMzcwLCBhbmdsZTogMCB9LFxuXG4gICBub2RlOiBudWxsIGFzIGNjLk5vZGUsXG4gICBjZWxsTm9kZTE6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGNlbGxOb2RlMjogbnVsbCBhcyBjYy5Ob2RlLFxuXG4gICBpc1Nob3dpbmdUdXQ6IGZhbHNlLFxuICAgaGlkZGVuTm9kZUFycjE6IG51bGwsXG4gICBoaWRkZW5Ob2RlQXJyMjogbnVsbCxcbiAgIGN1cnJlbnRTdGVwOiAwLFxuXG4gICBpbml0KCkge1xuICAgICAgdGhpcy5ub2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF90dXRvcmlhbCcpO1xuXG4gICAgICB0aGlzLmhpZGRlbk5vZGVBcnIxID0gW1xuICAgICAgICAgLy8gY2MuZmluZCgnYnRuX2JhY2snLCBfRy5jb3JlVUkuaGVhZGVyQ29udGFpbmVyKSxcbiAgICAgICAgIGNjLmZpbmQoJ2xhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZScsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lciksXG4gICAgICBdO1xuICAgICAgdGhpcy5oaWRkZW5Ob2RlQXJyMiA9IFtcbiAgICAgICAgIGNjLmZpbmQoJ3RpbWVfbGV2ZWxfYmFyJywgX0cuY29yZVVJLnBsYXlHcmlkQ29udGFpbmVyKSxcbiAgICAgICAgIC8vIGNjLmZpbmQoJ3BsYXlpbmdfYnV0dG9uX2JhcicsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lciksXG4gICAgICBdO1xuXG4gICAgICBfRy51c2VyLmFkZEluaXRDYWxsYmFjayhkYXRhID0+IHtcbiAgICAgICAgIC8vIF8ubG9nKGB0dXRvcmlhbC5pbml0KCkgPT0+Pj4gZGF0YS5pc05ld1VzZXIgPSAke2RhdGEuaXNOZXdVc2VyfSAvLyAgX0cudXNlci5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQgPSAke19HLnVzZXIuZW50cnlQb2ludERhdGEucHV6emxlX2lkfSBgKTtcblxuICAgICAgICAgaWYgKCFkYXRhLmlzTmV3VXNlciB8fCBfRy51c2VyLmlzUHV6emxlU3BlY2lmaWVkKSByZXR1cm4gX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF90dXRvcmlhbCcpO1xuXG4gICAgICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgIGVsc2UgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5zdGFydCgpLCAnaXNSZWFsQXZhdGFyTG9hZGVkJywgX0cubWFwVmlzdWFsLCAwLjEsIDQsICgpID0+IHRoaXMuc3RhcnQoKSk7XG4gICAgICB9KTtcbiAgIH0sXG5cbiAgIGlzQ3VycmVudFB1enpsZVR1dG9yaWFsKCkge1xuICAgICAgcmV0dXJuIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lID09ICd0dXRvcmlhbCc7XG4gICB9LFxuXG4gICBpc0NsaWNrYWJsZUNlbGwoY2VsbE5vZGUpIHtcbiAgICAgIGlmICghdGhpcy5pc1Nob3dpbmdUdXQpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGNlbGxOb2RlID09IHRoaXMuY2VsbE5vZGUxIHx8IGNlbGxOb2RlID09IHRoaXMuY2VsbE5vZGUyO1xuICAgfSxcblxuICAgY2hlY2tPblN3YXBDZWxscygpIHtcbiAgICAgIGlmICh0aGlzLmlzU2hvd2luZ1R1dCAmJiB0aGlzLmN1cnJlbnRTdGVwID09IDEpIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dTdGVwMigpLCAxMDAwKTtcbiAgIH0sXG5cblxuICAgLy89PT09PT09PT09PT09IG9uIHR1dCBzdGFydFxuICAgc3RhcnQoKSB7XG4gICAgICB0aGlzLmlzU2hvd2luZ1R1dCA9IHRydWU7XG4gICAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcblxuICAgICAgLy8gcmVuZGVyIHNwZWNpYWwgcHV6emxlXG4gICAgICBfRy5nYW1lTWVjaGFuaWMucHJldmlld0dhbWUoJ3R1dG9yaWFsJywgJ3R1dG9yaWFsJywgMywgMyk7XG4gICAgICBfRy5nYW1lTWVjaGFuaWMuc3RhcnRHYW1lKCk7XG5cbiAgICAgIC8vIHNldCB1cCBVSVxuICAgICAgWy4uLnRoaXMuaGlkZGVuTm9kZUFycjEsIC4uLnRoaXMuaGlkZGVuTm9kZUFycjJdLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgY2MuZmluZCgndGV4dHMvbGFiZWxfdHV0X3N0ZXBfMScsIHRoaXMubm9kZSkuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgLy8gZmFrZSB0aGUgbGV2ZWwgdGltZSBiYXJcbiAgICAgIGNvbnN0IGZha2VUaW1lQmFyQ29udGFpbmVyID0gY2MuZmluZCgnZ3JpZF9zdGFjay90dXRfZmFrZV90aW1lX2JhcicsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBmYWtlVGltZUJhciA9IF8uY29weU5vZGUoY2MuZmluZCgndGltZV9sZXZlbF9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLCBmYWtlVGltZUJhckNvbnRhaW5lcik7XG4gICAgICBmYWtlVGltZUJhci5jaGlsZHJlbi5tYXAoY2hpbGROb2RlID0+IGNoaWxkTm9kZS55ID0gMTAwKTtcbiAgICAgIGZha2VUaW1lQmFyLnkgPSAtMTIwO1xuICAgICAgZmFrZVRpbWVCYXIuYWN0aXZlID0gdHJ1ZTtcblxuXG4gICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICBjb25zdCB7IGNvbGxpZGVyTm9kZSwgY29udGFpbmVyTm9kZSB9ID0gX0cuY2F0ZWdvcnlMaXN0O1xuICAgICAgY29uc3QgZmFrZUNvbGxpZGVyTm9kZSA9IF8uY29weU5vZGUoY29sbGlkZXJOb2RlLCBjb2xsaWRlck5vZGUucGFyZW50KTtcbiAgICAgIGNvbGxpZGVyTm9kZS5zY2FsZSA9IGZha2VDb2xsaWRlck5vZGUuc2NhbGUgPSBjb250YWluZXJOb2RlLnNjYWxlID0gMC4wMDAxO1xuICAgICAgLy8gY29udGFpbmVyTm9kZS5vcGFjaXR5ID0gMDtcbiAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGZha2VDb2xsaWRlck5vZGUsIGNvbnRhaW5lck5vZGUpO1xuICAgICAgLy8gXy5sb2coYGZha2VDb2xsaWRlck5vZGUuaGVpZ2h0ID0gJHtmYWtlQ29sbGlkZXJOb2RlLmhlaWdodH1gKTtcbiAgICAgIGZha2VDb2xsaWRlck5vZGUuaGVpZ2h0ICo9IDI7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gZmFrZUNvbGxpZGVyTm9kZS5yZW1vdmVGcm9tUGFyZW50KHRydWUpLCAxMDApO1xuXG4gICAgICAvLyBzdGFydCBoYW5kIGFuaW1hdGlvblxuICAgICAgY2MuZmluZCgnYmxhY2tfbGF5ZXInLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICBfRy5jb3JlVUkuc2hvd0xheW91dCh0aGlzLm5vZGUpO1xuICAgICAgY29uc3QgaGFuZE5vZGUgPSBjYy5maW5kKCd0dXRfaGFuZCcsIHRoaXMubm9kZSk7XG5cbiAgICAgIF8ud2FpdFRvUnVuKCgpID0+IHtcbiAgICAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGhhbmROb2RlLCB0aGlzLmNlbGxOb2RlMSk7XG4gICAgICAgICBjb25zdCBnUG9zRGlmZiA9IF8uZ2V0R2xvYmFsUG9zRGlmZih0aGlzLmNlbGxOb2RlMSwgdGhpcy5jZWxsTm9kZTIpO1xuXG4gICAgICAgICBjYy50d2VlbihoYW5kTm9kZSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgIGNjLnR3ZWVuKClcbiAgICAgICAgICAgICAgIC5ieSgwLjQsIHsgc2NhbGU6IC0wLjMgfSlcbiAgICAgICAgICAgICAgIC5ieSgwLjQsIHsgc2NhbGU6IDAuMyB9KVxuICAgICAgICAgICAgICAgLmJ5KDEsIHsgcG9zaXRpb246IGdQb3NEaWZmIH0pXG4gICAgICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAtMC4zIH0pXG4gICAgICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAwLjMgfSlcbiAgICAgICAgICAgICAgIC5ieSgxLCB7IHBvc2l0aW9uOiBnUG9zRGlmZi5tdWwoLTEpIH0pXG4gICAgICAgICApLnN0YXJ0KCk7XG5cbiAgICAgIH0sICdjZWxsTm9kZTEnLCB0aGlzKTtcbiAgIH0sXG5cblxuICAgc2hvd1N0ZXAyKCkge1xuICAgICAgdGhpcy5jdXJyZW50U3RlcCA9IDI7XG5cbiAgICAgIC8vIHJlbW92ZSBibG9jayBpbnBvdXQgZm9yIGZha2UgYnRuSGludFxuICAgICAgY2MuZmluZCgnYmxvY2tfaW5wdXRzL2Jsb2NrX2lucHV0XzInLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICBjYy5maW5kKCd0ZXh0cy9sYWJlbF90dXRfc3RlcF8xJywgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgY29uc3QgbGFiZWxOb2RlMiA9IGNjLmZpbmQoJ3RleHRzL2xhYmVsX3R1dF9zdGVwXzInLCB0aGlzLm5vZGUpO1xuICAgICAgbGFiZWxOb2RlMi5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBmYWtlQnRuSGludCA9IGNjLmZpbmQoJ2Zha2VfYnV0dG9ucy9idG5faGludCcsIHRoaXMubm9kZSk7XG5cbiAgICAgIGNvbnN0IGhhbmROb2RlID0gY2MuZmluZCgndHV0X2hhbmQnLCB0aGlzLm5vZGUpO1xuICAgICAgaGFuZE5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIGhhbmROb2RlLnNjYWxlID0gMTtcbiAgICAgIGhhbmROb2RlLmFuZ2xlID0gLTE0MDtcbiAgICAgIF8uc2V0R2xvYmFsUG9zVG9Ob2RlKGhhbmROb2RlLCBmYWtlQnRuSGludCk7XG4gICAgICBoYW5kTm9kZS54IC09IDMwO1xuICAgICAgaGFuZE5vZGUueSArPSAzMDtcblxuICAgICAgY2MudHdlZW4oaGFuZE5vZGUpLnJlcGVhdEZvcmV2ZXIoXG4gICAgICAgICBjYy50d2VlbigpXG4gICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAtMC4zIH0pXG4gICAgICAgICAgICAuYnkoMC40LCB7IHNjYWxlOiAwLjMgfSlcbiAgICAgICAgICAgIC5kZWxheSgxKVxuICAgICAgKS5zdGFydCgpO1xuXG4gICAgICBmYWtlQnRuSGludC5hY3RpdmUgPSB0cnVlO1xuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKGZha2VCdG5IaW50LCAoKSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdkaXNhYmxlZCcsIGZha2VCdG5IaW50KS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgX0cuZ2FtZU1lY2hhbmljLm9uSGludCgpO1xuICAgICAgICAgaGFuZE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmFrZUJ0bkhpbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNob3dTdGVwMygpO1xuICAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcblxuICAgfSxcblxuXG4gICAvLz09PT09PT09PT09PT0gb24gdHV0IGRvbmVcbiAgIHNob3dTdGVwMygpIHtcbiAgICAgIGNvbnN0IGRlbGF5VGltZSA9IDEuMztcbiAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKGRlbGF5VGltZSk7XG5cbiAgICAgIGNjLmZpbmQoJ3R1dF9oYW5kJywgdGhpcy5ub2RlKS5hY3RpdmUgPSBmYWxzZTtcblxuICAgICAgLy8gc2hvdyBibGFjayBzY3JlZW4gd2l0aCBtZXNzYWdlXG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGhpcy5oaWRkZW5Ob2RlQXJyMS5tYXAobm9kZSA9PiBub2RlLmFjdGl2ZSA9IHRydWUpO1xuXG4gICAgICAgICBjb25zdCB7IGNvbGxpZGVyTm9kZSwgY29udGFpbmVyTm9kZSB9ID0gX0cuY2F0ZWdvcnlMaXN0O1xuICAgICAgICAgY29sbGlkZXJOb2RlLnNjYWxlID0gY29udGFpbmVyTm9kZS5zY2FsZSA9IDE7XG4gICAgICAgICBjb250YWluZXJOb2RlLm9wYWNpdHkgPSAyNTU7XG5cbiAgICAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYy5maW5kKCdibGFja19sYXllcicsIHRoaXMubm9kZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBjYy5maW5kKCd0ZXh0cycsIHRoaXMubm9kZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgICBjYy5maW5kKCdmYWtlX2J1dHRvbnMvcGxheV90aW1lJywgdGhpcy5ub2RlKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgY2MuZmluZCgnYmcnLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBjYy5maW5kKCdkaWFsb2cnLCB0aGlzLm5vZGUpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0odGhpcy5ub2RlLCAyMTApO1xuICAgICAgfSwgZGVsYXlUaW1lICogNjAwKTtcbiAgIH0sXG5cblxuICAgb25CdG5Db250aW51ZSgpIHtcbiAgICAgIGNjLmZpbmQoJ2dyaWRfc3RhY2svdHV0X2Zha2VfdGltZV9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF90dXRvcmlhbCcpO1xuICAgICAgY2MuZmluZCgndGltZV9sZXZlbF9iYXInLCBfRy5jb3JlVUkucGxheUdyaWRDb250YWluZXIpLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmlzU2hvd2luZ1R1dCA9IGZhbHNlO1xuICAgICAgX0cuZ2FtZU1lY2hhbmljLm9uUmVzdW1lKCk7XG4gICB9LFxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/settings.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47b954QQ/RNPrn+v8nMvQ+H', 'settings');
// script/core-game/settings.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var entryNameArr = ['sound', 'music'];
var defaultEntryValue = { music: true, sound: true, language: 'en_US' };
exports.settings = {
    node: null,
    entryContainerNode: null,
    sound: true,
    music: true,
    language: true,
    isInitialized: false,
    init: function () {
        var _a;
        var _this = this;
        this.node = cc.find('Canvas/layout_settings');
        this.entryContainerNode = cc.find('dialog', this.node);
        // get data & render switcher value accordingly
        (_a = _G.user).addLoginDataFields.apply(_a, entryNameArr);
        _G.user.addInitCallback(function (data) {
            entryNameArr.map(function (entryName) {
                var isValueUndefined = (data[entryName] === undefined || data[entryName] === null);
                var value = _this[entryName] = isValueUndefined ? defaultEntryValue[entryName] : data[entryName];
                _this.setSwitcherOnOff(entryName, value);
            });
            _this.isInitialized = true;
        });
        this.bindSwitcherButtonHandlers();
        this.renderLanguages();
        _G.localize.addInitCallback(function () {
            _this.focusLanguage(_G.localize.currentLanguageCode);
        });
    },
    bindSwitcherButtonHandlers: function () {
        var _this = this;
        [
            cc.find('switcher_sound', this.entryContainerNode),
            cc.find('switcher_music', this.entryContainerNode),
        ].map(function (switcherNode) {
            _G.utilsUI.makeButton(switcherNode, function () {
                var entryName = switcherNode.name.replace('switcher_', '');
                _this.setEntryValue(entryName, !_this[entryName]);
            });
        });
    },
    setEntryValue: function (entryName, value) {
        var _a;
        // update value & save value to DB
        this[entryName] = value;
        _G.utilsData.save((_a = {}, _a[entryName] = value, _a));
        this.setSwitcherOnOff(entryName, value); // update switcher in layout settings
        if (entryName == 'music') {
            if (value)
                _G.audio.playBgMusic();
            else
                _G.audio.stopBgMusic();
        }
    },
    setSwitcherOnOff: function (entryName, value) {
        var switcherNode = cc.find("switcher_" + entryName, this.entryContainerNode);
        if (!switcherNode)
            return;
        _G.utilsUI.showOnlyChildNodeWithNameAs(switcherNode, (value ? 'on' : 'off'));
    },
    // ================================================
    // Languages
    // ================================================
    renderLanguages: function () {
        var _this = this;
        var sampleNode = cc.find('Canvas/sample_nodes/language_button');
        var containerNode = cc.find('Canvas/layout_settings/dialog/language_scrollview/view/content');
        containerNode.removeAllChildren();
        _G.localize.supportedLanguageArr.map(function (langInfo) {
            var newNode = _.copyNode(sampleNode, containerNode);
            newNode.langCode = langInfo.code;
            _G.utilsUI.fillChildLabelByPath(newNode, 'label_on', langInfo.name.toUpperCase());
            _G.utilsUI.fillChildLabelByPath(newNode, 'label_off', langInfo.name.toUpperCase());
            _G.utilsUI.makeBubbleButton(newNode, function () {
                _this.focusLanguage(langInfo.code);
                _G.localize.onLanguageChanges(langInfo.code);
            });
        });
        _.setTimeout(function () { return _this.adjustLanguageScrollView(); }, 100);
    },
    focusLanguage: function (langCode) {
        var containerNode = cc.find('Canvas/layout_settings/dialog/language_scrollview/view/content');
        containerNode.children.map(function (node) {
            var isOn = (node.langCode == langCode);
            ['label_on', 'bg_on'].map(function (childName) { return cc.find(childName, node).active = isOn; });
        });
    },
    adjustLanguageScrollView: function () {
        var scrollViewNode = cc.find('Canvas/layout_settings/dialog/language_scrollview');
        scrollViewNode.height = cc.winSize.height - 428;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL3NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUNwQyxJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFcEIsSUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEMsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFFN0QsUUFBQSxRQUFRLEdBQUc7SUFDckIsSUFBSSxFQUFFLElBQWU7SUFDckIsa0JBQWtCLEVBQUUsSUFBZTtJQUVuQyxLQUFLLEVBQUUsSUFBSTtJQUNYLEtBQUssRUFBRSxJQUFJO0lBQ1gsUUFBUSxFQUFFLElBQUk7SUFFZCxhQUFhLEVBQUUsS0FBSztJQUVwQixJQUFJOztRQUFKLGlCQXFCQztRQXBCRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZELCtDQUErQztRQUMvQyxDQUFBLEtBQUEsRUFBRSxDQUFDLElBQUksQ0FBQSxDQUFDLGtCQUFrQixXQUFJLFlBQVksRUFBRTtRQUM1QyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFBLElBQUk7WUFDekIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxVQUFBLFNBQVM7Z0JBQ3ZCLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztn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RUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1FBQ2xGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUdELHdCQUF3QjtRQUNyQixJQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7UUFDcEYsY0FBYyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7SUFDbkQsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgZW50cnlOYW1lQXJyID0gWydzb3VuZCcsICdtdXNpYyddO1xuY29uc3QgZGVmYXVsdEVudHJ5VmFsdWUgPSB7IG11c2ljOiB0cnVlLCBzb3VuZDogdHJ1ZSwgbGFuZ3VhZ2U6ICdlbl9VUycgfTtcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge1xuICAgbm9kZTogbnVsbCBhcyBjYy5Ob2RlLFxuICAgZW50cnlDb250YWluZXJOb2RlOiBudWxsIGFzIGNjLk5vZGUsXG5cbiAgIHNvdW5kOiB0cnVlLFxuICAgbXVzaWM6IHRydWUsXG4gICBsYW5ndWFnZTogdHJ1ZSxcblxuICAgaXNJbml0aWFsaXplZDogZmFsc2UsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLm5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3NldHRpbmdzJyk7XG4gICAgICB0aGlzLmVudHJ5Q29udGFpbmVyTm9kZSA9IGNjLmZpbmQoJ2RpYWxvZycsIHRoaXMubm9kZSk7XG5cbiAgICAgIC8vIGdldCBkYXRhICYgcmVuZGVyIHN3aXRjaGVyIHZhbHVlIGFjY29yZGluZ2x5XG4gICAgICBfRy51c2VyLmFkZExvZ2luRGF0YUZpZWxkcyguLi5lbnRyeU5hbWVBcnIpO1xuICAgICAgX0cudXNlci5hZGRJbml0Q2FsbGJhY2soZGF0YSA9PiB7XG4gICAgICAgICBlbnRyeU5hbWVBcnIubWFwKGVudHJ5TmFtZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1ZhbHVlVW5kZWZpbmVkID0gKGRhdGFbZW50cnlOYW1lXSA9PT0gdW5kZWZpbmVkIHx8IGRhdGFbZW50cnlOYW1lXSA9PT0gbnVsbCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNbZW50cnlOYW1lXSA9IGlzVmFsdWVVbmRlZmluZWQgPyBkZWZhdWx0RW50cnlWYWx1ZVtlbnRyeU5hbWVdIDogZGF0YVtlbnRyeU5hbWVdO1xuICAgICAgICAgICAgdGhpcy5zZXRTd2l0Y2hlck9uT2ZmKGVudHJ5TmFtZSwgdmFsdWUpO1xuICAgICAgICAgfSk7XG4gICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmJpbmRTd2l0Y2hlckJ1dHRvbkhhbmRsZXJzKCk7XG5cblxuICAgICAgdGhpcy5yZW5kZXJMYW5ndWFnZXMoKTtcbiAgICAgIF9HLmxvY2FsaXplLmFkZEluaXRDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgICB0aGlzLmZvY3VzTGFuZ3VhZ2UoX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZSk7XG4gICAgICB9KVxuICAgfSxcblxuICAgYmluZFN3aXRjaGVyQnV0dG9uSGFuZGxlcnMoKSB7XG4gICAgICBbXG4gICAgICAgICBjYy5maW5kKCdzd2l0Y2hlcl9zb3VuZCcsIHRoaXMuZW50cnlDb250YWluZXJOb2RlKSxcbiAgICAgICAgIGNjLmZpbmQoJ3N3aXRjaGVyX211c2ljJywgdGhpcy5lbnRyeUNvbnRhaW5lck5vZGUpLFxuICAgICAgXS5tYXAoc3dpdGNoZXJOb2RlID0+IHtcbiAgICAgICAgIF9HLnV0aWxzVUkubWFrZUJ1dHRvbihzd2l0Y2hlck5vZGUsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IHN3aXRjaGVyTm9kZS5uYW1lLnJlcGxhY2UoJ3N3aXRjaGVyXycsICcnKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RW50cnlWYWx1ZShlbnRyeU5hbWUsICF0aGlzW2VudHJ5TmFtZV0pO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgIH0sXG5cblxuICAgc2V0RW50cnlWYWx1ZShlbnRyeU5hbWUsIHZhbHVlKSB7XG4gICAgICAvLyB1cGRhdGUgdmFsdWUgJiBzYXZlIHZhbHVlIHRvIERCXG4gICAgICB0aGlzW2VudHJ5TmFtZV0gPSB2YWx1ZTtcbiAgICAgIF9HLnV0aWxzRGF0YS5zYXZlKHsgW2VudHJ5TmFtZV06IHZhbHVlIH0pO1xuICAgICAgdGhpcy5zZXRTd2l0Y2hlck9uT2ZmKGVudHJ5TmFtZSwgdmFsdWUpOyAvLyB1cGRhdGUgc3dpdGNoZXIgaW4gbGF5b3V0IHNldHRpbmdzXG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT0gJ211c2ljJykge1xuICAgICAgICAgaWYgKHZhbHVlKSBfRy5hdWRpby5wbGF5QmdNdXNpYygpO1xuICAgICAgICAgZWxzZSBfRy5hdWRpby5zdG9wQmdNdXNpYygpO1xuICAgICAgfVxuICAgfSxcblxuXG4gICBzZXRTd2l0Y2hlck9uT2ZmKGVudHJ5TmFtZSwgdmFsdWUpIHtcbiAgICAgIGNvbnN0IHN3aXRjaGVyTm9kZSA9IGNjLmZpbmQoYHN3aXRjaGVyXyR7ZW50cnlOYW1lfWAsIHRoaXMuZW50cnlDb250YWluZXJOb2RlKTtcbiAgICAgIGlmICghc3dpdGNoZXJOb2RlKSByZXR1cm47XG4gICAgICBfRy51dGlsc1VJLnNob3dPbmx5Q2hpbGROb2RlV2l0aE5hbWVBcyhzd2l0Y2hlck5vZGUsICh2YWx1ZSA/ICdvbicgOiAnb2ZmJykpO1xuICAgfSxcblxuXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyBMYW5ndWFnZXNcbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICByZW5kZXJMYW5ndWFnZXMoKSB7XG4gICAgICBjb25zdCBzYW1wbGVOb2RlID0gY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy9sYW5ndWFnZV9idXR0b24nKTtcbiAgICAgIGNvbnN0IGNvbnRhaW5lck5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3NldHRpbmdzL2RpYWxvZy9sYW5ndWFnZV9zY3JvbGx2aWV3L3ZpZXcvY29udGVudCcpO1xuICAgICAgY29udGFpbmVyTm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgICBfRy5sb2NhbGl6ZS5zdXBwb3J0ZWRMYW5ndWFnZUFyci5tYXAobGFuZ0luZm8gPT4ge1xuICAgICAgICAgY29uc3QgbmV3Tm9kZSA9IF8uY29weU5vZGUoc2FtcGxlTm9kZSwgY29udGFpbmVyTm9kZSk7XG4gICAgICAgICBuZXdOb2RlLmxhbmdDb2RlID0gbGFuZ0luZm8uY29kZTtcbiAgICAgICAgIF9HLnV0aWxzVUkuZmlsbENoaWxkTGFiZWxCeVBhdGgobmV3Tm9kZSwgJ2xhYmVsX29uJywgbGFuZ0luZm8ubmFtZS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgIF9HLnV0aWxzVUkuZmlsbENoaWxkTGFiZWxCeVBhdGgobmV3Tm9kZSwgJ2xhYmVsX29mZicsIGxhbmdJbmZvLm5hbWUudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24obmV3Tm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0xhbmd1YWdlKGxhbmdJbmZvLmNvZGUpO1xuICAgICAgICAgICAgX0cubG9jYWxpemUub25MYW5ndWFnZUNoYW5nZXMobGFuZ0luZm8uY29kZSk7XG4gICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLmFkanVzdExhbmd1YWdlU2Nyb2xsVmlldygpLCAxMDApO1xuICAgfSxcblxuXG4gICBmb2N1c0xhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgICBjb25zdCBjb250YWluZXJOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9zZXR0aW5ncy9kaWFsb2cvbGFuZ3VhZ2Vfc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnKTtcbiAgICAgIGNvbnRhaW5lck5vZGUuY2hpbGRyZW4ubWFwKG5vZGUgPT4ge1xuICAgICAgICAgY29uc3QgaXNPbiA9IChub2RlLmxhbmdDb2RlID09IGxhbmdDb2RlKTtcbiAgICAgICAgIFsnbGFiZWxfb24nLCAnYmdfb24nXS5tYXAoY2hpbGROYW1lID0+IGNjLmZpbmQoY2hpbGROYW1lLCBub2RlKS5hY3RpdmUgPSBpc09uKTtcbiAgICAgIH0pXG4gICB9LFxuXG5cbiAgIGFkanVzdExhbmd1YWdlU2Nyb2xsVmlldygpIHtcbiAgICAgIGNvbnN0IHNjcm9sbFZpZXdOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9zZXR0aW5ncy9kaWFsb2cvbGFuZ3VhZ2Vfc2Nyb2xsdmlldycpO1xuICAgICAgc2Nyb2xsVmlld05vZGUuaGVpZ2h0ID0gY2Mud2luU2l6ZS5oZWlnaHQgLSA0Mjg7XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/category_list.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84b7f9dgqBJA4RCnf2HBH9U', 'category_list');
// script/core-game/category_list.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryList = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var FRAME_SIZE = 263;
var ORG_FRAME_SIZE = 800;
var FRAME_SCALE = FRAME_SIZE / ORG_FRAME_SIZE;
var FRAME_SIZE_V2 = 284;
var FRAME_SCALE_V2 = FRAME_SIZE_V2 / ORG_FRAME_SIZE;
exports.categoryList = {
    containerNode: null,
    containerNodeV2: null,
    colliderNode: null,
    frameNodeArr: [],
    init: function () {
        var _this = this;
        this.containerNode = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists');
        this.containerNodeV2 = cc.find('Canvas/play_area/scrollview_master/view/content/category_lists_v2');
        this.colliderNode = cc.find('Canvas/play_area/visible_frame_collider');
        this.containerNode.active = !_G.user.isVersionV2;
        this.containerNodeV2.active = _G.user.isVersionV2;
        if (!_G.user.isVersionV2)
            this.renderList();
        else
            this.renderListV2();
        _G.resources.addFrameLoadCallback(function (catName, frameName) { return _this.onFrameLoaded(catName, frameName); });
        this.setupVisibleFrameCollider();
    },
    onFrameLoaded: function (catName, frameName) {
        // _.log(` onFrameLoaded >> catName=${catName}, frameName=${frameName} `);
        var frameCellNode;
        if (_G.user.isVersionV2) {
            frameCellNode = this.containerNodeV2.children.find(function (node) { return node.categoryName == catName && node.name == frameName; });
        }
        else {
            var catContainerNode = cc.find(catName, this.containerNode);
            var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
            frameCellNode = cc.find(frameName, scrollViewContent);
        }
        if (!frameCellNode)
            return _.log(" onFrameLoaded (" + catName + ", " + frameName + ") >>  frameCellNode = " + frameCellNode + " ");
        frameCellNode.isTextureLoaded = true;
        var frameNode = cc.find('frame', frameCellNode);
        _G.utilsUI.setNodeSprite(frameNode, _G.resources.frameSprites[catName][frameName]);
        // fx fade in to smoothly show
        var frameCover = cc.find('frame_cover', frameCellNode);
        cc.tween(frameCover).to(0.3, { opacity: 0 }).start();
    },
    setupVisibleFrameCollider: function () {
        var _this = this;
        _.setTimeout(function () {
            _this.colliderNode.active = true;
            _this.colliderNode.height = _this.colliderNode.getComponent(cc.BoxCollider).size.height = cc.winSize.height;
            // this.colliderNode.getComponent(cc.BoxCollider).size.width = 300;
            // this.colliderNode.getComponent(cc.BoxCollider).size.height = 300;
        }, 100);
    },
    renderList: function () {
        var _this = this;
        var scrollViewMaster = cc.find('Canvas/play_area/scrollview_master');
        var scrollViewMasterComp = scrollViewMaster.getComponent('NestableScrollView_Outer');
        var sampleNode = cc.find('Canvas/sample_nodes/sample_category_row');
        var sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell');
        sampleFrameNode.opacity = 0;
        _G.levelManager.categoryNameArr.map(function (catName) {
            var newRowNode = _.copyNode(sampleNode, _this.containerNode);
            newRowNode.name = catName;
            newRowNode.opacity = 0; // reduce drawcall. Will appear when touching visible collider
            scrollViewMasterComp.m_InnerScrollViews.push(cc.find('scrollview', newRowNode).getComponent('NestableScrollView_Inner'));
            // _G.utilsUI.fillChildLabelByPath(newRowNode, 'header_bg/label_category_list_header_name', catName);
            var labelCatName = cc.find('header_bg/label_category_list_header_name', newRowNode);
            labelCatName.localizeData = catName;
            var categoryInfo = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == catName; });
            if (!categoryInfo)
                return;
            var scrollViewContent = cc.find('scrollview/view/content', newRowNode);
            categoryInfo.frameArr.map(function (frameInfo) {
                var newFrameCellNode = _.copyNode(sampleFrameNode, scrollViewContent);
                _this.frameNodeArr.push(newFrameCellNode);
                newFrameCellNode.name = frameInfo.name;
                newFrameCellNode.categoryName = catName;
                var frameNode = cc.find('frame', newFrameCellNode);
                var frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
                if (frameTexture)
                    _G.utilsUI.setNodeSprite(frameNode, frameTexture);
                newFrameCellNode.buttonCompZoomScale = 0.9;
                _G.utilsUI.makeBubbleButton(newFrameCellNode, function () { return _G.gameMechanic.previewGame(catName, frameInfo.name, 3, 3, true); });
            });
        });
        scrollViewMasterComp.reloadInnerScrollViews();
        this.setupAllFrameAvatars();
        _.waitToRun(function () { return _this.updateAllIconCheckeds(); }, 'playedGames', _G.user);
    },
    renderListV2: function () {
        var _this = this;
        var sampleFrameNode = cc.find('Canvas/sample_nodes/sample_frame_cell_v2');
        sampleFrameNode.opacity = 0;
        _G.levelManager.categoryNameArr.map(function (catName) {
            var categoryInfo = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == catName; });
            if (!categoryInfo)
                return;
            categoryInfo.frameArr.map(function (frameInfo) {
                // zIndexArr.push(i++);
                var newFrameCellNode = _.copyNode(sampleFrameNode, _this.containerNodeV2);
                _this.frameNodeArr.push(newFrameCellNode);
                newFrameCellNode.name = frameInfo.name;
                newFrameCellNode.categoryName = catName;
                var frameNode = cc.find('frame', newFrameCellNode);
                var frameTexture = _G.resources.frameSprites[catName][frameInfo.name];
                if (frameTexture)
                    _G.utilsUI.setNodeSprite(frameNode, frameTexture);
                newFrameCellNode.buttonCompZoomScale = 0.9;
                _G.utilsUI.makeBubbleButton(newFrameCellNode, function () {
                    _G.gameMechanic.previewGame(catName, frameInfo.name, 1, 1, true);
                    _this.sortCategoryV2Randomly();
                    _G.interAd.checkToShowInterAd();
                });
            });
        });
        _.waitToRun(function () { return _this.sortCategoryV2Randomly(); }, 'playedGames', _G.user);
        this.setupAllFrameAvatars();
        _.waitToRun(function () { return _this.updateAllIconCheckeds(); }, 'playedGames', _G.user);
    },
    // random order but newFrame on top, played-frames at bottom
    sortCategoryV2Randomly: function () {
        var frameNodeToScore = function (node) { return _G.user.playedGames[node.categoryName + "_" + node.name] ? 2 : 1; };
        this.frameNodeArr.sort(function (nodeA, nodeB) { return (frameNodeToScore(nodeA) - frameNodeToScore(nodeB)) || (_.random() > 0.5 ? 1 : -1); });
        this.frameNodeArr.map(function (node, i) { return node.zIndex = i; });
    },
    setupAllFrameAvatars: function () {
        var setupFrameCellNode = function (frameCellNode) {
            var frameNode = cc.find('frame', frameCellNode);
            var avatarNode = cc.find('mask/avatar', frameCellNode);
            _G.utilsUI.setNodeSprite(avatarNode, _G.mapVisual.avatarSpriteFrame);
            var frameScale = _G.user.isVersionV2 ? FRAME_SCALE_V2 : FRAME_SCALE;
            var frameSize = _G.user.isVersionV2 ? FRAME_SIZE_V2 : FRAME_SIZE;
            _G.mapVisual.setAvatar(frameCellNode.categoryName, frameCellNode.name, frameNode, avatarNode, frameScale, frameSize);
        };
        if (_G.user.isVersionV2)
            this.containerNodeV2.children.map(function (frameCellNode) { return setupFrameCellNode(frameCellNode); });
        else {
            this.containerNode.children.map(function (catContainerNode) {
                var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
                scrollViewContent.children.map(function (frameCellNode) { return setupFrameCellNode(frameCellNode); });
            });
        }
    },
    updateAllIconCheckeds: function () {
        var setupIconChecked = function (frameCellNode) {
            cc.find('icon_checked', frameCellNode).active = _G.user.playedGames[frameCellNode.categoryName + '_' + frameCellNode.name];
        };
        if (_G.user.isVersionV2)
            this.containerNodeV2.children.map(function (frameCellNode) { return setupIconChecked(frameCellNode); });
        else
            this.containerNode.children.map(function (catContainerNode) {
                var scrollViewContent = cc.find('scrollview/view/content', catContainerNode);
                scrollViewContent.children.map(function (frameCellNode) { return setupIconChecked(frameCellNode); });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2NhdGVnb3J5X2xpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLFVBQVUsR0FBRyxHQUFHLENBQUM7QUFDdkIsSUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDO0FBQzNCLElBQU0sV0FBVyxHQUFHLFVBQVUsR0FBRyxjQUFjLENBQUM7QUFFaEQsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDO0FBQzFCLElBQU0sY0FBYyxHQUFHLGFBQWEsR0FBRyxjQUFjLENBQUM7QUFFekMsUUFBQSxZQUFZLEdBQUc7SUFDekIsYUFBYSxFQUFFLElBQWU7SUFDOUIsZUFBZSxFQUFFLElBQWU7SUFDaEMsWUFBWSxFQUFFLElBQWU7SUFFN0IsWUFBWSxFQUFFLEVBQUU7SUFFaEIsSUFBSTtRQUFKLGlCQWFDO1FBWkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxDQUFDLENBQUM7UUFDL0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1FQUFtRSxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFFdkUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVsRCxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDOztZQUN2QyxJQUFJLENBQUMsWUFB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RyxDQUFDLFVBQUMsYUFBYSxJQUFLLE9BQUEsa0JBQWtCLENBQUMsYUFBYSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztZQUN4RixDQUFDLENBQUMsQ0FBQztTQUNMO0lBQ0osQ0FBQztJQUdELHFCQUFxQjtRQUNsQixJQUFNLGdCQUFnQixHQUFHLFVBQUMsYUFBYTtZQUNwQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlILENBQUMsQ0FBQTtRQUVELElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUEvQixDQUErQixDQUFDLENBQUM7O1lBQ2xGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLGdCQUFnQjtnQkFDbEQsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9FLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxhQUFhLElBQUksT0FBQSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1lBQ3BGLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUlILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgRlJBTUVfU0laRSA9IDI2MztcbmNvbnN0IE9SR19GUkFNRV9TSVpFID0gODAwO1xuY29uc3QgRlJBTUVfU0NBTEUgPSBGUkFNRV9TSVpFIC8gT1JHX0ZSQU1FX1NJWkU7XG5cbmNvbnN0IEZSQU1FX1NJWkVfVjIgPSAyODQ7XG5jb25zdCBGUkFNRV9TQ0FMRV9WMiA9IEZSQU1FX1NJWkVfVjIgLyBPUkdfRlJBTUVfU0laRTtcblxuZXhwb3J0IGNvbnN0IGNhdGVnb3J5TGlzdCA9IHtcbiAgIGNvbnRhaW5lck5vZGU6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGNvbnRhaW5lck5vZGVWMjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgY29sbGlkZXJOb2RlOiBudWxsIGFzIGNjLk5vZGUsXG5cbiAgIGZyYW1lTm9kZUFycjogW10sXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9jYXRlZ29yeV9saXN0cycpO1xuICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9jYXRlZ29yeV9saXN0c192MicpO1xuICAgICAgdGhpcy5jb2xsaWRlck5vZGUgPSBjYy5maW5kKCdDYW52YXMvcGxheV9hcmVhL3Zpc2libGVfZnJhbWVfY29sbGlkZXInKTtcblxuICAgICAgdGhpcy5jb250YWluZXJOb2RlLmFjdGl2ZSA9ICFfRy51c2VyLmlzVmVyc2lvblYyO1xuICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIuYWN0aXZlID0gX0cudXNlci5pc1ZlcnNpb25WMjtcblxuICAgICAgaWYgKCFfRy51c2VyLmlzVmVyc2lvblYyKSB0aGlzLnJlbmRlckxpc3QoKTtcbiAgICAgIGVsc2UgdGhpcy5yZW5kZXJMaXN0VjIoKTtcbiAgICAgIF9HLnJlc291cmNlcy5hZGRGcmFtZUxvYWRDYWxsYmFjaygoY2F0TmFtZSwgZnJhbWVOYW1lKSA9PiB0aGlzLm9uRnJhbWVMb2FkZWQoY2F0TmFtZSwgZnJhbWVOYW1lKSk7XG5cbiAgICAgIHRoaXMuc2V0dXBWaXNpYmxlRnJhbWVDb2xsaWRlcigpO1xuICAgfSxcblxuXG4gICBvbkZyYW1lTG9hZGVkKGNhdE5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgLy8gXy5sb2coYCBvbkZyYW1lTG9hZGVkID4+IGNhdE5hbWU9JHtjYXROYW1lfSwgZnJhbWVOYW1lPSR7ZnJhbWVOYW1lfSBgKTtcbiAgICAgIGxldCBmcmFtZUNlbGxOb2RlO1xuXG4gICAgICBpZiAoX0cudXNlci5pc1ZlcnNpb25WMikge1xuICAgICAgICAgZnJhbWVDZWxsTm9kZSA9IHRoaXMuY29udGFpbmVyTm9kZVYyLmNoaWxkcmVuLmZpbmQobm9kZSA9PiBub2RlLmNhdGVnb3J5TmFtZSA9PSBjYXROYW1lICYmIG5vZGUubmFtZSA9PSBmcmFtZU5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGNvbnN0IGNhdENvbnRhaW5lck5vZGUgPSBjYy5maW5kKGNhdE5hbWUsIHRoaXMuY29udGFpbmVyTm9kZSlcbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBjYXRDb250YWluZXJOb2RlKTtcbiAgICAgICAgIGZyYW1lQ2VsbE5vZGUgPSBjYy5maW5kKGZyYW1lTmFtZSwgc2Nyb2xsVmlld0NvbnRlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKCFmcmFtZUNlbGxOb2RlKSByZXR1cm4gXy5sb2coYCBvbkZyYW1lTG9hZGVkICgke2NhdE5hbWV9LCAke2ZyYW1lTmFtZX0pID4+ICBmcmFtZUNlbGxOb2RlID0gJHtmcmFtZUNlbGxOb2RlfSBgKTtcblxuICAgICAgZnJhbWVDZWxsTm9kZS5pc1RleHR1cmVMb2FkZWQgPSB0cnVlO1xuICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBmcmFtZUNlbGxOb2RlKTtcbiAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShmcmFtZU5vZGUsIF9HLnJlc291cmNlcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bZnJhbWVOYW1lXSk7XG5cbiAgICAgIC8vIGZ4IGZhZGUgaW4gdG8gc21vb3RobHkgc2hvd1xuICAgICAgY29uc3QgZnJhbWVDb3ZlciA9IGNjLmZpbmQoJ2ZyYW1lX2NvdmVyJywgZnJhbWVDZWxsTm9kZSk7XG4gICAgICBjYy50d2VlbihmcmFtZUNvdmVyKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xuICAgfSxcblxuICAgc2V0dXBWaXNpYmxlRnJhbWVDb2xsaWRlcigpIHtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0aGlzLmNvbGxpZGVyTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgdGhpcy5jb2xsaWRlck5vZGUuaGVpZ2h0ID0gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLmhlaWdodCA9IGNjLndpblNpemUuaGVpZ2h0O1xuICAgICAgICAgLy8gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLndpZHRoID0gMzAwO1xuICAgICAgICAgLy8gdGhpcy5jb2xsaWRlck5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKS5zaXplLmhlaWdodCA9IDMwMDtcbiAgICAgIH0sIDEwMCk7XG4gICB9LFxuXG5cbiAgIHJlbmRlckxpc3QoKSB7XG4gICAgICBjb25zdCBzY3JvbGxWaWV3TWFzdGVyID0gY2MuZmluZCgnQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3RlcicpO1xuICAgICAgY29uc3Qgc2Nyb2xsVmlld01hc3RlckNvbXAgPSBzY3JvbGxWaWV3TWFzdGVyLmdldENvbXBvbmVudCgnTmVzdGFibGVTY3JvbGxWaWV3X091dGVyJyk7XG5cbiAgICAgIGNvbnN0IHNhbXBsZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL3NhbXBsZV9jYXRlZ29yeV9yb3cnKTtcbiAgICAgIGNvbnN0IHNhbXBsZUZyYW1lTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9zYW1wbGVfbm9kZXMvc2FtcGxlX2ZyYW1lX2NlbGwnKTtcbiAgICAgIHNhbXBsZUZyYW1lTm9kZS5vcGFjaXR5ID0gMDtcblxuICAgICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB7XG4gICAgICAgICBjb25zdCBuZXdSb3dOb2RlID0gXy5jb3B5Tm9kZShzYW1wbGVOb2RlLCB0aGlzLmNvbnRhaW5lck5vZGUpO1xuICAgICAgICAgbmV3Um93Tm9kZS5uYW1lID0gY2F0TmFtZTtcbiAgICAgICAgIG5ld1Jvd05vZGUub3BhY2l0eSA9IDA7IC8vIHJlZHVjZSBkcmF3Y2FsbC4gV2lsbCBhcHBlYXIgd2hlbiB0b3VjaGluZyB2aXNpYmxlIGNvbGxpZGVyXG4gICAgICAgICBzY3JvbGxWaWV3TWFzdGVyQ29tcC5tX0lubmVyU2Nyb2xsVmlld3MucHVzaChjYy5maW5kKCdzY3JvbGx2aWV3JywgbmV3Um93Tm9kZSkuZ2V0Q29tcG9uZW50KCdOZXN0YWJsZVNjcm9sbFZpZXdfSW5uZXInKSlcbiAgICAgICAgIC8vIF9HLnV0aWxzVUkuZmlsbENoaWxkTGFiZWxCeVBhdGgobmV3Um93Tm9kZSwgJ2hlYWRlcl9iZy9sYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lJywgY2F0TmFtZSk7XG4gICAgICAgICBjb25zdCBsYWJlbENhdE5hbWUgPSBjYy5maW5kKCdoZWFkZXJfYmcvbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZScsIG5ld1Jvd05vZGUpO1xuICAgICAgICAgbGFiZWxDYXROYW1lLmxvY2FsaXplRGF0YSA9IGNhdE5hbWU7XG5cbiAgICAgICAgIGNvbnN0IGNhdGVnb3J5SW5mbyA9IF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSBjYXROYW1lKTtcbiAgICAgICAgIGlmICghY2F0ZWdvcnlJbmZvKSByZXR1cm47XG5cbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBuZXdSb3dOb2RlKTtcbiAgICAgICAgIGNhdGVnb3J5SW5mby5mcmFtZUFyci5tYXAoZnJhbWVJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZyYW1lQ2VsbE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUZyYW1lTm9kZSwgc2Nyb2xsVmlld0NvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGVBcnIucHVzaChuZXdGcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgICAgIG5ld0ZyYW1lQ2VsbE5vZGUubmFtZSA9IGZyYW1lSW5mby5uYW1lO1xuICAgICAgICAgICAgbmV3RnJhbWVDZWxsTm9kZS5jYXRlZ29yeU5hbWUgPSBjYXROYW1lO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBuZXdGcmFtZUNlbGxOb2RlKTtcblxuICAgICAgICAgICAgY29uc3QgZnJhbWVUZXh0dXJlID0gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1tjYXROYW1lXVtmcmFtZUluZm8ubmFtZV07XG4gICAgICAgICAgICBpZiAoZnJhbWVUZXh0dXJlKSBfRy51dGlsc1VJLnNldE5vZGVTcHJpdGUoZnJhbWVOb2RlLCBmcmFtZVRleHR1cmUpO1xuXG4gICAgICAgICAgICBuZXdGcmFtZUNlbGxOb2RlLmJ1dHRvbkNvbXBab29tU2NhbGUgPSAwLjk7XG4gICAgICAgICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24obmV3RnJhbWVDZWxsTm9kZSwgKCkgPT4gX0cuZ2FtZU1lY2hhbmljLnByZXZpZXdHYW1lKGNhdE5hbWUsIGZyYW1lSW5mby5uYW1lLCAzLCAzLCB0cnVlKSk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBzY3JvbGxWaWV3TWFzdGVyQ29tcC5yZWxvYWRJbm5lclNjcm9sbFZpZXdzKCk7XG4gICAgICB0aGlzLnNldHVwQWxsRnJhbWVBdmF0YXJzKCk7XG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB0aGlzLnVwZGF0ZUFsbEljb25DaGVja2VkcygpLCAncGxheWVkR2FtZXMnLCBfRy51c2VyKTtcblxuICAgfSxcblxuXG4gICByZW5kZXJMaXN0VjIoKSB7XG4gICAgICBjb25zdCBzYW1wbGVGcmFtZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvc2FtcGxlX25vZGVzL3NhbXBsZV9mcmFtZV9jZWxsX3YyJyk7XG4gICAgICBzYW1wbGVGcmFtZU5vZGUub3BhY2l0eSA9IDA7XG5cbiAgICAgIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeU5hbWVBcnIubWFwKGNhdE5hbWUgPT4ge1xuICAgICAgICAgY29uc3QgY2F0ZWdvcnlJbmZvID0gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IGNhdE5hbWUpO1xuICAgICAgICAgaWYgKCFjYXRlZ29yeUluZm8pIHJldHVybjtcblxuICAgICAgICAgY2F0ZWdvcnlJbmZvLmZyYW1lQXJyLm1hcChmcmFtZUluZm8gPT4ge1xuICAgICAgICAgICAgLy8gekluZGV4QXJyLnB1c2goaSsrKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld0ZyYW1lQ2VsbE5vZGUgPSBfLmNvcHlOb2RlKHNhbXBsZUZyYW1lTm9kZSwgdGhpcy5jb250YWluZXJOb2RlVjIpO1xuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGVBcnIucHVzaChuZXdGcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgICAgIG5ld0ZyYW1lQ2VsbE5vZGUubmFtZSA9IGZyYW1lSW5mby5uYW1lO1xuICAgICAgICAgICAgbmV3RnJhbWVDZWxsTm9kZS5jYXRlZ29yeU5hbWUgPSBjYXROYW1lO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVOb2RlID0gY2MuZmluZCgnZnJhbWUnLCBuZXdGcmFtZUNlbGxOb2RlKTtcblxuICAgICAgICAgICAgY29uc3QgZnJhbWVUZXh0dXJlID0gX0cucmVzb3VyY2VzLmZyYW1lU3ByaXRlc1tjYXROYW1lXVtmcmFtZUluZm8ubmFtZV07XG4gICAgICAgICAgICBpZiAoZnJhbWVUZXh0dXJlKSBfRy51dGlsc1VJLnNldE5vZGVTcHJpdGUoZnJhbWVOb2RlLCBmcmFtZVRleHR1cmUpO1xuXG4gICAgICAgICAgICBuZXdGcmFtZUNlbGxOb2RlLmJ1dHRvbkNvbXBab29tU2NhbGUgPSAwLjk7XG4gICAgICAgICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24obmV3RnJhbWVDZWxsTm9kZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgX0cuZ2FtZU1lY2hhbmljLnByZXZpZXdHYW1lKGNhdE5hbWUsIGZyYW1lSW5mby5uYW1lLCAxLCAxLCB0cnVlKTtcbiAgICAgICAgICAgICAgIHRoaXMuc29ydENhdGVnb3J5VjJSYW5kb21seSgpO1xuICAgICAgICAgICAgICAgX0cuaW50ZXJBZC5jaGVja1RvU2hvd0ludGVyQWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5zb3J0Q2F0ZWdvcnlWMlJhbmRvbWx5KCksICdwbGF5ZWRHYW1lcycsIF9HLnVzZXIpO1xuXG4gICAgICB0aGlzLnNldHVwQWxsRnJhbWVBdmF0YXJzKCk7XG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB0aGlzLnVwZGF0ZUFsbEljb25DaGVja2VkcygpLCAncGxheWVkR2FtZXMnLCBfRy51c2VyKTtcbiAgIH0sXG5cblxuICAgLy8gcmFuZG9tIG9yZGVyIGJ1dCBuZXdGcmFtZSBvbiB0b3AsIHBsYXllZC1mcmFtZXMgYXQgYm90dG9tXG4gICBzb3J0Q2F0ZWdvcnlWMlJhbmRvbWx5KCkge1xuICAgICAgY29uc3QgZnJhbWVOb2RlVG9TY29yZSA9IG5vZGUgPT4gX0cudXNlci5wbGF5ZWRHYW1lc1tgJHtub2RlLmNhdGVnb3J5TmFtZX1fJHtub2RlLm5hbWV9YF0gPyAyIDogMTtcbiAgICAgIHRoaXMuZnJhbWVOb2RlQXJyLnNvcnQoKG5vZGVBLCBub2RlQikgPT4gKGZyYW1lTm9kZVRvU2NvcmUobm9kZUEpIC0gZnJhbWVOb2RlVG9TY29yZShub2RlQikpIHx8IChfLnJhbmRvbSgpID4gMC41ID8gMSA6IC0xKSk7XG4gICAgICB0aGlzLmZyYW1lTm9kZUFyci5tYXAoKG5vZGUsIGkpID0+IG5vZGUuekluZGV4ID0gaSk7XG4gICB9LFxuXG5cbiAgIHNldHVwQWxsRnJhbWVBdmF0YXJzKCkge1xuICAgICAgY29uc3Qgc2V0dXBGcmFtZUNlbGxOb2RlID0gKGZyYW1lQ2VsbE5vZGUpID0+IHtcbiAgICAgICAgIGNvbnN0IGZyYW1lTm9kZSA9IGNjLmZpbmQoJ2ZyYW1lJywgZnJhbWVDZWxsTm9kZSk7XG4gICAgICAgICBjb25zdCBhdmF0YXJOb2RlID0gY2MuZmluZCgnbWFzay9hdmF0YXInLCBmcmFtZUNlbGxOb2RlKTtcbiAgICAgICAgIF9HLnV0aWxzVUkuc2V0Tm9kZVNwcml0ZShhdmF0YXJOb2RlLCBfRy5tYXBWaXN1YWwuYXZhdGFyU3ByaXRlRnJhbWUpO1xuICAgICAgICAgY29uc3QgZnJhbWVTY2FsZSA9IF9HLnVzZXIuaXNWZXJzaW9uVjIgPyBGUkFNRV9TQ0FMRV9WMiA6IEZSQU1FX1NDQUxFO1xuICAgICAgICAgY29uc3QgZnJhbWVTaXplID0gX0cudXNlci5pc1ZlcnNpb25WMiA/IEZSQU1FX1NJWkVfVjIgOiBGUkFNRV9TSVpFO1xuICAgICAgICAgX0cubWFwVmlzdWFsLnNldEF2YXRhcihmcmFtZUNlbGxOb2RlLmNhdGVnb3J5TmFtZSwgZnJhbWVDZWxsTm9kZS5uYW1lLCBmcmFtZU5vZGUsIGF2YXRhck5vZGUsIGZyYW1lU2NhbGUsIGZyYW1lU2l6ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfRy51c2VyLmlzVmVyc2lvblYyKVxuICAgICAgICAgdGhpcy5jb250YWluZXJOb2RlVjIuY2hpbGRyZW4ubWFwKChmcmFtZUNlbGxOb2RlKSA9PiBzZXR1cEZyYW1lQ2VsbE5vZGUoZnJhbWVDZWxsTm9kZSkpXG4gICAgICBlbHNlIHtcbiAgICAgICAgIHRoaXMuY29udGFpbmVyTm9kZS5jaGlsZHJlbi5tYXAoY2F0Q29udGFpbmVyTm9kZSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxWaWV3Q29udGVudCA9IGNjLmZpbmQoJ3Njcm9sbHZpZXcvdmlldy9jb250ZW50JywgY2F0Q29udGFpbmVyTm9kZSk7XG4gICAgICAgICAgICBzY3JvbGxWaWV3Q29udGVudC5jaGlsZHJlbi5tYXAoKGZyYW1lQ2VsbE5vZGUpID0+IHNldHVwRnJhbWVDZWxsTm9kZShmcmFtZUNlbGxOb2RlKSk7XG4gICAgICAgICB9KTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgdXBkYXRlQWxsSWNvbkNoZWNrZWRzKCkge1xuICAgICAgY29uc3Qgc2V0dXBJY29uQ2hlY2tlZCA9IChmcmFtZUNlbGxOb2RlKSA9PiB7XG4gICAgICAgICBjYy5maW5kKCdpY29uX2NoZWNrZWQnLCBmcmFtZUNlbGxOb2RlKS5hY3RpdmUgPSBfRy51c2VyLnBsYXllZEdhbWVzW2ZyYW1lQ2VsbE5vZGUuY2F0ZWdvcnlOYW1lICsgJ18nICsgZnJhbWVDZWxsTm9kZS5uYW1lXTtcbiAgICAgIH1cblxuICAgICAgaWYgKF9HLnVzZXIuaXNWZXJzaW9uVjIpXG4gICAgICAgICB0aGlzLmNvbnRhaW5lck5vZGVWMi5jaGlsZHJlbi5tYXAoZnJhbWVDZWxsTm9kZSA9PiBzZXR1cEljb25DaGVja2VkKGZyYW1lQ2VsbE5vZGUpKTtcbiAgICAgIGVsc2UgdGhpcy5jb250YWluZXJOb2RlLmNoaWxkcmVuLm1hcChjYXRDb250YWluZXJOb2RlID0+IHtcbiAgICAgICAgIGNvbnN0IHNjcm9sbFZpZXdDb250ZW50ID0gY2MuZmluZCgnc2Nyb2xsdmlldy92aWV3L2NvbnRlbnQnLCBjYXRDb250YWluZXJOb2RlKTtcbiAgICAgICAgIHNjcm9sbFZpZXdDb250ZW50LmNoaWxkcmVuLm1hcChmcmFtZUNlbGxOb2RlID0+IHNldHVwSWNvbkNoZWNrZWQoZnJhbWVDZWxsTm9kZSkpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cblxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/inter_ad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '56da7F4X6tJVqzk9azG74zA', 'inter_ad');
// script/services/inter_ad.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interAd = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.interAd = {
    interAdObj: null,
    isLoading: false,
    init: function () {
        this.preloadInterAds();
        this.lastTimeShowAd = _.getMsPassedUTC();
    },
    preloadInterAds: function () {
        var _this = this;
        if (!window['FBInstant'])
            return;
        if (this.isLoading)
            return;
        _.log("interAd.preloadInterAds ...  ");
        this.interAdObj = null;
        this.isLoading = true;
        FBInstant.getInterstitialAdAsync(_G.configGame.interAdId).then(function (interAdObj) {
            // _log(` preloadInterAds 3333 `);
            interAdObj.loadAsync().then(function () {
                _.log("interAd.preloadInterAds successfully ");
                _this.interAdObj = interAdObj;
                _this.isLoading = false;
            }).catch(function (e) {
                console.warn(e);
                _this.isLoading = false;
                // setTimeout(() => this.preloadInterAds(), 5000);
            });
        }).catch(function (e) {
            console.warn(e);
            _this.isLoading = false;
            // setTimeout(() => this.preloadInterAds(), 5000);
        });
    },
    // loadTimeout = max time to wait for inter ad to be loaded. unless ads will be skipped
    doShowInterAd: function (callBack, maxLoadTimeWait) {
        var _this = this;
        if (maxLoadTimeWait === void 0) { maxLoadTimeWait = 1; }
        // _.log(` showInterAds 1111 `);
        if (!window['FBInstant'])
            return _G.coreUI.showLoadingAds(function () { return callBack && callBack(true); });
        _.waitToRun(function () {
            // show a loading ads 1 secs before do show ad
            _G.coreUI.showLoadingAds(function () {
                // _.log(` showInterAds 2222 `);
                _this.interAdObj.showAsync().then(function () {
                    _.log("interAd.showInterAds success ");
                    if (callBack)
                        callBack(true);
                    _this.preloadInterAds(); // load another ads
                }).catch(function (e) {
                    _.log("interAd.showInterAds fail ");
                    console.warn(e);
                    callBack && callBack();
                    if (e.code != 'RATE_LIMITED')
                        _this.preloadInterAds();
                });
            });
        }, 'interAdObj', this, 0.1, maxLoadTimeWait, function () {
            _.log("interAd.showInterAds fail ");
            console.warn("interAd load wait timeout 5 secs");
            _this.preloadInterAds();
            if (callBack)
                callBack();
        });
    },
    // ===================================
    adShowCount: 0,
    lastTimeShowAd: 0,
    frameClickCount: 0,
    checkToShowInterAd: function (callback) {
        var _this = this;
        var timeArr = _G.configGame.interAdTime[_G.user.isVersionV2 ? 'v2' : 'v1'];
        var timeToWait = timeArr[this.adShowCount] || timeArr[timeArr.length - 1];
        var timeNow = _.getMsPassedUTC();
        _.log("checkToShowInterAd called ! adShowCount=" + this.adShowCount + " // timeToWait=" + timeToWait + " // timePassed = " + _.round(timeNow / 1000 - this.lastTimeShowAd / 1000) + " secs // timeArr=" + timeArr);
        if (timeNow - this.lastTimeShowAd < timeToWait * 1000)
            return callback && callback();
        this.frameClickCount++;
        if (this.frameClickCount < _G.configGame.interAdClickCount)
            return callback && callback();
        _.waitToRun(function () {
            _this.doShowInterAd(function (isShowSuccess) {
                if (!isShowSuccess)
                    return callback && callback();
                _.log("interAd show callback called !");
                _this.adShowCount++;
                _this.lastTimeShowAd = timeNow;
                _this.frameClickCount = 0;
                return callback && callback();
            });
        }, '!isPlayingFxStarsAdd', _G.coreFX, 0.5);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvaW50ZXJfYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLE9BQU8sR0FBRztJQUNwQixVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsS0FBSztJQUVoQixJQUFJO1FBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxlQUFlO1FBQWYsaUJBdUJDO1FBdEJFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTztRQUNqQyxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTztRQUUzQixDQUFDLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsU0FBUyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsVUFBVTtZQUN0RSxrQ0FBa0M7WUFDbEMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDekIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2dCQUMvQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztnQkFDUixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFJLENBQUMsU0FBUyxH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RyxJQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsR0FBRyxJQUFJO1lBQUUsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFDckYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBRTFGLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFJLENBQUMsYUFBYSxDQUFDLFVBQUEsYUFBYTtnQkFDN0IsSUFBSSxDQUFDLGFBQWE7b0JBQUUsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDeEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFBO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxFQUFFLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFOUMsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCBjb25zdCBpbnRlckFkID0ge1xuICAgaW50ZXJBZE9iajogbnVsbCxcbiAgIGlzTG9hZGluZzogZmFsc2UsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLnByZWxvYWRJbnRlckFkcygpO1xuICAgICAgdGhpcy5sYXN0VGltZVNob3dBZCA9IF8uZ2V0TXNQYXNzZWRVVEMoKTtcbiAgIH0sXG5cbiAgIHByZWxvYWRJbnRlckFkcygpIHtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuO1xuICAgICAgaWYgKHRoaXMuaXNMb2FkaW5nKSByZXR1cm47XG5cbiAgICAgIF8ubG9nKGBpbnRlckFkLnByZWxvYWRJbnRlckFkcyAuLi4gIGApO1xuICAgICAgdGhpcy5pbnRlckFkT2JqID0gbnVsbDtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICAgIEZCSW5zdGFudC5nZXRJbnRlcnN0aXRpYWxBZEFzeW5jKF9HLmNvbmZpZ0dhbWUuaW50ZXJBZElkKS50aGVuKGludGVyQWRPYmogPT4ge1xuICAgICAgICAgLy8gX2xvZyhgIHByZWxvYWRJbnRlckFkcyAzMzMzIGApO1xuICAgICAgICAgaW50ZXJBZE9iai5sb2FkQXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnByZWxvYWRJbnRlckFkcyBzdWNjZXNzZnVsbHkgYCk7XG4gICAgICAgICAgICB0aGlzLmludGVyQWRPYmogPSBpbnRlckFkT2JqO1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oZSk7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gc2V0VGltZW91dCgoKSA9PiB0aGlzLnByZWxvYWRJbnRlckFkcygpLCA1MDAwKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgIGNvbnNvbGUud2FybihlKTtcbiAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJlbG9hZEludGVyQWRzKCksIDUwMDApO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIGxvYWRUaW1lb3V0ID0gbWF4IHRpbWUgdG8gd2FpdCBmb3IgaW50ZXIgYWQgdG8gYmUgbG9hZGVkLiB1bmxlc3MgYWRzIHdpbGwgYmUgc2tpcHBlZFxuICAgZG9TaG93SW50ZXJBZChjYWxsQmFjaz8sIG1heExvYWRUaW1lV2FpdCA9IDEpIHtcbiAgICAgIC8vIF8ubG9nKGAgc2hvd0ludGVyQWRzIDExMTEgYCk7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBfRy5jb3JlVUkuc2hvd0xvYWRpbmdBZHMoKCkgPT4gY2FsbEJhY2sgJiYgY2FsbEJhY2sodHJ1ZSkpO1xuICAgICAgXy53YWl0VG9SdW4oXG4gICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAvLyBzaG93IGEgbG9hZGluZyBhZHMgMSBzZWNzIGJlZm9yZSBkbyBzaG93IGFkXG4gICAgICAgICAgICBfRy5jb3JlVUkuc2hvd0xvYWRpbmdBZHMoKCkgPT4ge1xuICAgICAgICAgICAgICAgLy8gXy5sb2coYCBzaG93SW50ZXJBZHMgMjIyMiBgKTtcbiAgICAgICAgICAgICAgIHRoaXMuaW50ZXJBZE9iai5zaG93QXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBzdWNjZXNzIGApO1xuICAgICAgICAgICAgICAgICAgaWYgKGNhbGxCYWNrKSBjYWxsQmFjayh0cnVlKVxuICAgICAgICAgICAgICAgICAgdGhpcy5wcmVsb2FkSW50ZXJBZHMoKTsgLy8gbG9hZCBhbm90aGVyIGFkc1xuICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBmYWlsIGApO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGUpO1xuICAgICAgICAgICAgICAgICAgY2FsbEJhY2sgJiYgY2FsbEJhY2soKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgIT0gJ1JBVEVfTElNSVRFRCcpIHRoaXMucHJlbG9hZEludGVyQWRzKCk7XG4gICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICB9LFxuICAgICAgICAgJ2ludGVyQWRPYmonLFxuICAgICAgICAgdGhpcyxcbiAgICAgICAgIDAuMSxcbiAgICAgICAgIG1heExvYWRUaW1lV2FpdCxcbiAgICAgICAgICgpID0+IHsgIC8vIHRpbWVvdXQgY2FsbGJhY2tcbiAgICAgICAgICAgIF8ubG9nKGBpbnRlckFkLnNob3dJbnRlckFkcyBmYWlsIGApO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBpbnRlckFkIGxvYWQgd2FpdCB0aW1lb3V0IDUgc2Vjc2ApO1xuICAgICAgICAgICAgdGhpcy5wcmVsb2FkSW50ZXJBZHMoKTtcbiAgICAgICAgICAgIGlmIChjYWxsQmFjaykgY2FsbEJhY2soKTtcbiAgICAgICAgIH1cbiAgICAgIClcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIGFkU2hvd0NvdW50OiAwLFxuICAgbGFzdFRpbWVTaG93QWQ6IDAsXG4gICBmcmFtZUNsaWNrQ291bnQ6IDAsXG4gICBjaGVja1RvU2hvd0ludGVyQWQoY2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgdGltZUFyciA9IF9HLmNvbmZpZ0dhbWUuaW50ZXJBZFRpbWVbX0cudXNlci5pc1ZlcnNpb25WMiA/ICd2MicgOiAndjEnXTtcbiAgICAgIGxldCB0aW1lVG9XYWl0ID0gdGltZUFyclt0aGlzLmFkU2hvd0NvdW50XSB8fCB0aW1lQXJyW3RpbWVBcnIubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCB0aW1lTm93ID0gXy5nZXRNc1Bhc3NlZFVUQygpO1xuICAgICAgXy5sb2coYGNoZWNrVG9TaG93SW50ZXJBZCBjYWxsZWQgISBhZFNob3dDb3VudD0ke3RoaXMuYWRTaG93Q291bnR9IC8vIHRpbWVUb1dhaXQ9JHt0aW1lVG9XYWl0fSAvLyB0aW1lUGFzc2VkID0gJHtfLnJvdW5kKHRpbWVOb3cgLyAxMDAwIC0gdGhpcy5sYXN0VGltZVNob3dBZCAvIDEwMDApfSBzZWNzIC8vIHRpbWVBcnI9JHt0aW1lQXJyfWApO1xuICAgICAgaWYgKHRpbWVOb3cgLSB0aGlzLmxhc3RUaW1lU2hvd0FkIDwgdGltZVRvV2FpdCAqIDEwMDApIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgdGhpcy5mcmFtZUNsaWNrQ291bnQrKztcbiAgICAgIGlmICh0aGlzLmZyYW1lQ2xpY2tDb3VudCA8IF9HLmNvbmZpZ0dhbWUuaW50ZXJBZENsaWNrQ291bnQpIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXG4gICAgICBfLndhaXRUb1J1bigoKSA9PiB7XG4gICAgICAgICB0aGlzLmRvU2hvd0ludGVyQWQoaXNTaG93U3VjY2VzcyA9PiB7XG4gICAgICAgICAgICBpZiAoIWlzU2hvd1N1Y2Nlc3MpIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICAgICAgXy5sb2coYGludGVyQWQgc2hvdyBjYWxsYmFjayBjYWxsZWQgIWApO1xuICAgICAgICAgICAgdGhpcy5hZFNob3dDb3VudCsrO1xuICAgICAgICAgICAgdGhpcy5sYXN0VGltZVNob3dBZCA9IHRpbWVOb3c7XG4gICAgICAgICAgICB0aGlzLmZyYW1lQ2xpY2tDb3VudCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgICAgfSk7XG4gICAgICB9LCAnIWlzUGxheWluZ0Z4U3RhcnNBZGQnLCBfRy5jb3JlRlgsIDAuNSk7XG5cbiAgIH0sXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils_facebook.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '34f5bx1BjFD4oeyNj+eyee3', 'utils_facebook');
// script/services/utils_facebook.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsFB = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.utilsFB = {
    init: function () {
        if (window['FBInstant']) {
            FBInstant.onPause(function () { }); // chi can goi ham de FB tick la` API da su dung
            window.fbSupportedAPIs = FBInstant.getSupportedAPIs();
            // console.table(FBInstant.getSupportedAPIs());
        }
    },
    isSupportedAPI: function (name) {
        if (!window['FBInstant'])
            return false;
        var arr = FBInstant.getSupportedAPIs();
        return arr.indexOf(name) != -1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHNfZmFjZWJvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLE9BQU8sR0FBRztJQUNwQixJQUFJO1FBQ0QsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0RBQWdEO1lBQzlFLE1BQU0sQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdEQsK0NBQStDO1NBQ2pEO0lBQ0osQ0FBQztJQUVELGNBQWMsWUFBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdkMsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FHSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5leHBvcnQgY29uc3QgdXRpbHNGQiA9IHtcbiAgIGluaXQoKSB7XG4gICAgICBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgICAgRkJJbnN0YW50Lm9uUGF1c2UoKCkgPT4geyB9KTsgLy8gY2hpIGNhbiBnb2kgaGFtIGRlIEZCIHRpY2sgbGFgIEFQSSBkYSBzdSBkdW5nXG4gICAgICAgICB3aW5kb3cuZmJTdXBwb3J0ZWRBUElzID0gRkJJbnN0YW50LmdldFN1cHBvcnRlZEFQSXMoKTtcbiAgICAgICAgIC8vIGNvbnNvbGUudGFibGUoRkJJbnN0YW50LmdldFN1cHBvcnRlZEFQSXMoKSk7XG4gICAgICB9XG4gICB9LFxuXG4gICBpc1N1cHBvcnRlZEFQSShuYW1lKSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IGFyciA9IEZCSW5zdGFudC5nZXRTdXBwb3J0ZWRBUElzKCk7XG4gICAgICByZXR1cm4gYXJyLmluZGV4T2YobmFtZSkgIT0gLTE7XG4gICB9LFxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/video.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0ee5dMFk+9DoqP4sqItcJ1A', 'video');
// script/services/video.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.video = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
exports.video = {
    isAvailable: false,
    loadingVideo: false,
    rewardedVideo: null,
    init: function () {
        if (!window['FBInstant'])
            this.isAvailable = true;
        this.isAvailable = _G.utilsFB.isSupportedAPI("getRewardedVideoAsync");
        _.log("VIDEO.isAvailable = " + this.isAvailable + " ");
        this.preloadVideo();
    },
    preloadVideo: function () {
        var _this = this;
        _.log("preloadVideo called........  this.loadingVideo=" + this.loadingVideo);
        var failFunc = function (code) { return _.log("preloadVideo 000 code = " + code); };
        if (!window['FBInstant'])
            return failFunc('OFFLINE');
        if (!_G.utilsFB.isSupportedAPI("getRewardedVideoAsync"))
            return failFunc('NOT_SUPPORTED');
        if (this.loadingVideo)
            return failFunc('LOADING');
        _.log("preloadVideo 1111 ");
        var failFunc1 = function (err) {
            _.log("preloadVideo >> failFunc1 called err = ", err);
            _this.rewardedVideo = null;
            _this.loadingVideo = false;
            _.setTimeout(function (err) {
                if (!err || err.code == 'OFFLINE' || err.code == 'LOADING' || err.code == 'NOT_SUPPORTED' || err.code == 'RATE_LIMITED')
                    return;
                _.setTimeout(function () { return _this.preloadVideo(); }, 5000);
            });
        };
        this.loadingVideo = true;
        FBInstant.getRewardedVideoAsync(_G.configGame.videoRewardId).then(function (rewardedVideo) {
            rewardedVideo.loadAsync().then(function () {
                _.log("preloadVideo >> SUCCESS");
                _this.rewardedVideo = rewardedVideo;
                _this.loadingVideo = false;
            }, failFunc1).catch(failFunc1);
        }, failFunc1).catch(failFunc1);
    },
    showVideo: function (orgSuccessCallBack, orgFailCallBack) {
        var _this = this;
        _.log("VIDEO.showVideo() this.loadingVideo=" + this.loadingVideo + " // videoObject = ", this.rewardedVideo);
        var successCallBack = function () { return orgSuccessCallBack && orgSuccessCallBack(); };
        var failCallBack = function (err) { return orgFailCallBack && orgFailCallBack(err); };
        if (!window['FBInstant'])
            return _.random() > 0.75 ? failCallBack() : successCallBack();
        if (this.rewardedVideo) {
            _.log("ev_video_click_show");
            this.rewardedVideo.showAsync().then(function () {
                _.log("VIDEO.showVideo success");
                _.log("ev_watch_video_success", 1, {});
                successCallBack();
                _this.preloadVideo();
            }).catch(function (err) {
                console.warn("VIDEO.showVideo error ", err);
                if (_this.isErrRewardNotCompleted(err)) {
                    _.log("ev_video_err_reward_not_completed");
                }
                else {
                    _.log("ev_video_err_other");
                }
                _this.preloadVideo();
                failCallBack(err);
            });
        }
        else if (this.loadingVideo) {
            // _.setTimeout(() => this.showVideo(successCallBack, failCallBack, videoPos), 200);
            failCallBack({ code: "LOADING" });
        }
        else {
            failCallBack({ code: "VIDEO_IS_NULL" });
        }
    },
    isErrRewardNotCompleted: function (err) {
        return err.code == 'USER_INPUT' && err.message == 'Reward not completed';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQzVDLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFRixRQUFBLEtBQUssR0FBRztJQUNsQixXQUFXLEVBQUUsS0FBSztJQUNsQixZQUFZLEVBQUUsS0FBSztJQUNuQixhQUFhLEVBQUUsSUFBSTtJQUVuQixJQUFJO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNsRCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsSUFBSSxDQUFDLFdBQVcsTUFBRyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFHRCxZQUFZO1FBQVosaUJBaUNDO1FBaENFLENBQUMsQ0FBQyxHQUFHLENBQUMsb0RBQWtELElBQUksQ0FBQyxZQUFjLENBQUMsQ0FBQztRQUU3RSxJQUFNLFFBQVEsR0FBRyxVQUFDLElBQUksSUFBSyxPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsNkJBQTJCLElBQU0sQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUYsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xE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QUMsQ0FBQztpQkFDN0M7cUJBQU07b0JBQ0osQ0FBQyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2lCQUM5QjtnQkFDRCxLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNMO2FBQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzNCLG9GQUFvRjtZQUNwRixZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztTQUNwQzthQUFNO1lBQ0osWUFBWSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7U0FDMUM7SUFDSixDQUFDO0lBR0QsdUJBQXVCLFlBQUMsR0FBRztRQUN4QixPQUFPLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLEdBQUcsQ0FBQyxPQUFPLElBQUksc0JBQXNCLENBQUM7SUFDNUUsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCBjb25zdCB2aWRlbyA9IHtcbiAgIGlzQXZhaWxhYmxlOiBmYWxzZSxcbiAgIGxvYWRpbmdWaWRlbzogZmFsc2UsXG4gICByZXdhcmRlZFZpZGVvOiBudWxsLFxuXG4gICBpbml0KCkge1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSB0aGlzLmlzQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuaXNBdmFpbGFibGUgPSBfRy51dGlsc0ZCLmlzU3VwcG9ydGVkQVBJKFwiZ2V0UmV3YXJkZWRWaWRlb0FzeW5jXCIpO1xuICAgICAgXy5sb2coYFZJREVPLmlzQXZhaWxhYmxlID0gJHt0aGlzLmlzQXZhaWxhYmxlfSBgKTtcblxuICAgICAgdGhpcy5wcmVsb2FkVmlkZW8oKTtcbiAgIH0sXG5cblxuICAgcHJlbG9hZFZpZGVvKCkge1xuICAgICAgXy5sb2coYHByZWxvYWRWaWRlbyBjYWxsZWQuLi4uLi4uLiAgdGhpcy5sb2FkaW5nVmlkZW89JHt0aGlzLmxvYWRpbmdWaWRlb31gKTtcblxuICAgICAgY29uc3QgZmFpbEZ1bmMgPSAoY29kZSkgPT4gXy5sb2coYHByZWxvYWRWaWRlbyAwMDAgY29kZSA9ICR7Y29kZX1gKTtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuIGZhaWxGdW5jKCdPRkZMSU5FJyk7XG4gICAgICBpZiAoIV9HLnV0aWxzRkIuaXNTdXBwb3J0ZWRBUEkoXCJnZXRSZXdhcmRlZFZpZGVvQXN5bmNcIikpIHJldHVybiBmYWlsRnVuYygnTk9UX1NVUFBPUlRFRCcpO1xuICAgICAgaWYgKHRoaXMubG9hZGluZ1ZpZGVvKSByZXR1cm4gZmFpbEZ1bmMoJ0xPQURJTkcnKTtcbiAgICAgIF8ubG9nKGBwcmVsb2FkVmlkZW8gMTExMSBgKTtcblxuICAgICAgY29uc3QgZmFpbEZ1bmMxID0gKGVycikgPT4ge1xuICAgICAgICAgXy5sb2coYHByZWxvYWRWaWRlbyA+PiBmYWlsRnVuYzEgY2FsbGVkIGVyciA9IGAsIGVycik7XG4gICAgICAgICB0aGlzLnJld2FyZGVkVmlkZW8gPSBudWxsO1xuICAgICAgICAgdGhpcy5sb2FkaW5nVmlkZW8gPSBmYWxzZTtcbiAgICAgICAgIF8uc2V0VGltZW91dCgoZXJyKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVyciB8fCBlcnIuY29kZSA9PSAnT0ZGTElORScgfHwgZXJyLmNvZGUgPT0gJ0xPQURJTkcnIHx8IGVyci5jb2RlID09ICdOT1RfU1VQUE9SVEVEJyB8fCBlcnIuY29kZSA9PSAnUkFURV9MSU1JVEVEJykgcmV0dXJuO1xuICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMucHJlbG9hZFZpZGVvKCksIDUwMDApO1xuICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9hZGluZ1ZpZGVvID0gdHJ1ZTtcbiAgICAgIEZCSW5zdGFudC5nZXRSZXdhcmRlZFZpZGVvQXN5bmMoX0cuY29uZmlnR2FtZS52aWRlb1Jld2FyZElkKS50aGVuKFxuICAgICAgICAgcmV3YXJkZWRWaWRlbyA9PiB7XG4gICAgICAgICAgICByZXdhcmRlZFZpZGVvLmxvYWRBc3luYygpLnRoZW4oXG4gICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBfLmxvZyhcInByZWxvYWRWaWRlbyA+PiBTVUNDRVNTXCIpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvID0gcmV3YXJkZWRWaWRlbztcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ1ZpZGVvID0gZmFsc2U7XG4gICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgZmFpbEZ1bmMxXG4gICAgICAgICAgICApLmNhdGNoKGZhaWxGdW5jMSk7XG4gICAgICAgICB9LFxuICAgICAgICAgZmFpbEZ1bmMxXG4gICAgICApLmNhdGNoKGZhaWxGdW5jMSk7XG4gICB9LFxuXG5cbiAgIHNob3dWaWRlbyhvcmdTdWNjZXNzQ2FsbEJhY2ssIG9yZ0ZhaWxDYWxsQmFjaz8pIHtcbiAgICAgIF8ubG9nKGBWSURFTy5zaG93VmlkZW8oKSB0aGlzLmxvYWRpbmdWaWRlbz0ke3RoaXMubG9hZGluZ1ZpZGVvfSAvLyB2aWRlb09iamVjdCA9IGAsIHRoaXMucmV3YXJkZWRWaWRlbyk7XG4gICAgICBjb25zdCBzdWNjZXNzQ2FsbEJhY2sgPSAoKSA9PiBvcmdTdWNjZXNzQ2FsbEJhY2sgJiYgb3JnU3VjY2Vzc0NhbGxCYWNrKCk7XG4gICAgICBjb25zdCBmYWlsQ2FsbEJhY2sgPSAoZXJyPykgPT4gb3JnRmFpbENhbGxCYWNrICYmIG9yZ0ZhaWxDYWxsQmFjayhlcnIpO1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSByZXR1cm4gXy5yYW5kb20oKSA+IDAuNzUgPyBmYWlsQ2FsbEJhY2soKSA6IHN1Y2Nlc3NDYWxsQmFjaygpO1xuXG4gICAgICBpZiAodGhpcy5yZXdhcmRlZFZpZGVvKSB7XG4gICAgICAgICBfLmxvZyhgZXZfdmlkZW9fY2xpY2tfc2hvd2ApO1xuICAgICAgICAgdGhpcy5yZXdhcmRlZFZpZGVvLnNob3dBc3luYygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgXy5sb2coYFZJREVPLnNob3dWaWRlbyBzdWNjZXNzYCk7XG4gICAgICAgICAgICBfLmxvZyhcImV2X3dhdGNoX3ZpZGVvX3N1Y2Nlc3NcIiwgMSwge30pO1xuICAgICAgICAgICAgc3VjY2Vzc0NhbGxCYWNrKCk7XG4gICAgICAgICAgICB0aGlzLnByZWxvYWRWaWRlbygpO1xuICAgICAgICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVklERU8uc2hvd1ZpZGVvIGVycm9yIGAsIGVycik7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0VyclJld2FyZE5vdENvbXBsZXRlZChlcnIpKSB7XG4gICAgICAgICAgICAgICBfLmxvZyhgZXZfdmlkZW9fZXJyX3Jld2FyZF9ub3RfY29tcGxldGVkYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgXy5sb2coYGV2X3ZpZGVvX2Vycl9vdGhlcmApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmVsb2FkVmlkZW8oKTtcbiAgICAgICAgICAgIGZhaWxDYWxsQmFjayhlcnIpO1xuICAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubG9hZGluZ1ZpZGVvKSB7XG4gICAgICAgICAvLyBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93VmlkZW8oc3VjY2Vzc0NhbGxCYWNrLCBmYWlsQ2FsbEJhY2ssIHZpZGVvUG9zKSwgMjAwKTtcbiAgICAgICAgIGZhaWxDYWxsQmFjayh7IGNvZGU6IFwiTE9BRElOR1wiIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGZhaWxDYWxsQmFjayh7IGNvZGU6IFwiVklERU9fSVNfTlVMTFwiIH0pO1xuICAgICAgfVxuICAgfSxcblxuXG4gICBpc0VyclJld2FyZE5vdENvbXBsZXRlZChlcnIpIHtcbiAgICAgIHJldHVybiBlcnIuY29kZSA9PSAnVVNFUl9JTlBVVCcgJiYgZXJyLm1lc3NhZ2UgPT0gJ1Jld2FyZCBub3QgY29tcGxldGVkJztcbiAgIH0sXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/extra-components/visible_frame_collider_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '27097v1Zk5H+73juqpp32Fj', 'visible_frame_collider_comp');
// script/services/extra-components/visible_frame_collider_comp.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var VisibleFrameColliderComp = /** @class */ (function (_super) {
    __extends(VisibleFrameColliderComp, _super);
    function VisibleFrameColliderComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisibleFrameColliderComp.prototype.onCollisionEnter = function (otherCollider, selfCollider) {
        var contentNode = otherCollider.node;
        contentNode.opacity = 255;
        // if is category frame, load the frame if not loaded
        // _.log(`VisibleFrameColliderComp >> contentNode.categoryName=${contentNode.categoryName}, contentNode.name=${contentNode.name}  `);
        if (contentNode.categoryName && !contentNode.isTextureLoaded) {
            _G.resources.loadSingleFrame(contentNode.categoryName, contentNode.name);
        }
    };
    VisibleFrameColliderComp.prototype.onCollisionExit = function (otherCollider, selfCollider) {
        otherCollider.node.opacity = 0;
    };
    VisibleFrameColliderComp = __decorate([
        ccclass
    ], VisibleFrameColliderComp);
    return VisibleFrameColliderComp;
}(cc.Component));
exports.default = VisibleFrameColliderComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvZXh0cmEtY29tcG9uZW50cy92aXNpYmxlX2ZyYW1lX2NvbGxpZGVyX2NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVkLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNELDRDQUFZO0lBQWxFOztJQWVBLENBQUM7SUFkRSxtREFBZ0IsR0FBaEIsVUFBaUIsYUFBYSxFQUFFLFlBQVk7UUFDekMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztRQUN2QyxXQUFXLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUUxQixxREFBcUQ7UUFDckQscUlBQXFJO1FBQ3JJLElBQUksV0FBVyxDQUFDLFlBQVksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUU7WUFDM0QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0U7SUFDSixDQUFDO0lBRUQsa0RBQWUsR0FBZixVQUFnQixhQUFhLEVBQUUsWUFBWTtRQUN4QyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQWRpQix3QkFBd0I7UUFENUMsT0FBTztPQUNhLHdCQUF3QixDQWU1QztJQUFELCtCQUFDO0NBZkQsQUFlQyxDQWZxRCxFQUFFLENBQUMsU0FBUyxHQWVqRTtrQkFmb0Isd0JBQXdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaXNpYmxlRnJhbWVDb2xsaWRlckNvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgb25Db2xsaXNpb25FbnRlcihvdGhlckNvbGxpZGVyLCBzZWxmQ29sbGlkZXIpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnROb2RlID0gb3RoZXJDb2xsaWRlci5ub2RlO1xuICAgICAgY29udGVudE5vZGUub3BhY2l0eSA9IDI1NTtcblxuICAgICAgLy8gaWYgaXMgY2F0ZWdvcnkgZnJhbWUsIGxvYWQgdGhlIGZyYW1lIGlmIG5vdCBsb2FkZWRcbiAgICAgIC8vIF8ubG9nKGBWaXNpYmxlRnJhbWVDb2xsaWRlckNvbXAgPj4gY29udGVudE5vZGUuY2F0ZWdvcnlOYW1lPSR7Y29udGVudE5vZGUuY2F0ZWdvcnlOYW1lfSwgY29udGVudE5vZGUubmFtZT0ke2NvbnRlbnROb2RlLm5hbWV9ICBgKTtcbiAgICAgIGlmIChjb250ZW50Tm9kZS5jYXRlZ29yeU5hbWUgJiYgIWNvbnRlbnROb2RlLmlzVGV4dHVyZUxvYWRlZCkge1xuICAgICAgICAgX0cucmVzb3VyY2VzLmxvYWRTaW5nbGVGcmFtZShjb250ZW50Tm9kZS5jYXRlZ29yeU5hbWUsIGNvbnRlbnROb2RlLm5hbWUpO1xuICAgICAgfVxuICAgfVxuXG4gICBvbkNvbGxpc2lvbkV4aXQob3RoZXJDb2xsaWRlciwgc2VsZkNvbGxpZGVyKSB7XG4gICAgICBvdGhlckNvbGxpZGVyLm5vZGUub3BhY2l0eSA9IDA7XG4gICB9XG59XG5cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/analytic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b0b73wpc/tKmot33I4RsZqt', 'analytic');
// script/services/analytic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytic = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.analytic = {
    init: function () {
    },
    log: function (eventName, value) {
        // if (!window['firebaseLogEvent']) return;
        // window['firebaseLogEvent'](eventName, value);
    },
    logPageView: function () {
        // --- fb pixel
        if (window['fbq']) {
            window['fbq']('track', 'PageView');
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('PageView');
        }
    },
    logPageViewFromFeed: function (puzzleId) {
        if (!puzzleId)
            return;
        var _a = puzzleId.split('_'), content_category = _a[0], content_name = _a[1];
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelShare (${content_category}, ${content_name}) `);
            window['fbq']('trackCustom', 'pageview_f', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('pageview_f', { content_category: content_category, content_name: content_name });
        }
    },
    logViewContent: function (content_category, content_name) {
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelViewContent (${content_category}, ${content_name}) `);
            window['fbq']('track', 'ViewContent', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('ViewContent', { content_category: content_category, content_name: content_name });
        }
    },
    logShare: function (content_category, content_name) {
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelShare (${content_category}, ${content_name}) `);
            window['fbq']('trackCustom', 'Share', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('Share', { content_category: content_category, content_name: content_name });
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvYW5hbHl0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsUUFBUSxHQUFHO0lBRXJCLElBQUk7SUFDSixDQUFDO0lBRUQsR0FBRyxFQUFILFVBQUksU0FBUyxFQUFFLEtBQU07UUFDbEIsMkNBQTJDO1FBQzNDLGdEQUFnRDtJQUNuRCxDQUFDO0lBRUQsV0FBVztRQUNSLGVBQWU7UUFDZixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDSixDQUFDO0lBRUQsbUJBQW1CLFlBQUMsUUFBUTtRQUN6QixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDaEIsSUFBQSxLQUFtQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyRCxnQkFBZ0IsUUFBQSxFQUFFLFlBQVksUUFBdUIsQ0FBQztRQUU3RCxlQUFlO1FBQ2YsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsbUVBQW1FO1lBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQy9FO0lBQ0osQ0FBQztJQUdELGNBQWMsWUFBQyxnQkFBZ0IsRUFBRSxZQUFZO1FBQzFDLGVBQWU7UUFDZixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQix5RUFBeUU7WUFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxnQkFBZ0Isa0JBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7U0FDNUU7UUFFRCxzQkFBc0I7UUFDdEIsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUM3QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxnQkFBZ0Isa0JBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7U0FDaEY7SUFDSixDQUFDO0lBRUQsUUFBUSxZQUFDLGdCQUFnQixFQUFFLFlBQVk7UUFDcEMsZUFBZTtRQUNmLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLG1FQUFtRTtZQUNuRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQztTQUM1RTtRQUVELHNCQUFzQjtRQUN0QixJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQztTQUMxRTtJQUNKLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBhbmFseXRpYyA9IHtcblxuICAgaW5pdCgpIHtcbiAgIH0sXG5cbiAgIGxvZyhldmVudE5hbWUsIHZhbHVlPykge1xuICAgICAgLy8gaWYgKCF3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkgcmV0dXJuO1xuICAgICAgLy8gd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oZXZlbnROYW1lLCB2YWx1ZSk7XG4gICB9LFxuXG4gICBsb2dQYWdlVmlldygpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1BhZ2VWaWV3Jyk7XG4gICAgICB9XG4gICB9LFxuXG4gICBsb2dQYWdlVmlld0Zyb21GZWVkKHB1enpsZUlkKSB7XG4gICAgICBpZiAoIXB1enpsZUlkKSByZXR1cm47XG4gICAgICBjb25zdCBbY29udGVudF9jYXRlZ29yeSwgY29udGVudF9uYW1lXSA9IHB1enpsZUlkLnNwbGl0KCdfJyk7XG5cbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxTaGFyZSAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrQ3VzdG9tJywgJ3BhZ2V2aWV3X2YnLCB7IGNvbnRlbnRfY2F0ZWdvcnksIGNvbnRlbnRfbmFtZSB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gLS0tIGdvb2dsZSBhbmFseXRpY1xuICAgICAgaWYgKHdpbmRvd1snZmlyZWJhc2VMb2dFdmVudCddKSB7XG4gICAgICAgICB3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSgncGFnZXZpZXdfZicsIHsgY29udGVudF9jYXRlZ29yeSwgY29udGVudF9uYW1lIH0pO1xuICAgICAgfVxuICAgfSxcblxuXG4gICBsb2dWaWV3Q29udGVudChjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxWaWV3Q29udGVudCAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrJywgJ1ZpZXdDb250ZW50JywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1ZpZXdDb250ZW50JywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG4gICB9LFxuXG4gICBsb2dTaGFyZShjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxTaGFyZSAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrQ3VzdG9tJywgJ1NoYXJlJywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1NoYXJlJywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '57d370T3gNMWJXIo0x1feW9', 'audio');
// script/services/audio.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audio = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var STREAK_TIME_RANGE = 5 * 1000; // milliseconds
var MAX_STREAK_INDEX = 15; // number of streak sounds we have
exports.audio = {
    audioList: {},
    playingIdList: {},
    currentStreakSoundIndex: 0,
    lastStreakTime: 0,
    init: function () {
        var _this = this;
        _.setTimeout(function () { return _this.loadAudioFiles(); }, 1000);
    },
    loadAudioFiles: function () {
        var _this = this;
        cc.resources.loadDir('audios', cc.AudioClip, function (err, res) {
            if (err)
                return _.log(err);
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var clip = res_1[_i];
                _this.audioList[clip.name] = clip;
            }
            // _.log(`audio.js >> all audio loaded !`);
            _.waitToRun(function () { return _this.playBgMusic(); }, 'isInitialized', _G.settings);
        });
    },
    playSound: function (name, volume) {
        if (volume === void 0) { volume = 1; }
        if (!_G.settings.sound || !this.audioList[name])
            return;
        try {
            this.playingIdList[name] = cc.audioEngine.play(this.audioList[name], false, volume);
        }
        catch (e) { }
    },
    stopSound: function (name) {
        if (this.playingIdList[name])
            cc.audioEngine.stopEffect(this.playingIdList[name]);
    },
    playBgMusic: function (volume) {
        if (volume === void 0) { volume = 1; }
        if (!_G.settings.music)
            return;
        if (cc.audioEngine.isMusicPlaying())
            return;
        try {
            this.playingIdList["bg_music"] = cc.audioEngine.playMusic(this.audioList["bg_music"], true);
            cc.audioEngine.setMusicVolume(volume);
        }
        catch (e) {
            _.log("playMusic err ", e);
        }
    },
    stopBgMusic: function () {
        if (cc.audioEngine.isMusicPlaying())
            cc.audioEngine.stopMusic();
    },
    playSoundClickButton: function () {
        if (!_G.settings.sound)
            return;
        this.playSound("button_click", 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvYXVkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxlQUFlO0FBQ25ELElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLENBQUMsa0NBQWtDO0FBRWxELFFBQUEsS0FBSyxHQUFHO0lBQ2xCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsYUFBYSxFQUFFLEVBQUU7SUFDakIsdUJBQXVCLEVBQUUsQ0FBQztJQUMxQixjQUFjLEVBQUUsQ0FBQztJQUVqQixJQUFJO1FBQUosaUJBRUM7UUFERSxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGNBQWM7UUFBZCxpQkFRQztRQVBFLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDbkQsSUFBSSxHQUFHO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFpQixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztnQkFBZixJQUFJLElBQUksWUFBQTtnQkFBUyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7YUFBQTtZQUN2RCwyQ0FBMkM7WUFFM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsSUFBWSxFQUFFLE1BQVU7UUFBVix1QkFBQSxFQUFBLFVBQVU7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3hELElBQUk7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNsQixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsSUFBWTtRQUNuQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxXQUFXLFlBQUMsTUFBVTtRQUFWLHVCQUFBLEVBQUEsVUFBVTtRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUMvQixJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1lBQUUsT0FBTztRQUM1QyxJQUFJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVGLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUU7SUFDOUMsQ0FBQztJQUVELFdBQVc7UUFDUixJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1lBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQsb0JBQW9CO1FBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmNvbnN0IFNUUkVBS19USU1FX1JBTkdFID0gNSAqIDEwMDA7IC8vIG1pbGxpc2Vjb25kc1xuY29uc3QgTUFYX1NUUkVBS19JTkRFWCA9IDE1OyAvLyBudW1iZXIgb2Ygc3RyZWFrIHNvdW5kcyB3ZSBoYXZlXG5cbmV4cG9ydCBjb25zdCBhdWRpbyA9IHtcbiAgIGF1ZGlvTGlzdDoge30sXG4gICBwbGF5aW5nSWRMaXN0OiB7fSxcbiAgIGN1cnJlbnRTdHJlYWtTb3VuZEluZGV4OiAwLFxuICAgbGFzdFN0cmVha1RpbWU6IDAsXG5cbiAgIGluaXQoKSB7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5sb2FkQXVkaW9GaWxlcygpLCAxMDAwKTtcbiAgIH0sXG5cbiAgIGxvYWRBdWRpb0ZpbGVzKCkge1xuICAgICAgY2MucmVzb3VyY2VzLmxvYWREaXIoJ2F1ZGlvcycsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoZXJyKSByZXR1cm4gXy5sb2coZXJyKTtcbiAgICAgICAgIGZvciAobGV0IGNsaXAgb2YgcmVzKSB0aGlzLmF1ZGlvTGlzdFtjbGlwLm5hbWVdID0gY2xpcDtcbiAgICAgICAgIC8vIF8ubG9nKGBhdWRpby5qcyA+PiBhbGwgYXVkaW8gbG9hZGVkICFgKTtcblxuICAgICAgICAgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5wbGF5QmdNdXNpYygpLCAnaXNJbml0aWFsaXplZCcsIF9HLnNldHRpbmdzKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgcGxheVNvdW5kKG5hbWU6IHN0cmluZywgdm9sdW1lID0gMSkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5zb3VuZCB8fCAhdGhpcy5hdWRpb0xpc3RbbmFtZV0pIHJldHVybjtcbiAgICAgIHRyeSB7XG4gICAgICAgICB0aGlzLnBsYXlpbmdJZExpc3RbbmFtZV0gPSBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9MaXN0W25hbWVdLCBmYWxzZSwgdm9sdW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgfSxcblxuICAgc3RvcFNvdW5kKG5hbWU6IHN0cmluZykge1xuICAgICAgaWYgKHRoaXMucGxheWluZ0lkTGlzdFtuYW1lXSkgY2MuYXVkaW9FbmdpbmUuc3RvcEVmZmVjdCh0aGlzLnBsYXlpbmdJZExpc3RbbmFtZV0pO1xuICAgfSxcblxuICAgcGxheUJnTXVzaWModm9sdW1lID0gMSkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5tdXNpYykgcmV0dXJuO1xuICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCkpIHJldHVybjtcbiAgICAgIHRyeSB7XG4gICAgICAgICB0aGlzLnBsYXlpbmdJZExpc3RbXCJiZ19tdXNpY1wiXSA9IGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvTGlzdFtcImJnX211c2ljXCJdLCB0cnVlKTtcbiAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKHZvbHVtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7IF8ubG9nKGBwbGF5TXVzaWMgZXJyIGAsIGUpOyB9XG4gICB9LFxuXG4gICBzdG9wQmdNdXNpYygpIHtcbiAgICAgIGlmIChjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpKSBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcbiAgIH0sXG5cbiAgIHBsYXlTb3VuZENsaWNrQnV0dG9uKCkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5zb3VuZCkgcmV0dXJuO1xuICAgICAgdGhpcy5wbGF5U291bmQoXCJidXR0b25fY2xpY2tcIiwgMSk7XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_coordinate.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5df86zHog5HcqIKMKzmLV+k', 'utils_coordinate');
// script/services/utils/utils_coordinate.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var $ = _G.$;
var utils_common_1 = require("./utils_common"); // special case for sub-modules
exports.default = {
    isVecHorz: function (vec) {
        return utils_common_1._.abs(vec.x) > utils_common_1._.abs(vec.y);
    },
    getPointRanges: function (pointArr) {
        var BIG_INT = 99999999; // Number.MAX_SAFE_INTEGER;
        var minX = BIG_INT, minY = BIG_INT, maxX = -BIG_INT, maxY = -BIG_INT;
        pointArr.map(function (p) {
            minX = utils_common_1._.min(minX, p.x);
            minY = utils_common_1._.min(minY, p.y);
            maxX = utils_common_1._.max(maxX, p.x);
            maxY = utils_common_1._.max(maxY, p.y);
        });
        // _.log(` minX = ${minX}, minY = ${minY}, maxX = ${maxX}, maxY = ${maxY} `);
        return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
    },
    distance2polygon: function (p, pointArr) {
        function distToSegment(_a, _b, _c) {
            var x = _a.x, y = _a.y;
            var x1 = _b.x, y1 = _b.y;
            var x2 = _c.x, y2 = _c.y;
            var A = x - x1;
            var B = y - y1;
            var C = x2 - x1;
            var D = y2 - y1;
            var dot = A * C + B * D;
            var len_sq = C * C + D * D;
            var param = -1;
            if (len_sq != 0) {
                param = dot / len_sq;
            }
            var xx, yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            }
            else if (param > 1) {
                xx = x2;
                yy = y2;
            }
            else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            var dx = x - xx;
            var dy = y - yy;
            return Math.sqrt(dx * dx + dy * dy);
        }
        var dArr = pointArr.map(function (subPoint, i) {
            var nextSubPoint = pointArr[i + 1] || pointArr[0];
            var distance = distToSegment(p, subPoint, nextSubPoint);
            return distance;
        }).sort(function (A, B) { return A > B ? 1 : -1; });
        var ret = dArr[0];
        return ret;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfY29vcmRpbmF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUN2QyxJQUFBLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVqQiwrQ0FBbUMsQ0FBQywrQkFBK0I7QUFDbkUsa0JBQWU7SUFDWCxTQUFTLEVBQVQsVUFBVSxHQUFZO1FBQ2xCLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsY0FBYyxZQUFDLFFBQVE7UUFDbkIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLENBQUMsMkJBQTJCO1FBQ3JELElBQUksSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDckUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7WUFDVixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUNILDZFQUE2RTtRQUM3RSxPQUFPLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBR0QsZ0JBQWdCLFlBQUMsQ0FBQyxFQUFFLFFBQVE7UUFDeEIsU0FBUyxhQUFhLENBQUMsRUFBUSxFQUFFLEVBQWdCLEVBQUUsRUFBZ0I7Z0JBQTFDLENBQUMsT0FBQSxFQUFFLENBQUMsT0FBQTtnQkFBUyxFQUFFLE9BQUEsRUFBSyxFQUFFLE9BQUE7Z0JBQVMsRUFBRSxPQUFBLEVBQUssRUFBRSxPQUFBO1lBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQUUsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7YUFBRTtZQUUxQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDWCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDUixFQUFFLEdBQUcsRUFBRSxDQUFDO2FBQ1g7aUJBQU0sSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQixFQUFFLEdBQUcsRUFBRSxDQUFDO2dCQUNSLEVBQUUsR0FBRyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDSCxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUN2QjtZQUVELElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDaEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUVELElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQ3JCLFVBQUMsUUFBUSxFQUFFLENBQUM7WUFDUixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUMxRCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQ0osQ0FBQyxJQUFJLENBQ0YsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBZCxDQUFjLENBQzNCLENBQUM7UUFDRixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0NBQ0osQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7ICQgfSA9IF9HO1xuXG5pbXBvcnQgeyBfIH0gZnJvbSAnLi91dGlsc19jb21tb24nOyAvLyBzcGVjaWFsIGNhc2UgZm9yIHN1Yi1tb2R1bGVzXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaXNWZWNIb3J6KHZlYzogY2MuVmVjMikge1xuICAgICAgICByZXR1cm4gXy5hYnModmVjLngpID4gXy5hYnModmVjLnkpO1xuICAgIH0sXG5cbiAgICBnZXRQb2ludFJhbmdlcyhwb2ludEFycikge1xuICAgICAgICBjb25zdCBCSUdfSU5UID0gOTk5OTk5OTk7IC8vIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICBsZXQgbWluWCA9IEJJR19JTlQsIG1pblkgPSBCSUdfSU5ULCBtYXhYID0gLUJJR19JTlQsIG1heFkgPSAtQklHX0lOVDtcbiAgICAgICAgcG9pbnRBcnIubWFwKHAgPT4ge1xuICAgICAgICAgICAgbWluWCA9IF8ubWluKG1pblgsIHAueCk7XG4gICAgICAgICAgICBtaW5ZID0gXy5taW4obWluWSwgcC55KTtcbiAgICAgICAgICAgIG1heFggPSBfLm1heChtYXhYLCBwLngpO1xuICAgICAgICAgICAgbWF4WSA9IF8ubWF4KG1heFksIHAueSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBfLmxvZyhgIG1pblggPSAke21pblh9LCBtaW5ZID0gJHttaW5ZfSwgbWF4WCA9ICR7bWF4WH0sIG1heFkgPSAke21heFl9IGApO1xuICAgICAgICByZXR1cm4geyBtaW5YLCBtaW5ZLCBtYXhYLCBtYXhZIH07XG4gICAgfSxcblxuXG4gICAgZGlzdGFuY2UycG9seWdvbihwLCBwb2ludEFycikge1xuICAgICAgICBmdW5jdGlvbiBkaXN0VG9TZWdtZW50KHsgeCwgeSB9LCB7IHg6IHgxLCB5OiB5MSB9LCB7IHg6IHgyLCB5OiB5MiB9KSB7XG4gICAgICAgICAgICB2YXIgQSA9IHggLSB4MTtcbiAgICAgICAgICAgIHZhciBCID0geSAtIHkxO1xuICAgICAgICAgICAgdmFyIEMgPSB4MiAtIHgxO1xuICAgICAgICAgICAgdmFyIEQgPSB5MiAtIHkxO1xuXG4gICAgICAgICAgICB2YXIgZG90ID0gQSAqIEMgKyBCICogRDtcbiAgICAgICAgICAgIHZhciBsZW5fc3EgPSBDICogQyArIEQgKiBEO1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gLTE7XG4gICAgICAgICAgICBpZiAobGVuX3NxICE9IDApIHsgcGFyYW0gPSBkb3QgLyBsZW5fc3E7IH1cblxuICAgICAgICAgICAgdmFyIHh4LCB5eTtcbiAgICAgICAgICAgIGlmIChwYXJhbSA8IDApIHtcbiAgICAgICAgICAgICAgICB4eCA9IHgxO1xuICAgICAgICAgICAgICAgIHl5ID0geTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtID4gMSkge1xuICAgICAgICAgICAgICAgIHh4ID0geDI7XG4gICAgICAgICAgICAgICAgeXkgPSB5MjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgeHggPSB4MSArIHBhcmFtICogQztcbiAgICAgICAgICAgICAgICB5eSA9IHkxICsgcGFyYW0gKiBEO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHggPSB4IC0geHg7XG4gICAgICAgICAgICB2YXIgZHkgPSB5IC0geXk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRBcnIgPSBwb2ludEFyci5tYXAoXG4gICAgICAgICAgICAoc3ViUG9pbnQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0U3ViUG9pbnQgPSBwb2ludEFycltpICsgMV0gfHwgcG9pbnRBcnJbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBkaXN0VG9TZWdtZW50KHAsIHN1YlBvaW50LCBuZXh0U3ViUG9pbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKS5zb3J0KFxuICAgICAgICAgICAgKEEsIEIpID0+IEEgPiBCID8gMSA6IC0xXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJldCA9IGRBcnJbMF07XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfSxcbn1cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '55e17+IhfZAOKUumwaKfgIH', 'utils_data');
// script/services/utils/utils_data.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsData = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
exports.utilsData = {
    save: function (dataObject, callback) {
        if (window['FBInstant']) {
            FBInstant.player.setDataAsync(dataObject).then(function () { if (callback)
                callback(); }, function (e) { return console.warn(" utils_data >> save >> failed ", e); }).catch(function (e) { return console.warn(" utils_data >> save >> failed (catch) ", e); });
        }
        // Simulate facebook data at local using localStorage
        else {
            for (var key in dataObject)
                localStorage.setItem(key, JSON.stringify(dataObject[key]));
            setTimeout(function () { if (callback)
                callback(); }, 300);
        }
    },
    load: function (keyArr, callback) {
        if (window['FBInstant']) {
            FBInstant.player.getDataAsync(keyArr).then(function (data) {
                if (callback)
                    callback(data);
            });
        }
        // Simulate facebook data at local using localStorage
        else {
            var dataObj_1 = {};
            keyArr.map(function (key) {
                if (localStorage.getItem(key) === null)
                    return;
                try {
                    dataObj_1[key] = JSON.parse(localStorage.getItem(key));
                }
                catch (e) {
                    console.warn(" utilsData.load() >> Error  data key = " + key + " ", e);
                }
            });
            if (callback)
                setTimeout(function () { return callback(dataObj_1); }, 100);
        }
    },
    getEntryPointData: function () {
        return window['FBInstant'] ? (FBInstant.getEntryPointData() || {}) : {};
    }
};
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0M7QUFDdkMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBR1AsUUFBQSxTQUFTLEdBQUc7SUFDdEIsSUFBSSxFQUFKLFVBQUssVUFBZSxFQUFFLFFBQW1CO1FBQ3RDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FDM0MsY0FBUSxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ25DLFVBQUMsQ0FBQyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDLENBQUMsRUFBakQsQ0FBaUQsQ0FDMUQsQ0FBQyxLQUFLLENBQ0osVUFBQyxDQUFDLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFFLENBQUMsQ0FBQyxFQUF6RCxDQUF5RCxDQUNsRSxDQUFDO1NBQ0o7UUFFRCxxREFBcUQ7YUFDaEQ7WUFDRixLQUFLLElBQUksR0FBRyxJQUFJLFVBQVU7Z0JBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZGLFVBQVUsQ0FBQyxjQUFRLElBQUksUUFBUTtnQkFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNKLENBQUM7SUFHRCxJQUFJLEVBQUosVUFBSyxNQUFnQixFQUFFLFFBQW1CO1FBQ3ZDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQzVDLElBQUksUUFBUTtvQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDTDtRQUVELHFEQUFxRDthQUNoRDtZQUNGLElBQU0sU0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRztnQkFDWCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSTtvQkFBRSxPQUFPO2dCQUMvQyxJQUFJO29CQUNELFNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDdkQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBMEMsR0FBRyxNQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7aUJBQ25FO1lBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLFFBQVE7Z0JBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsU0FBTyxDQUFDLEVBQWpCLENBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDekQ7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2QsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRSxDQUFDO0NBQ0gsQ0FBQTtBQUNBLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuXG5leHBvcnQgY29uc3QgdXRpbHNEYXRhID0ge1xuICAgc2F2ZShkYXRhT2JqZWN0OiBhbnksIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3dbJ0ZCSW5zdGFudCddKSB7XG4gICAgICAgICBGQkluc3RhbnQucGxheWVyLnNldERhdGFBc3luYyhkYXRhT2JqZWN0KS50aGVuKFxuICAgICAgICAgICAgKCkgPT4geyBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7IH0sXG4gICAgICAgICAgICAoZSkgPT4gY29uc29sZS53YXJuKGAgdXRpbHNfZGF0YSA+PiBzYXZlID4+IGZhaWxlZCBgLCBlKVxuICAgICAgICAgKS5jYXRjaChcbiAgICAgICAgICAgIChlKSA9PiBjb25zb2xlLndhcm4oYCB1dGlsc19kYXRhID4+IHNhdmUgPj4gZmFpbGVkIChjYXRjaCkgYCwgZSlcbiAgICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNpbXVsYXRlIGZhY2Vib29rIGRhdGEgYXQgbG9jYWwgdXNpbmcgbG9jYWxTdG9yYWdlXG4gICAgICBlbHNlIHtcbiAgICAgICAgIGZvciAobGV0IGtleSBpbiBkYXRhT2JqZWN0KSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGFPYmplY3Rba2V5XSkpO1xuICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTsgfSwgMzAwKTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgbG9hZChrZXlBcnI6IHN0cmluZ1tdLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgICAgRkJJbnN0YW50LnBsYXllci5nZXREYXRhQXN5bmMoa2V5QXJyKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBTaW11bGF0ZSBmYWNlYm9vayBkYXRhIGF0IGxvY2FsIHVzaW5nIGxvY2FsU3RvcmFnZVxuICAgICAgZWxzZSB7XG4gICAgICAgICBjb25zdCBkYXRhT2JqID0ge307XG4gICAgICAgICBrZXlBcnIubWFwKGtleSA9PiB7XG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgIGRhdGFPYmpba2V5XSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCB1dGlsc0RhdGEubG9hZCgpID4+IEVycm9yICBkYXRhIGtleSA9ICR7a2V5fSBgLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgfSk7XG4gICAgICAgICBpZiAoY2FsbGJhY2spIHNldFRpbWVvdXQoKCkgPT4gY2FsbGJhY2soZGF0YU9iaiksIDEwMCk7XG4gICAgICB9XG4gICB9LFxuXG4gICBnZXRFbnRyeVBvaW50RGF0YSgpIHtcbiAgICAgIHJldHVybiB3aW5kb3dbJ0ZCSW5zdGFudCddID8gKEZCSW5zdGFudC5nZXRFbnRyeVBvaW50RGF0YSgpIHx8IHt9KSA6IHt9O1xuICAgfVxufVxufTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fac22cBTNdDypWs3FUVCI/a', 'utils_ui');
// script/services/utils/utils_ui.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilsUI = void 0;
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
var canvasTouchEventHandlers = {
    touchstart: [],
    touchmove: [],
    touchend: [],
};
exports.utilsUI = {
    init: function () {
        this.bindCanvasTouchHandler();
    },
    // ========== Nodes & Labels
    fillLabel: function (labelNode, text) {
        var labelComp = labelNode.getComponent(cc.Label) || labelNode.getComponent(cc.RichText);
        labelComp.string = text;
    },
    fillChildLabelByPath: function (node, path, text) {
        var labelNode = cc.find(path, node);
        if (labelNode)
            this.fillLabel(labelNode, text);
    },
    showOnlyChildNodeWithNameAs: function (parentNode, childNodeName, isUseOpacity) {
        if (isUseOpacity === void 0) { isUseOpacity = false; }
        var retChildNode;
        parentNode.children.map(function (childNode) {
            var isSelected = (childNode.name == childNodeName);
            if (isSelected)
                retChildNode = childNode;
            childNode.active = isSelected;
            if (isUseOpacity)
                childNode.opacity = (isSelected ? 255 : 0);
        });
        return retChildNode;
    },
    setLabelCountDownTimer: function (labelNode, targetUTC, timeoutCallback) {
        if (typeof labelNode === 'string')
            labelNode = cc.find(labelNode);
        if (labelNode.countDownTimerVar)
            clearInterval(labelNode.countDownTimerVar);
        var timerFunc = function () {
            if (!labelNode.parent)
                return clearInterval(labelNode.countDownTimerVar);
            var timeDiff = targetUTC - _.getMsPassedUTC();
            var timeDiffStr = _.secondsToTimeCountdown(_.floor(timeDiff / 1000));
            _G.utilsUI.fillLabel(labelNode, timeDiffStr);
            if (timeDiff <= 0) {
                clearInterval(labelNode.countDownTimerVar);
                if (timeoutCallback)
                    timeoutCallback();
            }
            ;
        };
        labelNode.countDownTimerVar = setInterval(timerFunc, 500);
        timerFunc();
    },
    // fill node spriteFrame
    setNodeSprite: function (node, spriteFrame) {
        if (!node || !node.getComponent(cc.Sprite))
            return;
        node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    },
    // fill node spriteFrame
    setNodeSpriteFromUrl: function (node, url, callback) {
        var _this = this;
        if (!node || !node.getComponent(cc.Sprite))
            return;
        cc.assetManager.loadRemote(url, function (error, texture) {
            if (!error)
                _this.setNodeSprite(node, new cc.SpriteFrame(texture));
            return callback && callback(texture);
        });
    },
    // fill node spriteFrame
    setNodeSpriteFillRange: function (node, fillRange) {
        if (!node || !node.getComponent(cc.Sprite))
            return;
        node.getComponent(cc.Sprite).fillRange = fillRange;
    },
    // ===================================================
    // Touch handlers
    // ===================================================
    // add native button component to node with handler like dragging & dropping component manually
    // to exploit button trasition effect and behavior in scrollView
    makeButton: function (node, handlerFunc, isBubble, isMuteSound) {
        // setTimeout to make this process run later to prevent node not initalized yet
        var myNode = _.isString(node) ? cc.find(node) : node;
        _.setTimeout(function () {
            if (!myNode)
                _.log("undefined node path = " + node);
            if (!myNode.getComponent('free_button_comp'))
                myNode.addComponent('free_button_comp');
            var butComp = myNode.addComponent(cc.Button);
            butComp.transition = isBubble ? cc.Button.Transition.SCALE : null;
            butComp.zoomScale = node.buttonCompZoomScale || 1.2;
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = myNode;
            eventHandler.component = 'free_button_comp';
            eventHandler.handler = 'freeHandler';
            butComp.clickEvents.push(eventHandler);
            myNode.freeButtonHandlerFunc = function () {
                handlerFunc();
                if (!isMuteSound)
                    _G.audio.playSound('button_click');
                canvasTouchEventHandlers['touchstart'].map(function (f) { return f(); });
            };
        });
    },
    makeBubbleButton: function (node, handlerFunc) {
        return this.makeButton(node, handlerFunc, true);
    },
    singleTouchSet: function (node, touchStartFunc, touchMoveFunc, touchEndFunc) {
        var callFuncWithEvent = function (func, event, touchId) {
            var pos = event.touch.getLocation();
            func(pos, event, touchId);
        };
        node.on('touchstart', function (event) {
            if (node._customTouchId) {
                return;
            }
            node._customTouchId = event.touch._id + 1;
            touchStartFunc && callFuncWithEvent(touchStartFunc, event, node._customTouchId);
        });
        touchMoveFunc && node.on('touchmove', function (event) {
            var tID = event.touch._id + 1;
            if (tID != node._customTouchId)
                return;
            if (touchMoveFunc)
                callFuncWithEvent(touchMoveFunc, event, tID);
        });
        var touchDestroy = function (event) {
            var tID = event.touch._id + 1;
            if (tID != node._customTouchId)
                return;
            node._customTouchId = null;
            if (touchEndFunc)
                callFuncWithEvent(touchEndFunc, event, tID);
        };
        node.on('touchend', touchDestroy);
        node.on('touchcancel', touchDestroy);
    },
    bindCanvasTouchHandler: function () {
        var canvasNode = cc.find('Canvas');
        this.singleTouchSet(canvasNode, function (pos) {
            canvasTouchEventHandlers['touchstart'].map(function (f) { return f(pos); });
        }, function (pos) {
            canvasTouchEventHandlers['touchmove'].map(function (f) { return f(pos); });
        }, function (pos) {
            canvasTouchEventHandlers['touchend'].map(function (f) { return f(pos); });
        });
    },
    addCanvasTouchHandler: function (eventName, func) {
        var handlerArr = canvasTouchEventHandlers[eventName];
        if (!handlerArr)
            return;
        handlerArr.push(func);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQ3ZDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLHdCQUF3QixHQUFHO0lBQzlCLFVBQVUsRUFBRSxFQUFFO0lBQ2QsU0FBUyxFQUFFLEVBQUU7SUFDYixRQUFRLEVBQUUsRUFBRTtDQUNkLENBQUM7QUFFVyxRQUFBLE9BQU8sR0FBRztJQUNwQixJQUFJO1FBQ0QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixTQUFTLEVBQVQsVUFBVSxTQUFrQixFQUFFLElBQVk7UUFDdkMsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUYsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUVELG9CQUFvQixFQUFwQixVQUFxQixJQUFhLEVBQUUsSUFBWSxFQUFFLElBQVk7UUFDM0QsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsSUFBSSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELDJCQUEyQixFQUEzQixVQUE0QixVQUFtQixFQUFFLGFBQXFCLEVBQUUsWUFBb0I7UUFBcEIsNkJBQUEsRUFBQSxvQkFBb0I7UUFDekYsSUFBSSxZQUFxQixDQUFDO1FBQzFCLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUEsU0FBUztZQUM5QixJ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VyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDO1FBQzFELENBQUMsRUFDRCxVQUFDLEdBQUc7WUFDRCx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQU4sQ0FBTSxDQUFDLENBQUM7UUFDekQsQ0FBQyxDQUNILENBQUE7SUFDSixDQUFDO0lBRUQscUJBQXFCLFlBQUMsU0FBUyxFQUFFLElBQUk7UUFDbEMsSUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFVBQVU7WUFBRSxPQUFPO1FBQ3hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztDQUdILENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzID0ge1xuICAgdG91Y2hzdGFydDogW10sXG4gICB0b3VjaG1vdmU6IFtdLFxuICAgdG91Y2hlbmQ6IFtdLFxufTtcblxuZXhwb3J0IGNvbnN0IHV0aWxzVUkgPSB7XG4gICBpbml0KCkge1xuICAgICAgdGhpcy5iaW5kQ2FudmFzVG91Y2hIYW5kbGVyKCk7XG4gICB9LFxuXG4gICAvLyA9PT09PT09PT09IE5vZGVzICYgTGFiZWxzXG4gICBmaWxsTGFiZWwobGFiZWxOb2RlOiBjYy5Ob2RlLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGxhYmVsQ29tcCA9IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpIHx8IGxhYmVsTm9kZS5nZXRDb21wb25lbnQoY2MuUmljaFRleHQpO1xuICAgICAgbGFiZWxDb21wLnN0cmluZyA9IHRleHQ7XG4gICB9LFxuXG4gICBmaWxsQ2hpbGRMYWJlbEJ5UGF0aChub2RlOiBjYy5Ob2RlLCBwYXRoOiBzdHJpbmcsIHRleHQ6IHN0cmluZykge1xuICAgICAgY29uc3QgbGFiZWxOb2RlID0gY2MuZmluZChwYXRoLCBub2RlKTtcbiAgICAgIGlmIChsYWJlbE5vZGUpIHRoaXMuZmlsbExhYmVsKGxhYmVsTm9kZSwgdGV4dCk7XG4gICB9LFxuXG4gICBzaG93T25seUNoaWxkTm9kZVdpdGhOYW1lQXMocGFyZW50Tm9kZTogY2MuTm9kZSwgY2hpbGROb2RlTmFtZTogc3RyaW5nLCBpc1VzZU9wYWNpdHkgPSBmYWxzZSkge1xuICAgICAgbGV0IHJldENoaWxkTm9kZTogY2MuTm9kZTtcbiAgICAgIHBhcmVudE5vZGUuY2hpbGRyZW4ubWFwKGNoaWxkTm9kZSA9PiB7XG4gICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gKGNoaWxkTm9kZS5uYW1lID09IGNoaWxkTm9kZU5hbWUpO1xuICAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHJldENoaWxkTm9kZSA9IGNoaWxkTm9kZTtcbiAgICAgICAgIGNoaWxkTm9kZS5hY3RpdmUgPSBpc1NlbGVjdGVkO1xuICAgICAgICAgaWYgKGlzVXNlT3BhY2l0eSkgY2hpbGROb2RlLm9wYWNpdHkgPSAoaXNTZWxlY3RlZCA/IDI1NSA6IDApO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmV0Q2hpbGROb2RlO1xuICAgfSxcblxuXG4gICBzZXRMYWJlbENvdW50RG93blRpbWVyKGxhYmVsTm9kZTogY2MuTm9kZSwgdGFyZ2V0VVRDOiBudW1iZXIsIHRpbWVvdXRDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAodHlwZW9mIGxhYmVsTm9kZSA9PT0gJ3N0cmluZycpIGxhYmVsTm9kZSA9IGNjLmZpbmQobGFiZWxOb2RlKTtcbiAgICAgIGlmIChsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIpIGNsZWFySW50ZXJ2YWwobGFiZWxOb2RlLmNvdW50RG93blRpbWVyVmFyKTtcblxuICAgICAgY29uc3QgdGltZXJGdW5jID0gKCkgPT4ge1xuICAgICAgICAgaWYgKCFsYWJlbE5vZGUucGFyZW50KSByZXR1cm4gY2xlYXJJbnRlcnZhbChsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIpO1xuICAgICAgICAgY29uc3QgdGltZURpZmYgPSB0YXJnZXRVVEMgLSBfLmdldE1zUGFzc2VkVVRDKCk7XG4gICAgICAgICBjb25zdCB0aW1lRGlmZlN0ciA9IF8uc2Vjb25kc1RvVGltZUNvdW50ZG93bihfLmZsb29yKHRpbWVEaWZmIC8gMTAwMCkpO1xuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwobGFiZWxOb2RlLCB0aW1lRGlmZlN0cik7XG5cbiAgICAgICAgIGlmICh0aW1lRGlmZiA8PSAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGxhYmVsTm9kZS5jb3VudERvd25UaW1lclZhcik7XG4gICAgICAgICAgICBpZiAodGltZW91dENhbGxiYWNrKSB0aW1lb3V0Q2FsbGJhY2soKTtcbiAgICAgICAgIH07XG4gICAgICB9XG4gICAgICBsYWJlbE5vZGUuY291bnREb3duVGltZXJWYXIgPSBzZXRJbnRlcnZhbCh0aW1lckZ1bmMsIDUwMCk7XG4gICAgICB0aW1lckZ1bmMoKTtcbiAgIH0sXG5cbiAgIC8vIGZpbGwgbm9kZSBzcHJpdGVGcmFtZVxuICAgc2V0Tm9kZVNwcml0ZShub2RlOiBjYy5Ob2RlLCBzcHJpdGVGcmFtZTogY2MuU3ByaXRlRnJhbWUpIHtcbiAgICAgIGlmICghbm9kZSB8fCAhbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKSkgcmV0dXJuXG4gICAgICBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XG4gICB9LFxuXG4gICAvLyBmaWxsIG5vZGUgc3ByaXRlRnJhbWVcbiAgIHNldE5vZGVTcHJpdGVGcm9tVXJsKG5vZGU6IGNjLk5vZGUsIHVybDogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpIHJldHVybjtcbiAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlKHVybCwgKGVycm9yLCB0ZXh0dXJlKSA9PiB7XG4gICAgICAgICBpZiAoIWVycm9yKSB0aGlzLnNldE5vZGVTcHJpdGUobm9kZSwgbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUpKTtcbiAgICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjayh0ZXh0dXJlKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgLy8gZmlsbCBub2RlIHNwcml0ZUZyYW1lXG4gICBzZXROb2RlU3ByaXRlRmlsbFJhbmdlKG5vZGU6IGNjLk5vZGUsIGZpbGxSYW5nZTogbnVtYmVyKSB7XG4gICAgICBpZiAoIW5vZGUgfHwgIW5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkpIHJldHVyblxuICAgICAgbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5maWxsUmFuZ2UgPSBmaWxsUmFuZ2U7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyBUb3VjaCBoYW5kbGVyc1xuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIC8vIGFkZCBuYXRpdmUgYnV0dG9uIGNvbXBvbmVudCB0byBub2RlIHdpdGggaGFuZGxlciBsaWtlIGRyYWdnaW5nICYgZHJvcHBpbmcgY29tcG9uZW50IG1hbnVhbGx5XG4gICAvLyB0byBleHBsb2l0IGJ1dHRvbiB0cmFzaXRpb24gZWZmZWN0IGFuZCBiZWhhdmlvciBpbiBzY3JvbGxWaWV3XG4gICBtYWtlQnV0dG9uKG5vZGU6IGNjLk5vZGUgfCBzdHJpbmcsIGhhbmRsZXJGdW5jOiBGdW5jdGlvbiwgaXNCdWJibGU/LCBpc011dGVTb3VuZD8pIHtcbiAgICAgIC8vIHNldFRpbWVvdXQgdG8gbWFrZSB0aGlzIHByb2Nlc3MgcnVuIGxhdGVyIHRvIHByZXZlbnQgbm9kZSBub3QgaW5pdGFsaXplZCB5ZXRcbiAgICAgIGNvbnN0IG15Tm9kZTogY2MuTm9kZSA9IF8uaXNTdHJpbmcobm9kZSkgPyBjYy5maW5kKG5vZGUpIDogbm9kZTtcbiAgICAgIF8uc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICBpZiAoIW15Tm9kZSkgXy5sb2coYHVuZGVmaW5lZCBub2RlIHBhdGggPSAke25vZGV9YCk7XG4gICAgICAgICBpZiAoIW15Tm9kZS5nZXRDb21wb25lbnQoJ2ZyZWVfYnV0dG9uX2NvbXAnKSkgbXlOb2RlLmFkZENvbXBvbmVudCgnZnJlZV9idXR0b25fY29tcCcpO1xuXG4gICAgICAgICBjb25zdCBidXRDb21wID0gbXlOb2RlLmFkZENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgICAgICAgYnV0Q29tcC50cmFuc2l0aW9uID0gaXNCdWJibGUgPyBjYy5CdXR0b24uVHJhbnNpdGlvbi5TQ0FMRSA6IG51bGw7XG4gICAgICAgICBidXRDb21wLnpvb21TY2FsZSA9IG5vZGUuYnV0dG9uQ29tcFpvb21TY2FsZSB8fCAxLjI7XG4gICAgICAgICBjb25zdCBldmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICAgZXZlbnRIYW5kbGVyLnRhcmdldCA9IG15Tm9kZTtcbiAgICAgICAgIGV2ZW50SGFuZGxlci5jb21wb25lbnQgPSAnZnJlZV9idXR0b25fY29tcCc7XG4gICAgICAgICBldmVudEhhbmRsZXIuaGFuZGxlciA9ICdmcmVlSGFuZGxlcic7XG4gICAgICAgICBidXRDb21wLmNsaWNrRXZlbnRzLnB1c2goZXZlbnRIYW5kbGVyKTtcblxuICAgICAgICAgbXlOb2RlLmZyZWVCdXR0b25IYW5kbGVyRnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgIGhhbmRsZXJGdW5jKCk7XG4gICAgICAgICAgICBpZiAoIWlzTXV0ZVNvdW5kKSBfRy5hdWRpby5wbGF5U291bmQoJ2J1dHRvbl9jbGljaycpO1xuICAgICAgICAgICAgY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzWyd0b3VjaHN0YXJ0J10ubWFwKGYgPT4gZigpKTtcbiAgICAgICAgIH07XG4gICAgICB9KTtcbiAgIH0sXG5cbiAgIG1ha2VCdWJibGVCdXR0b24obm9kZSwgaGFuZGxlckZ1bmMpIHtcbiAgICAgIHJldHVybiB0aGlzLm1ha2VCdXR0b24obm9kZSwgaGFuZGxlckZ1bmMsIHRydWUpO1xuICAgfSxcblxuXG4gICBzaW5nbGVUb3VjaFNldChub2RlOiBjYy5Ob2RlLCB0b3VjaFN0YXJ0RnVuYzogRnVuY3Rpb24sIHRvdWNoTW92ZUZ1bmM6IEZ1bmN0aW9uLCB0b3VjaEVuZEZ1bmM6IEZ1bmN0aW9uKSB7XG4gICAgICBjb25zdCBjYWxsRnVuY1dpdGhFdmVudCA9IChmdW5jOiBGdW5jdGlvbiwgZXZlbnQsIHRvdWNoSWQ/KSA9PiB7XG4gICAgICAgICBjb25zdCBwb3MgPSBldmVudC50b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgZnVuYyhwb3MsIGV2ZW50LCB0b3VjaElkKTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5vbigndG91Y2hzdGFydCcsIChldmVudCkgPT4ge1xuICAgICAgICAgaWYgKG5vZGUuX2N1c3RvbVRvdWNoSWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICBub2RlLl9jdXN0b21Ub3VjaElkID0gZXZlbnQudG91Y2guX2lkICsgMTtcbiAgICAgICAgIHRvdWNoU3RhcnRGdW5jICYmIGNhbGxGdW5jV2l0aEV2ZW50KHRvdWNoU3RhcnRGdW5jLCBldmVudCwgbm9kZS5fY3VzdG9tVG91Y2hJZCk7XG4gICAgICB9KTtcblxuICAgICAgdG91Y2hNb3ZlRnVuYyAmJiBub2RlLm9uKCd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgIHZhciB0SUQgPSBldmVudC50b3VjaC5faWQgKyAxO1xuICAgICAgICAgaWYgKHRJRCAhPSBub2RlLl9jdXN0b21Ub3VjaElkKSByZXR1cm47XG4gICAgICAgICBpZiAodG91Y2hNb3ZlRnVuYykgY2FsbEZ1bmNXaXRoRXZlbnQodG91Y2hNb3ZlRnVuYywgZXZlbnQsIHRJRCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIHRvdWNoRGVzdHJveSA9IChldmVudCkgPT4ge1xuICAgICAgICAgdmFyIHRJRCA9IGV2ZW50LnRvdWNoLl9pZCArIDE7XG4gICAgICAgICBpZiAodElEICE9IG5vZGUuX2N1c3RvbVRvdWNoSWQpIHJldHVybjtcbiAgICAgICAgIG5vZGUuX2N1c3RvbVRvdWNoSWQgPSBudWxsO1xuICAgICAgICAgaWYgKHRvdWNoRW5kRnVuYykgY2FsbEZ1bmNXaXRoRXZlbnQodG91Y2hFbmRGdW5jLCBldmVudCwgdElEKTtcbiAgICAgIH1cblxuICAgICAgbm9kZS5vbigndG91Y2hlbmQnLCB0b3VjaERlc3Ryb3kpO1xuICAgICAgbm9kZS5vbigndG91Y2hjYW5jZWwnLCB0b3VjaERlc3Ryb3kpO1xuICAgfSxcblxuXG4gICBiaW5kQ2FudmFzVG91Y2hIYW5kbGVyKCkge1xuICAgICAgY29uc3QgY2FudmFzTm9kZSA9IGNjLmZpbmQoJ0NhbnZhcycpO1xuICAgICAgdGhpcy5zaW5nbGVUb3VjaFNldChcbiAgICAgICAgIGNhbnZhc05vZGUsXG4gICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgICBjYW52YXNUb3VjaEV2ZW50SGFuZGxlcnNbJ3RvdWNoc3RhcnQnXS5tYXAoZiA9PiBmKHBvcykpO1xuICAgICAgICAgfSxcbiAgICAgICAgIChwb3MpID0+IHtcbiAgICAgICAgICAgIGNhbnZhc1RvdWNoRXZlbnRIYW5kbGVyc1sndG91Y2htb3ZlJ10ubWFwKGYgPT4gZihwb3MpKTtcbiAgICAgICAgIH0sXG4gICAgICAgICAocG9zKSA9PiB7XG4gICAgICAgICAgICBjYW52YXNUb3VjaEV2ZW50SGFuZGxlcnNbJ3RvdWNoZW5kJ10ubWFwKGYgPT4gZihwb3MpKTtcbiAgICAgICAgIH0sXG4gICAgICApXG4gICB9LFxuXG4gICBhZGRDYW52YXNUb3VjaEhhbmRsZXIoZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICBjb25zdCBoYW5kbGVyQXJyID0gY2FudmFzVG91Y2hFdmVudEhhbmRsZXJzW2V2ZW50TmFtZV07XG4gICAgICBpZiAoIWhhbmRsZXJBcnIpIHJldHVybjtcbiAgICAgIGhhbmRsZXJBcnIucHVzaChmdW5jKTtcbiAgIH0sXG5cblxufTsiXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/free_button_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ee307OeX0lMvqRwlJoeXArM', 'free_button_comp');
// script/services/utils/free_button_comp.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var _ = _G._, $ = _G.$;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var freeButtonComp = /** @class */ (function (_super) {
    __extends(freeButtonComp, _super);
    function freeButtonComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    freeButtonComp.prototype.freeHandler = function (e) {
        if (e.target.freeButtonHandlerFunc)
            e.target.freeButtonHandlerFunc(e.target);
    };
    freeButtonComp = __decorate([
        ccclass
    ], freeButtonComp);
    return freeButtonComp;
}(cc.Component));
exports.default = freeButtonComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvZnJlZV9idXR0b25fY29tcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0M7QUFDdkMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRWQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFFNUM7SUFBNEMsa0NBQVk7SUFBeEQ7O0lBSUEsQ0FBQztJQUhHLG9DQUFXLEdBQVgsVUFBWSxDQUFDO1FBQ1QsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQjtZQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFIZ0IsY0FBYztRQURsQyxPQUFPO09BQ2EsY0FBYyxDQUlsQztJQUFELHFCQUFDO0NBSkQsQUFJQyxDQUoyQyxFQUFFLENBQUMsU0FBUyxHQUl2RDtrQkFKb0IsY0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCB7IF8sICQgfSA9IF9HO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZyZWVCdXR0b25Db21wIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgICBmcmVlSGFuZGxlcihlKSB7XG4gICAgICAgIGlmIChlLnRhcmdldC5mcmVlQnV0dG9uSGFuZGxlckZ1bmMpIGUudGFyZ2V0LmZyZWVCdXR0b25IYW5kbGVyRnVuYyhlLnRhcmdldCk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/social.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9d41IJoc1IrIOJ8TrSXHSM', 'social');
// script/social/social.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.social = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
var share_1 = require("../social/share");
var message_1 = require("../social/message");
exports.social = {
    init: function () {
        // _G.login.addLoginDataField('subscribeInfo');
        // _G.login.addLoginDataField('shortcutInfo');
        // _G.login.addCallback(data => {
        //    this.subscribeInfo = data.hasOwnProperty('subscribeInfo') ? data.subscribeInfo : 5;
        //    this.shortcutInfo = data.hasOwnProperty('shortcutInfo') ? data.shortcutInfo : 5;
        // })
    },
    share: function (isFromV2Screen, shareCode) {
        if (isFromV2Screen === void 0) { isFromV2Screen = false; }
        if (shareCode === void 0) { shareCode = ''; }
        cc.find('Canvas/shares').getComponent(share_1.default).sharePostNormal(isFromV2Screen, shareCode);
        _G.analytic.logShare(_G.gameMechanic.currentCategoryName, _G.gameMechanic.currentFrameName);
    },
    sendMessage: function () {
        cc.find("Canvas/messages").getComponent(message_1.default).sendMessageScore();
    },
    sendMessageHome: function () {
        cc.find('Canvas/message_home').getComponent(message_1.default).sendMessageStillImage();
    },
    inviteHome: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessageHome();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessageHome();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
    },
    invite: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessage();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessage();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL3NvY2lhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDNUMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVmLHlDQUFvQztBQUNwQyw2Q0FBd0M7QUFFM0IsUUFBQSxNQUFNLEdBQUc7SUFDbkIsSUFBSTtRQUNELCtDQUErQztRQUMvQyw4Q0FBOEM7UUFDOUMsaUNBQWlDO1FBQ2pDLHlGQUF5RjtRQUN6RixzRkFBc0Y7UUFDdEYsS0FBSztJQUNSLENBQUM7SUFFRCxLQUFLLFlBQUMsY0FBc0IsRUFBRSxTQUFjO1FBQXRDLCtCQUFBLEVBQUEsc0JBQXNCO1FBQUUsMEJBQUEsRUFBQSxjQUFjO1FBQ3pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELFdBQVc7UUFDUixFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxlQUFlO1FBQ1osRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBR0QsVUFBVSxFQUFWLFVBQVcsUUFBUztRQUFwQixpQkFrQkM7UUFqQkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7U0FDaEM7UUFFRCxJQUFJO1lBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxRQUFRO29CQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDVCxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNYLElBQUksUUFBUTtvQkFBRSxRQUFRLEVBQUUsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNMO1FBQUMsT0FBTyxJQUFJLEVBQUU7WUFDWixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1osSUFBSSxRQUFRO2dCQUFFLFFBQVEsRUFBRSxDQUFBO1NBQzFCO0lBQ0osQ0FBQztJQUdELE1BQU0sRUFBTixVQUFPLFFBQW1CO1FBQTFCLGlCQWtCQztRQWpCRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixPQUFPLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztTQUNoQztRQUVELElBQUk7WUFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNULENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxRQUFRO29CQUFFLFFBQVEsRUFBRSxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFBQyxPQUFPLElBQUksRUFBRTtZQUNaLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDWixJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUE7U0FDMUI7SUFDSixDQUFDO0NBNkVILENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmltcG9ydCBTaGFyZSBmcm9tIFwiLi4vc29jaWFsL3NoYXJlXCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuLi9zb2NpYWwvbWVzc2FnZSc7XG5cbmV4cG9ydCBjb25zdCBzb2NpYWwgPSB7XG4gICBpbml0KCkge1xuICAgICAgLy8gX0cubG9naW4uYWRkTG9naW5EYXRhRmllbGQoJ3N1YnNjcmliZUluZm8nKTtcbiAgICAgIC8vIF9HLmxvZ2luLmFkZExvZ2luRGF0YUZpZWxkKCdzaG9ydGN1dEluZm8nKTtcbiAgICAgIC8vIF9HLmxvZ2luLmFkZENhbGxiYWNrKGRhdGEgPT4ge1xuICAgICAgLy8gICAgdGhpcy5zdWJzY3JpYmVJbmZvID0gZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc3Vic2NyaWJlSW5mbycpID8gZGF0YS5zdWJzY3JpYmVJbmZvIDogNTtcbiAgICAgIC8vICAgIHRoaXMuc2hvcnRjdXRJbmZvID0gZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc2hvcnRjdXRJbmZvJykgPyBkYXRhLnNob3J0Y3V0SW5mbyA6IDU7XG4gICAgICAvLyB9KVxuICAgfSxcblxuICAgc2hhcmUoaXNGcm9tVjJTY3JlZW4gPSBmYWxzZSwgc2hhcmVDb2RlID0gJycpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zaGFyZXMnKS5nZXRDb21wb25lbnQoU2hhcmUpLnNoYXJlUG9zdE5vcm1hbChpc0Zyb21WMlNjcmVlbiwgc2hhcmVDb2RlKTtcbiAgICAgIF9HLmFuYWx5dGljLmxvZ1NoYXJlKF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBfRy5nYW1lTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSk7XG4gICB9LFxuXG4gICBzZW5kTWVzc2FnZSgpIHtcbiAgICAgIGNjLmZpbmQoXCJDYW52YXMvbWVzc2FnZXNcIikuZ2V0Q29tcG9uZW50KE1lc3NhZ2UpLnNlbmRNZXNzYWdlU2NvcmUoKTtcbiAgIH0sXG5cbiAgIHNlbmRNZXNzYWdlSG9tZSgpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tZXNzYWdlX2hvbWUnKS5nZXRDb21wb25lbnQoTWVzc2FnZSkuc2VuZE1lc3NhZ2VTdGlsbEltYWdlKCk7XG4gICB9LFxuXG5cbiAgIGludml0ZUhvbWUoY2FsbGJhY2s/KSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHtcbiAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VIb21lKCk7XG4gICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgIEZCSW5zdGFudC5jb250ZXh0LmNob29zZUFzeW5jKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlSG9tZSgpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhGQkluc3RhbnQuY29udGV4dC5nZXRJRCgpKTtcbiAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBfLmxvZyhlcnIpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpXG4gICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVyclgpIHtcbiAgICAgICAgIF8ubG9nKGVyclgpO1xuICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpXG4gICAgICB9XG4gICB9LFxuXG5cbiAgIGludml0ZShjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHtcbiAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICAgRkJJbnN0YW50LmNvbnRleHQuY2hvb3NlQXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soRkJJbnN0YW50LmNvbnRleHQuZ2V0SUQoKSk7XG4gICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgXy5sb2coZXJyKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKVxuICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJYKSB7XG4gICAgICAgICBfLmxvZyhlcnJYKTtcbiAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKVxuICAgICAgfVxuICAgfSxcblxuXG4gICAvLyBhc2tCb3RTdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgIC8vICAgIC8vIF8ubG9nKGB0aGlzLnN1YnNjcmliZUluZm89JHt0aGlzLnN1YnNjcmliZUluZm99YCk7XG4gICAvLyAgICBjb25zdCBmaW5hbENhbGxiYWNrID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICghX0cudXRpbHNGQi5pc1N1cHBvcnRlZEFQSShcInBsYXllci5jYW5TdWJzY3JpYmVCb3RBc3luY1wiKSB8fCAhX0cudXRpbHNGQi5pc1N1cHBvcnRlZEFQSShcInBsYXllci5zdWJzY3JpYmVCb3RBc3luY1wiKSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKSB8fCBfLmxvZygnIGFza0JvdFN1YnNjcmliZSA6OiBpc1N1cHBvcnRlZEFQSSA+IG5vdCBzdXBwb3J0ZWQnKTtcbiAgIC8vICAgIGlmICh0aGlzLnN1YnNjcmliZUluZm8gPT0gJ2FjY2VwdGVkJyB8fCB0aGlzLnN1YnNjcmliZUluZm8gPD0gMCkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIHRoaXMuc3Vic2NyaWJlSW5mby0tO1xuICAgLy8gICAgX0cuZGF0YS5zYXZlRGF0YSh7IHN1YnNjcmliZUluZm86IHRoaXMuc3Vic2NyaWJlSW5mbyB9KTtcblxuICAgLy8gICAgRkJJbnN0YW50LnBsYXllci5jYW5TdWJzY3JpYmVCb3RBc3luYygpLnRoZW4oY2FuX3N1YnNjcmliZSA9PiB7XG4gICAvLyAgICAgICBpZiAoIWNhbl9zdWJzY3JpYmUpIHJldHVybiBmaW5hbENhbGxiYWNrKCkgfHwgXy5sb2coYCBhc2tCb3RTdWJzY3JpYmUgOjogY2FuX3N1YnNjcmliZSA9ICR7Y2FuX3N1YnNjcmliZX0gYCk7XG4gICAvLyAgICAgICBGQkluc3RhbnQucGxheWVyLnN1YnNjcmliZUJvdEFzeW5jKCkudGhlbigoKSA9PiB7XG4gICAvLyAgICAgICAgICB0aGlzLnN1YnNjcmliZUluZm8gPSAnYWNjZXB0ZWQnO1xuICAgLy8gICAgICAgICAgX0cuZGF0YS5zYXZlRGF0YSh7IHN1YnNjcmliZUluZm86IHRoaXMuc3Vic2NyaWJlSW5mbyB9KTtcbiAgIC8vICAgICAgICAgIC8vX0cuYW5hbHl0aWMub25TdWJzY3JpYmVEb25lKHRydWUpO1xuICAgLy8gICAgICAgICAgZmluYWxDYWxsYmFjaygpO1xuXG4gICAvLyAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgIC8vICAgICAgICAgIC8vX0cuYW5hbHl0aWMub25TdWJzY3JpYmVEb25lKGZhbHNlKTtcbiAgIC8vICAgICAgICAgIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgICAgIH0pO1xuICAgLy8gICAgfSkuY2F0Y2goZSA9PiBmaW5hbENhbGxiYWNrKCkgfHwgXy5sb2coYCBhc2tCb3RTdWJzY3JpYmUgOjogY2FuU3Vic2NyaWJlQm90QXN5bmMoKS50aGVuKGZhaWwpID0+IGAsIGUpKTtcbiAgIC8vIH0sXG5cblxuICAgLy8gYXNrU2hvcnRjdXQoY2FsbGJhY2spIHtcbiAgIC8vICAgIC8vIF8ubG9nKGB0aGlzLnNob3J0Y3V0SW5mbz0ke3RoaXMuc2hvcnRjdXRJbmZvfWApO1xuICAgLy8gICAgY29uc3QgZmluYWxDYWxsYmFjayA9ICgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBmaW5hbENhbGxiYWNrKCk7XG4gICAvLyAgICBpZiAoIV9HLnV0aWxzRkIuaXNTdXBwb3J0ZWRBUEkoXCJjYW5DcmVhdGVTaG9ydGN1dEFzeW5jXCIpIHx8ICFfRy51dGlsc0ZCLmlzU3VwcG9ydGVkQVBJKFwiY3JlYXRlU2hvcnRjdXRBc3luY1wiKSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICh0aGlzLnNob3J0Y3V0SW5mbyA9PSAnYWNjZXB0ZWQnIHx8IHRoaXMuc2hvcnRjdXRJbmZvIDw9IDApIHJldHVybiBmaW5hbENhbGxiYWNrKCk7XG4gICAvLyAgICB0aGlzLnNob3J0Y3V0SW5mby0tO1xuICAgLy8gICAgX0cuZGF0YS5zYXZlRGF0YSh7IHNob3J0Y3V0SW5mbzogdGhpcy5zaG9ydGN1dEluZm8gfSk7XG5cbiAgIC8vICAgIEZCSW5zdGFudC5jYW5DcmVhdGVTaG9ydGN1dEFzeW5jKCkudGhlbihjYW5DcmVhdGVTaG9ydGN1dCA9PiB7XG4gICAvLyAgICAgICBpZiAoIWNhbkNyZWF0ZVNob3J0Y3V0KSByZXR1cm4gZmluYWxDYWxsYmFjaygpO1xuICAgLy8gICAgICAgRkJJbnN0YW50LmNyZWF0ZVNob3J0Y3V0QXN5bmMoKS50aGVuKCgpID0+IHtcbiAgIC8vICAgICAgICAgIHRoaXMuc2hvcnRjdXRJbmZvID0gJ2FjY2VwdGVkJztcbiAgIC8vICAgICAgICAgIF9HLmRhdGEuc2F2ZURhdGEoeyBzaG9ydGN1dEluZm86IHRoaXMuc2hvcnRjdXRJbmZvIH0pO1xuICAgLy8gICAgICAgICAgZmluYWxDYWxsYmFjaygpO1xuXG4gICAvLyAgICAgICB9KS5jYXRjaCgoZSkgPT4gZmluYWxDYWxsYmFjaygpIHx8IF8ubG9nKCcgY3JlYXRlU2hvcnRjdXRBc3luYyA6OiAnLCBlKSk7XG4gICAvLyAgICB9KS5jYXRjaCgoZSkgPT4gZmluYWxDYWxsYmFjaygpIHx8IF8ubG9nKCcgY2FuQ3JlYXRlU2hvcnRjdXRBc3luYyA6OiAnLCBlKSk7XG4gICAvLyB9LFxuXG5cbiAgIC8vIHBvc3RTZXNzaW9uU2NvcmUoKSB7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybjtcbiAgIC8vICAgIGlmIChfRy51c2VyLnNjb3JlKSBGQkluc3RhbnQucG9zdFNlc3Npb25TY29yZShfRy51c2VyLnNjb3JlKTtcbiAgIC8vICAgIF8ubG9nKGAgcG9zdFNlc3Npb25TY29yZSBjYWxsZWQgc2NvcmUgPSAke19HLnVzZXIuc2NvcmV9YCk7XG4gICAvLyAgICBpZiAoX0cudXNlci5zY29yZSA+IChfRy5nYW1lLmJlc3RTZXNzaW9uU2NvcmUgfHwgMCkpIF9HLmdhbWUuYmVzdFNlc3Npb25TY29yZSA9IF9HLnVzZXIuc2NvcmU7XG4gICAvLyB9LFxuXG5cbiAgIC8vIGNyZWF0ZUNvbnRleHQocGxheWVySWQsIGNhbGxiYWNrU3VjY2VzcywgY2FsbGJhY2tGYWlsKSB7XG4gICAvLyAgICAvLyBfLmxvZyhgIGFib3V0IHRvIGNyZWF0ZSBjb250ZXh0IHdpdGggcGxheWVyICR7cGxheWVySWR9YCk7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiAoY2FsbGJhY2tTdWNjZXNzKSAmJiBjYWxsYmFja1N1Y2Nlc3MoKTtcblxuICAgLy8gICAgY29uc3QgbG9nQ29udGV4dFJlc3VsdCA9IChyZXN1bHQsIGVycm9yKSA9PiB7XG4gICAvLyAgICAgICBpZiAocmVzdWx0KSBfLmxvZygnY3JlYXRlQ29udGV4dCBTdWNjZXNzID09PT0+ICcsIHJlc3VsdCk7XG4gICAvLyAgICAgICBpZiAoZXJyb3IpIF8ubG9nKCdjcmVhdGVDb250ZXh0IEZhaWwgID09PT0+ICcsIGVycm9yKTtcbiAgIC8vICAgIH1cbiAgIC8vICAgIEZCSW5zdGFudC5jb250ZXh0LmNyZWF0ZUFzeW5jKHBsYXllcklkKS50aGVuKFxuICAgLy8gICAgICAgKCkgPT4ge1xuICAgLy8gICAgICAgICAgaWYgKGNhbGxiYWNrU3VjY2VzcykgeyBjYWxsYmFja1N1Y2Nlc3MoKTsgfVxuICAgLy8gICAgICAgICAgbG9nQ29udGV4dFJlc3VsdCgnc3VjY2VzcycpO1xuICAgLy8gICAgICAgfSxcbiAgIC8vICAgICAgIChlKSA9PiB7XG4gICAvLyAgICAgICAgICBpZiAoY2FsbGJhY2tGYWlsKSB7IGNhbGxiYWNrRmFpbChlKTsgfVxuICAgLy8gICAgICAgICAgbG9nQ29udGV4dFJlc3VsdCgnZmFpbCcsIGUpO1xuICAgLy8gICAgICAgfVxuICAgLy8gICAgKTtcbiAgIC8vIH0sXG5cbn07Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/message.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e856c0EEB5McpOaOA31lWy0', 'message');
// script/social/message.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../system/all_modules");
var _ = _G._;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.onLoad = function () {
    };
    Message.prototype.initBase64Picture = function (targetNode) {
        return __awaiter(this, void 0, void 0, function () {
            var cameraNode, cameraComp, texture, gl, width, height, _canvas, ctx, data, rowBytes, row, srow, data2, imageData, dataURL;
            return __generator(this, function (_a) {
                if (!targetNode.activeInHierarchy)
                    targetNode.active = true;
                cameraNode = new cc.Node();
                targetNode.addChild(cameraNode);
                cameraComp = cameraNode.addComponent(cc.Camera);
                texture = new cc.RenderTexture();
                gl = cc.game._renderContext;
                texture.initWithSize(targetNode.width, targetNode.height, gl.STENCIL_INDEX8);
                cameraComp.targetTexture = texture;
                // cameraComp.zoomRatio = 3.2; // ratio for message of size: 640 x 420;
                cameraComp.zoomRatio = 1.3;
                cameraComp.backgroundColor = cc.Color.WHITE;
                cameraComp.clearFlags = cc.Camera.ClearFlags.DEPTH | cc.Camera.ClearFlags.STENCIL | cc.Camera.ClearFlags.COLOR;
                width = texture.width;
                height = texture.height;
                _canvas = document.createElement('canvas');
                _canvas.width = width;
                _canvas.height = height;
                ctx = _canvas.getContext('2d');
                cameraComp.render(targetNode);
                data = texture.readPixels();
                rowBytes = width * 4;
                for (row = 0; row < height; row++) {
                    srow = height - 1 - row;
                    data2 = new Uint8ClampedArray(data.buffer, srow * width * 4, rowBytes);
                    imageData = new ImageData(data2, width, 1);
                    ctx.putImageData(imageData, 0, row);
                }
                dataURL = _canvas.toDataURL("image/jpeg");
                setTimeout(function () {
                    targetNode.active = false;
                    cameraNode.removeFromParent();
                }, 2000);
                return [2 /*return*/, dataURL];
            });
        });
    };
    Message.prototype.initPayload = function (target, content, ctaText, extraData) {
        return __awaiter(this, void 0, void 0, function () {
            var dataObj, base64Image, payload, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dataObj = __assign({ version: 'v2', isFromNewsFeed: 1, puzzle_id: (extraData === null || extraData === void 0 ? void 0 : extraData.isNoPuzzleId) ? null : _G.gameMechanic.currentCategoryName + '_' + _G.gameMechanic.currentFrameName }, (extraData || {}));
                        return [4 /*yield*/, this.initBase64Picture(target)];
                    case 1:
                        base64Image = _a.sent();
                        payload = {
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
                        _.log("--------payload = ", payload);
                        return [2 /*return*/, payload];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Message.prototype.sendMessageScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var picNode, content, ctaText, payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window['FBInstant'])
                            return [2 /*return*/];
                        picNode = _.copyNode(_G.mapVisual.fullPicNode, cc.find('picture', this.node));
                        cc.find('capture_hard_mask', picNode).active = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
                        ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;
                        return [4 /*yield*/, this.initPayload(this.node, content, ctaText)];
                    case 2:
                        payload = _a.sent();
                        return [4 /*yield*/, FBInstant.updateAsync(payload)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        _.log('sendMessageScore', error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Message.prototype.sendMessageStillImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, ctaText, payload, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!window['FBInstant'])
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        content = _G.localize.currentLanguageObject.fb_invite_message_text(FBInstant.player.getName());
                        ctaText = _G.localize.currentLanguageObject.fb_invite_message_cta;
                        return [4 /*yield*/, this.initPayload(this.node, content, ctaText, { isNoPuzzleId: true })];
                    case 2:
                        payload = _a.sent();
                        return [4 /*yield*/, FBInstant.updateAsync(payload)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        _.log('sendMessageScore', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Message = __decorate([
        ccclass
    ], Message);
    return Message;
}(cc.Component));
exports.default = Message;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDNUMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVULElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEOztJQW9IQSxDQUFDO0lBbEhFLHdCQUFNLEdBQU47SUFDQSxDQUFDO0lBRUssbUNBQWlCLEdBQXZCLFVBQXdCLFVBQW1COzs7O2dCQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtvQkFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdEQsVUFBVSxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM1QixVQUFVLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sR0FBRyxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFakMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdFLFVBQVUsQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO2dCQUNuQyx1RUFBdUU7Z0JBQ3ZFLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUUzQixVQUFVLENBQUMsZUFBZSxH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QixDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQzt3QkFDL0YsT0FBTyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUM7d0JBRXhELHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O3dCQUFyRixPQUFPLEdBQUcsU0FBMkU7d0JBQzNGLHFCQUFNLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUE7O3dCQUFwQyxTQUFvQyxDQUFDOzs7O3dCQUVyQyxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLE9BQUssQ0FBQyxDQUFDOzs7Ozs7S0FFdEM7SUFsSGlCLE9BQU87UUFEM0IsT0FBTztPQUNhLE9BQU8sQ0FvSDNCO0lBQUQsY0FBQztDQXBIRCxBQW9IQyxDQXBIb0MsRUFBRSxDQUFDLFNBQVMsR0FvSGhEO2tCQXBIb0IsT0FBTyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc3NhZ2UgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICBvbkxvYWQoKSB7XG4gICB9XG5cbiAgIGFzeW5jIGluaXRCYXNlNjRQaWN0dXJlKHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGlmICghdGFyZ2V0Tm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgdGFyZ2V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBjYW1lcmFOb2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICAgIHRhcmdldE5vZGUuYWRkQ2hpbGQoY2FtZXJhTm9kZSk7XG4gICAgICBsZXQgY2FtZXJhQ29tcCA9IGNhbWVyYU5vZGUuYWRkQ29tcG9uZW50KGNjLkNhbWVyYSk7XG4gICAgICBsZXQgdGV4dHVyZSA9IG5ldyBjYy5SZW5kZXJUZXh0dXJlKCk7XG5cbiAgICAgIGxldCBnbCA9IGNjLmdhbWUuX3JlbmRlckNvbnRleHQ7XG4gICAgICB0ZXh0dXJlLmluaXRXaXRoU2l6ZSh0YXJnZXROb2RlLndpZHRoLCB0YXJnZXROb2RlLmhlaWdodCwgZ2wuU1RFTkNJTF9JTkRFWDgpO1xuICAgICAgY2FtZXJhQ29tcC50YXJnZXRUZXh0dXJlID0gdGV4dHVyZTtcbiAgICAgIC8vIGNhbWVyYUNvbXAuem9vbVJhdGlvID0gMy4yOyAvLyByYXRpbyBmb3IgbWVzc2FnZSBvZiBzaXplOiA2NDAgeCA0MjA7XG4gICAgICBjYW1lcmFDb21wLnpvb21SYXRpbyA9IDEuMztcblxuICAgICAgY2FtZXJhQ29tcC5iYWNrZ3JvdW5kQ29sb3IgPSBjYy5Db2xvci5XSElURTtcbiAgICAgIGNhbWVyYUNvbXAuY2xlYXJGbGFncyA9IGNjLkNhbWVyYS5DbGVhckZsYWdzLkRFUFRIIHwgY2MuQ2FtZXJhLkNsZWFyRmxhZ3MuU1RFTkNJTCB8IGNjLkNhbWVyYS5DbGVhckZsYWdzLkNPTE9SO1xuICAgICAgLy8gY2FtZXJhQ29tcC5jdWxsaW5nTWFzayA9IDB4ZmZmZmZmZmY7XG5cbiAgICAgIGxldCB3aWR0aCA9IHRleHR1cmUud2lkdGg7XG4gICAgICBsZXQgaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHQ7XG4gICAgICBsZXQgX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgX2NhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgICAgX2NhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICAgIGxldCBjdHggPSBfY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjYW1lcmFDb21wLnJlbmRlcih0YXJnZXROb2RlKTtcbiAgICAgIGxldCBkYXRhID0gdGV4dHVyZS5yZWFkUGl4ZWxzKCk7XG4gICAgICAvLyB3cml0ZSB0aGUgcmVuZGVyIGRhdGFcblxuICAgICAgbGV0IHJvd0J5dGVzID0gd2lkdGggKiA0O1xuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgaGVpZ2h0OyByb3crKykge1xuICAgICAgICAgbGV0IHNyb3cgPSBoZWlnaHQgLSAxIC0gcm93O1xuICAgICAgICAgbGV0IGRhdGEyID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEuYnVmZmVyLCBzcm93ICogd2lkdGggKiA0LCByb3dCeXRlcyk7XG4gICAgICAgICBsZXQgaW1hZ2VEYXRhID0gbmV3IEltYWdlRGF0YShkYXRhMiwgd2lkdGgsIDEpO1xuICAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIHJvdyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGFVUkwgPSBfY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIik7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGFyZ2V0Tm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgIGNhbWVyYU5vZGUucmVtb3ZlRnJvbVBhcmVudCgpO1xuICAgICAgfSwgMjAwMCk7XG5cbiAgICAgIHJldHVybiBkYXRhVVJMO1xuICAgfVxuXG4gICBhc3luYyBpbml0UGF5bG9hZCh0YXJnZXQ6IGNjLk5vZGUsIGNvbnRlbnQ6IHN0cmluZywgY3RhVGV4dDogc3RyaW5nLCBleHRyYURhdGE/OiBhbnkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgICBjb25zdCBkYXRhT2JqID0ge1xuICAgICAgICAgICAgdmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICAgIGlzRnJvbU5ld3NGZWVkOiAxLFxuICAgICAgICAgICAgcHV6emxlX2lkOiBleHRyYURhdGE/LmlzTm9QdXp6bGVJZCA/IG51bGwgOiBfRy5nYW1lTWVjaGFuaWMuY3VycmVudENhdGVnb3J5TmFtZSArICdfJyArIF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50RnJhbWVOYW1lLFxuICAgICAgICAgICAgLi4uKGV4dHJhRGF0YSB8fCB7fSksXG4gICAgICAgICB9XG4gICAgICAgICBjb25zdCBiYXNlNjRJbWFnZSA9IGF3YWl0IHRoaXMuaW5pdEJhc2U2NFBpY3R1cmUodGFyZ2V0KTtcbiAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgICAgICBhY3Rpb246ICdDVVNUT00nLFxuICAgICAgICAgICAgdGV4dDogX0cubG9jYWxpemUuZ2V0TXVsdGlsYW5ndWdhZUZCTWVzc2FnZU9iaihjb250ZW50KSxcbiAgICAgICAgICAgIC8vIHRleHQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBjdGE6IF9HLmxvY2FsaXplLmdldE11bHRpbGFuZ3VnYWVGQk1lc3NhZ2VPYmooY3RhVGV4dCksXG4gICAgICAgICAgICAvLyBjdGE6IGN0YVRleHQsXG4gICAgICAgICAgICBpbWFnZTogYmFzZTY0SW1hZ2UsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJ3BsYXlfdHVybicsXG4gICAgICAgICAgICBzdHJhdGVneTogJ0lNTUVESUFURScsXG4gICAgICAgICAgICBkYXRhOiBkYXRhT2JqLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uOiAnUFVTSCcsXG4gICAgICAgICB9O1xuICAgICAgICAgXy5sb2coYC0tLS0tLS0tcGF5bG9hZCA9IGAsIHBheWxvYWQpO1xuICAgICAgICAgcmV0dXJuIHBheWxvYWQ7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICB9XG5cblxuICAgYXN5bmMgc2VuZE1lc3NhZ2VTY29yZSgpIHtcbiAgICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuO1xuXG4gICAgICAvLyBmaWxsIHNhaHJlIG5vZGUgd2l0aCBjdXJyZW50IGZyYW1lcyBcbiAgICAgIGNvbnN0IHBpY05vZGUgPSBfLmNvcHlOb2RlKF9HLm1hcFZpc3VhbC5mdWxsUGljTm9kZSwgY2MuZmluZCgncGljdHVyZScsIHRoaXMubm9kZSkpO1xuICAgICAgY2MuZmluZCgnY2FwdHVyZV9oYXJkX21hc2snLCBwaWNOb2RlKS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICB0cnkge1xuICAgICAgICAgLy8gY29uc3QgY29udGVudCA9IGAke3dpbmRvd1snRkJJbnN0YW50J10/LnBsYXllci5nZXROYW1lKCl9IGludml0ZXMgeW91IHRvIHNvbHZlIGEgcHV6emxlIWA7XG4gICAgICAgICAvLyBjb25zdCBjdGFUZXh0ID0gJ1BMQVkgTk9XJztcbiAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VPYmplY3QuZmJfaW52aXRlX21lc3NhZ2VfdGV4dChGQkluc3RhbnQucGxheWVyLmdldE5hbWUoKSk7XG4gICAgICAgICBjb25zdCBjdGFUZXh0ID0gX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlT2JqZWN0LmZiX2ludml0ZV9tZXNzYWdlX2N0YTtcblxuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuaW5pdFBheWxvYWQodGhpcy5ub2RlLCBjb250ZW50LCBjdGFUZXh0KTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC51cGRhdGVBc3luYyhwYXlsb2FkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICBfLmxvZygnc2VuZE1lc3NhZ2VTY29yZScsIGVycm9yKTtcbiAgICAgIH1cbiAgIH1cblxuICAgYXN5bmMgc2VuZE1lc3NhZ2VTdGlsbEltYWdlKCkge1xuICAgICAgaWYgKCF3aW5kb3dbJ0ZCSW5zdGFudCddKSByZXR1cm47XG4gICAgICB0cnkge1xuICAgICAgICAgLy8gY29uc3QgY29udGVudCA9IGAke3dpbmRvd1snRkJJbnN0YW50J10/LnBsYXllci5nZXROYW1lKCl9IGludml0ZXMgeW91IHRvIHNvbHZlIGEgcHV6emxlIWA7XG4gICAgICAgICAvLyBjb25zdCBjdGFUZXh0ID0gJ1BMQVkgTk9XJztcbiAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VPYmplY3QuZmJfaW52aXRlX21lc3NhZ2VfdGV4dChGQkluc3RhbnQucGxheWVyLmdldE5hbWUoKSk7XG4gICAgICAgICBjb25zdCBjdGFUZXh0ID0gX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlT2JqZWN0LmZiX2ludml0ZV9tZXNzYWdlX2N0YTtcblxuICAgICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuaW5pdFBheWxvYWQodGhpcy5ub2RlLCBjb250ZW50LCBjdGFUZXh0LCB7IGlzTm9QdXp6bGVJZDogdHJ1ZSB9KTtcbiAgICAgICAgIGF3YWl0IEZCSW5zdGFudC51cGRhdGVBc3luYyhwYXlsb2FkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICBfLmxvZygnc2VuZE1lc3NhZ2VTY29yZScsIGVycm9yKTtcbiAgICAgIH1cbiAgIH1cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/app_events.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '10990IZBkRJQLreM2+T4aIH', 'app_events');
// script/system/app_events.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appEvents = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.appEvents = {
    isAppHidden: false,
    onAppShowCallbackArr: [],
    onAppHideCallbackArr: [],
    onAppShow: function () {
        this.isAppHidden = false;
        this.onAppShowCallbackArr.map(function (f) { return f(); });
    },
    addAppShowCallback: function (f) {
        this.onAppShowCallbackArr.push(f);
    },
    onAppHide: function () {
        this.isAppHidden = true;
        this.onAppHideCallbackArr.map(function (f) { return f(); });
    },
    addAppHideCallback: function (f) {
        this.onAppHideCallbackArr.push(f);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2FwcF9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLG9CQUFvQixFQUFFLEVBQUU7SUFDeEIsb0JBQW9CLEVBQUUsRUFBRTtJQUV4QixTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxrQkFBa0IsRUFBbEIsVUFBbUIsQ0FBVztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxrQkFBa0IsRUFBbEIsVUFBbUIsQ0FBVztRQUMxQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDSixDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBhcHBFdmVudHMgPSB7XG4gICAgaXNBcHBIaWRkZW46IGZhbHNlLFxuICAgIG9uQXBwU2hvd0NhbGxiYWNrQXJyOiBbXSxcbiAgICBvbkFwcEhpZGVDYWxsYmFja0FycjogW10sXG5cbiAgICBvbkFwcFNob3coKSB7XG4gICAgICAgIHRoaXMuaXNBcHBIaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkFwcFNob3dDYWxsYmFja0Fyci5tYXAoZiA9PiBmKCkpO1xuICAgIH0sXG5cbiAgICBhZGRBcHBTaG93Q2FsbGJhY2soZjogRnVuY3Rpb24pIHtcbiAgICAgICAgdGhpcy5vbkFwcFNob3dDYWxsYmFja0Fyci5wdXNoKGYpO1xuICAgIH0sXG5cbiAgICBvbkFwcEhpZGUoKSB7XG4gICAgICAgIHRoaXMuaXNBcHBIaWRkZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLm9uQXBwSGlkZUNhbGxiYWNrQXJyLm1hcChmID0+IGYoKSk7XG4gICAgfSxcblxuICAgIGFkZEFwcEhpZGVDYWxsYmFjayhmOiBGdW5jdGlvbikge1xuICAgICAgICB0aGlzLm9uQXBwSGlkZUNhbGxiYWNrQXJyLnB1c2goZik7XG4gICAgfSxcbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/resources_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b431lJxCxH8r1n9TH3yBVp', 'resources_manager');
// script/system/resources_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = void 0;
var _G = require("./all_modules");
var _ = _G._, $ = _G.$;
exports.resources = {
    frameSprites: {},
    isAllFramesLoaded: false,
    frameLoadCallbackArr: [],
    init: function () {
        var _this = this;
        this.frameSprites['tutorial'] = { tut: cc.find('Canvas/sample_nodes/full_picture/frame').getComponent(cc.Sprite).spriteFrame };
        _G.levelManager.categoryNameArr.map(function (catName) { return _this.frameSprites[catName] = {}; });
        // _.setTimeout(() => this.loadAllFrames(), 100);
        _.setTimeout(function () { return _this.loadImageMessageHome(); }, 2000);
    },
    loadImageMessageHome: function () {
        cc.resources.load('social/img_message_home', cc.Texture2D, function (err, res) {
            if (err)
                return _.log('loadImageMessageHome err', err);
            var targetNode = cc.find('Canvas/message_home/picture/img_message_home');
            targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
    },
    loadSingleFrame: function (catName, frameName) {
        var _this = this;
        // _.setTimeout(() => {
        cc.resources.load("frames/" + catName + "/" + frameName, cc.SpriteFrame, function (err, res) {
            if (!err) {
                _this.frameSprites[catName][frameName] = res;
                _this.frameLoadCallbackArr.map(function (f) { return f(catName, frameName); });
            }
            else
                _.log(err);
        });
        // }, 1000);
    },
    // loadAllFrames() {
    //    let categoryLoaded = 0;
    //    _G.levelManager.categoryNameArr.map(catName => {
    //       cc.resources.loadDir(`frames/${catName}`, cc.SpriteFrame, (err, resArr) => {
    //          if (!err) resArr.map(res => {
    //             this.frameSprites[catName][res.name] = res;
    //             this.frameLoadCallbackArr.map(f => f(catName, res.name));
    //          });
    //          categoryLoaded++;
    //          if (categoryLoaded == _G.levelManager.categoryNameArr.length) {
    //             this.isAllFramesLoaded = true;
    //             _G.coreUI.hideLayout('layout_loading');
    //          }
    //       });
    //    });
    // },
    addFrameLoadCallback: function (f) {
        this.frameLoadCallbackArr.push(f);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3Jlc291cmNlc19tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFvQztBQUM1QixJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFUCxRQUFBLFNBQVMsR0FBRztJQUN0QixZQUFZLEVBQUUsRUFBRTtJQUNoQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLG9CQUFvQixFQUFFLEVBQUU7SUFFeEIsSUFBSTtRQUFKLGlCQU1DO1FBTEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvSCxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ2hGLGlEQUFpRDtRQUVqRCxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBM0IsQ0FBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNqRSxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUMzRSxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELGVBQWUsWUFBQyxPQUFPLEVBQUUsU0FBUztRQUFsQyxpQkFXQztRQVZFLHVCQUF1QjtRQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFVLE9BQU8sU0FBSSxTQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzFFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1AsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQzVDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7YUFDNUQ7O2dCQUVJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZO0lBQ2YsQ0FBQztJQUVELG9CQUFvQjtJQUNwQiw2QkFBNkI7SUFDN0Isc0RBQXNEO0lBQ3RELHFGQUFxRjtJQUNyRix5Q0FBeUM7SUFDekMsMERBQTBEO0lBQzFELHdFQUF3RTtJQUN4RSxlQUFlO0lBRWYsNkJBQTZCO0lBQzdCLDJFQUEyRTtJQUMzRSw2Q0FBNkM7SUFDN0Msc0RBQXNEO0lBQ3RELGFBQWE7SUFFYixZQUFZO0lBQ1osU0FBUztJQUNULEtBQUs7SUFFTCxvQkFBb0IsWUFBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCByZXNvdXJjZXMgPSB7XG4gICBmcmFtZVNwcml0ZXM6IHt9LFxuICAgaXNBbGxGcmFtZXNMb2FkZWQ6IGZhbHNlLFxuICAgZnJhbWVMb2FkQ2FsbGJhY2tBcnI6IFtdLFxuXG4gICBpbml0KCkge1xuICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbJ3R1dG9yaWFsJ10gPSB7IHR1dDogY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy9mdWxsX3BpY3R1cmUvZnJhbWUnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSB9O1xuICAgICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB0aGlzLmZyYW1lU3ByaXRlc1tjYXROYW1lXSA9IHt9KTtcbiAgICAgIC8vIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLmxvYWRBbGxGcmFtZXMoKSwgMTAwKTtcblxuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMubG9hZEltYWdlTWVzc2FnZUhvbWUoKSwgMjAwMCk7XG4gICB9LFxuXG4gICBsb2FkSW1hZ2VNZXNzYWdlSG9tZSgpIHtcbiAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdzb2NpYWwvaW1nX21lc3NhZ2VfaG9tZScsIGNjLlRleHR1cmUyRCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoZXJyKSByZXR1cm4gXy5sb2coJ2xvYWRJbWFnZU1lc3NhZ2VIb21lIGVycicsIGVycik7XG4gICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gY2MuZmluZCgnQ2FudmFzL21lc3NhZ2VfaG9tZS9waWN0dXJlL2ltZ19tZXNzYWdlX2hvbWUnKTtcbiAgICAgICAgIHRhcmdldE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgbG9hZFNpbmdsZUZyYW1lKGNhdE5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgLy8gXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNjLnJlc291cmNlcy5sb2FkKGBmcmFtZXMvJHtjYXROYW1lfS8ke2ZyYW1lTmFtZX1gLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bZnJhbWVOYW1lXSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkQ2FsbGJhY2tBcnIubWFwKGYgPT4gZihjYXROYW1lLCBmcmFtZU5hbWUpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZWxzZSBfLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICAvLyB9LCAxMDAwKTtcbiAgIH0sXG5cbiAgIC8vIGxvYWRBbGxGcmFtZXMoKSB7XG4gICAvLyAgICBsZXQgY2F0ZWdvcnlMb2FkZWQgPSAwO1xuICAgLy8gICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB7XG4gICAvLyAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcihgZnJhbWVzLyR7Y2F0TmFtZX1gLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzQXJyKSA9PiB7XG4gICAvLyAgICAgICAgICBpZiAoIWVycikgcmVzQXJyLm1hcChyZXMgPT4ge1xuICAgLy8gICAgICAgICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bcmVzLm5hbWVdID0gcmVzO1xuICAgLy8gICAgICAgICAgICAgdGhpcy5mcmFtZUxvYWRDYWxsYmFja0Fyci5tYXAoZiA9PiBmKGNhdE5hbWUsIHJlcy5uYW1lKSk7XG4gICAvLyAgICAgICAgICB9KTtcblxuICAgLy8gICAgICAgICAgY2F0ZWdvcnlMb2FkZWQrKztcbiAgIC8vICAgICAgICAgIGlmIChjYXRlZ29yeUxvYWRlZCA9PSBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlOYW1lQXJyLmxlbmd0aCkge1xuICAgLy8gICAgICAgICAgICAgdGhpcy5pc0FsbEZyYW1lc0xvYWRlZCA9IHRydWU7XG4gICAvLyAgICAgICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2xvYWRpbmcnKTtcbiAgIC8vICAgICAgICAgIH1cblxuICAgLy8gICAgICAgfSk7XG4gICAvLyAgICB9KTtcbiAgIC8vIH0sXG5cbiAgIGFkZEZyYW1lTG9hZENhbGxiYWNrKGYpIHtcbiAgICAgIHRoaXMuZnJhbWVMb2FkQ2FsbGJhY2tBcnIucHVzaChmKTtcbiAgIH0sXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/user.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '61662fIpZFE47aAaicYHcc7', 'user');
// script/system/user.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var _G = require("./all_modules");
var _ = _G._, $ = _G.$;
var callbackArr = [];
var dataFieldArr = [
    'IsOldUser',
    'exp',
    'stars',
    'playedGames',
];
exports.user = {
    loginData: null,
    entryPointData: {},
    exp: 0,
    stars: 0,
    level: 0,
    playedGames: null,
    isPuzzleSpecified: false,
    isVersionV2: false,
    init: function () {
        var _this = this;
        this.entryPointData = _G.utilsData.getEntryPointData();
        // TESTTTTTTTTTTTTTTTTTTTTT 
        // this.entryPointData.puzzle_id = 'POSTER_frame02';
        // this.entryPointData.version = 'v2'; // 'v2' or 'normal'
        // TESTTTTTTTTTTTTTTTTTTTTT 
        // validate the puzzle_id to prevent outdated puzzle_id to cause error
        var puzzleId = this.entryPointData.puzzle_id;
        if (puzzleId) {
            var _a = puzzleId.split('_'), catName = _a[0], frameName = _a[1];
            var isCatNameValid = _G.levelManager.categoryNameArr.includes(catName);
            if (!isCatNameValid)
                this.entryPointData.puzzle_id = null;
            else {
                var isFrameNameValid = _G.levelManager.getAvatarInfo(catName, frameName);
                if (!isFrameNameValid)
                    this.entryPointData.puzzle_id = null;
            }
        }
        if (this.entryPointData.isFromNewsFeed)
            _G.analytic.logPageViewFromFeed(this.entryPointData.puzzle_id);
        this.isPuzzleSpecified = this.entryPointData.puzzle_id;
        this.isVersionV2 = this.isPuzzleSpecified && (this.entryPointData.version == 'v2');
        // this.isPuzzleSpecified = null;
        setTimeout(function () { return _this.getFBData(); }); //delay 1 thread for other modules to register dataField
    },
    getFBData: function () {
        var _this = this;
        _G.utilsData.load(dataFieldArr, function (data) {
            _this.loginData = data;
            data.isNewUser = !data.IsOldUser;
            _G.utilsData.save({ 'IsOldUser': true });
            // fill exp, stars, level
            _this.stars = data.isNewUser ? _G.configGame.hintCoinPrice : (data.stars || 0);
            _this.exp = data.exp || 0;
            _this.level = _this.expToLevel(_this.exp);
            _this.playedGames = data.playedGames || {};
            _G.coreUI.updateUserStats();
            // call all the loginCallback
            callbackArr.map(function (func) { return func(data); });
        });
    },
    addLoginDataFields: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.map(function (fieldName) { return _.addUniqueElemToArr(dataFieldArr, fieldName); });
    },
    addInitCallback: function (callbackFunc) {
        if (!this.loginData)
            callbackArr.push(callbackFunc);
        else
            callbackFunc(this.loginData);
    },
    // Supportive
    addStars: function (starNum, isSkipUpdateUI) {
        if (isSkipUpdateUI === void 0) { isSkipUpdateUI = false; }
        this.stars = _.max(this.stars + starNum, 0);
        _G.utilsData.save({ stars: this.stars });
        _G.coreUI.updateUserStats(isSkipUpdateUI);
    },
    expToLevel: function (exp) {
        return 1 + _.floor(this.exp / _G.configGame.levelUpExp);
    },
    addExp: function (exp, isSkipUpdateUIStars) {
        if (isSkipUpdateUIStars === void 0) { isSkipUpdateUIStars = false; }
        var oldLevel = this.expToLevel(this.exp);
        this.exp += exp;
        var newLevel = this.level = this.expToLevel(this.exp);
        _G.utilsData.save({ exp: this.exp });
        _G.coreUI.updateUserStats(isSkipUpdateUIStars);
        return newLevel != oldLevel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0NBQW9DO0FBQzVCLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdwQixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsSUFBTSxZQUFZLEdBQUc7SUFDbEIsV0FBVztJQUNYLEtBQUs7SUFDTCxPQUFPO0lBQ1AsYUFBYTtDQUNmLENBQUM7QUFHVyxRQUFBLElBQUksR0FBRztJQUNqQixTQUFTLEVBQUUsSUFBSTtJQUNmLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLEdBQUcsRUFBRSxDQUFDO0lBQ04sS0FBSyxFQUFFLENBQUM7SUFDUixLQUFLLEVBQUUsQ0FBQztJQUNSLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGlCQUFpQixFQUFFLEtBQUs7SUFDeEIsV0FBVyxFQUFFLEtBQUs7SUFFbEIsSUFBSTtRQUFKLGlCQThCQztRQTdCRSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV2RCw0QkFBNEI7UUFDNUIsb0RBQW9EO1FBQ3BELDBEQUEwRDtRQUMxRCw0QkFBNEI7UUFHNUIsc0VBQXNFO1FBQ3RFLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDO1FBQy9DLElBQUksUUFBUSxFQUFFO1lBQ0wsSUFBQSxLQUF1QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUF6QyxPQUFPLFFBQUEsRUFBRSxTQUFTLFFBQXVCLENBQUM7WUFDakQsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pFLElBQUksQ0FBQyxjQUFjO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElB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Q0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFVBQVUsWUFBQyxHQUFHO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELE1BQU0sWUFBQyxHQUFHLEVBQUUsbUJBQTJCO1FBQTNCLG9DQUFBLEVBQUEsMkJBQTJCO1FBQ3BDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2hCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFeEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvQyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUM7SUFDL0IsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cblxuY29uc3QgY2FsbGJhY2tBcnIgPSBbXTtcbmNvbnN0IGRhdGFGaWVsZEFyciA9IFtcbiAgICdJc09sZFVzZXInLFxuICAgJ2V4cCcsXG4gICAnc3RhcnMnLFxuICAgJ3BsYXllZEdhbWVzJyxcbl07XG5cblxuZXhwb3J0IGNvbnN0IHVzZXIgPSB7XG4gICBsb2dpbkRhdGE6IG51bGwsXG4gICBlbnRyeVBvaW50RGF0YToge30sXG4gICBleHA6IDAsXG4gICBzdGFyczogMCxcbiAgIGxldmVsOiAwLFxuICAgcGxheWVkR2FtZXM6IG51bGwsXG4gICBpc1B1enpsZVNwZWNpZmllZDogZmFsc2UsXG4gICBpc1ZlcnNpb25WMjogZmFsc2UsXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmVudHJ5UG9pbnREYXRhID0gX0cudXRpbHNEYXRhLmdldEVudHJ5UG9pbnREYXRhKCk7XG5cbiAgICAgIC8vIFRFU1RUVFRUVFRUVFRUVFRUVFRUVFRUVCBcbiAgICAgIC8vIHRoaXMuZW50cnlQb2ludERhdGEucHV6emxlX2lkID0gJ1BPU1RFUl9mcmFtZTAyJztcbiAgICAgIC8vIHRoaXMuZW50cnlQb2ludERhdGEudmVyc2lvbiA9ICd2Mic7IC8vICd2Micgb3IgJ25vcm1hbCdcbiAgICAgIC8vIFRFU1RUVFRUVFRUVFRUVFRUVFRUVFRUVCBcblxuXG4gICAgICAvLyB2YWxpZGF0ZSB0aGUgcHV6emxlX2lkIHRvIHByZXZlbnQgb3V0ZGF0ZWQgcHV6emxlX2lkIHRvIGNhdXNlIGVycm9yXG4gICAgICBjb25zdCBwdXp6bGVJZCA9IHRoaXMuZW50cnlQb2ludERhdGEucHV6emxlX2lkO1xuICAgICAgaWYgKHB1enpsZUlkKSB7XG4gICAgICAgICBjb25zdCBbY2F0TmFtZSwgZnJhbWVOYW1lXSA9IHB1enpsZUlkLnNwbGl0KCdfJyk7XG4gICAgICAgICBjb25zdCBpc0NhdE5hbWVWYWxpZCA9IF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeU5hbWVBcnIuaW5jbHVkZXMoY2F0TmFtZSk7XG4gICAgICAgICBpZiAoIWlzQ2F0TmFtZVZhbGlkKSB0aGlzLmVudHJ5UG9pbnREYXRhLnB1enpsZV9pZCA9IG51bGw7XG4gICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGlzRnJhbWVOYW1lVmFsaWQgPSBfRy5sZXZlbE1hbmFnZXIuZ2V0QXZhdGFySW5mbyhjYXROYW1lLCBmcmFtZU5hbWUpO1xuICAgICAgICAgICAgaWYgKCFpc0ZyYW1lTmFtZVZhbGlkKSB0aGlzLmVudHJ5UG9pbnREYXRhLnB1enpsZV9pZCA9IG51bGw7XG4gICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgaWYgKHRoaXMuZW50cnlQb2ludERhdGEuaXNGcm9tTmV3c0ZlZWQpIF9HLmFuYWx5dGljLmxvZ1BhZ2VWaWV3RnJvbUZlZWQodGhpcy5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQpO1xuXG4gICAgICB0aGlzLmlzUHV6emxlU3BlY2lmaWVkID0gdGhpcy5lbnRyeVBvaW50RGF0YS5wdXp6bGVfaWQ7XG4gICAgICB0aGlzLmlzVmVyc2lvblYyID0gdGhpcy5pc1B1enpsZVNwZWNpZmllZCAmJiAodGhpcy5lbnRyeVBvaW50RGF0YS52ZXJzaW9uID09ICd2MicpO1xuXG4gICAgICAvLyB0aGlzLmlzUHV6emxlU3BlY2lmaWVkID0gbnVsbDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5nZXRGQkRhdGEoKSk7IC8vZGVsYXkgMSB0aHJlYWQgZm9yIG90aGVyIG1vZHVsZXMgdG8gcmVnaXN0ZXIgZGF0YUZpZWxkXG5cbiAgIH0sXG5cbiAgIGdldEZCRGF0YSgpIHtcbiAgICAgIF9HLnV0aWxzRGF0YS5sb2FkKGRhdGFGaWVsZEFyciwgKGRhdGEpID0+IHtcbiAgICAgICAgIHRoaXMubG9naW5EYXRhID0gZGF0YTtcbiAgICAgICAgIGRhdGEuaXNOZXdVc2VyID0gIWRhdGEuSXNPbGRVc2VyO1xuICAgICAgICAgX0cudXRpbHNEYXRhLnNhdmUoeyAnSXNPbGRVc2VyJzogdHJ1ZSB9KTtcblxuICAgICAgICAgLy8gZmlsbCBleHAsIHN0YXJzLCBsZXZlbFxuICAgICAgICAgdGhpcy5zdGFycyA9IGRhdGEuaXNOZXdVc2VyID8gX0cuY29uZmlnR2FtZS5oaW50Q29pblByaWNlIDogKGRhdGEuc3RhcnMgfHwgMCk7XG4gICAgICAgICB0aGlzLmV4cCA9IGRhdGEuZXhwIHx8IDA7XG4gICAgICAgICB0aGlzLmxldmVsID0gdGhpcy5leHBUb0xldmVsKHRoaXMuZXhwKTtcbiAgICAgICAgIHRoaXMucGxheWVkR2FtZXMgPSBkYXRhLnBsYXllZEdhbWVzIHx8IHt9O1xuICAgICAgICAgX0cuY29yZVVJLnVwZGF0ZVVzZXJTdGF0cygpO1xuXG4gICAgICAgICAvLyBjYWxsIGFsbCB0aGUgbG9naW5DYWxsYmFja1xuICAgICAgICAgY2FsbGJhY2tBcnIubWFwKGZ1bmMgPT4gZnVuYyhkYXRhKSk7XG4gICAgICB9KTtcbiAgIH0sXG5cblxuICAgYWRkTG9naW5EYXRhRmllbGRzKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICBhcmdzLm1hcChmaWVsZE5hbWUgPT4gXy5hZGRVbmlxdWVFbGVtVG9BcnIoZGF0YUZpZWxkQXJyLCBmaWVsZE5hbWUpKVxuICAgfSxcblxuXG4gICBhZGRJbml0Q2FsbGJhY2soY2FsbGJhY2tGdW5jOiBGdW5jdGlvbikge1xuICAgICAgaWYgKCF0aGlzLmxvZ2luRGF0YSkgY2FsbGJhY2tBcnIucHVzaChjYWxsYmFja0Z1bmMpO1xuICAgICAgZWxzZSBjYWxsYmFja0Z1bmModGhpcy5sb2dpbkRhdGEpO1xuICAgfSxcblxuXG4gICAvLyBTdXBwb3J0aXZlXG4gICBhZGRTdGFycyhzdGFyTnVtLCBpc1NraXBVcGRhdGVVSSA9IGZhbHNlKSB7XG4gICAgICB0aGlzLnN0YXJzID0gXy5tYXgodGhpcy5zdGFycyArIHN0YXJOdW0sIDApO1xuICAgICAgX0cudXRpbHNEYXRhLnNhdmUoeyBzdGFyczogdGhpcy5zdGFycyB9KTtcbiAgICAgIF9HLmNvcmVVSS51cGRhdGVVc2VyU3RhdHMoaXNTa2lwVXBkYXRlVUkpO1xuICAgfSxcblxuICAgZXhwVG9MZXZlbChleHApIHtcbiAgICAgIHJldHVybiAxICsgXy5mbG9vcih0aGlzLmV4cCAvIF9HLmNvbmZpZ0dhbWUubGV2ZWxVcEV4cCk7XG4gICB9LFxuXG4gICBhZGRFeHAoZXhwLCBpc1NraXBVcGRhdGVVSVN0YXJzID0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IG9sZExldmVsID0gdGhpcy5leHBUb0xldmVsKHRoaXMuZXhwKTtcbiAgICAgIHRoaXMuZXhwICs9IGV4cDtcbiAgICAgIGNvbnN0IG5ld0xldmVsID0gdGhpcy5sZXZlbCA9IHRoaXMuZXhwVG9MZXZlbCh0aGlzLmV4cCk7XG5cbiAgICAgIF9HLnV0aWxzRGF0YS5zYXZlKHsgZXhwOiB0aGlzLmV4cCB9KTtcbiAgICAgIF9HLmNvcmVVSS51cGRhdGVVc2VyU3RhdHMoaXNTa2lwVXBkYXRlVUlTdGFycyk7XG4gICAgICByZXR1cm4gbmV3TGV2ZWwgIT0gb2xkTGV2ZWw7XG4gICB9LFxuXG59Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_common.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38328hs45lM85Ud0D0XUutA', 'utils_common');
// script/services/utils/utils_common.ts

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = exports.$ = void 0;
var _G = require("../../system/all_modules");
var utils_time_1 = require("./utils_time"); // time supportive functions
var utils_coordinate_1 = require("./utils_coordinate"); // time supportive functions
var uuidIndex = 1e5; // uuid to set as names of objects => help identifying objects
// function to get nodeProps object
var $ = function (node, simulationID) {
    if (simulationID === void 0) { simulationID = 0; }
    exports._.$callCount = (exports._.$callCount || 0) + 1;
    if (node.name != _G.types.elem.card)
        simulationID = 0;
    var props = node["props_" + simulationID] || {};
    return node["props_" + simulationID] = props;
};
exports.$ = $;
exports.$.clean = function (node, simulationID) {
    if (simulationID === void 0) { simulationID = 0; }
    if (simulationID == 0)
        return;
    delete node["props_" + simulationID];
};
exports._ = __assign(__assign({ NO_CONSOLE_LOG: false, 
    // NO_CONSOLE_LOG: true,
    //=== device info
    isANDROID: (cc.sys.os == cc.sys.OS_ANDROID), isIOS: (cc.sys.os == cc.sys.OS_IOS), 
    //--- Math
    max: Math.max, min: Math.min, round: Math.round, floor: Math.floor, ceil: Math.ceil, sign: Math.sign, abs: Math.abs, pow: Math.pow, random: Math.random, sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan, atan: Math.atan, atan2: Math.atan2, log10: Math.log10, PI: Math.PI, randomArrItem: function (arr, isRemoveItem) {
        if (isRemoveItem === void 0) { isRemoveItem = false; }
        var iRandom = Math.floor(Math.random() * arr.length);
        return (isRemoveItem ? arr.splice(iRandom, 1)[0] : arr[iRandom]);
    },
    isString: function (x) {
        return typeof x === 'string';
    },
    isFunction: function (functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.NO_CONSOLE_LOG)
            try {
                console.log.apply(console, args);
            }
            catch (e) { }
    },
    // ========= Misc
    getNewUuid: function () {
        return uuidIndex++;
    },
    // ========== array
    removeArrayItem: function (arr, item) {
        var index = arr.indexOf(item);
        if (index != -1)
            arr.splice(index, 1);
    },
    addUniqueElemToArr: function (arr, item) {
        if (arr.includes(item))
            return;
        arr.push(item);
    },
    // ========== numering
    randomNumber: function (maxValue) {
        return exports._.floor(exports._.random() * maxValue);
    },
    shuffleArray: function (arr, isCreateNewArray) {
        var _this = this;
        if (isCreateNewArray === void 0) { isCreateNewArray = false; }
        var newArr = isCreateNewArray ? __spreadArrays(arr) : arr;
        newArr.sort(function () { return _this.random() > 0.5 ? 1 : -1; });
        return newArr;
    },
    // ========== positioning
    directionVec2: function () {
        return {
            top: cc.v2(0, 1),
            bottom: cc.v2(0, -1),
            left: cc.v2(-1, 0),
            right: cc.v2(1, 0),
        };
    },
    reservedDir: function (dir) {
        return { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }[dir];
    },
    getGlobalPos: function (node) {
        return node.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },
    getGlobalPosDiff: function (node1, node2) {
        return this.getGlobalPos(node2).sub(this.getGlobalPos(node1));
    },
    setGlobalPosToNode: function (nodeToSet, targetNode) {
        var targetGPos = this.getGlobalPos(targetNode);
        var localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
    },
    setGlobalPos: function (nodeToSet, targetGPos) {
        var localPos = nodeToSet.parent.convertToNodeSpaceAR(targetGPos);
        nodeToSet.setPosition(localPos);
    },
    moveToNewParentKeepPosition: function (node, newParentNode) {
        var curNodePos = newParentNode.convertToNodeSpaceAR(this.getGlobalPos(node));
        node.parent = newParentNode;
        node.setPosition(curNodePos);
    },
    isGlobalOverlapping: function (node1, node2) {
        return cc.Intersection.rectRect(node1.getBoundingBoxToWorld(), node2.getBoundingBoxToWorld());
    },
    // ========= Grpahics Logic
    // example usage:
    //    var b = bezier([[0, 0, 0], [1, 1, 1], [2, -3, 6]]);
    //    for (var t = 0; t <= 10; t++) console.log(b(t/10));
    getBezierPointFunc: function (pts) {
        return function (t) {
            for (var a = pts; a.length > 1; a = b) // do..while loop in disguise
                for (var i = 0, b = [], j; i < a.length - 1; i++) // cycle over control points
                    for (b[i] = [], j = 0; j < a[i].length; j++) // cycle over dimensions
                        b[i][j] = a[i][j] * (1 - t) + a[i + 1][j] * t; // interpolation
            return a[0];
        };
    },
    // ========= Nodes
    // copy a node to a parent
    copyNode: function (sourceNode, targetParent) {
        var newNode = cc.instantiate(sourceNode);
        if (targetParent)
            newNode.parent = targetParent;
        return newNode;
    },
    setOrgProp: function (node, propName) {
        var _this = this;
        var defaultPropArr = ['x', 'y', 'width', 'height', 'opacity'];
        if (propName)
            this.addUniqueElemToArr(defaultPropArr, propName);
        defaultPropArr.map(function (iPropName) {
            var orgPropName = "org" + _this.capitalize(iPropName);
            node[orgPropName] = node.hasOwnProperty(orgPropName) ? node[orgPropName] : node[iPropName];
        });
        if (propName)
            return node["org" + this.capitalize(propName)];
    },
    // get full path of a node to its highest parent
    getNodePath: function (node) {
        var pathArr = [node.name];
        var parent = node.parent;
        var safeCount = 0;
        while (parent && safeCount++ < 50) {
            if (!parent.parent) {
                break;
            }
            pathArr.push(parent.name);
            parent = parent.parent;
        }
        return pathArr.reverse().join('/');
    },
    // make a node strech to connect 2 points. Used to set position & length of a line/wall as configured positions
    nodeConnect2Points: function (node, p1, p2) {
        var diffVec = p2.sub(p1);
        node.height = diffVec.mag();
        node.setPosition(p1.add(diffVec.mul(0.5)));
        node.angle = 90 + exports._.radianToDegrees(exports._.atan2(diffVec.y, diffVec.x));
    },
    getNodeDistance: function (node1, node2) {
        return this.getGlobalPosDiff(node1, node2).mag();
    },
    // ========================================
    radianToDegrees: function (radian) {
        return radian * 180 / Math.PI;
    },
    degreesToRadian: function (degrees) {
        return degrees * Math.PI / 180;
    },
    vec2ToAngle: function (vec2) {
        return exports._.radianToDegrees(exports._.atan2(vec2.y, vec2.x));
    },
    formatTime: function (timeInSec) {
        //let date = new Date(null);
        //date.setSeconds(timeInSec); // specify value for SECONDS here
        //return date.toISOString().substr(11, 8);
        // e.g. 18245sec = 5 hours (5x3600s) 4 mins (4x60s) 5s
        // this.log('timeInSec: ' + timeInSec);
        var hours = exports._.floor(timeInSec / (60 * 60));
        var mins = exports._.floor((timeInSec % (60 * 60)) / 60);
        var secs = timeInSec % (60 * 60) % 60;
        if (hours < 10)
            hours = '0' + hours;
        if (mins < 10)
            mins = '0' + mins;
        if (secs < 10)
            secs = '0' + secs;
        return hours + ':' + mins + ':' + secs;
    },
    formatMoney: function (gold) {
        // (no suffix), K, M, B, T, aa, ab, ac, ad, ae ...
        var digits = exports._.floor(Math.log10(gold)) + 1;
        if (digits <= 6) {
            return gold.toLocaleString();
        }
        // 1M will write as 1000K
        // 50B will write as 50,000M 
        // baically, get up to >6 digits, then start shifting by 1 suffix
        // divide digits by 3
        var suffixes = ['K', 'M', 'B', 'T'];
        var chunks = exports._.floor((digits - 1) / 3);
        var startingChar = 'a';
        var suffix;
        if (chunks - 2 <= 3) {
            suffix = suffixes[chunks - 2];
        }
        else {
            suffix = String.fromCharCode(((chunks - 6) / 26) + startingChar.charCodeAt(0)) + String.fromCharCode(((chunks - 6) % 26) + startingChar.charCodeAt(0));
        }
        var truncatedGold = exports._.round(gold / exports._.pow(10, (chunks - 1) * 3));
        return truncatedGold.toLocaleString() + suffix;
    },
    capitalize: function (str) {
        var arr = __spreadArrays(str);
        arr[0] = arr[0].toUpperCase();
        return arr.join('');
    },
    getInRange: function (num, min, max) {
        return exports._.min(exports._.max(num, min), max);
    } }, utils_time_1.default), utils_coordinate_1.default);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUUvQywyQ0FBd0MsQ0FBRSw0QkFBNEI7QUFDdEUsdURBQW9ELENBQUUsNEJBQTRCO0FBRWxGLElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDLDhEQUE4RDtBQUduRixtQ0FBbUM7QUFDNUIsSUFBTSxDQUFDLEdBQUcsVUFBQyxJQUFhLEVBQUUsWUFBZ0I7SUFBaEIsNkJBQUEsRUFBQSxnQkFBZ0I7SUFDOUMsU0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLFNBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQUUsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUN0RCxJQUFNLEtBQUssR0FBdUIsSUFBSSxDQUFDLFdBQVMsWUFBYyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RFLE9BQU8sSUFBSSxDQUFDLFdBQVMsWUFBYyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2hELENBQUMsQ0FBQTtBQU5ZLFFBQUEsQ0FBQyxLQU1iO0FBRUQsU0FBQyxDQUFDLEtBQUssR0FBRyxVQUFDLElBQWEsRUFBRSxZQUFnQjtJQUFoQiw2QkFBQSxFQUFBLGdCQUFnQjtJQUN2QyxJQUFJLFlBQVksSUFBSSxDQUFDO1FBQUUsT0FBTztJQUM5QixPQUFPLElBQUksQ0FBQyxXQUFTLFlBQWMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQTtBQUdZLFFBQUEsQ0FBQyx1QkFDWCxjQUFjLEVBQUUsS0FBSztJQUNyQix3QkFBd0I7SUFFeEIsaUJBQWlCO0lBQ2pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFB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LENBQUMsU0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxJQUtFLG9CQUFhLEdBR2IsMEJBQW1CLEVBSXZCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcblxuaW1wb3J0IHRpbWVGdW5jdGlvbnMgZnJvbSAnLi91dGlsc190aW1lJyAgLy8gdGltZSBzdXBwb3J0aXZlIGZ1bmN0aW9uc1xuaW1wb3J0IGNvb3JkaW5hdGVGdW5jdGlvbnMgZnJvbSAnLi91dGlsc19jb29yZGluYXRlJyAgLy8gdGltZSBzdXBwb3J0aXZlIGZ1bmN0aW9uc1xuXG5sZXQgdXVpZEluZGV4ID0gMWU1OyAvLyB1dWlkIHRvIHNldCBhcyBuYW1lcyBvZiBvYmplY3RzID0+IGhlbHAgaWRlbnRpZnlpbmcgb2JqZWN0c1xuXG5cbi8vIGZ1bmN0aW9uIHRvIGdldCBub2RlUHJvcHMgb2JqZWN0XG5leHBvcnQgY29uc3QgJCA9IChub2RlOiBjYy5Ob2RlLCBzaW11bGF0aW9uSUQgPSAwKSA9PiB7XG4gICBfLiRjYWxsQ291bnQgPSAoXy4kY2FsbENvdW50IHx8IDApICsgMTtcblxuICAgaWYgKG5vZGUubmFtZSAhPSBfRy50eXBlcy5lbGVtLmNhcmQpIHNpbXVsYXRpb25JRCA9IDA7XG4gICBjb25zdCBwcm9wczogX0cudHlwZXMuZWxlbVByb3BzID0gbm9kZVtgcHJvcHNfJHtzaW11bGF0aW9uSUR9YF0gfHwge307XG4gICByZXR1cm4gbm9kZVtgcHJvcHNfJHtzaW11bGF0aW9uSUR9YF0gPSBwcm9wcztcbn1cblxuJC5jbGVhbiA9IChub2RlOiBjYy5Ob2RlLCBzaW11bGF0aW9uSUQgPSAwKSA9PiB7XG4gICBpZiAoc2ltdWxhdGlvbklEID09IDApIHJldHVybjtcbiAgIGRlbGV0ZSBub2RlW2Bwcm9wc18ke3NpbXVsYXRpb25JRH1gXTtcbn1cblxuXG5leHBvcnQgY29uc3QgXyA9IHtcbiAgIE5PX0NPTlNPTEVfTE9HOiBmYWxzZSxcbiAgIC8vIE5PX0NPTlNPTEVfTE9HOiB0cnVlLFxuXG4gICAvLz09PSBkZXZpY2UgaW5mb1xuICAgaXNBTkRST0lEOiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19BTkRST0lEKSxcbiAgIGlzSU9TOiAoY2Muc3lzLm9zID09IGNjLnN5cy5PU19JT1MpLFxuXG4gICAvLy0tLSBNYXRoXG4gICBtYXg6IE1hdGgubWF4LFxuICAgbWluOiBNYXRoLm1pbixcbiAgIHJvdW5kOiBNYXRoLnJvdW5kLFxuICAgZmxvb3I6IE1hdGguZmxvb3IsXG4gICBjZWlsOiBNYXRoLmNlaWwsXG4gICBzaWduOiBNYXRoLnNpZ24sXG4gICBhYnM6IE1hdGguYWJzLFxuICAgcG93OiBNYXRoLnBvdyxcbiAgIHJhbmRvbTogTWF0aC5yYW5kb20sXG4gICBzcXJ0OiBNYXRoLnNxcnQsXG4gICBzaW46IE1hdGguc2luLFxuICAgY29zOiBNYXRoLmNvcyxcbiAgIHRhbjogTWF0aC50YW4sXG4gICBhdGFuOiBNYXRoLmF0YW4sXG4gICBhdGFuMjogTWF0aC5hdGFuMixcbiAgIGxvZzEwOiBNYXRoLmxvZzEwLFxuICAgUEk6IE1hdGguUEksXG5cbiAgIHJhbmRvbUFyckl0ZW0oYXJyOiBhbnlbXSwgaXNSZW1vdmVJdGVtID0gZmFsc2UpIHtcbiAgICAgIGNvbnN0IGlSYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKTtcbiAgICAgIHJldHVybiAoaXNSZW1vdmVJdGVtID8gYXJyLnNwbGljZShpUmFuZG9tLCAxKVswXSA6IGFycltpUmFuZG9tXSk7XG4gICB9LFxuXG4gICBpc1N0cmluZyh4OiBhbnkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ3N0cmluZyc7XG4gICB9LFxuXG4gICBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjazogYW55KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIHt9LnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgIH0sXG5cbiAgIGxvZyguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgaWYgKCF0aGlzLk5PX0NPTlNPTEVfTE9HKSB0cnkgeyBjb25zb2xlLmxvZyguLi5hcmdzKSB9IGNhdGNoIChlKSB7IH1cbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09IE1pc2NcbiAgIGdldE5ld1V1aWQoKSB7XG4gICAgICByZXR1cm4gdXVpZEluZGV4Kys7XG4gICB9LFxuXG4gICAvLyA9PT09PT09PT09IGFycmF5XG4gICByZW1vdmVBcnJheUl0ZW0oYXJyOiBhbnlbXSwgaXRlbTogYW55KSB7XG4gICAgICBjb25zdCBpbmRleCA9IGFyci5pbmRleE9mKGl0ZW0pO1xuICAgICAgaWYgKGluZGV4ICE9IC0xKSBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgIH0sXG5cbiAgIGFkZFVuaXF1ZUVsZW1Ub0FycihhcnI6IGFueVtdLCBpdGVtOiBhbnkpIHtcbiAgICAgIGlmIChhcnIuaW5jbHVkZXMoaXRlbSkpIHJldHVybjtcbiAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09IG51bWVyaW5nXG4gICByYW5kb21OdW1iZXIobWF4VmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIF8uZmxvb3IoXy5yYW5kb20oKSAqIG1heFZhbHVlKTtcbiAgIH0sXG5cbiAgIHNodWZmbGVBcnJheShhcnIsIGlzQ3JlYXRlTmV3QXJyYXkgPSBmYWxzZSkge1xuICAgICAgY29uc3QgbmV3QXJyID0gaXNDcmVhdGVOZXdBcnJheSA/IFsuLi5hcnJdIDogYXJyO1xuICAgICAgbmV3QXJyLnNvcnQoKCkgPT4gdGhpcy5yYW5kb20oKSA+IDAuNSA/IDEgOiAtMSk7XG4gICAgICByZXR1cm4gbmV3QXJyO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09IHBvc2l0aW9uaW5nXG4gICBkaXJlY3Rpb25WZWMyKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgIHRvcDogY2MudjIoMCwgMSksXG4gICAgICAgICBib3R0b206IGNjLnYyKDAsIC0xKSxcbiAgICAgICAgIGxlZnQ6IGNjLnYyKC0xLCAwKSxcbiAgICAgICAgIHJpZ2h0OiBjYy52MigxLCAwKSxcbiAgICAgIH1cbiAgIH0sXG5cbiAgIHJlc2VydmVkRGlyKGRpcikge1xuICAgICAgcmV0dXJuIHsgdG9wOiAnYm90dG9tJywgYm90dG9tOiAndG9wJywgbGVmdDogJ3JpZ2h0JywgcmlnaHQ6ICdsZWZ0JyB9W2Rpcl07XG4gICB9LFxuXG4gICBnZXRHbG9iYWxQb3Mobm9kZTogY2MuTm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzIuWkVSTyk7XG4gICB9LFxuXG4gICBnZXRHbG9iYWxQb3NEaWZmKG5vZGUxOiBjYy5Ob2RlLCBub2RlMjogY2MuTm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0R2xvYmFsUG9zKG5vZGUyKS5zdWIodGhpcy5nZXRHbG9iYWxQb3Mobm9kZTEpKTtcbiAgIH0sXG5cbiAgIHNldEdsb2JhbFBvc1RvTm9kZShub2RlVG9TZXQ6IGNjLk5vZGUsIHRhcmdldE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGNvbnN0IHRhcmdldEdQb3MgPSB0aGlzLmdldEdsb2JhbFBvcyh0YXJnZXROb2RlKTtcbiAgICAgIGNvbnN0IGxvY2FsUG9zID0gbm9kZVRvU2V0LnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0YXJnZXRHUG9zKTtcbiAgICAgIG5vZGVUb1NldC5zZXRQb3NpdGlvbihsb2NhbFBvcyk7XG4gICB9LFxuXG4gICBzZXRHbG9iYWxQb3Mobm9kZVRvU2V0OiBjYy5Ob2RlLCB0YXJnZXRHUG9zOiBjYy5WZWMyKSB7XG4gICAgICBjb25zdCBsb2NhbFBvcyA9IG5vZGVUb1NldC5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodGFyZ2V0R1Bvcyk7XG4gICAgICBub2RlVG9TZXQuc2V0UG9zaXRpb24obG9jYWxQb3MpO1xuICAgfSxcblxuICAgbW92ZVRvTmV3UGFyZW50S2VlcFBvc2l0aW9uKG5vZGU6IGNjLk5vZGUsIG5ld1BhcmVudE5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIGNvbnN0IGN1ck5vZGVQb3MgPSBuZXdQYXJlbnROb2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMuZ2V0R2xvYmFsUG9zKG5vZGUpKTtcbiAgICAgIG5vZGUucGFyZW50ID0gbmV3UGFyZW50Tm9kZTtcbiAgICAgIG5vZGUuc2V0UG9zaXRpb24oY3VyTm9kZVBvcyk7XG4gICB9LFxuXG5cbiAgIGlzR2xvYmFsT3ZlcmxhcHBpbmcobm9kZTE6IGNjLk5vZGUsIG5vZGUyOiBjYy5Ob2RlKSB7XG4gICAgICByZXR1cm4gY2MuSW50ZXJzZWN0aW9uLnJlY3RSZWN0KG5vZGUxLmdldEJvdW5kaW5nQm94VG9Xb3JsZCgpLCBub2RlMi5nZXRCb3VuZGluZ0JveFRvV29ybGQoKSk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PSBHcnBhaGljcyBMb2dpY1xuXG4gICAvLyBleGFtcGxlIHVzYWdlOlxuICAgLy8gICAgdmFyIGIgPSBiZXppZXIoW1swLCAwLCAwXSwgWzEsIDEsIDFdLCBbMiwgLTMsIDZdXSk7XG4gICAvLyAgICBmb3IgKHZhciB0ID0gMDsgdCA8PSAxMDsgdCsrKSBjb25zb2xlLmxvZyhiKHQvMTApKTtcbiAgIGdldEJlemllclBvaW50RnVuYyhwdHMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgZm9yICh2YXIgYSA9IHB0czsgYS5sZW5ndGggPiAxOyBhID0gYikgIC8vIGRvLi53aGlsZSBsb29wIGluIGRpc2d1aXNlXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgYiA9IFtdLCBqOyBpIDwgYS5sZW5ndGggLSAxOyBpKyspICAvLyBjeWNsZSBvdmVyIGNvbnRyb2wgcG9pbnRzXG4gICAgICAgICAgICAgICBmb3IgKGJbaV0gPSBbXSwgaiA9IDA7IGogPCBhW2ldLmxlbmd0aDsgaisrKSAgLy8gY3ljbGUgb3ZlciBkaW1lbnNpb25zXG4gICAgICAgICAgICAgICAgICBiW2ldW2pdID0gYVtpXVtqXSAqICgxIC0gdCkgKyBhW2kgKyAxXVtqXSAqIHQ7ICAvLyBpbnRlcnBvbGF0aW9uXG4gICAgICAgICByZXR1cm4gYVswXTtcbiAgICAgIH1cbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09IE5vZGVzXG5cbiAgIC8vIGNvcHkgYSBub2RlIHRvIGEgcGFyZW50XG4gICBjb3B5Tm9kZShzb3VyY2VOb2RlOiBjYy5Ob2RlIHwgY2MuUHJlZmFiLCB0YXJnZXRQYXJlbnQ/OiBjYy5Ob2RlKSB7XG4gICAgICBjb25zdCBuZXdOb2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUoc291cmNlTm9kZSk7XG4gICAgICBpZiAodGFyZ2V0UGFyZW50KSBuZXdOb2RlLnBhcmVudCA9IHRhcmdldFBhcmVudDtcbiAgICAgIHJldHVybiBuZXdOb2RlO1xuICAgfSxcblxuICAgc2V0T3JnUHJvcChub2RlOiBjYy5Ob2RlLCBwcm9wTmFtZT86IHN0cmluZykge1xuICAgICAgY29uc3QgZGVmYXVsdFByb3BBcnIgPSBbJ3gnLCAneScsICd3aWR0aCcsICdoZWlnaHQnLCAnb3BhY2l0eSddO1xuICAgICAgaWYgKHByb3BOYW1lKSB0aGlzLmFkZFVuaXF1ZUVsZW1Ub0FycihkZWZhdWx0UHJvcEFyciwgcHJvcE5hbWUpO1xuICAgICAgZGVmYXVsdFByb3BBcnIubWFwKGlQcm9wTmFtZSA9PiB7XG4gICAgICAgICBjb25zdCBvcmdQcm9wTmFtZSA9IGBvcmcke3RoaXMuY2FwaXRhbGl6ZShpUHJvcE5hbWUpfWA7XG4gICAgICAgICBub2RlW29yZ1Byb3BOYW1lXSA9IG5vZGUuaGFzT3duUHJvcGVydHkob3JnUHJvcE5hbWUpID8gbm9kZVtvcmdQcm9wTmFtZV0gOiBub2RlW2lQcm9wTmFtZV07XG4gICAgICB9KTtcbiAgICAgIGlmIChwcm9wTmFtZSkgcmV0dXJuIG5vZGVbYG9yZyR7dGhpcy5jYXBpdGFsaXplKHByb3BOYW1lKX1gXTtcbiAgIH0sXG5cbiAgIC8vIGdldCBmdWxsIHBhdGggb2YgYSBub2RlIHRvIGl0cyBoaWdoZXN0IHBhcmVudFxuICAgZ2V0Tm9kZVBhdGgobm9kZSkge1xuICAgICAgbGV0IHBhdGhBcnIgPSBbbm9kZS5uYW1lXVxuICAgICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgICAgbGV0IHNhZmVDb3VudCA9IDA7XG4gICAgICB3aGlsZSAocGFyZW50ICYmIHNhZmVDb3VudCsrIDwgNTApIHtcbiAgICAgICAgIGlmICghcGFyZW50LnBhcmVudCkgeyBicmVhazsgfVxuICAgICAgICAgcGF0aEFyci5wdXNoKHBhcmVudC5uYW1lKTtcbiAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGF0aEFyci5yZXZlcnNlKCkuam9pbignLycpO1xuICAgfSxcblxuICAgLy8gbWFrZSBhIG5vZGUgc3RyZWNoIHRvIGNvbm5lY3QgMiBwb2ludHMuIFVzZWQgdG8gc2V0IHBvc2l0aW9uICYgbGVuZ3RoIG9mIGEgbGluZS93YWxsIGFzIGNvbmZpZ3VyZWQgcG9zaXRpb25zXG4gICBub2RlQ29ubmVjdDJQb2ludHMobm9kZSwgcDE6IGNjLlZlYzIsIHAyOiBjYy5WZWMyKSB7XG4gICAgICBjb25zdCBkaWZmVmVjID0gcDIuc3ViKHAxKTtcbiAgICAgIG5vZGUuaGVpZ2h0ID0gZGlmZlZlYy5tYWcoKTtcbiAgICAgIG5vZGUuc2V0UG9zaXRpb24ocDEuYWRkKGRpZmZWZWMubXVsKDAuNSkpKTtcbiAgICAgIG5vZGUuYW5nbGUgPSA5MCArIF8ucmFkaWFuVG9EZWdyZWVzKF8uYXRhbjIoZGlmZlZlYy55LCBkaWZmVmVjLngpKTtcbiAgIH0sXG5cbiAgIGdldE5vZGVEaXN0YW5jZShub2RlMTogY2MuTm9kZSwgbm9kZTI6IGNjLk5vZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEdsb2JhbFBvc0RpZmYobm9kZTEsIG5vZGUyKS5tYWcoKTtcbiAgIH0sXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIHJhZGlhblRvRGVncmVlcyhyYWRpYW4pIHtcbiAgICAgIHJldHVybiByYWRpYW4gKiAxODAgLyBNYXRoLlBJO1xuICAgfSxcblxuICAgZGVncmVlc1RvUmFkaWFuKGRlZ3JlZXMpIHtcbiAgICAgIHJldHVybiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbiAgIH0sXG5cbiAgIHZlYzJUb0FuZ2xlKHZlYzI6IGNjLlZlYzIpIHsgIC8vZGVncmVlXG4gICAgICByZXR1cm4gXy5yYWRpYW5Ub0RlZ3JlZXMoXy5hdGFuMih2ZWMyLnksIHZlYzIueCkpO1xuICAgfSxcblxuICAgZm9ybWF0VGltZSh0aW1lSW5TZWMpIHtcbiAgICAgIC8vbGV0IGRhdGUgPSBuZXcgRGF0ZShudWxsKTtcbiAgICAgIC8vZGF0ZS5zZXRTZWNvbmRzKHRpbWVJblNlYyk7IC8vIHNwZWNpZnkgdmFsdWUgZm9yIFNFQ09ORFMgaGVyZVxuICAgICAgLy9yZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSwgOCk7XG4gICAgICAvLyBlLmcuIDE4MjQ1c2VjID0gNSBob3VycyAoNXgzNjAwcykgNCBtaW5zICg0eDYwcykgNXNcblxuICAgICAgLy8gdGhpcy5sb2coJ3RpbWVJblNlYzogJyArIHRpbWVJblNlYyk7XG4gICAgICBsZXQgaG91cnM6IGFueSA9IF8uZmxvb3IodGltZUluU2VjIC8gKDYwICogNjApKTtcbiAgICAgIGxldCBtaW5zOiBhbnkgPSBfLmZsb29yKCh0aW1lSW5TZWMgJSAoNjAgKiA2MCkpIC8gNjApO1xuICAgICAgbGV0IHNlY3M6IGFueSA9IHRpbWVJblNlYyAlICg2MCAqIDYwKSAlIDYwO1xuXG4gICAgICBpZiAoaG91cnMgPCAxMCkgaG91cnMgPSAnMCcgKyBob3VycztcbiAgICAgIGlmIChtaW5zIDwgMTApIG1pbnMgPSAnMCcgKyBtaW5zO1xuICAgICAgaWYgKHNlY3MgPCAxMCkgc2VjcyA9ICcwJyArIHNlY3M7XG5cbiAgICAgIHJldHVybiBob3VycyArICc6JyArIG1pbnMgKyAnOicgKyBzZWNzO1xuICAgfSxcblxuICAgZm9ybWF0TW9uZXkoZ29sZCkge1xuICAgICAgLy8gKG5vIHN1ZmZpeCksIEssIE0sIEIsIFQsIGFhLCBhYiwgYWMsIGFkLCBhZSAuLi5cbiAgICAgIGxldCBkaWdpdHMgPSBfLmZsb29yKE1hdGgubG9nMTAoZ29sZCkpICsgMTtcbiAgICAgIGlmIChkaWdpdHMgPD0gNikge1xuICAgICAgICAgcmV0dXJuIGdvbGQudG9Mb2NhbGVTdHJpbmcoKTtcbiAgICAgIH1cblxuICAgICAgLy8gMU0gd2lsbCB3cml0ZSBhcyAxMDAwS1xuICAgICAgLy8gNTBCIHdpbGwgd3JpdGUgYXMgNTAsMDAwTSBcbiAgICAgIC8vIGJhaWNhbGx5LCBnZXQgdXAgdG8gPjYgZGlnaXRzLCB0aGVuIHN0YXJ0IHNoaWZ0aW5nIGJ5IDEgc3VmZml4XG5cbiAgICAgIC8vIGRpdmlkZSBkaWdpdHMgYnkgM1xuICAgICAgbGV0IHN1ZmZpeGVzID0gWydLJywgJ00nLCAnQicsICdUJ107XG4gICAgICBsZXQgY2h1bmtzID0gXy5mbG9vcigoZGlnaXRzIC0gMSkgLyAzKTtcbiAgICAgIGxldCBzdGFydGluZ0NoYXIgPSAnYSc7XG4gICAgICBsZXQgc3VmZml4O1xuICAgICAgaWYgKGNodW5rcyAtIDIgPD0gMykge1xuICAgICAgICAgc3VmZml4ID0gc3VmZml4ZXNbY2h1bmtzIC0gMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgc3VmZml4ID0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGNodW5rcyAtIDYpIC8gMjYpICsgc3RhcnRpbmdDaGFyLmNoYXJDb2RlQXQoMCkpICsgU3RyaW5nLmZyb21DaGFyQ29kZSgoKGNodW5rcyAtIDYpICUgMjYpICsgc3RhcnRpbmdDaGFyLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdHJ1bmNhdGVkR29sZCA9IF8ucm91bmQoZ29sZCAvIF8ucG93KDEwLCAoY2h1bmtzIC0gMSkgKiAzKSk7XG5cbiAgICAgIHJldHVybiB0cnVuY2F0ZWRHb2xkLnRvTG9jYWxlU3RyaW5nKCkgKyBzdWZmaXg7XG4gICB9LFxuXG4gICBjYXBpdGFsaXplKHN0cikge1xuICAgICAgY29uc3QgYXJyID0gWy4uLnN0cl07XG4gICAgICBhcnJbMF0gPSBhcnJbMF0udG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiBhcnIuam9pbignJyk7XG4gICB9LFxuXG4gICBnZXRJblJhbmdlKG51bSwgbWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBfLm1pbihfLm1heChudW0sIG1pbiksIG1heCk7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09IERhdGUgdGltZSAmIHNjaGVkdWxpbmcgcHJvY2Vzc1xuICAgLi4udGltZUZ1bmN0aW9ucyxcblxuICAgLy8gPT09PT09PT09IGNlY3RvciwgcG9zaXRpb24gJiBjb29yZGluYXRlc1xuICAgLi4uY29vcmRpbmF0ZUZ1bmN0aW9ucyxcblxuXG5cbn07Il19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/all_modules.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '090e8xDLQRAgKX2HKPophnx', 'all_modules');
// script/system/all_modules.ts

"use strict";
// ######## script for services
// (must be included first of all for later modules to use basic functions)
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
// ######## system constant declarations
exports.types = require("./configurations/system_types");
__exportStar(require("../services/utils/utils_common"), exports);
__exportStar(require("./configurations/config_game"), exports);
// ---- level
__exportStar(require("../levels/level_manager"), exports);
// ######## configurations
// ######## primary utilities
__exportStar(require("../services/utils/utils_data"), exports);
__exportStar(require("../services/utils/utils_ui"), exports);
__exportStar(require("../services/utils/utils_anim_fx"), exports);
__exportStar(require("../services/audio"), exports);
__exportStar(require("../services/analytic"), exports);
// ######## system UI, logic, events
__exportStar(require("../system/app_events"), exports);
__exportStar(require("../system/ui-fx/core_fx"), exports);
__exportStar(require("../system/resources_manager"), exports);
__exportStar(require("../system/user"), exports);
__exportStar(require("../system/ui-fx/core_ui"), exports);
__exportStar(require("../system/localization/localize"), exports);
// ######## core game logic
__exportStar(require("../core-game/settings"), exports);
// ---- game logic & flow
__exportStar(require("../core-game/game_mechanic"), exports);
__exportStar(require("../core-game/map_visual"), exports);
__exportStar(require("../core-game/category_list"), exports);
__exportStar(require("../core-game/tutorial"), exports);
__exportStar(require("../core-game/game_flow"), exports);
__exportStar(require("../services/utils_facebook"), exports);
__exportStar(require("../services/video"), exports);
__exportStar(require("../services/inter_ad"), exports);
// social
__exportStar(require("../social/social"), exports);
// ---- control
__exportStar(require("../control/control"), exports);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2FsbF9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsMkVBQTJFOzs7Ozs7Ozs7Ozs7O0FBRTNFLHdDQUF3QztBQUN4Qyx5REFBdUQ7QUFDdkQsaUVBQStDO0FBQy9DLCtEQUE2QztBQUU3QyxhQUFhO0FBQ2IsMERBQXdDO0FBSXhDLDBCQUEwQjtBQUcxQiw2QkFBNkI7QUFDN0IsK0RBQTZDO0FBQzdDLDZEQUEyQztBQUMzQyxrRUFBZ0Q7QUFDaEQsb0RBQWtDO0FBQ2xDLHVEQUFxQztBQUdyQyxvQ0FBb0M7QUFDcEMsdURBQXFDO0FBQ3JDLDBEQUF3QztBQUN4Qyw4REFBNEM7QUFDNUMsaURBQStCO0FBQy9CLDBEQUF3QztBQUN4QyxrRUFBZ0Q7QUFHaEQsMkJBQTJCO0FBRTNCLHdEQUFzQztBQUd0Qyx5QkFBeUI7QUFDekIsNkRBQTJDO0FBQzNDLDBEQUF3QztBQUN4Qyw2REFBMkM7QUFDM0Msd0RBQXNDO0FBQ3RDLHlEQUF1QztBQUV2Qyw2REFBMkM7QUFDM0Msb0RBQWtDO0FBQ2xDLHVEQUFxQztBQUVyQyxTQUFTO0FBQ1QsbURBQWlDO0FBRWpDLGVBQWU7QUFDZixxREFBbUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAjIyMjIyMjIyBzY3JpcHQgZm9yIHNlcnZpY2VzXG4vLyAobXVzdCBiZSBpbmNsdWRlZCBmaXJzdCBvZiBhbGwgZm9yIGxhdGVyIG1vZHVsZXMgdG8gdXNlIGJhc2ljIGZ1bmN0aW9ucylcblxuLy8gIyMjIyMjIyMgc3lzdGVtIGNvbnN0YW50IGRlY2xhcmF0aW9uc1xuZXhwb3J0ICogYXMgdHlwZXMgZnJvbSAnLi9jb25maWd1cmF0aW9ucy9zeXN0ZW1fdHlwZXMnO1xuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvdXRpbHMvdXRpbHNfY29tbW9uJztcbmV4cG9ydCAqIGZyb20gJy4vY29uZmlndXJhdGlvbnMvY29uZmlnX2dhbWUnO1xuXG4vLyAtLS0tIGxldmVsXG5leHBvcnQgKiBmcm9tICcuLi9sZXZlbHMvbGV2ZWxfbWFuYWdlcic7XG5cblxuXG4vLyAjIyMjIyMjIyBjb25maWd1cmF0aW9uc1xuXG5cbi8vICMjIyMjIyMjIHByaW1hcnkgdXRpbGl0aWVzXG5leHBvcnQgKiBmcm9tICcuLi9zZXJ2aWNlcy91dGlscy91dGlsc19kYXRhJztcbmV4cG9ydCAqIGZyb20gJy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzX3VpJztcbmV4cG9ydCAqIGZyb20gJy4uL3NlcnZpY2VzL3V0aWxzL3V0aWxzX2FuaW1fZngnO1xuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvYXVkaW8nO1xuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvYW5hbHl0aWMnO1xuXG5cbi8vICMjIyMjIyMjIHN5c3RlbSBVSSwgbG9naWMsIGV2ZW50c1xuZXhwb3J0ICogZnJvbSAnLi4vc3lzdGVtL2FwcF9ldmVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi4vc3lzdGVtL3VpLWZ4L2NvcmVfZngnO1xuZXhwb3J0ICogZnJvbSAnLi4vc3lzdGVtL3Jlc291cmNlc19tYW5hZ2VyJztcbmV4cG9ydCAqIGZyb20gJy4uL3N5c3RlbS91c2VyJztcbmV4cG9ydCAqIGZyb20gJy4uL3N5c3RlbS91aS1meC9jb3JlX3VpJztcbmV4cG9ydCAqIGZyb20gJy4uL3N5c3RlbS9sb2NhbGl6YXRpb24vbG9jYWxpemUnO1xuXG5cbi8vICMjIyMjIyMjIGNvcmUgZ2FtZSBsb2dpY1xuXG5leHBvcnQgKiBmcm9tICcuLi9jb3JlLWdhbWUvc2V0dGluZ3MnO1xuXG5cbi8vIC0tLS0gZ2FtZSBsb2dpYyAmIGZsb3dcbmV4cG9ydCAqIGZyb20gJy4uL2NvcmUtZ2FtZS9nYW1lX21lY2hhbmljJztcbmV4cG9ydCAqIGZyb20gJy4uL2NvcmUtZ2FtZS9tYXBfdmlzdWFsJztcbmV4cG9ydCAqIGZyb20gJy4uL2NvcmUtZ2FtZS9jYXRlZ29yeV9saXN0JztcbmV4cG9ydCAqIGZyb20gJy4uL2NvcmUtZ2FtZS90dXRvcmlhbCc7XG5leHBvcnQgKiBmcm9tICcuLi9jb3JlLWdhbWUvZ2FtZV9mbG93JztcblxuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvdXRpbHNfZmFjZWJvb2snO1xuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvdmlkZW8nO1xuZXhwb3J0ICogZnJvbSAnLi4vc2VydmljZXMvaW50ZXJfYWQnO1xuXG4vLyBzb2NpYWxcbmV4cG9ydCAqIGZyb20gJy4uL3NvY2lhbC9zb2NpYWwnO1xuXG4vLyAtLS0tIGNvbnRyb2xcbmV4cG9ydCAqIGZyb20gJy4uL2NvbnRyb2wvY29udHJvbCc7XG5cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/configurations/config_game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e2516totLFCXanAqceflU53', 'config_game');
// script/system/configurations/config_game.ts

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configGame = void 0;
var _G = require("../all_modules");
var _ = _G._, $ = _G.$;
var system_data_1 = require("../../system_data/system_data");
exports.configGame = __assign({}, system_data_1.systemData.configGame);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2NvbmZpZ3VyYXRpb25zL2NvbmZpZ19nYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsbUNBQXFDO0FBQzdCLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQiw2REFBMkQ7QUFFOUMsUUFBQSxVQUFVLGdCQUNqQix3QkFBVSxDQUFDLFVBQVUsRUFJMUIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIF9HIGZyb20gJy4uL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmltcG9ydCB7IHN5c3RlbURhdGEgfSBmcm9tICcuLi8uLi9zeXN0ZW1fZGF0YS9zeXN0ZW1fZGF0YSc7XG5cbmV4cG9ydCBjb25zdCBjb25maWdHYW1lID0ge1xuICAgLi4uc3lzdGVtRGF0YS5jb25maWdHYW1lLFxuXG4gICAvLyBvdGhlcnMgY29uZmlnXG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/localize_message.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ae820eHE5lCN78qFNaMnGKN', 'localize_message');
// script/system/localization/localize_message.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportLocalizeMessage = void 0;
var getMultilangugaeFBMessageObj = function (content) {
    return {
        default: content,
        localizations: {
            en_US: content,
            ca_ES: content,
            cs_CZ: content,
            cx_PH: content,
            cy_GB: content,
            da_DK: content,
            de_DE: content,
            eu_ES: content,
            en_UD: content,
            es_LA: content,
            es_ES: content,
            es_MX: content,
            gn_PY: content,
            fi_FI: content,
            fr_FR: content,
            gl_ES: content,
            hu_HU: content,
            it_IT: content,
            ja_JP: content,
            ko_KR: content,
            nb_NO: content,
            nn_NO: content,
            nl_NL: content,
            fy_NL: content,
            pl_PL: content,
            pt_BR: content,
            pt_PT: content,
            ro_RO: content,
            ru_RU: content,
            sk_SK: content,
            sl_SI: content,
            sv_SE: content,
            th_TH: content,
            tr_TR: content,
            ku_TR: content,
            zh_CN: content,
            zh_HK: content,
            zh_TW: content,
            af_ZA: content,
            sq_AL: content,
            hy_AM: content,
            az_AZ: content,
            be_BY: content,
            bn_IN: content,
            bs_BA: content,
            bg_BG: content,
            hr_HR: content,
            nl_BE: content,
            en_GB: content,
            et_EE: content,
            fo_FO: content,
            fr_CA: content,
            ka_GE: content,
            el_GR: content,
            gu_IN: content,
            hi_IN: content,
            is_IS: content,
            id_ID: content,
            ga_IE: content,
            jv_ID: content,
            kn_IN: content,
            kk_KZ: content,
            lv_LV: content,
            lt_LT: content,
            mk_MK: content,
            mg_MG: content,
            ms_MY: content,
            mt_MT: content,
            mr_IN: content,
            mn_MN: content,
            ne_NP: content,
            pa_IN: content,
            sr_RS: content,
            so_SO: content,
            sw_KE: content,
            tl_PH: content,
            ta_IN: content,
            te_IN: content,
            ml_IN: content,
            uk_UA: content,
            uz_UZ: content,
            vi_VN: content,
            km_KH: content,
            tg_TJ: content,
            ar_AR: content,
            he_IL: content,
            ur_PK: content,
            fa_IR: content,
            ps_AF: content,
            my_MM: content,
            qz_MM: content,
            or_IN: content,
            si_LK: content,
            rw_RW: content,
            cb_IQ: content,
            ha_NG: content,
            ja_KS: content,
            br_FR: content,
            tz_MA: content,
            co_FR: content,
            as_IN: content,
            ff_NG: content,
            sc_IT: content,
            sz_PL: content,
        }
    };
};
exports.supportLocalizeMessage = { getMultilangugaeFBMessageObj: getMultilangugaeFBMessageObj };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sb2NhbGl6ZV9tZXNzYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sNEJBQTRCLEdBQUcsVUFBQyxPQUFPO0lBQ3pDLE9BQU87UUFDSCxPQUFPLEVBQUUsT0FBTztRQUNoQixhQUFhLEVBQUU7WUFDWCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1NBQ2pCO0tBQ0osQ0FBQztBQUVOLENBQUMsQ0FBQTtBQUVZLFFBQUEsc0JBQXNCLEdBQUcsRUFBRSw0QkFBNEIsOEJBQUEsRUFBRSxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZ2V0TXVsdGlsYW5ndWdhZUZCTWVzc2FnZU9iaiA9IChjb250ZW50KSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVmYXVsdDogY29udGVudCxcbiAgICAgICAgbG9jYWxpemF0aW9uczoge1xuICAgICAgICAgICAgZW5fVVM6IGNvbnRlbnQsXG4gICAgICAgICAgICBjYV9FUzogY29udGVudCxcbiAgICAgICAgICAgIGNzX0NaOiBjb250ZW50LFxuICAgICAgICAgICAgY3hfUEg6IGNvbnRlbnQsXG4gICAgICAgICAgICBjeV9HQjogY29udGVudCxcbiAgICAgICAgICAgIGRhX0RLOiBjb250ZW50LFxuICAgICAgICAgICAgZGVfREU6IGNvbnRlbnQsXG4gICAgICAgICAgICBldV9FUzogY29udGVudCxcbiAgICAgICAgICAgIGVuX1VEOiBjb250ZW50LFxuICAgICAgICAgICAgZXNfTEE6IGNvbnRlbnQsXG4gICAgICAgICAgICBlc19FUzogY29udGVudCxcbiAgICAgICAgICAgIGVzX01YOiBjb250ZW50LFxuICAgICAgICAgICAgZ25fUFk6IGNvbnRlbnQsXG4gICAgICAgICAgICBmaV9GSTogY29udGVudCxcbiAgICAgICAgICAgIGZyX0ZSOiBjb250ZW50LFxuICAgICAgICAgICAgZ2xfRVM6IGNvbnRlbnQsXG4gICAgICAgICAgICBodV9IVTogY29udGVudCxcbiAgICAgICAgICAgIGl0X0lUOiBjb250ZW50LFxuICAgICAgICAgICAgamFfSlA6IGNvbnRlbnQsXG4gICAgICAgICAgICBrb19LUjogY29udGVudCxcbiAgICAgICAgICAgIG5iX05POiBjb250ZW50LFxuICAgICAgICAgICAgbm5fTk86IGNvbnRlbnQsXG4gICAgICAgICAgICBubF9OTDogY29udGVudCxcbiAgICAgICAgICAgIGZ5X05MOiBjb250ZW50LFxuICAgICAgICAgICAgcGxfUEw6IGNvbnRlbnQsXG4gICAgICAgICAgICBwdF9CUjogY29udGVudCxcbiAgICAgICAgICAgIHB0X1BUOiBjb250ZW50LFxuICAgICAgICAgICAgcm9fUk86IGNvbnRlbnQsXG4gICAgICAgICAgICBydV9SVTogY29udGVudCxcbiAgICAgICAgICAgIHNrX1NLOiBjb250ZW50LFxuICAgICAgICAgICAgc2xfU0k6IGNvbnRlbnQsXG4gICAgICAgICAgICBzdl9TRTogY29udGVudCxcbiAgICAgICAgICAgIHRoX1RIOiBjb250ZW50LFxuICAgICAgICAgICAgdHJfVFI6IGNvbnRlbnQsXG4gICAgICAgICAgICBrdV9UUjogY29udGVudCxcbiAgICAgICAgICAgIHpoX0NOOiBjb250ZW50LFxuICAgICAgICAgICAgemhfSEs6IGNvbnRlbnQsXG4gICAgICAgICAgICB6aF9UVzogY29udGVudCxcbiAgICAgICAgICAgIGFmX1pBOiBjb250ZW50LFxuICAgICAgICAgICAgc3FfQUw6IGNvbnRlbnQsXG4gICAgICAgICAgICBoeV9BTTogY29udGVudCxcbiAgICAgICAgICAgIGF6X0FaOiBjb250ZW50LFxuICAgICAgICAgICAgYmVfQlk6IGNvbnRlbnQsXG4gICAgICAgICAgICBibl9JTjogY29udGVudCxcbiAgICAgICAgICAgIGJzX0JBOiBjb250ZW50LFxuICAgICAgICAgICAgYmdfQkc6IGNvbnRlbnQsXG4gICAgICAgICAgICBocl9IUjogY29udGVudCxcbiAgICAgICAgICAgIG5sX0JFOiBjb250ZW50LFxuICAgICAgICAgICAgZW5fR0I6IGNvbnRlbnQsXG4gICAgICAgICAgICBldF9FRTogY29udGVudCxcbiAgICAgICAgICAgIGZvX0ZPOiBjb250ZW50LFxuICAgICAgICAgICAgZnJfQ0E6IGNvbnRlbnQsXG4gICAgICAgICAgICBrYV9HRTogY29udGVudCxcbiAgICAgICAgICAgIGVsX0dSOiBjb250ZW50LFxuICAgICAgICAgICAgZ3VfSU46IGNvbnRlbnQsXG4gICAgICAgICAgICBoaV9JTjogY29udGVudCxcbiAgICAgICAgICAgIGlzX0lTOiBjb250ZW50LFxuICAgICAgICAgICAgaWRfSUQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBnYV9JRTogY29udGVudCxcbiAgICAgICAgICAgIGp2X0lEOiBjb250ZW50LFxuICAgICAgICAgICAga25fSU46IGNvbnRlbnQsXG4gICAgICAgICAgICBra19LWjogY29udGVudCxcbiAgICAgICAgICAgIGx2X0xWOiBjb250ZW50LFxuICAgICAgICAgICAgbHRfTFQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBta19NSzogY29udGVudCxcbiAgICAgICAgICAgIG1nX01HOiBjb250ZW50LFxuICAgICAgICAgICAgbXNfTVk6IGNvbnRlbnQsXG4gICAgICAgICAgICBtdF9NVDogY29udGVudCxcbiAgICAgICAgICAgIG1yX0lOOiBjb250ZW50LFxuICAgICAgICAgICAgbW5fTU46IGNvbnRlbnQsXG4gICAgICAgICAgICBuZV9OUDogY29udGVudCxcbiAgICAgICAgICAgIHBhX0lOOiBjb250ZW50LFxuICAgICAgICAgICAgc3JfUlM6IGNvbnRlbnQsXG4gICAgICAgICAgICBzb19TTzogY29udGVudCxcbiAgICAgICAgICAgIHN3X0tFOiBjb250ZW50LFxuICAgICAgICAgICAgdGxfUEg6IGNvbnRlbnQsXG4gICAgICAgICAgICB0YV9JTjogY29udGVudCxcbiAgICAgICAgICAgIHRlX0lOOiBjb250ZW50LFxuICAgICAgICAgICAgbWxfSU46IGNvbnRlbnQsXG4gICAgICAgICAgICB1a19VQTogY29udGVudCxcbiAgICAgICAgICAgIHV6X1VaOiBjb250ZW50LFxuICAgICAgICAgICAgdmlfVk46IGNvbnRlbnQsXG4gICAgICAgICAgICBrbV9LSDogY29udGVudCxcbiAgICAgICAgICAgIHRnX1RKOiBjb250ZW50LFxuICAgICAgICAgICAgYXJfQVI6IGNvbnRlbnQsXG4gICAgICAgICAgICBoZV9JTDogY29udGVudCxcbiAgICAgICAgICAgIHVyX1BLOiBjb250ZW50LFxuICAgICAgICAgICAgZmFfSVI6IGNvbnRlbnQsXG4gICAgICAgICAgICBwc19BRjogY29udGVudCxcbiAgICAgICAgICAgIG15X01NOiBjb250ZW50LFxuICAgICAgICAgICAgcXpfTU06IGNvbnRlbnQsXG4gICAgICAgICAgICBvcl9JTjogY29udGVudCxcbiAgICAgICAgICAgIHNpX0xLOiBjb250ZW50LFxuICAgICAgICAgICAgcndfUlc6IGNvbnRlbnQsXG4gICAgICAgICAgICBjYl9JUTogY29udGVudCxcbiAgICAgICAgICAgIGhhX05HOiBjb250ZW50LFxuICAgICAgICAgICAgamFfS1M6IGNvbnRlbnQsXG4gICAgICAgICAgICBicl9GUjogY29udGVudCxcbiAgICAgICAgICAgIHR6X01BOiBjb250ZW50LFxuICAgICAgICAgICAgY29fRlI6IGNvbnRlbnQsXG4gICAgICAgICAgICBhc19JTjogY29udGVudCxcbiAgICAgICAgICAgIGZmX05HOiBjb250ZW50LFxuICAgICAgICAgICAgc2NfSVQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBzel9QTDogY29udGVudCxcbiAgICAgICAgfVxuICAgIH07XG5cbn1cblxuZXhwb3J0IGNvbnN0IHN1cHBvcnRMb2NhbGl6ZU1lc3NhZ2UgPSB7IGdldE11bHRpbGFuZ3VnYWVGQk1lc3NhZ2VPYmogfVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/en_US.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0dc5MvQdREN7dWh2ZAwfX1', 'en_US');
// script/system/localization/language-files/en_US.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'SHARE',
    common_label_reward: 'REWARD',
    common_label_claim: 'CLAIM',
    common_label_button_play: 'PLAY',
    common_label_level_intro: 'LEVEL',
    label_loading_ad: 'Loading ads. Please wait',
    label_game_loading: 'LOADING',
    label_game_continue: 'CONTINUE',
    label_game_play_more_puzzle: 'MORE PUZZLES',
    label_gameplay_select_difficulty: 'SELECT DIFFICULTY',
    label_fx_video_error: 'Video error',
    label_settings_music: 'MUSIC',
    label_settings_sound: 'SOUNDS',
    label_tut_step_1: "Click on two pieces to move\nthem and place them correctly",
    label_tut_step_2: function () { return "Click here and pay " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> to\nsolve a couple of pieces."; },
    label_tut_step_3: "The time limit for each\npuzzle will depend on the\nnumber of pieces.\n\nDon't let it run out!",
    label_tut_btn_continue: 'CONTINUE',
    label_alert_intro: "WATCH A VIDEO TO\nEARN " + _G.configGame.videoCoinReward + " COINS",
    label_alert_back: 'NO',
    label_alert_earn_stars: 'YES',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'DO YOU WANT\nTO RESUME\nTHE GAME?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'GAME OVER',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'TRY AGAIN',
    label_gameover_no_thanks: 'NO, THANKS',
    label_home_button_play_w_friends: 'PLAY WITH\nFRIENDS',
    label_share_intro_1: 'Can you beat me?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Well done!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} invites you to solve a puzzle!`,
    fb_invite_message_text: function (playerName) { return "I invite you to solve this Puzzle"; },
    fb_invite_message_cta: 'PLAY NOW',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9lbl9VUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE9BQU87SUFDM0IsbUJBQW1CLEVBQUUsUUFBUTtJQUM3QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSwwQkFBMEI7SUFFNUMsa0JBQWtCLEVBQUUsU0FBUztJQUM3QixtQkFBbUIsRUFBRSxVQUFVO0lBQy9CLDJCQUEyQixFQUFFLGNBQWM7SUFDM0MsZ0NBQWdDLEVBQUUsbUJBQW1CO0lBRXJELG9CQUFvQixFQUFFLGFBQWE7SUFFbkMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxRQUFRO0lBRTlCLGdCQUFnQixFQUFFLDREQUE0RDtJQUM5RSxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsd0JBQXNCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSwrRUFBMEUsRUFBM0gsQ0FBMkg7SUFDbkosZ0JBQWdCLEVBQUUsZ0dBQWdHO0lBQ2xILHNCQUFzQixFQUFFLFVBQVU7SUFHbEMsaUJBQWlCLEVBQUUsNEJBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxXQUFRO0lBQ2xGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsc0JBQXNCLEVBQUUsS0FBSztJQUU3QixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSxtQ0FBbUM7SUFDdEQsa0JBQWtCLEVBQUUsT0FBTztJQUUzQixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLDBCQUEwQixFQUFFLFFBQVE7SUFDcEMsNEJBQTRCLEVBQUUsV0FBVztJQUN6Qyx3QkFBd0IsRUFBRSxZQUFZO0lBRXRDLGdDQUFnQyxFQUFFLG9CQUFvQjtJQUV0RCxtQkFBbUIsRUFBRSxrQkFBa0I7SUFDdkMsbUJBQW1CLEVBQUUsUUFBUTtJQUU3QixtQkFBbUIsRUFBRSxZQUFZO0lBRWpDLCtCQUErQixFQUFFLFVBQUEsQ0FBQzs7UUFDL0IsbUJBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQiwyQ0FBRyxXQUFXLEdBQUc7SUFDbEksQ0FBQztJQUdELHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsd0ZBQXdGO0lBQ3hGLHNCQUFzQixFQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsbUNBQW1DLEVBQW5DLENBQW1DO0lBQ3pFLHFCQUFxQixFQUFFLFVBQVU7Q0FFbkMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0ID0ge1xuICAgY29tbW9uX2xhYmVsX3NoYXJlOiAnU0hBUkUnLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ1JFV0FSRCcsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdDTEFJTScsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdQTEFZJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ0xFVkVMJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0xvYWRpbmcgYWRzLiBQbGVhc2Ugd2FpdCcsXG5cbiAgIGxhYmVsX2dhbWVfbG9hZGluZzogJ0xPQURJTkcnLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0NPTlRJTlVFJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ01PUkUgUFVaWkxFUycsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1NFTEVDVCBESUZGSUNVTFRZJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICdWaWRlbyBlcnJvcicsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUMnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTT1VORFMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgQ2xpY2sgb24gdHdvIHBpZWNlcyB0byBtb3ZlXFxudGhlbSBhbmQgcGxhY2UgdGhlbSBjb3JyZWN0bHlgLFxuICAgbGFiZWxfdHV0X3N0ZXBfMjogKCkgPT4gYENsaWNrIGhlcmUgYW5kIHBheSAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX0gPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPiB0b1xcbnNvbHZlIGEgY291cGxlIG9mIHBpZWNlcy5gLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgVGhlIHRpbWUgbGltaXQgZm9yIGVhY2hcXG5wdXp6bGUgd2lsbCBkZXBlbmQgb24gdGhlXFxubnVtYmVyIG9mIHBpZWNlcy5cXG5cXG5Eb24ndCBsZXQgaXQgcnVuIG91dCFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVFJyxcblxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYFdBVENIIEEgVklERU8gVE9cXG5FQVJOICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IENPSU5TYCxcbiAgIGxhYmVsX2FsZXJ0X2JhY2s6ICdOTycsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnWUVTJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTEVWRUwgVVAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnRE8gWU9VIFdBTlRcXG5UTyBSRVNVTUVcXG5USEUgR0FNRT8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAnUEFVU0UnLFxuXG4gICBsYWJlbF9nYW1lb3Zlcl9oZWFkZXI6ICdHQU1FIE9WRVInLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdTQ09SRTonLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ1RSWSBBR0FJTicsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdOTywgVEhBTktTJyxcblxuICAgbGFiZWxfaG9tZV9idXR0b25fcGxheV93X2ZyaWVuZHM6ICdQTEFZIFdJVEhcXG5GUklFTkRTJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ0NhbiB5b3UgYmVhdCBtZT8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1NDT1JFOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdXZWxsIGRvbmUhJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gaW52aXRlcyB5b3UgdG8gc29sdmUgYSBwdXp6bGUhYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYEkgaW52aXRlIHlvdSB0byBzb2x2ZSB0aGlzIFB1enpsZWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdQTEFZIE5PVycsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/es_ES.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4c10caNiZJG8Ykko04yJeYq', 'es_ES');
// script/system/localization/language-files/es_ES.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'COMPARTIR',
    common_label_reward: 'RECOMPENSA',
    common_label_claim: 'RECLAMAR',
    common_label_button_play: 'JUGAR',
    common_label_level_intro: 'NIVEL',
    label_loading_ad: 'Cargando anuncios.. Por favor espera',
    label_game_loading: 'CARGANDO',
    label_game_continue: 'CONTINUAR',
    label_game_play_more_puzzle: 'MÁS PUZZLES',
    label_gameplay_select_difficulty: 'SELECCIONAR DIFICULTAD',
    label_fx_video_error: 'Error de video',
    label_settings_music: 'MUSICA',
    label_settings_sound: 'SONIDOS',
    label_tut_step_1: "Haz clic en dos piezas para\nmoverlas y colocarlas correctamente",
    label_tut_step_2: function () { return "Clic aqu\u00ED y paga " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> monedas \npara resolver un par de piezas"; },
    label_tut_step_3: "El tiempo l\u00EDmite\ndepende de la dificultad\nde cada puzzle\n\n\u00A1No dejes que se agote!",
    label_tut_btn_continue: 'CONTINUAR',
    label_alert_intro: "VE UN VIDEO PARA\nGANAR " + _G.configGame.videoCoinReward + " MONEDAS",
    label_alert_back: 'NO',
    label_alert_earn_stars: 'SÍ',
    label_level_up_header: '¡SUBISTE NIVEL!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: '¿QUIERES REANUDAR\nEL JUEGO?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'JUEGO TERMINADO',
    label_gameover_score_intro: 'PUNTOS:',
    label_gameover_btn_try_again: 'INTENTAR DE NUEVO',
    label_gameover_no_thanks: 'NO, GRACIAS',
    label_home_button_play_w_friends: 'JUGAR CON\nAMIGOS',
    label_share_intro_1: 'Puedes vencerme?',
    label_share_intro_2: 'PUNTOS:',
    label_win_well_done: '¡Bien hecho!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Te invita a resolver este puzzle!`,
    fb_invite_message_text: function (playerName) { return "Te invito a resolver este puzzle"; },
    fb_invite_message_cta: 'JUGAR',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9lc19FUy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFdBQVc7SUFDL0IsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSxzQ0FBc0M7SUFFeEQsa0JBQWtCLEVBQUUsVUFBVTtJQUM5QixtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLGFBQWE7SUFDMUMsZ0NBQWdDLEVBQUUsd0JBQXdCO0lBRTFELG9CQUFvQixFQUFFLGdCQUFnQjtJQUV0QyxvQkFBb0IsRUFBRSxRQUFRO0lBQzlCLG9CQUFvQixFQUFFLFNBQVM7SUFFL0IsZ0JBQWdCLEVBQUUsa0VBQWtFO0lBQ3BGLGdCQUFnQixFQUFFLGNBQU0sT0FBQSwyQkFBb0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLDBGQUFxRixFQUFwSSxDQUFvSTtJQUM1SixnQkFBZ0IsRUFBRSxpR0FBdUY7SUFDekcsc0JBQXNCLEVBQUUsV0FBVztJQUVuQyxpQkFBaUIsRUFBRSw2QkFBMkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLGFBQVU7SUFDckYsZ0JBQWdCLEVBQUUsSUFBSTtJQUN0QixzQkFBc0IsRUFBRSxJQUFJO0lBRTVCLHFCQUFxQixFQUFFLGlCQUFpQjtJQUN4Qyx5QkFBeUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUcsQ0FBRyxFQUFOLENBQU07SUFFeEMsaUJBQWlCLEVBQUUsOEJBQThCO0lBQ2pELGtCQUFrQixFQUFFLE9BQU87SUFFM0IscUJBQXFCLEVBQUUsaUJBQWlCO0lBQ3hDLDBCQUEwQixFQUFFLFNBQVM7SUFDckMsNEJBQTRCLEVBQUUsbUJBQW1CO0lBQ2pELHdCQUF3QixFQUFFLGFBQWE7SUFFdkMsZ0NBQWdDLEVBQUUsbUJBQW1CO0lBRXJELG1CQUFtQixFQUFFLGtCQUFrQjtJQUN2QyxtQkFBbUIsRUFBRSxTQUFTO0lBRTlCLG1CQUFtQixFQUFFLGNBQWM7SUFFbkMsK0JBQStCLEVBQUUsVUFBQSxDQUFDOztRQUMvQixtQkFBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBZixDQUFlLENBQUMsMENBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLDJDQUFHLFdBQVcsR0FBRztJQUNsSSxDQUFDO0lBSUQscUNBQXFDO0lBQ3JDLHNCQUFzQjtJQUN0QiwyRkFBMkY7SUFDM0Ysc0JBQXNCLEVBQUUsVUFBQSxVQUFVLElBQUksT0FBQSxrQ0FBa0MsRUFBbEMsQ0FBa0M7SUFDeEUscUJBQXFCLEVBQUUsT0FBTztDQUVoQyxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5leHBvcnQgPSB7XG4gICBjb21tb25fbGFiZWxfc2hhcmU6ICdDT01QQVJUSVInLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ1JFQ09NUEVOU0EnLFxuICAgY29tbW9uX2xhYmVsX2NsYWltOiAnUkVDTEFNQVInLFxuICAgY29tbW9uX2xhYmVsX2J1dHRvbl9wbGF5OiAnSlVHQVInLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAnTklWRUwnLFxuXG4gICBsYWJlbF9sb2FkaW5nX2FkOiAnQ2FyZ2FuZG8gYW51bmNpb3MuLiBQb3IgZmF2b3IgZXNwZXJhJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAnQ0FSR0FORE8nLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0NPTlRJTlVBUicsXG4gICBsYWJlbF9nYW1lX3BsYXlfbW9yZV9wdXp6bGU6ICdNw4FTIFBVWlpMRVMnLFxuICAgbGFiZWxfZ2FtZXBsYXlfc2VsZWN0X2RpZmZpY3VsdHk6ICdTRUxFQ0NJT05BUiBESUZJQ1VMVEFEJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICdFcnJvciBkZSB2aWRlbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUNBJyxcbiAgIGxhYmVsX3NldHRpbmdzX3NvdW5kOiAnU09OSURPUycsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGBIYXogY2xpYyBlbiBkb3MgcGllemFzIHBhcmFcXG5tb3ZlcmxhcyB5IGNvbG9jYXJsYXMgY29ycmVjdGFtZW50ZWAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQ2xpYyBhcXXDrSB5IHBhZ2EgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gbW9uZWRhcyBcXG5wYXJhIHJlc29sdmVyIHVuIHBhciBkZSBwaWV6YXNgLCAgLy8gdGhpcyBsYWJlbCBpcyBSaWNoVGV4dC4gXCJpY29uX2NvaW5cIiBpcyBzcHJpdGUgbmFtZSBpbiB0aGUgbGlua2VkIGF0bGFzLlxuICAgbGFiZWxfdHV0X3N0ZXBfMzogYEVsIHRpZW1wbyBsw61taXRlXFxuZGVwZW5kZSBkZSBsYSBkaWZpY3VsdGFkXFxuZGUgY2FkYSBwdXp6bGVcXG5cXG7CoU5vIGRlamVzIHF1ZSBzZSBhZ290ZSFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVBUicsXG5cbiAgIGxhYmVsX2FsZXJ0X2ludHJvOiBgVkUgVU4gVklERU8gUEFSQVxcbkdBTkFSICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IE1PTkVEQVNgLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ05PJyxcbiAgIGxhYmVsX2FsZXJ0X2Vhcm5fc3RhcnM6ICdTw40nLFxuXG4gICBsYWJlbF9sZXZlbF91cF9oZWFkZXI6ICfCoVNVQklTVEUgTklWRUwhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnwr9RVUlFUkVTIFJFQU5VREFSXFxuRUwgSlVFR08/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ1BBVVNFJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAnSlVFR08gVEVSTUlOQURPJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAnUFVOVE9TOicsXG4gICBsYWJlbF9nYW1lb3Zlcl9idG5fdHJ5X2FnYWluOiAnSU5URU5UQVIgREUgTlVFVk8nLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTk8sIEdSQUNJQVMnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ0pVR0FSIENPTlxcbkFNSUdPUycsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICdQdWVkZXMgdmVuY2VybWU/JyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICdQVU5UT1M6JyxcblxuICAgbGFiZWxfd2luX3dlbGxfZG9uZTogJ8KhQmllbiBoZWNobyEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IFRlIGludml0YSBhIHJlc29sdmVyIGVzdGUgcHV6emxlIWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGBUZSBpbnZpdG8gYSByZXNvbHZlciBlc3RlIHB1enpsZWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdKVUdBUicsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/it_IT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fe7d8rtYilGzZPJ5JyltzKp', 'it_IT');
// script/system/localization/language-files/it_IT.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'CONDIVIDI',
    common_label_reward: 'RICOMPENSA',
    common_label_claim: 'RISCATTA',
    common_label_button_play: 'GIOCA',
    common_label_level_intro: 'LIVELLO',
    label_loading_ad: 'Caricamento annunci in corso. Attendi',
    label_game_loading: 'CARICANDO',
    label_game_continue: 'CONTINUA',
    label_game_play_more_puzzle: 'PIÙ PUZZLE',
    label_gameplay_select_difficulty: 'SELEZIONA DIFFICOLTÀ:',
    label_fx_video_error: 'Errore video',
    label_settings_music: 'MUSICA',
    label_settings_sound: 'SUONI',
    label_tut_step_1: "Clicca su due pezzi per muoverli\ne posizionali correttamente",
    label_tut_step_2: function () { return "Clicca qui e paga " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> \nper risolvere alcuni pezzi"; },
    label_tut_step_3: "Il tempo limite di\nogni puzzle dipender\u00E0\ndal numero di pezzi.\n\nNon farlo finire!",
    label_tut_btn_continue: 'CONTINUA',
    label_alert_intro: "GUARDA IL VIDEO PER\nGUADAGNARE " + _G.configGame.videoCoinReward + " MONETE",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'SÌ',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VUOI RIPRENDERE\nIL GIOCO?',
    label_pause_header: 'PAUSA',
    label_gameover_header: 'FINE DEL GIOCO',
    label_gameover_score_intro: 'PUNTEGGIO:',
    label_gameover_btn_try_again: 'PROVA DI NUOVO',
    label_gameover_no_thanks: 'NO, GRAZIE',
    label_home_button_play_w_friends: 'GIOCA CON\nGLI AMICI',
    label_share_intro_1: 'Riesci a battermi?',
    label_share_intro_2: 'PUNTEGGIO:',
    label_win_well_done: 'Molto bene!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Vi invita a risolvere il puzzle!`,
    fb_invite_message_text: function (playerName) { return "Ti invito a risolvere questo Puzzle"; },
    fb_invite_message_cta: 'GIOCA',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9pdF9JVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFdBQVc7SUFDL0IsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsU0FBUztJQUVuQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7SUFFekQsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixtQkFBbUIsRUFBRSxVQUFVO0lBQy9CLDJCQUEyQixFQUFFLFlBQVk7SUFDekMsZ0NBQWdDLEVBQUUsdUJBQXVCO0lBRXpELG9CQUFvQixFQUFFLGNBQWM7SUFFcEMsb0JBQW9CLEVBQUUsUUFBUTtJQUM5QixvQkFBb0IsRUFBRSxPQUFPO0lBRTdCLGdCQUFnQixFQUFFLCtEQUErRDtJQUNqRixnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsdUJBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw4RUFBeUUsRUFBekgsQ0FBeUg7SUFDakosZ0JBQWdCLEVBQUUsMkZBQXNGO0lBQ3hHLHNCQUFzQixFQUFFLFVBQVU7SUFFbEMsaUJBQWlCLEVBQUUscUNBQW1DLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxZQUFTO0lBQzVGLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsc0JBQXNCLEVBQUUsSUFBSTtJQUU1QixxQkFBcUIsRUFBRSxXQUFXO0lBQ2xDLHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSw0QkFBNEI7SUFDL0Msa0JBQWtCLEVBQUUsT0FBTztJQUUzQixxQkFBcUIsRUFBRSxnQkFBZ0I7SUFDdkMsMEJBQTBCLEVBQUUsWUFBWTtJQUN4Qyw0QkFBNEIsRUFBRSxnQkFBZ0I7SUFDOUMsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxzQkFBc0I7SUFFeEQsbUJBQW1CLEVBQUUsb0JBQW9CO0lBQ3pDLG1CQUFtQixFQUFFLFlBQVk7SUFFakMsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDBGQUEwRjtJQUMxRixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHFDQUFxQyxFQUFyQyxDQUFxQztJQUMzRSxxQkFBcUIsRUFBRSxPQUFPO0NBRWhDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ0NPTkRJVklESScsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnUklDT01QRU5TQScsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdSSVNDQVRUQScsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdHSU9DQScsXG4gICBjb21tb25fbGFiZWxfbGV2ZWxfaW50cm86ICdMSVZFTExPJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0NhcmljYW1lbnRvIGFubnVuY2kgaW4gY29yc28uIEF0dGVuZGknLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdDQVJJQ0FORE8nLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0NPTlRJTlVBJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ1BJw5kgUFVaWkxFJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnU0VMRVpJT05BIERJRkZJQ09MVMOAOicsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAnRXJyb3JlIHZpZGVvJyxcblxuICAgbGFiZWxfc2V0dGluZ3NfbXVzaWM6ICdNVVNJQ0EnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTVU9OSScsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGBDbGljY2Egc3UgZHVlIHBlenppIHBlciBtdW92ZXJsaVxcbmUgcG9zaXppb25hbGkgY29ycmV0dGFtZW50ZWAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQ2xpY2NhIHF1aSBlIHBhZ2EgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gXFxucGVyIHJpc29sdmVyZSBhbGN1bmkgcGV6emlgLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgSWwgdGVtcG8gbGltaXRlIGRpXFxub2duaSBwdXp6bGUgZGlwZW5kZXLDoFxcbmRhbCBudW1lcm8gZGkgcGV6emkuXFxuXFxuTm9uIGZhcmxvIGZpbmlyZSFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVBJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGBHVUFSREEgSUwgVklERU8gUEVSXFxuR1VBREFHTkFSRSAke19HLmNvbmZpZ0dhbWUudmlkZW9Db2luUmV3YXJkfSBNT05FVEVgLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ05PTicsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnU8OMJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTEVWRUwgVVAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnVlVPSSBSSVBSRU5ERVJFXFxuSUwgR0lPQ08/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ1BBVVNBJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAnRklORSBERUwgR0lPQ08nLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdQVU5URUdHSU86JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdQUk9WQSBESSBOVU9WTycsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdOTywgR1JBWklFJyxcblxuICAgbGFiZWxfaG9tZV9idXR0b25fcGxheV93X2ZyaWVuZHM6ICdHSU9DQSBDT05cXG5HTEkgQU1JQ0knLFxuXG4gICBsYWJlbF9zaGFyZV9pbnRyb18xOiAnUmllc2NpIGEgYmF0dGVybWk/JyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICdQVU5URUdHSU86JyxcblxuICAgbGFiZWxfd2luX3dlbGxfZG9uZTogJ01vbHRvIGJlbmUhJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gVmkgaW52aXRhIGEgcmlzb2x2ZXJlIGlsIHB1enpsZSFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgVGkgaW52aXRvIGEgcmlzb2x2ZXJlIHF1ZXN0byBQdXp6bGVgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfY3RhOiAnR0lPQ0EnLFxuXG59XG5cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/utils/utils_time.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9b241Zt2BFFa5XMWEu3uey', 'utils_time');
// script/services/utils/utils_time.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../../system/all_modules");
var $ = _G.$;
var timerUuidIndex = 1e5; // uuid to set as names of objects => help identifying objects
exports.default = {
    // get current time UTC - milliseconds from 1970 to now
    getMsPassedUTC: function () {
        return (new Date()).getTime();
    },
    // get current Pacific Time (PT)  - milliseconds from 1970 to now
    // * Warning: Dont use result (finalPassedMs) to convert back to Date() object - new Date(getMsPassedPT), will results in wrong time
    getMsPassedPT: function () {
        var pacificTimeOffset = this.getPacificTimeOffset();
        var msPassedInPTNow = this.getMsPassedUTC() + pacificTimeOffset * 60 * 60 * 1000;
        return msPassedInPTNow;
    },
    getTimePT: function (dateObj) {
        if (dateObj === void 0) { dateObj = new Date(); }
        var pacificTimeOffset = this.getPacificTimeOffset(dateObj);
        var utcHour = dateObj.getHours() + dateObj.getTimezoneOffset() / 60;
        dateObj.setHours(utcHour + pacificTimeOffset);
        // _.log(`dateObj = ${dateObj} // pacificTimeOffset=${pacificTimeOffset} // dateObj.getTimezoneOffset()=${dateObj.getTimezoneOffset()} // utcHour=${utcHour} // utcHour + pacificTimeOffset=${utcHour + pacificTimeOffset}  `)
        return dateObj;
    },
    isSameDate: function (dateObj1, dateObj2) {
        return dateObj1.getFullYear() == dateObj2.getFullYear()
            && dateObj1.getMonth() == dateObj2.getMonth()
            && dateObj1.getDate() == dateObj2.getDate();
    },
    // get total ms to midnight of current day in PT
    getTotalMsToMidnightPT: function () {
        var msOf1Day = 24 * 60 * 60 * 1000;
        var nowPT = this.getMsPassedPT();
        var msToMidNight = msOf1Day - (nowPT % msOf1Day);
        return msToMidNight;
    },
    // get Daylight Saving Time start & end of current year
    // * Since 2007 DST begins on the second sunday of March,
    // * and ends on the first sunday of November.
    getDSTStartEndDate: function (dateObj) {
        var currentDate = dateObj || new Date();
        var currentYear = currentDate.getFullYear();
        // DST Start
        var firstOfMarch = new Date(currentYear, 2, 1);
        var daysUntilFirstSundayInMarch = (7 - firstOfMarch.getDay()) % 7;
        var secondSundayInMarch = firstOfMarch.getDate() + daysUntilFirstSundayInMarch + 7;
        var dstStartDate = new Date(currentYear, 2, secondSundayInMarch);
        // DST End
        var firstOfNovember = new Date(currentYear, 10, 1);
        var daysUntilFirstSundayInNov = (7 - firstOfNovember.getDay()) % 7;
        var firstSundayInNovember = firstOfNovember.getDate() + daysUntilFirstSundayInNov;
        var dstEndDate = new Date(currentYear, 10, firstSundayInNovember);
        return [dstStartDate, dstEndDate];
    },
    getPacificTimeOffset: function (paramDate) {
        var dateObj = paramDate || new Date();
        var _a = this.getDSTStartEndDate(), startDST = _a[0], endDST = _a[1];
        var isDSTActive = dateObj > startDST && dateObj < endDST;
        var pacificTimeOffset = isDSTActive ? -7 : -8;
        return pacificTimeOffset;
    },
    //==================================
    // overwrite default setTimeout to use schedule - which is paused when user switch to another tab. This will make all animation synced since ccAction is scheduling-base
    setTimeout: function (callback, timeInMillisecond) {
        if (timeInMillisecond === void 0) { timeInMillisecond = 0; }
        var target = { _id: timerUuidIndex++, __instanceId: timerUuidIndex, callback: null };
        target.callback = function () { callback(target); };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1000, 0, 0, false);
        return target;
    },
    clearTimeout: function (target) {
        if (!target || !target._id || !target.callback)
            return;
        cc.director.getScheduler().unschedule(target.callback, target);
    },
    // overwrite default setInterval to use schedule - which is paused when user switch to another tab. This will make all animation synced since ccAction is scheduling-base
    setInterval: function (callback, timeInMillisecond) {
        if (timeInMillisecond === void 0) { timeInMillisecond = 0; }
        var target = { _id: timerUuidIndex++, __instanceId: timerUuidIndex, callback: null };
        target.callback = function () { callback(target); };
        cc.director.getScheduler().schedule(target.callback, target, timeInMillisecond / 1000, cc.macro.REPEAT_FOREVER, 0, false);
        return target;
    },
    clearInterval: function (target) {
        if (!target || !target._id || !target.callback)
            return;
        cc.director.getScheduler().unschedule(target.callback, target);
    },
    addPseudoUpdateFunc: function (f) {
        var _this = this;
        var lastime = this.getMsPassedUTC();
        var intervalVar = this.setInterval(function () {
            var timeNow = _this.getMsPassedUTC();
            var dt = timeNow - lastime;
            lastime = timeNow;
            f(dt);
        }, 0.01);
        return intervalVar;
    },
    // 1d 
    // 01:11:01
    secondsToTimeCountdown: function (secondsCount) {
        if (secondsCount === void 0) { secondsCount = 0; }
        if (secondsCount <= 0)
            return '0:00';
        var days = Math.floor(secondsCount / 86400);
        var hours = Math.floor((secondsCount % 86400) / 3600);
        var minutes = Math.floor((secondsCount % 3600) / 60);
        var seconds = secondsCount % 60;
        // Output like "1 day" or "1:01" or "4:03:59"
        if (days > 2)
            return days + ' days';
        if (days == 1)
            return '1 day';
        var ret = "";
        //   if (hours >= 10) ret = hours + ':';
        //   else if (hours > 0) ret = '0' + hours + ':';
        if (hours > 0)
            ret = hours + ':';
        // if (minutes >= 10) ret += minutes + ':';
        // else ret += '0' + minutes + ':';
        ret += minutes + ':';
        if (seconds >= 10)
            ret += seconds;
        else
            ret += '0' + seconds;
        return ret;
    },
    //--- wait for certain property of certain object to be true & call a callback
    waitToRun: function (callback, propertyName, mainObject, interval, maxTimeWait, timeoutCallback) {
        if (mainObject === void 0) { mainObject = window; }
        if (interval === void 0) { interval = 0.1; }
        var isRunSuccess = false;
        var isReversed = propertyName.startsWith('!');
        var isFunction = propertyName.endsWith('()');
        propertyName = propertyName.replace('!', '').replace('()', '');
        var func = isFunction ? (function () { return mainObject[propertyName](); }) : null;
        var waitInterval;
        var timeTickFunc = function () {
            if (!isReversed) {
                if (isFunction) {
                    if (!func())
                        return;
                }
                else if (!mainObject[propertyName])
                    return;
            }
            else {
                if (isFunction) {
                    if (func())
                        return;
                }
                else if (mainObject[propertyName])
                    return;
            }
            clearInterval(waitInterval);
            isRunSuccess = true;
            callback(mainObject[propertyName]);
            return true;
        };
        if (timeTickFunc())
            return waitInterval;
        waitInterval = setInterval(timeTickFunc, interval * 1000);
        if (maxTimeWait) {
            this.setTimeout(function () {
                clearInterval(waitInterval);
                if (timeoutCallback && !isRunSuccess)
                    timeoutCallback();
            }, maxTimeWait * 1000);
        }
        return waitInterval;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvdXRpbHMvdXRpbHNfdGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUN2QyxJQUFBLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUdqQixJQUFJLGNBQWMsR0FBRyxHQUFHLENBQUMsQ0FBQyw4REFBOEQ7QUFDeEYsa0JBQWU7SUFHWix1REFBdUQ7SUFDdkQsY0FBYztRQUNYLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVELGlFQUFpRTtJQUNqRSxvSUFBb0k7SUFDcEksYUFBYTtRQUNWLElBQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDdEQsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxHQUFHLGlCQUFpQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25GLE9BQU8sZUFBZSxDQUFDO0lBQzFCLENBQUM7SUFHRCxTQUFTLFlBQUMsT0FBb0I7UUFBcEIsd0JBQUEsRUFBQSxjQUFjLElBQUksRUFBRTtRQUMzQixJQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3RCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFDOUMsOE5BQThOO1FBQzlOLE9BQU8sT0FBTyxDQUFDO0lBQ2xCLENBQUM7SUFHRCxVQUFVLEVBQVYsVUFBVyxRQUFjLEVBQUUsUUFBYztRQUN0QyxPQUFPLFFBQVEsQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO2VBQ2pELFFB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QUUsT0FBTztpQkFBRTtxQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7b0JBQUUsT0FBTzthQUM3QztpQkFDSTtnQkFDRixJQUFJLFVBQVUsRUFBRTtvQkFBRSxJQUFJLElBQUksRUFBRTt3QkFBRSxPQUFPO2lCQUFFO3FCQUNsQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLENBQUM7b0JBQUUsT0FBTzthQUM1QztZQUVELGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUM1QixZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztRQUNmLENBQUMsQ0FBQztRQUVGLElBQUksWUFBWSxFQUFFO1lBQUUsT0FBTyxZQUFZLENBQUM7UUFDeEMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRTFELElBQUksV0FBVyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDYixhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzVCLElBQUksZUFBZSxJQUFJLENBQUMsWUFBWTtvQkFBRSxlQUFlLEVBQUUsQ0FBQztZQUMzRCxDQUFDLEVBQUUsV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxZQUFZLENBQUM7SUFDdkIsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyAkIH0gPSBfRztcbmltcG9ydCB7IF8gfSBmcm9tICcuL3V0aWxzX2NvbW1vbic7IC8vIHNwZWNpYWwgY2FzZSBmb3Igc3ViLW1vZHVsZXNcblxubGV0IHRpbWVyVXVpZEluZGV4ID0gMWU1OyAvLyB1dWlkIHRvIHNldCBhcyBuYW1lcyBvZiBvYmplY3RzID0+IGhlbHAgaWRlbnRpZnlpbmcgb2JqZWN0c1xuZXhwb3J0IGRlZmF1bHQge1xuXG5cbiAgIC8vIGdldCBjdXJyZW50IHRpbWUgVVRDIC0gbWlsbGlzZWNvbmRzIGZyb20gMTk3MCB0byBub3dcbiAgIGdldE1zUGFzc2VkVVRDKCkge1xuICAgICAgcmV0dXJuIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICB9LFxuXG4gICAvLyBnZXQgY3VycmVudCBQYWNpZmljIFRpbWUgKFBUKSAgLSBtaWxsaXNlY29uZHMgZnJvbSAxOTcwIHRvIG5vd1xuICAgLy8gKiBXYXJuaW5nOiBEb250IHVzZSByZXN1bHQgKGZpbmFsUGFzc2VkTXMpIHRvIGNvbnZlcnQgYmFjayB0byBEYXRlKCkgb2JqZWN0IC0gbmV3IERhdGUoZ2V0TXNQYXNzZWRQVCksIHdpbGwgcmVzdWx0cyBpbiB3cm9uZyB0aW1lXG4gICBnZXRNc1Bhc3NlZFBUKCkge1xuICAgICAgY29uc3QgcGFjaWZpY1RpbWVPZmZzZXQgPSB0aGlzLmdldFBhY2lmaWNUaW1lT2Zmc2V0KCk7XG4gICAgICBjb25zdCBtc1Bhc3NlZEluUFROb3cgPSB0aGlzLmdldE1zUGFzc2VkVVRDKCkgKyBwYWNpZmljVGltZU9mZnNldCAqIDYwICogNjAgKiAxMDAwO1xuICAgICAgcmV0dXJuIG1zUGFzc2VkSW5QVE5vdztcbiAgIH0sXG5cblxuICAgZ2V0VGltZVBUKGRhdGVPYmogPSBuZXcgRGF0ZSgpKSB7XG4gICAgICBjb25zdCBwYWNpZmljVGltZU9mZnNldCA9IHRoaXMuZ2V0UGFjaWZpY1RpbWVPZmZzZXQoZGF0ZU9iaik7XG4gICAgICBjb25zdCB1dGNIb3VyID0gZGF0ZU9iai5nZXRIb3VycygpICsgZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpIC8gNjA7XG4gICAgICBkYXRlT2JqLnNldEhvdXJzKHV0Y0hvdXIgKyBwYWNpZmljVGltZU9mZnNldCk7XG4gICAgICAvLyBfLmxvZyhgZGF0ZU9iaiA9ICR7ZGF0ZU9ian0gLy8gcGFjaWZpY1RpbWVPZmZzZXQ9JHtwYWNpZmljVGltZU9mZnNldH0gLy8gZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpPSR7ZGF0ZU9iai5nZXRUaW1lem9uZU9mZnNldCgpfSAvLyB1dGNIb3VyPSR7dXRjSG91cn0gLy8gdXRjSG91ciArIHBhY2lmaWNUaW1lT2Zmc2V0PSR7dXRjSG91ciArIHBhY2lmaWNUaW1lT2Zmc2V0fSAgYClcbiAgICAgIHJldHVybiBkYXRlT2JqO1xuICAgfSxcblxuXG4gICBpc1NhbWVEYXRlKGRhdGVPYmoxOiBEYXRlLCBkYXRlT2JqMjogRGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGVPYmoxLmdldEZ1bGxZZWFyKCkgPT0gZGF0ZU9iajIuZ2V0RnVsbFllYXIoKVxuICAgICAgICAgJiYgZGF0ZU9iajEuZ2V0TW9udGgoKSA9PSBkYXRlT2JqMi5nZXRNb250aCgpXG4gICAgICAgICAmJiBkYXRlT2JqMS5nZXREYXRlKCkgPT0gZGF0ZU9iajIuZ2V0RGF0ZSgpO1xuICAgfSxcblxuXG4gICAvLyBnZXQgdG90YWwgbXMgdG8gbWlkbmlnaHQgb2YgY3VycmVudCBkYXkgaW4gUFRcbiAgIGdldFRvdGFsTXNUb01pZG5pZ2h0UFQoKSB7XG4gICAgICBjb25zdCBtc09mMURheSA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XG4gICAgICBjb25zdCBub3dQVCA9IHRoaXMuZ2V0TXNQYXNzZWRQVCgpO1xuICAgICAgY29uc3QgbXNUb01pZE5pZ2h0ID0gbXNPZjFEYXkgLSAobm93UFQgJSBtc09mMURheSk7XG4gICAgICByZXR1cm4gbXNUb01pZE5pZ2h0O1xuICAgfSxcblxuXG4gICAvLyBnZXQgRGF5bGlnaHQgU2F2aW5nIFRpbWUgc3RhcnQgJiBlbmQgb2YgY3VycmVudCB5ZWFyXG4gICAvLyAqIFNpbmNlIDIwMDcgRFNUIGJlZ2lucyBvbiB0aGUgc2Vjb25kIHN1bmRheSBvZiBNYXJjaCxcbiAgIC8vICogYW5kIGVuZHMgb24gdGhlIGZpcnN0IHN1bmRheSBvZiBOb3ZlbWJlci5cbiAgIGdldERTVFN0YXJ0RW5kRGF0ZShkYXRlT2JqPzogRGF0ZSkge1xuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBkYXRlT2JqIHx8IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBjdXJyZW50WWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG5cbiAgICAgIC8vIERTVCBTdGFydFxuICAgICAgY29uc3QgZmlyc3RPZk1hcmNoID0gbmV3IERhdGUoY3VycmVudFllYXIsIDIsIDEpO1xuICAgICAgY29uc3QgZGF5c1VudGlsRmlyc3RTdW5kYXlJbk1hcmNoID0gKDcgLSBmaXJzdE9mTWFyY2guZ2V0RGF5KCkpICUgNztcbiAgICAgIGNvbnN0IHNlY29uZFN1bmRheUluTWFyY2ggPSBmaXJzdE9mTWFyY2guZ2V0RGF0ZSgpICsgZGF5c1VudGlsRmlyc3RTdW5kYXlJbk1hcmNoICsgNztcbiAgICAgIGNvbnN0IGRzdFN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCAyLCBzZWNvbmRTdW5kYXlJbk1hcmNoKTtcblxuICAgICAgLy8gRFNUIEVuZFxuICAgICAgY29uc3QgZmlyc3RPZk5vdmVtYmVyID0gbmV3IERhdGUoY3VycmVudFllYXIsIDEwLCAxKTtcbiAgICAgIGNvbnN0IGRheXNVbnRpbEZpcnN0U3VuZGF5SW5Ob3YgPSAoNyAtIGZpcnN0T2ZOb3ZlbWJlci5nZXREYXkoKSkgJSA3O1xuICAgICAgY29uc3QgZmlyc3RTdW5kYXlJbk5vdmVtYmVyID0gZmlyc3RPZk5vdmVtYmVyLmdldERhdGUoKSArIGRheXNVbnRpbEZpcnN0U3VuZGF5SW5Ob3Y7XG4gICAgICBjb25zdCBkc3RFbmREYXRlID0gbmV3IERhdGUoY3VycmVudFllYXIsIDEwLCBmaXJzdFN1bmRheUluTm92ZW1iZXIpO1xuICAgICAgcmV0dXJuIFtkc3RTdGFydERhdGUsIGRzdEVuZERhdGVdO1xuICAgfSxcblxuXG4gICBnZXRQYWNpZmljVGltZU9mZnNldChwYXJhbURhdGU/OiBEYXRlKSB7XG4gICAgICBjb25zdCBkYXRlT2JqID0gcGFyYW1EYXRlIHx8IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBbc3RhcnREU1QsIGVuZERTVF0gPSB0aGlzLmdldERTVFN0YXJ0RW5kRGF0ZSgpO1xuICAgICAgY29uc3QgaXNEU1RBY3RpdmUgPSBkYXRlT2JqID4gc3RhcnREU1QgJiYgZGF0ZU9iaiA8IGVuZERTVDtcbiAgICAgIGNvbnN0IHBhY2lmaWNUaW1lT2Zmc2V0ID0gaXNEU1RBY3RpdmUgPyAtNyA6IC04O1xuICAgICAgcmV0dXJuIHBhY2lmaWNUaW1lT2Zmc2V0O1xuICAgfSxcblxuXG5cbiAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gICAvLyBvdmVyd3JpdGUgZGVmYXVsdCBzZXRUaW1lb3V0IHRvIHVzZSBzY2hlZHVsZSAtIHdoaWNoIGlzIHBhdXNlZCB3aGVuIHVzZXIgc3dpdGNoIHRvIGFub3RoZXIgdGFiLiBUaGlzIHdpbGwgbWFrZSBhbGwgYW5pbWF0aW9uIHN5bmNlZCBzaW5jZSBjY0FjdGlvbiBpcyBzY2hlZHVsaW5nLWJhc2VcbiAgIHNldFRpbWVvdXQoY2FsbGJhY2s6IEZ1bmN0aW9uLCB0aW1lSW5NaWxsaXNlY29uZDogbnVtYmVyID0gMCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0geyBfaWQ6IHRpbWVyVXVpZEluZGV4KyssIF9faW5zdGFuY2VJZDogdGltZXJVdWlkSW5kZXgsIGNhbGxiYWNrOiBudWxsIH07XG4gICAgICB0YXJnZXQuY2FsbGJhY2sgPSAoKSA9PiB7IGNhbGxiYWNrKHRhcmdldCk7IH1cbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKHRhcmdldC5jYWxsYmFjaywgdGFyZ2V0LCB0aW1lSW5NaWxsaXNlY29uZCAvIDEwMDAsIDAsIDAsIGZhbHNlKTtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICB9LFxuXG4gICBjbGVhclRpbWVvdXQodGFyZ2V0OiBhbnkpIHtcbiAgICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQuX2lkIHx8ICF0YXJnZXQuY2FsbGJhY2spIHJldHVybjtcbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGUodGFyZ2V0LmNhbGxiYWNrLCB0YXJnZXQpO1xuICAgfSxcblxuXG4gICAvLyBvdmVyd3JpdGUgZGVmYXVsdCBzZXRJbnRlcnZhbCB0byB1c2Ugc2NoZWR1bGUgLSB3aGljaCBpcyBwYXVzZWQgd2hlbiB1c2VyIHN3aXRjaCB0byBhbm90aGVyIHRhYi4gVGhpcyB3aWxsIG1ha2UgYWxsIGFuaW1hdGlvbiBzeW5jZWQgc2luY2UgY2NBY3Rpb24gaXMgc2NoZWR1bGluZy1iYXNlXG4gICBzZXRJbnRlcnZhbChjYWxsYmFjazogRnVuY3Rpb24sIHRpbWVJbk1pbGxpc2Vjb25kID0gMCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0geyBfaWQ6IHRpbWVyVXVpZEluZGV4KyssIF9faW5zdGFuY2VJZDogdGltZXJVdWlkSW5kZXgsIGNhbGxiYWNrOiBudWxsIH07XG4gICAgICB0YXJnZXQuY2FsbGJhY2sgPSAoKSA9PiB7IGNhbGxiYWNrKHRhcmdldCk7IH1cbiAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnNjaGVkdWxlKHRhcmdldC5jYWxsYmFjaywgdGFyZ2V0LCB0aW1lSW5NaWxsaXNlY29uZCAvIDEwMDAsIGNjLm1hY3JvLlJFUEVBVF9GT1JFVkVSLCAwLCBmYWxzZSk7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgfSxcblxuICAgY2xlYXJJbnRlcnZhbCh0YXJnZXQ6IGFueSkge1xuICAgICAgaWYgKCF0YXJnZXQgfHwgIXRhcmdldC5faWQgfHwgIXRhcmdldC5jYWxsYmFjaykgcmV0dXJuO1xuICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZSh0YXJnZXQuY2FsbGJhY2ssIHRhcmdldCk7XG4gICB9LFxuXG4gICBhZGRQc2V1ZG9VcGRhdGVGdW5jKGYpIHtcbiAgICAgIGxldCBsYXN0aW1lID0gdGhpcy5nZXRNc1Bhc3NlZFVUQygpO1xuICAgICAgY29uc3QgaW50ZXJ2YWxWYXIgPSB0aGlzLnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgIGNvbnN0IHRpbWVOb3cgPSB0aGlzLmdldE1zUGFzc2VkVVRDKCk7XG4gICAgICAgICBjb25zdCBkdCA9IHRpbWVOb3cgLSBsYXN0aW1lO1xuICAgICAgICAgbGFzdGltZSA9IHRpbWVOb3c7XG4gICAgICAgICBmKGR0KTtcbiAgICAgIH0sIDAuMDEpO1xuICAgICAgcmV0dXJuIGludGVydmFsVmFyO1xuICAgfSxcblxuICAgLy8gMWQgXG4gICAvLyAwMToxMTowMVxuICAgc2Vjb25kc1RvVGltZUNvdW50ZG93bihzZWNvbmRzQ291bnQgPSAwKSB7XG4gICAgICBpZiAoc2Vjb25kc0NvdW50IDw9IDApIHJldHVybiAnMDowMCc7XG5cbiAgICAgIGxldCBkYXlzID0gTWF0aC5mbG9vcihzZWNvbmRzQ291bnQgLyA4NjQwMCk7XG4gICAgICBsZXQgaG91cnMgPSBNYXRoLmZsb29yKChzZWNvbmRzQ291bnQgJSA4NjQwMCkgLyAzNjAwKTtcbiAgICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kc0NvdW50ICUgMzYwMCkgLyA2MCk7XG4gICAgICBsZXQgc2Vjb25kcyA9IHNlY29uZHNDb3VudCAlIDYwO1xuXG4gICAgICAvLyBPdXRwdXQgbGlrZSBcIjEgZGF5XCIgb3IgXCIxOjAxXCIgb3IgXCI0OjAzOjU5XCJcbiAgICAgIGlmIChkYXlzID4gMikgcmV0dXJuIGRheXMgKyAnIGRheXMnO1xuICAgICAgaWYgKGRheXMgPT0gMSkgcmV0dXJuICcxIGRheSc7XG5cbiAgICAgIGxldCByZXQgPSBcIlwiO1xuICAgICAgLy8gICBpZiAoaG91cnMgPj0gMTApIHJldCA9IGhvdXJzICsgJzonO1xuICAgICAgLy8gICBlbHNlIGlmIChob3VycyA+IDApIHJldCA9ICcwJyArIGhvdXJzICsgJzonO1xuICAgICAgaWYgKGhvdXJzID4gMCkgcmV0ID0gaG91cnMgKyAnOic7XG5cbiAgICAgIC8vIGlmIChtaW51dGVzID49IDEwKSByZXQgKz0gbWludXRlcyArICc6JztcbiAgICAgIC8vIGVsc2UgcmV0ICs9ICcwJyArIG1pbnV0ZXMgKyAnOic7XG4gICAgICByZXQgKz0gbWludXRlcyArICc6JztcblxuICAgICAgaWYgKHNlY29uZHMgPj0gMTApIHJldCArPSBzZWNvbmRzO1xuICAgICAgZWxzZSByZXQgKz0gJzAnICsgc2Vjb25kcztcblxuICAgICAgcmV0dXJuIHJldDtcbiAgIH0sXG5cblxuICAgLy8tLS0gd2FpdCBmb3IgY2VydGFpbiBwcm9wZXJ0eSBvZiBjZXJ0YWluIG9iamVjdCB0byBiZSB0cnVlICYgY2FsbCBhIGNhbGxiYWNrXG4gICB3YWl0VG9SdW4oXG4gICAgICBjYWxsYmFjazogRnVuY3Rpb24sXG4gICAgICBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgIG1haW5PYmplY3Q6IGFueSA9IHdpbmRvdyxcbiAgICAgIGludGVydmFsOiBudW1iZXIgPSAwLjEsXG4gICAgICBtYXhUaW1lV2FpdD86IG51bWJlcixcbiAgICAgIHRpbWVvdXRDYWxsYmFjaz86IEZ1bmN0aW9uXG4gICApIHtcbiAgICAgIGxldCBpc1J1blN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGlzUmV2ZXJzZWQgPSBwcm9wZXJ0eU5hbWUuc3RhcnRzV2l0aCgnIScpO1xuICAgICAgY29uc3QgaXNGdW5jdGlvbiA9IHByb3BlcnR5TmFtZS5lbmRzV2l0aCgnKCknKTtcbiAgICAgIHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZS5yZXBsYWNlKCchJywgJycpLnJlcGxhY2UoJygpJywgJycpO1xuICAgICAgY29uc3QgZnVuYyA9IGlzRnVuY3Rpb24gPyAoKCkgPT4gbWFpbk9iamVjdFtwcm9wZXJ0eU5hbWVdKCkpIDogbnVsbDtcbiAgICAgIGxldCB3YWl0SW50ZXJ2YWw7XG5cbiAgICAgIGNvbnN0IHRpbWVUaWNrRnVuYyA9ICgpID0+IHtcbiAgICAgICAgIGlmICghaXNSZXZlcnNlZCkge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24pIHsgaWYgKCFmdW5jKCkpIHJldHVybjsgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIW1haW5PYmplY3RbcHJvcGVydHlOYW1lXSkgcmV0dXJuO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbikgeyBpZiAoZnVuYygpKSByZXR1cm47IH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG1haW5PYmplY3RbcHJvcGVydHlOYW1lXSkgcmV0dXJuO1xuICAgICAgICAgfVxuXG4gICAgICAgICBjbGVhckludGVydmFsKHdhaXRJbnRlcnZhbCk7XG4gICAgICAgICBpc1J1blN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgY2FsbGJhY2sobWFpbk9iamVjdFtwcm9wZXJ0eU5hbWVdKTtcbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcblxuICAgICAgaWYgKHRpbWVUaWNrRnVuYygpKSByZXR1cm4gd2FpdEludGVydmFsO1xuICAgICAgd2FpdEludGVydmFsID0gc2V0SW50ZXJ2YWwodGltZVRpY2tGdW5jLCBpbnRlcnZhbCAqIDEwMDApO1xuXG4gICAgICBpZiAobWF4VGltZVdhaXQpIHtcbiAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHdhaXRJbnRlcnZhbCk7XG4gICAgICAgICAgICBpZiAodGltZW91dENhbGxiYWNrICYmICFpc1J1blN1Y2Nlc3MpIHRpbWVvdXRDYWxsYmFjaygpO1xuICAgICAgICAgfSwgbWF4VGltZVdhaXQgKiAxMDAwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHdhaXRJbnRlcnZhbDtcbiAgIH0sXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/id_ID.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '425deKB+RVPtKx2wGIhWyOG', 'id_ID');
// script/system/localization/language-files/id_ID.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'BAGIKAN',
    common_label_reward: 'HADIAH',
    common_label_claim: 'KLAIM',
    common_label_button_play: 'BERMAIN',
    common_label_level_intro: 'TINGKAT',
    label_loading_ad: 'Memuat iklan. Harap tunggu',
    label_game_loading: 'SEDANG MEMUAT',
    label_game_continue: 'LANJUTKAN',
    label_game_play_more_puzzle: 'TEKA-TEKI LAINNYA',
    label_gameplay_select_difficulty: 'PILIH KESULITAN:',
    label_fx_video_error: 'Kesalahan video',
    label_settings_music: 'MUSIK',
    label_settings_sound: 'SUARA',
    label_tut_step_1: "Klik pada dua bagian\nuntuk memindahkannya dan\nmenempatkannya dengan benar",
    label_tut_step_2: function () { return "Klik di sini dan bayar " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> untuk\nmemecahkan beberapa potong."; },
    label_tut_step_3: "Batas waktu untuk setiap\nteka-teki akan tergantung\npada jumlah keping.\n\n\u00A1Jangan sampai waktunya habis!",
    label_tut_btn_continue: 'LANJUTKAN',
    label_alert_intro: "TONTON VIDEONYA UNTUK\nMEMENANGKAN " + _G.configGame.videoCoinReward + " KOIN",
    label_alert_back: 'TIDAK',
    label_alert_earn_stars: 'YA',
    label_level_up_header: 'NAIK TINGKAT!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'APAKAH ANDA\nINGIN MELANJUTKAN\nPERMAINAN?',
    label_pause_header: 'JEDA',
    label_gameover_header: 'TAMAT',
    label_gameover_score_intro: 'SKOR:',
    label_gameover_btn_try_again: 'COBA LAGI',
    label_gameover_no_thanks: 'TIDAK, TERIMA KASIH',
    label_home_button_play_w_friends: 'BERMAIN\nDENGAN TEMAN',
    label_share_intro_1: 'Bisakah kamu mengalahkan aku?',
    label_share_intro_2: 'SKOR:',
    label_win_well_done: 'Bagus sekali',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} mengundangmu untuk memecahkan teka-teki!`,
    fb_invite_message_text: function (playerName) { return "Saya mengundang Anda untuk memecahkan teka-teki ini"; },
    fb_invite_message_cta: 'BERMAIN',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9pZF9JRC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFNBQVM7SUFDN0IsbUJBQW1CLEVBQUUsUUFBUTtJQUM3QixrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLHdCQUF3QixFQUFFLFNBQVM7SUFDbkMsd0JBQXdCLEVBQUUsU0FBUztJQUVuQyxnQkFBZ0IsRUFBRSw0QkFBNEI7SUFFOUMsa0JBQWtCLEVBQUUsZUFBZTtJQUNuQyxtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLG1CQUFtQjtJQUNoRCxnQ0FBZ0MsRUFBRSxrQkFBa0I7SUFFcEQsb0JBQW9CLEVBQUUsaUJBQWlCO0lBRXZDLG9CQUFvQixFQUFFLE9BQU87SUFDN0Isb0JBQW9CLEVBQUUsT0FBTztJQUU3QixnQkFBZ0IsRUFBRSw2RUFBNkU7SUFDL0YsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLDRCQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsb0ZBQStFLEVBQXBJLENBQW9JO0lBQzVKLGdCQUFnQixFQUFFLGlIQUE0RztJQUM5SCxzQkFBc0IsRUFBRSxXQUFXO0lBRW5DLGlCQUFpQixFQUFFLHdDQUFzQyxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsVUFBTztJQUM3RixnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLHNCQUFzQixFQUFFLElBQUk7SUFFNUIscUJBQXFCLEVBQUUsZUFBZTtJQUN0Qyx5QkFBeUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUcsQ0FBRyxFQUFOLENBQU07SUFFeEMsaUJBQWlCLEVBQUUsNENBQTRDO0lBQy9ELGtCQUFrQixFQUFFLE1BQU07SUFFMUIscUJBQXFCLEVBQUUsT0FBTztJQUM5QiwwQkFBMEIsRUFBRSxPQUFPO0lBQ25DLDRCQUE0QixFQUFFLFdBQVc7SUFDekMsd0JBQXdCLEVBQUUscUJBQXFCO0lBRS9DLGdDQUFnQyxFQUFFLHVCQUF1QjtJQUV6RCxtQkFBbUIsRUFBRSwrQkFBK0I7SUFDcEQsbUJBQW1CLEVBQUUsT0FBTztJQUU1QixtQkFBbUIsRUFBRSxjQUFjO0lBRW5DLCtCQUErQixFQUFFLFVBQUEsQ0FBQzs7UUFDL0IsbUJBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQiwyQ0FBRyxXQUFXLEdBQUc7SUFDbEksQ0FBQztJQUdELHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsa0dBQWtHO0lBQ2xHLHNCQUFzQixFQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEscURBQXFELEVBQXJELENBQXFEO0lBQzNGLHFCQUFxQixFQUFFLFNBQVM7Q0FFbEMsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0ID0ge1xuICAgY29tbW9uX2xhYmVsX3NoYXJlOiAnQkFHSUtBTicsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnSEFESUFIJyxcbiAgIGNvbW1vbl9sYWJlbF9jbGFpbTogJ0tMQUlNJyxcbiAgIGNvbW1vbl9sYWJlbF9idXR0b25fcGxheTogJ0JFUk1BSU4nLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAnVElOR0tBVCcsXG5cbiAgIGxhYmVsX2xvYWRpbmdfYWQ6ICdNZW11YXQgaWtsYW4uIEhhcmFwIHR1bmdndScsXG5cbiAgIGxhYmVsX2dhbWVfbG9hZGluZzogJ1NFREFORyBNRU1VQVQnLFxuICAgbGFiZWxfZ2FtZV9jb250aW51ZTogJ0xBTkpVVEtBTicsXG4gICBsYWJlbF9nYW1lX3BsYXlfbW9yZV9wdXp6bGU6ICdURUtBLVRFS0kgTEFJTk5ZQScsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1BJTElIIEtFU1VMSVRBTjonLFxuXG4gICBsYWJlbF9meF92aWRlb19lcnJvcjogJ0tlc2FsYWhhbiB2aWRlbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSUsnLFxuICAgbGFiZWxfc2V0dGluZ3Nfc291bmQ6ICdTVUFSQScsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGBLbGlrIHBhZGEgZHVhIGJhZ2lhblxcbnVudHVrIG1lbWluZGFoa2FubnlhIGRhblxcbm1lbmVtcGF0a2FubnlhIGRlbmdhbiBiZW5hcmAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgS2xpayBkaSBzaW5pIGRhbiBiYXlhciAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX0gPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPiB1bnR1a1xcbm1lbWVjYWhrYW4gYmViZXJhcGEgcG90b25nLmAsIC8vIHRoaXMgbGFiZWwgaXMgUmljaFRleHQuIFwiaWNvbl9jb2luXCIgaXMgc3ByaXRlIG5hbWUgaW4gdGhlIGxpbmtlZCBhdGxhcy5cbiAgIGxhYmVsX3R1dF9zdGVwXzM6IGBCYXRhcyB3YWt0dSB1bnR1ayBzZXRpYXBcXG50ZWthLXRla2kgYWthbiB0ZXJnYW50dW5nXFxucGFkYSBqdW1sYWgga2VwaW5nLlxcblxcbsKhSmFuZ2FuIHNhbXBhaSB3YWt0dW55YSBoYWJpcyFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0xBTkpVVEtBTicsXG5cbiAgIGxhYmVsX2FsZXJ0X2ludHJvOiBgVE9OVE9OIFZJREVPTllBIFVOVFVLXFxuTUVNRU5BTkdLQU4gJHtfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZH0gS09JTmAsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAnVElEQUsnLFxuICAgbGFiZWxfYWxlcnRfZWFybl9zdGFyczogJ1lBJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTkFJSyBUSU5HS0FUIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ0FQQUtBSCBBTkRBXFxuSU5HSU4gTUVMQU5KVVRLQU5cXG5QRVJNQUlOQU4/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ0pFREEnLFxuXG4gICBsYWJlbF9nYW1lb3Zlcl9oZWFkZXI6ICdUQU1BVCcsXG4gICBsYWJlbF9nYW1lb3Zlcl9zY29yZV9pbnRybzogJ1NLT1I6JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdDT0JBIExBR0knLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnVElEQUssIFRFUklNQSBLQVNJSCcsXG5cbiAgIGxhYmVsX2hvbWVfYnV0dG9uX3BsYXlfd19mcmllbmRzOiAnQkVSTUFJTlxcbkRFTkdBTiBURU1BTicsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICdCaXNha2FoIGthbXUgbWVuZ2FsYWhrYW4gYWt1PycsXG4gICBsYWJlbF9zaGFyZV9pbnRyb18yOiAnU0tPUjonLFxuXG4gICBsYWJlbF93aW5fd2VsbF9kb25lOiAnQmFndXMgc2VrYWxpJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gbWVuZ3VuZGFuZ211IHVudHVrIG1lbWVjYWhrYW4gdGVrYS10ZWtpIWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGBTYXlhIG1lbmd1bmRhbmcgQW5kYSB1bnR1ayBtZW1lY2Foa2FuIHRla2EtdGVraSBpbmlgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfY3RhOiAnQkVSTUFJTicsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/th_TH.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e4d2cZz2vRIu72XnwYIFMgb', 'th_TH');
// script/system/localization/language-files/th_TH.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'แชร์',
    common_label_reward: 'รางวัล',
    common_label_claim: 'รับ',
    common_label_button_play: 'เล่น',
    common_label_level_intro: 'เลเวล',
    label_loading_ad: 'กำลังโหลดโฆษณา. โปรดรอ',
    label_game_loading: 'กำลังโหลด',
    label_game_continue: 'ดำเนินต่อ',
    label_game_play_more_puzzle: 'ปริศนาเพิ่มเติม',
    label_gameplay_select_difficulty: 'เลือกความยาก',
    label_fx_video_error: 'วิดีโอล้มเหลว',
    label_settings_music: 'ดนตรี',
    label_settings_sound: 'เสียง',
    label_tut_step_1: "\u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E2A\u0E2D\u0E07\u0E0A\u0E34\u0E49\u0E19\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E22\u0E49\u0E32\n\u0E22\u0E41\u0E25\u0E30\u0E27\u0E32\u0E07\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    label_tut_step_2: function () { return "\u0E04\u0E25\u0E34\u0E01\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48\u0E41\u0E25\u0E30\u0E08\u0E48\u0E32\u0E22 " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/>\n\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E41\u0E01\u0E49\u0E1B\u0E31\u0E0D\u0E2B\u0E32\u0E2A\u0E2D\u0E07\u0E2A\u0E32\u0E21\u0E0A\u0E34\u0E49\u0E19"; },
    label_tut_step_3: "\u0E01\u0E32\u0E23\u0E08\u0E33\u0E01\u0E31\u0E14\u0E40\u0E27\u0E25\u0E32\u0E2A\u0E33\n\u0E2B\u0E23\u0E31\u0E1A\u0E41\u0E15\u0E48\u0E25\u0E30\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32\u0E08\u0E30\u0E02\u0E36\u0E49\u0E19\u0E2D\n\u0E22\u0E39\u0E48\u0E01\u0E31\u0E1A\u0E08\u0E33\u0E19\u0E27\u0E19\u0E0A\u0E34\u0E49\u0E19\n\n\u0E2D\u0E22\u0E48\u0E32\u0E1B\u0E25\u0E48\u0E2D\u0E22\u0E43\u0E2B\u0E49\u0E21\u0E31\u0E19\u0E2B\u0E21\u0E14!",
    label_tut_btn_continue: 'ดำเนินต่อ',
    label_alert_intro: "\u0E14\u0E39\u0E27\u0E34\u0E14\u0E35\u0E42\u0E2D\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E31\u0E1A\n" + _G.configGame.videoCoinReward + " \u0E40\u0E2B\u0E23\u0E35\u0E22\u0E0D",
    label_alert_back: 'ไม่',
    label_alert_earn_stars: 'ใช่',
    label_level_up_header: 'เลเวลอัพ!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'คุณต้องก\nารเริ่มเกม\nต่อหรือไม่?',
    label_pause_header: 'หยุดชั่วคราว',
    label_gameover_header: 'จบเกม',
    label_gameover_score_intro: 'คุะแนน:',
    label_gameover_btn_try_again: 'เล่นอีกครั้ง',
    label_gameover_no_thanks: 'ไม่ ขอบคุณ',
    label_home_button_play_w_friends: 'เล่นกับ\nเพื่อน',
    label_share_intro_1: 'คุณเอาชนะฉันได้ไหม?',
    label_share_intro_2: 'คุะแนน',
    label_win_well_done: 'ทำได้ดีมาก!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} ขอเชิญทุกท่านที่จะแก้ปริศนา!`,
    fb_invite_message_text: function (playerName) { return "\u0E09\u0E31\u0E19\u0E02\u0E2D\u0E40\u0E0A\u0E34\u0E0D\u0E04\u0E38\u0E13\u0E21\u0E32\u0E44\u0E02\u0E1B\u0E23\u0E34\u0E28\u0E19\u0E32\u0E19\u0E35\u0E49"; },
    fb_invite_message_cta: 'เล่น',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy90aF9USC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsbUJBQW1CLEVBQUUsUUFBUTtJQUM3QixrQkFBa0IsRUFBRSxLQUFLO0lBQ3pCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSx3QkFBd0I7SUFFMUMsa0JBQWtCLEVBQUUsV0FBVztJQUMvQixtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLGlCQUFpQjtJQUM5QyxnQ0FBZ0MsRUFBRSxjQUFjO0lBRWhELG9CQUFvQixFQUFFLGVBQWU7SUFFckMsb0JBQW9CLEVBQUUsT0FBTztJQUM3QixvQkFBb0IsRUFBRSxPQUFPO0lBRTdCLGdCQUFnQixFQUFFLDBQQUE2QztJQUMvRCxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsNEdBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw2TEFBcUUsRUFBckgsQ0FBcUg7SUFDN0ksZ0JBQWdCLEVBQUUseWFBQWdGO0lBQ2xHLHNCQUFzQixFQUFFLFdBQVc7SUFFbkMsaUJBQWlCLEVBQUUsdUdBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSwwQ0FBUztJQUM5RSxnQkFBZ0IsRUFBRSxLQUFLO0lBQ3ZCLHNCQUFzQixFQUFFLEtBQUs7SUFFN0IscUJBQXFCLEVBQUUsV0FBVztJQUNsQyx5QkFBeUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUcsQ0FBRyxFQUFOLENBQU07SUFFeEMsaUJBQWlCLEVBQUUsbUNBQW1DO0lBQ3RELGtCQUFrQixFQUFFLGNBQWM7SUFFbEMscUJBQXFCLEVBQUUsT0FBTztJQUM5QiwwQkFBMEIsRUFBRSxTQUFTO0lBQ3JDLDRCQUE0QixFQUFFLGNBQWM7SUFDNUMsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxpQkFBaUI7SUFFbkQsbUJBQW1CLEVBQUUscUJBQXFCO0lBQzFDLG1CQUFtQixFQUFFLFFBQVE7SUFFN0IsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLHNGQUFzRjtJQUN0RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHdKQUEyQixFQUEzQixDQUEyQjtJQUNqRSxxQkFBcUIsRUFBRSxNQUFNO0NBRS9CLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ+C5geC4iuC4o+C5jCcsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAn4Lij4Liy4LiH4Lin4Lix4LilJyxcbiAgIGNvbW1vbl9sYWJlbF9jbGFpbTogJ+C4o+C4seC4micsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICfguYDguKXguYjguJknLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAn4LmA4Lil4LmA4Lin4LilJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ+C4geC4s+C4peC4seC4h+C5guC4q+C4peC4lOC5guC4huC4qeC4k+C4si4g4LmC4Lib4Lij4LiU4Lij4LitJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAn4LiB4Liz4Lil4Lix4LiH4LmC4Lir4Lil4LiUJyxcbiAgIGxhYmVsX2dhbWVfY29udGludWU6ICfguJTguLPguYDguJnguLTguJnguJXguYjguK0nLFxuICAgbGFiZWxfZ2FtZV9wbGF5X21vcmVfcHV6emxlOiAn4Lib4Lij4Li04Lio4LiZ4Liy4LmA4Lie4Li04LmI4Lih4LmA4LiV4Li04LihJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAn4LmA4Lil4Li34Lit4LiB4LiE4Lin4Liy4Lih4Lii4Liy4LiBJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICfguKfguLTguJTguLXguYLguK3guKXguYnguKHguYDguKvguKXguKcnLFxuXG4gICBsYWJlbF9zZXR0aW5nc19tdXNpYzogJ+C4lOC4meC4leC4o+C4tScsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ+C5gOC4quC4teC4ouC4hycsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGDguITguKXguLTguIHguJfguLXguYjguKrguK3guIfguIrguLTguYnguJnguYDguJ7guLfguYjguK3guKLguYnguLJcXG7guKLguYHguKXguLDguKfguLLguIfguK3guKLguYjguLLguIfguJbguLnguIHguJXguYnguK3guIdgLFxuICAgbGFiZWxfdHV0X3N0ZXBfMjogKCkgPT4gYOC4hOC4peC4tOC4geC4l+C4teC5iOC4meC4teC5iOC5geC4peC4sOC4iOC5iOC4suC4oiAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX0gPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPlxcbuC5gOC4nuC4t+C5iOC4reC5geC4geC5ieC4m+C4seC4jeC4q+C4suC4quC4reC4h+C4quC4suC4oeC4iuC4tOC5ieC4mWAsICAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBg4LiB4Liy4Lij4LiI4Liz4LiB4Lix4LiU4LmA4Lin4Lil4Liy4Liq4LizXFxu4Lir4Lij4Lix4Lia4LmB4LiV4LmI4Lil4Liw4Lib4Lij4Li04Lio4LiZ4Liy4LiI4Liw4LiC4Li24LmJ4LiZ4LitXFxu4Lii4Li54LmI4LiB4Lix4Lia4LiI4Liz4LiZ4Lin4LiZ4LiK4Li04LmJ4LiZXFxuXFxu4Lit4Lii4LmI4Liy4Lib4Lil4LmI4Lit4Lii4LmD4Lir4LmJ4Lih4Lix4LiZ4Lir4Lih4LiUIWAsXG4gICBsYWJlbF90dXRfYnRuX2NvbnRpbnVlOiAn4LiU4Liz4LmA4LiZ4Li04LiZ4LiV4LmI4LitJyxcblxuICAgbGFiZWxfYWxlcnRfaW50cm86IGDguJTguLnguKfguLTguJTguLXguYLguK3guYDguJ7guLfguYjguK3guKPguLHguJpcXG4ke19HLmNvbmZpZ0dhbWUudmlkZW9Db2luUmV3YXJkfSDguYDguKvguKPguLXguKLguI1gLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ+C5hOC4oeC5iCcsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAn4LmD4LiK4LmIJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAn4LmA4Lil4LmA4Lin4Lil4Lit4Lix4LieIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ+C4hOC4uOC4k+C4leC5ieC4reC4h+C4gVxcbuC4suC4o+C5gOC4o+C4tOC5iOC4oeC5gOC4geC4oVxcbuC4leC5iOC4reC4q+C4o+C4t+C4reC5hOC4oeC5iD8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAn4Lir4Lii4Li44LiU4LiK4Lix4LmI4Lin4LiE4Lij4Liy4LinJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAn4LiI4Lia4LmA4LiB4LihJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAn4LiE4Li44Liw4LmB4LiZ4LiZOicsXG4gICBsYWJlbF9nYW1lb3Zlcl9idG5fdHJ5X2FnYWluOiAn4LmA4Lil4LmI4LiZ4Lit4Li14LiB4LiE4Lij4Lix4LmJ4LiHJyxcbiAgIGxhYmVsX2dhbWVvdmVyX25vX3RoYW5rczogJ+C5hOC4oeC5iCDguILguK3guJrguITguLjguJMnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ+C5gOC4peC5iOC4meC4geC4seC4mlxcbuC5gOC4nuC4t+C5iOC4reC4mScsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICfguITguLjguJPguYDguK3guLLguIrguJnguLDguInguLHguJnguYTguJTguYnguYTguKvguKE/JyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICfguITguLjguLDguYHguJnguJknLFxuXG4gICBsYWJlbF93aW5fd2VsbF9kb25lOiAn4LiX4Liz4LmE4LiU4LmJ4LiU4Li14Lih4Liy4LiBIScsXG5cbiAgIGxhYmVsX2NhdGVnb3J5X2xpc3RfaGVhZGVyX25hbWU6IHggPT4ge1xuICAgICAgcmV0dXJuIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSB4KT8ubGFuZ3VhZ2VzW19HLmxvY2FsaXplLmN1cnJlbnRMYW5ndWFnZUNvZGVdPy50b1VwcGVyQ2FzZSgpO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IOC4guC4reC5gOC4iuC4tOC4jeC4l+C4uOC4geC4l+C5iOC4suC4meC4l+C4teC5iOC4iOC4sOC5geC4geC5ieC4m+C4o+C4tOC4qOC4meC4siFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBg4LiJ4Lix4LiZ4LiC4Lit4LmA4LiK4Li04LiN4LiE4Li44LiT4Lih4Liy4LmE4LiC4Lib4Lij4Li04Lio4LiZ4Liy4LiZ4Li14LmJYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX2N0YTogJ+C5gOC4peC5iOC4mScsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/tr_TR.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '29860DFamdN5ZCn5Wb24XC/', 'tr_TR');
// script/system/localization/language-files/tr_TR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'PAYLAŞ',
    common_label_reward: 'ÖDÜL',
    common_label_claim: 'AL',
    common_label_button_play: 'OYNA',
    common_label_level_intro: 'SEVIYE',
    label_loading_ad: 'Reklamlar yükleniyor. Lütfen bekleyin',
    label_game_loading: 'YÜKLENIYOR',
    label_game_continue: 'DEVAM',
    label_game_play_more_puzzle: 'DAHA ÇOK YAPBOZ',
    label_gameplay_select_difficulty: 'ZORLUK DERECESINI SEÇ',
    label_fx_video_error: 'Video hatası',
    label_settings_music: 'MÜZIK',
    label_settings_sound: 'SES',
    label_tut_step_1: "\u0130ki par\u00E7aya t\u0131klay\u0131p ta\u015F\u0131yarak\ndo\u011Fru yerlere yerle\u015Ftirin.",
    label_tut_step_2: function () { return "Buraya t\u0131klay\u0131p birka\u00E7\npar\u00E7ay\u0131 \u00E7\u00F6zmek i\u00E7in " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> \u00F6de."; },
    label_tut_step_3: "Her yapboz i\u00E7in\ns\u00FCre s\u0131n\u0131r\u0131 par\u00E7a say\u0131s\u0131na\nba\u011Fl\u0131 olarak de\u011Fi\u015Fecektir.\n\nSak\u0131n s\u00FCrenin\ndolmas\u0131na izin vermeyin!",
    label_tut_btn_continue: 'DEVAM',
    label_alert_intro: _G.configGame.videoCoinReward + " JETON KAZANMAK\nI\u00C7IN VIDEOYU IZLEYIN",
    label_alert_back: 'OLUMSUZLUK',
    label_alert_earn_stars: 'EVET',
    label_level_up_header: 'SEVIYE GEÇILDI!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'OYUNA DEVAM\nETMEK ISTIYOR\nMUSUNUZ?',
    label_pause_header: 'DURAKLAT',
    label_gameover_header: 'OYUN BITTI!',
    label_gameover_score_intro: 'PUAN',
    label_gameover_btn_try_again: 'TEKRAR DENE',
    label_gameover_no_thanks: 'HAYIR, TEŞEKKÜRLER',
    label_home_button_play_w_friends: 'ARKADAŞLARINLA\nOYNA',
    label_share_intro_1: 'Beni yenebilir misin?',
    label_share_intro_2: 'PUAN:',
    label_win_well_done: 'Aferin!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} Bulmacayı çözmek için davet ediyor!`,
    fb_invite_message_text: function (playerName) { return "Seni bu Yapbozu \u00E7\u00F6zmen i\u00E7in davet ediyorum."; },
    fb_invite_message_cta: 'OYNA',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy90cl9UUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFFBQVE7SUFDNUIsbUJBQW1CLEVBQUUsTUFBTTtJQUMzQixrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsUUFBUTtJQUVsQyxnQkFBZ0IsRUFBRSx1Q0FBdUM7SUFFekQsa0JBQWtCLEVBQUUsWUFBWTtJQUNoQyxtQkFBbUIsRUFBRSxPQUFPO0lBQzVCLDJCQUEyQixFQUFFLGlCQUFpQjtJQUM5QyxnQ0FBZ0MsRUFBRSx1QkFBdUI7SUFFekQsb0JBQW9CLEVBQUUsY0FBYztJQUVwQyxvQkFBb0IsRUFBRSxPQUFPO0lBQzdCLG9CQUFvQixFQUFFLEtBQUs7SUFFM0IsZ0JBQWdCLEVBQUUsb0dBQTREO0lBQzlFLGdCQUFnQixFQUFFLGNBQU0sT0FBQSx5RkFBK0MsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLDJEQUFpRCxFQUEzSCxDQUEySDtJQUNuSixnQkFBZ0IsRUFBRSwrTEFBb0g7SUFDdEksc0JBQXNCLEVBQUUsT0FBTztJQUUvQixpQkFBaUIsRUFBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsK0NBQXVDO0lBQzFGLGdCQUFnQixFQUFFLFlBQVk7SUFDOUIsc0JBQXNCLEVBQUUsTUFBTTtJQUU5QixxQkFBcUIsRUFBRSxpQkFBaUI7SUFDeEMseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLHNDQUFzQztJQUN6RCxrQkFBa0IsRUFBRSxVQUFVO0lBRTlCLHFCQUFxQixFQUFFLGFBQWE7SUFDcEMsMEJBQTBCLEVBQUUsTUFBTTtJQUNsQyw0QkFBNEIsRUFBRSxhQUFhO0lBQzNDLHdCQUF3QixFQUFFLG9CQUFvQjtJQUU5QyxnQ0FBZ0MsRUFBRSxzQkFBc0I7SUFFeEQsbUJBQW1CLEVBQUUsdUJBQXVCO0lBQzVDLG1CQUFtQixFQUFFLE9BQU87SUFFNUIsbUJBQW1CLEVBQUUsU0FBUztJQUU5QiwrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDZGQUE2RjtJQUM3RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLDREQUE2QyxFQUE3QyxDQUE2QztJQUNuRixxQkFBcUIsRUFBRSxNQUFNO0NBRS9CLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ1BBWUxBxZ4nLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ8OWRMOcTCcsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdBTCcsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdPWU5BJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ1NFVklZRScsXG5cbiAgIGxhYmVsX2xvYWRpbmdfYWQ6ICdSZWtsYW1sYXIgecO8a2xlbml5b3IuIEzDvHRmZW4gYmVrbGV5aW4nLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdZw5xLTEVOSVlPUicsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAnREVWQU0nLFxuICAgbGFiZWxfZ2FtZV9wbGF5X21vcmVfcHV6emxlOiAnREFIQSDDh09LIFlBUEJPWicsXG4gICBsYWJlbF9nYW1lcGxheV9zZWxlY3RfZGlmZmljdWx0eTogJ1pPUkxVSyBERVJFQ0VTSU5JIFNFw4cnLFxuXG4gICBsYWJlbF9meF92aWRlb19lcnJvcjogJ1ZpZGVvIGhhdGFzxLEnLFxuXG4gICBsYWJlbF9zZXR0aW5nc19tdXNpYzogJ03DnFpJSycsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ1NFUycsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGDEsGtpIHBhcsOnYXlhIHTEsWtsYXnEsXAgdGHFn8SxeWFyYWtcXG5kb8SfcnUgeWVybGVyZSB5ZXJsZcWfdGlyaW4uYCxcbiAgIGxhYmVsX3R1dF9zdGVwXzI6ICgpID0+IGBCdXJheWEgdMSxa2xhecSxcCBiaXJrYcOnXFxucGFyw6dhecSxIMOnw7Z6bWVrIGnDp2luICR7X0cuY29uZmlnR2FtZS5oaW50Q29pblByaWNlfSA8aW1nIHNyYz1cImljb25fY29pblwiIHdpZHRoPTQwIGhlaWdodD00MC8+IMO2ZGUuYCwgIC8vIHRoaXMgbGFiZWwgaXMgUmljaFRleHQuIFwiaWNvbl9jb2luXCIgaXMgc3ByaXRlIG5hbWUgaW4gdGhlIGxpbmtlZCBhdGxhcy5cbiAgIGxhYmVsX3R1dF9zdGVwXzM6IGBIZXIgeWFwYm96IGnDp2luXFxuc8O8cmUgc8SxbsSxcsSxIHBhcsOnYSBzYXnEsXPEsW5hXFxuYmHEn2zEsSBvbGFyYWsgZGXEn2nFn2VjZWt0aXIuXFxuXFxuU2FrxLFuIHPDvHJlbmluXFxuZG9sbWFzxLFuYSBpemluIHZlcm1leWluIWAsXG4gICBsYWJlbF90dXRfYnRuX2NvbnRpbnVlOiAnREVWQU0nLFxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYCR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IEpFVE9OIEtBWkFOTUFLXFxuScOHSU4gVklERU9ZVSBJWkxFWUlOYCxcbiAgIGxhYmVsX2FsZXJ0X2JhY2s6ICdPTFVNU1VaTFVLJyxcbiAgIGxhYmVsX2FsZXJ0X2Vhcm5fc3RhcnM6ICdFVkVUJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnU0VWSVlFIEdFw4dJTERJIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ09ZVU5BIERFVkFNXFxuRVRNRUsgSVNUSVlPUlxcbk1VU1VOVVo/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ0RVUkFLTEFUJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAnT1lVTiBCSVRUSSEnLFxuICAgbGFiZWxfZ2FtZW92ZXJfc2NvcmVfaW50cm86ICdQVUFOJyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdURUtSQVIgREVORScsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdIQVlJUiwgVEXFnkVLS8OcUkxFUicsXG5cbiAgIGxhYmVsX2hvbWVfYnV0dG9uX3BsYXlfd19mcmllbmRzOiAnQVJLQURBxZ5MQVJJTkxBXFxuT1lOQScsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICdCZW5pIHllbmViaWxpciBtaXNpbj8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1BVQU46JyxcblxuICAgbGFiZWxfd2luX3dlbGxfZG9uZTogJ0FmZXJpbiEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gIGZiIHNvY2lhbCBjb250ZW50c1xuICAgLy8gZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgJHtwbGF5ZXJOYW1lfSBCdWxtYWNhecSxIMOnw7Z6bWVrIGnDp2luIGRhdmV0IGVkaXlvciFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgU2VuaSBidSBZYXBib3p1IMOnw7Z6bWVuIGnDp2luIGRhdmV0IGVkaXlvcnVtLmAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdPWU5BJyxcblxufVxuXG5cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/project_init_comp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6a573g+HCdKnYr0iab16Em0', 'project_init_comp');
// script/system/project_init_comp.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ProjectInitComp = /** @class */ (function (_super) {
    __extends(ProjectInitComp, _super);
    function ProjectInitComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // *** Needa put these lines in start() to make 'em execute first before all other component onLoads
    ProjectInitComp.prototype.start = function () {
        window['_G'] = _G;
    };
    // ---- Initialize logic for entire project
    ProjectInitComp.prototype.onLoad = function () {
        // remove loading bg: htmlLoadingBackground (html div tag)
        // only start after 0.5 secs and (maximum 5 secs passed /or/ avatar loaded)
        var startFunc = function () {
            var loadingBg = document.getElementById('htmlLoadingBackground');
            if (loadingBg)
                loadingBg.style.display = 'none';
            _G.analytic.logPageView();
        };
        _.waitToRun(startFunc, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 5, startFunc);
        // app event on show/hide
        cc.game.on(cc.game.EVENT_SHOW, function () { return _G.appEvents.onAppShow(); });
        cc.game.on(cc.game.EVENT_HIDE, function () { return _G.appEvents.onAppHide(); });
        // init sub modules
        for (var moduleName in _G)
            if (_G[moduleName].init)
                _G[moduleName].init();
        // add onshow & hide => pause & unpause
        _G.appEvents.addAppHideCallback(function () { return _G.gameMechanic.onPause(true); });
    };
    ProjectInitComp = __decorate([
        ccclass
    ], ProjectInitComp);
    return ProjectInitComp;
}(cc.Component));
exports.default = ProjectInitComp;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3Byb2plY3RfaW5pdF9jb21wLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBDQUE0QztBQUNwQyxJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFZCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUU1QztJQUE2QyxtQ0FBWTtJQUF6RDs7SUE0QkEsQ0FBQztJQTNCRSxvR0FBb0c7SUFDcEcsK0JBQUssR0FBTDtRQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELDJDQUEyQztJQUMzQyxnQ0FBTSxHQUFOO1FBRUcsMERBQTBEO1FBQzFELDJFQUEyRTtRQUMzRSxJQUFNLFNBQVMsR0FBRztZQUNmLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNuRSxJQUFJLFNBQVM7Z0JBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2hELEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFBO1FBQ0QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTlFLHlCQUF5QjtRQUN6QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO1FBQy9ELEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFFL0QsbUJBQW1CO1FBQ25CLEtBQUssSUFBSSxVQUFVLElBQUksRUFBRTtZQUFFLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUk7Z0JBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRTFFLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGNBQU0sT0FBQSxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUEzQmlCLGVBQWU7UUFEbkMsT0FBTztPQUNhLGVBQWUsQ0E0Qm5DO0lBQUQsc0JBQUM7Q0E1QkQsQUE0QkMsQ0E1QjRDLEVBQUUsQ0FBQyxTQUFTLEdBNEJ4RDtrQkE1Qm9CLGVBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0SW5pdENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgLy8gKioqIE5lZWRhIHB1dCB0aGVzZSBsaW5lcyBpbiBzdGFydCgpIHRvIG1ha2UgJ2VtIGV4ZWN1dGUgZmlyc3QgYmVmb3JlIGFsbCBvdGhlciBjb21wb25lbnQgb25Mb2Fkc1xuICAgc3RhcnQoKSB7XG4gICAgICB3aW5kb3dbJ19HJ10gPSBfRztcbiAgIH1cblxuICAgLy8gLS0tLSBJbml0aWFsaXplIGxvZ2ljIGZvciBlbnRpcmUgcHJvamVjdFxuICAgb25Mb2FkKCkge1xuXG4gICAgICAvLyByZW1vdmUgbG9hZGluZyBiZzogaHRtbExvYWRpbmdCYWNrZ3JvdW5kIChodG1sIGRpdiB0YWcpXG4gICAgICAvLyBvbmx5IHN0YXJ0IGFmdGVyIDAuNSBzZWNzIGFuZCAobWF4aW11bSA1IHNlY3MgcGFzc2VkIC9vci8gYXZhdGFyIGxvYWRlZClcbiAgICAgIGNvbnN0IHN0YXJ0RnVuYyA9ICgpID0+IHtcbiAgICAgICAgIGNvbnN0IGxvYWRpbmdCZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdodG1sTG9hZGluZ0JhY2tncm91bmQnKTtcbiAgICAgICAgIGlmIChsb2FkaW5nQmcpIGxvYWRpbmdCZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgX0cuYW5hbHl0aWMubG9nUGFnZVZpZXcoKTtcbiAgICAgIH1cbiAgICAgIF8ud2FpdFRvUnVuKHN0YXJ0RnVuYywgJ2lzUmVhbEF2YXRhckxvYWRlZCcsIF9HLm1hcFZpc3VhbCwgMC4xLCA1LCBzdGFydEZ1bmMpO1xuXG4gICAgICAvLyBhcHAgZXZlbnQgb24gc2hvdy9oaWRlXG4gICAgICBjYy5nYW1lLm9uKGNjLmdhbWUuRVZFTlRfU0hPVywgKCkgPT4gX0cuYXBwRXZlbnRzLm9uQXBwU2hvdygpKTtcbiAgICAgIGNjLmdhbWUub24oY2MuZ2FtZS5FVkVOVF9ISURFLCAoKSA9PiBfRy5hcHBFdmVudHMub25BcHBIaWRlKCkpO1xuXG4gICAgICAvLyBpbml0IHN1YiBtb2R1bGVzXG4gICAgICBmb3IgKGxldCBtb2R1bGVOYW1lIGluIF9HKSBpZiAoX0dbbW9kdWxlTmFtZV0uaW5pdCkgX0dbbW9kdWxlTmFtZV0uaW5pdCgpO1xuXG4gICAgICAvLyBhZGQgb25zaG93ICYgaGlkZSA9PiBwYXVzZSAmIHVucGF1c2VcbiAgICAgIF9HLmFwcEV2ZW50cy5hZGRBcHBIaWRlQ2FsbGJhY2soKCkgPT4gX0cuZ2FtZU1lY2hhbmljLm9uUGF1c2UodHJ1ZSkpO1xuICAgfVxufVxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/pt_PT.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8210amc7IBO6bTdVJih3gor', 'pt_PT');
// script/system/localization/language-files/pt_PT.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'COMPARTILHAR',
    common_label_reward: 'RECOMPENSA',
    common_label_claim: 'REIVINDICAR',
    common_label_button_play: 'JOGAR',
    common_label_level_intro: 'NÍVEL',
    label_loading_ad: 'Carregando anúncios. Por favor, espere',
    label_game_loading: 'CARREGANDO',
    label_game_continue: 'CONTINUAR',
    label_game_play_more_puzzle: 'MAIS QUEBRA-CABEÇAS',
    label_gameplay_select_difficulty: 'SELECIONAR A DIFICULDADE',
    label_fx_video_error: 'Erro no vídeo',
    label_settings_music: 'MÚSICA',
    label_settings_sound: 'SONS',
    label_tut_step_1: "Clique em duas pe\u00E7as para mov\u00EA-las\ne posicion\u00E1-las corretamente",
    label_tut_step_2: function () { return "Clique aqui e pague " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> para\nresolver algumas pe\u00E7as."; },
    label_tut_step_3: "O limite de tempo para\ncada quebra-cabe\u00E7a depender\u00E1\ndo n\u00FAmero de pe\u00E7as.\n\n\u00A1N\u00E3o deixe o tempo acabar!",
    label_tut_btn_continue: 'CONTINUAR',
    label_alert_intro: "VER UM V\u00CDDEO PARA\nGANHAR " + _G.configGame.videoCoinReward + " MOEDAS",
    label_alert_back: 'NÃO',
    label_alert_earn_stars: 'SIM',
    label_level_up_header: 'LEVEL UP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'DESEJA RETOMAR\nO JOGO?',
    label_pause_header: 'PAUSAR',
    label_gameover_header: 'FIM DE JOGO',
    label_gameover_score_intro: 'PONTUAÇÃO:',
    label_gameover_btn_try_again: 'TENTE NOVAMENTE',
    label_gameover_no_thanks: 'NÃO, OBRIGADO',
    label_home_button_play_w_friends: 'JOGAR COM\nAMIGOS',
    label_share_intro_1: 'Você pode me vencer?',
    label_share_intro_2: 'PONTUAÇÃO:',
    label_win_well_done: 'Muito bem!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} convida você a resolver este puzzle!`,
    fb_invite_message_text: function (playerName) { return "Te convido a resolver este quebra-cabe\u00E7a"; },
    fb_invite_message_cta: 'JOGAR',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9wdF9QVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLGNBQWM7SUFDbEMsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxhQUFhO0lBQ2pDLHdCQUF3QixFQUFFLE9BQU87SUFDakMsd0JBQXdCLEVBQUUsT0FBTztJQUVqQyxnQkFBZ0IsRUFBRSx3Q0FBd0M7SUFFMUQsa0JBQWtCLEVBQUUsWUFBWTtJQUNoQyxtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLHFCQUFxQjtJQUNsRCxnQ0FBZ0MsRUFBRSwwQkFBMEI7SUFFNUQsb0JBQW9CLEVBQUUsZUFBZTtJQUVyQyxvQkFBb0IsRUFBRSxRQUFRO0lBQzlCLG9CQUFvQixFQUFFLE1BQU07SUFFNUIsZ0JBQWdCLEVBQUUsaUZBQWtFO0lBQ3BGLGdCQUFnQixFQUFFLGNBQU0sT0FBQSx5QkFBdUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLG9GQUEwRSxFQUE1SCxDQUE0SDtJQUNwSixnQkFBZ0IsRUFBRSx1SUFBeUc7SUFDM0gsc0JBQXNCLEVBQUUsV0FBVztJQUVuQyxpQkFBaUIsRUFBRSxvQ0FBNkIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLFlBQVM7SUFDdEYsZ0JBQWdCLEVBQUUsS0FBSztJQUN2QixzQkFBc0IsRUFBRSxLQUFLO0lBRTdCLHFCQUFxQixFQUFFLFdBQVc7SUFDbEMseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLHlCQUF5QjtJQUM1QyxrQkFBa0IsRUFBRSxRQUFRO0lBRTVCLHFCQUFxQixFQUFFLGFBQWE7SUFDcEMsMEJBQTBCLEVBQUUsWUFBWTtJQUN4Qyw0QkFBNEIsRUFBRSxpQkFBaUI7SUFDL0Msd0JBQXdCLEVBQUUsZUFBZTtJQUV6QyxnQ0FBZ0MsRUFBRSxtQkFBbUI7SUFFckQsbUJBQW1CLEVBQUUsc0JBQXNCO0lBQzNDLG1CQUFtQixFQUFFLFlBQVk7SUFFakMsbUJBQW1CLEVBQUUsWUFBWTtJQUVqQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDhGQUE4RjtJQUM5RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLCtDQUEwQyxFQUExQyxDQUEwQztJQUNoRixxQkFBcUIsRUFBRSxPQUFPO0NBRWhDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ0NPTVBBUlRJTEhBUicsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnUkVDT01QRU5TQScsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdSRUlWSU5ESUNBUicsXG4gICBjb21tb25fbGFiZWxfYnV0dG9uX3BsYXk6ICdKT0dBUicsXG4gICBjb21tb25fbGFiZWxfbGV2ZWxfaW50cm86ICdOw41WRUwnLFxuXG4gICBsYWJlbF9sb2FkaW5nX2FkOiAnQ2FycmVnYW5kbyBhbsO6bmNpb3MuIFBvciBmYXZvciwgZXNwZXJlJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAnQ0FSUkVHQU5ETycsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAnQ09OVElOVUFSJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ01BSVMgUVVFQlJBLUNBQkXDh0FTJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnU0VMRUNJT05BUiBBIERJRklDVUxEQURFJyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICdFcnJvIG5vIHbDrWRlbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTcOaU0lDQScsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ1NPTlMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgQ2xpcXVlIGVtIGR1YXMgcGXDp2FzIHBhcmEgbW92w6otbGFzXFxuZSBwb3NpY2lvbsOhLWxhcyBjb3JyZXRhbWVudGVgLFxuICAgbGFiZWxfdHV0X3N0ZXBfMjogKCkgPT4gYENsaXF1ZSBhcXVpIGUgcGFndWUgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gcGFyYVxcbnJlc29sdmVyIGFsZ3VtYXMgcGXDp2FzLmAsICAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgTyBsaW1pdGUgZGUgdGVtcG8gcGFyYVxcbmNhZGEgcXVlYnJhLWNhYmXDp2EgZGVwZW5kZXLDoVxcbmRvIG7Dum1lcm8gZGUgcGXDp2FzLlxcblxcbsKhTsOjbyBkZWl4ZSBvIHRlbXBvIGFjYWJhciFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVBUicsXG5cbiAgIGxhYmVsX2FsZXJ0X2ludHJvOiBgVkVSIFVNIFbDjURFTyBQQVJBXFxuR0FOSEFSICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IE1PRURBU2AsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAnTsODTycsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnU0lNJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTEVWRUwgVVAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnREVTRUpBIFJFVE9NQVJcXG5PIEpPR08/JyxcbiAgIGxhYmVsX3BhdXNlX2hlYWRlcjogJ1BBVVNBUicsXG5cbiAgIGxhYmVsX2dhbWVvdmVyX2hlYWRlcjogJ0ZJTSBERSBKT0dPJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAnUE9OVFVBw4fDg086JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdURU5URSBOT1ZBTUVOVEUnLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTsODTywgT0JSSUdBRE8nLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ0pPR0FSIENPTVxcbkFNSUdPUycsXG5cbiAgIGxhYmVsX3NoYXJlX2ludHJvXzE6ICdWb2PDqiBwb2RlIG1lIHZlbmNlcj8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1BPTlRVQcOHw4NPOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdNdWl0byBiZW0hJyxcblxuICAgbGFiZWxfY2F0ZWdvcnlfbGlzdF9oZWFkZXJfbmFtZTogeCA9PiB7XG4gICAgICByZXR1cm4gX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5QXJyLmZpbmQoY2F0SW5mbyA9PiBjYXRJbmZvLmlkID09IHgpPy5sYW5ndWFnZXNbX0cubG9jYWxpemUuY3VycmVudExhbmd1YWdlQ29kZV0/LnRvVXBwZXJDYXNlKCk7XG4gICB9LFxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0gY29udmlkYSB2b2PDqiBhIHJlc29sdmVyIGVzdGUgcHV6emxlIWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGBUZSBjb252aWRvIGEgcmVzb2x2ZXIgZXN0ZSBxdWVicmEtY2FiZcOnYWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICdKT0dBUicsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/vi_VN.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '43213CWfmlGOLqN3VgtW2bk', 'vi_VN');
// script/system/localization/language-files/vi_VN.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'CHIA SẺ',
    common_label_reward: 'PHẦN THƯỞNG',
    common_label_claim: 'NHẬN',
    common_label_button_play: 'CHƠI',
    common_label_level_intro: 'CẤP',
    label_loading_ad: 'Đang tải quảng cáo. Vui lòng chờ',
    label_game_loading: 'ĐANG TẢI',
    label_game_continue: 'TIẾP TỤC',
    label_game_play_more_puzzle: 'HÌNH KHÁC',
    label_gameplay_select_difficulty: 'CHỌN ĐỘ KHÓ:',
    label_fx_video_error: 'Lỗi video',
    label_settings_music: 'NHẠC NỀN',
    label_settings_sound: 'ÂM HIỆU ỨNG',
    label_tut_step_1: "B\u1EA5m v\u00E0o c\u00E1c m\u1EA3nh nh\u1ECF \u0111\u1EC3\n\u0111\u1ED5i ch\u1ED7 v\u00E0o \u0111\u00FAng v\u1ECB tr\u00ED",
    label_tut_step_2: function () { return "B\u1EA5m v\u00E0o \u0111\u00E2y v\u00E0 d\u00F9ng " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/>\n\u0111\u1EC3 gi\u1EA3i 2 mi\u1EBFng gh\u00E9p."; },
    label_tut_step_3: "Th\u1EDDi gian cho m\u1ED7i b\u00E0i\nt\u00F9y thu\u1ED9c v\u00E0o s\u1ED1 mi\u1EBFng gh\u00E9p\n\n\u0110\u1EEBng \u0111\u1EC3 b\u1ECB h\u1EBFt gi\u1EDD!",
    label_tut_btn_continue: 'TIẾP TỤC',
    label_alert_intro: "XEM 1 VIDEO \u0110\u1EC2\nNH\u1EACN " + _G.configGame.videoCoinReward + " XU",
    label_alert_back: 'KHÔNG',
    label_alert_earn_stars: 'CÓ',
    label_level_up_header: 'LÊN CẤP!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'BẠN CÓ MUỐN\nTIẾP TỤC CHƠI?',
    label_pause_header: 'TẠM DỪNG',
    label_gameover_header: 'THUA RỒI',
    label_gameover_score_intro: 'ĐIỂM:',
    label_gameover_btn_try_again: 'CHƠI LẠI',
    label_gameover_no_thanks: 'KHÔNG, CẢM ƠN',
    label_home_button_play_w_friends: 'CHƠI VỚI\nBẠN BÈ',
    label_share_intro_1: 'Bạn có thể thắng tôi?',
    label_share_intro_2: 'ĐIỂM : ',
    label_win_well_done: 'Tuyệt vời!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} mời bạn giải một bài xếp hình!`,
    fb_invite_message_text: function (playerName) { return "T\u00F4i m\u1EDDi b\u1EA1n gi\u1EA3i m\u1ED9t b\u00E0i x\u1EBFp h\u00ECnh!"; },
    fb_invite_message_cta: 'CHƠI',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy92aV9WTi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFNBQVM7SUFDN0IsbUJBQW1CLEVBQUUsYUFBYTtJQUNsQyxrQkFBa0IsRUFBRSxNQUFNO0lBQzFCLHdCQUF3QixFQUFFLE1BQU07SUFDaEMsd0JBQXdCLEVBQUUsS0FBSztJQUUvQixnQkFBZ0IsRUFBRSxrQ0FBa0M7SUFFcEQsa0JBQWtCLEVBQUUsVUFBVTtJQUM5QixtQkFBbUIsRUFBRSxVQUFVO0lBQy9CLDJCQUEyQixFQUFFLFdBQVc7SUFDeEMsZ0NBQWdDLEVBQUUsY0FBYztJQUVoRCxvQkFBb0IsRUFBRSxXQUFXO0lBRWpDLG9CQUFvQixFQUFFLFVBQVU7SUFDaEMsb0JBQW9CLEVBQUUsYUFBYTtJQUVuQyxnQkFBZ0IsRUFBRSw2SEFBa0Q7SUFDcEUsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLHVEQUF1QixFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsaUdBQW1FLEVBQXJILENBQXFIO0lBQzdJLGdCQUFnQixFQUFFLDJKQUEyRTtJQUM3RixzQkFBc0IsRUFBRSxVQUFVO0lBRWxDLGlCQUFpQixFQUFFLHlDQUF3QixFQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsUUFBSztJQUM3RSxnQkFBZ0IsRUFBRSxPQUFPO0lBQ3pCLHNCQUFzQixFQUFFLElBQUk7SUFFNUIscUJBQXFCLEVBQUUsVUFBVTtJQUNqQyx5QkFBeUIsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUcsQ0FBRyxFQUFOLENBQU07SUFFeEMsaUJBQWlCLEVBQUUsNkJBQTZCO0lBQ2hELGtCQUFrQixFQUFFLFVBQVU7SUFFOUIscUJBQXFCLEVBQUUsVUFBVTtJQUNqQywwQkFBMEIsRUFBRSxPQUFPO0lBQ25DLDRCQUE0QixFQUFFLFVBQVU7SUFDeEMsd0JBQXdCLEVBQUUsZUFBZTtJQUV6QyxnQ0FBZ0MsRUFBRSxrQkFBa0I7SUFFcEQsbUJBQW1CLEVBQUUsdUJBQXVCO0lBQzVDLG1CQUFtQixFQUFFLFNBQVM7SUFFOUIsbUJBQW1CLEVBQUUsWUFBWTtJQUVqQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFHRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLHdGQUF3RjtJQUN4RixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLDRFQUFvQyxFQUFwQyxDQUFvQztJQUMxRSxxQkFBcUIsRUFBRSxNQUFNO0NBRS9CLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ0NISUEgU+G6uicsXG4gICBjb21tb25fbGFiZWxfcmV3YXJkOiAnUEjhuqZOIFRIxq/hu55ORycsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdOSOG6rE4nLFxuICAgY29tbW9uX2xhYmVsX2J1dHRvbl9wbGF5OiAnQ0jGoEknLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAnQ+G6pFAnLFxuXG4gICBsYWJlbF9sb2FkaW5nX2FkOiAnxJBhbmcgdOG6o2kgcXXhuqNuZyBjw6FvLiBWdWkgbMOybmcgY2jhu50nLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICfEkEFORyBU4bqiSScsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAnVEnhur5QIFThu6RDJyxcbiAgIGxhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZTogJ0jDjE5IIEtIw4FDJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnQ0jhu4xOIMSQ4buYIEtIw5M6JyxcblxuICAgbGFiZWxfZnhfdmlkZW9fZXJyb3I6ICdM4buXaSB2aWRlbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTkjhuqBDIE7hu4BOJyxcbiAgIGxhYmVsX3NldHRpbmdzX3NvdW5kOiAnw4JNIEhJ4buGVSDhu6hORycsXG5cbiAgIGxhYmVsX3R1dF9zdGVwXzE6IGBC4bqlbSB2w6BvIGPDoWMgbeG6o25oIG5o4buPIMSR4buDXFxuxJHhu5VpIGNo4buXIHbDoG8gxJHDum5nIHbhu4sgdHLDrWAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQuG6pW0gdsOgbyDEkcOieSB2w6AgZMO5bmcgJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz5cXG7EkeG7gyBnaeG6o2kgMiBtaeG6v25nIGdow6lwLmAsICAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgVGjhu51pIGdpYW4gY2hvIG3hu5dpIGLDoGlcXG50w7l5IHRodeG7mWMgdsOgbyBz4buRIG1p4bq/bmcgZ2jDqXBcXG5cXG7EkOG7q25nIMSR4buDIGLhu4sgaOG6v3QgZ2nhu50hYCxcbiAgIGxhYmVsX3R1dF9idG5fY29udGludWU6ICdUSeG6vlAgVOG7pEMnLFxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYFhFTSAxIFZJREVPIMSQ4buCXFxuTkjhuqxOICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IFhVYCxcbiAgIGxhYmVsX2FsZXJ0X2JhY2s6ICdLSMOUTkcnLFxuICAgbGFiZWxfYWxlcnRfZWFybl9zdGFyczogJ0PDkycsXG5cbiAgIGxhYmVsX2xldmVsX3VwX2hlYWRlcjogJ0zDik4gQ+G6pFAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnQuG6oE4gQ8OTIE1V4buQTlxcblRJ4bq+UCBU4bukQyBDSMagST8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAnVOG6oE0gROG7qk5HJyxcblxuICAgbGFiZWxfZ2FtZW92ZXJfaGVhZGVyOiAnVEhVQSBS4buSSScsXG4gICBsYWJlbF9nYW1lb3Zlcl9zY29yZV9pbnRybzogJ8SQSeG7gk06JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdDSMagSSBM4bqgSScsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICdLSMOUTkcsIEPhuqJNIMagTicsXG5cbiAgIGxhYmVsX2hvbWVfYnV0dG9uX3BsYXlfd19mcmllbmRzOiAnQ0jGoEkgVuG7mklcXG5C4bqgTiBCw4gnLFxuXG4gICBsYWJlbF9zaGFyZV9pbnRyb18xOiAnQuG6oW4gY8OzIHRo4buDIHRo4bqvbmcgdMO0aT8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ8SQSeG7gk0gOiAnLFxuXG4gICBsYWJlbF93aW5fd2VsbF9kb25lOiAnVHV54buHdCB24budaSEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gIGZiIHNvY2lhbCBjb250ZW50c1xuICAgLy8gZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgJHtwbGF5ZXJOYW1lfSBt4budaSBi4bqhbiBnaeG6o2kgbeG7mXQgYsOgaSB44bq/cCBow6xuaCFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfdGV4dDogcGxheWVyTmFtZSA9PiBgVMO0aSBt4budaSBi4bqhbiBnaeG6o2kgbeG7mXQgYsOgaSB44bq/cCBow6xuaCFgLFxuICAgZmJfaW52aXRlX21lc3NhZ2VfY3RhOiAnQ0jGoEknLFxuXG59XG5cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/fr_FR.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ecab3cCIppDSpZiK4lgRa5D', 'fr_FR');
// script/system/localization/language-files/fr_FR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'PARTAGER',
    common_label_reward: 'RÉCOMPENSE',
    common_label_claim: 'RÉCLAMER',
    common_label_button_play: 'JOUER À',
    common_label_level_intro: 'NIVEAU',
    label_loading_ad: 'Chargement des annonces. Veuillez patienter',
    label_game_loading: 'CHARGEMENT DE',
    label_game_continue: 'CONTINUER',
    label_game_play_more_puzzle: 'PLUS DE PUZZLES',
    label_gameplay_select_difficulty: 'SÉLECTIONNEZ LA DIFFICULTÉ',
    label_fx_video_error: 'Erreur vidéo',
    label_settings_music: 'MUSIQUE',
    label_settings_sound: 'SONS',
    label_tut_step_1: "Cliquez sur deux pi\u00E8ces pour les\nd\u00E9placer et les placer correctement.",
    label_tut_step_2: function () { return "Cliquez ici et payez " + _G.configGame.hintCoinPrice + " <img src=\"icon_coin\" width=40 height=40/> pour\nr\u00E9soudre un couple de pi\u00E8ces."; },
    label_tut_step_3: "\"Le temps limite pour\nchaque puzzle d\u00E9pendra\ndu nombre de pi\u00E8ces.\n\nNe le laissez pas s'\u00E9puiser !\"",
    label_tut_btn_continue: 'CONTINUER',
    label_alert_intro: "REGARDEZ UNE VID\u00C9O\nPOUR GAGNER " + _G.configGame.videoCoinReward + " PI\u00C8CES",
    label_alert_back: 'NON',
    label_alert_earn_stars: 'OUI',
    label_level_up_header: 'MONTEZ DE NIVEAU !',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'VOULEZ-VOUS\nREPRENDRE LE\nJEU ?',
    label_pause_header: 'PAUSE',
    label_gameover_header: 'TERMINÉ',
    label_gameover_score_intro: 'SCORE:',
    label_gameover_btn_try_again: 'ESSAYER À NOUVEAU',
    label_gameover_no_thanks: 'NON, MERCI',
    label_home_button_play_w_friends: 'JOUER AVEC\nDES AMIS',
    label_share_intro_1: 'Pouvez-vous me battre?',
    label_share_intro_2: 'SCORE:',
    label_win_well_done: 'Bien joué !',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} vous invite à résoudre un puzzle!`,
    fb_invite_message_text: function (playerName) { return "Je vous invite \u00E0 r\u00E9soudre cette \u00E9nigme"; },
    fb_invite_message_cta: 'JOUER À',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9mcl9GUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLFVBQVU7SUFDOUIsbUJBQW1CLEVBQUUsWUFBWTtJQUNqQyxrQkFBa0IsRUFBRSxVQUFVO0lBQzlCLHdCQUF3QixFQUFFLFNBQVM7SUFDbkMsd0JBQXdCLEVBQUUsUUFBUTtJQUVsQyxnQkFBZ0IsRUFBRSw2Q0FBNkM7SUFFL0Qsa0JBQWtCLEVBQUUsZUFBZTtJQUNuQyxtQkFBbUIsRUFBRSxXQUFXO0lBQ2hDLDJCQUEyQixFQUFFLGlCQUFpQjtJQUM5QyxnQ0FBZ0MsRUFBRSw0QkFBNEI7SUFFOUQsb0JBQW9CLEVBQUUsY0FBYztJQUVwQyxvQkFBb0IsRUFBRSxTQUFTO0lBQy9CLG9CQUFvQixFQUFFLE1BQU07SUFFNUIsZ0JBQWdCLEVBQUUsa0ZBQXdFO0lBQzFGLGdCQUFnQixFQUFFLGNBQU0sT0FBQSwwQkFBd0IsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLCtGQUFnRixFQUFuSSxDQUFtSTtJQUMzSixnQkFBZ0IsRUFBRSx3SEFBdUc7SUFDekgsc0JBQXNCLEVBQUUsV0FBVztJQUVuQyxpQkFBaUIsRUFBRSwwQ0FBbUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLGlCQUFTO0lBQzVGLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsc0JBQXNCLEVBQUUsS0FBSztJQUU3QixxQkFBcUIsRUFBRSxvQkFBb0I7SUFDM0MseUJBQXlCLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFHLENBQUcsRUFBTixDQUFNO0lBRXhDLGlCQUFpQixFQUFFLGtDQUFrQztJQUNyRCxrQkFBa0IsRUFBRSxPQUFPO0lBRTNCLHFCQUFxQixFQUFFLFNBQVM7SUFDaEMsMEJBQTBCLEVBQUUsUUFBUTtJQUNwQyw0QkFBNEIsRUFBRSxtQkFBbUI7SUFDakQsd0JBQXdCLEVBQUUsWUFBWTtJQUV0QyxnQ0FBZ0MsRUFBRSxzQkFBc0I7SUFFeEQsbUJBQW1CLEVBQUUsd0JBQXdCO0lBQzdDLG1CQUFtQixFQUFFLFFBQVE7SUFFN0IsbUJBQW1CLEVBQUUsYUFBYTtJQUVsQywrQkFBK0IsRUFBRSxVQUFBLENBQUM7O1FBQy9CLG1CQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFmLENBQWUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsMkNBQUcsV0FBVyxHQUFHO0lBQ2xJLENBQUM7SUFJRCxxQ0FBcUM7SUFDckMsc0JBQXNCO0lBQ3RCLDJGQUEyRjtJQUMzRixzQkFBc0IsRUFBRSxVQUFBLFVBQVUsSUFBSSxPQUFBLHVEQUF3QyxFQUF4QyxDQUF3QztJQUM5RSxxQkFBcUIsRUFBRSxTQUFTO0NBRWxDLENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi8uLi8uLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmV4cG9ydCA9IHtcbiAgIGNvbW1vbl9sYWJlbF9zaGFyZTogJ1BBUlRBR0VSJyxcbiAgIGNvbW1vbl9sYWJlbF9yZXdhcmQ6ICdSw4lDT01QRU5TRScsXG4gICBjb21tb25fbGFiZWxfY2xhaW06ICdSw4lDTEFNRVInLFxuICAgY29tbW9uX2xhYmVsX2J1dHRvbl9wbGF5OiAnSk9VRVIgw4AnLFxuICAgY29tbW9uX2xhYmVsX2xldmVsX2ludHJvOiAnTklWRUFVJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ0NoYXJnZW1lbnQgZGVzIGFubm9uY2VzLiBWZXVpbGxleiBwYXRpZW50ZXInLFxuXG4gICBsYWJlbF9nYW1lX2xvYWRpbmc6ICdDSEFSR0VNRU5UIERFJyxcbiAgIGxhYmVsX2dhbWVfY29udGludWU6ICdDT05USU5VRVInLFxuICAgbGFiZWxfZ2FtZV9wbGF5X21vcmVfcHV6emxlOiAnUExVUyBERSBQVVpaTEVTJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAnU8OJTEVDVElPTk5FWiBMQSBESUZGSUNVTFTDiScsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAnRXJyZXVyIHZpZMOpbycsXG5cbiAgIGxhYmVsX3NldHRpbmdzX211c2ljOiAnTVVTSVFVRScsXG4gICBsYWJlbF9zZXR0aW5nc19zb3VuZDogJ1NPTlMnLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBgQ2xpcXVleiBzdXIgZGV1eCBwacOoY2VzIHBvdXIgbGVzXFxuZMOpcGxhY2VyIGV0IGxlcyBwbGFjZXIgY29ycmVjdGVtZW50LmAsXG4gICBsYWJlbF90dXRfc3RlcF8yOiAoKSA9PiBgQ2xpcXVleiBpY2kgZXQgcGF5ZXogJHtfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2V9IDxpbWcgc3JjPVwiaWNvbl9jb2luXCIgd2lkdGg9NDAgaGVpZ2h0PTQwLz4gcG91clxcbnLDqXNvdWRyZSB1biBjb3VwbGUgZGUgcGnDqGNlcy5gLCAvLyB0aGlzIGxhYmVsIGlzIFJpY2hUZXh0LiBcImljb25fY29pblwiIGlzIHNwcml0ZSBuYW1lIGluIHRoZSBsaW5rZWQgYXRsYXMuXG4gICBsYWJlbF90dXRfc3RlcF8zOiBgXCJMZSB0ZW1wcyBsaW1pdGUgcG91clxcbmNoYXF1ZSBwdXp6bGUgZMOpcGVuZHJhXFxuZHUgbm9tYnJlIGRlIHBpw6hjZXMuXFxuXFxuTmUgbGUgbGFpc3NleiBwYXMgcyfDqXB1aXNlciAhXCJgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ0NPTlRJTlVFUicsXG5cbiAgIGxhYmVsX2FsZXJ0X2ludHJvOiBgUkVHQVJERVogVU5FIFZJRMOJT1xcblBPVVIgR0FHTkVSICR7X0cuY29uZmlnR2FtZS52aWRlb0NvaW5SZXdhcmR9IFBJw4hDRVNgLFxuICAgbGFiZWxfYWxlcnRfYmFjazogJ05PTicsXG4gICBsYWJlbF9hbGVydF9lYXJuX3N0YXJzOiAnT1VJJyxcblxuICAgbGFiZWxfbGV2ZWxfdXBfaGVhZGVyOiAnTU9OVEVaIERFIE5JVkVBVSAhJyxcbiAgIGxhYmVsX2xldmVsX3VwX3RvX2xldmVsX1g6ICh4KSA9PiBgJHt4fWAsXG5cbiAgIGxhYmVsX3BhdXNlX2ludHJvOiAnVk9VTEVaLVZPVVNcXG5SRVBSRU5EUkUgTEVcXG5KRVUgPycsXG4gICBsYWJlbF9wYXVzZV9oZWFkZXI6ICdQQVVTRScsXG5cbiAgIGxhYmVsX2dhbWVvdmVyX2hlYWRlcjogJ1RFUk1JTsOJJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAnU0NPUkU6JyxcbiAgIGxhYmVsX2dhbWVvdmVyX2J0bl90cnlfYWdhaW46ICdFU1NBWUVSIMOAIE5PVVZFQVUnLFxuICAgbGFiZWxfZ2FtZW92ZXJfbm9fdGhhbmtzOiAnTk9OLCBNRVJDSScsXG5cbiAgIGxhYmVsX2hvbWVfYnV0dG9uX3BsYXlfd19mcmllbmRzOiAnSk9VRVIgQVZFQ1xcbkRFUyBBTUlTJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ1BvdXZlei12b3VzIG1lIGJhdHRyZT8nLFxuICAgbGFiZWxfc2hhcmVfaW50cm9fMjogJ1NDT1JFOicsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICdCaWVuIGpvdcOpICEnLFxuXG4gICBsYWJlbF9jYXRlZ29yeV9saXN0X2hlYWRlcl9uYW1lOiB4ID0+IHtcbiAgICAgIHJldHVybiBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlBcnIuZmluZChjYXRJbmZvID0+IGNhdEluZm8uaWQgPT0geCk/Lmxhbmd1YWdlc1tfRy5sb2NhbGl6ZS5jdXJyZW50TGFuZ3VhZ2VDb2RlXT8udG9VcHBlckNhc2UoKTtcbiAgIH0sXG5cblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAvLyAgZmIgc29jaWFsIGNvbnRlbnRzXG4gICAvLyBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGAke3BsYXllck5hbWV9IHZvdXMgaW52aXRlIMOgIHLDqXNvdWRyZSB1biBwdXp6bGUhYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYEplIHZvdXMgaW52aXRlIMOgIHLDqXNvdWRyZSBjZXR0ZSDDqW5pZ21lYCxcbiAgIGZiX2ludml0ZV9tZXNzYWdlX2N0YTogJ0pPVUVSIMOAJyxcblxufVxuXG5cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/localize.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26ced5i75JMybmd/kzrFZ8o', 'localize');
// script/system/localization/localize.ts

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localize = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
var localize_message_1 = require("./localize_message");
var toCorrectLangCode = {
    en_GB: 'en_US',
    en_UD: 'en_US',
    pt_BR: 'pt_PT',
    fr_CA: 'fr_FR',
    es_LA: 'es_ES',
    es_MX: 'es_ES',
};
var subscribedNodePath = {};
exports.localize = __assign({ supportedLanguageArr: [
        { code: 'en_US', name: 'English' },
        { code: 'es_ES', name: 'Español' },
        { code: 'pt_PT', name: 'Português' },
        { code: 'fr_FR', name: 'Français' },
        { code: 'ar_AR', name: 'عربى' },
        { code: 'id_ID', name: 'Indonesia' },
        { code: 'vi_VN', name: 'Tiếng Việt' },
        { code: 'th_TH', name: 'ภาษาไทย' },
        { code: 'tr_TR', name: 'Türkçe' },
        { code: 'de_DE', name: 'Deutsch' },
        { code: 'it_IT', name: 'Italiano' },
    ], currentLanguageCode: 'en_US', defaultLanguageObject: require('en_US'), currentLanguageObject: null, languageChangeCallbackArr: [], initCallbackArr: [], isInitialized: false, init: function () {
        var _this = this;
        this.currentLanguageObject = this.defaultLanguageObject;
        _G.user.addLoginDataFields('userLanguageCode');
        _G.user.addInitCallback(function (data) {
            // _.log(` _G.localize >> init >> data(userLanguageCode) = ${data.userLanguageCode} `, data);
            _this.isInitialized = true;
            var fbLangCode = (window['FBInstant']) ? FBInstant.getLocale() : null; //  get language from user locale => translate ASAP
            _this.onLanguageChanges(data.userLanguageCode || fbLangCode, true);
        });
        // this.listAllLabels();
    },
    listAllLabels: function () {
        _.log(" listAllLabels = ");
        cc.find('Canvas').getComponentsInChildren(cc.Label).map(function (comp) {
            _.log(_.getNodePath(comp.node));
        });
    },
    // ======= handle language changes & register callback when language changes
    onLanguageChanges: function (langCode, isInit) {
        if (isInit === void 0) { isInit = false; }
        langCode = toCorrectLangCode[langCode] || langCode;
        _.log(" _G.localize >> onLanguageChanged langCode=" + langCode + " ");
        if (!isInit && (!langCode || this.currentLanguageCode == langCode))
            return;
        try {
            langCode = langCode || this.currentLanguageCode;
            this.currentLanguageObject = require(langCode);
            this.currentLanguageCode = langCode;
            _G.utilsData.save({ userLanguageCode: this.currentLanguageCode });
        }
        catch (e) { }
        if (isInit)
            this.initCallbackArr.map(function (func) { return func(); }); // execute init callback
        else
            this.languageChangeCallbackArr.map(function (func) { return func(langCode); }); // execute lang-change callback
    },
    // === will subscribe to initCallbacks, languageChangesCallback & immediately call to translateContainer()
    subscribeTranslate: function (containerNode) {
        var _this = this;
        var path = _.getNodePath(containerNode);
        var translateFunc = function () { return _this.translateContainer(containerNode); };
        if (!subscribedNodePath[path]) {
            this.initCallbackArr.push(translateFunc);
            this.languageChangeCallbackArr.push(translateFunc);
        }
        if (this.isInitialized)
            translateFunc();
    },
    addInitCallback: function (f) {
        if (this.isInitialized)
            return f();
        this.initCallbackArr.push(f);
    },
    // ======= translate when language changes or when new node created
    // translate entire container with multiple label nodes inside
    translateContainer: function (containerNode) {
        var _this = this;
        // _.log(`_G.localize >> translateContainer >> containerNode=${containerNode ? containerNode.name : ''} // this.currentLanguageObject = `, this.currentLanguageObject);
        if (!containerNode)
            return;
        containerNode.getComponentsInChildren(cc.Label).map(function (labelComp) { return _this.translateSingleLabel(labelComp.node); });
        containerNode.getComponentsInChildren(cc.RichText).map(function (labelComp) { return _this.translateSingleLabel(labelComp.node); });
    },
    translateSingleLabel: function (labelNode, localizeData) {
        var translateGuide = this.currentLanguageObject[labelNode.name] || this.defaultLanguageObject[labelNode.name];
        // _.log(` _G.localize >> translateSingleLabel >> labelNode.name=${labelNode.name} // translateGuide=${translateGuide} // labelNode.localizeData = ${labelNode.localizeData}`);
        if (!translateGuide)
            return;
        labelNode.localizeData = localizeData !== undefined ? localizeData : labelNode.localizeData;
        var text2Fill = translateGuide;
        if (typeof translateGuide == 'function')
            text2Fill = translateGuide(labelNode.localizeData);
        _G.utilsUI.fillLabel(labelNode, text2Fill);
    },
    // translate non-labelNode texts (ex: update-async-message content & cta);
    translate: function (textCode, localizeData) {
        var translateGuide = this.currentLanguageObject[textCode] || this.defaultLanguageObject[textCode];
        if (!translateGuide)
            return textCode;
        var textResult = translateGuide;
        if (typeof translateGuide == 'function')
            textResult = translateGuide(localizeData);
        return textResult;
    } }, localize_message_1.supportLocalizeMessage);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sb2NhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUMvQyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBR2YsdURBQTREO0FBRzVELElBQU0saUJBQWlCLEdBQUc7SUFDdkIsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0lBQ2QsS0FBSyxFQUFFLE9BQU87SUFDZCxLQUFLLEVBQUUsT0FBTztJQUNkLEtBQUssRUFBRSxPQUFPO0NBQ2hCLENBQUE7QUFFRCxJQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUdqQixRQUFBLFFBQVEsY0FDbEIsb0JBQW9CLEVBQUU7UUFDbkIsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7UUFDbEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7UUFDbEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7UUFDcEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDbkMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDL0IsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7UUFDcEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUU7UUFDckMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7UUFDbEMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUU7UUFDakMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFF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QU0sY0FBYyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoSCwrS0FBK0s7UUFDL0ssSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQzVCLFNBQVMsQ0FBQyxZQUFZLEdBQUcsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO1FBQzVGLElBQUksU0FBUyxHQUFHLGNBQWMsQ0FBQztRQUMvQixJQUFJLE9BQU8sY0FBYyxJQUFJLFVBQVU7WUFBRSxTQUFTLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RixFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdELDBFQUEwRTtJQUMxRSxTQUFTLEVBQVQsVUFBVSxRQUFRLEVBQUUsWUFBYTtRQUM5QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTyxRQUFRLENBQUM7UUFDckMsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDO1FBQ2hDLElBQUksT0FBTyxjQUFjLElBQUksVUFBVTtZQUFFLFVBQVUsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkYsT0FBTyxVQUFVLENBQUM7SUFDckIsQ0FBQyxJQUlFLHlDQUFzQixFQUUxQiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcbmRlY2xhcmUgY29uc3QgcmVxdWlyZTtcblxuaW1wb3J0IHsgc3VwcG9ydExvY2FsaXplTWVzc2FnZSB9IGZyb20gJy4vbG9jYWxpemVfbWVzc2FnZSc7XG5cblxuY29uc3QgdG9Db3JyZWN0TGFuZ0NvZGUgPSB7XG4gICBlbl9HQjogJ2VuX1VTJyxcbiAgIGVuX1VEOiAnZW5fVVMnLFxuICAgcHRfQlI6ICdwdF9QVCcsXG4gICBmcl9DQTogJ2ZyX0ZSJyxcbiAgIGVzX0xBOiAnZXNfRVMnLFxuICAgZXNfTVg6ICdlc19FUycsIC8vIGVzcGFub2wgbWV4aWNvXG59XG5cbmNvbnN0IHN1YnNjcmliZWROb2RlUGF0aCA9IHt9O1xuXG5cbmV4cG9ydCBjb25zdCBsb2NhbGl6ZSA9IHtcbiAgIHN1cHBvcnRlZExhbmd1YWdlQXJyOiBbXG4gICAgICB7IGNvZGU6ICdlbl9VUycsIG5hbWU6ICdFbmdsaXNoJyB9LFxuICAgICAgeyBjb2RlOiAnZXNfRVMnLCBuYW1lOiAnRXNwYcOxb2wnIH0sXG4gICAgICB7IGNvZGU6ICdwdF9QVCcsIG5hbWU6ICdQb3J0dWd1w6pzJyB9LFxuICAgICAgeyBjb2RlOiAnZnJfRlInLCBuYW1lOiAnRnJhbsOnYWlzJyB9LFxuICAgICAgeyBjb2RlOiAnYXJfQVInLCBuYW1lOiAn2LnYsdio2YknIH0sXG4gICAgICB7IGNvZGU6ICdpZF9JRCcsIG5hbWU6ICdJbmRvbmVzaWEnIH0sXG4gICAgICB7IGNvZGU6ICd2aV9WTicsIG5hbWU6ICdUaeG6v25nIFZp4buHdCcgfSxcbiAgICAgIHsgY29kZTogJ3RoX1RIJywgbmFtZTogJ+C4oOC4suC4qeC4suC5hOC4l+C4oicgfSxcbiAgICAgIHsgY29kZTogJ3RyX1RSJywgbmFtZTogJ1TDvHJrw6dlJyB9LFxuICAgICAgeyBjb2RlOiAnZGVfREUnLCBuYW1lOiAnRGV1dHNjaCcgfSxcbiAgICAgIHsgY29kZTogJ2l0X0lUJywgbmFtZTogJ0l0YWxpYW5vJyB9LFxuICAgXSxcblxuICAgY3VycmVudExhbmd1YWdlQ29kZTogJ2VuX1VTJyxcbiAgIGRlZmF1bHRMYW5ndWFnZU9iamVjdDogcmVxdWlyZSgnZW5fVVMnKSxcbiAgIGN1cnJlbnRMYW5ndWFnZU9iamVjdDogbnVsbCxcblxuICAgbGFuZ3VhZ2VDaGFuZ2VDYWxsYmFja0FycjogW10sXG4gICBpbml0Q2FsbGJhY2tBcnI6IFtdLFxuICAgaXNJbml0aWFsaXplZDogZmFsc2UsXG5cblxuICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuY3VycmVudExhbmd1YWdlT2JqZWN0ID0gdGhpcy5kZWZhdWx0TGFuZ3VhZ2VPYmplY3Q7XG4gICAgICBfRy51c2VyLmFkZExvZ2luRGF0YUZpZWxkcygndXNlckxhbmd1YWdlQ29kZScpO1xuICAgICAgX0cudXNlci5hZGRJbml0Q2FsbGJhY2soKGRhdGEpID0+IHtcbiAgICAgICAgIC8vIF8ubG9nKGAgX0cubG9jYWxpemUgPj4gaW5pdCA+PiBkYXRhKHVzZXJMYW5ndWFnZUNvZGUpID0gJHtkYXRhLnVzZXJMYW5ndWFnZUNvZGV9IGAsIGRhdGEpO1xuICAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgIGNvbnN0IGZiTGFuZ0NvZGUgPSAod2luZG93WydGQkluc3RhbnQnXSkgPyBGQkluc3RhbnQuZ2V0TG9jYWxlKCkgOiBudWxsOyAvLyAgZ2V0IGxhbmd1YWdlIGZyb20gdXNlciBsb2NhbGUgPT4gdHJhbnNsYXRlIEFTQVBcbiAgICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZXMoZGF0YS51c2VyTGFuZ3VhZ2VDb2RlIHx8IGZiTGFuZ0NvZGUsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMubGlzdEFsbExhYmVscygpO1xuICAgfSxcblxuXG4gICBsaXN0QWxsTGFiZWxzKCkge1xuICAgICAgXy5sb2coYCBsaXN0QWxsTGFiZWxzID0gYCk7XG4gICAgICBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5MYWJlbCkubWFwKGNvbXAgPT4ge1xuICAgICAgICAgXy5sb2coXy5nZXROb2RlUGF0aChjb21wLm5vZGUpKTtcbiAgICAgIH0pO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09IGhhbmRsZSBsYW5ndWFnZSBjaGFuZ2VzICYgcmVnaXN0ZXIgY2FsbGJhY2sgd2hlbiBsYW5ndWFnZSBjaGFuZ2VzXG4gICBvbkxhbmd1YWdlQ2hhbmdlcyhsYW5nQ29kZTogc3RyaW5nLCBpc0luaXQgPSBmYWxzZSkge1xuICAgICAgbGFuZ0NvZGUgPSB0b0NvcnJlY3RMYW5nQ29kZVtsYW5nQ29kZV0gfHwgbGFuZ0NvZGU7XG4gICAgICBfLmxvZyhgIF9HLmxvY2FsaXplID4+IG9uTGFuZ3VhZ2VDaGFuZ2VkIGxhbmdDb2RlPSR7bGFuZ0NvZGV9IGApO1xuICAgICAgaWYgKCFpc0luaXQgJiYgKCFsYW5nQ29kZSB8fCB0aGlzLmN1cnJlbnRMYW5ndWFnZUNvZGUgPT0gbGFuZ0NvZGUpKSByZXR1cm47XG4gICAgICB0cnkge1xuICAgICAgICAgbGFuZ0NvZGUgPSBsYW5nQ29kZSB8fCB0aGlzLmN1cnJlbnRMYW5ndWFnZUNvZGU7XG4gICAgICAgICB0aGlzLmN1cnJlbnRMYW5ndWFnZU9iamVjdCA9IHJlcXVpcmUobGFuZ0NvZGUpO1xuICAgICAgICAgdGhpcy5jdXJyZW50TGFuZ3VhZ2VDb2RlID0gbGFuZ0NvZGU7XG4gICAgICAgICBfRy51dGlsc0RhdGEuc2F2ZSh7IHVzZXJMYW5ndWFnZUNvZGU6IHRoaXMuY3VycmVudExhbmd1YWdlQ29kZSB9KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgICBpZiAoaXNJbml0KSB0aGlzLmluaXRDYWxsYmFja0Fyci5tYXAoZnVuYyA9PiBmdW5jKCkpOyAvLyBleGVjdXRlIGluaXQgY2FsbGJhY2tcbiAgICAgIGVsc2UgdGhpcy5sYW5ndWFnZUNoYW5nZUNhbGxiYWNrQXJyLm1hcChmdW5jID0+IGZ1bmMobGFuZ0NvZGUpKTsgLy8gZXhlY3V0ZSBsYW5nLWNoYW5nZSBjYWxsYmFja1xuICAgfSxcblxuXG4gICAvLyA9PT0gd2lsbCBzdWJzY3JpYmUgdG8gaW5pdENhbGxiYWNrcywgbGFuZ3VhZ2VDaGFuZ2VzQ2FsbGJhY2sgJiBpbW1lZGlhdGVseSBjYWxsIHRvIHRyYW5zbGF0ZUNvbnRhaW5lcigpXG4gICBzdWJzY3JpYmVUcmFuc2xhdGUoY29udGFpbmVyTm9kZSkge1xuICAgICAgY29uc3QgcGF0aCA9IF8uZ2V0Tm9kZVBhdGgoY29udGFpbmVyTm9kZSk7XG4gICAgICBjb25zdCB0cmFuc2xhdGVGdW5jID0gKCkgPT4gdGhpcy50cmFuc2xhdGVDb250YWluZXIoY29udGFpbmVyTm9kZSk7XG4gICAgICBpZiAoIXN1YnNjcmliZWROb2RlUGF0aFtwYXRoXSkge1xuICAgICAgICAgdGhpcy5pbml0Q2FsbGJhY2tBcnIucHVzaCh0cmFuc2xhdGVGdW5jKTtcbiAgICAgICAgIHRoaXMubGFuZ3VhZ2VDaGFuZ2VDYWxsYmFja0Fyci5wdXNoKHRyYW5zbGF0ZUZ1bmMpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkgdHJhbnNsYXRlRnVuYygpO1xuICAgfSxcblxuICAgYWRkSW5pdENhbGxiYWNrKGYpIHtcbiAgICAgIGlmICh0aGlzLmlzSW5pdGlhbGl6ZWQpIHJldHVybiBmKCk7XG4gICAgICB0aGlzLmluaXRDYWxsYmFja0Fyci5wdXNoKGYpO1xuICAgfSxcblxuICAgLy8gPT09PT09PSB0cmFuc2xhdGUgd2hlbiBsYW5ndWFnZSBjaGFuZ2VzIG9yIHdoZW4gbmV3IG5vZGUgY3JlYXRlZFxuXG4gICAvLyB0cmFuc2xhdGUgZW50aXJlIGNvbnRhaW5lciB3aXRoIG11bHRpcGxlIGxhYmVsIG5vZGVzIGluc2lkZVxuICAgdHJhbnNsYXRlQ29udGFpbmVyKGNvbnRhaW5lck5vZGU6IGNjLk5vZGUpIHtcbiAgICAgIC8vIF8ubG9nKGBfRy5sb2NhbGl6ZSA+PiB0cmFuc2xhdGVDb250YWluZXIgPj4gY29udGFpbmVyTm9kZT0ke2NvbnRhaW5lck5vZGUgPyBjb250YWluZXJOb2RlLm5hbWUgOiAnJ30gLy8gdGhpcy5jdXJyZW50TGFuZ3VhZ2VPYmplY3QgPSBgLCB0aGlzLmN1cnJlbnRMYW5ndWFnZU9iamVjdCk7XG4gICAgICBpZiAoIWNvbnRhaW5lck5vZGUpIHJldHVybjtcbiAgICAgIGNvbnRhaW5lck5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuTGFiZWwpLm1hcChsYWJlbENvbXAgPT4gdGhpcy50cmFuc2xhdGVTaW5nbGVMYWJlbChsYWJlbENvbXAubm9kZSkpO1xuICAgICAgY29udGFpbmVyTm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5SaWNoVGV4dCkubWFwKGxhYmVsQ29tcCA9PiB0aGlzLnRyYW5zbGF0ZVNpbmdsZUxhYmVsKGxhYmVsQ29tcC5ub2RlKSk7XG4gICB9LFxuXG4gICB0cmFuc2xhdGVTaW5nbGVMYWJlbChsYWJlbE5vZGU6IGNjLk5vZGUsIGxvY2FsaXplRGF0YT8pIHtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZUd1aWRlID0gdGhpcy5jdXJyZW50TGFuZ3VhZ2VPYmplY3RbbGFiZWxOb2RlLm5hbWVdIHx8IHRoaXMuZGVmYXVsdExhbmd1YWdlT2JqZWN0W2xhYmVsTm9kZS5uYW1lXTtcbiAgICAgIC8vIF8ubG9nKGAgX0cubG9jYWxpemUgPj4gdHJhbnNsYXRlU2luZ2xlTGFiZWwgPj4gbGFiZWxOb2RlLm5hbWU9JHtsYWJlbE5vZGUubmFtZX0gLy8gdHJhbnNsYXRlR3VpZGU9JHt0cmFuc2xhdGVHdWlkZX0gLy8gbGFiZWxOb2RlLmxvY2FsaXplRGF0YSA9ICR7bGFiZWxOb2RlLmxvY2FsaXplRGF0YX1gKTtcbiAgICAgIGlmICghdHJhbnNsYXRlR3VpZGUpIHJldHVybjtcbiAgICAgIGxhYmVsTm9kZS5sb2NhbGl6ZURhdGEgPSBsb2NhbGl6ZURhdGEgIT09IHVuZGVmaW5lZCA/IGxvY2FsaXplRGF0YSA6IGxhYmVsTm9kZS5sb2NhbGl6ZURhdGE7XG4gICAgICBsZXQgdGV4dDJGaWxsID0gdHJhbnNsYXRlR3VpZGU7XG4gICAgICBpZiAodHlwZW9mIHRyYW5zbGF0ZUd1aWRlID09ICdmdW5jdGlvbicpIHRleHQyRmlsbCA9IHRyYW5zbGF0ZUd1aWRlKGxhYmVsTm9kZS5sb2NhbGl6ZURhdGEpO1xuICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwobGFiZWxOb2RlLCB0ZXh0MkZpbGwpO1xuICAgfSxcblxuXG4gICAvLyB0cmFuc2xhdGUgbm9uLWxhYmVsTm9kZSB0ZXh0cyAoZXg6IHVwZGF0ZS1hc3luYy1tZXNzYWdlIGNvbnRlbnQgJiBjdGEpO1xuICAgdHJhbnNsYXRlKHRleHRDb2RlLCBsb2NhbGl6ZURhdGE/KSB7XG4gICAgICBjb25zdCB0cmFuc2xhdGVHdWlkZSA9IHRoaXMuY3VycmVudExhbmd1YWdlT2JqZWN0W3RleHRDb2RlXSB8fCB0aGlzLmRlZmF1bHRMYW5ndWFnZU9iamVjdFt0ZXh0Q29kZV07XG4gICAgICBpZiAoIXRyYW5zbGF0ZUd1aWRlKSByZXR1cm4gdGV4dENvZGU7XG4gICAgICBsZXQgdGV4dFJlc3VsdCA9IHRyYW5zbGF0ZUd1aWRlO1xuICAgICAgaWYgKHR5cGVvZiB0cmFuc2xhdGVHdWlkZSA9PSAnZnVuY3Rpb24nKSB0ZXh0UmVzdWx0ID0gdHJhbnNsYXRlR3VpZGUobG9jYWxpemVEYXRhKTtcbiAgICAgIHJldHVybiB0ZXh0UmVzdWx0O1xuICAgfSxcblxuXG4gICAvLyBnZXQgbXVsdGlsYW5nIG9iamVjdHMgZm9yIG1lc3NhZ2UgY29udGVudCAmIGN0YVxuICAgLi4uc3VwcG9ydExvY2FsaXplTWVzc2FnZSxcblxufTtcblxuXG5cblxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/localization/language-files/ar_AR.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '650ec1b7gpP55CwdTThVL70', 'ar_AR');
// script/system/localization/language-files/ar_AR.ts

"use strict";
var _G = require("../../../system/all_modules");
var _ = _G._;
module.exports = {
    common_label_share: 'شارك',
    common_label_reward: 'جائزة',
    common_label_claim: 'اجمع العملات\n التي ربحتها',
    common_label_button_play: 'العب',
    common_label_level_intro: 'المستوى',
    label_loading_ad: 'تحميل الإعلانات الرجاء الانتظار',
    label_game_loading: 'تحميل',
    label_game_continue: 'استمر',
    label_game_play_more_puzzle: 'المزيد من الأحجيات',
    label_gameplay_select_difficulty: 'اختر مستوى الصعوبة',
    label_fx_video_error: 'خطأ في عرض الفيديو',
    label_settings_music: 'الموسيقى',
    label_settings_sound: 'الأصوات',
    label_tut_step_1: "\u0627\u0646\u0642\u0631 \u0639\u0644\u0649 \u0642\u0637\u0639\u062A\u064A\u0646 \u0644\u062A\u062D\u0631\u0643\u0647\u0645\u0627\n\u0648\u062A\u0636\u0639\u0647\u0645\u0627 \u0641\u064A \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0635\u062D\u064A\u062D",
    label_tut_step_2: function () { return "\u0627\u0646\u0642\u0631 \u0647\u0646\u0627 \u0648\u0627\u062F\u0641\u0639  <img src=\"icon_coin\" width=40 height=40/> " + _G.configGame.hintCoinPrice + "\n \u0644\u0645\u0639\u0631\u0641\u0629 \u0645\u0643\u0627\u0646 \u0628\u0636\u0639 \u0642\u0637\u0639."; },
    label_tut_step_3: "\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0627\u062D \u0644\u062D\u0644 \u0643\u0644 \u0623\u062D\u062C\u064A\u0629 \n\u0633\u064A\u064F\u062D\u062F\u062F \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0639\u062F\u062F \u0642\u0637\u0639 \u0627\u0644\u0623\u062D\u062C\u064A\u0629. \n\n\u0644\u0627 \u062A\u062F\u0639 \u0627\u0644\u0648\u0642\u062A \u064A\u0646\u0641\u0630 \u0645\u0646\u0643!",
    label_tut_btn_continue: 'استمر',
    label_alert_intro: "\u0634\u0627\u0647\u062F \u0641\u064A\u062F\u064A\u0648 \u0644\u062A\u0631\u0628\n " + _G.configGame.videoCoinReward + " \u0642\u0637\u0639\u0629 \u0646\u0642\u062F\u064A\u0629",
    label_alert_back: 'لاتفعل',
    label_alert_earn_stars: 'نعم',
    label_level_up_header: 'لقد ارتقيت إلى مستوى أعلى!',
    label_level_up_to_level_X: function (x) { return "" + x; },
    label_pause_intro: 'هل ترغب في استكمال اللعب؟',
    label_pause_header: 'إيقاف مؤقت',
    label_gameover_header: 'انتهت اللعبة',
    label_gameover_score_intro: 'النقاط المُسجلة',
    label_gameover_btn_try_again: 'حاول مرة\n أخرى',
    label_gameover_no_thanks: 'لا، شكرا',
    label_home_button_play_w_friends: 'العب مع\nالأصدقاء',
    label_share_intro_1: 'هل تقدر على هزيمتي؟',
    label_share_intro_2: 'النقاط المُسجلة',
    label_win_well_done: 'أحسنت!',
    label_category_list_header_name: function (x) {
        var _a, _b;
        return (_b = (_a = _G.levelManager.categoryArr.find(function (catInfo) { return catInfo.id == x; })) === null || _a === void 0 ? void 0 : _a.languages[_G.localize.currentLanguageCode]) === null || _b === void 0 ? void 0 : _b.toUpperCase();
    },
    // ==================================
    //  fb social contents
    // fb_invite_message_text: playerName => `${playerName} يدعوك إلى حل اللغز!`,
    fb_invite_message_text: function (playerName) { return "\u0623\u062F\u0639\u0648\u0643 \u0625\u0644\u0649 \u062D\u0644 \u0647\u0630\u0647 \u0627\u0644\u0623\u062D\u062C\u064A\u0629"; },
    fb_invite_message_cta: 'العب',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL2xvY2FsaXphdGlvbi9sYW5ndWFnZS1maWxlcy9hcl9BUi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWtEO0FBQ2xELElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixpQkFBUztJQUNOLGtCQUFrQixFQUFFLE1BQU07SUFDMUIsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixrQkFBa0IsRUFBRSw0QkFBNEI7SUFDaEQsd0JBQXdCLEVBQUUsTUFBTTtJQUNoQyx3QkFBd0IsRUFBRSxTQUFTO0lBRW5DLGdCQUFnQixFQUFFLGlDQUFpQztJQUVuRCxrQkFBa0IsRUFBRSxPQUFPO0lBQzNCLG1CQUFtQixFQUFFLE9BQU87SUFDNUIsMkJBQTJCLEVBQUUsb0JBQW9CO0lBQ2pELGdDQUFnQyxFQUFFLG9CQUFvQjtJQUV0RCxvQkFBb0IsRUFBRSxvQkFBb0I7SUFFMUMsb0JBQW9CLEVBQUUsVUFBVTtJQUNoQyxvQkFBb0IsRUFBRSxTQUFTO0lBRS9CLGdCQUFnQixFQUFFLHNRQUFvRDtJQUN0RSxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsNkhBQTZELEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSw0R0FBeUIsRUFBakgsQ0FBaUg7SUFDekksZ0JBQWdCLEVBQUUsK1pBQTBGO0lBQzVHLHNCQUFzQixFQUFFLE9BQU87SUFFL0IsaUJBQWlCLEVBQUUsd0ZBQXFCLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSw2REFBYTtJQUNsRixnQkFBZ0IsRUFBRSxRQUFRO0lBQzFCLHNCQUFzQixFQUFFLEtBQUs7SUFFN0IscUJBQXFCLEVBQUUsNEJBQTRCO0lBQ25ELHlCQUF5QixFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBRyxDQUFHLEVBQU4sQ0FBTTtJQUV4QyxpQkFBaUIsRUFBRSwyQkFBMkI7SUFDOUMsa0JBQWtCLEVBQUUsWUFBWTtJQUVoQyxxQkFBcUIsRUFBRSxjQUFjO0lBQ3JDLDBCQUEwQixFQUFFLGlCQUFpQjtJQUM3Qyw0QkFBNEIsRUFBRSxpQkFBaUI7SUFDL0Msd0JBQXdCLEVBQUUsVUFBVTtJQUVwQyxnQ0FBZ0MsRUFBRSxtQkFBbUI7SUFFckQsbUJBQW1CLEVBQUUscUJBQXFCO0lBQzFDLG1CQUFtQixFQUFFLGlCQUFpQjtJQUV0QyxtQkFBbUIsRUFBRSxRQUFRO0lBRTdCLCtCQUErQixFQUFFLFVBQUEsQ0FBQzs7UUFDL0IsbUJBQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQWYsQ0FBZSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQiwyQ0FBRyxXQUFXLEdBQUc7SUFDbEksQ0FBQztJQUlELHFDQUFxQztJQUNyQyxzQkFBc0I7SUFDdEIsNkVBQTZFO0lBQzdFLHNCQUFzQixFQUFFLFVBQUEsVUFBVSxJQUFJLE9BQUEsOEhBQTBCLEVBQTFCLENBQTBCO0lBQ2hFLHFCQUFxQixFQUFFLE1BQU07Q0FFL0IsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0ID0ge1xuICAgY29tbW9uX2xhYmVsX3NoYXJlOiAn2LTYp9ix2YMnLFxuICAgY29tbW9uX2xhYmVsX3Jld2FyZDogJ9is2KfYptiy2KknLFxuICAgY29tbW9uX2xhYmVsX2NsYWltOiAn2KfYrNmF2Lkg2KfZhNi52YXZhNin2KpcXG4g2KfZhNiq2Yog2LHYqNit2KrZh9inJyxcbiAgIGNvbW1vbl9sYWJlbF9idXR0b25fcGxheTogJ9in2YTYudioJyxcbiAgIGNvbW1vbl9sYWJlbF9sZXZlbF9pbnRybzogJ9in2YTZhdiz2KrZiNmJJyxcblxuICAgbGFiZWxfbG9hZGluZ19hZDogJ9iq2K3ZhdmK2YQg2KfZhNil2LnZhNin2YbYp9iqINin2YTYsdis2KfYoSDYp9mE2KfZhtiq2LjYp9ixJyxcblxuICAgbGFiZWxfZ2FtZV9sb2FkaW5nOiAn2KrYrdmF2YrZhCcsXG4gICBsYWJlbF9nYW1lX2NvbnRpbnVlOiAn2KfYs9iq2YXYsScsXG4gICBsYWJlbF9nYW1lX3BsYXlfbW9yZV9wdXp6bGU6ICfYp9mE2YXYstmK2K8g2YXZhiDYp9mE2KPYrdis2YrYp9iqJyxcbiAgIGxhYmVsX2dhbWVwbGF5X3NlbGVjdF9kaWZmaWN1bHR5OiAn2KfYrtiq2LEg2YXYs9iq2YjZiSDYp9mE2LXYudmI2KjYqScsXG5cbiAgIGxhYmVsX2Z4X3ZpZGVvX2Vycm9yOiAn2K7Yt9ijINmB2Yog2LnYsdi2INin2YTZgdmK2K/ZitmIJyxcblxuICAgbGFiZWxfc2V0dGluZ3NfbXVzaWM6ICfYp9mE2YXZiNiz2YrZgtmJJyxcbiAgIGxhYmVsX3NldHRpbmdzX3NvdW5kOiAn2KfZhNij2LXZiNin2KonLFxuXG4gICBsYWJlbF90dXRfc3RlcF8xOiBg2KfZhtmC2LEg2LnZhNmJINmC2LfYudiq2YrZhiDZhNiq2K3YsdmD2YfZhdinXFxu2YjYqti22LnZh9mF2Kcg2YHZiiDYp9mE2YXZg9in2YYg2KfZhNi12K3ZititYCxcbiAgIGxhYmVsX3R1dF9zdGVwXzI6ICgpID0+IGDYp9mG2YLYsSDZh9mG2Kcg2YjYp9iv2YHYuSAgPGltZyBzcmM9XCJpY29uX2NvaW5cIiB3aWR0aD00MCBoZWlnaHQ9NDAvPiAke19HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZX1cXG4g2YTZhdi52LHZgdipINmF2YPYp9mGINio2LbYuSDZgti32LkuYCwgIC8vIHRoaXMgbGFiZWwgaXMgUmljaFRleHQuIFwiaWNvbl9jb2luXCIgaXMgc3ByaXRlIG5hbWUgaW4gdGhlIGxpbmtlZCBhdGxhcy5cbiAgIGxhYmVsX3R1dF9zdGVwXzM6IGDYp9mE2YjZgtiqINin2YTZhdiq2KfYrSDZhNit2YQg2YPZhCDYo9it2KzZitipIFxcbtiz2YrZj9it2K/YryDYqNmG2KfYodmLINi52YTZiSDYudiv2K8g2YLYt9i5INin2YTYo9it2KzZitipLiBcXG5cXG7ZhNinINiq2K/YuSDYp9mE2YjZgtiqINmK2YbZgdiwINmF2YbZgyFgLFxuICAgbGFiZWxfdHV0X2J0bl9jb250aW51ZTogJ9in2LPYqtmF2LEnLFxuXG4gICBsYWJlbF9hbGVydF9pbnRybzogYNi02KfZh9ivINmB2YrYr9mK2Ygg2YTYqtix2KhcXG4gJHtfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZH0g2YLYt9i52Kkg2YbZgtiv2YrYqWAsXG4gICBsYWJlbF9hbGVydF9iYWNrOiAn2YTYp9iq2YHYudmEJyxcbiAgIGxhYmVsX2FsZXJ0X2Vhcm5fc3RhcnM6ICfZhti52YUnLFxuXG4gICBsYWJlbF9sZXZlbF91cF9oZWFkZXI6ICfZhNmC2K8g2KfYsdiq2YLZitiqINil2YTZiSDZhdiz2KrZiNmJINij2LnZhNmJIScsXG4gICBsYWJlbF9sZXZlbF91cF90b19sZXZlbF9YOiAoeCkgPT4gYCR7eH1gLFxuXG4gICBsYWJlbF9wYXVzZV9pbnRybzogJ9mH2YQg2KrYsdi62Kgg2YHZiiDYp9iz2KrZg9mF2KfZhCDYp9mE2YTYudio2J8nLFxuICAgbGFiZWxfcGF1c2VfaGVhZGVyOiAn2KXZitmC2KfZgSDZhdik2YLYqicsXG5cbiAgIGxhYmVsX2dhbWVvdmVyX2hlYWRlcjogJ9in2YbYqtmH2Kog2KfZhNmE2LnYqNipJyxcbiAgIGxhYmVsX2dhbWVvdmVyX3Njb3JlX2ludHJvOiAn2KfZhNmG2YLYp9i3INin2YTZhdmP2LPYrNmE2KknLFxuICAgbGFiZWxfZ2FtZW92ZXJfYnRuX3RyeV9hZ2FpbjogJ9it2KfZiNmEINmF2LHYqVxcbiDYo9iu2LHZiScsXG4gICBsYWJlbF9nYW1lb3Zlcl9ub190aGFua3M6ICfZhNin2Iwg2LTZg9ix2KcnLFxuXG4gICBsYWJlbF9ob21lX2J1dHRvbl9wbGF5X3dfZnJpZW5kczogJ9in2YTYudioINmF2LlcXG7Yp9mE2KPYtdiv2YLYp9ihJyxcblxuICAgbGFiZWxfc2hhcmVfaW50cm9fMTogJ9mH2YQg2KrZgtiv2LEg2LnZhNmJINmH2LLZitmF2KrZitifJyxcbiAgIGxhYmVsX3NoYXJlX2ludHJvXzI6ICfYp9mE2YbZgtin2Lcg2KfZhNmF2Y/Ys9is2YTYqScsXG5cbiAgIGxhYmVsX3dpbl93ZWxsX2RvbmU6ICfYo9it2LPZhtiqIScsXG5cbiAgIGxhYmVsX2NhdGVnb3J5X2xpc3RfaGVhZGVyX25hbWU6IHggPT4ge1xuICAgICAgcmV0dXJuIF9HLmxldmVsTWFuYWdlci5jYXRlZ29yeUFyci5maW5kKGNhdEluZm8gPT4gY2F0SW5mby5pZCA9PSB4KT8ubGFuZ3VhZ2VzW19HLmxvY2FsaXplLmN1cnJlbnRMYW5ndWFnZUNvZGVdPy50b1VwcGVyQ2FzZSgpO1xuICAgfSxcblxuXG5cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vICBmYiBzb2NpYWwgY29udGVudHNcbiAgIC8vIGZiX2ludml0ZV9tZXNzYWdlX3RleHQ6IHBsYXllck5hbWUgPT4gYCR7cGxheWVyTmFtZX0g2YrYr9i52YjZgyDYpdmE2Ykg2K3ZhCDYp9mE2YTYutiyIWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV90ZXh0OiBwbGF5ZXJOYW1lID0+IGDYo9iv2LnZiNmDINil2YTZiSDYrdmEINmH2LDZhyDYp9mE2KPYrdis2YrYqWAsXG4gICBmYl9pbnZpdGVfbWVzc2FnZV9jdGE6ICfYp9mE2LnYqCcsXG5cbn1cblxuXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/core_ui.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b15554JuJ1HfrbLWDvHND0f', 'core_ui');
// script/system/ui-fx/core_ui.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreUI = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
var gameState = _G.types.gameState;
var bind_button_handlers_1 = require("./bind_button_handlers");
exports.coreUI = {
    alertOKCallback: null,
    tabButtonContainer: null,
    masterScrollViewNode: null,
    masterScrollViewComp: null,
    masterScrollViewContent: null,
    playGridContainer: null,
    headerContainer: null,
    puzzleProgressBar: null,
    btnHintDisabledNode: null,
    currentState: gameState.category,
    init: function () {
        var _this = this;
        this.adjustUI();
        this.masterScrollViewNode = cc.find('Canvas/play_area/scrollview_master');
        this.masterScrollViewComp = this.masterScrollViewNode.getComponent('NestableScrollView_Outer');
        this.masterScrollViewContent = this.playGridContainer = cc.find('view/content', this.masterScrollViewNode);
        this.playGridContainer = cc.find('grid_area', this.masterScrollViewContent);
        this.puzzleProgressBar = cc.find('puzzle_progress_bar', this.masterScrollViewContent);
        this.headerContainer = cc.find('Canvas/layout_fixed_header/header');
        this.tabButtonContainer = cc.find("size_tabs", this.playGridContainer);
        this.btnHintDisabledNode = cc.find('playing_button_bar/btn_hint/disabled', this.playGridContainer);
        this.setupLocalization();
        bind_button_handlers_1.bindButtonHandlers.run();
        _G.user.addInitCallback(function (data) {
            _this.setUIPlayState((data.isNewUser || _G.user.isPuzzleSpecified) ? gameState.playing : gameState.category);
            cc.tween(_this.masterScrollViewNode).to(0.3, { opacity: 255 }).start();
        });
        this.handleUIForV2();
        this.fillConfigToUI();
        // if (window['FBInstant']) {
        //    _G.utilsUI.fillLabel(cc.find('user_bar/label_username', this.headerContainer), FBInstant.player.getName());
        // }
    },
    showLoadingAds: function (callBack) {
        var _this = this;
        var layoutNode = cc.find('Canvas/layout_loading_ad');
        var dialog = cc.find('dialog', layoutNode);
        dialog.opacity = 0;
        dialog.x = -dialog.width / 2;
        layoutNode.active = true;
        cc.tween(dialog)
            .to(0.3, { x: 0, opacity: 255 })
            .delay(2)
            .to(0.3, { x: dialog.width / 2, opacity: 0 })
            .call(function () {
            callBack && callBack();
            _.setTimeout(function () { return _this.hideLayout('layout_loading_ad'); }, 100);
        })
            .start();
    },
    setupLocalization: function () {
        _G.localize.subscribeTranslate(this.headerContainer);
        _G.localize.subscribeTranslate(cc.find('Canvas/play_area/scrollview_master'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_win'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_level_up'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_settings'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_alert'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_tutorial'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_pause'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_game_over'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_home'));
        _G.localize.subscribeTranslate(cc.find('Canvas/shares'));
        _G.localize.subscribeTranslate(cc.find('Canvas/layout_loading_ad'));
        var handleSharePicLabelGlow = function () {
            var labelGlow = cc.find('Canvas/shares/picture/overlay/text_glow');
            var labelIntroNode = cc.find('Canvas/shares/picture/label_share_intro_1');
            cc.find('Canvas/shares').active = true;
            _.setTimeout(function () {
                labelGlow.height = (labelIntroNode.height + 30) / labelGlow.scale;
                labelGlow.width = (_.min(725, labelIntroNode.width + 50)) / labelGlow.scale;
                cc.find('Canvas/shares').active = false;
            });
        };
        _G.localize.addInitCallback(handleSharePicLabelGlow);
        _G.localize.languageChangeCallbackArr.push(handleSharePicLabelGlow);
    },
    fillConfigToUI: function () {
        // level up stars
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_level_up/dialog/star_num_base/label_stars'), '' + _G.configGame.levelUpCoinReward);
        // hint stars
        _G.utilsUI.fillLabel(cc.find('playing_button_bar/btn_hint/label_game_btn_hint/label_stars', this.playGridContainer), '' + _G.configGame.hintCoinPrice);
        _G.utilsUI.fillLabel(cc.find('label_game_btn_hint/label_stars', this.btnHintDisabledNode), '' + _G.configGame.hintCoinPrice);
        // win coins
        this.tabButtonContainer.children.map(function (btnNode) {
            var coinNumber = _G.configGame.winCoinReward[btnNode.name];
            _G.utilsUI.fillLabel(cc.find('coin_label', btnNode), '' + coinNumber);
        });
    },
    // users from social posts
    handleUIForV2: function () {
        if (!_G.user.isVersionV2)
            return;
        cc.find('btn_back', this.headerContainer).active = true;
        cc.find('btn_settings', this.headerContainer).x = -255;
    },
    showButtonBack: function () {
        cc.find('btn_back', this.headerContainer).active = true;
    },
    hideButtonBack: function () {
        cc.find('btn_back', this.headerContainer).active = false;
    },
    // =================================================================
    // UI SIZE ADJUSTMENT
    // =================================================================
    // adjuts UI to fit
    adjustUI: function () {
        var maxRatio = 720 / 1280;
        var actualRatio = cc.winSize.width / cc.winSize.height;
        if (actualRatio > maxRatio) {
            cc.find('Canvas').getComponent(cc.Canvas).fitWidth = false;
            cc.find('Canvas').getComponent(cc.Canvas).fitHeight = true;
        }
        // make layout height = windows height
        var layoutArr = [
            'Canvas/play_area',
            'Canvas/bg',
            'Canvas/control_layer',
            'Canvas/layout_win',
            'Canvas/layout_settings',
            'Canvas/fx_container',
            'Canvas/nag_screen',
            'Canvas/layout_fixed_header',
            'Canvas/layout_tutorial',
        ].map(function (path) {
            var layerNode = cc.find(path);
            layerNode.height = cc.winSize.height;
        });
    },
    // =================================================================
    // SETUP GAME PLAY STATE: PICK MODE/ PLAYING/ WON
    // =================================================================
    setUIPlayState: function (state) {
        this.currentState = state;
        var btnBack = cc.find('btn_back', this.headerContainer);
        var btnPlay = cc.find('btn_play', this.playGridContainer);
        var btnPlayV2 = cc.find('btn_play_v2', this.playGridContainer);
        var btnShare = cc.find('btn_share', this.playGridContainer);
        var sizeTabsIntro = cc.find('size_tabs_intro', this.playGridContainer);
        var playingBtnBar = cc.find('playing_button_bar', this.playGridContainer);
        var playTimeLevelBar = cc.find('time_level_bar', this.playGridContainer);
        var fakeTimeStack = cc.find('fake_time_stack', this.playGridContainer);
        var gridStack = cc.find('grid_stack', this.playGridContainer);
        var gridStackBg = cc.find('grid_bg', gridStack);
        var gridCover = cc.find('grid_cover', gridStack);
        var dummyStack = cc.find('dummy_stack', this.playGridContainer.parent);
        var labelMorePuzzle = cc.find('label_game_play_more_puzzle', _G.coreUI.playGridContainer);
        var level = cc.find('level', this.puzzleProgressBar) || {};
        var activeNodeArr, hiddenNodeArr;
        if (state == gameState.category) {
            activeNodeArr = [level, dummyStack, btnBack];
            hiddenNodeArr = [this.playGridContainer, this.puzzleProgressBar, labelMorePuzzle, btnPlayV2, btnShare];
        }
        else if (state == gameState.pick_mode) {
            activeNodeArr = [this.playGridContainer, this.tabButtonContainer, sizeTabsIntro, btnPlay, gridCover, btnBack];
            hiddenNodeArr = [playingBtnBar, playTimeLevelBar, fakeTimeStack, level, this.puzzleProgressBar, dummyStack, labelMorePuzzle, btnPlayV2, btnShare];
            gridStack.scale = 0.88;
            gridStackBg.scale = 1;
        }
        else if (state == gameState.playing || state == gameState.won) {
            activeNodeArr = [this.playGridContainer, playTimeLevelBar, fakeTimeStack, playingBtnBar, btnBack, level, this.puzzleProgressBar];
            hiddenNodeArr = [this.tabButtonContainer, sizeTabsIntro, gridCover, btnPlay, dummyStack, labelMorePuzzle, btnPlayV2, btnShare];
            gridStack.scale = 1;
            gridStackBg.scale = 1;
        }
        else if (state == gameState.v2) {
            activeNodeArr = [this.playGridContainer, btnBack, gridCover, labelMorePuzzle, btnPlayV2, btnShare];
            hiddenNodeArr = [this.tabButtonContainer, playingBtnBar, this.puzzleProgressBar, level, fakeTimeStack, playTimeLevelBar, sizeTabsIntro, btnPlay, dummyStack];
            gridStack.scale = 0.994;
            gridStackBg.scale = 0.98;
        }
        // set active/ hidden
        activeNodeArr.map(function (node) { return node.active = true; });
        hiddenNodeArr.map(function (node) { return node.active = false; });
        if (_G.user.isPuzzleSpecified) {
            btnBack.active = false;
        }
    },
    // =================================================================
    // =================================================================
    // --- THE TAB 3x3 & 5x5
    onTabPreview: function (size) {
        this.tabButtonContainer.children.map(function (btnNode) {
            var isFocus = btnNode.name.includes(size);
            cc.find('bg_on', btnNode).active = isFocus;
            cc.tween(btnNode).to(0.2, { scale: isFocus ? 1 : 0.8 }).start();
        });
    },
    // --- BACK
    back: function () {
        var gMechanic = _G.gameMechanic;
        if (this.currentState == gameState.category) {
            _G.coreUI.hideButtonBack();
            return this.showLayout('layout_home');
        }
        if (this.currentState == gameState.pick_mode)
            return this.setUIPlayState(gameState.category);
        if (this.currentState == gameState.playing /*|| this.currentState == gameState.won*/) {
            if (_G.tutorial.isCurrentPuzzleTutorial()) {
                _G.coreUI.setUIPlayState(_G.types.gameState.category);
            }
            else
                gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
            // _G.interAd.checkToShowInterAd();
        }
    },
    // =================================================================
    // LAYOUTS
    // =================================================================
    // =======
    showLayout: function (layout) {
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        layoutNode.active = true;
    },
    hideLayout: function (layout) {
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        layoutNode.active = false;
    },
    // === with animations
    showLayoutAnim: function (layout, bgOpacity) {
        this.showNagScreen(0.4);
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        var dialogNode = cc.find('dialog', layoutNode);
        var bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
        bgNode.stopAllActions();
        dialogNode.stopAllActions();
        dialogNode.scale = 0;
        bgNode.opacity = 0;
        layoutNode.active = true;
        cc.tween(bgNode).to(0.3, { opacity: bgOpacity || 200 }).start();
        cc.tween(dialogNode).to(0.3, { scale: 1.03 }).to(0.1, { scale: 1 }).start();
        this.hideButtonBack();
    },
    hideLayoutAnim: function (layout, callback) {
        this.showNagScreen(0.4);
        var layoutNode = (_.isString(layout) ? cc.find("Canvas/" + layout) : layout);
        var dialogNode = cc.find('dialog', layoutNode);
        var bgNode = cc.find('bg', layoutNode) || cc.find('screen_bg', layoutNode);
        layoutNode.active = true;
        bgNode.stopAllActions();
        dialogNode.stopAllActions();
        cc.tween(bgNode).to(0.3, { opacity: 0 }).start();
        cc.tween(dialogNode).to(0.2, { scale: 1.06 }).to(0.2, { scale: 0 }).call(function () {
            layoutNode.active = false;
        }).call(function () { return callback && callback(); }).start();
        this.showButtonBack();
    },
    // ========
    showAlert: function (msg, okCallback) {
        this.showLayout("layer_alert");
        _G.utilsUI.fillLabel(cc.find('Canvas/layer_alert/bg_msg/label_msg'), msg);
        this.alertOKCallback = okCallback;
    },
    // =======
    hideLoadingTimer: null,
    showLoading: function () {
        var _this = this;
        this.showLayout("layer_loading");
        // auto turn off loading if shown more than 10 secs but not being turned off
        if (this.hideLoadingTimer)
            clearTimeout(this.hideLoadingTimer);
        this.hideLoadingTimer = setTimeout(function () { return _this.hideLoading(); }, 10000);
    },
    hideLoading: function () {
        this.hideLayout("layer_loading");
        if (this.hideLoadingTimer)
            clearTimeout(this.hideLoadingTimer);
    },
    // =========
    // nag screen: prevent user from clicking buttons while showing animations
    showNagScreen: function (timeout) {
        var _this = this;
        cc.find('Canvas/nag_screen').active = true;
        if (timeout)
            _.setTimeout(function () { return _this.hideNagScreen(); }, timeout * 1000);
    },
    hideNagScreen: function () {
        cc.find('Canvas/nag_screen').active = false;
    },
    // ====== Some system labels ================
    // update gold to all places in game ui
    updateUserStats: function (isSkipUpdateUI) {
        if (isSkipUpdateUI === void 0) { isSkipUpdateUI = false; }
        // coins
        if (!isSkipUpdateUI) {
            _G.utilsUI.fillLabel(cc.find('star2_big 1/label_stars', this.headerContainer), _.formatMoney(_G.user.stars));
            // exp
            _G.utilsUI.fillLabel(cc.find('exp_icon/label_exp', this.headerContainer), _.formatMoney(_G.user.exp));
        }
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_game_over/dialog/label_gameover_score'), _.formatMoney(_G.user.exp));
        this.updateBtnHint();
        // level
        if (!isSkipUpdateUI) {
            this.updateLevelNumber();
            this.updateLevelProgressBar();
        }
    },
    // button hint on/off
    updateBtnHint: function () {
        this.btnHintDisabledNode.active = _G.user.stars < _G.configGame.hintCoinPrice;
    },
    updateLevelNumber: function () {
        _G.utilsUI.fillLabel(cc.find('Canvas/play_area/scrollview_master/view/content/grid_area/time_level_bar/level/level_num'), '' + _G.user.level);
        _G.utilsUI.fillLabel(cc.find('Canvas/layout_win/dialog/exp_progress_bar/level/level_num'), '' + _G.user.level);
    },
    // puzzle progress bar
    updatePuzzleProgressBar: function (ratio, fxTime) {
        if (fxTime === void 0) { fxTime = 0; }
        var progressBar = cc.find('bar', this.puzzleProgressBar);
        this.updateProgressBar(progressBar, ratio, fxTime);
    },
    // level progress bar
    updateLevelProgressBar: function (fxTime) {
        var _this = this;
        if (fxTime === void 0) { fxTime = 0; }
        var progressBar = cc.find('Canvas/layout_win/dialog/exp_progress_bar/bar');
        var isEven = !(_G.user.exp % _G.configGame.levelUpExp);
        var ratio = isEven ? 1 : 0.5;
        this.updateProgressBar(progressBar, ratio, fxTime);
        _.setTimeout(function () {
            if (ratio == 1)
                _this.updateProgressBar(progressBar, 0);
        }, 5000);
    },
    updateProgressBar: function (barNode, ratio, fxTime) {
        if (fxTime === void 0) { fxTime = 0; }
        barNode.orgWidth = barNode.orgWidth || barNode.width;
        var labelPercentage = cc.find('label_percentage', barNode.parent);
        _G.utilsUI.fillLabel(labelPercentage, _.floor(ratio * 100) + "%");
        cc.tween(barNode).to(fxTime, { width: ratio * barNode.orgWidth }).start();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2NvcmVfdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQStDO0FBQy9DLElBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFZixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztBQUVyQywrREFBNEQ7QUFDL0MsUUFBQSxNQUFNLEdBQUc7SUFDbkIsZUFBZSxFQUFFLElBQWdCO0lBQ2pDLGtCQUFrQixFQUFFLElBQWU7SUFDbkMsb0JBQW9CLEVBQUUsSUFBZTtJQUNyQyxvQkFBb0IsRUFBRSxJQUFxQjtJQUMzQyx1QkFBdUIsRUFBRSxJQUFlO0lBQ3hDLGlCQUFpQixFQUFFLElBQWU7SUFDbEMsZUFBZSxFQUFFLElBQWU7SUFDaEMsaUJBQWlCLEVBQUUsSUFBZTtJQUNsQyxtQkFBbUIsRUFBRSxJQUFlO0lBRXBDLFlBQVksRUFBRSxTQUFTLENBQUMsUUFBUTtJQUVoQyxJQUFJO1FBQUosaUJBNEJDO1FBM0JFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzFFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFFL0YsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEVBQUUs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LEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdFLENBQUM7Q0FDSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IF8gPSBfRy5fO1xuXG5jb25zdCBnYW1lU3RhdGUgPSBfRy50eXBlcy5nYW1lU3RhdGU7XG5cbmltcG9ydCB7IGJpbmRCdXR0b25IYW5kbGVycyB9IGZyb20gJy4vYmluZF9idXR0b25faGFuZGxlcnMnO1xuZXhwb3J0IGNvbnN0IGNvcmVVSSA9IHtcbiAgIGFsZXJ0T0tDYWxsYmFjazogbnVsbCBhcyBGdW5jdGlvbixcbiAgIHRhYkJ1dHRvbkNvbnRhaW5lcjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgbWFzdGVyU2Nyb2xsVmlld05vZGU6IG51bGwgYXMgY2MuTm9kZSxcbiAgIG1hc3RlclNjcm9sbFZpZXdDb21wOiBudWxsIGFzIGNjLlNjcm9sbFZpZXcsXG4gICBtYXN0ZXJTY3JvbGxWaWV3Q29udGVudDogbnVsbCBhcyBjYy5Ob2RlLFxuICAgcGxheUdyaWRDb250YWluZXI6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGhlYWRlckNvbnRhaW5lcjogbnVsbCBhcyBjYy5Ob2RlLFxuICAgcHV6emxlUHJvZ3Jlc3NCYXI6IG51bGwgYXMgY2MuTm9kZSxcbiAgIGJ0bkhpbnREaXNhYmxlZE5vZGU6IG51bGwgYXMgY2MuTm9kZSxcblxuICAgY3VycmVudFN0YXRlOiBnYW1lU3RhdGUuY2F0ZWdvcnksXG5cbiAgIGluaXQoKSB7XG4gICAgICB0aGlzLmFkanVzdFVJKCk7XG4gICAgICB0aGlzLm1hc3RlclNjcm9sbFZpZXdOb2RlID0gY2MuZmluZCgnQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3RlcicpO1xuICAgICAgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29tcCA9IHRoaXMubWFzdGVyU2Nyb2xsVmlld05vZGUuZ2V0Q29tcG9uZW50KCdOZXN0YWJsZVNjcm9sbFZpZXdfT3V0ZXInKTtcblxuICAgICAgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29udGVudCA9IHRoaXMucGxheUdyaWRDb250YWluZXIgPSBjYy5maW5kKCd2aWV3L2NvbnRlbnQnLCB0aGlzLm1hc3RlclNjcm9sbFZpZXdOb2RlKTtcbiAgICAgIHRoaXMucGxheUdyaWRDb250YWluZXIgPSBjYy5maW5kKCdncmlkX2FyZWEnLCB0aGlzLm1hc3RlclNjcm9sbFZpZXdDb250ZW50KTtcbiAgICAgIHRoaXMucHV6emxlUHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdwdXp6bGVfcHJvZ3Jlc3NfYmFyJywgdGhpcy5tYXN0ZXJTY3JvbGxWaWV3Q29udGVudCk7XG4gICAgICB0aGlzLmhlYWRlckNvbnRhaW5lciA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZml4ZWRfaGVhZGVyL2hlYWRlcicpO1xuXG4gICAgICB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lciA9IGNjLmZpbmQoYHNpemVfdGFic2AsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlID0gY2MuZmluZCgncGxheWluZ19idXR0b25fYmFyL2J0bl9oaW50L2Rpc2FibGVkJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIHRoaXMuc2V0dXBMb2NhbGl6YXRpb24oKTtcblxuICAgICAgYmluZEJ1dHRvbkhhbmRsZXJzLnJ1bigpO1xuXG4gICAgICBfRy51c2VyLmFkZEluaXRDYWxsYmFjayhkYXRhID0+IHtcbiAgICAgICAgIHRoaXMuc2V0VUlQbGF5U3RhdGUoKGRhdGEuaXNOZXdVc2VyIHx8IF9HLnVzZXIuaXNQdXp6bGVTcGVjaWZpZWQpID8gZ2FtZVN0YXRlLnBsYXlpbmcgOiBnYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgICAgY2MudHdlZW4odGhpcy5tYXN0ZXJTY3JvbGxWaWV3Tm9kZSkudG8oMC4zLCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuaGFuZGxlVUlGb3JWMigpO1xuICAgICAgdGhpcy5maWxsQ29uZmlnVG9VSSgpO1xuXG4gICAgICAvLyBpZiAod2luZG93WydGQkluc3RhbnQnXSkge1xuICAgICAgLy8gICAgX0cudXRpbHNVSS5maWxsTGFiZWwoY2MuZmluZCgndXNlcl9iYXIvbGFiZWxfdXNlcm5hbWUnLCB0aGlzLmhlYWRlckNvbnRhaW5lciksIEZCSW5zdGFudC5wbGF5ZXIuZ2V0TmFtZSgpKTtcbiAgICAgIC8vIH1cbiAgIH0sXG5cblxuICAgc2hvd0xvYWRpbmdBZHMoY2FsbEJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZSA9IGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbG9hZGluZ19hZCcpO1xuICAgICAgY29uc3QgZGlhbG9nID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBkaWFsb2cub3BhY2l0eSA9IDA7XG4gICAgICBkaWFsb2cueCA9IC1kaWFsb2cud2lkdGggLyAyO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MudHdlZW4oZGlhbG9nKVxuICAgICAgICAgLnRvKDAuMywgeyB4OiAwLCBvcGFjaXR5OiAyNTUgfSlcbiAgICAgICAgIC5kZWxheSgyKVxuICAgICAgICAgLnRvKDAuMywgeyB4OiBkaWFsb2cud2lkdGggLyAyLCBvcGFjaXR5OiAwIH0pXG4gICAgICAgICAuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjaygpO1xuICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZUxheW91dCgnbGF5b3V0X2xvYWRpbmdfYWQnKSwgMTAwKTtcbiAgICAgICAgIH0pXG4gICAgICAgICAuc3RhcnQoKTtcbiAgIH0sXG5cblxuICAgc2V0dXBMb2NhbGl6YXRpb24oKSB7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUodGhpcy5oZWFkZXJDb250YWluZXIpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXInKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF93aW4nKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cCcpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvbGF5b3V0X3NldHRpbmdzJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfYWxlcnQnKSk7XG4gICAgICBfRy5sb2NhbGl6ZS5zdWJzY3JpYmVUcmFuc2xhdGUoY2MuZmluZCgnQ2FudmFzL2xheW91dF90dXRvcmlhbCcpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvbGF5b3V0X3BhdXNlJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfaG9tZScpKTtcbiAgICAgIF9HLmxvY2FsaXplLnN1YnNjcmliZVRyYW5zbGF0ZShjYy5maW5kKCdDYW52YXMvc2hhcmVzJykpO1xuICAgICAgX0cubG9jYWxpemUuc3Vic2NyaWJlVHJhbnNsYXRlKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfbG9hZGluZ19hZCcpKTtcblxuICAgICAgY29uc3QgaGFuZGxlU2hhcmVQaWNMYWJlbEdsb3cgPSAoKSA9PiB7XG4gICAgICAgICBjb25zdCBsYWJlbEdsb3cgPSBjYy5maW5kKCdDYW52YXMvc2hhcmVzL3BpY3R1cmUvb3ZlcmxheS90ZXh0X2dsb3cnKTtcbiAgICAgICAgIGNvbnN0IGxhYmVsSW50cm9Ob2RlID0gY2MuZmluZCgnQ2FudmFzL3NoYXJlcy9waWN0dXJlL2xhYmVsX3NoYXJlX2ludHJvXzEnKVxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL3NoYXJlcycpLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbGFiZWxHbG93LmhlaWdodCA9IChsYWJlbEludHJvTm9kZS5oZWlnaHQgKyAzMCkgLyBsYWJlbEdsb3cuc2NhbGU7XG4gICAgICAgICAgICBsYWJlbEdsb3cud2lkdGggPSAoXy5taW4oNzI1LCBsYWJlbEludHJvTm9kZS53aWR0aCArIDUwKSkgLyBsYWJlbEdsb3cuc2NhbGU7XG4gICAgICAgICAgICBjYy5maW5kKCdDYW52YXMvc2hhcmVzJykuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICB9KVxuICAgICAgfVxuICAgICAgX0cubG9jYWxpemUuYWRkSW5pdENhbGxiYWNrKGhhbmRsZVNoYXJlUGljTGFiZWxHbG93KTtcbiAgICAgIF9HLmxvY2FsaXplLmxhbmd1YWdlQ2hhbmdlQ2FsbGJhY2tBcnIucHVzaChoYW5kbGVTaGFyZVBpY0xhYmVsR2xvdyk7XG4gICB9LFxuXG5cbiAgIGZpbGxDb25maWdUb1VJKCkge1xuICAgICAgLy8gbGV2ZWwgdXAgc3RhcnNcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKFxuICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cC9kaWFsb2cvc3Rhcl9udW1fYmFzZS9sYWJlbF9zdGFycycpLFxuICAgICAgICAgJycgKyBfRy5jb25maWdHYW1lLmxldmVsVXBDb2luUmV3YXJkXG4gICAgICApO1xuXG4gICAgICAvLyBoaW50IHN0YXJzXG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdwbGF5aW5nX2J1dHRvbl9iYXIvYnRuX2hpbnQvbGFiZWxfZ2FtZV9idG5faGludC9sYWJlbF9zdGFycycsIHRoaXMucGxheUdyaWRDb250YWluZXIpLCAnJyArIF9HLmNvbmZpZ0dhbWUuaGludENvaW5QcmljZSk7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdsYWJlbF9nYW1lX2J0bl9oaW50L2xhYmVsX3N0YXJzJywgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlKSwgJycgKyBfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2UpO1xuXG4gICAgICAvLyB3aW4gY29pbnNcbiAgICAgIHRoaXMudGFiQnV0dG9uQ29udGFpbmVyLmNoaWxkcmVuLm1hcChidG5Ob2RlID0+IHtcbiAgICAgICAgIGNvbnN0IGNvaW5OdW1iZXIgPSBfRy5jb25maWdHYW1lLndpbkNvaW5SZXdhcmRbYnRuTm9kZS5uYW1lXTtcbiAgICAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ2NvaW5fbGFiZWwnLCBidG5Ob2RlKSwgJycgKyBjb2luTnVtYmVyKTtcbiAgICAgIH0pO1xuICAgfSxcblxuXG5cbiAgIC8vIHVzZXJzIGZyb20gc29jaWFsIHBvc3RzXG4gICBoYW5kbGVVSUZvclYyKCkge1xuICAgICAgaWYgKCFfRy51c2VyLmlzVmVyc2lvblYyKSByZXR1cm47XG4gICAgICBjYy5maW5kKCdidG5fYmFjaycsIHRoaXMuaGVhZGVyQ29udGFpbmVyKS5hY3RpdmUgPSB0cnVlO1xuICAgICAgY2MuZmluZCgnYnRuX3NldHRpbmdzJywgdGhpcy5oZWFkZXJDb250YWluZXIpLnggPSAtMjU1O1xuICAgfSxcblxuXG4gICBzaG93QnV0dG9uQmFjaygpIHtcbiAgICAgIGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpLmFjdGl2ZSA9IHRydWU7XG4gICB9LFxuXG4gICBoaWRlQnV0dG9uQmFjaygpIHtcbiAgICAgIGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpLmFjdGl2ZSA9IGZhbHNlO1xuICAgfSxcblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vIFVJIFNJWkUgQURKVVNUTUVOVFxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgLy8gYWRqdXRzIFVJIHRvIGZpdFxuICAgYWRqdXN0VUkoKSB7XG4gICAgICBjb25zdCBtYXhSYXRpbyA9IDcyMCAvIDEyODA7XG4gICAgICBjb25zdCBhY3R1YWxSYXRpbyA9IGNjLndpblNpemUud2lkdGggLyBjYy53aW5TaXplLmhlaWdodDtcbiAgICAgIGlmIChhY3R1YWxSYXRpbyA+IG1heFJhdGlvKSB7XG4gICAgICAgICBjYy5maW5kKCdDYW52YXMnKS5nZXRDb21wb25lbnQoY2MuQ2FudmFzKS5maXRXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgY2MuZmluZCgnQ2FudmFzJykuZ2V0Q29tcG9uZW50KGNjLkNhbnZhcykuZml0SGVpZ2h0ID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gbWFrZSBsYXlvdXQgaGVpZ2h0ID0gd2luZG93cyBoZWlnaHRcbiAgICAgIGNvbnN0IGxheW91dEFyciA9IFtcbiAgICAgICAgICdDYW52YXMvcGxheV9hcmVhJyxcbiAgICAgICAgICdDYW52YXMvYmcnLFxuICAgICAgICAgJ0NhbnZhcy9jb250cm9sX2xheWVyJyxcbiAgICAgICAgICdDYW52YXMvbGF5b3V0X3dpbicsXG4gICAgICAgICAnQ2FudmFzL2xheW91dF9zZXR0aW5ncycsXG4gICAgICAgICAnQ2FudmFzL2Z4X2NvbnRhaW5lcicsXG4gICAgICAgICAnQ2FudmFzL25hZ19zY3JlZW4nLFxuICAgICAgICAgJ0NhbnZhcy9sYXlvdXRfZml4ZWRfaGVhZGVyJyxcbiAgICAgICAgICdDYW52YXMvbGF5b3V0X3R1dG9yaWFsJyxcbiAgICAgIF0ubWFwKHBhdGggPT4ge1xuICAgICAgICAgY29uc3QgbGF5ZXJOb2RlID0gY2MuZmluZChwYXRoKTtcbiAgICAgICAgIGxheWVyTm9kZS5oZWlnaHQgPSBjYy53aW5TaXplLmhlaWdodDtcbiAgICAgIH0pO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gU0VUVVAgR0FNRSBQTEFZIFNUQVRFOiBQSUNLIE1PREUvIFBMQVlJTkcvIFdPTlxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgc2V0VUlQbGF5U3RhdGUoc3RhdGU6IF9HLnR5cGVzLmdhbWVTdGF0ZSkge1xuICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZTtcblxuICAgICAgY29uc3QgYnRuQmFjayA9IGNjLmZpbmQoJ2J0bl9iYWNrJywgdGhpcy5oZWFkZXJDb250YWluZXIpO1xuICAgICAgY29uc3QgYnRuUGxheSA9IGNjLmZpbmQoJ2J0bl9wbGF5JywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBidG5QbGF5VjIgPSBjYy5maW5kKCdidG5fcGxheV92MicsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgYnRuU2hhcmUgPSBjYy5maW5kKCdidG5fc2hhcmUnLCB0aGlzLnBsYXlHcmlkQ29udGFpbmVyKTtcblxuICAgICAgY29uc3Qgc2l6ZVRhYnNJbnRybyA9IGNjLmZpbmQoJ3NpemVfdGFic19pbnRybycsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgcGxheWluZ0J0bkJhciA9IGNjLmZpbmQoJ3BsYXlpbmdfYnV0dG9uX2JhcicsIHRoaXMucGxheUdyaWRDb250YWluZXIpO1xuICAgICAgY29uc3QgcGxheVRpbWVMZXZlbEJhciA9IGNjLmZpbmQoJ3RpbWVfbGV2ZWxfYmFyJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG4gICAgICBjb25zdCBmYWtlVGltZVN0YWNrID0gY2MuZmluZCgnZmFrZV90aW1lX3N0YWNrJywgdGhpcy5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGdyaWRTdGFjayA9IGNjLmZpbmQoJ2dyaWRfc3RhY2snLCB0aGlzLnBsYXlHcmlkQ29udGFpbmVyKTtcbiAgICAgIGNvbnN0IGdyaWRTdGFja0JnID0gY2MuZmluZCgnZ3JpZF9iZycsIGdyaWRTdGFjayk7XG4gICAgICBjb25zdCBncmlkQ292ZXIgPSBjYy5maW5kKCdncmlkX2NvdmVyJywgZ3JpZFN0YWNrKTtcbiAgICAgIGNvbnN0IGR1bW15U3RhY2sgPSBjYy5maW5kKCdkdW1teV9zdGFjaycsIHRoaXMucGxheUdyaWRDb250YWluZXIucGFyZW50KTtcbiAgICAgIGNvbnN0IGxhYmVsTW9yZVB1enpsZSA9IGNjLmZpbmQoJ2xhYmVsX2dhbWVfcGxheV9tb3JlX3B1enpsZScsIF9HLmNvcmVVSS5wbGF5R3JpZENvbnRhaW5lcik7XG5cbiAgICAgIGNvbnN0IGxldmVsID0gY2MuZmluZCgnbGV2ZWwnLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyKSB8fCB7fTtcblxuICAgICAgbGV0IGFjdGl2ZU5vZGVBcnIsIGhpZGRlbk5vZGVBcnI7XG4gICAgICBpZiAoc3RhdGUgPT0gZ2FtZVN0YXRlLmNhdGVnb3J5KSB7XG4gICAgICAgICBhY3RpdmVOb2RlQXJyID0gW2xldmVsLCBkdW1teVN0YWNrLCBidG5CYWNrXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbdGhpcy5wbGF5R3JpZENvbnRhaW5lciwgdGhpcy5wdXp6bGVQcm9ncmVzc0JhciwgbGFiZWxNb3JlUHV6emxlLCBidG5QbGF5VjIsIGJ0blNoYXJlXTtcbiAgICAgIH1cblxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gZ2FtZVN0YXRlLnBpY2tfbW9kZSkge1xuICAgICAgICAgYWN0aXZlTm9kZUFyciA9IFt0aGlzLnBsYXlHcmlkQ29udGFpbmVyLCB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lciwgc2l6ZVRhYnNJbnRybywgYnRuUGxheSwgZ3JpZENvdmVyLCBidG5CYWNrXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbcGxheWluZ0J0bkJhciwgcGxheVRpbWVMZXZlbEJhciwgZmFrZVRpbWVTdGFjaywgbGV2ZWwsIHRoaXMucHV6emxlUHJvZ3Jlc3NCYXIsIGR1bW15U3RhY2ssIGxhYmVsTW9yZVB1enpsZSwgYnRuUGxheVYyLCBidG5TaGFyZV07XG4gICAgICAgICBncmlkU3RhY2suc2NhbGUgPSAwLjg4O1xuICAgICAgICAgZ3JpZFN0YWNrQmcuc2NhbGUgPSAxO1xuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSBnYW1lU3RhdGUucGxheWluZyB8fCBzdGF0ZSA9PSBnYW1lU3RhdGUud29uKSB7XG4gICAgICAgICBhY3RpdmVOb2RlQXJyID0gW3RoaXMucGxheUdyaWRDb250YWluZXIsIHBsYXlUaW1lTGV2ZWxCYXIsIGZha2VUaW1lU3RhY2ssIHBsYXlpbmdCdG5CYXIsIGJ0bkJhY2ssIGxldmVsLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyXTtcbiAgICAgICAgIGhpZGRlbk5vZGVBcnIgPSBbdGhpcy50YWJCdXR0b25Db250YWluZXIsIHNpemVUYWJzSW50cm8sIGdyaWRDb3ZlciwgYnRuUGxheSwgZHVtbXlTdGFjaywgbGFiZWxNb3JlUHV6emxlLCBidG5QbGF5VjIsIGJ0blNoYXJlXTtcbiAgICAgICAgIGdyaWRTdGFjay5zY2FsZSA9IDE7XG4gICAgICAgICBncmlkU3RhY2tCZy5zY2FsZSA9IDE7XG4gICAgICB9XG5cbiAgICAgIGVsc2UgaWYgKHN0YXRlID09IGdhbWVTdGF0ZS52Mikge1xuICAgICAgICAgYWN0aXZlTm9kZUFyciA9IFt0aGlzLnBsYXlHcmlkQ29udGFpbmVyLCBidG5CYWNrLCBncmlkQ292ZXIsIGxhYmVsTW9yZVB1enpsZSwgYnRuUGxheVYyLCBidG5TaGFyZV07XG4gICAgICAgICBoaWRkZW5Ob2RlQXJyID0gW3RoaXMudGFiQnV0dG9uQ29udGFpbmVyLCBwbGF5aW5nQnRuQmFyLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyLCBsZXZlbCwgZmFrZVRpbWVTdGFjaywgcGxheVRpbWVMZXZlbEJhciwgc2l6ZVRhYnNJbnRybywgYnRuUGxheSwgZHVtbXlTdGFja107XG4gICAgICAgICBncmlkU3RhY2suc2NhbGUgPSAwLjk5NDtcbiAgICAgICAgIGdyaWRTdGFja0JnLnNjYWxlID0gMC45ODtcbiAgICAgIH1cblxuICAgICAgLy8gc2V0IGFjdGl2ZS8gaGlkZGVuXG4gICAgICBhY3RpdmVOb2RlQXJyLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gdHJ1ZSk7XG4gICAgICBoaWRkZW5Ob2RlQXJyLm1hcChub2RlID0+IG5vZGUuYWN0aXZlID0gZmFsc2UpO1xuICAgICAgaWYgKF9HLnVzZXIuaXNQdXp6bGVTcGVjaWZpZWQpIHtcbiAgICAgICAgIGJ0bkJhY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgIC8vIC0tLSBUSEUgVEFCIDN4MyAmIDV4NVxuICAgb25UYWJQcmV2aWV3KHNpemU6ICczeDMnIHwgJzR4NCcgfCAnNXg1JyB8ICc2eDYnKSB7XG4gICAgICB0aGlzLnRhYkJ1dHRvbkNvbnRhaW5lci5jaGlsZHJlbi5tYXAoYnRuTm9kZSA9PiB7XG4gICAgICAgICBjb25zdCBpc0ZvY3VzID0gYnRuTm9kZS5uYW1lLmluY2x1ZGVzKHNpemUpO1xuICAgICAgICAgY2MuZmluZCgnYmdfb24nLCBidG5Ob2RlKS5hY3RpdmUgPSBpc0ZvY3VzO1xuICAgICAgICAgY2MudHdlZW4oYnRuTm9kZSkudG8oMC4yLCB7IHNjYWxlOiBpc0ZvY3VzID8gMSA6IDAuOCB9KS5zdGFydCgpO1xuICAgICAgfSk7XG4gICB9LFxuXG5cbiAgIC8vIC0tLSBCQUNLXG4gICBiYWNrKCkge1xuICAgICAgY29uc3QgZ01lY2hhbmljID0gX0cuZ2FtZU1lY2hhbmljO1xuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09IGdhbWVTdGF0ZS5jYXRlZ29yeSkge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVCdXR0b25CYWNrKCk7XG4gICAgICAgICByZXR1cm4gdGhpcy5zaG93TGF5b3V0KCdsYXlvdXRfaG9tZScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlID09IGdhbWVTdGF0ZS5waWNrX21vZGUpIHJldHVybiB0aGlzLnNldFVJUGxheVN0YXRlKGdhbWVTdGF0ZS5jYXRlZ29yeSk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50U3RhdGUgPT0gZ2FtZVN0YXRlLnBsYXlpbmcgLyp8fCB0aGlzLmN1cnJlbnRTdGF0ZSA9PSBnYW1lU3RhdGUud29uKi8pIHtcbiAgICAgICAgIGlmIChfRy50dXRvcmlhbC5pc0N1cnJlbnRQdXp6bGVUdXRvcmlhbCgpKSB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLmNhdGVnb3J5KTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2UgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG4gICAgICAgICAvLyBfRy5pbnRlckFkLmNoZWNrVG9TaG93SW50ZXJBZCgpO1xuICAgICAgfVxuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgLy8gTEFZT1VUU1xuICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgLy8gPT09PT09PVxuICAgc2hvd0xheW91dChsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGxheW91dE5vZGU6IGNjLk5vZGUgPSAoXy5pc1N0cmluZyhsYXlvdXQpID8gY2MuZmluZChgQ2FudmFzLyR7bGF5b3V0fWApIDogbGF5b3V0KTtcbiAgICAgIGxheW91dE5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgIH0sXG5cbiAgIGhpZGVMYXlvdXQobGF5b3V0OiBjYy5Ob2RlIHwgc3RyaW5nKSB7XG4gICAgICBjb25zdCBsYXlvdXROb2RlOiBjYy5Ob2RlID0gKF8uaXNTdHJpbmcobGF5b3V0KSA/IGNjLmZpbmQoYENhbnZhcy8ke2xheW91dH1gKSA6IGxheW91dCk7XG4gICAgICBsYXlvdXROb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgfSxcblxuXG4gICAvLyA9PT0gd2l0aCBhbmltYXRpb25zXG4gICBzaG93TGF5b3V0QW5pbShsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcsIGJnT3BhY2l0eT8pIHtcbiAgICAgIHRoaXMuc2hvd05hZ1NjcmVlbigwLjQpO1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IChfLmlzU3RyaW5nKGxheW91dCkgPyBjYy5maW5kKGBDYW52YXMvJHtsYXlvdXR9YCkgOiBsYXlvdXQpO1xuXG4gICAgICBjb25zdCBkaWFsb2dOb2RlID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBjb25zdCBiZ05vZGUgPSBjYy5maW5kKCdiZycsIGxheW91dE5vZGUpIHx8IGNjLmZpbmQoJ3NjcmVlbl9iZycsIGxheW91dE5vZGUpO1xuICAgICAgYmdOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICBkaWFsb2dOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgIGRpYWxvZ05vZGUuc2NhbGUgPSAwO1xuICAgICAgYmdOb2RlLm9wYWNpdHkgPSAwO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjYy50d2VlbihiZ05vZGUpLnRvKDAuMywgeyBvcGFjaXR5OiBiZ09wYWNpdHkgfHwgMjAwIH0pLnN0YXJ0KCk7XG4gICAgICBjYy50d2VlbihkaWFsb2dOb2RlKS50bygwLjMsIHsgc2NhbGU6IDEuMDMgfSkudG8oMC4xLCB7IHNjYWxlOiAxIH0pLnN0YXJ0KCk7XG4gICAgICB0aGlzLmhpZGVCdXR0b25CYWNrKCk7XG4gICB9LFxuXG4gICBoaWRlTGF5b3V0QW5pbShsYXlvdXQ6IGNjLk5vZGUgfCBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuc2hvd05hZ1NjcmVlbigwLjQpO1xuICAgICAgY29uc3QgbGF5b3V0Tm9kZTogY2MuTm9kZSA9IChfLmlzU3RyaW5nKGxheW91dCkgPyBjYy5maW5kKGBDYW52YXMvJHtsYXlvdXR9YCkgOiBsYXlvdXQpO1xuXG4gICAgICBjb25zdCBkaWFsb2dOb2RlID0gY2MuZmluZCgnZGlhbG9nJywgbGF5b3V0Tm9kZSk7XG4gICAgICBjb25zdCBiZ05vZGUgPSBjYy5maW5kKCdiZycsIGxheW91dE5vZGUpIHx8IGNjLmZpbmQoJ3NjcmVlbl9iZycsIGxheW91dE5vZGUpO1xuICAgICAgbGF5b3V0Tm9kZS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBiZ05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgIGRpYWxvZ05vZGUuc3RvcEFsbEFjdGlvbnMoKTtcblxuICAgICAgY2MudHdlZW4oYmdOb2RlKS50bygwLjMsIHsgb3BhY2l0eTogMCB9KS5zdGFydCgpO1xuICAgICAgY2MudHdlZW4oZGlhbG9nTm9kZSkudG8oMC4yLCB7IHNjYWxlOiAxLjA2IH0pLnRvKDAuMiwgeyBzY2FsZTogMCB9KS5jYWxsKCgpID0+IHtcbiAgICAgICAgIGxheW91dE5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9KS5jYWxsKCgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCkpLnN0YXJ0KCk7XG4gICAgICB0aGlzLnNob3dCdXR0b25CYWNrKCk7XG4gICB9LFxuXG5cblxuICAgLy8gPT09PT09PT1cbiAgIHNob3dBbGVydChtc2csIG9rQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xuICAgICAgdGhpcy5zaG93TGF5b3V0KFwibGF5ZXJfYWxlcnRcIik7XG4gICAgICBfRy51dGlsc1VJLmZpbGxMYWJlbChjYy5maW5kKCdDYW52YXMvbGF5ZXJfYWxlcnQvYmdfbXNnL2xhYmVsX21zZycpLCBtc2cpO1xuICAgICAgdGhpcy5hbGVydE9LQ2FsbGJhY2sgPSBva0NhbGxiYWNrO1xuICAgfSxcblxuICAgLy8gPT09PT09PVxuICAgaGlkZUxvYWRpbmdUaW1lcjogbnVsbCxcbiAgIHNob3dMb2FkaW5nKCkge1xuICAgICAgdGhpcy5zaG93TGF5b3V0KFwibGF5ZXJfbG9hZGluZ1wiKTtcblxuICAgICAgLy8gYXV0byB0dXJuIG9mZiBsb2FkaW5nIGlmIHNob3duIG1vcmUgdGhhbiAxMCBzZWNzIGJ1dCBub3QgYmVpbmcgdHVybmVkIG9mZlxuICAgICAgaWYgKHRoaXMuaGlkZUxvYWRpbmdUaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZUxvYWRpbmdUaW1lcik7XG4gICAgICB0aGlzLmhpZGVMb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZUxvYWRpbmcoKSwgMTAwMDApO1xuICAgfSxcbiAgIGhpZGVMb2FkaW5nKCkge1xuICAgICAgdGhpcy5oaWRlTGF5b3V0KFwibGF5ZXJfbG9hZGluZ1wiKTtcbiAgICAgIGlmICh0aGlzLmhpZGVMb2FkaW5nVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLmhpZGVMb2FkaW5nVGltZXIpO1xuICAgfSxcblxuXG4gICAvLyA9PT09PT09PT1cbiAgIC8vIG5hZyBzY3JlZW46IHByZXZlbnQgdXNlciBmcm9tIGNsaWNraW5nIGJ1dHRvbnMgd2hpbGUgc2hvd2luZyBhbmltYXRpb25zXG4gICBzaG93TmFnU2NyZWVuKHRpbWVvdXQ/OiBudW1iZXIpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9uYWdfc2NyZWVuJykuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGlmICh0aW1lb3V0KSBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5oaWRlTmFnU2NyZWVuKCksIHRpbWVvdXQgKiAxMDAwKTtcbiAgIH0sXG4gICBoaWRlTmFnU2NyZWVuKCkge1xuICAgICAgY2MuZmluZCgnQ2FudmFzL25hZ19zY3JlZW4nKS5hY3RpdmUgPSBmYWxzZTtcbiAgIH0sXG5cblxuICAgLy8gPT09PT09IFNvbWUgc3lzdGVtIGxhYmVscyA9PT09PT09PT09PT09PT09XG4gICAvLyB1cGRhdGUgZ29sZCB0byBhbGwgcGxhY2VzIGluIGdhbWUgdWlcbiAgIHVwZGF0ZVVzZXJTdGF0cyhpc1NraXBVcGRhdGVVSSA9IGZhbHNlKSB7XG4gICAgICAvLyBjb2luc1xuICAgICAgaWYgKCFpc1NraXBVcGRhdGVVSSkge1xuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICAgICBjYy5maW5kKCdzdGFyMl9iaWcgMS9sYWJlbF9zdGFycycsIHRoaXMuaGVhZGVyQ29udGFpbmVyKSxcbiAgICAgICAgICAgIF8uZm9ybWF0TW9uZXkoX0cudXNlci5zdGFycylcbiAgICAgICAgICk7XG5cbiAgICAgICAgIC8vIGV4cFxuICAgICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICAgICBjYy5maW5kKCdleHBfaWNvbi9sYWJlbF9leHAnLCB0aGlzLmhlYWRlckNvbnRhaW5lciksXG4gICAgICAgICAgICBfLmZvcm1hdE1vbmV5KF9HLnVzZXIuZXhwKVxuICAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwoXG4gICAgICAgICBjYy5maW5kKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvbGFiZWxfZ2FtZW92ZXJfc2NvcmUnKSxcbiAgICAgICAgIF8uZm9ybWF0TW9uZXkoX0cudXNlci5leHApXG4gICAgICApO1xuXG4gICAgICB0aGlzLnVwZGF0ZUJ0bkhpbnQoKTtcblxuICAgICAgLy8gbGV2ZWxcbiAgICAgIGlmICghaXNTa2lwVXBkYXRlVUkpIHtcbiAgICAgICAgIHRoaXMudXBkYXRlTGV2ZWxOdW1iZXIoKTtcbiAgICAgICAgIHRoaXMudXBkYXRlTGV2ZWxQcm9ncmVzc0JhcigpO1xuICAgICAgfVxuICAgfSxcblxuICAgLy8gYnV0dG9uIGhpbnQgb24vb2ZmXG4gICB1cGRhdGVCdG5IaW50KCkge1xuICAgICAgdGhpcy5idG5IaW50RGlzYWJsZWROb2RlLmFjdGl2ZSA9IF9HLnVzZXIuc3RhcnMgPCBfRy5jb25maWdHYW1lLmhpbnRDb2luUHJpY2U7XG4gICB9LFxuXG4gICB1cGRhdGVMZXZlbE51bWJlcigpIHtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS90aW1lX2xldmVsX2Jhci9sZXZlbC9sZXZlbF9udW0nKSwgJycgKyBfRy51c2VyLmxldmVsKTtcbiAgICAgIF9HLnV0aWxzVUkuZmlsbExhYmVsKGNjLmZpbmQoJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9leHBfcHJvZ3Jlc3NfYmFyL2xldmVsL2xldmVsX251bScpLCAnJyArIF9HLnVzZXIubGV2ZWwpO1xuICAgfSxcblxuXG4gICAvLyBwdXp6bGUgcHJvZ3Jlc3MgYmFyXG4gICB1cGRhdGVQdXp6bGVQcm9ncmVzc0JhcihyYXRpbywgZnhUaW1lID0gMCkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdiYXInLCB0aGlzLnB1enpsZVByb2dyZXNzQmFyKTtcbiAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIocHJvZ3Jlc3NCYXIsIHJhdGlvLCBmeFRpbWUpO1xuICAgfSxcblxuXG4gICAvLyBsZXZlbCBwcm9ncmVzcyBiYXJcbiAgIHVwZGF0ZUxldmVsUHJvZ3Jlc3NCYXIoZnhUaW1lID0gMCkge1xuICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvZXhwX3Byb2dyZXNzX2Jhci9iYXInKTtcbiAgICAgIGNvbnN0IGlzRXZlbiA9ICEoX0cudXNlci5leHAgJSBfRy5jb25maWdHYW1lLmxldmVsVXBFeHApO1xuICAgICAgY29uc3QgcmF0aW8gPSBpc0V2ZW4gPyAxIDogMC41O1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzc0Jhcihwcm9ncmVzc0JhciwgcmF0aW8sIGZ4VGltZSk7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgaWYgKHJhdGlvID09IDEpIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIocHJvZ3Jlc3NCYXIsIDApO1xuICAgICAgfSwgNTAwMCk7XG4gICB9LFxuXG5cbiAgIHVwZGF0ZVByb2dyZXNzQmFyKGJhck5vZGU6IGNjLk5vZGUsIHJhdGlvLCBmeFRpbWUgPSAwKSB7XG4gICAgICBiYXJOb2RlLm9yZ1dpZHRoID0gYmFyTm9kZS5vcmdXaWR0aCB8fCBiYXJOb2RlLndpZHRoO1xuXG4gICAgICBjb25zdCBsYWJlbFBlcmNlbnRhZ2UgPSBjYy5maW5kKCdsYWJlbF9wZXJjZW50YWdlJywgYmFyTm9kZS5wYXJlbnQpO1xuICAgICAgX0cudXRpbHNVSS5maWxsTGFiZWwobGFiZWxQZXJjZW50YWdlLCBgJHtfLmZsb29yKHJhdGlvICogMTAwKX0lYCk7XG5cbiAgICAgIGNjLnR3ZWVuKGJhck5vZGUpLnRvKGZ4VGltZSwgeyB3aWR0aDogcmF0aW8gKiBiYXJOb2RlLm9yZ1dpZHRoIH0pLnN0YXJ0KCk7XG4gICB9LFxufSJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/ui-fx/bind_button_handlers.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9c123Lu5L1HWKu7kgQRu2Dk', 'bind_button_handlers');
// script/system/ui-fx/bind_button_handlers.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindButtonHandlers = void 0;
var _G = require("../../system/all_modules");
var _ = _G._;
exports.bindButtonHandlers = {
    run: function () {
        // game over
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_replay', function () {
            _G.coreUI.hideLayout('layout_game_over');
            _G.coreUI.showButtonBack();
            _G.gameMechanic.replay();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/label_gameover_no_thanks', function () {
            _G.coreUI.hideLayout('layout_game_over');
            _G.coreUI.showButtonBack();
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
        });
        // layout home
        _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play', function () {
            _G.coreUI.hideLayout('layout_home');
            _G.coreUI.showButtonBack();
            _G.coreUI.setUIPlayState(_G.types.gameState.category);
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_home/dialog/btn_play_w_friends', function () {
            _G.social.inviteHome(function () {
                _G.coreUI.hideLayout('layout_home');
                _G.coreUI.setUIPlayState(_G.types.gameState.category);
            });
        });
        // layout pause
        _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_home', function () {
            _G.coreUI.hideLayoutAnim('layout_pause', function () {
                _G.coreUI.showLayout('layout_home');
                _G.coreUI.hideButtonBack();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_pause/dialog/btn_resume', function () {
            _G.coreUI.hideLayoutAnim('layout_pause', function () {
                _G.gameMechanic.onResume();
            });
        });
        // tut continue
        _G.utilsUI.makeBubbleButton('Canvas/layout_tutorial/dialog/btn_continue', function () {
            _G.tutorial.onBtnContinue();
        });
        // win => claim
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_ok', function () {
            if (!_G.user.isVersionV2) {
                _G.interAd.checkToShowInterAd(function () {
                    _G.coreFX.playWinClaimAnim();
                });
            }
            else
                _G.coreFX.playWinClaimAnim();
        });
        // btn hint & hint disabled
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_hint', function () { return _G.gameMechanic.onHint(); });
        _G.utilsUI.makeBubbleButton(_G.coreUI.btnHintDisabledNode, function () {
            _G.gameMechanic.onPause();
            _G.coreUI.showLayoutAnim('layout_alert');
        });
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_pause', function () {
            _G.gameMechanic.onPause(true);
        });
        // game tab size 3x3 5x5
        var gMechanic = _G.gameMechanic;
        _G.coreUI.tabButtonContainer.children.map(function (tabBtnNode) {
            _G.utilsUI.makeButton(tabBtnNode, function () {
                var sizes = tabBtnNode.name.split('x').map(function (t) { return parseInt(t); });
                gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, sizes[0], sizes[1]);
            });
        });
        // btn play
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play', function () { return gMechanic.startGame(); });
        // btn_play_v2
        var showPreview3x3 = function () {
            gMechanic.previewGame(gMechanic.currentCategoryName, gMechanic.currentFrameName, 3, 3);
        };
        _G.utilsUI.makeButton('Canvas/play_area/scrollview_master/view/content/grid_area/grid_stack/grid_cover', function () {
            if (_G.coreUI.currentState === _G.types.gameState.v2) {
                _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
                showPreview3x3();
            }
            else
                gMechanic.startGame();
        });
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_play_v2', function () {
            _G.coreUI.setUIPlayState(_G.types.gameState.pick_mode);
            showPreview3x3();
        });
        //  UI back
        _G.utilsUI.makeBubbleButton(cc.find('btn_back', _G.coreUI.headerContainer), function () { return _G.coreUI.back(); });
        //  close level up
        _G.utilsUI.makeBubbleButton('Canvas/layout_level_up/dialog/btn_ok', function () {
            if (_G.coreFX.isPlayingFxStarsAdd)
                return;
            _G.coreFX.fxAddCoins(cc.find('Canvas/layout_level_up/dialog/star_num_base/star2_big 1'), _G.configGame.levelUpCoinReward);
            _G.coreUI.hideLayoutAnim('layout_level_up', function () {
                gMechanic.playNextRandomPuzzle();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_close', function () {
            _G.coreUI.hideLayoutAnim('layout_alert', function () {
                gMechanic.onResume();
            });
        });
        // settings
        _G.utilsUI.makeBubbleButton(cc.find('btn_settings', _G.coreUI.headerContainer), function () {
            _G.gameMechanic.onPause();
            _G.coreUI.showLayout('layout_settings');
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_settings/dialog/btn_back', function () {
            _G.coreUI.hideLayout('layout_settings');
            if (gMechanic.isPlaying()
                && !cc.find('Canvas/layout_alert').active)
                _G.gameMechanic.onResume();
        });
        // ============================
        // social
        // --------------- invite
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/playing_button_bar/btn_invite', function () {
            _G.gameMechanic.onPause();
            _G.social.invite(function () {
                if (gMechanic.isPlaying())
                    _G.gameMechanic.onResume();
            });
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_invite', function () {
            _G.social.invite();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_invite', function () {
            _G.social.invite();
        });
        // --------------- share
        _G.utilsUI.makeBubbleButton('Canvas/play_area/scrollview_master/view/content/grid_area/btn_share', function () {
            _G.social.share(true);
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_share', function () {
            _G.social.share();
        });
        _G.utilsUI.makeBubbleButton('Canvas/layout_game_over/dialog/btn_share', function () {
            _G.social.share();
        });
        // ============================
        // video ads
        _G.utilsUI.makeBubbleButton('Canvas/layout_alert/dialog/btn_video', function () {
            _G.coreUI.showNagScreen();
            _G.video.showVideo(function () {
                var starNum = _G.configGame.videoCoinReward;
                var baseNode = cc.find('Canvas/layout_alert/dialog/btn_video');
                _G.user.addStars(starNum, true);
                _G.coreUI.updateBtnHint();
                _G.coreFX.fxAddCoins(baseNode, starNum);
                _G.coreUI.showNagScreen(2);
                _.setTimeout(function () {
                    _G.coreUI.hideLayoutAnim('layout_alert', function () {
                        if (gMechanic.isPlaying())
                            _G.gameMechanic.onResume();
                    });
                }, 2000);
            }, function () {
                _G.coreUI.hideNagScreen();
                _G.coreFX.showVideoError(270);
            });
        });
        // _G.utilsUI.makeBubbleButton('Canvas/layout_win/dialog/btn_video', () => {
        //    _G.coreUI.showNagScreen();
        //    _G.video.showVideo(
        //       () => {
        //          const starNum = _G.configGame.winStar[_G.gameMechanic.currentSizeMode];
        //          const baseNode = cc.find('Canvas/layout_win/dialog/btn_video');
        //          _G.user.addStars(starNum, true); // only add starNum instead of 2 * starNum cause already silently added starNum when win
        //          _G.coreUI.updateBtnHint();
        //          _G.coreFX.fxAddCoins(baseNode, 2 * starNum);
        //          _G.coreUI.showNagScreen(2);
        //          _.setTimeout(() => {
        //             _G.coreUI.hideLayoutAnim('layout_win', () => _G.gameMechanic.checkToShowLevelUp());
        //          }, 2000);
        //       },
        //       () => {
        //          _G.coreUI.hideNagScreen();
        //          _G.coreFX.showVideoError(410);
        //       }
        //    );
        // });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3VpLWZ4L2JpbmRfYnV0dG9uX2hhbmRsZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUErQztBQUMvQyxJQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRUYsUUFBQSxrQkFBa0IsR0FBRztJQUMvQixHQUFHO1FBQ0EsWUFBWTtRQUNaLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsMkNBQTJDLEVBQUU7WUFDdEUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHlEQUF5RCxFQUFFO1lBQ3BGLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMzQixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FBQztRQUVILGNBQWM7UUFDZCxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLG9DQUFvQyxFQUFFO1lBQy9ELEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDM0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFD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QUMsQ0FBQztZQUNaLENBQUMsRUFDRDtnQkFDRyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUMxQixFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQ0gsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBR0gsNEVBQTRFO1FBQzVFLGdDQUFnQztRQUNoQyx5QkFBeUI7UUFDekIsZ0JBQWdCO1FBQ2hCLG1GQUFtRjtRQUNuRiwyRUFBMkU7UUFDM0UscUlBQXFJO1FBQ3JJLHNDQUFzQztRQUN0Qyx3REFBd0Q7UUFDeEQsdUNBQXVDO1FBQ3ZDLGdDQUFnQztRQUNoQyxrR0FBa0c7UUFDbEcscUJBQXFCO1FBQ3JCLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsc0NBQXNDO1FBQ3RDLDBDQUEwQztRQUMxQyxVQUFVO1FBQ1YsUUFBUTtRQUNSLE1BQU07SUFHVCxDQUFDO0NBSUgsQ0FBQSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIF9HIGZyb20gJy4uLy4uL3N5c3RlbS9hbGxfbW9kdWxlcyc7XG5jb25zdCBfID0gX0cuXztcblxuZXhwb3J0IGNvbnN0IGJpbmRCdXR0b25IYW5kbGVycyA9IHtcbiAgIHJ1bigpIHtcbiAgICAgIC8vIGdhbWUgb3ZlclxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvYnRuX3JlcGxheScsICgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0KCdsYXlvdXRfZ2FtZV9vdmVyJyk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0J1dHRvbkJhY2soKTtcbiAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5yZXBsYXkoKTtcbiAgICAgIH0pO1xuXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfZ2FtZV9vdmVyL2RpYWxvZy9sYWJlbF9nYW1lb3Zlcl9ub190aGFua3MnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2dhbWVfb3ZlcicpO1xuICAgICAgICAgX0cuY29yZVVJLnNob3dCdXR0b25CYWNrKCk7XG4gICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLmNhdGVnb3J5KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBsYXlvdXQgaG9tZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2hvbWUvZGlhbG9nL2J0bl9wbGF5JywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF9ob21lJyk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0J1dHRvbkJhY2soKTtcbiAgICAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9ob21lL2RpYWxvZy9idG5fcGxheV93X2ZyaWVuZHMnLCAoKSA9PiB7XG4gICAgICAgICBfRy5zb2NpYWwuaW52aXRlSG9tZSgoKSA9PiB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2hvbWUnKTtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zZXRVSVBsYXlTdGF0ZShfRy50eXBlcy5nYW1lU3RhdGUuY2F0ZWdvcnkpO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyBsYXlvdXQgcGF1c2VcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9wYXVzZS9kaWFsb2cvYnRuX2hvbWUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF9wYXVzZScsICgpID0+IHtcbiAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TGF5b3V0KCdsYXlvdXRfaG9tZScpO1xuICAgICAgICAgICAgX0cuY29yZVVJLmhpZGVCdXR0b25CYWNrKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfcGF1c2UvZGlhbG9nL2J0bl9yZXN1bWUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dEFuaW0oJ2xheW91dF9wYXVzZScsICgpID0+IHtcbiAgICAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblJlc3VtZSgpO1xuICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuXG4gICAgICAvLyB0dXQgY29udGludWVcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF90dXRvcmlhbC9kaWFsb2cvYnRuX2NvbnRpbnVlJywgKCkgPT4ge1xuICAgICAgICAgX0cudHV0b3JpYWwub25CdG5Db250aW51ZSgpO1xuICAgICAgfSk7XG5cblxuICAgICAgLy8gd2luID0+IGNsYWltXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfd2luL2RpYWxvZy9idG5fb2snLCAoKSA9PiB7XG4gICAgICAgICBpZiAoIV9HLnVzZXIuaXNWZXJzaW9uVjIpIHtcbiAgICAgICAgICAgIF9HLmludGVyQWQuY2hlY2tUb1Nob3dJbnRlckFkKCgpID0+IHtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5wbGF5V2luQ2xhaW1BbmltKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2UgX0cuY29yZUZYLnBsYXlXaW5DbGFpbUFuaW0oKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBidG4gaGludCAmIGhpbnQgZGlzYWJsZWRcbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL3BsYXlfYXJlYS9zY3JvbGx2aWV3X21hc3Rlci92aWV3L2NvbnRlbnQvZ3JpZF9hcmVhL3BsYXlpbmdfYnV0dG9uX2Jhci9idG5faGludCcsICgpID0+IF9HLmdhbWVNZWNoYW5pYy5vbkhpbnQoKSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oX0cuY29yZVVJLmJ0bkhpbnREaXNhYmxlZE5vZGUsICgpID0+IHtcbiAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblBhdXNlKCk7XG4gICAgICAgICBfRy5jb3JlVUkuc2hvd0xheW91dEFuaW0oJ2xheW91dF9hbGVydCcpO1xuICAgICAgfSk7XG5cblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKFxuICAgICAgICAgJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9wbGF5aW5nX2J1dHRvbl9iYXIvYnRuX3BhdXNlJyxcbiAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIF9HLmdhbWVNZWNoYW5pYy5vblBhdXNlKHRydWUpO1xuICAgICAgICAgfVxuICAgICAgKTtcblxuXG4gICAgICAvLyBnYW1lIHRhYiBzaXplIDN4MyA1eDVcbiAgICAgIGNvbnN0IGdNZWNoYW5pYyA9IF9HLmdhbWVNZWNoYW5pYztcbiAgICAgIF9HLmNvcmVVSS50YWJCdXR0b25Db250YWluZXIuY2hpbGRyZW4ubWFwKHRhYkJ0bk5vZGUgPT4ge1xuICAgICAgICAgX0cudXRpbHNVSS5tYWtlQnV0dG9uKHRhYkJ0bk5vZGUsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNpemVzID0gdGFiQnRuTm9kZS5uYW1lLnNwbGl0KCd4JykubWFwKHQgPT4gcGFyc2VJbnQodCkpO1xuICAgICAgICAgICAgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgc2l6ZXNbMF0sIHNpemVzWzFdKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGJ0biBwbGF5XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9idG5fcGxheScsICgpID0+IGdNZWNoYW5pYy5zdGFydEdhbWUoKSk7XG5cblxuICAgICAgLy8gYnRuX3BsYXlfdjJcbiAgICAgIGNvbnN0IHNob3dQcmV2aWV3M3gzID0gKCkgPT4ge1xuICAgICAgICAgZ01lY2hhbmljLnByZXZpZXdHYW1lKGdNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBnTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSwgMywgMyk7XG4gICAgICB9XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdXR0b24oJ0NhbnZhcy9wbGF5X2FyZWEvc2Nyb2xsdmlld19tYXN0ZXIvdmlldy9jb250ZW50L2dyaWRfYXJlYS9ncmlkX3N0YWNrL2dyaWRfY292ZXInLCAoKSA9PiB7XG4gICAgICAgICBpZiAoX0cuY29yZVVJLmN1cnJlbnRTdGF0ZSA9PT0gX0cudHlwZXMuZ2FtZVN0YXRlLnYyKSB7XG4gICAgICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG4gICAgICAgICAgICBzaG93UHJldmlldzN4MygpO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSBnTWVjaGFuaWMuc3RhcnRHYW1lKCk7XG4gICAgICB9KTtcblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvYnRuX3BsYXlfdjInLCAoKSA9PiB7XG4gICAgICAgICBfRy5jb3JlVUkuc2V0VUlQbGF5U3RhdGUoX0cudHlwZXMuZ2FtZVN0YXRlLnBpY2tfbW9kZSk7XG4gICAgICAgICBzaG93UHJldmlldzN4MygpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vICBVSSBiYWNrXG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oY2MuZmluZCgnYnRuX2JhY2snLCBfRy5jb3JlVUkuaGVhZGVyQ29udGFpbmVyKSwgKCkgPT4gX0cuY29yZVVJLmJhY2soKSk7XG5cbiAgICAgIC8vICBjbG9zZSBsZXZlbCB1cFxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2xldmVsX3VwL2RpYWxvZy9idG5fb2snLCAoKSA9PiB7XG4gICAgICAgICBpZiAoX0cuY29yZUZYLmlzUGxheWluZ0Z4U3RhcnNBZGQpIHJldHVybjtcbiAgICAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKFxuICAgICAgICAgICAgY2MuZmluZCgnQ2FudmFzL2xheW91dF9sZXZlbF91cC9kaWFsb2cvc3Rhcl9udW1fYmFzZS9zdGFyMl9iaWcgMScpLFxuICAgICAgICAgICAgX0cuY29uZmlnR2FtZS5sZXZlbFVwQ29pblJld2FyZFxuICAgICAgICAgKTtcblxuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXRBbmltKCdsYXlvdXRfbGV2ZWxfdXAnLCAoKSA9PiB7XG4gICAgICAgICAgICBnTWVjaGFuaWMucGxheU5leHRSYW5kb21QdXp6bGUoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfYWxlcnQvZGlhbG9nL2J0bl9jbG9zZScsICgpID0+IHtcbiAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X2FsZXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgZ01lY2hhbmljLm9uUmVzdW1lKCk7XG4gICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBzZXR0aW5nc1xuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKGNjLmZpbmQoJ2J0bl9zZXR0aW5ncycsIF9HLmNvcmVVSS5oZWFkZXJDb250YWluZXIpLCAoKSA9PiB7XG4gICAgICAgICBfRy5nYW1lTWVjaGFuaWMub25QYXVzZSgpO1xuICAgICAgICAgX0cuY29yZVVJLnNob3dMYXlvdXQoJ2xheW91dF9zZXR0aW5ncycpO1xuICAgICAgfSk7XG4gICAgICBfRy51dGlsc1VJLm1ha2VCdWJibGVCdXR0b24oJ0NhbnZhcy9sYXlvdXRfc2V0dGluZ3MvZGlhbG9nL2J0bl9iYWNrJywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLmhpZGVMYXlvdXQoJ2xheW91dF9zZXR0aW5ncycpO1xuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZ01lY2hhbmljLmlzUGxheWluZygpXG4gICAgICAgICAgICAmJiAhY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydCcpLmFjdGl2ZVxuICAgICAgICAgKSBfRy5nYW1lTWVjaGFuaWMub25SZXN1bWUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAvLyBzb2NpYWxcblxuICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tIGludml0ZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvcGxheWluZ19idXR0b25fYmFyL2J0bl9pbnZpdGUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5nYW1lTWVjaGFuaWMub25QYXVzZSgpO1xuICAgICAgICAgX0cuc29jaWFsLmludml0ZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZ01lY2hhbmljLmlzUGxheWluZygpKSBfRy5nYW1lTWVjaGFuaWMub25SZXN1bWUoKTtcbiAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl9pbnZpdGUnLCAoKSA9PiB7XG4gICAgICAgICBfRy5zb2NpYWwuaW52aXRlKCk7XG4gICAgICB9KTtcblxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvbGF5b3V0X2dhbWVfb3Zlci9kaWFsb2cvYnRuX2ludml0ZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5pbnZpdGUoKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLSBzaGFyZVxuICAgICAgX0cudXRpbHNVSS5tYWtlQnViYmxlQnV0dG9uKCdDYW52YXMvcGxheV9hcmVhL3Njcm9sbHZpZXdfbWFzdGVyL3ZpZXcvY29udGVudC9ncmlkX2FyZWEvYnRuX3NoYXJlJywgKCkgPT4ge1xuICAgICAgICAgX0cuc29jaWFsLnNoYXJlKHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl9zaGFyZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5zaGFyZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9nYW1lX292ZXIvZGlhbG9nL2J0bl9zaGFyZScsICgpID0+IHtcbiAgICAgICAgIF9HLnNvY2lhbC5zaGFyZSgpO1xuICAgICAgfSk7XG5cblxuICAgICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgLy8gdmlkZW8gYWRzXG5cbiAgICAgIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF9hbGVydC9kaWFsb2cvYnRuX3ZpZGVvJywgKCkgPT4ge1xuICAgICAgICAgX0cuY29yZVVJLnNob3dOYWdTY3JlZW4oKTtcbiAgICAgICAgIF9HLnZpZGVvLnNob3dWaWRlbyhcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgIGNvbnN0IHN0YXJOdW0gPSBfRy5jb25maWdHYW1lLnZpZGVvQ29pblJld2FyZDtcbiAgICAgICAgICAgICAgIGNvbnN0IGJhc2VOb2RlID0gY2MuZmluZCgnQ2FudmFzL2xheW91dF9hbGVydC9kaWFsb2cvYnRuX3ZpZGVvJyk7XG4gICAgICAgICAgICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJOdW0sIHRydWUpO1xuICAgICAgICAgICAgICAgX0cuY29yZVVJLnVwZGF0ZUJ0bkhpbnQoKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5meEFkZENvaW5zKGJhc2VOb2RlLCBzdGFyTnVtKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKDIpO1xuICAgICAgICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X2FsZXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGdNZWNoYW5pYy5pc1BsYXlpbmcoKSkgX0cuZ2FtZU1lY2hhbmljLm9uUmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgX0cuY29yZVVJLmhpZGVOYWdTY3JlZW4oKTtcbiAgICAgICAgICAgICAgIF9HLmNvcmVGWC5zaG93VmlkZW9FcnJvcigyNzApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgKTtcbiAgICAgIH0pO1xuXG5cbiAgICAgIC8vIF9HLnV0aWxzVUkubWFrZUJ1YmJsZUJ1dHRvbignQ2FudmFzL2xheW91dF93aW4vZGlhbG9nL2J0bl92aWRlbycsICgpID0+IHtcbiAgICAgIC8vICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKCk7XG4gICAgICAvLyAgICBfRy52aWRlby5zaG93VmlkZW8oXG4gICAgICAvLyAgICAgICAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICBjb25zdCBzdGFyTnVtID0gX0cuY29uZmlnR2FtZS53aW5TdGFyW19HLmdhbWVNZWNoYW5pYy5jdXJyZW50U2l6ZU1vZGVdO1xuICAgICAgLy8gICAgICAgICAgY29uc3QgYmFzZU5vZGUgPSBjYy5maW5kKCdDYW52YXMvbGF5b3V0X3dpbi9kaWFsb2cvYnRuX3ZpZGVvJyk7XG4gICAgICAvLyAgICAgICAgICBfRy51c2VyLmFkZFN0YXJzKHN0YXJOdW0sIHRydWUpOyAvLyBvbmx5IGFkZCBzdGFyTnVtIGluc3RlYWQgb2YgMiAqIHN0YXJOdW0gY2F1c2UgYWxyZWFkeSBzaWxlbnRseSBhZGRlZCBzdGFyTnVtIHdoZW4gd2luXG4gICAgICAvLyAgICAgICAgICBfRy5jb3JlVUkudXBkYXRlQnRuSGludCgpO1xuICAgICAgLy8gICAgICAgICAgX0cuY29yZUZYLmZ4QWRkQ29pbnMoYmFzZU5vZGUsIDIgKiBzdGFyTnVtKTtcbiAgICAgIC8vICAgICAgICAgIF9HLmNvcmVVSS5zaG93TmFnU2NyZWVuKDIpO1xuICAgICAgLy8gICAgICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vICAgICAgICAgICAgIF9HLmNvcmVVSS5oaWRlTGF5b3V0QW5pbSgnbGF5b3V0X3dpbicsICgpID0+IF9HLmdhbWVNZWNoYW5pYy5jaGVja1RvU2hvd0xldmVsVXAoKSk7XG4gICAgICAvLyAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgIC8vICAgICAgIH0sXG4gICAgICAvLyAgICAgICAoKSA9PiB7XG4gICAgICAvLyAgICAgICAgICBfRy5jb3JlVUkuaGlkZU5hZ1NjcmVlbigpO1xuICAgICAgLy8gICAgICAgICAgX0cuY29yZUZYLnNob3dWaWRlb0Vycm9yKDQxMCk7XG4gICAgICAvLyAgICAgICB9XG4gICAgICAvLyAgICApO1xuICAgICAgLy8gfSk7XG5cblxuICAgfSxcblxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/core-game/game_flow.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '133e2EyA7BEH6xD94DPj2u1', 'game_flow');
// script/core-game/game_flow.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameFlow = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.gameFlow = {
    init: function () {
        _G.user.addInitCallback(function (data) {
            var puzzle_id = _G.user.entryPointData.puzzle_id;
            // const puzzle_id = 'NATURE_frame01';
            if (puzzle_id) {
                var _a = puzzle_id.split('_'), categoryName = _a[0], frameName = _a[1];
                _.log(" gameFlow >> init >> puzzle_id >> categoryName = " + categoryName + " // frameName=" + frameName + " ");
                _G.gameMechanic.previewGame(categoryName, frameName, 1, 1, true); // render special puzzle
                _G.resources.loadSingleFrame(categoryName, frameName);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvY29yZS1nYW1lL2dhbWVfZmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDcEMsSUFBQSxDQUFDLEdBQVEsRUFBRSxFQUFWLEVBQUUsQ0FBQyxHQUFLLEVBQUUsRUFBUCxDQUFRO0FBRVAsUUFBQSxRQUFRLEdBQUc7SUFFckIsSUFBSTtRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQUMsSUFBSTtZQUMxQixJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7WUFDbkQsc0NBQXNDO1lBQ3RDLElBQUksU0FBUyxFQUFFO2dCQUNOLElBQUEsS0FBNEIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBL0MsWUFBWSxRQUFBLEVBQUUsU0FBUyxRQUF3QixDQUFDO2dCQUN2RCxDQUFDLENBQUMsR0FBRyxDQUFDLHNEQUFvRCxZQUFZLHNCQUFpQixTQUFTLE1BQUcsQ0FBQyxDQUFDO2dCQUNyRyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyx3QkFBd0I7Z0JBQzFGLEVBQUUsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUN4RDtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztDQUdILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgeyBfLCAkIH0gPSBfRztcblxuZXhwb3J0IGNvbnN0IGdhbWVGbG93ID0ge1xuXG4gICBpbml0KCkge1xuICAgICAgX0cudXNlci5hZGRJbml0Q2FsbGJhY2soKGRhdGEpID0+IHtcbiAgICAgICAgIGNvbnN0IHB1enpsZV9pZCA9IF9HLnVzZXIuZW50cnlQb2ludERhdGEucHV6emxlX2lkO1xuICAgICAgICAgLy8gY29uc3QgcHV6emxlX2lkID0gJ05BVFVSRV9mcmFtZTAxJztcbiAgICAgICAgIGlmIChwdXp6bGVfaWQpIHtcbiAgICAgICAgICAgIGNvbnN0IFtjYXRlZ29yeU5hbWUsIGZyYW1lTmFtZV0gPSBwdXp6bGVfaWQuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgIF8ubG9nKGAgZ2FtZUZsb3cgPj4gaW5pdCA+PiBwdXp6bGVfaWQgPj4gY2F0ZWdvcnlOYW1lID0gJHtjYXRlZ29yeU5hbWV9IC8vIGZyYW1lTmFtZT0ke2ZyYW1lTmFtZX0gYCk7XG4gICAgICAgICAgICBfRy5nYW1lTWVjaGFuaWMucHJldmlld0dhbWUoY2F0ZWdvcnlOYW1lLCBmcmFtZU5hbWUsIDEsIDEsIHRydWUpOyAvLyByZW5kZXIgc3BlY2lhbCBwdXp6bGVcbiAgICAgICAgICAgIF9HLnJlc291cmNlcy5sb2FkU2luZ2xlRnJhbWUoY2F0ZWdvcnlOYW1lLCBmcmFtZU5hbWUpO1xuICAgICAgICAgfVxuICAgICAgfSk7XG4gICB9LFxuXG5cbn0iXX0=
//------QC-SOURCE-SPLIT------
