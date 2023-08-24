'use strict';

const browserSync = require("browser-sync").create("smooth-server");
const minimist =  require('minimist');
const path = require('path');
const configDefault = require("./config-defaults");
const merge = require('lodash').merge;

module.exports = class SmoothServer {
    constructor() {
      this.initOptions();
      this.initServer();
    }

    initServer() {
        if (this.overrides) {
            merge(configDefault, this.overrides);
        }
        browserSync.init(configDefault);
    }

    initOptions() {
        const argv  = minimist(process.argv.slice(2));
        const configFile = argv.c ?? argv.config ?? 'browser-sync.config.json';  // browserSync configs options https://www.browsersync.io/docs/options
        const defaultConfig = {
            "port": 3333,
            "files": ["./**/*.{html,htm,css,js}"],
            "server": { "baseDir": "./" }
        };
        this.overrides = {}

        try {
            this.overrides = require(path.resolve(configFile ?? defaultConfig));
        } catch (error) {
            if (error.code && error.code === 'MODULE_NOT_FOUND') {
                console.error( 'ERROR IN CONFIG, Using lite-server defaults...');
            } else {
                throw (error);
            }
        }
    }
}