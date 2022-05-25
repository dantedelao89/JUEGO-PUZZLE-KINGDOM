import * as _G from '../system/all_modules';
const _ = _G._;

export const utilsFB = {
   init() {
      if (window['FBInstant']) {
         FBInstant.onPause(() => { }); // chi can goi ham de FB tick la` API da su dung
         window.fbSupportedAPIs = FBInstant.getSupportedAPIs();
         // console.table(FBInstant.getSupportedAPIs());
      }
   },

   isSupportedAPI(name) {
      if (!window['FBInstant']) return false;
      const arr = FBInstant.getSupportedAPIs();
      return arr.indexOf(name) != -1;
   },


}