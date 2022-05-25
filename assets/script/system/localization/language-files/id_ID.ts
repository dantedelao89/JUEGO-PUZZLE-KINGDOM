import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'BAGIKAN',
   common_label_reward: 'HADIAH',
   common_label_claim: 'KLAIM',
   common_label_button_play: 'BERMAIN',
   common_label_level_intro: 'TINGKAT',

   label_loading_ad: 'Memuat iklan. Harap tunggu',

   label_game_loading: 'SEDANG MEMUAT',
   label_game_continue: 'LANJUTKAN',
   label_game_play_more_puzzle: 'TEKA-TEKI LAINNYA',
   label_gameplay_select_difficulty: 'PILIH KESULITAN:',

   label_fx_video_error: 'Kesalahan video',

   label_settings_music: 'MUSIK',
   label_settings_sound: 'SUARA',

   label_tut_step_1: `Klik pada dua bagian\nuntuk memindahkannya dan\nmenempatkannya dengan benar`,
   label_tut_step_2: () => `Klik di sini dan bayar ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> untuk\nmemecahkan beberapa potong.`, // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `Batas waktu untuk setiap\nteka-teki akan tergantung\npada jumlah keping.\n\n¡Jangan sampai waktunya habis!`,
   label_tut_btn_continue: 'LANJUTKAN',

   label_alert_intro: `TONTON VIDEONYA UNTUK\nMEMENANGKAN ${_G.configGame.videoCoinReward} KOIN`,
   label_alert_back: 'TIDAK',
   label_alert_earn_stars: 'YA',

   label_level_up_header: 'NAIK TINGKAT!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'APAKAH ANDA\nINGIN MELANJUTKAN\nPERMAINAN?',
   label_pause_header: 'JEDA',

   label_gameover_header: 'TAMAT',
   label_gameover_score_intro: 'SKOR:',
   label_gameover_btn_try_again: 'COBA LAGI',
   label_gameover_no_thanks: 'TIDAK, TERIMA KASIH',

   label_home_button_play_w_friends: 'BERMAIN\nDENGAN TEMAN',

   label_share_intro_1: 'Bisakah kamu mengalahkan aku?',
   label_share_intro_2: 'SKOR:',

   label_win_well_done: 'Bagus sekali',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} mengundangmu untuk memecahkan teka-teki!`,
   fb_invite_message_text: playerName => `Saya mengundang Anda untuk memecahkan teka-teki ini`,
   fb_invite_message_cta: 'BERMAIN',

}


