#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
require('../traceur-runtime');
"use strict";
var caesarSalad = require('../caesar-salad');
var commander = require('commander');
var fs = require('fs');
var path = require('path');
var stream = require('stream');
var os = require('os');
var program = new commander.Command(),
    config;
try {
  config = require('../package.json');
} catch (err) {
  config = {version: 'dev'};
}
program.stdin = process.stdin;
program.stdout = process.stdout;
program.cryptAction = function(Cipher, text) {
  var cipher,
      input,
      output,
      cipherStream;
  if (this.input) {
    input = fs.createReadStream(this.input, {encoding: 'utf8'});
  } else {
    input = program.stdin;
  }
  if (this.output) {
    output = fs.createWriteStream(this.output, {encoding: 'utf8'});
  } else {
    output = program.stdout;
  }
  cipher = new Cipher(this.parsedPassword);
  cipherStream = new stream.Transform();
  cipherStream._transform = function(chunk, enc, cb) {
    this.push(cipher.crypt(chunk.toString()));
    cb();
  };
  if (input.isTTY) {
    if (text) {
      cipherStream.end(text + os.EOL);
    }
  } else {
    input.on('end', function() {
      cipherStream.end(text);
    });
    input.pipe(cipherStream, {end: false});
    if (input.end) {
      input.end();
    }
  }
  cipherStream.pipe(output);
};
program.encryptAction = function(text) {
  program.cryptAction(program.Cipher.Cipher, text);
};
program.decryptAction = function(text) {
  program.cryptAction(program.Cipher.Decipher, text);
};
program.listAction = function() {
  caesarSalad.ciphers.forEach(function(name) {
    console.log(name);
  });
};
function MixinDefaultOptions() {
  return this.version(config.version).option('-d, --debug', 'enable debug output');
}
function MixinCryptOptions() {
  var self = this;
  this.Cipher = caesarSalad.Vigenere;
  this.parsedPassword = 'b';
  return MixinDefaultOptions.call(this).option('-c, --cipher <string>', 'specify the cipher to use       [default: "Vigenere"]', function(cipher) {
    caesarSalad.ciphers.forEach(function(name) {
      if (name.toLowerCase() === cipher.toLowerCase()) {
        cipher = name;
      }
    });
    if (!caesarSalad[cipher]) {
      throw new Error('Unknown Cipher: ' + cipher);
    }
    self.Cipher = caesarSalad[cipher];
  }).option('-p, --password <string>', 'specify the password to use     [default: "b"]', function(pass) {
    self.parsedPassword = pass;
  }).option('-i, --input <path>', 'specify the input file to use').option('-o, --output <path>', 'specify the output file to use');
}
MixinCryptOptions.call(program);
MixinCryptOptions.call(program.command('encrypt [text]')).description('encrypt [text], stdin or both').action(program.encryptAction);
MixinCryptOptions.call(program.command('enc [text]')).description('(same as encrypt)').action(program.encryptAction);
MixinCryptOptions.call(program.command('decrypt [text]')).description('decrypt [text], stdin or both').action(program.decryptAction);
MixinCryptOptions.call(program.command('dec [text]')).description('(same as decrypt)').action(program.decryptAction);
MixinCryptOptions.call(program.command('list')).description('list supported ciphers').action(program.listAction);
module.exports.program = program;
if (require && require.main === module) {
  var args = process.argv.slice();
  if (args.length === 2) {
    args.push('-h');
  }
  try {
    program.parse(args);
  } catch (err) {
    if (program.rawArgs.indexOf('-d') > -1 || program.rawArgs.indexOf('--debug') > -1) {
      throw err;
    }
    console.error(err.toString());
    process.exit(1);
  }
}
