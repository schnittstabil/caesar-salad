import SubstitutionCipher from '../substitution-cipher';
import chai from 'chai';
var expect = chai.expect;

describe('SubstitutionCipher', function() {
  it('_substituteCharCode should throw an error', function(){
    var cipher = new SubstitutionCipher();
    expect(function(){
      cipher._substituteCharCode(97);
    }).to.throw(/not implemented/);
  });

  it('Cipher should throw an error', function(){
    expect(function(){
      SubstitutionCipher.Cipher();
    }).to.throw(/not implemented/);
  });

  it('Decipher should throw an error', function(){
    expect(function(){
      SubstitutionCipher.Decipher();
    }).to.throw(/not implemented/);
  });
});

export default {};
