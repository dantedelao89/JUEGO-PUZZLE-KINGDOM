"use strict";
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