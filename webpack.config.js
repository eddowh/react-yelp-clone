const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

/**
 * `hjs-webpack` exports a single function that accepts a single argument,
 * an object that defines some simple configuration to define a required
 * webpack configuration.
 */
const getConfig = require('hjs-webpack');


/* Path variables */
const root    = resolve(__dirname),
      src     = join(root, 'src'),
      modules = join(root, 'node_modules'),
      dest    = join(root, 'dist');


/* Environments settings */
const NODE_ENV = process.env.NODE_ENV,
      isDev    = NODE_ENV === 'development';


/* Main Config */
var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true  // blow away any previously built files
})

// Dynamic naming scheme of CSS
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

/**
 * Load the initial loader by finding it in the array of
 * `config.module.loaders` with regex
 */
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
}

const cssloader = findLoader(config.module.loaders, matchCssLoaders);

/**
 * Create a new loader as well as modify existing loader to support
 * loading css modules
 */
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

// PostCSS
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
])

/* Export (finally) */
module.exports = config;
