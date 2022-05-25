import * as _G from '../../system/all_modules';
const _ = _G._;
declare const require;

import { supportLocalizeMessage } from './localize_message';


const toCorrectLangCode = {
   en_GB: 'en_US',
   en_UD: 'en_US',
   pt_BR: 'pt_PT',
   fr_CA: 'fr_FR',
   es_LA: 'es_ES',
   es_MX: 'es_ES', // espanol mexico
}

const subscribedNodePath = {};


export const localize = {
   supportedLanguageArr: [
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
   ],

   currentLanguageCode: 'en_US',
   defaultLanguageObject: require('en_US'),
   currentLanguageObject: null,

   languageChangeCallbackArr: [],
   initCallbackArr: [],
   isInitialized: false,


   init() {
      this.currentLanguageObject = this.defaultLanguageObject;
      _G.user.addLoginDataFields('userLanguageCode');
      _G.user.addInitCallback((data) => {
         // _.log(` _G.localize >> init >> data(userLanguageCode) = ${data.userLanguageCode} `, data);
         this.isInitialized = true;
         const fbLangCode = (window['FBInstant']) ? FBInstant.getLocale() : null; //  get language from user locale => translate ASAP
         this.onLanguageChanges(data.userLanguageCode || fbLangCode, true);
      });

      // this.listAllLabels();
   },


   listAllLabels() {
      _.log(` listAllLabels = `);
      cc.find('Canvas').getComponentsInChildren(cc.Label).map(comp => {
         _.log(_.getNodePath(comp.node));
      });
   },


   // ======= handle language changes & register callback when language changes
   onLanguageChanges(langCode: string, isInit = false) {
      langCode = toCorrectLangCode[langCode] || langCode;
      _.log(` _G.localize >> onLanguageChanged langCode=${langCode} `);
      if (!isInit && (!langCode || this.currentLanguageCode == langCode)) return;
      try {
         langCode = langCode || this.currentLanguageCode;
         this.currentLanguageObject = require(langCode);
         this.currentLanguageCode = langCode;
         _G.utilsData.save({ userLanguageCode: this.currentLanguageCode });
      } catch (e) { }

      if (isInit) this.initCallbackArr.map(func => func()); // execute init callback
      else this.languageChangeCallbackArr.map(func => func(langCode)); // execute lang-change callback
   },


   // === will subscribe to initCallbacks, languageChangesCallback & immediately call to translateContainer()
   subscribeTranslate(containerNode) {
      const path = _.getNodePath(containerNode);
      const translateFunc = () => this.translateContainer(containerNode);
      if (!subscribedNodePath[path]) {
         this.initCallbackArr.push(translateFunc);
         this.languageChangeCallbackArr.push(translateFunc);
      }
      if (this.isInitialized) translateFunc();
   },

   addInitCallback(f) {
      if (this.isInitialized) return f();
      this.initCallbackArr.push(f);
   },

   // ======= translate when language changes or when new node created

   // translate entire container with multiple label nodes inside
   translateContainer(containerNode: cc.Node) {
      // _.log(`_G.localize >> translateContainer >> containerNode=${containerNode ? containerNode.name : ''} // this.currentLanguageObject = `, this.currentLanguageObject);
      if (!containerNode) return;
      containerNode.getComponentsInChildren(cc.Label).map(labelComp => this.translateSingleLabel(labelComp.node));
      containerNode.getComponentsInChildren(cc.RichText).map(labelComp => this.translateSingleLabel(labelComp.node));
   },

   translateSingleLabel(labelNode: cc.Node, localizeData?) {
      const translateGuide = this.currentLanguageObject[labelNode.name] || this.defaultLanguageObject[labelNode.name];
      // _.log(` _G.localize >> translateSingleLabel >> labelNode.name=${labelNode.name} // translateGuide=${translateGuide} // labelNode.localizeData = ${labelNode.localizeData}`);
      if (!translateGuide) return;
      labelNode.localizeData = localizeData !== undefined ? localizeData : labelNode.localizeData;
      let text2Fill = translateGuide;
      if (typeof translateGuide == 'function') text2Fill = translateGuide(labelNode.localizeData);
      _G.utilsUI.fillLabel(labelNode, text2Fill);
   },


   // translate non-labelNode texts (ex: update-async-message content & cta);
   translate(textCode, localizeData?) {
      const translateGuide = this.currentLanguageObject[textCode] || this.defaultLanguageObject[textCode];
      if (!translateGuide) return textCode;
      let textResult = translateGuide;
      if (typeof translateGuide == 'function') textResult = translateGuide(localizeData);
      return textResult;
   },


   // get multilang objects for message content & cta
   ...supportLocalizeMessage,

};




