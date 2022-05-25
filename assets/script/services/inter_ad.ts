import * as _G from '../system/all_modules';
const _ = _G._;

export const interAd = {
   interAdObj: null,
   isLoading: false,

   init() {
      this.preloadInterAds();
      this.lastTimeShowAd = _.getMsPassedUTC();
   },

   preloadInterAds() {
      if (!window['FBInstant']) return;
      if (this.isLoading) return;

      _.log(`interAd.preloadInterAds ...  `);
      this.interAdObj = null;
      this.isLoading = true;
      FBInstant.getInterstitialAdAsync(_G.configGame.interAdId).then(interAdObj => {
         // _log(` preloadInterAds 3333 `);
         interAdObj.loadAsync().then(() => {
            _.log(`interAd.preloadInterAds successfully `);
            this.interAdObj = interAdObj;
            this.isLoading = false;
         }).catch((e) => {
            console.warn(e);
            this.isLoading = false;
            // setTimeout(() => this.preloadInterAds(), 5000);
         });
      }).catch((e) => {
         console.warn(e);
         this.isLoading = false;
         // setTimeout(() => this.preloadInterAds(), 5000);
      });
   },


   // loadTimeout = max time to wait for inter ad to be loaded. unless ads will be skipped
   doShowInterAd(callBack?, maxLoadTimeWait = 1) {
      // _.log(` showInterAds 1111 `);
      if (!window['FBInstant']) return _G.coreUI.showLoadingAds(() => callBack && callBack(true));
      _.waitToRun(
         () => {
            // show a loading ads 1 secs before do show ad
            _G.coreUI.showLoadingAds(() => {
               // _.log(` showInterAds 2222 `);
               this.interAdObj.showAsync().then(() => {
                  _.log(`interAd.showInterAds success `);
                  if (callBack) callBack(true)
                  this.preloadInterAds(); // load another ads
               }).catch((e) => {
                  _.log(`interAd.showInterAds fail `);
                  console.warn(e);
                  callBack && callBack();
                  if (e.code != 'RATE_LIMITED') this.preloadInterAds();
               });

            });
         },
         'interAdObj',
         this,
         0.1,
         maxLoadTimeWait,
         () => {  // timeout callback
            _.log(`interAd.showInterAds fail `);
            console.warn(`interAd load wait timeout 5 secs`);
            this.preloadInterAds();
            if (callBack) callBack();
         }
      )
   },


   // ===================================
   adShowCount: 0,
   lastTimeShowAd: 0,
   frameClickCount: 0,
   checkToShowInterAd(callback?: Function) {
      const timeArr = _G.configGame.interAdTime[_G.user.isVersionV2 ? 'v2' : 'v1'];
      let timeToWait = timeArr[this.adShowCount] || timeArr[timeArr.length - 1];
      const timeNow = _.getMsPassedUTC();
      _.log(`checkToShowInterAd called ! adShowCount=${this.adShowCount} // timeToWait=${timeToWait} // timePassed = ${_.round(timeNow / 1000 - this.lastTimeShowAd / 1000)} secs // timeArr=${timeArr}`);
      if (timeNow - this.lastTimeShowAd < timeToWait * 1000) return callback && callback();
      this.frameClickCount++;
      if (this.frameClickCount < _G.configGame.interAdClickCount) return callback && callback();

      _.waitToRun(() => {
         this.doShowInterAd(isShowSuccess => {
            if (!isShowSuccess) return callback && callback();
            _.log(`interAd show callback called !`);
            this.adShowCount++;
            this.lastTimeShowAd = timeNow;
            this.frameClickCount = 0;
            return callback && callback()
         });
      }, '!isPlayingFxStarsAdd', _G.coreFX, 0.5);

   },

}