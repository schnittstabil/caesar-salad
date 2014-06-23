'use strict';
var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  return filename.indexOf('node_modules') === -1;
});
module.exports = require('./lib/caesar-salad')['default'];
