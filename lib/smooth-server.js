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
        let argv  = minimist(process.argv.slice(2));
        let configFile = argv.c || argv.config || 'browser-sync.config.json';  // browserSync configs options https://www.browsersync.io/docs/options
        this.overrides = {}

        try {
            this.overrides = require(path.resolve(configFile));
        } catch (error) {
            if (error.code && error.code === 'MODULE_NOT_FOUND') {
               console.error( 'Did not detect a config file, Using lite-server defaults...');
            } else {
                throw (error);
            }
        }
    }
}