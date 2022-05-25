"use strict";
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