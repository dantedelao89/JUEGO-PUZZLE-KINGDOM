import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'COMPARTILHAR',
   common_label_reward: 'RECOMPENSA',
   common_label_claim: 'REIVINDICAR',
   common_label_button_play: 'JOGAR',
   common_label_level_intro: 'NÍVEL',

   label_loading_ad: 'Carregando anúncios. Por favor, espere',

   label_game_loading: 'CARREGANDO',
   label_game_continue: 'CONTINUAR',
   label_game_play_more_puzzle: 'MAIS QUEBRA-CABEÇAS',
   label_gameplay_select_difficulty: 'SELECIONAR A DIFICULDADE',

   label_fx_video_error: 'Erro no vídeo',

   label_settings_music: 'MÚSICA',
   label_settings_sound: 'SONS',

   label_tut_step_1: `Clique em duas peças para movê-las\ne posicioná-las corretamente`,
   label_tut_step_2: () => `Clique aqui e pague ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> para\nresolver algumas peças.`,  // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `O limite de tempo para\ncada quebra-cabeça dependerá\ndo número de peças.\n\n¡Não deixe o tempo acabar!`,
   label_tut_btn_continue: 'CONTINUAR',

   label_alert_intro: `VER UM VÍDEO PARA\nGANHAR ${_G.configGame.videoCoinReward} MOEDAS`,
   label_alert_back: 'NÃO',
   label_alert_earn_stars: 'SIM',

   label_level_up_header: 'LEVEL UP!',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'DESEJA RETOMAR\nO JOGO?',
   label_pause_header: 'PAUSAR',

   label_gameover_header: 'FIM DE JOGO',
   label_gameover_score_intro: 'PONTUAÇÃO:',
   label_gameover_btn_try_again: 'TENTE NOVAMENTE',
   label_gameover_no_thanks: 'NÃO, OBRIGADO',

   label_home_button_play_w_friends: 'JOGAR COM\nAMIGOS',

   label_share_intro_1: 'Você pode me vencer?',
   label_share_intro_2: 'PONTUAÇÃO:',

   label_win_well_done: 'Muito bem!',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },


   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} convida você a resolver este puzzle!`,
   fb_invite_message_text: playerName => `Te convido a resolver este quebra-cabeça`,
   fb_invite_message_cta: 'JOGAR',

}


