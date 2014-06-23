import cs from '../caesar-salad';
import chai from 'chai';
var expect = chai.expect;

describe('ROT13', function() {
  [
    {
      title: 'basic test',
      encrypting:   '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      shouldReturn: '!"#$%&\'()*+,-./0123456789:;<=>?@NOPQRSTUVWXYZABCDEFGHIJKLM[\\]^_`nopqrstuvwxyzabcdefghijklm{|}~',
    },
  ].forEach(function (test) {
    it(test.title + ' should be encrypted correctly', function(){
      var cipher = cs.ROT13.Cipher();
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function(){
      var cipher = cs.ROT13.Decipher();
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});
