"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var Caesar = require('./caesar');
var Password = require('./password');
var Vigenere = function Vigenere(shiftArray) {
  $traceurRuntime.superCall(this, $Vigenere.prototype, "constructor", []);
  this._shiftArray = shiftArray.map(function(shift) {
    return ((shift % 26) + 26) % 26;
  });
  this._shiftIndex = -1;
  this._substituteCharCode = Caesar.prototype._substituteCharCode;
};
var $Vigenere = Vigenere;
($traceurRuntime.createClass)(Vigenere, {_rotate: function(charCode) {
    this._shiftIndex = (this._shiftIndex + 1) % this._shiftArray.length;
    return (charCode + this._shiftArray[this._shiftIndex]) % 26;
  }}, {}, SubstitutionCipher);
Vigenere.Cipher = function(password) {
  return new Vigenere(new Password(password).to.shiftArray());
};
Vigenere.Decipher = function(password) {
  return new Vigenere(new Password(password).forDecryption.to.shiftArray());
};
Vigenere['default'] = Vigenere;
module.exports = Vigenere;
