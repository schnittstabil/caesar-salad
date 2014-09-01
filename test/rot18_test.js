"use strict";
var cs = require('../caesar-salad');
var chai = require('chai');
var expect = chai.expect;
describe('ROT18', function() {
  [{
    title: 'basic test',
    encrypting: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    shouldReturn: '!"#$%&\'()*+,-./5678901234:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~'
  }].forEach(function(test) {
    it(test.title + ' should be encrypted correctly', function() {
      var cipher = cs.ROT18.Cipher();
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function() {
      var cipher = cs.ROT18.Decipher();
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});
