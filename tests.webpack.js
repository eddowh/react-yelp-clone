/**
 * Serves as the middleware between karma and webpack.
 *
 * This file will be used to load all of the spec files, compiled through webpack.
 */


require('babel-polyfill');
// some setup first

var chai = require('chai');
var chaiEnzyme = require('chai-enzyme');

chai.use(chaiEnzyme());

var context = require.context('./src', true, /\.spec\.js$/);
context.keys().forEach(context);
