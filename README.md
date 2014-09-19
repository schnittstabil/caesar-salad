# caesar-salad [![Dependency Status](https://gemnasium.com/schnittstabil/caesar-salad.svg)](https://gemnasium.com/schnittstabil/caesar-salad) [![Build Status](https://travis-ci.org/schnittstabil/caesar-salad.svg?branch=master)](https://travis-ci.org/schnittstabil/caesar-salad)

Caesar, Vigenere and ROT Ciphers.

## Command-line interface

```
$ caesar-salad

  Usage: caesar-salad [options] [command]

  Commands:

    encrypt [options] [text]
       encrypt [text], stdin or both

    enc [options] [text]
       (same as encrypt)

    decrypt [options] [text]
       decrypt [text], stdin or both

    dec [options] [text]
       (same as decrypt)

    list [options]
       list supported ciphers


  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -d, --debug              enable debug output
    -c, --cipher <string>    specify the cipher to use       [default: "Vigenere"]
    -p, --password <string>  specify the password to use     [default: "b"]
    -i, --input <path>       specify the input file to use
    -o, --output <path>      specify the output file to use
```

```
$ caesar-salad list
Caesar
ROT5
ROT13
ROT18
ROT47
Vigenere
```

```
$ caesar-salad enc abcdef-0123456789@example.com
bcdefg-0123456789@fybnqmf.dpn

$ caesar-salad enc --cipher rot5 abcdef-0123456789@example.com
abcdef-5678901234@example.com
```

### Installation using Debian package

See [Ubuntu Launchpad](https://launchpad.net/~schnittstabil/+archive/ubuntu/node-caesar-salad) for details.

```bash
sudo add-apt-repository -y ppa:schnittstabil/node-caesar-salad
sudo add-apt-repository -y ppa:schnittstabil/node-char-buffer
sudo apt-get update
sudo apt-get install node-caesar-salad
```

### Installation using Node Package Manager (npm)

```bash
$ npm install caesar-salad -g
```

## Documentation

* [API](http://schnittstabil.github.io/caesar-salad/api/#!/api)
* [Code Coverage Report](http://schnittstabil.github.io/caesar-salad/coverage)

## Usage

### [Bower](http://bower.io/)

See [examples/bower](https://github.com/schnittstabil/caesar-salad/tree/master/examples/bower).

### [component](https://github.com/component/component)

See [examples/component](https://github.com/schnittstabil/caesar-salad/tree/master/examples/component).

### Node.js

```bash
$ npm install caesar-salad --save

# or:
$ sudo add-apt-repository ppa:schnittstabil/node-caesar-salad
$ sudo apt-get install node-caesar-salad
```

#### Caesar Cipher

See [here](http://schnittstabil.github.io/caesar-salad/api/classes/Password.html) for supported password formats.

```JavaScript
var Caesar = require('caesar-salad').Caesar;

Caesar.Cipher('c').crypt('abc-0123456789@example.com');
// returns: 'cde-0123456789@gzcorng.eqo'

Caesar.Decipher('c').crypt('cde-0123456789@gzcorng.eqo')
//returns: 'abc-0123456789@example.com'
```

#### Vigenere Cipher

See [here](http://schnittstabil.github.io/caesar-salad/api/classes/Password.html) for supported password formats.

```JavaScript
var Vigenere = require('caesar-salad').Vigenere;

Vigenere.Cipher('password').crypt('abc-0123456789@example.com');
// returns: 'pbu-0123456789@wtodsae.ugi'

Vigenere.Decipher('password').crypt('pbu-0123456789@wtodsae.ugi')
//returns: 'abc-0123456789@example.com'
```

#### ROT Cipher

```JavaScript
var caesarSalad = require('caesar-salad'),
    ROT13 = caesarSalad.ROT13,
     ROT5 = caesarSalad.ROT5,
    ROT18 = caesarSalad.ROT18,
    ROT47 = caesarSalad.ROT47;

ROT13.Cipher().crypt('abc-0123456789@example.com');   // returns: 'nop-0123456789@rknzcyr.pbz'
 ROT5.Cipher().crypt('abc-0123456789@example.com');   // returns: 'abc-5678901234@example.com'
ROT18.Cipher().crypt('abc-0123456789@example.com');   // returns: 'nop-5678901234@rknzcyr.pbz'
ROT47.Cipher().crypt('abc-0123456789@example.com');   // returns: '234\\_`abcdefgho6I2>A=6]4@>'


ROT13.Decipher().crypt('nop-0123456789@rknzcyr.pbz')   //returns: 'abc-0123456789@example.com'
 ROT5.Decipher().crypt('abc-5678901234@example.com')   //returns: 'abc-0123456789@example.com'
ROT18.Decipher().crypt('nop-5678901234@rknzcyr.pbz')   //returns: 'abc-0123456789@example.com'
ROT47.Decipher().crypt('234\\_`abcdefgho6I2>A=6]4@>')  //returns: 'abc-0123456789@example.com'
```

License
-------

Copyright (c) 2014 Michael Mayer

Licensed under the MIT license.
