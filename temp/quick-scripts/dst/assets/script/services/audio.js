
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/audio.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvYXVkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVwQixJQUFNLGlCQUFpQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxlQUFlO0FBQ25ELElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLENBQUMsa0NBQWtDO0FBRWxELFFBQUEsS0FBSyxHQUFHO0lBQ2xCLFNBQVMsRUFBRSxFQUFFO0lBQ2IsYUFBYSxFQUFFLEVBQUU7SUFDakIsdUJBQXVCLEVBQUUsQ0FBQztJQUMxQixjQUFjLEVBQUUsQ0FBQztJQUVqQixJQUFJO1FBQUosaUJBRUM7UUFERSxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxFQUFFLEVBQXJCLENBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGNBQWM7UUFBZCxpQkFRQztRQVBFLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7WUFDbkQsSUFBSSxHQUFHO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixLQUFpQixVQUFHLEVBQUgsV0FBRyxFQUFILGlCQUFHLEVBQUgsSUFBRztnQkFBZixJQUFJLElBQUksWUFBQTtnQkFBUyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7YUFBQTtZQUN2RCwyQ0FBMkM7WUFFM0MsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsRUFBRSxFQUFsQixDQUFrQixFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsSUFBWSxFQUFFLE1BQVU7UUFBVix1QkFBQSxFQUFBLFVBQVU7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPO1FBQ3hELElBQUk7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3RGO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRztJQUNsQixDQUFDO0lBRUQsU0FBUyxFQUFULFVBQVUsSUFBWTtRQUNuQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxXQUFXLFlBQUMsTUFBVTtRQUFWLHVCQUFBLEVBQUEsVUFBVTtRQUNuQixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQUUsT0FBTztRQUMvQixJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1lBQUUsT0FBTztRQUM1QyxJQUFJO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVGLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3hDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUU7SUFDOUMsQ0FBQztJQUVELFdBQVc7UUFDUixJQUFJLEVBQUUsQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1lBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRUQsb0JBQW9CO1FBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmNvbnN0IFNUUkVBS19USU1FX1JBTkdFID0gNSAqIDEwMDA7IC8vIG1pbGxpc2Vjb25kc1xuY29uc3QgTUFYX1NUUkVBS19JTkRFWCA9IDE1OyAvLyBudW1iZXIgb2Ygc3RyZWFrIHNvdW5kcyB3ZSBoYXZlXG5cbmV4cG9ydCBjb25zdCBhdWRpbyA9IHtcbiAgIGF1ZGlvTGlzdDoge30sXG4gICBwbGF5aW5nSWRMaXN0OiB7fSxcbiAgIGN1cnJlbnRTdHJlYWtTb3VuZEluZGV4OiAwLFxuICAgbGFzdFN0cmVha1RpbWU6IDAsXG5cbiAgIGluaXQoKSB7XG4gICAgICBfLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5sb2FkQXVkaW9GaWxlcygpLCAxMDAwKTtcbiAgIH0sXG5cbiAgIGxvYWRBdWRpb0ZpbGVzKCkge1xuICAgICAgY2MucmVzb3VyY2VzLmxvYWREaXIoJ2F1ZGlvcycsIGNjLkF1ZGlvQ2xpcCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoZXJyKSByZXR1cm4gXy5sb2coZXJyKTtcbiAgICAgICAgIGZvciAobGV0IGNsaXAgb2YgcmVzKSB0aGlzLmF1ZGlvTGlzdFtjbGlwLm5hbWVdID0gY2xpcDtcbiAgICAgICAgIC8vIF8ubG9nKGBhdWRpby5qcyA+PiBhbGwgYXVkaW8gbG9hZGVkICFgKTtcblxuICAgICAgICAgXy53YWl0VG9SdW4oKCkgPT4gdGhpcy5wbGF5QmdNdXNpYygpLCAnaXNJbml0aWFsaXplZCcsIF9HLnNldHRpbmdzKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgcGxheVNvdW5kKG5hbWU6IHN0cmluZywgdm9sdW1lID0gMSkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5zb3VuZCB8fCAhdGhpcy5hdWRpb0xpc3RbbmFtZV0pIHJldHVybjtcbiAgICAgIHRyeSB7XG4gICAgICAgICB0aGlzLnBsYXlpbmdJZExpc3RbbmFtZV0gPSBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYXVkaW9MaXN0W25hbWVdLCBmYWxzZSwgdm9sdW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgfSxcblxuICAgc3RvcFNvdW5kKG5hbWU6IHN0cmluZykge1xuICAgICAgaWYgKHRoaXMucGxheWluZ0lkTGlzdFtuYW1lXSkgY2MuYXVkaW9FbmdpbmUuc3RvcEVmZmVjdCh0aGlzLnBsYXlpbmdJZExpc3RbbmFtZV0pO1xuICAgfSxcblxuICAgcGxheUJnTXVzaWModm9sdW1lID0gMSkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5tdXNpYykgcmV0dXJuO1xuICAgICAgaWYgKGNjLmF1ZGlvRW5naW5lLmlzTXVzaWNQbGF5aW5nKCkpIHJldHVybjtcbiAgICAgIHRyeSB7XG4gICAgICAgICB0aGlzLnBsYXlpbmdJZExpc3RbXCJiZ19tdXNpY1wiXSA9IGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvTGlzdFtcImJnX211c2ljXCJdLCB0cnVlKTtcbiAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldE11c2ljVm9sdW1lKHZvbHVtZSk7XG4gICAgICB9IGNhdGNoIChlKSB7IF8ubG9nKGBwbGF5TXVzaWMgZXJyIGAsIGUpOyB9XG4gICB9LFxuXG4gICBzdG9wQmdNdXNpYygpIHtcbiAgICAgIGlmIChjYy5hdWRpb0VuZ2luZS5pc011c2ljUGxheWluZygpKSBjYy5hdWRpb0VuZ2luZS5zdG9wTXVzaWMoKTtcbiAgIH0sXG5cbiAgIHBsYXlTb3VuZENsaWNrQnV0dG9uKCkge1xuICAgICAgaWYgKCFfRy5zZXR0aW5ncy5zb3VuZCkgcmV0dXJuO1xuICAgICAgdGhpcy5wbGF5U291bmQoXCJidXR0b25fY2xpY2tcIiwgMSk7XG4gICB9LFxuXG59Il19