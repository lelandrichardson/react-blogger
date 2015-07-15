var { Map } = require('immutable');
var escape = require('lodash/string/escape');
var worker;
var cache;
var subscribers = [];
var UNCACHED = {};
var INPROGRESS = {};

if (__CLIENT__) {
    if (window.Worker) {
        cache = Map();
        worker = new Worker("/assets/HighlightWorker.js");

        worker.onmessage = function ( event ) {
            const { code, parsed } = event.data;
            cache = cache.set(code, parsed);
            AsyncHighlighter.emitChange();
        };

    } else {
        // if browser doesn't support worker, we are going to just return a mock
        // API that just doesn't bother highlighting
        var timeout;
        worker = {
            postMessage: function () {}
        };
    }
}

var AsyncHighlighter = {
    highlight(code) {
        if (__SERVER__) {
            // do simple escape server side
            return escape(code);
        } else {
            // check for cached version...
            var parsed = cache.get(code, UNCACHED);
            if (parsed === UNCACHED || parsed === INPROGRESS) {
                // run syntax highlighting in the web worker, but only do it once
                if (parsed !== INPROGRESS) {
                    worker.postMessage({ code });
                    cache = cache.set(code, INPROGRESS);
                }
                return escape(code);
            } else {
                return parsed;
            }
        }
    },
    on(fn) {
        subscribers.push(fn);
    },
    off(fn) {
        const i = subscribers.indexOf(fn);
        if (i >= 0) {
            subscribers.splice(i, 1);
        }
    },
    emitChange() {
        subscribers.forEach(fn => fn());
    }
};

module.exports = AsyncHighlighter;