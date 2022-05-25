import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'PAYLAŞ',
   common_label_reward: 'ÖDÜL',
   common_label_claim: 'AL',
   common_label_button_play: 'OYNA',
   common_label_level_intro: 'SEVIYE',

   label_loading_ad: 'Reklamlar yükleniyor. Lütfen bekleyin',

   label_game_loading: 'YÜKLENIYOR',
   label_game_continue: 'DEVAM',
   label_game_play_more_puzzle: 'DAHA ÇOK YAPBOZ',
   label_gameplay_select_difficulty: 'ZORLUK DERECESINI SEÇ',

   label_fx_video_error: 'Video hatası',

   label_settings_music: 'MÜZIK',
   label_settings_sound: 'SES',

   label_tut_step_1: `İki parçaya tıklayıp taşıyarak\ndoğru yerlere yerleştirin.`,
   label_tut_step_2: () => `Buraya tıklayıp birkaç\nparçayı çözmek için ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> öde.`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `Her yapboz için\nsüre sınırı parça sayısına\nbağlı olarak değişecektir.\n\nSakın sürenin\ndolmasına izin vermeyin!`,
   label_tut_btn_continue: 'DEVAM',

   label_alert_intro: `${_G.configGame.videoCoinReward} JETON KAZANMAK\nIÇIN VIDEOYU IZLEYIN`,
   label_alert_back: 'OLUMSUZLUK',
   label_alert_earn_stars: 'EVET',

   label_level_up_header: 'SEVIYE GEÇILDI!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'OYUNA DEVAM\nETMEK ISTIYOR\nMUSUNUZ?',
   label_pause_header: 'DURAKLAT',

   label_gameover_header: 'OYUN BITTI!',
   label_gameover_score_intro: 'PUAN',
   label_gameover_btn_try_again: 'TEKRAR DENE',
   label_gameover_no_thanks: 'HAYIR, TEŞEKKÜRLER',

   label_home_button_play_w_friends: 'ARKADAŞLARINLA\nOYNA',

   label_share_intro_1: 'Beni yenebilir misin?',
   label_share_intro_2: 'PUAN:',

   label_win_well_done: 'Aferin!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} Bulmacayı çözmek için davet ediyor!`,
   fb_invite_message_text: playerName => `Seni bu Yapbozu çözmen için davet ediyorum.`,
   fb_invite_message_cta: 'OYNA',

}


