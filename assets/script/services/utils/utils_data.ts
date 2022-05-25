import * as _G from '../../system/all_modules';
const { _, $ } = _G;


export const utilsData = {
   save(dataObject: any, callback?: Function) {
      if (window['FBInstant']) {
         FBInstant.player.setDataAsync(dataObject).then(
            () => { if (callback) callback(); },
            (e) => console.warn(` utils_data >> save >> failed `, e)
         ).catch(
            (e) => console.warn(` utils_data >> save >> failed (catch) `, e)
         );
      }

      // Simulate facebook data at local using localStorage
      else {
         for (let key in dataObject) localStorage.setItem(key, JSON.stringify(dataObject[key]));
         setTimeout(() => { if (callback) callback(); }, 300);
      }
   },


   load(keyArr: string[], callback?: Function) {
      if (window['FBInstant']) {
         FBInstant.player.getDataAsync(keyArr).then(data => {
            if (callback) callback(data);
         });
      }

      // Simulate facebook data at local using localStorage
      else {
         const dataObj = {};
         keyArr.map(key => {
            if (localStorage.getItem(key) === null) return;
            try {
               dataObj[key] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
               console.warn(` utilsData.load() >> Error  data key = ${key} `, e)
            }
         });
         if (callback) setTimeout(() => callback(dataObj), 100);
      }
   },

   getEntryPointData() {
      return window['FBInstant'] ? (FBInstant.getEntryPointData() || {}) : {};
   }
}
};