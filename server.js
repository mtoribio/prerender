#!/usr/bin/env node
var prerender = require('./lib');

const server = prerender({
  port: 5000,
  // logRequests: true,
  pageLoadTimeout: 1000 * 60 * 5,
  waitAfterLastRequest: 250,
  pageDoneCheckInterval: 1000 * 30,
  // chromeLocation: '/usr/bin/chromium-browser',
  chromeFlags: [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    '--incognito',
    // '--auto-open-devtools-for-tabs'
    // '--hide-scrollbars'@@
  ]
});

server.use(prerender.sendPrerenderHeader());
server.use(prerender.blockResources());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());

server.start();
