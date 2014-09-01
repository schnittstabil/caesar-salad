#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
'use strict';
var chalk = require('chalk'),
    dateformat = require('dateformat'),
    jsonfile = require('jsonfile'),

    childProcess = require('child_process'),
    fs = require('fs'),
    path = require('path'),

    async = require('async'),
    once = require('once'),

    vinyl = require('vinyl-fs'),
    del = require('del'),
    cpy = require('cpy'),
    cpFile = require('cp-file'),

    jstransform = require('gulp-es6-module-jstransform'),
    traceur = require('gulp-traceur'),
    insert = require('gulp-insert'),
    gulpif = require('gulp-if'),

    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

function log() {
  var time = '[' + chalk.grey(dateformat(new Date(), 'HH:MM:ss')) + ']',
      args = Array.prototype.slice.call(arguments);
  args.unshift(time);
  console.log.apply(console, args);
}

function getTask(name) {
  return function task(done) {
    done = once(done || function() { });
    var path = name.split('.'),
        taskFn = exports;
    while (path.length > 0) {
      taskFn = taskFn[path.shift()];
    }
    log(chalk.cyan(name), 'started');
    if (typeof taskFn !== 'function') {
      throw new Error('Task \'' + name + '\' not found');
    }
    taskFn(function(err, result) {
      if (err) {
        log(chalk.cyan(name), chalk.red('errored:'), err.toString(), result);
        if (err.stack) {
          log(err.stack);
        }
        done(chalk.cyan(name) + ' ' + chalk.red('errored'));
      } else {
        log(chalk.cyan(name), 'completed');
        done();
      }
    });
  };
}

function spawn(taskName, done, command, args, options) {
  var process = childProcess.spawn(command, args, options);
  process.stdout.on('data', function (data) {
    log(chalk.cyan(taskName), data.toString().trim());
  });
  process.stderr.on('data', function (data) {
    log(chalk.cyan(taskName), chalk.red(data.toString().trim()));
  });
  process.on('close', function (code) {
    done(code === 0 ? null : new Error(taskName, code));
  });
}

function series(taskNames, done) {
  async.series(taskNames.map(function (name) {
    return typeof name === 'function' ? name : getTask(name);
  }), done);
}

function parallel(taskNames, done) {
  async.parallel(taskNames.map(function (name) {
    return typeof name === 'function' ? name : getTask(name);
  }), done);
}

function watch(glob, taskNames, done) {
  vinyl.watch(glob, {dot: true}, function() {
    series(taskNames, function() {});
  });
};

function pipe(streams, done) {
  done = once(done || function() { });
  streams = [].concat(streams); // force array
  streams.map(function(stream) {
    return stream.on('error', function(err) {
      done(err);
   });
  }).reduce(function(stream, next) {
    return stream.pipe(next);
  }).on('end', done).resume();
}

function transpile(dest, done) {
  var shebang = '#!/bin/sh\n' +
        '\':\' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"\n';

  parallel([
    function transpileSrcs(cb) {
      pipe([
        vinyl.src(['lib/**/*.js'], {base: 'lib'}),
        jstransform(),
        traceur(),
        gulpif(
          /lib\/caesar-salad.js$/,
          insert.prepend('require(\'./traceur-runtime\');\n')
        ),
        gulpif(
          /lib\/bin\/caesar-salad.js$/,
          insert.prepend(shebang + 'require(\'../traceur-runtime\');\n')
        ),
        vinyl.dest(dest)
      ], cb);
    },
    function copyRuntime(cb) {
      cpFile(traceur.RUNTIME_PATH, path.join(dest, '/traceur-runtime.js'), cb);
    },
  ], done);
}

function mkdirFn(path) {
  return function mkdir(done) {
    fs.exists(path, function (exists) {
      if (exists) {
        return done();
      }
      fs.mkdir(path, done);
    });
  };
}

exports.mkdirTarget = function mkdirTarget(done) {
  series([
    mkdirFn('target'),
    mkdirFn('target/commonjs'),
    mkdirFn('target/gh-pages'),
  ], done);
};

