import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'แชร์',
   common_label_reward: 'รางวัล',
   common_label_claim: 'รับ',
   common_label_button_play: 'เล่น',
   common_label_level_intro: 'เลเวล',

   label_loading_ad: 'กำลังโหลดโฆษณา. โปรดรอ',

   label_game_loading: 'กำลังโหลด',
   label_game_continue: 'ดำเนินต่อ',
   label_game_play_more_puzzle: 'ปริศนาเพิ่มเติม',
   label_gameplay_select_difficulty: 'เลือกความยาก',

   label_fx_video_error: 'วิดีโอล้มเหลว',

   label_settings_music: 'ดนตรี',
   label_settings_sound: 'เสียง',

   label_tut_step_1: `คลิกที่สองชิ้นเพื่อย้า\nยและวางอย่างถูกต้อง`,
   label_tut_step_2: () => `คลิกที่นี่และจ่าย ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/>\nเพื่อแก้ปัญหาสองสามชิ้น`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `การจำกัดเวลาสำ\nหรับแต่ละปริศนาจะขึ้นอ\nยู่กับจำนวนชิ้น\n\nอย่าปล่อยให้มันหมด!`,
   label_tut_btn_continue: 'ดำเนินต่อ',

   label_alert_intro: `ดูวิดีโอเพื่อรับ\n${_G.configGame.videoCoinReward} เหรียญ`,
   label_alert_back: 'ไม่',
   label_alert_earn_stars: 'ใช่',

   label_level_up_header: 'เลเวลอัพ!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'คุณต้องก\nารเริ่มเกม\nต่อหรือไม่?',
   label_pause_header: 'หยุดชั่วคราว',

   label_gameover_header: 'จบเกม',
   label_gameover_score_intro: 'คุะแนน:',
   label_gameover_btn_try_again: 'เล่นอีกครั้ง',
   label_gameover_no_thanks: 'ไม่ ขอบคุณ',

   label_home_button_play_w_friends: 'เล่นกับ\nเพื่อน',

   label_share_intro_1: 'คุณเอาชนะฉันได้ไหม?',
   label_share_intro_2: 'คุะแนน',

   label_win_well_done: 'ทำได้ดีมาก!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} ขอเชิญทุกท่านที่จะแก้ปริศนา!`,
   fb_invite_message_text: playerName => `ฉันขอเชิญคุณมาไขปริศนานี้`,
   fb_invite_message_cta: 'เล่น',

}


