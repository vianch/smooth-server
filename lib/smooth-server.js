'use strict';

const browserSync = require("browser-sync").create("smooth-server");
const minimist = require('minimist');
const path = require('path');
const configDefault = require("./config-defaults");
const merge = require('lodash/merge');

module.exports = class SmoothServer {
  constructor() {
    this.overrides = this.initOptions();
    this.initServer();
  }

  initServer() {
    const config = merge({}, configDefault, this.overrides);
    browserSync.init(config);
  }

  initOptions() {
    const argv = minimist(process.argv.slice(2));
    const configFile = argv.c || argv.config || 'browser-sync.config.json';  
    const defaultConfigPath = path.resolve(configFile) || path.join(process.cwd(), configFile);
    const defaultConfig = {
      "port": 3333,
      "files": ["./**/*.{html,htm,css,js}"],
      "server": { "baseDir": "./" }
    };

    let overrides = defaultConfig;
    
    try {
      overrides = require(defaultConfigPath);
    } catch (error) {
      if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
      } else {
        console.error('ERROR IN CONFIG, Using lite-server defaults...');
      }
    }
    return overrides;
  }
}