#!/usr/bin/env node
var prerender = require('./lib');
const os = require('os');

var chromeLocation = '/usr/bin/chromium-browser';

if (os.platform() == 'darwin')
    chromeLocation = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'; // for local MacOs standard Chrome

const server = prerender({
    port: 5000,
    // logRequests: true,
    pageLoadTimeout: 1000 * 60 * 5,
    waitAfterLastRequest: 250,
    pageDoneCheckInterval: 500,
    chromeLocation: chromeLocation,
    chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--remote-debugging-port=9222',
        '--incognito',
        '--silent-launch',
        '--window-size=1024,768'
        // '--auto-open-devtools-for-tabs'
        // '--hide-scrollbars'@@
    ]
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
