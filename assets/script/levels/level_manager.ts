import * as _G from '../system/all_modules';
const { _, $ } = _G;

import { systemData } from '../system_data/system_data';

export const levelManager = {
   categoryNameArr: [],

   init() {
      this.categoryArr.map(catInfo => this.categoryNameArr.push(catInfo.id));
   },

   getAvatarInfo(categoryName, frameName) {
      const categoryInfo = this.categoryArr.find(catInfo => catInfo.id == categoryName);
      if (!categoryInfo) return;
      const avatarInfo = categoryInfo.frameArr.find(frameInfo => frameInfo.name == frameName);
      return avatarInfo;
   },


   categoryArr: systemData.categoryArr,

}
