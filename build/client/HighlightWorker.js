self.window = self; // required to make highlight.js not throw an error...
importScripts('//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js');

onmessage = function ( event ) {
    postMessage({
        code: event.data.code,
        parsed: hljs.highlightAuto(event.data.code).value
    });
};