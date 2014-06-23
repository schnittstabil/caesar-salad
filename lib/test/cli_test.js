'use strict';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import chai from 'chai';
var expect = chai.expect;

function execCli(cmd, cipher, password, input, done) {
  var temp = path.join(__dirname, 'resources/temp.dat'),
      args = [
        process.argv[0],
        path.join(__dirname, '../bin/caesar-salad.js'),
        cmd,
        '--cipher', cipher,
        '-i', path.join(__dirname, input),
        '-o', temp,
      ];
    if (password) {
      args.push('--password');
      args.push(password);
    }
  childProcess.exec(args.join(' '), function (error, stdout, stderr) {
    if (error) {
      throw error;
    }
    fs.readFile(temp, function (erro, data) {
      done(erro, data);
    });
  });
}

describe('CLI', function() {
  [
    {
      title: 'caesar test',
      input:  '/resources/0..127.dat',
      password: 'b',
      cipher: 'caesar',
      output: '/resources/0..127.dat.caesar.b',
    },
    {
      title: 'rot13 test',
      input:  '/resources/0..127.dat',
      cipher: 'rot13',
      output: '/resources/0..127.dat.rot13',
    },
    {
      title: 'rot18 test',
      input:  '/resources/0..127.dat',
      cipher: 'rot18',
      output: '/resources/0..127.dat.rot18',
    },
    {
      title: 'rot47 test',
      input:  '/resources/0..127.dat',
      cipher: 'rot47',
      output: '/resources/0..127.dat.rot47',
    },
    {
      title: 'rot5 test',
      input:  '/resources/0..127.dat',
      cipher: 'rot5',
      output: '/resources/0..127.dat.rot5',
    },
    {
      title: 'vigenere test',
      input:  '/resources/0..127.dat',
      password: 'abc',
      cipher: 'vigenere',
      output: '/resources/0..127.dat.vigenere.abc',
    },
  ].forEach(function (test) {
    it(test.title + ' should be encrypted correctly', function(done){
      execCli('enc', test.cipher, test.password, test.input, function(error, temp) {
        if (error) {
          throw error;
        }
        fs.readFile(path.join(__dirname, test.output), function (err, output) {
          if (err) {
            throw err;
          }
          expect(temp.toString()).to.equal(output.toString());
          done();
        });
      });
    });
    it(test.title + ' should be decrypted correctly', function(done){
      execCli('dec', test.cipher, test.password, test.output, function(error, temp) {
        if (error) {
          throw error;
        }
        fs.readFile(path.join(__dirname, test.input), function (err, input) {
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
