import * as _G from '../system/all_modules';
const _ = _G._;

export const video = {
   isAvailable: false,
   loadingVideo: false,
   rewardedVideo: null,

   init() {
      if (!window['FBInstant']) this.isAvailable = true;
      this.isAvailable = _G.utilsFB.isSupportedAPI("getRewardedVideoAsync");
      _.log(`VIDEO.isAvailable = ${this.isAvailable} `);

      this.preloadVideo();
   },


   preloadVideo() {
      _.log(`preloadVideo called........  this.loadingVideo=${this.loadingVideo}`);

      const failFunc = (code) => _.log(`preloadVideo 000 code = ${code}`);
      if (!window['FBInstant']) return failFunc('OFFLINE');
      if (!_G.utilsFB.isSupportedAPI("getRewardedVideoAsync")) return failFunc('NOT_SUPPORTED');
      if (this.loadingVideo) return failFunc('LOADING');
      _.log(`preloadVideo 1111 `);

      const failFunc1 = (err) => {
         _.log(`preloadVideo >> failFunc1 called err = `, err);
         this.rewardedVideo = null;
         this.loadingVideo = false;
         _.setTimeout((err) => {
            if (!err || err.code == 'OFFLINE' || err.code == 'LOADING' || err.code == 'NOT_SUPPORTED' || err.code == 'RATE_LIMITED') return;
            _.setTimeout(() => this.preloadVideo(), 5000);
         });
      }

      this.loadingVideo = true;
      FBInstant.getRewardedVideoAsync(_G.configGame.videoRewardId).then(
         rewardedVideo => {
            rewardedVideo.loadAsync().then(
               () => {
                  _.log("preloadVideo >> SUCCESS");
                  this.rewardedVideo = rewardedVideo;
                  this.loadingVideo = false;
               },
               failFunc1
            ).catch(failFunc1);
         },
         failFunc1
      ).catch(failFunc1);
   },


   showVideo(orgSuccessCallBack, orgFailCallBack?) {
      _.log(`VIDEO.showVideo() this.loadingVideo=${this.loadingVideo} // videoObject = `, this.rewardedVideo);
      const successCallBack = () => orgSuccessCallBack && orgSuccessCallBack();
      const failCallBack = (err?) => orgFailCallBack && orgFailCallBack(err);
      if (!window['FBInstant']) return _.random() > 0.75 ? failCallBack() : successCallBack();

      if (this.rewardedVideo) {
         _.log(`ev_video_click_show`);
         this.rewardedVideo.showAsync().then(() => {
            _.log(`VIDEO.showVideo success`);
            _.log("ev_watch_video_success", 1, {});
            successCallBack();
            this.preloadVideo();
         }).catch(err => {
            console.warn(`VIDEO.showVideo error `, err);
            if (this.isErrRewardNotCompleted(err)) {
               _.log(`ev_video_err_reward_not_completed`);
            } else {
               _.log(`ev_video_err_other`);
            }
            this.preloadVideo();
            failCallBack(err);
         });
      } else if (this.loadingVideo) {
         // _.setTimeout(() => this.showVideo(successCallBack, failCallBack, videoPos), 200);
         failCallBack({ code: "LOADING" });
      } else {
         failCallBack({ code: "VIDEO_IS_NULL" });
      }
   },


   isErrRewardNotCompleted(err) {
      return err.code == 'USER_INPUT' && err.message == 'Reward not completed';
   },

}