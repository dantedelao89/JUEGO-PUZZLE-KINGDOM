import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'COMPARTIR',
   common_label_reward: 'RECOMPENSA',
   common_label_claim: 'RECLAMAR',
   common_label_button_play: 'JUGAR',
   common_label_level_intro: 'NIVEL',

   label_loading_ad: 'Cargando anuncios.. Por favor espera',

   label_game_loading: 'CARGANDO',
   label_game_continue: 'CONTINUAR',
   label_game_play_more_puzzle: 'MÁS PUZZLES',
   label_gameplay_select_difficulty: 'SELECCIONAR DIFICULTAD',

   label_fx_video_error: 'Error de video',

   label_settings_music: 'MUSICA',
   label_settings_sound: 'SONIDOS',

   label_tut_step_1: `Haz clic en dos piezas para\nmoverlas y colocarlas correctamente`,
   label_tut_step_2: () => `Clic aquí y paga ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> monedas \npara resolver un par de piezas`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `El tiempo límite\ndepende de la dificultad\nde cada puzzle\n\n¡No dejes que se agote!`,
   label_tut_btn_continue: 'CONTINUAR',

   label_alert_intro: `VE UN VIDEO PARA\nGANAR ${_G.configGame.videoCoinReward} MONEDAS`,
   label_alert_back: 'NO',
   label_alert_earn_stars: 'SÍ',

   label_level_up_header: '¡SUBISTE NIVEL!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: '¿QUIERES REANUDAR\nEL JUEGO?',
   label_pause_header: 'PAUSE',

   label_gameover_header: 'JUEGO TERMINADO',
   label_gameover_score_intro: 'PUNTOS:',
   label_gameover_btn_try_again: 'INTENTAR DE NUEVO',
   label_gameover_no_thanks: 'NO, GRACIAS',

   label_home_button_play_w_friends: 'JUGAR CON\nAMIGOS',

   label_share_intro_1: 'Puedes vencerme?',
   label_share_intro_2: 'PUNTOS:',

   label_win_well_done: '¡Bien hecho!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },



   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} Te invita a resolver este puzzle!`,
   fb_invite_message_text: playerName => `Te invito a resolver este puzzle`,
   fb_invite_message_cta: 'JUGAR',

}


