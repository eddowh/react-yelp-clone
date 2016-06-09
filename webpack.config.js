const dotenv   = require('dotenv');
const NODE_ENV = process.env.NODE_ENV;

const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

require('babel-register');

// Environments settings
const isDev    = NODE_ENV === 'development';
const isTest   = NODE_ENV === 'test';


/**
 * `hjs-webpack` exports a single function that accepts a single argument,
 * an object that defines some simple configuration to define a required
 * webpack configuration.
 */
const getConfig = require('hjs-webpack');


/* START Path variables */
const root    = resolve(__dirname),
      src     = join(root, 'src'),
      modules = join(root, 'node_modules'),
      dest    = join(root, 'dist');
/* END Path variables */


/* Initial Config */
var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true  // blow away any previously built files
})


/* START Environment variables */
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
        .reduce((memo, key) => {
          const val = JSON.stringify(envVariables[key]);
          memo[`__${key.toUpperCase()}__`] = val;
          return memo;
        }, {
          __NODE_ENV__: JSON.stringify(NODE_ENV)
        });

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);
/* END Environment variables */


/* START CSS modules */
// Dynamic naming scheme of CSS
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

// Load the initial loader by finding it in the array of
// `config.module.loaders` with regex
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
}

const cssloader = findLoader(config.module.loaders, matchCssLoaders);

// Create a new loader as well as modify existing loader to support
// loading css modules
const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: cssloader.loader
    .replace(matchCssLoaders,
             `$1$2?modules&localIdentName=${cssModulesNames}$3`)
})

config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`)
cssloader.loader = newloader.loader

config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
})
/* END CSS modules */


/* START PostCSS */
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
])
/* END PostCSS */


/* START Resolving root paths */
config.resolve.root = [src, modules]
config.resolve.alias = {
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils')
}
/* END Resolving root paths */


/* Testing configuration */
if (isTest) {
  config.externals = {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true
  }

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/)

    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(fnName[1]);
    return idx < 0;
  })
}


/* Export (finally) */
module.exports = config;
