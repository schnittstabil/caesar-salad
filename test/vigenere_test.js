"use strict";
var Vigenere = require('../vigenere');
var chai = require('chai');
var expect = chai.expect;
describe('Vigenere', function() {
  [{
    title: 'basic test',
    encrypting: ['!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'],
    withPassword: '2,1,0',
    shouldReturn: ['!"#$%&\'()*+,-./0123456789:;<=>?@CCCFFFIIILLLOOORRRUUUXXXAA[\\]^_`adddgggjjjmmmpppsssvvvyyyb{|}~']
  }, {
    title: 'example1',
    encrypting: ['ABAB'],
    withPassword: 'abc',
    shouldReturn: ['ACCB']
  }, {
    title: 'example2',
    encrypting: ['AB', 'AB'],
    withPassword: 'abc',
    shouldReturn: ['AC', 'CB']
  }, {
    title: 'example3',
    encrypting: ['ABAB'],
    withPassword: [0, -1, -2],
    shouldReturn: ['AAYB']
  }, {
    title: 'email addresses',
    encrypting: ['user@example.com'],
    withPassword: 'bcde',
    shouldReturn: ['vuhv@fzdqqnh.gpo']
  }, {
    title: 'undefined password',
    encrypting: ['user@example.com'],
    withPassword: undefined,
    shouldReturn: ['user@example.com']
  }, {
    title: 'empty password',
    encrypting: ['user@example.com'],
    withPassword: '',
    shouldReturn: ['user@example.com']
  }, {
    title: 'empty array password',
    encrypting: ['user@example.com'],
    withPassword: [],
    shouldReturn: ['user@example.com']
  }, {
    title: 'number password',
    encrypting: ['user@example.com'],
    withPassword: 1,
    shouldReturn: ['vtfs@fybnqmf.dpn']
  }, {
    title: 'string number array password',
    encrypting: ['user@example.com'],
    withPassword: '1,2,3,4',
    shouldReturn: ['vuhv@fzdqqnh.gpo']
  }, {
    title: 'string number array password',
    encrypting: ['user@example.com'],
    withPassword: [1, 2, 3, 4],
    shouldReturn: ['vuhv@fzdqqnh.gpo']
  }].forEach(function(test) {
    it(test.title + ' should be encrypted correctly', function() {
      var cipher = Vigenere.Cipher(test.withPassword),
          i;
      for (i = 0; i < test.encrypting.length; i++) {
        expect(cipher.crypt(test.encrypting[i])).to.equal(test.shouldReturn[i]);
      }
    });
    it(test.title + ' should be decrypted correctly', function() {
      var cipher = Vigenere.Decipher(test.withPassword),
          i;
      for (i = 0; i < test.encrypting.length; i++) {
        expect(cipher.crypt(test.shouldReturn[i])).to.equal(test.encrypting[i]);
      }
    });
  });
});
