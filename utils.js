/**
 * Snippets from mocha's `utils.js`
 *
 * - [LICENSE](https://raw.github.com/visionmedia/mocha/master/LICENSE)
 */

/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var join = path.join;
var debug = require('debug')('mini-livereload:watch');

/**
 * Ignored directories.
 */

var ignore = ['node_modules', '.git', 'components', 'build'];

/**
 * Accepted extentions.
 */

var accept = ['js', 'css', 'json'];


/**
 * Watch the given `files` for changes
 * and invoke `fn(file)` on modification.
 *
 * @param {Array} files
 * @param {Function} fn
 * @api private
 */

exports.watch = function(files, fn){
  var options = { interval: 100 };
  files.forEach(function(file){
    debug('file %s', file);
    fs.watchFile(file, options, function(curr, prev){
      if (prev.mtime < curr.mtime) fn(file);
    });
  });
};

/**
 * Ignored files.
 */

function ignored(path){
  return !~ignore.indexOf(path);
}

/**
 * Lookup files in the given `dir`.
 *
 * @return {Array}
 * @api private
 */

exports.files = function(dir, ret, extensions){
  
  ret = ret || [];
  extensions = extensions.concat(accept);

  var match = new RegExp('\\.(' + extensions.join('|') + ')$');

  fs.readdirSync(dir)
  .filter(ignored)
  .forEach(function(path){
    path = join(dir, path);
    if (fs.statSync(path).isDirectory()) {
      exports.files(path, ret, extensions);
    } else if (path.match(match)) {
      ret.push(path);
    }
  });

  return ret;
};

