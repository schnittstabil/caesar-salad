import ROT5 from '../rot5';
import Vigenere from '../vigenere';
import chai from 'chai';
var expect = chai.expect;

describe('ROT5', function() {
  [
    {
      title: 'basic test',
      encrypting:   '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      shouldReturn: '!"#$%&\'()*+,-./5678901234:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
    },
  ].forEach(function (test) {
    it(test.title + ' should be encrypted correctly', function(){
      var cipher = ROT5.Cipher();
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function(){
      var cipher = ROT5.Decipher();
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});