exports.clean = function clean(done) {
  del([
    'target/commonjs/*',
    'target/commonjs/.*', '!target/commonjs/.git*',
    'target/gh-pages/*',
    'target/gh-pages/.*', '!target/gh-pages/.git*',
  ], done);
};

exports.coverage = function coverage(done) {
  series([
    'coverage.clean',
    'mkdirTarget',
    'coverage.transpile',
    'coverage.run',
  ], done);
};
exports.coverage.clean = function coverageClean(done) {
  del([
    'target/gh-pages/coverage',
    'temp/coverage'
  ], done);
};
exports.coverage.transpile = function coverageTranspile(done) {
  transpile('temp/coverage', done);
};
exports.coverage.run = function coverageRun(done) {
  series([
    function copyRescources(cb) {
      cpy(['test/resources/**/*'], 'temp/coverage', {cwd: 'lib/'}, cb);
    },
    function instrument(cb) {
      pipe([
        vinyl.src(['*.js', '!traceur-runtime.js', '!polyfills.js'], {cwd: 'temp/coverage'}),
        istanbul(),
      ], cb);
    },
    function test(cb) {
      pipe([
        vinyl.src('test/**/*_test.js', {cwd: 'temp/coverage'}),
        mocha({reporter: 'dot'}),
        istanbul.writeReports({
          dir: 'target/gh-pages/coverage',
          reporters: ['html', 'lcovonly', 'text']
        })
      ], cb);
    }
  ], done);
};
exports.coverage.watch = function coverageWatch(done) {
  watch(['lib/**/*.js', 'bin/**/*.js'], ['coverage'], done);
};

exports.api = function api(done) {
    series([
    'api.clean',
    'mkdirTarget',
    'api.run',
  ], done);
};
exports.api.clean = function apiClean(done) {
  del([
    'target/gh-pages/api',
  ], done);
};
exports.api.run = function apiRun(done) {
  spawn('api', done, 'node_modules/.bin/yuidoc', ['--configfile', 'yuidoc.json']);
}
exports.api.watch = function apiWatch(done) {
  spawn('api', done, 'node_modules/.bin/yuidoc', ['--configfile', 'yuidoc.json', '--server', '3000', 'lib/']);
}

exports.doc = function doc(done) {
  parallel([
    'api',
    'coverage',
  ], done);
};

exports.commonjs = function commonjs(done) {
  series([
    'commonjs.clean',
    'mkdirTarget',
    'commonjs.packageJson',
    'commonjs.transpile',
    function copyRescources(cb) {
      cpy(['test/resources/**/*'], 'target/commonjs/', {cwd: 'lib/'}, cb);
    },
    function copyBasics(cb) {
      cpy(['README.md', 'LICENSE'], 'target/commonjs/', cb);
    },
  ], done);
};
exports.commonjs.clean = function commonjsClean(done) {
  del([
    'target/commonjs/*',
    'target/commonjs/.*',
    '!target/commonjs/.git*',
  ], done);
};
exports.commonjs.transpile = function commonjsTranspile(done) {
  transpile('target/commonjs', done);
};
exports.commonjs.packageJson = function commonjsPackageJson(done) {
  async.waterfall([
    function (cb) {
      cb(null, 'package.json');
    },
    jsonfile.readFile,
    function (packageJson, cb) {
      var devDependencies = packageJson.devDependencies;
      packageJson.devDependencies = {
        'chai' : devDependencies.chai,
        'mocha' : devDependencies.mocha,
      };
      packageJson.scripts.test = 'mocha --require traceur-runtime.js';
      delete packageJson['private'];
      packageJson.main = 'caesar-salad.js';
      packageJson.bin = {
        'caesar-salad': 'bin/caesar-salad.js',
      };
      cb(null, 'target/commonjs/package.json', packageJson);
    },
    jsonfile.writeFile
  ], done);
};

exports.dist = function dist(done) {
  parallel([
    'commonjs',
    'doc',
  ], done);
};

// poor man's taskrunner:
if (require.main === module) {
  series(process.argv.slice(2), function(err) {
    if (err) {
      log(chalk.red('Error:'), err.toString());
      // wait for more log entries
      setTimeout(function() {
        process.exit(1);
      }, 100);
    }
  });
}
