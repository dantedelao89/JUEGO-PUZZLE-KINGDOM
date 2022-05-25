import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'CHIA SẺ',
   common_label_reward: 'PHẦN THƯỞNG',
   common_label_claim: 'NHẬN',
   common_label_button_play: 'CHƠI',
   common_label_level_intro: 'CẤP',

   label_loading_ad: 'Đang tải quảng cáo. Vui lòng chờ',

   label_game_loading: 'ĐANG TẢI',
   label_game_continue: 'TIẾP TỤC',
   label_game_play_more_puzzle: 'HÌNH KHÁC',
   label_gameplay_select_difficulty: 'CHỌN ĐỘ KHÓ:',

   label_fx_video_error: 'Lỗi video',

   label_settings_music: 'NHẠC NỀN',
   label_settings_sound: 'ÂM HIỆU ỨNG',

   label_tut_step_1: `Bấm vào các mảnh nhỏ để\nđổi chỗ vào đúng vị trí`,
   label_tut_step_2: () => `Bấm vào đây và dùng ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/>\nđể giải 2 miếng ghép.`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `Thời gian cho mỗi bài\ntùy thuộc vào số miếng ghép\n\nĐừng để bị hết giờ!`,
   label_tut_btn_continue: 'TIẾP TỤC',

   label_alert_intro: `XEM 1 VIDEO ĐỂ\nNHẬN ${_G.configGame.videoCoinReward} XU`,
   label_alert_back: 'KHÔNG',
   label_alert_earn_stars: 'CÓ',

   label_level_up_header: 'LÊN CẤP!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'BẠN CÓ MUỐN\nTIẾP TỤC CHƠI?',
   label_pause_header: 'TẠM DỪNG',

   label_gameover_header: 'THUA RỒI',
   label_gameover_score_intro: 'ĐIỂM:',
   label_gameover_btn_try_again: 'CHƠI LẠI',
   label_gameover_no_thanks: 'KHÔNG, CẢM ƠN',

   label_home_button_play_w_friends: 'CHƠI VỚI\nBẠN BÈ',

   label_share_intro_1: 'Bạn có thể thắng tôi?',
   label_share_intro_2: 'ĐIỂM : ',

   label_win_well_done: 'Tuyệt vời!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} mời bạn giải một bài xếp hình!`,
   fb_invite_message_text: playerName => `Tôi mời bạn giải một bài xếp hình!`,
   fb_invite_message_cta: 'CHƠI',

}


