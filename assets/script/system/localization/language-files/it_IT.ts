import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'CONDIVIDI',
   common_label_reward: 'RICOMPENSA',
   common_label_claim: 'RISCATTA',
   common_label_button_play: 'GIOCA',
   common_label_level_intro: 'LIVELLO',

   label_loading_ad: 'Caricamento annunci in corso. Attendi',

   label_game_loading: 'CARICANDO',
   label_game_continue: 'CONTINUA',
   label_game_play_more_puzzle: 'PIÙ PUZZLE',
   label_gameplay_select_difficulty: 'SELEZIONA DIFFICOLTÀ:',

   label_fx_video_error: 'Errore video',

   label_settings_music: 'MUSICA',
   label_settings_sound: 'SUONI',

   label_tut_step_1: `Clicca su due pezzi per muoverli\ne posizionali correttamente`,
   label_tut_step_2: () => `Clicca qui e paga ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> \nper risolvere alcuni pezzi`, // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `Il tempo limite di\nogni puzzle dipenderà\ndal numero di pezzi.\n\nNon farlo finire!`,
   label_tut_btn_continue: 'CONTINUA',

   label_alert_intro: `GUARDA IL VIDEO PER\nGUADAGNARE ${_G.configGame.videoCoinReward} MONETE`,
   label_alert_back: 'NON',
   label_alert_earn_stars: 'SÌ',

   label_level_up_header: 'LEVEL UP!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'VUOI RIPRENDERE\nIL GIOCO?',
   label_pause_header: 'PAUSA',

   label_gameover_header: 'FINE DEL GIOCO',
   label_gameover_score_intro: 'PUNTEGGIO:',
   label_gameover_btn_try_again: 'PROVA DI NUOVO',
   label_gameover_no_thanks: 'NO, GRAZIE',

   label_home_button_play_w_friends: 'GIOCA CON\nGLI AMICI',

   label_share_intro_1: 'Riesci a battermi?',
   label_share_intro_2: 'PUNTEGGIO:',

   label_win_well_done: 'Molto bene!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} Vi invita a risolvere il puzzle!`,
   fb_invite_message_text: playerName => `Ti invito a risolvere questo Puzzle`,
   fb_invite_message_cta: 'GIOCA',

}


