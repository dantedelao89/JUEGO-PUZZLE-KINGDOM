"use strict";
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