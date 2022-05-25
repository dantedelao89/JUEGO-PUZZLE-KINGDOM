
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/services/analytic.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b0b73wpc/tKmot33I4RsZqt', 'analytic');
// script/services/analytic.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytic = void 0;
var _G = require("../system/all_modules");
var _ = _G._, $ = _G.$;
exports.analytic = {
    init: function () {
    },
    log: function (eventName, value) {
        // if (!window['firebaseLogEvent']) return;
        // window['firebaseLogEvent'](eventName, value);
    },
    logPageView: function () {
        // --- fb pixel
        if (window['fbq']) {
            window['fbq']('track', 'PageView');
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('PageView');
        }
    },
    logPageViewFromFeed: function (puzzleId) {
        if (!puzzleId)
            return;
        var _a = puzzleId.split('_'), content_category = _a[0], content_name = _a[1];
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelShare (${content_category}, ${content_name}) `);
            window['fbq']('trackCustom', 'pageview_f', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('pageview_f', { content_category: content_category, content_name: content_name });
        }
    },
    logViewContent: function (content_category, content_name) {
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelViewContent (${content_category}, ${content_name}) `);
            window['fbq']('track', 'ViewContent', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('ViewContent', { content_category: content_category, content_name: content_name });
        }
    },
    logShare: function (content_category, content_name) {
        // --- fb pixel
        if (window['fbq']) {
            // _.log(` logPixelShare (${content_category}, ${content_name}) `);
            window['fbq']('trackCustom', 'Share', { content_category: content_category, content_name: content_name });
        }
        // --- google analytic
        if (window['firebaseLogEvent']) {
            window['firebaseLogEvent']('Share', { content_category: content_category, content_name: content_name });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHQvc2VydmljZXMvYW5hbHl0aWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMENBQTRDO0FBQ3BDLElBQUEsQ0FBQyxHQUFRLEVBQUUsRUFBVixFQUFFLENBQUMsR0FBSyxFQUFFLEVBQVAsQ0FBUTtBQUVQLFFBQUEsUUFBUSxHQUFHO0lBRXJCLElBQUk7SUFDSixDQUFDO0lBRUQsR0FBRyxFQUFILFVBQUksU0FBUyxFQUFFLEtBQU07UUFDbEIsMkNBQTJDO1FBQzNDLGdEQUFnRDtJQUNuRCxDQUFDO0lBRUQsV0FBVztRQUNSLGVBQWU7UUFDZixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDSixDQUFDO0lBRUQsbUJBQW1CLFlBQUMsUUFBUTtRQUN6QixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFDaEIsSUFBQSxLQUFtQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFyRCxnQkFBZ0IsUUFBQSxFQUFFLFlBQVksUUFBdUIsQ0FBQztRQUU3RCxlQUFlO1FBQ2YsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEIsbUVBQW1FO1lBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsc0JBQXNCO1FBQ3RCLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDN0IsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQy9FO0lBQ0osQ0FBQztJQUdELGNBQWMsWUFBQyxnQkFBZ0IsRUFBRSxZQUFZO1FBQzFDLGVBQWU7UUFDZixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNoQix5RUFBeUU7WUFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxnQkFBZ0Isa0JBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7U0FDNUU7UUFFRCxzQkFBc0I7UUFDdEIsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUM3QixNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxnQkFBZ0Isa0JBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7U0FDaEY7SUFDSixDQUFDO0lBRUQsUUFBUSxZQUFDLGdCQUFnQixFQUFFLFlBQVk7UUFDcEMsZUFBZTtRQUNmLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hCLG1FQUFtRTtZQUNuRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQztTQUM1RTtRQUVELHNCQUFzQjtRQUN0QixJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixrQkFBQSxFQUFFLFlBQVksY0FBQSxFQUFFLENBQUMsQ0FBQztTQUMxRTtJQUNKLENBQUM7Q0FFSCxDQUFBIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgX0cgZnJvbSAnLi4vc3lzdGVtL2FsbF9tb2R1bGVzJztcbmNvbnN0IHsgXywgJCB9ID0gX0c7XG5cbmV4cG9ydCBjb25zdCBhbmFseXRpYyA9IHtcblxuICAgaW5pdCgpIHtcbiAgIH0sXG5cbiAgIGxvZyhldmVudE5hbWUsIHZhbHVlPykge1xuICAgICAgLy8gaWYgKCF3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkgcmV0dXJuO1xuICAgICAgLy8gd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oZXZlbnROYW1lLCB2YWx1ZSk7XG4gICB9LFxuXG4gICBsb2dQYWdlVmlldygpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1BhZ2VWaWV3Jyk7XG4gICAgICB9XG4gICB9LFxuXG4gICBsb2dQYWdlVmlld0Zyb21GZWVkKHB1enpsZUlkKSB7XG4gICAgICBpZiAoIXB1enpsZUlkKSByZXR1cm47XG4gICAgICBjb25zdCBbY29udGVudF9jYXRlZ29yeSwgY29udGVudF9uYW1lXSA9IHB1enpsZUlkLnNwbGl0KCdfJyk7XG5cbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxTaGFyZSAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrQ3VzdG9tJywgJ3BhZ2V2aWV3X2YnLCB7IGNvbnRlbnRfY2F0ZWdvcnksIGNvbnRlbnRfbmFtZSB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gLS0tIGdvb2dsZSBhbmFseXRpY1xuICAgICAgaWYgKHdpbmRvd1snZmlyZWJhc2VMb2dFdmVudCddKSB7XG4gICAgICAgICB3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSgncGFnZXZpZXdfZicsIHsgY29udGVudF9jYXRlZ29yeSwgY29udGVudF9uYW1lIH0pO1xuICAgICAgfVxuICAgfSxcblxuXG4gICBsb2dWaWV3Q29udGVudChjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxWaWV3Q29udGVudCAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrJywgJ1ZpZXdDb250ZW50JywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1ZpZXdDb250ZW50JywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG4gICB9LFxuXG4gICBsb2dTaGFyZShjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUpIHtcbiAgICAgIC8vIC0tLSBmYiBwaXhlbFxuICAgICAgaWYgKHdpbmRvd1snZmJxJ10pIHtcbiAgICAgICAgIC8vIF8ubG9nKGAgbG9nUGl4ZWxTaGFyZSAoJHtjb250ZW50X2NhdGVnb3J5fSwgJHtjb250ZW50X25hbWV9KSBgKTtcbiAgICAgICAgIHdpbmRvd1snZmJxJ10oJ3RyYWNrQ3VzdG9tJywgJ1NoYXJlJywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIC0tLSBnb29nbGUgYW5hbHl0aWNcbiAgICAgIGlmICh3aW5kb3dbJ2ZpcmViYXNlTG9nRXZlbnQnXSkge1xuICAgICAgICAgd2luZG93WydmaXJlYmFzZUxvZ0V2ZW50J10oJ1NoYXJlJywgeyBjb250ZW50X2NhdGVnb3J5LCBjb250ZW50X25hbWUgfSk7XG4gICAgICB9XG4gICB9LFxuXG59Il19