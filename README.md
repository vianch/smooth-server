# smooth-server

A simple local development HTTP server optimized for productivity.

## Installation

#### Local Installation 
```sh
$ npm install smooth-server --save-dev
$ yarn add smooth-server --dev
```
After installing, add following "script" entry within your project's `package.json` file:  

```json
{
  "scripts": {
    "dev": "smooth-server"
  },
}
```
With the above script entry, you can then start `smooth-server` via:  
```sh
$ npm run dev
```
You can also specify a configuration file: 
```json
{
  "scripts": {
    "dev": "smooth-server --config path/config.json"
  },
}
```
If a config file is not found the default port will be `3333` and the listened files will be `["./**/*.{html,htm,css,js}"]`.

#### Global Installation
```sh
$ npm install -g smooth-server
```
You can run it directly from the command line: 
```sh
$ smooth-server
$ smooth-server --config path/smooth-server.config.json
```

## Custom Configuration

The default behavior serves from the current directory, opens a browser, and applies a HTML5 route fallback to `./index.html`.

`smooth-server` uses [BrowserSync](https://www.browsersync.io/), and allows for configuration overrides via a local `bs-config.json` or `bs-config.js` file in your project. If these files do not exist, it will use the default configuration.

You can provide custom path to your config file via `-c` or `--config=` command line options:
```sh
smooth-server -c configs/my-bs-config.js
```

#### Configuring via `bs-config.json` 
```json
{
  "port": 8081,
  "files": ["./www/**/*.{html,htm,css,js}"],
  "server": { "baseDir": "./src" }
}
```

#### Configuring via `bs-config.js`
This approach is more flexible and allows using JavaScript instead of a static JSON.
```js
module.exports = {
  server: {
    middleware: {
      // overrides the second middleware default with new settings
      1: require('connect-history-api-fallback')({index: '/index.html', verbose: true})
    }
  }
};
```

Full list of BrowserSync options can be found in its docs: <http://www.browsersync.io/docs/options/>

> **Note:** When using middleware overrides the specific middleware module must be installed in your project. For the above example, `connect-history-api-fallback` package needs to be installed in your project:

```sh
$ npm install connect-history-api-fallback --save-dev
```

Or else, you will get an error:
```shell
Error: Cannot find module 'connect-history-api-fallback'
```

> **TIP:** To remove one of the default middlewares such as `connect-logger`, set its array index to `null`:
```js
module.exports = {
  server: {
    middleware: {
      0: null     // removes default `connect-logger` middleware
    }
  }
};
```