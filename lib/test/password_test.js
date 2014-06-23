import Password from '../password';
import chai from 'chai';
var expect = chai.expect;

describe('password', function() {
  [
    '1_2',
    ['x']
  ].forEach(function (pw) {
    it(pw + ' should throw an error', function(){
      expect(function(){
        new Password(pw);
      }).to.throw(/parse/);
    });
  });

  [
    { pw: 1,    shift: 1 },
    { pw: '1',  shift: 1 },
    { pw: '-1', shift: -1 },
    { pw: 'b',  shift: 1 },
    { pw: 'bc', shift: 1 }
  ].forEach(function (test) {
    it(test.pw + ' should be parsed to ' + test.shift, function(){
      expect(new Password(test.pw).to.shift()).to.equal(test.shift);
    });
  });

  [
    { pw: 1,     shiftArray: [1] },
    { pw: [1,2], shiftArray: [1,2] },
    { pw: '1,2', shiftArray: [1,2] },
    { pw: '1,-2', shiftArray: [1,-2] },
    { pw: 'bc',  shiftArray: [1,2] },
  ].forEach(function (test) {
    it(test.pw + ' should be parsed to ' + test.shiftArray, function(){
      expect(new Password(test.pw).to.shiftArray()).to.deep.equal(test.shiftArray);
    });
  });
});
