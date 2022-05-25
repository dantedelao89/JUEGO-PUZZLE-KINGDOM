
(function () {
var scripts = [{"deps":{"./assets/script/services/extra-components/NestableScrollView_Outer":1,"./assets/script/system_data/system_data":10,"./assets/script/services/extra-components/NestableScrollView_Inner":21,"./assets/script/system/localization/localize_message":34,"./assets/script/core-game/map_visual":3,"./assets/script/levels/level_manager":4,"./assets/script/social/share":6,"./assets/script/system/localization/language-files/de_DE":2,"./assets/script/control/control":9,"./assets/script/core-game/game_mechanic":11,"./assets/script/core-game/tutorial":12,"./assets/script/core-game/settings":13,"./assets/script/core-game/category_list":14,"./assets/script/services/inter_ad":15,"./assets/script/services/utils_facebook":16,"./assets/script/services/video":17,"./assets/script/services/analytic":19,"./assets/script/services/audio":20,"./assets/script/services/utils/utils_anim_fx":5,"./assets/script/social/social":26,"./assets/script/social/message":27,"./assets/script/system/app_events":28,"./assets/script/system/resources_manager":29,"./assets/script/system/user":30,"./assets/script/system/all_modules":32,"./assets/script/system/configurations/system_types":7,"./assets/script/system/project_init_comp":42,"./assets/script/system/ui-fx/core_fx":8,"./assets/script/core-game/game_flow":50,"./assets/script/services/extra-components/visible_frame_collider_comp":18,"./assets/script/services/utils/utils_coordinate":22,"./assets/script/services/utils/utils_data":23,"./assets/script/services/utils/utils_ui":24,"./assets/script/services/utils/free_button_comp":25,"./assets/script/services/utils/utils_common":31,"./assets/script/system/configurations/config_game":33,"./assets/script/services/utils/utils_time":38,"./assets/script/system/localization/localize":46,"./assets/script/system/ui-fx/core_ui":48,"./assets/script/system/ui-fx/bind_button_handlers":49,"./assets/script/system/localization/language-files/it_IT":37,"./assets/script/system/localization/language-files/en_US":35,"./assets/script/system/localization/language-files/id_ID":39,"./assets/script/system/localization/language-files/th_TH":40,"./assets/script/system/localization/language-files/tr_TR":41,"./assets/script/system/localization/language-files/pt_PT":43,"./assets/script/system/localization/language-files/vi_VN":44,"./assets/script/system/localization/language-files/es_ES":36,"./assets/script/system/localization/language-files/fr_FR":45,"./assets/script/system/localization/language-files/ar_AR":47},"path":"preview-scripts/__qc_index__.js"},{"deps":{"NestableScrollView_Inner":21},"path":"preview-scripts/assets/script/services/extra-components/NestableScrollView_Outer.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/de_DE.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/map_visual.js"},{"deps":{"../system/all_modules":32,"../system_data/system_data":10},"path":"preview-scripts/assets/script/levels/level_manager.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/utils_anim_fx.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/social/share.js"},{"deps":{"../all_modules":32},"path":"preview-scripts/assets/script/system/configurations/system_types.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/system/ui-fx/core_fx.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/control/control.js"},{"deps":{},"path":"preview-scripts/assets/script/system_data/system_data.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/game_mechanic.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/tutorial.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/settings.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/category_list.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/services/inter_ad.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils_facebook.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/services/video.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/extra-components/visible_frame_collider_comp.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/services/analytic.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/services/audio.js"},{"deps":{},"path":"preview-scripts/assets/script/services/extra-components/NestableScrollView_Inner.js"},{"deps":{"../../system/all_modules":32,"./utils_common":31},"path":"preview-scripts/assets/script/services/utils/utils_coordinate.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/utils_data.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/utils_ui.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/free_button_comp.js"},{"deps":{"../system/all_modules":32,"../social/share":6,"../social/message":27},"path":"preview-scripts/assets/script/social/social.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/social/message.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/system/app_events.js"},{"deps":{"./all_modules":32},"path":"preview-scripts/assets/script/system/resources_manager.js"},{"deps":{"./all_modules":32},"path":"preview-scripts/assets/script/system/user.js"},{"deps":{"./utils_time":38,"./utils_coordinate":22,"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/utils_common.js"},{"deps":{"./configurations/system_types":7,"../services/utils/utils_common":31,"./configurations/config_game":33,"../levels/level_manager":4,"../services/utils/utils_data":23,"../services/utils/utils_ui":24,"../services/utils/utils_anim_fx":5,"../services/audio":20,"../services/analytic":19,"../system/app_events":28,"../system/ui-fx/core_fx":8,"../system/resources_manager":29,"../system/user":30,"../system/ui-fx/core_ui":48,"../system/localization/localize":46,"../core-game/settings":13,"../core-game/game_mechanic":11,"../core-game/map_visual":3,"../core-game/category_list":14,"../core-game/tutorial":12,"../core-game/game_flow":50,"../services/utils_facebook":16,"../services/video":17,"../services/inter_ad":15,"../social/social":26,"../control/control":9},"path":"preview-scripts/assets/script/system/all_modules.js"},{"deps":{"../all_modules":32,"../../system_data/system_data":10},"path":"preview-scripts/assets/script/system/configurations/config_game.js"},{"deps":{},"path":"preview-scripts/assets/script/system/localization/localize_message.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/en_US.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/es_ES.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/it_IT.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/services/utils/utils_time.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/id_ID.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/th_TH.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/tr_TR.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/system/project_init_comp.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/pt_PT.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/vi_VN.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/fr_FR.js"},{"deps":{"en_US":35,"../../system/all_modules":32,"./localize_message":34},"path":"preview-scripts/assets/script/system/localization/localize.js"},{"deps":{"../../../system/all_modules":32},"path":"preview-scripts/assets/script/system/localization/language-files/ar_AR.js"},{"deps":{"../../system/all_modules":32,"./bind_button_handlers":49},"path":"preview-scripts/assets/script/system/ui-fx/core_ui.js"},{"deps":{"../../system/all_modules":32},"path":"preview-scripts/assets/script/system/ui-fx/bind_button_handlers.js"},{"deps":{"../system/all_modules":32},"path":"preview-scripts/assets/script/core-game/game_flow.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    