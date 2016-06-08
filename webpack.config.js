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

module.exports = config;
