
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