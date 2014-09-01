"use strict";
var ROT5 = require('../rot5');
var Vigenere = require('../vigenere');
var chai = require('chai');
var expect = chai.expect;
describe('ROT5', function() {
  [{
    title: 'basic test',
    encrypting: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    shouldReturn: '!"#$%&\'()*+,-./5678901234:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
  }].forEach(function(test) {
    it(test.title + ' should be encrypted correctly', function() {
      var cipher = ROT5.Cipher();
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function() {
      var cipher = ROT5.Decipher();
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});
