import * as _G from './all_modules';
const { _, $ } = _G;


const callbackArr = [];
const dataFieldArr = [
   'IsOldUser',
   'exp',
   'stars',
   'playedGames',
];


export const user = {
   loginData: null,
   entryPointData: {},
   exp: 0,
   stars: 0,
   level: 0,
   playedGames: null,
   isPuzzleSpecified: false,
   isVersionV2: false,

   init() {
      this.entryPointData = _G.utilsData.getEntryPointData();

      // TESTTTTTTTTTTTTTTTTTTTTT 
      // this.entryPointData.puzzle_id = 'POSTER_frame02';
      // this.entryPointData.version = 'v2'; // 'v2' or 'normal'
      // TESTTTTTTTTTTTTTTTTTTTTT 


      // validate the puzzle_id to prevent outdated puzzle_id to cause error
      const puzzleId = this.entryPointData.puzzle_id;
      if (puzzleId) {
         const [catName, frameName] = puzzleId.split('_');
         const isCatNameValid = _G.levelManager.categoryNameArr.includes(catName);
         if (!isCatNameValid) this.entryPointData.puzzle_id = null;
         else {
            const isFrameNameValid = _G.levelManager.getAvatarInfo(catName, frameName);
            if (!isFrameNameValid) this.entryPointData.puzzle_id = null;
         }
      }


      if (this.entryPointData.isFromNewsFeed) _G.analytic.logPageViewFromFeed(this.entryPointData.puzzle_id);

      this.isPuzzleSpecified = this.entryPointData.puzzle_id;
      this.isVersionV2 = this.isPuzzleSpecified && (this.entryPointData.version == 'v2');

      // this.isPuzzleSpecified = null;
      setTimeout(() => this.getFBData()); //delay 1 thread for other modules to register dataField

   },

   getFBData() {
      _G.utilsData.load(dataFieldArr, (data) => {
         this.loginData = data;
         data.isNewUser = !data.IsOldUser;
         _G.utilsData.save({ 'IsOldUser': true });

         // fill exp, stars, level
         this.stars = data.isNewUser ? _G.configGame.hintCoinPrice : (data.stars || 0);
         this.exp = data.exp || 0;
         this.level = this.expToLevel(this.exp);
         this.playedGames = data.playedGames || {};
         _G.coreUI.updateUserStats();

         // call all the loginCallback
         callbackArr.map(func => func(data));
      });
   },


   addLoginDataFields(...args: any[]) {
      args.map(fieldName => _.addUniqueElemToArr(dataFieldArr, fieldName))
   },


   addInitCallback(callbackFunc: Function) {
      if (!this.loginData) callbackArr.push(callbackFunc);
      else callbackFunc(this.loginData);
   },


   // Supportive
   addStars(starNum, isSkipUpdateUI = false) {
      this.stars = _.max(this.stars + starNum, 0);
      _G.utilsData.save({ stars: this.stars });
      _G.coreUI.updateUserStats(isSkipUpdateUI);
   },

   expToLevel(exp) {
      return 1 + _.floor(this.exp / _G.configGame.levelUpExp);
   },

   addExp(exp, isSkipUpdateUIStars = false) {
      const oldLevel = this.expToLevel(this.exp);
      this.exp += exp;
      const newLevel = this.level = this.expToLevel(this.exp);

      _G.utilsData.save({ exp: this.exp });
      _G.coreUI.updateUserStats(isSkipUpdateUIStars);
      return newLevel != oldLevel;
   },

}