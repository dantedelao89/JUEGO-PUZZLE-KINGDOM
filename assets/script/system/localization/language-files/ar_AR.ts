import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'شارك',
   common_label_reward: 'جائزة',
   common_label_claim: 'اجمع العملات\n التي ربحتها',
   common_label_button_play: 'العب',
   common_label_level_intro: 'المستوى',

   label_loading_ad: 'تحميل الإعلانات الرجاء الانتظار',

   label_game_loading: 'تحميل',
   label_game_continue: 'استمر',
   label_game_play_more_puzzle: 'المزيد من الأحجيات',
   label_gameplay_select_difficulty: 'اختر مستوى الصعوبة',

   label_fx_video_error: 'خطأ في عرض الفيديو',

   label_settings_music: 'الموسيقى',
   label_settings_sound: 'الأصوات',

   label_tut_step_1: `انقر على قطعتين لتحركهما\nوتضعهما في المكان الصحيح`,
   label_tut_step_2: () => `انقر هنا وادفع  <img src="icon_coin" width=40 height=40/> ${_G.configGame.hintCoinPrice}\n لمعرفة مكان بضع قطع.`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `الوقت المتاح لحل كل أحجية \nسيُحدد بناءً على عدد قطع الأحجية. \n\nلا تدع الوقت ينفذ منك!`,
   label_tut_btn_continue: 'استمر',

   label_alert_intro: `شاهد فيديو لترب\n ${_G.configGame.videoCoinReward} قطعة نقدية`,
   label_alert_back: 'لاتفعل',
   label_alert_earn_stars: 'نعم',

   label_level_up_header: 'لقد ارتقيت إلى مستوى أعلى!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'هل ترغب في استكمال اللعب؟',
   label_pause_header: 'إيقاف مؤقت',

   label_gameover_header: 'انتهت اللعبة',
   label_gameover_score_intro: 'النقاط المُسجلة',
   label_gameover_btn_try_again: 'حاول مرة\n أخرى',
   label_gameover_no_thanks: 'لا، شكرا',

   label_home_button_play_w_friends: 'العب مع\nالأصدقاء',

   label_share_intro_1: 'هل تقدر على هزيمتي؟',
   label_share_intro_2: 'النقاط المُسجلة',

   label_win_well_done: 'أحسنت!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },



   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} يدعوك إلى حل اللغز!`,
   fb_invite_message_text: playerName => `أدعوك إلى حل هذه الأحجية`,
   fb_invite_message_cta: 'العب',

}


