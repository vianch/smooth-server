# smooth-server

## Installation and Usage

The recommended installation method is a local NPM install for your project:
```bash
$ npm install smooth-server --save-dev
```

...and add a "script" entry within your project's `package.json` file:
```
# Inside package.json...
  "scripts": {
    "dev": "smooth-server"
  },

    "scripts": {
      "dev": "smooth-server --config path/config.json"
    },
```

With the above script entry, you can then start `smoot-server` via:
```bash
$ npm run dev
```

### Global Installation

smoot-server can be also installed globally, if preferred:
```bash
$ npm install -g smoot-server

# To run:
$ smooth-server
$ smooth-server --config path/smooth-server.config.json
```

## Custom Configuration

The default behavior serves from the current folder, opens a browser, and applies a HTML5 route fallback to `./index.html`.

smoot-server uses [BrowserSync](https://www.browsersync.io/), and allows for configuration overrides via a local `bs-config.json` or `bs-config.js` file in your project.

You can provide custom path to your config file via `-c` or `--config=` run time options:
```bash
smooth-server -c configs/my-bs-config.js
```

For example, to change the server port, watched file paths, and base directory for your project, create a `bs-config.json` in your project's folder:
```json
{
  "port": 8081,
  "files": ["./www/**/*.{html,htm,css,js}"],
  "server": { "baseDir": "./src" }
}
```

A more complicated example with modifications to the server middleware can be done with a `bs-config.js` file, which requires the `module.exports = { ... };` syntax:
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

The `bs-config.js` file may also export a function that receives the smoot-server Browsersync instance as its only argument. While not required, the return value of this function will be used to extend the default smoot-server configuration.
```js
module.exports = function(bs) {

  return {
    server: {
      middleware: {
        // overrides the second middleware default with new settings
        1: require('connect-history-api-fallback')({
          index: '/index.html',
          verbose: true
        })
      }
    }
  };

};
```

**NOTE:** Keep in mind that when using middleware overrides the specific middleware module must be installed in your project. For the above example, you'll need to do:
```bash
$ npm install connect-history-api-fallback --save-dev
```

...otherwise you'll get an error similar to:
```
Error: Cannot find module 'connect-history-api-fallback'
```

Another example: To remove one of the [default middlewares](./lib/config-defaults.js), such as `connect-logger`, you can set it's array index to `null`:

```js
module.exports = {
  server: {
    middleware: {
      0: null     // removes default `connect-logger` middleware
    }
  }
};
```

A list of the entire set of BrowserSync options can be found in its docs: <http://www.browsersync.io/docs/options/>
