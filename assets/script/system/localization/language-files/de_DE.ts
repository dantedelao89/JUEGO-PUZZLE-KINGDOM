import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'TEILEN',
   common_label_reward: 'BELOHNUNG',
   common_label_claim: 'BEHAUPTE',
   common_label_button_play: 'SPIEL',
   common_label_level_intro: 'LEVEL',

   label_loading_ad: 'Anzeigen werden geladen. Bitte warten',

   label_game_loading: 'LADEN',
   label_game_continue: 'WEITER',
   label_game_play_more_puzzle: 'MEHR RÄTSEL',
   label_gameplay_select_difficulty: 'SCHWIERIGKEIT WÄHLEN:',

   label_fx_video_error: 'Video-Fehler',

   label_settings_music: 'MUSIK',
   label_settings_sound: 'SOUNDS',

   label_tut_step_1: `Klicke auf zwei Figuren,\num sie zu bewegen und\nrichtig zu platzieren`,
   label_tut_step_2: () => `Klicke hier und zahle ${_G.configGame.hintCoinPrice}  <img src="icon_coin" width=40 height=40/>,\num ein paar Teile zu lösen.`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `Das Zeitlimit für\njedes Rätsel hängt von der\nAnzahl der Teile ab.\n\nLass sie nicht ablaufen!`,
   label_tut_btn_continue: 'WEITER',

   label_alert_intro: `SEHEN SIE SICH DAS\nVIDEO AN, UM ${_G.configGame.videoCoinReward} MÜNZEN\nZU VERDIENEN`,
   label_alert_back: 'NICHT',
   label_alert_earn_stars: 'JA',

   label_level_up_header: 'NEUES LEVEL!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'WILLST DU\nDAS SPIEL\nFORTSETZEN?',
   label_pause_header: 'PAUSE',

   label_gameover_header: 'SPIEL VORBEI',
   label_gameover_score_intro: 'PUNKTESTAND:',
   label_gameover_btn_try_again: 'ERNEUT VERSUCHEN',
   label_gameover_no_thanks: 'NEIN, DANKE',

   label_home_button_play_w_friends: 'MIT FREUNDEN\nSPIELEN',

   label_share_intro_1: 'Können Sie mich schlagen?',
   label_share_intro_2: 'PUNKTESTAND:',

   label_win_well_done: 'Gut gemacht!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },



   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} Lädt Sie ein, das Rätsel zu lösen!`,
   fb_invite_message_text: playerName => `Ich lade dich ein, dieses Rätsel zu lösen`,
   fb_invite_message_cta: 'SPIEL',

}


