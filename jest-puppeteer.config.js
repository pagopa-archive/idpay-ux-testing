module.exports = {
    launch: {
        dumpio: false,
        headless: process.env.HEADLESS == 'true',   // export HEADLESS=='false' to launch Chromium
        devtools: false,                               // optionally display devtools in non-headless mode
        // slowMo: 1000,                                  // optionally slow down typing
        defaultViewport: {                            // override default 800x600 pixel browser setting
            width: 1024,
            height: 768
        }
    }
};