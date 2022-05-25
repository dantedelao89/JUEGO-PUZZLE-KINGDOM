
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/system/resources_manager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '4b431lJxCxH8r1n9TH3yBVp', 'resources_manager');
// script/system/resources_manager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resources = void 0;
var _G = require("./all_modules");
var _ = _G._, $ = _G.$;
exports.resources = {
    frameSprites: {},
    isAllFramesLoaded: false,
    frameLoadCallbackArr: [],
    init: function () {
        var _this = this;
        this.frameSprites['tutorial'] = { tut: cc.find('Canvas/sample_nodes/full_picture/frame').getComponent(cc.Sprite).spriteFrame };
        _G.levelManager.categoryNameArr.map(function (catName) { return _this.frameSprites[catName] = {}; });
        // _.setTimeout(() => this.loadAllFrames(), 100);
        _.setTimeout(function () { return _this.loadImageMessageHome(); }, 2000);
    },
    loadImageMessageHome: function () {
        cc.resources.load('social/img_message_home', cc.Texture2D, function (err, res) {
            if (err)
                return _.log('loadImageMessageHome err', err);
            var targetNode = cc.find('Canvas/message_home/picture/img_message_home');
            targetNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(res);
        });
    },
    loadSingleFrame: function (catName, frameName) {
        var _this = this;
        // _.setTimeout(() => {
        cc.resources.load("frames/" + catName + "/" + frameName, cc.SpriteFrame, function (err, res) {
            if (!err) {
                _this.frameSprites[catName][frameName] = res;
                _this.frameLoadCallbackArr.map(function (f) { return f(catName, frameName); });
            }
            else
                _.log(err);
        });
        // }, 1000);
    },
    // loadAllFrames() {
    //    let categoryLoaded = 0;
    //    _G.levelManager.categoryNameArr.map(catName => {
    //       cc.resources.loadDir(`frames/${catName}`, cc.SpriteFrame, (err, resArr) => {
    //          if (!err) resArr.map(res => {
    //             this.frameSprites[catName][res.name] = res;
    //             this.frameLoadCallbackArr.map(f => f(catName, res.name));
    //          });
    //          categoryLoaded++;
    //          if (categoryLoaded == _G.levelManager.categoryNameArr.length) {
    //             this.isAllFramesLoaded = true;
    //             _G.coreUI.hideLayout('layout_loading');
    //          }
    //       });
    //    });
    // },
    addFrameLoadCallback: function (f) {
        this.frameLoadCallbackArr.push(f);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc3lzdGVtL3Jlc291cmNlc19tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGtDQUFvQztBQUM1QixJQUFBLENBQUMsR0FBUSxFQUFFLEVBQVYsRUFBRSxDQUFDLEdBQUssRUFBRSxFQUFQLENBQVE7QUFFUCxRQUFBLFNBQVMsR0FBRztJQUN0QixZQUFZLEVBQUUsRUFBRTtJQUNoQixpQkFBaUIsRUFBRSxLQUFLO0lBQ3hCLG9CQUFvQixFQUFFLEVBQUU7SUFFeEIsSUFBSTtRQUFKLGlCQU1DO1FBTEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvSCxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO1FBQ2hGLGlEQUFpRDtRQUVqRCxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBM0IsQ0FBMkIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2pCLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztZQUNqRSxJQUFJLEdBQUc7Z0JBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQztZQUMzRSxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELGVBQWUsWUFBQyxPQUFPLEVBQUUsU0FBUztRQUFsQyxpQkFXQztRQVZFLHVCQUF1QjtRQUN2QixFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxZQUFVLE9BQU8sU0FBSSxTQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO1lBQzFFLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1AsS0FBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQzVDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxFQUFyQixDQUFxQixDQUFDLENBQUM7YUFDNUQ7O2dCQUVJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxZQUFZO0lBQ2YsQ0FBQztJQUVELG9CQUFvQjtJQUNwQiw2QkFBNkI7SUFDN0Isc0RBQXNEO0lBQ3RELHFGQUFxRjtJQUNyRix5Q0FBeUM7SUFDekMsMERBQTBEO0lBQzFELHdFQUF3RTtJQUN4RSxlQUFlO0lBRWYsNkJBQTZCO0lBQzdCLDJFQUEyRTtJQUMzRSw2Q0FBNkM7SUFDN0Msc0RBQXNEO0lBQ3RELGFBQWE7SUFFYixZQUFZO0lBQ1osU0FBUztJQUNULEtBQUs7SUFFTCxvQkFBb0IsWUFBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUVILENBQUEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCByZXNvdXJjZXMgPSB7XG4gICBmcmFtZVNwcml0ZXM6IHt9LFxuICAgaXNBbGxGcmFtZXNMb2FkZWQ6IGZhbHNlLFxuICAgZnJhbWVMb2FkQ2FsbGJhY2tBcnI6IFtdLFxuXG4gICBpbml0KCkge1xuICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbJ3R1dG9yaWFsJ10gPSB7IHR1dDogY2MuZmluZCgnQ2FudmFzL3NhbXBsZV9ub2Rlcy9mdWxsX3BpY3R1cmUvZnJhbWUnKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSB9O1xuICAgICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB0aGlzLmZyYW1lU3ByaXRlc1tjYXROYW1lXSA9IHt9KTtcbiAgICAgIC8vIF8uc2V0VGltZW91dCgoKSA9PiB0aGlzLmxvYWRBbGxGcmFtZXMoKSwgMTAwKTtcblxuICAgICAgXy5zZXRUaW1lb3V0KCgpID0+IHRoaXMubG9hZEltYWdlTWVzc2FnZUhvbWUoKSwgMjAwMCk7XG4gICB9LFxuXG4gICBsb2FkSW1hZ2VNZXNzYWdlSG9tZSgpIHtcbiAgICAgIGNjLnJlc291cmNlcy5sb2FkKCdzb2NpYWwvaW1nX21lc3NhZ2VfaG9tZScsIGNjLlRleHR1cmUyRCwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoZXJyKSByZXR1cm4gXy5sb2coJ2xvYWRJbWFnZU1lc3NhZ2VIb21lIGVycicsIGVycik7XG4gICAgICAgICBjb25zdCB0YXJnZXROb2RlID0gY2MuZmluZCgnQ2FudmFzL21lc3NhZ2VfaG9tZS9waWN0dXJlL2ltZ19tZXNzYWdlX2hvbWUnKTtcbiAgICAgICAgIHRhcmdldE5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUocmVzKTtcbiAgICAgIH0pO1xuICAgfSxcblxuICAgbG9hZFNpbmdsZUZyYW1lKGNhdE5hbWUsIGZyYW1lTmFtZSkge1xuICAgICAgLy8gXy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNjLnJlc291cmNlcy5sb2FkKGBmcmFtZXMvJHtjYXROYW1lfS8ke2ZyYW1lTmFtZX1gLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICBpZiAoIWVycikge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bZnJhbWVOYW1lXSA9IHJlcztcbiAgICAgICAgICAgIHRoaXMuZnJhbWVMb2FkQ2FsbGJhY2tBcnIubWFwKGYgPT4gZihjYXROYW1lLCBmcmFtZU5hbWUpKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgZWxzZSBfLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICAvLyB9LCAxMDAwKTtcbiAgIH0sXG5cbiAgIC8vIGxvYWRBbGxGcmFtZXMoKSB7XG4gICAvLyAgICBsZXQgY2F0ZWdvcnlMb2FkZWQgPSAwO1xuICAgLy8gICAgX0cubGV2ZWxNYW5hZ2VyLmNhdGVnb3J5TmFtZUFyci5tYXAoY2F0TmFtZSA9PiB7XG4gICAvLyAgICAgICBjYy5yZXNvdXJjZXMubG9hZERpcihgZnJhbWVzLyR7Y2F0TmFtZX1gLCBjYy5TcHJpdGVGcmFtZSwgKGVyciwgcmVzQXJyKSA9PiB7XG4gICAvLyAgICAgICAgICBpZiAoIWVycikgcmVzQXJyLm1hcChyZXMgPT4ge1xuICAgLy8gICAgICAgICAgICAgdGhpcy5mcmFtZVNwcml0ZXNbY2F0TmFtZV1bcmVzLm5hbWVdID0gcmVzO1xuICAgLy8gICAgICAgICAgICAgdGhpcy5mcmFtZUxvYWRDYWxsYmFja0Fyci5tYXAoZiA9PiBmKGNhdE5hbWUsIHJlcy5uYW1lKSk7XG4gICAvLyAgICAgICAgICB9KTtcblxuICAgLy8gICAgICAgICAgY2F0ZWdvcnlMb2FkZWQrKztcbiAgIC8vICAgICAgICAgIGlmIChjYXRlZ29yeUxvYWRlZCA9PSBfRy5sZXZlbE1hbmFnZXIuY2F0ZWdvcnlOYW1lQXJyLmxlbmd0aCkge1xuICAgLy8gICAgICAgICAgICAgdGhpcy5pc0FsbEZyYW1lc0xvYWRlZCA9IHRydWU7XG4gICAvLyAgICAgICAgICAgICBfRy5jb3JlVUkuaGlkZUxheW91dCgnbGF5b3V0X2xvYWRpbmcnKTtcbiAgIC8vICAgICAgICAgIH1cblxuICAgLy8gICAgICAgfSk7XG4gICAvLyAgICB9KTtcbiAgIC8vIH0sXG5cbiAgIGFkZEZyYW1lTG9hZENhbGxiYWNrKGYpIHtcbiAgICAgIHRoaXMuZnJhbWVMb2FkQ2FsbGJhY2tBcnIucHVzaChmKTtcbiAgIH0sXG5cbn0iXX0=