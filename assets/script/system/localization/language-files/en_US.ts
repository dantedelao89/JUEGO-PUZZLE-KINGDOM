import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'SHARE',
   common_label_reward: 'REWARD',
   common_label_claim: 'CLAIM',
   common_label_button_play: 'PLAY',
   common_label_level_intro: 'LEVEL',

   label_loading_ad: 'Loading ads. Please wait',

   label_game_loading: 'LOADING',
   label_game_continue: 'CONTINUE',
   label_game_play_more_puzzle: 'MORE PUZZLES',
   label_gameplay_select_difficulty: 'SELECT DIFFICULTY',

   label_fx_video_error: 'Video error',

   label_settings_music: 'MUSIC',
   label_settings_sound: 'SOUNDS',

   label_tut_step_1: `Click on two pieces to move\nthem and place them correctly`,
   label_tut_step_2: () => `Click here and pay ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> to\nsolve a couple of pieces.`, // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `The time limit for each\npuzzle will depend on the\nnumber of pieces.\n\nDon't let it run out!`,
   label_tut_btn_continue: 'CONTINUE',


   label_alert_intro: `WATCH A VIDEO TO\nEARN ${_G.configGame.videoCoinReward} COINS`,
   label_alert_back: 'NO',
   label_alert_earn_stars: 'YES',

   label_level_up_header: 'LEVEL UP!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'DO YOU WANT\nTO RESUME\nTHE GAME?',
   label_pause_header: 'PAUSE',

   label_gameover_header: 'GAME OVER',
   label_gameover_score_intro: 'SCORE:',
   label_gameover_btn_try_again: 'TRY AGAIN',
   label_gameover_no_thanks: 'NO, THANKS',

   label_home_button_play_w_friends: 'PLAY WITH\nFRIENDS',

   label_share_intro_1: 'Can you beat me?',
   label_share_intro_2: 'SCORE:',

   label_win_well_done: 'Well done!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} invites you to solve a puzzle!`,
   fb_invite_message_text: playerName => `I invite you to solve this Puzzle`,
   fb_invite_message_cta: 'PLAY NOW',

}


