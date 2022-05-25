
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