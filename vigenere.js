"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var Caesar = require('./caesar');
var Password = require('./password');
var Vigenere = (function($__super) {
  function Vigenere(shiftArray) {
    $traceurRuntime.superConstructor(Vigenere).call(this);
    this._shiftArray = shiftArray.map(function(shift) {
      return ((shift % 26) + 26) % 26;
    });
    this._shiftIndex = -1;
    this._substituteCharCode = Caesar.prototype._substituteCharCode;
  }
  return ($traceurRuntime.createClass)(Vigenere, {_rotate: function(charCode) {
      this._shiftIndex = (this._shiftIndex + 1) % this._shiftArray.length;
      return (charCode + this._shiftArray[this._shiftIndex]) % 26;
    }}, {}, $__super);
}(SubstitutionCipher));
Vigenere.Cipher = function(password) {
  return new Vigenere(new Password(password).to.shiftArray());
};
Vigenere.Decipher = function(password) {
  return new Vigenere(new Password(password).forDecryption.to.shiftArray());
};
Vigenere['default'] = Vigenere;
module.exports = Vigenere;
