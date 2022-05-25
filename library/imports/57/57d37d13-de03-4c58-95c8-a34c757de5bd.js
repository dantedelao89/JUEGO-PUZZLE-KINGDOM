"use strict";
cc._RF.push(module, '57d370T3gNMWJXIo0x1feW9', 'audio');
// script/services/audio.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audio = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
var STREAK_TIME_RANGE = 5 * 1000; // milliseconds
var MAX_STREAK_INDEX = 15; // number of streak sounds we have
exports.audio = {
    audioList: {},
    playingIdList: {},
    currentStreakSoundIndex: 0,
    lastStreakTime: 0,
    init: function () {
        var _this = this;
        _.setTimeout(function () { return _this.loadAudioFiles(); }, 1000);
    },
    loadAudioFiles: function () {
        var _this = this;
        cc.resources.loadDir('audios', cc.AudioClip, function (err, res) {
            if (err)
                return _.log(err);
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var clip = res_1[_i];
                _this.audioList[clip.name] = clip;
            }
            // _.log(`audio.js >> all audio loaded !`);
            _.waitToRun(function () { return _this.playBgMusic(); }, 'isInitialized', _G.settings);
        });
    },
    playSound: function (name, volume) {
        if (volume === void 0) { volume = 1; }
        if (!_G.settings.sound || !this.audioList[name])
            return;
        try {
            this.playingIdList[name] = cc.audioEngine.play(this.audioList[name], false, volume);
        }
        catch (e) { }
    },
    stopSound: function (name) {
        if (this.playingIdList[name])
            cc.audioEngine.stopEffect(this.playingIdList[name]);
    },
    playBgMusic: function (volume) {
        if (volume === void 0) { volume = 1; }
        if (!_G.settings.music)
            return;
        if (cc.audioEngine.isMusicPlaying())
            return;
        try {
            this.playingIdList["bg_music"] = cc.audioEngine.playMusic(this.audioList["bg_music"], true);
            cc.audioEngine.setMusicVolume(volume);
        }
        catch (e) {
            _.log("playMusic err ", e);
        }
    },
    stopBgMusic: function () {
        if (cc.audioEngine.isMusicPlaying())
            cc.audioEngine.stopMusic();
    },
    playSoundClickButton: function () {
        if (!_G.settings.sound)
            return;
        this.playSound("button_click", 1);
    },
};

cc._RF.pop();