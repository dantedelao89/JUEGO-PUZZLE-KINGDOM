import * as _G from '../system/all_modules';
const { _, $ } = _G;

const entryNameArr = ['sound', 'music'];
const defaultEntryValue = { music: true, sound: true, language: 'en_US' };

export const settings = {
   node: null as cc.Node,
   entryContainerNode: null as cc.Node,

   sound: true,
   music: true,
   language: true,

   isInitialized: false,

   init() {
      this.node = cc.find('Canvas/layout_settings');
      this.entryContainerNode = cc.find('dialog', this.node);

      // get data & render switcher value accordingly
      _G.user.addLoginDataFields(...entryNameArr);
      _G.user.addInitCallback(data => {
         entryNameArr.map(entryName => {
            const isValueUndefined = (data[entryName] === undefined || data[entryName] === null);
            const value = this[entryName] = isValueUndefined ? defaultEntryValue[entryName] : data[entryName];
            this.setSwitcherOnOff(entryName, value);
         });
         this.isInitialized = true;
      });
      this.bindSwitcherButtonHandlers();


      this.renderLanguages();
      _G.localize.addInitCallback(() => {
         this.focusLanguage(_G.localize.currentLanguageCode);
      })
   },

   bindSwitcherButtonHandlers() {
      [
         cc.find('switcher_sound', this.entryContainerNode),
         cc.find('switcher_music', this.entryContainerNode),
      ].map(switcherNode => {
         _G.utilsUI.makeButton(switcherNode, () => {
            const entryName = switcherNode.name.replace('switcher_', '');
            this.setEntryValue(entryName, !this[entryName]);
         });
      });
   },


   setEntryValue(entryName, value) {
      // update value & save value to DB
      this[entryName] = value;
      _G.utilsData.save({ [entryName]: value });
      this.setSwitcherOnOff(entryName, value); // update switcher in layout settings

      if (entryName == 'music') {
         if (value) _G.audio.playBgMusic();
         else _G.audio.stopBgMusic();
      }
   },


   setSwitcherOnOff(entryName, value) {
      const switcherNode = cc.find(`switcher_${entryName}`, this.entryContainerNode);
      if (!switcherNode) return;
      _G.utilsUI.showOnlyChildNodeWithNameAs(switcherNode, (value ? 'on' : 'off'));
   },




   // ================================================
   // Languages
   // ================================================

   renderLanguages() {
      const sampleNode = cc.find('Canvas/sample_nodes/language_button');
      const containerNode = cc.find('Canvas/layout_settings/dialog/language_scrollview/view/content');
      containerNode.removeAllChildren();

      _G.localize.supportedLanguageArr.map(langInfo => {
         const newNode = _.copyNode(sampleNode, containerNode);
         newNode.langCode = langInfo.code;
         _G.utilsUI.fillChildLabelByPath(newNode, 'label_on', langInfo.name.toUpperCase());
         _G.utilsUI.fillChildLabelByPath(newNode, 'label_off', langInfo.name.toUpperCase());
         _G.utilsUI.makeBubbleButton(newNode, () => {
            this.focusLanguage(langInfo.code);
            _G.localize.onLanguageChanges(langInfo.code);
         })
      });

      _.setTimeout(() => this.adjustLanguageScrollView(), 100);
   },


   focusLanguage(langCode) {
      const containerNode = cc.find('Canvas/layout_settings/dialog/language_scrollview/view/content');
      containerNode.children.map(node => {
         const isOn = (node.langCode == langCode);
         ['label_on', 'bg_on'].map(childName => cc.find(childName, node).active = isOn);
      })
   },


   adjustLanguageScrollView() {
      const scrollViewNode = cc.find('Canvas/layout_settings/dialog/language_scrollview');
      scrollViewNode.height = cc.winSize.height - 428;
   },

}