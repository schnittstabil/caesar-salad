import caesarSalad from '../caesar-salad';
import commander from 'commander';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import os from 'os';

var pkgJsonPath = path.join(__dirname, 'package.json'),
    program = new commander.Command(),
    config;

// init config
try {
  config = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
} catch (err) {
  config = {
    version: 'dev'
  };
}

// set defaults
program.stdin = process.stdin;
program.stdout = process.stdout;

// setup program
program.cryptAction = function (Cipher, text) {
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
  cipherStream._transform = function (chunk, enc, cb) {
    this.push(cipher.crypt(chunk.toString()));
    cb();
  };

  /* istanbul ignore if */
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
  this.cryptAction(this.Cipher.Cipher, text);
};

program.decryptAction = function(text) {
  this.cryptAction(this.Cipher.Decipher, text);
};

program.listAction = function() {
  caesarSalad.ciphers.forEach(function(name) {
    console.log(name);
  });
};

function MixinDefaultOptions() {
  return this
    .version(config.version)
    .option('-d, --debug', 'enable debug output');
}

function MixinCryptOptions() {
  var self = this;

  // set defaults
  this.Cipher = caesarSalad.Vigenere;
  this.parsedPassword = 'b';

  // set options
  return MixinDefaultOptions.call(this)
    .option(
      '-c, --cipher <string>',
      'specify the cipher to use       [default: "Vigenere"]',
      function(cipher) {
        caesarSalad.ciphers.forEach(function(name) {
          if (name.toLowerCase() === cipher.toLowerCase()){
            cipher = name;
          }
        });
        if (!caesarSalad[cipher]) {
          throw new Error('Unknown Cipher: ' + cipher);
        }
        self.Cipher = caesarSalad[cipher];
      }
    )
    .option(
      '-p, --password <string>',
      'specify the password to use     [default: "b"]',
      function(pass) {
        self.parsedPassword = pass;
      }
    )
    .option('-i, --input <path>', 'specify the input file to use')
    .option('-o, --output <path>', 'specify the output file to use');
}

/*
 * we have to add the defaultOptions (--version, --debug) to each Command and
 * the program, same also applies to the cryptOptions
 * see https://github.com/visionmedia/commander.js/pull/180
 */
MixinCryptOptions.call(program);

MixinCryptOptions.call(program.command('encrypt [text]'))
  .description('encrypt [text], stdin or both')
  .action(program.encryptAction);

MixinCryptOptions.call(program.command('enc [text]'))
  .description('(same as encrypt)')
  .action(program.encryptAction);

MixinCryptOptions.call(program.command('decrypt [text]'))
  .description('decrypt [text], stdin or both')
  .action(program.decryptAction);

MixinCryptOptions.call(program.command('dec [text]'))
  .description('(same as decrypt)')
  .action(program.decryptAction);

MixinCryptOptions.call(program.command('list'))
  .description('list supported ciphers')
  .action(program.listAction);

export {program};

// main
if (require && require.main === module) {
  var args = process.argv.slice();
  if (args.length === 2) {
    // no args
    args.push('-h');
  }
  try {
    program.parse(args);
  } catch (err) {
    if (program.rawArgs.indexOf('-d') > -1 || program.rawArgs.indexOf('--debug') > -1) {
      throw err;
    } else {
      console.error(err.toString());
    }
  }
}
