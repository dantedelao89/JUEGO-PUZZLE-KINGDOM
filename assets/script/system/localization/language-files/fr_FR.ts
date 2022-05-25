import * as _G from '../../../system/all_modules';
const _ = _G._;

export = {
   common_label_share: 'PARTAGER',
   common_label_reward: 'RÉCOMPENSE',
   common_label_claim: 'RÉCLAMER',
   common_label_button_play: 'JOUER À',
   common_label_level_intro: 'NIVEAU',

   label_loading_ad: 'Chargement des annonces. Veuillez patienter',

   label_game_loading: 'CHARGEMENT DE',
   label_game_continue: 'CONTINUER',
   label_game_play_more_puzzle: 'PLUS DE PUZZLES',
   label_gameplay_select_difficulty: 'SÉLECTIONNEZ LA DIFFICULTÉ',

   label_fx_video_error: 'Erreur vidéo',

   label_settings_music: 'MUSIQUE',
   label_settings_sound: 'SONS',

   label_tut_step_1: `Cliquez sur deux pièces pour les\ndéplacer et les placer correctement.`,
   label_tut_step_2: () => `Cliquez ici et payez ${_G.configGame.hintCoinPrice} <img src="icon_coin" width=40 height=40/> pour\nrésoudre un couple de pièces.`, // this label is RichText. "icon_coin" is sprite name in the linked atlas.
   label_tut_step_3: `"Le temps limite pour\nchaque puzzle dépendra\ndu nombre de pièces.\n\nNe le laissez pas s'épuiser !"`,
   label_tut_btn_continue: 'CONTINUER',

   label_alert_intro: `REGARDEZ UNE VIDÉO\nPOUR GAGNER ${_G.configGame.videoCoinReward} PIÈCES`,
   label_alert_back: 'NON',
   label_alert_earn_stars: 'OUI',

   label_level_up_header: 'MONTEZ DE NIVEAU !',
   label_level_up_to_level_X: (x) => `${x}`,

   label_pause_intro: 'VOULEZ-VOUS\nREPRENDRE LE\nJEU ?',
   label_pause_header: 'PAUSE',

   label_gameover_header: 'TERMINÉ',
   label_gameover_score_intro: 'SCORE:',
   label_gameover_btn_try_again: 'ESSAYER À NOUVEAU',
   label_gameover_no_thanks: 'NON, MERCI',

   label_home_button_play_w_friends: 'JOUER AVEC\nDES AMIS',

   label_share_intro_1: 'Pouvez-vous me battre?',
   label_share_intro_2: 'SCORE:',

   label_win_well_done: 'Bien joué !',

   label_category_list_header_name: x => {
      return _G.levelManager.categoryArr.find(catInfo => catInfo.id == x)?.languages[_G.localize.currentLanguageCode]?.toUpperCase();
   },



   // ==================================
   //  fb social contents
   // fb_invite_message_text: playerName => `${playerName} vous invite à résoudre un puzzle!`,
   fb_invite_message_text: playerName => `Je vous invite à résoudre cette énigme`,
   fb_invite_message_cta: 'JOUER À',

}


