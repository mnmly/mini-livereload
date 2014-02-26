/**
 * Module dependencies
 */

var lr = require('tiny-lr');
var utils = require('./utils');

module.exports = function(params){

  params = params || {};

  var extensions = params.extensions || [];
  var cwd = params.cwd || process.cwd();
  var files = utils.files(cwd, [], extensions);
  var livereload = lr(params);

  utils.watch(files, function(f){
    livereload.changed({body: {files: [f]}});
  });

  return livereload;
};
