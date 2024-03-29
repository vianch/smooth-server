const fallback = require('connect-history-api-fallback');
const log = require('connect-logger');

module.exports = {
    injectChanges: false, // workaround for Angular 2 styleUrls loading
    files: ['./**/*.{html,htm,css,js}'],
    watchOptions: {
        ignored: 'node_modules'
    },
    server: {
        baseDir: './',
        middleware: [
            log({ format: '%date %status %method %url' }),

            fallback({
                index: '/index.html',
                htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'] // systemjs workaround
            })
        ]
    }
}