var fs = require('fs'),
    traceur = require('traceur');
    crypto = require('crypto'),
    cache = Object.create(null);

exports = module.exports = function (options) {
  options = options || {sourceMaps: true};

  return function tranceur(file, done) {
    if (file.extension.toLowerCase() !== 'js'){
      return done();
    }

    file.read(function (err, string) {
      if (err) {
        return done(err);
      }

      var hash = file.filename + '#' + crypto.createHash('sha256').update(string).digest('hex');
      var traceurOpts = {
        filename: file.filename,
        sourceMaps: options.sourceMaps,
        modules: 'commonjs'
      };
      var result;
      try {
        result = cache[hash] = cache[hash] || traceur.compile(string, traceurOpts);
      } catch (err) {
        done(err);
        return;
      }

      if (traceurOpts.sourceMaps) {
        // rewrite source map
        var map = JSON.parse(result.generatedSourceMap);
        map.sources[0] = file.filename;
        map.sourcesContent = [string];

        file.string = result.js;
        file.sourceMap = JSON.stringify(map);
        file.originalString = string;
      }

      done();
    });
  };
};
