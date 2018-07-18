#!/usr/bin/env node
var prerender = require('./lib');
const memoryCache = require('cache');

var server = prerender({
    port: 5000,
    logRequests: true,
    pageLoadTimeout: 1000000,
    waitAfterLastRequest: 250,
    chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        // '--hide-scrollbars'
    ]
});

server.use(prerender.sendPrerenderHeader());
// server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.use(memoryCache);

server.start();
