var del = require('del'),
    mkdirp = require('mkdirp');

  del.sync(['build']);
  mkdirp.sync('build');

var fs = require('fs'),
    resolve = require('component-resolver'),
    build = require('component-builder'),
    traceur = require('./builder-traceur'),
    traceurRuntime = fs.readFileSync('node_modules/traceur/bin/traceur-runtime.js');

resolve(process.cwd(), {
  install: true
}, function (err, tree) {
  if (err) {
    throw err;
  }

  build.scripts(tree)
    .use('scripts', build.plugins.js())
    .use('scripts', traceur())
    .end(function (err, string) {
      if (err) {
        throw err;
      }
      if (!string) {
        string = '';
      }
      string =
        '// --- traceurRuntime ---\n' + traceurRuntime + '\n' +
        '// --- require ---\n' + build.scripts.require + '\n' +
        '// --- ' + tree.name + ' ---\n' + string + '\n' +
        'require("' + tree.name + '");';

      fs.writeFileSync('build/build.js', string, 'utf8');
    });
});
