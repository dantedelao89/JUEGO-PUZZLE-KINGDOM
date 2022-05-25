import * as _G from '../system/all_modules';
const _ = _G._;

import Share from "../social/share";
import Message from '../social/message';

export const social = {
   init() {
      // _G.login.addLoginDataField('subscribeInfo');
      // _G.login.addLoginDataField('shortcutInfo');
      // _G.login.addCallback(data => {
      //    this.subscribeInfo = data.hasOwnProperty('subscribeInfo') ? data.subscribeInfo : 5;
      //    this.shortcutInfo = data.hasOwnProperty('shortcutInfo') ? data.shortcutInfo : 5;
      // })
   },

   share(isFromV2Screen = false, shareCode = '') {
      cc.find('Canvas/shares').getComponent(Share).sharePostNormal(isFromV2Screen, shareCode);
      _G.analytic.logShare(_G.gameMechanic.currentCategoryName, _G.gameMechanic.currentFrameName);
   },

   sendMessage() {
      cc.find("Canvas/messages").getComponent(Message).sendMessageScore();
   },

   sendMessageHome() {
      cc.find('Canvas/message_home').getComponent(Message).sendMessageStillImage();
   },


   inviteHome(callback?) {
      if (!window['FBInstant']) {
         this.sendMessageHome();
         return callback && callback();
      }

      try {
         FBInstant.context.chooseAsync().then(() => {
            this.sendMessageHome();
            if (callback) callback(FBInstant.context.getID());
         }).catch(err => {
            _.log(err);
            if (callback) callback()
         });
      } catch (errX) {
         _.log(errX);
         if (callback) callback()
      }
   },


   invite(callback?: Function) {
      if (!window['FBInstant']) {
         this.sendMessage();
         return callback && callback();
      }

      try {
         FBInstant.context.chooseAsync().then(() => {
            this.sendMessage();
            if (callback) callback(FBInstant.context.getID());
         }).catch(err => {
            _.log(err);
            if (callback) callback()
         });
      } catch (errX) {
         _.log(errX);
         if (callback) callback()
      }
   },


   // askBotSubscribe(callback) {
   //    // _.log(`this.subscribeInfo=${this.subscribeInfo}`);
   //    const finalCallback = () => callback && callback();
   //    if (!window['FBInstant']) return finalCallback();
   //    if (!_G.utilsFB.isSupportedAPI("player.canSubscribeBotAsync") || !_G.utilsFB.isSupportedAPI("player.subscribeBotAsync")) return finalCallback() || _.log(' askBotSubscribe :: isSupportedAPI > not supported');
   //    if (this.subscribeInfo == 'accepted' || this.subscribeInfo <= 0) return finalCallback();
   //    this.subscribeInfo--;
   //    _G.data.saveData({ subscribeInfo: this.subscribeInfo });

   //    FBInstant.player.canSubscribeBotAsync().then(can_subscribe => {
   //       if (!can_subscribe) return finalCallback() || _.log(` askBotSubscribe :: can_subscribe = ${can_subscribe} `);
   //       FBInstant.player.subscribeBotAsync().then(() => {
   //          this.subscribeInfo = 'accepted';
   //          _G.data.saveData({ subscribeInfo: this.subscribeInfo });
   //          //_G.analytic.onSubscribeDone(true);
   //          finalCallback();

   //       }).catch(e => {
   //          //_G.analytic.onSubscribeDone(false);
   //          finalCallback();
   //       });
   //    }).catch(e => finalCallback() || _.log(` askBotSubscribe :: canSubscribeBotAsync().then(fail) => `, e));
   // },


   // askShortcut(callback) {
   //    // _.log(`this.shortcutInfo=${this.shortcutInfo}`);
   //    const finalCallback = () => callback && callback();
   //    if (!window['FBInstant']) return finalCallback();
   //    if (!_G.utilsFB.isSupportedAPI("canCreateShortcutAsync") || !_G.utilsFB.isSupportedAPI("createShortcutAsync")) return finalCallback();
   //    if (this.shortcutInfo == 'accepted' || this.shortcutInfo <= 0) return finalCallback();
   //    this.shortcutInfo--;
   //    _G.data.saveData({ shortcutInfo: this.shortcutInfo });

   //    FBInstant.canCreateShortcutAsync().then(canCreateShortcut => {
   //       if (!canCreateShortcut) return finalCallback();
   //       FBInstant.createShortcutAsync().then(() => {
   //          this.shortcutInfo = 'accepted';
   //          _G.data.saveData({ shortcutInfo: this.shortcutInfo });
   //          finalCallback();

   //       }).catch((e) => finalCallback() || _.log(' createShortcutAsync :: ', e));
   //    }).catch((e) => finalCallback() || _.log(' canCreateShortcutAsync :: ', e));
   // },


   // postSessionScore() {
   //    if (!window['FBInstant']) return;
   //    if (_G.user.score) FBInstant.postSessionScore(_G.user.score);
   //    _.log(` postSessionScore called score = ${_G.user.score}`);
   //    if (_G.user.score > (_G.game.bestSessionScore || 0)) _G.game.bestSessionScore = _G.user.score;
   // },


   // createContext(playerId, callbackSuccess, callbackFail) {
   //    // _.log(` about to create context with player ${playerId}`);
   //    if (!window['FBInstant']) return (callbackSuccess) && callbackSuccess();

   //    const logContextResult = (result, error) => {
   //       if (result) _.log('createContext Success ====> ', result);
   //       if (error) _.log('createContext Fail  ====> ', error);
   //    }
   //    FBInstant.context.createAsync(playerId).then(
   //       () => {
   //          if (callbackSuccess) { callbackSuccess(); }
   //          logContextResult('success');
   //       },
   //       (e) => {
   //          if (callbackFail) { callbackFail(e); }
   //          logContextResult('fail', e);
   //       }
   //    );
   // },

};