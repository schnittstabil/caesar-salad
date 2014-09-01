"use strict";
var cs = require('../caesar-salad');
var chai = require('chai');
var expect = chai.expect;
describe('ROT47', function() {
  [{
    title: 'basic test',
    encrypting: '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    shouldReturn: 'PQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNO'
  }, {
    title: 'lorem ipsum',
    encrypting: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    shouldReturn: '%96 "F:4< qC@H? u@I yF>AD ~G6C %96 {2KJ s@8'
  }].forEach(function(test) {
    it(test.title + ' should be encrypted correctly', function() {
      var cipher = cs.ROT47.Cipher();
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function() {
      var cipher = cs.ROT47.Decipher();
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});
