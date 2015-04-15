"use strict";
'use strict';
var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var chai = require('chai');
var expect = chai.expect;
function execCli(cmd, cipher, password, input, done) {
  var temp = path.join(__dirname, 'resources/temp.dat'),
      args = [process.argv[0], path.join(__dirname, '../bin/caesar-salad.js'), cmd, '-d', '--cipher', cipher, '-i', path.join(__dirname, input), '-o', temp];
  if (password) {
    args.push('--password');
    args.push(password);
  }
  childProcess.exec(args.join(' '), function(error, stdout, stderr) {
    if (error) {
      done(error);
      return ;
    }
    if (stderr) {
      done(new Error(stderr));
      return ;
    }
    fs.readFile(temp, function(err, data) {
      if (err && err.code === 'ENOENT') {
        done(new Error('`' + args.join(' ') + '` does not create `' + temp + '`'));
        return ;
      }
      done(err, data);
    });
  });
}
describe('CLI', function() {
  [{
    title: 'caesar test',
    input: '/resources/0..127.dat',
    password: 'b',
    cipher: 'caesar',
    output: '/resources/0..127.dat.caesar.b'
  }, {
    title: 'rot13 test',
    input: '/resources/0..127.dat',
    cipher: 'rot13',
    output: '/resources/0..127.dat.rot13'
  }, {
    title: 'rot18 test',
    input: '/resources/0..127.dat',
    cipher: 'rot18',
    output: '/resources/0..127.dat.rot18'
  }, {
    title: 'rot47 test',
    input: '/resources/0..127.dat',
    cipher: 'rot47',
    output: '/resources/0..127.dat.rot47'
  }, {
    title: 'rot5 test',
    input: '/resources/0..127.dat',
    cipher: 'rot5',
    output: '/resources/0..127.dat.rot5'
  }, {
    title: 'vigenere test',
    input: '/resources/0..127.dat',
    password: 'abc',
    cipher: 'vigenere',
    output: '/resources/0..127.dat.vigenere.abc'
  }].forEach(function(test) {
    it(test.title + ' should be encrypted correctly', function(done) {
      execCli('enc', test.cipher, test.password, test.input, function(error, temp) {
        if (error) {
          throw error;
        }
        fs.readFile(path.join(__dirname, test.output), function(err, output) {
          if (err) {
            throw err;
          }
          expect(temp.toString()).to.equal(output.toString());
          done();
        });
      });
    });
    it(test.title + ' should be decrypted correctly', function(done) {
      execCli('dec', test.cipher, test.password, test.output, function(error, temp) {
        if (error) {
          throw error;
        }
        fs.readFile(path.join(__dirname, test.input), function(err, input) {
          if (err) {
            throw err;
          }
          expect(temp.toString()).to.equal(input.toString());
          done();
        });
      });
    });
  });
});
