import cs from '../caesar-salad';
import {charRange, appendIterators, toString} from './iterator-utils';
import chai from 'chai';
var expect = chai.expect;

describe('Caesar', function() {
  [
    {
      title: 'basic test',
      encrypting:   '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      withPassword: '3',
      shouldReturn: '!"#$%&\'()*+,-./0123456789:;<=>?@DEFGHIJKLMNOPQRSTUVWXYZABC[\\]^_`defghijklmnopqrstuvwxyzabc{|}~',
    },
    {
      title: 'example1',
      encrypting:   'ABCD',
      withPassword: 2,
      shouldReturn: 'CDEF',
    },
    {
      title: 'example2',
      encrypting:   'CDEF',
      withPassword: -2,
      shouldReturn: 'ABCD',
    },
    {
      title: 'example3',
      encrypting:   'CDEF',
      withPassword: 24,
      shouldReturn: 'ABCD',
    },
    {
      title: '"A" to "z" char ranges',
      encrypting: toString(appendIterators(
        [' '], charRange('A', 'Z'), [' '], charRange('a', 'z'), [' ']
      )),
      withPassword: 'b',
      shouldReturn: toString(appendIterators(
        [' '], charRange('B', 'Z'), ['A', ' '], charRange('b', 'z'), ['a', ' ']
      )),
    }
  ].forEach(function (test) {
    it(test.title + ' should be encrypted correctly', function(){
      var cipher = cs.Caesar.Cipher(test.withPassword);
      expect(cipher.crypt(test.encrypting)).to.equal(test.shouldReturn);
    });
    it(test.title + ' should be decrypted correctly', function(){
      var cipher = cs.Caesar.Decipher(test.withPassword);
      expect(cipher.crypt(test.shouldReturn)).to.equal(test.encrypting);
    });
  });
});