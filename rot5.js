"use strict";
var SubstitutionCipher = require('./substitution-cipher');
var ROT5 = function ROT5() {
  $traceurRuntime.defaultSuperCall(this, $ROT5.prototype, arguments);
};
var $ROT5 = ROT5;
($traceurRuntime.createClass)(ROT5, {_substituteCharCode: function(charCode) {
    if (charCode >= 48 && charCode <= 52) {
      return charCode + 5;
    }
    if (charCode >= 53 && charCode <= 57) {
      return charCode - 5;
    }
    return charCode;
  }}, {}, SubstitutionCipher);
ROT5.Cipher = function() {
  return new ROT5();
};
ROT5.Decipher = ROT5.Cipher;
ROT5['default'] = ROT5;
module.exports = ROT5;
