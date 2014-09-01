"use strict";
var Password = require('./password');
var SubstitutionCipher = require('./substitution-cipher');
var Caesar = function Caesar(shift) {
  this._shift = ((shift % 26) + 26) % 26;
};
($traceurRuntime.createClass)(Caesar, {
  _rotate: function(charCode) {
    return (charCode + this._shift) % 26;
  },
  _substituteCharCode: function(charCode) {
    if (charCode >= 65 && charCode <= 90) {
      return this._rotate(charCode - 65) + 65;
    }
    if (charCode >= 97 && charCode <= 122) {
      return this._rotate(charCode - 97) + 97;
    }
    return charCode;
  }
}, {}, SubstitutionCipher);
Caesar.Cipher = function(password) {
  return new Caesar(new Password(password).to.shift());
};
Caesar.Decipher = function(password) {
  return new Caesar(new Password(password).forDecryption.to.shift());
};
Caesar['default'] = Caesar;
module.exports = Caesar;
