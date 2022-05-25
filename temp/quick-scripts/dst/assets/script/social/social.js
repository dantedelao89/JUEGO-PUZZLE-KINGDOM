
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/social/social.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd9d41IJoc1IrIOJ8TrSXHSM', 'social');
// script/social/social.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.social = void 0;
var _G = require("../system/all_modules");
var _ = _G._;
var share_1 = require("../social/share");
var message_1 = require("../social/message");
exports.social = {
    init: function () {
        // _G.login.addLoginDataField('subscribeInfo');
        // _G.login.addLoginDataField('shortcutInfo');
        // _G.login.addCallback(data => {
        //    this.subscribeInfo = data.hasOwnProperty('subscribeInfo') ? data.subscribeInfo : 5;
        //    this.shortcutInfo = data.hasOwnProperty('shortcutInfo') ? data.shortcutInfo : 5;
        // })
    },
    share: function (isFromV2Screen, shareCode) {
        if (isFromV2Screen === void 0) { isFromV2Screen = false; }
        if (shareCode === void 0) { shareCode = ''; }
        cc.find('Canvas/shares').getComponent(share_1.default).sharePostNormal(isFromV2Screen, shareCode);
        _G.analytic.logShare(_G.gameMechanic.currentCategoryName, _G.gameMechanic.currentFrameName);
    },
    sendMessage: function () {
        cc.find("Canvas/messages").getComponent(message_1.default).sendMessageScore();
    },
    sendMessageHome: function () {
        cc.find('Canvas/message_home').getComponent(message_1.default).sendMessageStillImage();
    },
    inviteHome: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessageHome();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessageHome();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
    },
    invite: function (callback) {
        var _this = this;
        if (!window['FBInstant']) {
            this.sendMessage();
            return callback && callback();
        }
        try {
            FBInstant.context.chooseAsync().then(function () {
                _this.sendMessage();
                if (callback)
                    callback(FBInstant.context.getID());
            }).catch(function (err) {
                _.log(err);
                if (callback)
                    callback();
            });
        }
        catch (errX) {
            _.log(errX);
            if (callback)
                callback();
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc29jaWFsL3NvY2lhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwwQ0FBNEM7QUFDNUMsSUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUVmLHlDQUFvQztBQUNwQyw2Q0FBd0M7QUFFM0IsUUFBQSxNQUFNLEdBQUc7SUFDbkIsSUFBSTtRQUNELCtDQUErQztRQUMvQyw4Q0FBOEM7UUFDOUMsaUNBQWlDO1FBQ2pDLHlGQUF5RjtRQUN6RixzRkFBc0Y7UUFDdEYsS0FBSztJQUNSLENBQUM7SUFFRCxLQUFLLFlBQUMsY0FBc0IsRUFBRSxTQUFjO1FBQXRDLCtCQUFBLEVBQUEsc0JBQXNCO1FBQUUsMEJBQUEsRUFBQSxjQUFjO1FBQ3pDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEYsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0YsQ0FBQztJQUVELFdBQVc7UUFDUixFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxlQUFlO1FBQ1osRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBTyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNoRixDQUFDO0lBR0QsVUFBVSxFQUFWLFVBQVcsUUFBUztRQUFwQixpQkFrQkM7UUFqQkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsT0FBTyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7U0FDaEM7UUFFRCxJQUFJO1lBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxRQUFRO29CQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztnQkFDVCxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNYLElBQUksUUFBUTtvQkFBRSxRQUFRLEVBQUUsQ0FBQTtZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNMO1FBQUMsT0FBTyxJQUFJLEVBQUU7WUFDWixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1osSUFBSSxRQUFRO2dCQUFFLFFBQVEsRUFBRSxDQUFBO1NBQzFCO0lBQ0osQ0FBQztJQUdELE1BQU0sRUFBTixVQUFPLFFBQW1CO1FBQTFCLGlCQWtCQztRQWpCRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixPQUFPLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQztTQUNoQztRQUVELElBQUk7WUFDRCxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQztnQkFDbEMsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLFFBQVE7b0JBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxHQUFHO2dCQUNULENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxRQUFRO29CQUFFLFFBQVEsRUFBRSxDQUFBO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1NBQ0w7UUFBQyxPQUFPLElBQUksRUFBRTtZQUNaLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDWixJQUFJLFFBQVE7Z0JBQUUsUUFBUSxFQUFFLENBQUE7U0FDMUI7SUFDSixDQUFDO0NBNkVILENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfRyBmcm9tICcuLi9zeXN0ZW0vYWxsX21vZHVsZXMnO1xuY29uc3QgXyA9IF9HLl87XG5cbmltcG9ydCBTaGFyZSBmcm9tIFwiLi4vc29jaWFsL3NoYXJlXCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuLi9zb2NpYWwvbWVzc2FnZSc7XG5cbmV4cG9ydCBjb25zdCBzb2NpYWwgPSB7XG4gICBpbml0KCkge1xuICAgICAgLy8gX0cubG9naW4uYWRkTG9naW5EYXRhRmllbGQoJ3N1YnNjcmliZUluZm8nKTtcbiAgICAgIC8vIF9HLmxvZ2luLmFkZExvZ2luRGF0YUZpZWxkKCdzaG9ydGN1dEluZm8nKTtcbiAgICAgIC8vIF9HLmxvZ2luLmFkZENhbGxiYWNrKGRhdGEgPT4ge1xuICAgICAgLy8gICAgdGhpcy5zdWJzY3JpYmVJbmZvID0gZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc3Vic2NyaWJlSW5mbycpID8gZGF0YS5zdWJzY3JpYmVJbmZvIDogNTtcbiAgICAgIC8vICAgIHRoaXMuc2hvcnRjdXRJbmZvID0gZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc2hvcnRjdXRJbmZvJykgPyBkYXRhLnNob3J0Y3V0SW5mbyA6IDU7XG4gICAgICAvLyB9KVxuICAgfSxcblxuICAgc2hhcmUoaXNGcm9tVjJTY3JlZW4gPSBmYWxzZSwgc2hhcmVDb2RlID0gJycpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9zaGFyZXMnKS5nZXRDb21wb25lbnQoU2hhcmUpLnNoYXJlUG9zdE5vcm1hbChpc0Zyb21WMlNjcmVlbiwgc2hhcmVDb2RlKTtcbiAgICAgIF9HLmFuYWx5dGljLmxvZ1NoYXJlKF9HLmdhbWVNZWNoYW5pYy5jdXJyZW50Q2F0ZWdvcnlOYW1lLCBfRy5nYW1lTWVjaGFuaWMuY3VycmVudEZyYW1lTmFtZSk7XG4gICB9LFxuXG4gICBzZW5kTWVzc2FnZSgpIHtcbiAgICAgIGNjLmZpbmQoXCJDYW52YXMvbWVzc2FnZXNcIikuZ2V0Q29tcG9uZW50KE1lc3NhZ2UpLnNlbmRNZXNzYWdlU2NvcmUoKTtcbiAgIH0sXG5cbiAgIHNlbmRNZXNzYWdlSG9tZSgpIHtcbiAgICAgIGNjLmZpbmQoJ0NhbnZhcy9tZXNzYWdlX2hvbWUnKS5nZXRDb21wb25lbnQoTWVzc2FnZSkuc2VuZE1lc3NhZ2VTdGlsbEltYWdlKCk7XG4gICB9LFxuXG5cbiAgIGludml0ZUhvbWUoY2FsbGJhY2s/KSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHtcbiAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2VIb21lKCk7XG4gICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgIEZCSW5zdGFudC5jb250ZXh0LmNob29zZUFzeW5jKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlSG9tZSgpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhGQkluc3RhbnQuY29udGV4dC5nZXRJRCgpKTtcbiAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBfLmxvZyhlcnIpO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpXG4gICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVyclgpIHtcbiAgICAgICAgIF8ubG9nKGVyclgpO1xuICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpXG4gICAgICB9XG4gICB9LFxuXG5cbiAgIGludml0ZShjYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG4gICAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHtcbiAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICAgRkJJbnN0YW50LmNvbnRleHQuY2hvb3NlQXN5bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soRkJJbnN0YW50LmNvbnRleHQuZ2V0SUQoKSk7XG4gICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgXy5sb2coZXJyKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKVxuICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJYKSB7XG4gICAgICAgICBfLmxvZyhlcnJYKTtcbiAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKVxuICAgICAgfVxuICAgfSxcblxuXG4gICAvLyBhc2tCb3RTdWJzY3JpYmUoY2FsbGJhY2spIHtcbiAgIC8vICAgIC8vIF8ubG9nKGB0aGlzLnN1YnNjcmliZUluZm89JHt0aGlzLnN1YnNjcmliZUluZm99YCk7XG4gICAvLyAgICBjb25zdCBmaW5hbENhbGxiYWNrID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICghd2luZG93WydGQkluc3RhbnQnXSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICghX0cudXRpbHNGQi5pc1N1cHBvcnRlZEFQSShcInBsYXllci5jYW5TdWJzY3JpYmVCb3RBc3luY1wiKSB8fCAhX0cudXRpbHNGQi5pc1N1cHBvcnRlZEFQSShcInBsYXllci5zdWJzY3JpYmVCb3RBc3luY1wiKSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKSB8fCBfLmxvZygnIGFza0JvdFN1YnNjcmliZSA6OiBpc1N1cHBvcnRlZEFQSSA+IG5vdCBzdXBwb3J0ZWQnKTtcbiAgIC8vICAgIGlmICh0aGlzLnN1YnNjcmliZUluZm8gPT0gJ2FjY2VwdGVkJyB8fCB0aGlzLnN1YnNjcmliZUluZm8gPD0gMCkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIHRoaXMuc3Vic2NyaWJlSW5mby0tO1xuICAgLy8gICAgX0cuZGF0YS5zYXZlRGF0YSh7IHN1YnNjcmliZUluZm86IHRoaXMuc3Vic2NyaWJlSW5mbyB9KTtcblxuICAgLy8gICAgRkJJbnN0YW50LnBsYXllci5jYW5TdWJzY3JpYmVCb3RBc3luYygpLnRoZW4oY2FuX3N1YnNjcmliZSA9PiB7XG4gICAvLyAgICAgICBpZiAoIWNhbl9zdWJzY3JpYmUpIHJldHVybiBmaW5hbENhbGxiYWNrKCkgfHwgXy5sb2coYCBhc2tCb3RTdWJzY3JpYmUgOjogY2FuX3N1YnNjcmliZSA9ICR7Y2FuX3N1YnNjcmliZX0gYCk7XG4gICAvLyAgICAgICBGQkluc3RhbnQucGxheWVyLnN1YnNjcmliZUJvdEFzeW5jKCkudGhlbigoKSA9PiB7XG4gICAvLyAgICAgICAgICB0aGlzLnN1YnNjcmliZUluZm8gPSAnYWNjZXB0ZWQnO1xuICAgLy8gICAgICAgICAgX0cuZGF0YS5zYXZlRGF0YSh7IHN1YnNjcmliZUluZm86IHRoaXMuc3Vic2NyaWJlSW5mbyB9KTtcbiAgIC8vICAgICAgICAgIC8vX0cuYW5hbHl0aWMub25TdWJzY3JpYmVEb25lKHRydWUpO1xuICAgLy8gICAgICAgICAgZmluYWxDYWxsYmFjaygpO1xuXG4gICAvLyAgICAgICB9KS5jYXRjaChlID0+IHtcbiAgIC8vICAgICAgICAgIC8vX0cuYW5hbHl0aWMub25TdWJzY3JpYmVEb25lKGZhbHNlKTtcbiAgIC8vICAgICAgICAgIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgICAgIH0pO1xuICAgLy8gICAgfSkuY2F0Y2goZSA9PiBmaW5hbENhbGxiYWNrKCkgfHwgXy5sb2coYCBhc2tCb3RTdWJzY3JpYmUgOjogY2FuU3Vic2NyaWJlQm90QXN5bmMoKS50aGVuKGZhaWwpID0+IGAsIGUpKTtcbiAgIC8vIH0sXG5cblxuICAgLy8gYXNrU2hvcnRjdXQoY2FsbGJhY2spIHtcbiAgIC8vICAgIC8vIF8ubG9nKGB0aGlzLnNob3J0Y3V0SW5mbz0ke3RoaXMuc2hvcnRjdXRJbmZvfWApO1xuICAgLy8gICAgY29uc3QgZmluYWxDYWxsYmFjayA9ICgpID0+IGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiBmaW5hbENhbGxiYWNrKCk7XG4gICAvLyAgICBpZiAoIV9HLnV0aWxzRkIuaXNTdXBwb3J0ZWRBUEkoXCJjYW5DcmVhdGVTaG9ydGN1dEFzeW5jXCIpIHx8ICFfRy51dGlsc0ZCLmlzU3VwcG9ydGVkQVBJKFwiY3JlYXRlU2hvcnRjdXRBc3luY1wiKSkgcmV0dXJuIGZpbmFsQ2FsbGJhY2soKTtcbiAgIC8vICAgIGlmICh0aGlzLnNob3J0Y3V0SW5mbyA9PSAnYWNjZXB0ZWQnIHx8IHRoaXMuc2hvcnRjdXRJbmZvIDw9IDApIHJldHVybiBmaW5hbENhbGxiYWNrKCk7XG4gICAvLyAgICB0aGlzLnNob3J0Y3V0SW5mby0tO1xuICAgLy8gICAgX0cuZGF0YS5zYXZlRGF0YSh7IHNob3J0Y3V0SW5mbzogdGhpcy5zaG9ydGN1dEluZm8gfSk7XG5cbiAgIC8vICAgIEZCSW5zdGFudC5jYW5DcmVhdGVTaG9ydGN1dEFzeW5jKCkudGhlbihjYW5DcmVhdGVTaG9ydGN1dCA9PiB7XG4gICAvLyAgICAgICBpZiAoIWNhbkNyZWF0ZVNob3J0Y3V0KSByZXR1cm4gZmluYWxDYWxsYmFjaygpO1xuICAgLy8gICAgICAgRkJJbnN0YW50LmNyZWF0ZVNob3J0Y3V0QXN5bmMoKS50aGVuKCgpID0+IHtcbiAgIC8vICAgICAgICAgIHRoaXMuc2hvcnRjdXRJbmZvID0gJ2FjY2VwdGVkJztcbiAgIC8vICAgICAgICAgIF9HLmRhdGEuc2F2ZURhdGEoeyBzaG9ydGN1dEluZm86IHRoaXMuc2hvcnRjdXRJbmZvIH0pO1xuICAgLy8gICAgICAgICAgZmluYWxDYWxsYmFjaygpO1xuXG4gICAvLyAgICAgICB9KS5jYXRjaCgoZSkgPT4gZmluYWxDYWxsYmFjaygpIHx8IF8ubG9nKCcgY3JlYXRlU2hvcnRjdXRBc3luYyA6OiAnLCBlKSk7XG4gICAvLyAgICB9KS5jYXRjaCgoZSkgPT4gZmluYWxDYWxsYmFjaygpIHx8IF8ubG9nKCcgY2FuQ3JlYXRlU2hvcnRjdXRBc3luYyA6OiAnLCBlKSk7XG4gICAvLyB9LFxuXG5cbiAgIC8vIHBvc3RTZXNzaW9uU2NvcmUoKSB7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybjtcbiAgIC8vICAgIGlmIChfRy51c2VyLnNjb3JlKSBGQkluc3RhbnQucG9zdFNlc3Npb25TY29yZShfRy51c2VyLnNjb3JlKTtcbiAgIC8vICAgIF8ubG9nKGAgcG9zdFNlc3Npb25TY29yZSBjYWxsZWQgc2NvcmUgPSAke19HLnVzZXIuc2NvcmV9YCk7XG4gICAvLyAgICBpZiAoX0cudXNlci5zY29yZSA+IChfRy5nYW1lLmJlc3RTZXNzaW9uU2NvcmUgfHwgMCkpIF9HLmdhbWUuYmVzdFNlc3Npb25TY29yZSA9IF9HLnVzZXIuc2NvcmU7XG4gICAvLyB9LFxuXG5cbiAgIC8vIGNyZWF0ZUNvbnRleHQocGxheWVySWQsIGNhbGxiYWNrU3VjY2VzcywgY2FsbGJhY2tGYWlsKSB7XG4gICAvLyAgICAvLyBfLmxvZyhgIGFib3V0IHRvIGNyZWF0ZSBjb250ZXh0IHdpdGggcGxheWVyICR7cGxheWVySWR9YCk7XG4gICAvLyAgICBpZiAoIXdpbmRvd1snRkJJbnN0YW50J10pIHJldHVybiAoY2FsbGJhY2tTdWNjZXNzKSAmJiBjYWxsYmFja1N1Y2Nlc3MoKTtcblxuICAgLy8gICAgY29uc3QgbG9nQ29udGV4dFJlc3VsdCA9IChyZXN1bHQsIGVycm9yKSA9PiB7XG4gICAvLyAgICAgICBpZiAocmVzdWx0KSBfLmxvZygnY3JlYXRlQ29udGV4dCBTdWNjZXNzID09PT0+ICcsIHJlc3VsdCk7XG4gICAvLyAgICAgICBpZiAoZXJyb3IpIF8ubG9nKCdjcmVhdGVDb250ZXh0IEZhaWwgID09PT0+ICcsIGVycm9yKTtcbiAgIC8vICAgIH1cbiAgIC8vICAgIEZCSW5zdGFudC5jb250ZXh0LmNyZWF0ZUFzeW5jKHBsYXllcklkKS50aGVuKFxuICAgLy8gICAgICAgKCkgPT4ge1xuICAgLy8gICAgICAgICAgaWYgKGNhbGxiYWNrU3VjY2VzcykgeyBjYWxsYmFja1N1Y2Nlc3MoKTsgfVxuICAgLy8gICAgICAgICAgbG9nQ29udGV4dFJlc3VsdCgnc3VjY2VzcycpO1xuICAgLy8gICAgICAgfSxcbiAgIC8vICAgICAgIChlKSA9PiB7XG4gICAvLyAgICAgICAgICBpZiAoY2FsbGJhY2tGYWlsKSB7IGNhbGxiYWNrRmFpbChlKTsgfVxuICAgLy8gICAgICAgICAgbG9nQ29udGV4dFJlc3VsdCgnZmFpbCcsIGUpO1xuICAgLy8gICAgICAgfVxuICAgLy8gICAgKTtcbiAgIC8vIH0sXG5cbn07Il19