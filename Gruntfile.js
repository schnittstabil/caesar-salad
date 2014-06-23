'use strict';

module.exports = function(grunt) {
  var browsers = grunt.file.readJSON('resources/browsers.json'),
      testname = 'caesar-salad ' + process.env.TRAVIS_BRANCH,
      build = testname + grunt.template.today(' yymmdd-HHMM');

  grunt.initConfig({
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },
    watch: {

    },
    'saucelabs-mocha': {
      es6: {
        options: {
          urls: [
            'http://127.0.0.1:9999/tests.html',
          ],
          testname: testname,
          build: build + ' es6',
          throttled: 1,
          browsers: browsers,
          tags: ['es6'],
        },
      },
    },
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) grunt.loadNpmTasks(key);
  }

  grunt.registerTask('default', ['connect', 'watch']);

  grunt.registerTask('test', ['connect', 'saucelabs-mocha']);
};
