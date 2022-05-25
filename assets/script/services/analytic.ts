import * as _G from '../system/all_modules';
const { _, $ } = _G;

export const analytic = {

   init() {
   },

   log(eventName, value?) {
      // if (!window['firebaseLogEvent']) return;
      // window['firebaseLogEvent'](eventName, value);
   },

   logPageView() {
      // --- fb pixel
      if (window['fbq']) {
         window['fbq']('track', 'PageView');
      }

      // --- google analytic
      if (window['firebaseLogEvent']) {
         window['firebaseLogEvent']('PageView');
      }
   },

   logPageViewFromFeed(puzzleId) {
      if (!puzzleId) return;
      const [content_category, content_name] = puzzleId.split('_');

      // --- fb pixel
      if (window['fbq']) {
         // _.log(` logPixelShare (${content_category}, ${content_name}) `);
         window['fbq']('trackCustom', 'pageview_f', { content_category, content_name });
      }

      // --- google analytic
      if (window['firebaseLogEvent']) {
         window['firebaseLogEvent']('pageview_f', { content_category, content_name });
      }
   },


   logViewContent(content_category, content_name) {
      // --- fb pixel
      if (window['fbq']) {
         // _.log(` logPixelViewContent (${content_category}, ${content_name}) `);
         window['fbq']('track', 'ViewContent', { content_category, content_name });
      }

      // --- google analytic
      if (window['firebaseLogEvent']) {
         window['firebaseLogEvent']('ViewContent', { content_category, content_name });
      }
   },

   logShare(content_category, content_name) {
      // --- fb pixel
      if (window['fbq']) {
         // _.log(` logPixelShare (${content_category}, ${content_name}) `);
         window['fbq']('trackCustom', 'Share', { content_category, content_name });
      }

      // --- google analytic
      if (window['firebaseLogEvent']) {
         window['firebaseLogEvent']('Share', { content_category, content_name });
      }
   },

}