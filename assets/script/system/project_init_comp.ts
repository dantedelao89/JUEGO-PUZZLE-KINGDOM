import * as _G from '../system/all_modules';
const { _, $ } = _G;

const { ccclass, property } = cc._decorator;
@ccclass
export default class ProjectInitComp extends cc.Component {
   // *** Needa put these lines in start() to make 'em execute first before all other component onLoads
   start() {
      window['_G'] = _G;
   }

   // ---- Initialize logic for entire project
   onLoad() {

      // remove loading bg: htmlLoadingBackground (html div tag)
      // only start after 0.5 secs and (maximum 5 secs passed /or/ avatar loaded)
      const startFunc = () => {
         const loadingBg = document.getElementById('htmlLoadingBackground');
         if (loadingBg) loadingBg.style.display = 'none';
         _G.analytic.logPageView();
      }
      _.waitToRun(startFunc, 'isRealAvatarLoaded', _G.mapVisual, 0.1, 5, startFunc);

      // app event on show/hide
      cc.game.on(cc.game.EVENT_SHOW, () => _G.appEvents.onAppShow());
      cc.game.on(cc.game.EVENT_HIDE, () => _G.appEvents.onAppHide());

      // init sub modules
      for (let moduleName in _G) if (_G[moduleName].init) _G[moduleName].init();

      // add onshow & hide => pause & unpause
      _G.appEvents.addAppHideCallback(() => _G.gameMechanic.onPause(true));
   }
}

