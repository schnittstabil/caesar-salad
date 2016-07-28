'use strict';
const util = require('util');
const chalk = require('chalk');
const execa = require('execa');
const pkg = require('./package.json');

const defaultBrowsers = [
	['Windows 10', 'MicrosoftEdge', '13'],
	['Windows 10', 'chrome', '45'],
	['Windows 10', 'chrome', '52'],
	['Windows 10', 'firefox', '45'],
	['Windows 10', 'firefox', '47']
];

module.exports = function (grunt) {
	const hash = execa.shellSync('git rev-parse --short HEAD').stdout;
	const tags = execa.shellSync('git tag -l --contains HEAD').stdout.split(/\n/).sort();
	const browser = grunt.option('browser');
	const browsers = browser ? browser.split(':') : defaultBrowsers;

	grunt.initConfig({
		'connect': {
			server: {
				options: {
					base: '',
					port: 9999
				}
			}
		},
		'watch': {
		},
		'saucelabs-mocha': {
			all: {
				options: {
					urls: [
						'http://127.0.0.1:9999/test.html'
					],
					testname: pkg.name + (tags.length ? ' ' + tags.join('-') : ''),
					build: hash,
					public: tags.length ? 'public' : 'share',
					sauceConfig: {
						'record-video': false,
						'record-screenshots': true
					},
					throttled: 2,
					statusCheckAttempts: 1800,
					maxRetries: 3,
					tags: [pkg.name, hash],
					onTestComplete: function (result, cb) {
						if (!result.passed) {
							if (result.result && result.result.reports) {
								console.error(chalk.red('reports:'));

								result.result.reports.forEach(function (report) {
									var stack = report.stack;
									delete report.stack;
									console.error(util.inspect(report, {colors: true, showHidden: false, depth: null}));
									console.error(chalk.red(stack));
								});
							} else {
								console.error(chalk.red('no reports found'));
							}

							console.error(chalk.yellow('Want to rerun? Try:\n  grunt saucelabs --browser="' + result.platform.join(':') + '"'));
						}

						cb(null, result.passed);
					},
					browsers: browsers
				}
			}
		}
	});

	// Loading dependencies
	for (var key in grunt.file.readJSON('package.json').devDependencies) {
		if (key !== 'grunt' && key.indexOf('grunt') === 0) {
			grunt.loadNpmTasks(key);
		}
	}

	grunt.registerTask('outputBrowsers', 'output selected browsers', function () {
		console.error(chalk.yellow(util.inspect(browsers, {colors: true, depth: null})));
	});
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('saucelabs', ['outputBrowsers', 'connect', 'saucelabs-mocha']);
};
